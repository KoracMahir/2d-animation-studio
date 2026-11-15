// scripts/build-airtag-sheet.mjs: generate a US Letter printable PDF & PNG of circular AirTag face stickers (28 mm).
//
// Usage:
//   node scripts/build-airtag-sheet.mjs
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import puppeteer from 'puppeteer-core';
import { REGISTRY } from './registry.mjs';

const OUT_DIR = 'GIF';
const CHROME = process.env.CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => existsSync(p));

if (!CHROME || !existsSync(CHROME)) {
  console.error('Chrome not found. Set CHROME=<path>.');
  process.exit(1);
}

// Expressive upright pose & face-crop tuning per character.
// xOff/yOff shift the crop center in units of bounding-box width/height; sizeFrac is crop side / bbox height.
const FACE_CONFIG = {
  jester_fester:  { label: 'Jester Fester',  pose: 'ta-da',   yFrac: 0.37, sizeFrac: 0.44, bg: '#FFF3D6' },
  princess_pearl: { label: 'Princess Pearl', pose: 'talk',    yFrac: 0.29, xOff: 0.20, sizeFrac: 0.44, bg: '#FCE6F0' },
  safadi:         { label: 'Dr. Safadi',     pose: 'rest',    yFrac: 0.17, sizeFrac: 0.34, bg: '#E6F0FA' },
  alma:           { label: 'Alma',           pose: 'giggle',  yFrac: 0.30, sizeFrac: 0.44, bg: '#FFE8EE' },
  dragon:         { label: 'Dragon',         pose: 'hello!',  yFrac: 0.34, sizeFrac: 0.56, bg: '#E5F5E3' },
  housam:         { label: 'Housam',         pose: 'hello',   yFrac: 0.23, sizeFrac: 0.38, bg: '#E6F4FF' },
  danny:          { label: 'Danny',          pose: 'hello',   yFrac: 0.24, sizeFrac: 0.38, bg: '#FFF0DF' },
  sami:           { label: 'Sami',           pose: 'rest',    yFrac: 0.17, sizeFrac: 0.34, bg: '#E4F4F0' },
  jenna:          { label: 'Jenna',          pose: 'hi!',     yFrac: 0.24, sizeFrac: 0.39, bg: '#F2E8FF' },
  robo_safadi:    { label: 'Robo-Safadi',    pose: 'rest',    yFrac: 0.21, sizeFrac: 0.36, bg: '#E4EEF7' },
  clawd:          { label: 'Clawd',          pose: 'wave',    yFrac: 0.38, sizeFrac: 0.76, bg: '#FFEBE2' },
  student:        { label: 'Student',        pose: 'cheer',   yFrac: 0.23, sizeFrac: 0.36, bg: '#EEF4E4' },
  neptune:        { label: 'King Neptune',   pose: 'kind',    yFrac: 0.33, xOff: 0.16, sizeFrac: 0.46, bg: '#E0F5FA' },
  sarah:          { label: 'Sarah',          pose: 'hello',   yFrac: 0.19, sizeFrac: 0.32, bg: '#FBEAF2' },
  roudaynah:      { label: 'Roudaynah',      pose: 'happy',   yFrac: 0.19, sizeFrac: 0.32, bg: '#F6EAF8' },
  patrick:        { label: 'Patrick',        pose: 'rest',    yFrac: 0.13, sizeFrac: 0.25, bg: '#E8F2F8' },
  dr_g:           { label: 'Dr. G',          pose: 'hello',   yFrac: 0.19, sizeFrac: 0.32, bg: '#F2F0E6' },
};

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

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: 0,
    args: ['--no-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction(() => window.ready && window.studio, { timeout: 60000 });
  await page.evaluate(() => Promise.all(REGISTRY.characters.map(c => loadAsset('character', c))));

  const portraits = await page.evaluate((chars, cfgMap) => {
    const out = [];
    for (const id of chars) {
      const entry = CHARACTERS[id];
      const cfg = cfgMap[id] || { pose: 'rest', yFrac: 0.2, sizeFrac: 0.35, bg: '#FFF8EC' };
      const pose = entry.poses?.[cfg.pose] ? cfg.pose : poseNames(entry)[0];

      paintFrame(0.4, () => drawCharacterView(entry, pose, 0.4, { location: 'transparent', zoom: 1 }), { transparent: true });
      const { data } = X.getImageData(0, 0, W, H);

      let minX = W, minY = H, maxX = -1, maxY = -1;
      for (let y = 0; y < H; y += 2) {
        const row = y * W * 4;
        for (let x = 0; x < W; x += 2) {
          if (data[row + x * 4 + 3] > 16) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const bw = maxX - minX;
      const bh = maxY - minY;
      const cx = (minX + maxX) / 2 + (cfg.xOff || 0) * bw;
      const cy = minY + bh * cfg.yFrac;
      const side = bh * cfg.sizeFrac;

      const size = 512;
      const cv = document.createElement('canvas');
      cv.width = size;
      cv.height = size;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = cfg.bg;
      ctx.fillRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(X.canvas, cx - side / 2, cy - side / 2, side, side, 0, 0, size, size);

      out.push({
        id,
        title: cfg.label || entry.title || id,
        dataUrl: cv.toDataURL('image/png'),
      });
    }
    return out;
  }, REGISTRY.characters, FACE_CONFIG);

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>AirTag Face Stickers (28 mm)</title>
<style>
  @page {
    size: letter portrait;
    margin: 0.45in;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #fff;
    color: #2c1e24;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 7.6in;
    margin: 0 auto;
    padding: 0.1in 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #e2d6dc;
    padding-bottom: 8px;
    margin-bottom: 18px;
  }
  .title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .subtitle {
    font-size: 10.5px;
    color: #6b545e;
    margin-top: 2px;
  }
  .ruler {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 9.5px;
    color: #6b545e;
  }
  .ruler-bar {
    width: 25.4mm;
    height: 6px;
    border-left: 1.5px solid #2c1e24;
    border-right: 1.5px solid #2c1e24;
    border-bottom: 1.5px solid #2c1e24;
    margin-bottom: 3px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px 12px;
    justify-items: center;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cut-circle {
    width: 28mm;
    height: 28mm;
    border-radius: 50%;
    overflow: hidden;
    border: 0.75pt dashed #8c737e;
    padding: 0;
    position: relative;
    background: #fff;
  }
  .cut-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .label {
    margin-top: 4px;
    font-size: 9.5px;
    font-weight: 600;
    color: #4a353e;
    text-align: center;
  }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="title">Safadi Animation Studio · AirTag Face Stickers</div>
        <div class="subtitle">17 characters · 28 mm (1.10") circular cutout · Print at 100% / Actual Size on US Letter</div>
      </div>
      <div class="ruler">
        <div class="ruler-bar"></div>
        <span>Scale check: 1 inch (25.4 mm)</span>
      </div>
    </div>
    <div class="grid">
      ${portraits.map(p => `
        <div class="item">
          <div class="cut-circle"><img src="${p.dataUrl}" alt="${p.title}"></div>
          <div class="label">${p.title}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

  const printPage = await browser.newPage();
  await printPage.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });
  await printPage.setContent(html, { waitUntil: 'load' });

  mkdirSync(OUT_DIR, { recursive: true });
  const pdfPath = resolve(OUT_DIR, 'airtag-stickers.pdf');
  const pngPath = resolve(OUT_DIR, 'airtag-stickers.png');

  await printPage.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.45in', right: '0.45in', bottom: '0.45in', left: '0.45in' },
  });
  await printPage.screenshot({ path: pngPath, fullPage: true });

  console.log(`✔ Wrote ${pdfPath}`);
  console.log(`✔ Wrote ${pngPath}`);
} finally {
  if (browser) await browser.close();
  server.close();
}
