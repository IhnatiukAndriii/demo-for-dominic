import { test } from '@playwright/test'

type Culprit = {
  tag: string
  class: string
  text: string
  width: number
  right: number
}

async function diagnose(page: import('@playwright/test').Page, url: string, label: string) {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('load')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(500)

  const culprits: Culprit[] = await page.evaluate(() => {
    const viewport = window.innerWidth
    const wide: Culprit[] = []
    document.querySelectorAll('*').forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.right > viewport + 1) {
        const cls =
          typeof el.className === 'string'
            ? el.className
            : (el.className as unknown as SVGAnimatedString)?.baseVal ?? ''
        wide.push({
          tag: el.tagName,
          class: cls.slice(0, 100),
          text: (el.textContent ?? '').slice(0, 60),
          width: Math.round(rect.width),
          right: Math.round(rect.right),
        })
      }
    })
    return wide.slice(0, 25)
  })

  console.log(`\n===== HSCROLL CULPRITS on ${label} =====`)
  console.log(JSON.stringify(culprits, null, 2))
}

test('find hscroll culprit on /de @ 768x1024', async ({ page }) => {
  await diagnose(page, 'http://localhost:3000/de', '/de @ 768x1024')
})

test('find hscroll culprit on /de/influencer @ 768x1024', async ({ page }) => {
  await diagnose(page, 'http://localhost:3000/de/influencer', '/de/influencer @ 768x1024')
})
