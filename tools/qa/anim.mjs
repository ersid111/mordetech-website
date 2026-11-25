import { launch } from './browser.mjs';
const b = await launch();

// Mid-animation and settled, so both states can be judged.
for (const [label, wait] of [['mid', 1400], ['settled', 5000]]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3500/', { waitUntil: 'load' });
  await p.waitForTimeout(wait);
  await p.screenshot({ path: `/tmp/shots/anim-${label}.png` });
  await ctx.close();
}

// Reduced motion must show the finished drawing immediately.
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:3500/', { waitUntil: 'load' });
await p.waitForTimeout(400);
const r = await p.evaluate(() => {
  const svg = document.querySelector('.growth svg');
  const strokes = [...svg.querySelectorAll('.gt-draw')];
  const nodes = [...svg.querySelectorAll('.gt-node')];
  const off = strokes.map(s => parseFloat(getComputedStyle(s).strokeDashoffset) || 0);
  const op = nodes.map(n => parseFloat(getComputedStyle(n).opacity));
  return { strokesDrawn: off.every(v => v === 0), nodesVisible: op.every(v => v === 1),
           anim: getComputedStyle(strokes[0]).animationName };
});
console.log('reduced-motion:', JSON.stringify(r));
await p.screenshot({ path: '/tmp/shots/anim-reduced.png' });
await ctx.close();
await b.close();
console.log('captured');
