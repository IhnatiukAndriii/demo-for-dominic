import { test } from '@playwright/test'
import path from 'node:path'

type Viewport = { name: string; width: number; height: number }
type Combo = { viewport: Viewport; locale: 'de' | 'en'; route: '/' | '/influencer' }

const VIEWPORTS: Record<string, Viewport> = {
  'desktop-1920': { name: 'desktop-1920', width: 1920, height: 1080 },
  'desktop-1366': { name: 'desktop-1366', width: 1366, height: 768 },
  'mobile-430': { name: 'mobile-430', width: 430, height: 932 },
  'mobile-393': { name: 'mobile-393', width: 393, height: 873 },
  'mobile-375': { name: 'mobile-375', width: 375, height: 812 },
}

const COMBOS: Combo[] = [
  { viewport: VIEWPORTS['desktop-1920'], locale: 'de', route: '/' },
  { viewport: VIEWPORTS['desktop-1920'], locale: 'de', route: '/influencer' },
  { viewport: VIEWPORTS['desktop-1920'], locale: 'en', route: '/' },
  { viewport: VIEWPORTS['desktop-1920'], locale: 'en', route: '/influencer' },
  { viewport: VIEWPORTS['mobile-430'], locale: 'de', route: '/' },
  { viewport: VIEWPORTS['mobile-430'], locale: 'de', route: '/influencer' },
  { viewport: VIEWPORTS['mobile-393'], locale: 'de', route: '/' },
  { viewport: VIEWPORTS['mobile-393'], locale: 'de', route: '/influencer' },
  { viewport: VIEWPORTS['desktop-1366'], locale: 'de', route: '/' },
  { viewport: VIEWPORTS['mobile-375'], locale: 'de', route: '/' },
]

const OUTPUT_DIR = '/tmp/visual-regression'

function fileFor({ viewport, locale, route }: Combo) {
  const routeSlug = route === '/' ? '-root' : route.replace(/\//g, '-')
  return path.join(OUTPUT_DIR, `${viewport.name}-${locale}${routeSlug}.png`)
}

for (const combo of COMBOS) {
  const { viewport, locale, route } = combo
  test(`${viewport.name} · ${locale} · ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto(`http://localhost:3000/${locale}${route === '/' ? '' : route}`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1500)
    await page.screenshot({ path: fileFor(combo), fullPage: true })
  })
}
