import { chromium } from 'playwright';
import { globSync } from 'node:fs';
import { existsSync } from 'node:fs';

/**
 * Resolve a Chromium binary. Sandboxes ship their own build under
 * PLAYWRIGHT_BROWSERS_PATH and its directory name changes between images, so
 * this discovers it rather than hardcoding a version that silently breaks.
 */
export function chromiumPath() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!root) return null;
  for (const pattern of ['chromium-*/chrome-linux*/chrome', 'chromium-*/chrome-linux*/headless_shell']) {
    const hit = globSync(pattern, { cwd: root }).sort().pop();
    if (hit) return `${root}/${hit}`;
  }
  return null;
}

export function launch(extra = {}) {
  const executablePath = chromiumPath();
  return chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    ...extra,
  });
}
