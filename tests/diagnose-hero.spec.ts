import { test } from '@playwright/test'

test('screenshot hero section @ 1440x900 on /de', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const base = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'
  await page.goto(`${base}/de`, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('load')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1200)

  const hero = page.locator('section#hero')
  await hero.waitFor({ state: 'visible' })
  await hero.screenshot({ path: 'test-results/hero-after-fix.png' })
})
