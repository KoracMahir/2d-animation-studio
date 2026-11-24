// scripts/build-ice-skating-comic.mjs
// Renders comics/ice-skating/comic-studio.png + comic-studio.pdf (and comic-illustrated.pdf if PNG exists)
// using headless Chrome + Safadi Animation Studio character rigs.
//
// Usage:
//   node scripts/build-ice-skating-comic.mjs

import { createServer } from 'node:http';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT_DIR = resolve('comics/ice-skating');
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

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
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
const port = server.address().port;

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    protocolTimeout: 0,
    args: ['--no-sandbox', '--window-size=1700,2200'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1700, height: 2200, deviceScaleFactor: 1 });
  page.on('pageerror', err => console.error('Page error:', err));

  await page.goto(`http://127.0.0.1:${port}/comics/ice-skating/index.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.waitForFunction(() => window.COMIC_RENDERED === true, { timeout: 30000 });

  const dataUrl = await page.evaluate(() => {
    const cv = document.getElementById('studio-canvas');
    return cv.toDataURL('image/png');
  });

  mkdirSync(OUT_DIR, { recursive: true });
  const studioPngPath = resolve(OUT_DIR, 'comic-studio.png');
  writeFileSync(studioPngPath, Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64'));
  console.log(`✔ Wrote ${studioPngPath}`);

  async function writePrintablePdf(imgDataUrl, pdfPath, title) {
    const printPage = await browser.newPage();
    await printPage.setContent(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @page { size: letter portrait; margin: 0.2in; }
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #fff; display: flex; align-items: center; justify-content: center; }
  img { max-width: 100%; max-height: 100%; width: auto; height: auto; display: block; object-fit: contain; }
</style>
</head>
<body><img src="${imgDataUrl}" alt="${title}"></body>
</html>`, { waitUntil: 'load' });
    await printPage.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.2in', right: '0.2in', bottom: '0.2in', left: '0.2in' },
    });
    await printPage.close();
    console.log(`✔ Wrote ${pdfPath}`);
  }

  await writePrintablePdf(dataUrl, resolve(OUT_DIR, 'comic-studio.pdf'), 'Sami & Jenna: Ice Skating Adventure (Studio Edition)');

  const illPngPath = resolve(OUT_DIR, 'comic-illustrated.png');
  if (existsSync(illPngPath)) {
    const buf = await readFile(illPngPath);
    const illDataUrl = `data:image/png;base64,${buf.toString('base64')}`;
    await writePrintablePdf(illDataUrl, resolve(OUT_DIR, 'comic-illustrated.pdf'), 'Sami & Jenna: Ice Skating Adventure (Illustrated Edition)');
  }
} finally {
  if (browser) await browser.close();
  server.close();
}
