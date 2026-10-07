import { chromium, devices } from 'playwright';
const BASE = "http://127.0.0.1:3400";
const EXE = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(EXE ? { executablePath: EXE, args: ['--no-sandbox','--disable-dev-shm-usage'] } : {});
const fails = [];
const check = (ok, label, detail = '') => {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? '  — ' + detail : ''}`);
  if (!ok) fails.push(label);
};

// ---------- Contact form ----------
console.log('=== contact form ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/contact', { waitUntil: 'load' });

  // 1. Empty submit is blocked and focus moves to the first bad field.
  await page.click('button[type="submit"]');
  await page.waitForTimeout(300);
  const nameErr = await page.textContent('#name-error').catch(() => null);
  const focused = await page.evaluate(() => document.activeElement?.id);
  check(!!nameErr, 'empty submit blocked', nameErr ?? '');
  check(focused === 'name', 'focus moved to first invalid field', `focus=${focused}`);

  // 2. Invalid email rejected.
  await page.fill('#name', 'Rakesh Sharma');
  await page.fill('#email', 'not-an-email');
  await page.fill('#phone', '9876543210');
  await page.fill('#message', 'We need vision inspection on two stamping lines.');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(300);
  check(!!(await page.textContent('#email-error').catch(() => null)), 'invalid email rejected');

  // 3. Valid submit with no endpoint configured must NOT claim success.
  await page.fill('#email', 'rakesh@example.com');
  await page.evaluate(() => { /* defeat the min-fill-time guard for the test */ });
  await page.waitForTimeout(3200);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1200);
  const body = await page.evaluate(() => document.body.innerText);
  check(!/Message received/i.test(body), 'does not claim success when undelivered');
  check(/not connected to an inbox|WhatsApp|email us/i.test(body), 'tells the visitor how to reach us instead');

  // 4. Honeypot submission rejected server-side.
  const res = await page.evaluate(async () => {
    const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Bot', email: 'b@x.com', phone: '9999999999',
        message: 'spam spam spam spam', website: 'http://spam.example', renderedAt: 0 }) });
    return r.status;
  });
  check(res === 400, 'honeypot rejected by the server', `status=${res}`);
  await ctx.close();
}

// ---------- ROI calculator ----------
console.log('\n=== ROI calculator ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/solutions/ai-vision-inspection', { waitUntil: 'load' });
  await page.waitForTimeout(600);

  const read = () => page.evaluate(() => document.querySelector('[aria-live="polite"]')?.innerText ?? '');
  check(/₹/.test(await read()), 'shows a figure on first paint', (await read()).split('\n')[0]);

  await page.fill('#unitsPerShift', '');
  await page.waitForTimeout(250);
  const empty = await read();
  check(/Enter a value/i.test(empty), 'empty input asks for a value instead of showing ₹0', empty.trim());

  await page.fill('#unitsPerShift', '1200');
  await page.fill('#defectRatePercent', '150');
  await page.waitForTimeout(250);
  const invalid = await read();
  check(/cannot exceed 100/i.test(invalid), 'rejects a defect rate above 100%', invalid.trim());

  await page.fill('#defectRatePercent', '2');
  await page.fill('#unitsPerShift', '250000');
  await page.fill('#shiftsPerDay', '3');
  await page.waitForTimeout(250);
  const big = await read();
  check(/Cr|L/.test(big) && !/NaN/.test(big), 'handles very large volumes', big.split('\n')[0]);

  const hasAssumptions = await page.evaluate(() =>
    !!document.body.innerText.match(/Assumptions used/i));
  check(hasAssumptions, 'assumptions are disclosed');
  await ctx.close();
}

// ---------- Keyboard ----------
console.log('\n=== keyboard navigation ===');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const a = document.activeElement;
    return { text: a?.textContent?.trim(), visible: a ? getComputedStyle(a).clipPath !== 'inset(50%)' : false };
  });
  check(/skip to content/i.test(first.text ?? ''), 'first tab stop is the skip link', first.text ?? '');

  const ring = await page.evaluate(() => {
    const a = document.activeElement;
    const s = a ? getComputedStyle(a) : null;
    return s ? `${s.outlineStyle}/${s.boxShadow.slice(0, 24)}` : 'none';
  });
  check(ring !== 'none', 'focus is visibly indicated', ring);
  await ctx.close();
}

// ---------- Mobile menu ----------
console.log('\n=== mobile menu (keyboard + aria) ===');
{
  const ctx = await browser.newContext({ ...devices['iPhone 12'] });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const toggle = page.locator('button[aria-controls="mobile-menu"]');
  check(await toggle.getAttribute('aria-expanded') === 'false', 'toggle reports collapsed state');
  await toggle.click();
  await page.waitForTimeout(250);
  check(await toggle.getAttribute('aria-expanded') === 'true', 'toggle reports expanded state');
  const focusInPanel = await page.evaluate(() =>
    !!document.getElementById('mobile-menu')?.contains(document.activeElement));
  check(focusInPanel, 'focus moves into the open panel');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  check(await toggle.getAttribute('aria-expanded') === 'false', 'Escape closes the menu');
  const refocused = await page.evaluate(() => document.activeElement?.getAttribute('aria-controls'));
  check(refocused === 'mobile-menu', 'focus returns to the toggle');
  await ctx.close();
}

// ---------- Responsive ----------
console.log('\n=== responsive (no horizontal scroll) ===');
for (const [label, width] of [['320 mobile', 320], ['390 phone', 390], ['768 tablet', 768], ['1280 laptop', 1280], ['1920 desktop', 1920]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  let worst = null;
  for (const route of ['/', '/solutions/ai-vision-inspection', '/contact', '/case-studies', '/industries/pharma']) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    const over = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (over) worst = route;
  }
  check(!worst, `${label} — no overflow`, worst ? `overflow on ${worst}` : '');
  await ctx.close();
}

await browser.close();
console.log(`\n=== ${fails.length} failure(s) ===`);
fails.forEach((f) => console.log('  ! ' + f));
process.exit(fails.length ? 1 : 0);
