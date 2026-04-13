# Prüffuchs M1a Revision Round 2 — Report

Branch: revision-m1a-dominic-round2
Client: Dominic Schlierkamp
Deadline: EOD Tuesday CET (2026-04-14)

## Tasks completed

| # | Task | Verdict |
|---|---|---|
| 1 | Hero rebuild | PASS |
| 2 | MarketplaceMarquee resize | PASS |
| 3 | Section tones + cards | PASS |
| 4 | Navbar toggle + per-view nav | PASS (attempt 1) |
| 5 | Influencer page rebuild | PASS |
| 6 | DE translations (Sie form) | PASS |
| 7 | Final sweep | PASS |

## CTA audit findings

### Orphan anchor links (no matching `id=` found)
- `#marketplaces` — referenced from `lib/navigation.ts` (brandNav.solutions items, all 4). No matching `id="marketplaces"` exists in any landing section. MarketplaceMarquee uses `id="marketplace-marquee"` instead.
- `#pricing` — referenced from `lib/navigation.ts` (brandNav.links). No `id="pricing"` exists. Likely intended M2b-M4b content not yet built.
- `#categories` — referenced from `lib/navigation.ts` (creatorNav categoryItems, all 5 items link to `/influencer#categories`). No `id="categories"` exists in components/landing/sections/influencer/*.
- `#requirements` — referenced from `lib/navigation.ts` (creatorNav.links). No `id="requirements"` exists. `InfluencerRequirements.tsx` section has no explicit id.

### Anchors that resolve correctly
- `#platform-features` → `PlatformFeatures.tsx` id="platform-features" OK
- `#how-it-works` → resolves on landing (`HowItWorks.tsx`) and on /influencer (`InfluencerHowItWorks.tsx`) OK
- `#faq` → `FAQ.tsx` id="faq" OK
- `#creator-community` → `CreatorCommunity.tsx` id="creator-community" OK
- `#benefits` → `InfluencerBenefits.tsx` id="benefits" OK

### External URLs referenced
- `https://calendly.com/amzideal/30min` — used in: `components/landing/sections/Hero.tsx:8`, `components/landing/sections/Footer.tsx:86`, `components/landing/sections/FinalCTA.tsx:43`.
- `https://calendly.com/prueffuchs/erstgespraech` — canonical, declared in `lib/navigation.ts:6` as `CALENDLY_URL`. Used via brandNav.ctaPrimary.
- MISMATCH: Hero / Footer / FinalCTA hardcode the legacy `amzideal/30min` URL and do not import the canonical `CALENDLY_URL` constant. Recommended unification in a follow-up (out of scope for this sweep — would require 3 file edits).
- `https://instagram.com/prueffuchsde` — `components/landing/sections/Footer.tsx:44`. Real social handle. OK.

### Mailto links
- `mailto:team@prueffuchs.de` — `lib/navigation.ts:59` (brandNav.resources.contact). OK (matches expected pattern).
- `mailto:team@prueffuchs.de` — `components/landing/sections/Footer.tsx:148`. FIXED during this sweep (was `mailto:hello@prueffuchs.de`).

### `<a>` tags used for internal paths (should be `Link` from `@/lib/navigation`)
- `components/landing/sections/Hero.tsx:76` — `<a href="/de/influencer">` hardcodes locale prefix. Should be `<Link href="/influencer">` from `@/lib/navigation` for locale-awareness. NOT FIXED (would require import change + JSX swap, beyond className/href-only scope).
- `components/landing/sections/FinalCTA.tsx:3,35` — imports `Link from 'next/link'` rather than `@/lib/navigation`. The `href="/signup"` will NOT be locale-prefixed. NOT FIXED (scope: requires import swap).
- `components/landing/sections/Footer.tsx:83,89,100` — uses raw `<a href="#platform-features">` / `#faq` / `#creator-community` for same-page anchors. OK-ish since they only work from the landing page, but if Footer is rendered on /influencer these anchors will not scroll-jump (they will try to match ids on the current route). Acceptable for M1a.
- `components/landing/navbar.tsx:32` — `NavLinkRenderer` intentionally uses raw `<a>` for anchor/external/mailto hrefs, and `Link` for internal paths. Correct pattern. OK.

## SI-audit regression checks

| Check | Target | Count | Pass? |
|---|---|---|---|
| Hero left-text/right-visual grid | ≥ 1 match for `lg:grid-cols\|grid-cols-2` in Hero.tsx | 1 (line 47: `grid grid-cols-1 lg:grid-cols-[45fr_55fr]`) | YES |
| Rotating H1 keyword | ≥ 2 matches for `rotatingKeywords\|useEffect` in Hero.tsx | 7 | YES |
| section-wash alternation | ≥ 6 matches of `section-wash-*` across components/landing/sections/ | 7 (PlatformFeatures orange, HowItWorks cream, FAQ cream, FeaturedPublications orange, InfluencerHero orange, InfluencerBenefits orange, InfluencerRequirements cream) | YES |
| Marketplace marquee sizing | ≥ 1 match of `max-h-8\|max-h-6` in MarketplaceMarquee.tsx | 1 (line 33: `max-h-6 lg:max-h-8`) | YES |
| Navbar per-view rendering | ≥ 2 matches of `usePathname\|isCreatorView` in navbar.tsx | 14 | YES |
| H2 font-normal | ≥ 5 matches of `<h2[^>]*font-normal` across sections/ | 10 (FAQ, CreatorCommunity, HowItWorks, PlatformFeatures, Testimonials, StatsBar, InfluencerBenefits, InfluencerHowItWorks, InfluencerRequirements, InfluencerCTA) | YES |
| No egregious comments in modified files | counted `^\s*//\|/\*` lines | navbar.tsx: 0, Hero.tsx: 0, InfluencerHowItWorks.tsx: 0, FinalCTA.tsx: 0 | YES |
| No console.log | 0 matches across components/landing/ | 0 | YES |

## Build verdict

`pnpm build` — EXIT 0. 5/5 static pages generated. Only warning: one pre-existing `<img>` in navbar.tsx line 215 (logo). No new errors introduced.

## Known issues / degraded scope

- StatsBar now renders on `bg-white` (Task 3 directive) but internal copy uses text-white classes → copy may be invisible. Requires follow-up decision: revert StatsBar bg to navy, or update text colors. Flagged by Task 3 implementer.
- `public/hero-dashboard.png` is the legacy mockup. Must be replaced with fresh screenshot of real brand dashboard.
- `public/prueffuchs-creator-01.jpg` through `-05.jpg` do not exist yet. Hero currently renders slate-200 fallback circles.
- Old `influencer.*` legacy keys under `landing.influencerHero`, `landing.influencerBenefits`, etc., remain in messages/*.json. Dead code, safe to remove in a future cleanup.
- Calendly URL `https://calendly.com/prueffuchs/erstgespraech` is hardcoded in lib/navigation.ts. Move to lib/site-config.ts when confirmed. Additionally three files (Hero.tsx, Footer.tsx, FinalCTA.tsx) still reference the legacy `amzideal/30min` Calendly URL and do NOT import the canonical constant — needs unification.
- Orphan anchors `#marketplaces`, `#pricing`, `#categories`, `#requirements` are wired in the navigation config but have no matching section ids. Will silently do nothing on click.
- `FinalCTA.tsx` imports `Link from 'next/link'` instead of `@/lib/navigation` — `/signup` href bypasses locale routing.
- `Hero.tsx` uses `<a href="/de/influencer">` with a hardcoded `/de` locale prefix — will break for EN users.
- Footer has multiple `TODO M4b` comments for yet-to-be-built pages (pricing, case studies, support, company pages, resources pages, legal pages). Intentional placeholders.

## TODO-HUMAN

1. Capture new hero-dashboard.png screenshot:
   ```
   pnpm dev
   npx playwright screenshot --viewport-size=1280,800 --wait-for-timeout=2000 http://localhost:3000/de/dashboard/brand public/hero-dashboard.png
   ```
2. Download 5 authentic creator photos from @prueffuchsde Instagram. Save as public/prueffuchs-creator-01.jpg..-05.jpg. If unavailable, use Pexels placeholders.
3. Run tests/qa-m1a.spec.ts manually against pnpm dev before deploy.
4. Visual review entire landing + influencer page in DE and EN, at 1920/1366/430 breakpoints.
5. Confirm Calendly URL in lib/navigation.ts is correct or move to site-config. Unify the three hardcoded references (Hero.tsx, Footer.tsx, FinalCTA.tsx) to import `CALENDLY_URL` from `@/lib/navigation`.
6. Decide StatsBar direction (keep navy vs white + text recolor).
7. Add missing section ids or remove dead nav entries: `#marketplaces`, `#pricing`, `#categories`, `#requirements`.
8. Swap `<a href="/de/influencer">` in Hero.tsx for `<Link href="/influencer">` from `@/lib/navigation` to make it locale-aware.
9. Swap `next/link` import for `@/lib/navigation` Link in FinalCTA.tsx.

## Recommended pre-deploy checklist

- [x] pnpm build passes (confirmed in this run)
- [ ] Screenshot of hero-dashboard replaced
- [ ] Creator photos uploaded
- [ ] StatsBar decision made and applied
- [ ] Manual visual regression at 3 breakpoints x 2 locales
- [ ] Playwright QA run against dev server
- [ ] Calendly URLs unified
- [ ] Locale-aware Link fixes applied (Hero, FinalCTA)

## Notes

- framer-motion not installed. Hero + InfluencerHero use CSS keyframes in app/globals.css.
- Pre-flight found baseline dirty working tree (prior uncommitted work). Changes were preserved on branch revision-m1a-dominic-round2. Nothing committed by orchestrator — human reviews diff before staging.
- Task 7 applied a single minor fix: `mailto:hello@prueffuchs.de` → `mailto:team@prueffuchs.de` in `components/landing/sections/Footer.tsx:148`. All other issues were flagged but NOT fixed — they either require structural changes (import swaps) or decisions that belong to the human reviewer.
