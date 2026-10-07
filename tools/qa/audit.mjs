import { chromium } from 'playwright';

const BASE = "http://127.0.0.1:3100";
const EXE = process.env.CHROMIUM_PATH;

const ROUTES = [
  '/', '/solutions', '/solutions/ai-vision-inspection', '/solutions/smart-automation',
  '/solutions/industrial-iot-oee', '/solutions/predictive-maintenance-energy',
  '/industries', '/industries/cement-grinding', '/industries/automotive-discrete',
  '/industries/chemical-process', '/industries/food-beverage', '/industries/pharma',
  '/industries/industrial-oems', '/case-studies', '/case-studies/ai-vision-stamping-line',
  '/case-studies/oee-predictive-press-shop', '/case-studies/legacy-plc-scada-migration',
  '/about', '/support', '/contact', '/privacy', '/terms',
];

const browser = await chromium.launch(
  EXE ? { executablePath: EXE, args: ['--no-sandbox', '--disable-dev-shm-usage'] } : {},
);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const problems = [];
const internalLinks = new Set();

console.log('=== per-page structure ===');
for (const route of ROUTES) {
  const page = await ctx.newPage();
  const resp = await page.goto(BASE + route, { waitUntil: 'load' });
  const status = resp?.status();
  const landedOn = new URL(page.url()).pathname;
  if (status !== 200) problems.push(`${route}: HTTP ${status}`);
  if (landedOn !== route) problems.push(`${route}: redirected to ${landedOn}`);

  const r = await page.evaluate(() => {
    const out = {};
    out.title = document.title;
    out.desc = document.querySelector('meta[name="description"]')?.content?.length ?? 0;
    out.canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null;
    out.h1 = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
    out.schema = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => { try { return JSON.parse(s.textContent)['@type']; } catch { return 'INVALID'; } });
    out.main = document.querySelectorAll('main').length;
    out.skip = !!document.querySelector('a[href="#main"]');

    // Heading order: a level must not jump by more than one.
    const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    out.headingJumps = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1).length;

    out.imgNoAlt = [...document.querySelectorAll('img')].filter((i) => i.getAttribute('alt') === null).length;
    out.links = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
    out.emptyLinks = [...document.querySelectorAll('a')]
      .filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length;
    out.hOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    return out;
  });

  r.links.forEach((l) => internalLinks.add(l.split('#')[0] || '/'));
  if (r.h1.length !== 1) problems.push(`${route}: ${r.h1.length} h1 elements`);
  if (!r.title) problems.push(`${route}: no title`);
  if (r.desc < 50 || r.desc > 165) problems.push(`${route}: meta description ${r.desc} chars`);
  if (!r.canonical) problems.push(`${route}: no canonical`);
  if (r.main !== 1) problems.push(`${route}: ${r.main} <main> landmarks`);
  if (!r.skip) problems.push(`${route}: no skip link`);
  if (r.headingJumps) problems.push(`${route}: ${r.headingJumps} heading level jump(s)`);
  if (r.imgNoAlt) problems.push(`${route}: ${r.imgNoAlt} img without alt`);
  if (r.emptyLinks) problems.push(`${route}: ${r.emptyLinks} link(s) with no accessible name`);
  if (r.hOverflow) problems.push(`${route}: horizontal overflow`);

  console.log(
    `  ${route.padEnd(42)} ${String(status)} h1=${r.h1.length} desc=${String(r.desc).padStart(3)} ` +
    `schema=[${r.schema.join(',')}]`,
  );
  await page.close();
}

console.log('\n=== internal link audit ===');
let broken = 0;
for (const href of [...internalLinks].sort()) {
  if (href.startsWith('/api')) continue;
  const page = await ctx.newPage();
  const resp = await page.goto(BASE + href, { waitUntil: 'commit' });
  const landed = new URL(page.url()).pathname;
  const status = resp?.status() ?? 0;
  const ok = status === 200;
  const wentHome = landed === '/' && href !== '/';
  if (!ok || wentHome) {
    broken++;
    console.log(`  BROKEN ${href} -> ${status} ${landed}`);
    problems.push(`link ${href} -> ${status} ${landed}`);
  }
  await page.close();
}
console.log(`  ${internalLinks.size} unique internal links, ${broken} broken`);

console.log('\n=== redirects from the old site ===');
for (const [from, to] of [
  ['/ai-solutions', '/solutions/ai-vision-inspection'],
  ['/services', '/solutions'],
  ['/about.html', '/about'],
  ['/case-study-1', '/case-studies/ai-vision-stamping-line'],
  ['/demo', '/solutions/industrial-iot-oee'],
  ['/news', '/about'],
]) {
  const page = await ctx.newPage();
  await page.goto(BASE + from, { waitUntil: 'commit' });
  const landed = new URL(page.url()).pathname;
  const ok = landed === to;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${from.padEnd(34)} -> ${landed}`);
  if (!ok) problems.push(`redirect ${from} landed on ${landed}, expected ${to}`);
  await page.close();
}

console.log('\n=== 404 handling ===');
{
  const page = await ctx.newPage();
  const resp = await page.goto(BASE + '/this-page-does-not-exist', { waitUntil: 'load' });
  const body = await page.evaluate(() => document.body.innerText);
  const ok = resp?.status() === 404 && /not here/i.test(body);
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} status=${resp?.status()} custom page=${/not here/i.test(body)}`);
  if (!ok) problems.push('404 page did not render correctly');
  await page.close();
}

await browser.close();
console.log(`\n=== ${problems.length} problem(s) ===`);
problems.forEach((p) => console.log('  ! ' + p));
process.exit(problems.length ? 1 : 0);
