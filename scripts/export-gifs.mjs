// scripts/export-gifs.mjs: export every character's poses as small transparent animated GIF stickers.
//
// Usage:
//   node scripts/export-gifs.mjs                           export all characters → GIF/<character>/<pose>.gif
//   node scripts/export-gifs.mjs --character=patrick       export specific character(s), comma-separated
//   node scripts/export-gifs.mjs --out=GIF --size=320 --duration=2 --fps=12.5 --colors=96 --workers=6
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { cpus } from 'node:os';
import puppeteer from 'puppeteer-core';
import { REGISTRY } from './registry.mjs';

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, ...v] = a.replace(/^--/, '').split('=');
  return [k, v.length ? v.join('=') : true];
}));

const OUT_DIR = String(args.out || 'GIF');
const SIZE = +(args.size || 320);
const DURATION = +(args.duration || 2);
const FPS = +(args.fps || 12.5);
const COLORS = Math.max(16, Math.min(256, +(args.colors || 96)));
const WORKERS = Math.max(1, +(args.workers || Math.min(6, Math.max(2, cpus().length - 2))));
const CHAR_FILTER = args.character ? String(args.character).split(',').map(s => s.trim()).filter(Boolean) : null;

const CHROME = args.chrome || process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => existsSync(p));

if (!CHROME || !existsSync(CHROME)) {
  console.error('Chrome not found. Pass --chrome=<path> or set CHROME=<path>.');
  process.exit(1);
}

function slugifyPose(name, used) {
  let base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'pose';
  let slug = base, n = 2;
  while (used.has(slug)) slug = `${base}_${n++}`;
  used.add(slug);
  return slug;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const root = resolve('.');
const server = createServer(async (req, res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (path !== root && !path.startsWith(root + '/')) return res.writeHead(403).end();
    res.setHeader('Content-Type', MIME[extname(path).toLowerCase()] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise(r => server.listen(0, '127.0.0.1', r));
const baseUrl = `http://127.0.0.1:${server.address().port}/studio.html`;

const characters = CHAR_FILTER
  ? CHAR_FILTER.filter(c => {
      if (!REGISTRY.characters.includes(c)) { console.warn(`Unknown character "${c}", skipping`); return false; }
      return true;
    })
  : [...REGISTRY.characters];

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: 0,
    args: ['--no-sandbox', '--window-size=1920,1080', '--disable-renderer-backgrounding', '--disable-background-timer-throttling'],
  });

  // Render a pose in-page, auto-crop to the union bounding box across all frames, and encode a compact transparent GIF.
  const renderPoseInPage = async (page, charId, poseName) => {
    const b64 = await page.evaluate(async (charId, poseName, opts) => {
      const { GIFEncoder, quantize, applyPalette } = await import('./node_modules/gifenc/dist/gifenc.esm.js');
      const entry = CHARACTERS[charId];
      const { size, duration, fps, colors } = opts;
      const total = Math.max(1, Math.round(duration * fps));
      const delay = Math.round(1000 / fps / 10) * 10; // GIF centisecond-aligned delay

      // Downsample 1920x1080 -> 768x432 for fast bounds scanning and crisp downscaling into size x size.
      const sw = 768, sh = 432;
      const frames = [];
      let minX = sw, minY = sh, maxX = -1, maxY = -1;

      for (let i = 0; i < total; i++) {
        const t = i / fps;
        paintFrame(t, () => drawCharacterView(entry, poseName, t, { location: 'transparent', zoom: 1 }), { transparent: true });
        const fc = document.createElement('canvas');
        fc.width = sw; fc.height = sh;
        const fctx = fc.getContext('2d', { willReadFrequently: true });
        fctx.imageSmoothingEnabled = true;
        fctx.imageSmoothingQuality = 'high';
        fctx.drawImage(X.canvas, 0, 0, sw, sh);
        const { data } = fctx.getImageData(0, 0, sw, sh);
        for (let y = 0; y < sh; y += 2) {
          const row = y * sw * 4;
          for (let x = 0; x < sw; x += 2) {
            if (data[row + x * 4 + 3] > 16) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        frames.push(fc);
      }

      // Compute padded square crop centered on the character's union bounding box.
      let sx = 0, sy = 0, side = sh;
      if (maxX >= minX && maxY >= minY) {
        const bw = maxX - minX + 2;
        const bh = maxY - minY + 2;
        const pad = Math.max(12, Math.round(Math.max(bw, bh) * 0.08));
        side = Math.max(bw, bh) + pad * 2;
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        sx = Math.round(cx - side / 2);
        sy = Math.round(cy - side / 2);
      } else {
        sx = Math.round((sw - sh) / 2);
        sy = 0;
        side = sh;
      }

      const outCanvas = document.createElement('canvas');
      outCanvas.width = size;
      outCanvas.height = size;
      const octx = outCanvas.getContext('2d', { willReadFrequently: true });
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = 'high';

      const gif = GIFEncoder();
      for (let i = 0; i < frames.length; i++) {
        octx.clearRect(0, 0, size, size);
        octx.drawImage(frames[i], sx, sy, side, side, 0, 0, size, size);
        const { data } = octx.getImageData(0, 0, size, size);
        const palette = quantize(data, colors - 1);
        const indexed = applyPalette(data, palette);
        const transparentIndex = palette.length;
        palette.push([0, 0, 0]);
        for (let p = 0; p < indexed.length; p++) {
          if (data[p * 4 + 3] < 128) indexed[p] = transparentIndex;
        }
        gif.writeFrame(indexed, size, size, {
          palette,
          delay,
          repeat: 0,
          transparent: true,
          transparentIndex,
          dispose: 2,
        });
      }
      gif.finish();
      const bytes = gif.bytes();
      let bin = '';
      for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      return btoa(bin);
    }, charId, poseName, { size: SIZE, duration: DURATION, fps: FPS, colors: COLORS });

    return Buffer.from(b64, 'base64');
  };

  // Queue characters across worker pages.
  let nextIdx = 0;
  let totalFiles = 0;
  let totalBytes = 0;
  let maxBytes = 0;
  let maxFile = '';
  const tStart = Date.now();

  const workerCount = Math.min(WORKERS, characters.length);
  await Promise.all(Array.from({ length: workerCount }, async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction(() => window.ready && window.studio, { timeout: 60000 });
    await page.evaluate(() => Promise.all(REGISTRY.characters.map(c => loadAsset('character', c))));

    while (nextIdx < characters.length) {
      const charId = characters[nextIdx++];
      const charDir = resolve(OUT_DIR, charId);
      mkdirSync(charDir, { recursive: true });

      const poses = await page.evaluate(id => poseNames(CHARACTERS[id]), charId);

      const usedSlugs = new Set();
      let charBytes = 0;
      const tChar = Date.now();

      for (const poseName of poses) {
        const slug = slugifyPose(poseName, usedSlugs);
        const buf = await renderPoseInPage(page, charId, poseName);
        const outPath = resolve(charDir, `${slug}.gif`);
        writeFileSync(outPath, buf);
        totalFiles++;
        totalBytes += buf.length;
        charBytes += buf.length;
        if (buf.length > maxBytes) {
          maxBytes = buf.length;
          maxFile = `${charId}/${slug}.gif`;
        }
      }

      const avgKb = (charBytes / Math.max(1, poses.length) / 1024).toFixed(1);
      const sec = ((Date.now() - tChar) / 1000).toFixed(1);
      console.log(`✔ ${charId}: ${poses.length} GIFs (avg ${avgKb} KB) in ${sec}s`);
    }

    await page.close();
  }));

  const elapsed = ((Date.now() - tStart) / 1000).toFixed(1);
  console.log(`\nDone: ${totalFiles} GIFs in ${OUT_DIR}/ (${(totalBytes / 1024 / 1024).toFixed(2)} MB total, avg ${(totalBytes / Math.max(1, totalFiles) / 1024).toFixed(1)} KB, max ${(maxBytes / 1024).toFixed(1)} KB at ${maxFile}) in ${elapsed}s`);
} finally {
  if (browser) await browser.close();
  server.close();
}
