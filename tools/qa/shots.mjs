import { chromium, devices } from 'playwright';
const EXE = process.env.CHROMIUM_PATH;
const b = await chromium.launch(EXE ? { executablePath: EXE, args: ['--no-sandbox','--disable-dev-shm-usage'] } : {});
for (const [name, route, viewport] of [
  ['home-desktop', '/', { width: 1440, height: 1000 }],
  ['solution-desktop', '/solutions/ai-vision-inspection', { width: 1440, height: 1000 }],
  ['contact-desktop', '/contact', { width: 1440, height: 1000 }],
]) {
  const ctx = await b.newContext({ viewport });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3400' + route, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `/tmp/shots/${name}.png` });
  await ctx.close();
}
const ctx = await b.newContext({ ...devices['iPhone 12'] });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:3400/', { waitUntil: 'load' });
await p.waitForTimeout(900);
await p.screenshot({ path: '/tmp/shots/home-mobile.png' });
await ctx.close();
await b.close();
console.log('captured');
