import { request } from '@playwright/test'

const ROUTES = ['/de', '/en', '/de/influencer', '/en/influencer']

export default async function globalSetup() {
  const ctx = await request.newContext({ baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000' })
  for (const route of ROUTES) {
    try {
      const res = await ctx.get(route, { timeout: 120_000 })
      res.ok()
    } catch {
      // ignore warmup failures — real tests will surface them
    }
  }
  await ctx.dispose()
}
