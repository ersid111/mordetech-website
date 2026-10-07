import { chromium } from 'playwright';
const EXE = process.env.CHROMIUM_PATH;
const BASE = 'http://127.0.0.1:3400';
const b = await chromium.launch(EXE ? { executablePath: EXE, args: ['--no-sandbox','--disable-dev-shm-usage'] } : {});

for (const route of ['/', '/solutions/ai-vision-inspection', '/contact']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let bytes = 0, requests = 0, js = 0, css = 0, font = 0;
  page.on('response', async (r) => {
    requests++;
    try {
      const len = (await r.body().catch(() => Buffer.alloc(0))).length;
      bytes += len;
      const t = r.request().resourceType();
      if (t === 'script') js += len;
      if (t === 'stylesheet') css += len;
      if (t === 'font') font += len;
    } catch {}
  });
  await page.goto(BASE + route, { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const m = await page.evaluate(() => new Promise((resolve) => {
    const paints = {};
    for (const p of performance.getEntriesByType('paint')) paints[p.name] = Math.round(p.startTime);
    let lcp = 0, cls = 0;
    try {
      new PerformanceObserver((l) => { for (const e of l.getEntries()) lcp = Math.round(e.startTime); })
        .observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; })
        .observe({ type: 'layout-shift', buffered: true });
    } catch {}
    setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      resolve({ fcp: paints['first-contentful-paint'] ?? 0, lcp, cls: +cls.toFixed(4),
                dcl: Math.round(nav.domContentLoadedEventEnd || 0), load: Math.round(nav.loadEventEnd || 0) });
    }, 600);
  }));

  console.log(`${route}`);
  console.log(`  FCP ${m.fcp}ms · LCP ${m.lcp}ms · CLS ${m.cls} · DCL ${m.dcl}ms · load ${m.load}ms`);
  console.log(`  ${requests} requests · ${(bytes/1024).toFixed(0)}KB total (js ${(js/1024).toFixed(0)}KB, css ${(css/1024).toFixed(0)}KB, fonts ${(font/1024).toFixed(0)}KB)`);
  await ctx.close();
}
await b.close();
