import { test, expect, type Page } from '@playwright/test'
import path from 'node:path'

const ROUTES = ['/de', '/en', '/de/influencer', '/en/influencer'] as const

const BREAKPOINTS = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 375, height: 812 },
] as const

const SCREENSHOTS_DIR = path.join('test-results', 'screenshots')

function routeSafe(route: string) {
  return route.replace(/^\//, '').replace(/\//g, '-') || 'root'
}

function shouldIgnoreConsoleError(text: string) {
  const t = text.toLowerCase()
  return (
    t.includes('favicon') ||
    (t.includes('404') && t.includes('favicon')) ||
    t.includes('failed to load resource: the server responded with a status of 404')
  )
}

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.message}`)
  })
  return errors
}

for (const route of ROUTES) {
  for (const bp of BREAKPOINTS) {
    test(`${route} @ ${bp.width}x${bp.height} — no hscroll, no console errors`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height })
      const errors = await collectConsoleErrors(page)

      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.waitForLoadState('load')

      const hasHScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(
        hasHScroll,
        `horizontal scroll detected on ${route} @ ${bp.width}x${bp.height}`,
      ).toBe(false)

      const screenshotPath = path.join(
        SCREENSHOTS_DIR,
        `${routeSafe(route)}-${bp.width}x${bp.height}.png`,
      )
      await page.screenshot({ path: screenshotPath, fullPage: true })

      const significantErrors = errors.filter((e) => !shouldIgnoreConsoleError(e))
      expect(
        significantErrors,
        `console errors on ${route} @ ${bp.width}x${bp.height}:\n${significantErrors.join('\n')}`,
      ).toEqual([])
    })
  }
}

test.describe('per-route structural checks @ 1440x900', () => {
  for (const route of ROUTES) {
    test(`${route} — links, mascot, lang switch, toggle active state`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.waitForLoadState('load')

      const hrefs = await page.$$eval('a', (links) =>
        links.map((l) => l.getAttribute('href')),
      )
      const allowedAnchors = new Set(['#faq', '#brands'])
      for (const href of hrefs) {
        if (href === null || href === '') {
          throw new Error(`empty/null href on ${route}`)
        }
        if (href === '#' && !allowedAnchors.has(href)) {
          throw new Error(`placeholder href="#" on ${route}`)
        }
      }

      const mascot = page
        .locator('img[alt*="fox" i], img[alt*="maskottchen" i], img[alt*="prüffuchs" i], img[alt*="prueffuchs" i]')
        .first()
      await expect(mascot, `mascot/logo not visible on ${route}`).toBeVisible()

      const langSwitch = page.locator('button[aria-label*="Switch to" i]').first()
      await expect(langSwitch, `language switcher missing on ${route}`).toBeVisible()
      await expect(langSwitch).toBeEnabled()

      const isCreatorRoute = route.endsWith('/influencer')
      const desktopToggle = page.locator('[role="tablist"][data-view-toggle]').first()
      await expect(
        desktopToggle,
        `view toggle (role=tablist[data-view-toggle]) missing on ${route}`,
      ).toBeVisible()
      const tabs = desktopToggle.locator('[role="tab"]')
      await expect(tabs).toHaveCount(2)
      const activeTab = desktopToggle.locator('[role="tab"][aria-selected="true"]')
      await expect(
        activeTab,
        `no active tab (aria-selected=true) on ${route}`,
      ).toHaveCount(1)
      const expectedIndex = isCreatorRoute ? 1 : 0
      await expect(
        tabs.nth(expectedIndex),
        `active tab index does not match route ${route}`,
      ).toHaveAttribute('aria-selected', 'true')
    })
  }
})
