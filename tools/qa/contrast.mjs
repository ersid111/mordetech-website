import { chromium } from 'playwright';
const EXE = process.env.CHROMIUM_PATH;
const b = await chromium.launch(EXE ? { executablePath: EXE, args: ['--no-sandbox','--disable-dev-shm-usage'] } : {});
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });

const ROUTES = ['/', '/solutions', '/solutions/ai-vision-inspection', '/industries', '/case-studies', '/contact', '/about', '/support'];
const fails = [];

for (const route of ROUTES) {
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:3100' + route, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const bad = await page.evaluate(() => {
    const lum = (rgb) => {
      const [r, g, b] = rgb.map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const parse = (c) => (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    const bgOf = (el) => {
      let n = el;
      while (n && n !== document.documentElement) {
        const c = getComputedStyle(n).backgroundColor;
        const p = parse(c);
        if (p.length === 3 && !/rgba\(0, 0, 0, 0\)/.test(c)) return p;
        n = n.parentElement;
      }
      return [255, 255, 255];
    };
    const out = [];
    const seen = new Set();
    for (const el of document.querySelectorAll('p,a,span,li,h1,h2,h3,h4,button,label,dt,dd,summary')) {
      const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!txt) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const fg = parse(cs.color); const bg = bgOf(el);
      if (fg.length !== 3) continue;
      const L1 = lum(fg), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const need = large ? 3 : 4.5;
      if (ratio < need) {
        const label = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 42);
        const key = `${label}|${ratio.toFixed(2)}`;
        if (!seen.has(key)) { seen.add(key); out.push({ label, ratio: +ratio.toFixed(2), need, size: Math.round(size) }); }
      }
    }
    return out;
  });
  if (bad.length) {
    console.log(`\n${route}`);
    bad.slice(0, 8).forEach((x) => { console.log(`  ${x.ratio} (need ${x.need})  ${x.size}px  "${x.label}"`); fails.push(`${route}: ${x.label}`); });
  }
  await page.close();
}
await b.close();
console.log(`\n=== ${fails.length} contrast failure(s) ===`);
process.exit(fails.length ? 1 : 0);
