#!/usr/bin/env node
/**
 * Regenerate the prerendered snapshots baked into the DC pages.
 *
 * WHY THIS EXISTS
 * The five main pages render entirely through support.js, so a crawler that
 * does not execute JavaScript sees an empty <body>. Each page therefore ships a
 * static snapshot of its own rendered output inside <div id="dc-prerender">.
 * The inline guard in <head> hides that snapshot the moment the live runtime
 * mounts #dc-root, so visitors never see duplicated content.
 *
 * WHEN TO RUN IT
 * After ANY change to the markup, copy or logic of those pages. If you skip it,
 * the snapshot keeps serving the previous content to search engines and to
 * anyone whose JavaScript fails — silently diverging from what visitors see.
 *
 *   node tools/prerender.mjs
 *
 * Requires Playwright and a Chromium build:
 *   npm i -D playwright
 *   npx playwright install chromium
 *
 * Or point at an existing build:
 *   CHROMIUM_PATH=/path/to/chrome node tools/prerender.mjs
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const PAGES = ['index.html', 'about.html', 'services.html', 'ai-solutions.html', 'contact.html'];
const PORT = 8123;

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml',
};

function serve() {
  return new Promise((ok) => {
    const s = createServer(async (req, res) => {
      const path = decodeURIComponent(req.url.split('?')[0]);
      let file = join(ROOT, path === '/' ? 'index.html' : path);
      if (!existsSync(file) && existsSync(file + '.html')) file += '.html';
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
        res.end(body);
      } catch { res.writeHead(404); res.end('not found'); }
    });
    s.listen(PORT, '127.0.0.1', () => ok(s));
  });
}

const server = await serve();
// Honour an explicit Chromium path (CI images and sandboxes often ship one
// outside Playwright's own cache); otherwise use Playwright's bundled build.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH,
                                args: ['--no-sandbox', '--disable-dev-shm-usage'] } : {}
);
let changed = 0;

for (const page of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const tab = await ctx.newPage();
  await tab.goto(`http://127.0.0.1:${PORT}/${page}`, { waitUntil: 'load' });
  await tab.waitForFunction(() => !!window.__dcRegistry, { timeout: 20000 });
  await tab.waitForTimeout(2200);

  const snapshot = await tab.evaluate(() => {
    const root = document.getElementById('dc-root');
    if (!root) return null;
    const clone = root.cloneNode(true);
    clone.querySelectorAll('script').forEach((n) => n.remove());
    clone.querySelectorAll('input,textarea').forEach((n) => {
      n.removeAttribute('value'); n.textContent = '';
    });
    return clone.innerHTML;
  });
  await ctx.close();

  if (!snapshot) { console.error(`${page}: #dc-root never appeared — skipped`); continue; }

  const file = join(ROOT, page);
  const html = await readFile(file, 'utf8');
  const OPEN = '<div id="dc-prerender">';
  const END = '<!--/dc-prerender--></div>';
  const open = html.indexOf(OPEN);
  const close = html.indexOf(END, open);
  // The block is delimited by an explicit end marker rather than the next
  // "</div>", because the snapshot itself contains hundreds of them — matching
  // the first one truncates the block and nests a fresh copy inside the old.
  if (open === -1 || close === -1) { console.error(`${page}: no #dc-prerender block — skipped`); continue; }

  const next = html.slice(0, open) + OPEN + '\n' + snapshot + '\n' + html.slice(close);
  if (next !== html) { await writeFile(file, next); changed++; }
  console.log(`${page.padEnd(20)} ${(snapshot.length / 1024).toFixed(1)} KB snapshot`);
}

await browser.close();
server.close();
console.log(`\n${changed} page(s) updated.`);
