import { launch } from './browser.mjs';
const b = await launch();
const p = await b.newPage();
await p.goto('http://127.0.0.1:3500/', { waitUntil: 'load' });
await p.waitForTimeout(800);
console.log(await p.evaluate(() => {
  const groups = {};
  for (const el of document.querySelectorAll('.growth path.gt-draw, .growth line.gt-draw')) {
    const cls = [...el.classList].find(c => c.startsWith('gt-') && c !== 'gt-draw');
    const len = Math.ceil(el.getTotalLength ? el.getTotalLength() : 0);
    (groups[cls] ||= []).push(len);
  }
  return Object.entries(groups).map(([k, v]) => `${k}: max ${Math.max(...v)} (${v.join(', ')})`).join('\n');
}));
await b.close();
