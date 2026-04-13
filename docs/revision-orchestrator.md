# Prüffuchs M1a Revision Round 2 — Master Orchestrator

**Deadline:** EOD Tuesday CET (2026-04-14)
**Client:** Dominic Schlierkamp
**Branch:** `revision-m1a-dominic-round2`
**Based on:** `docs/si-audit.md` (StackInfluence structural audit, 460 lines)
**Reference:** Dominic's 11-point feedback (see "Feedback map" below)

---

## Role

You orchestrate 7 tasks sequentially. For each task: spawn an isolated subagent with the task block, then invoke `@verifier` with the task's acceptance criteria. Never run two tasks in parallel. Never skip `@verifier`. Never commit.

Do not implement directly in your own context — delegate each task to a fresh subagent so contexts stay clean. You are the conductor, not the musician.

---

## Pre-flight checks (run ONCE before Task 1)

Stop and exit with a clear error message if any fails:

1. `docs/si-audit.md` exists and line count > 150
2. `git status` is clean (no uncommitted changes)
3. Current branch is `main` OR already `revision-m1a-dominic-round2`
4. `pnpm build` passes on current HEAD (baseline healthy)
5. `CLAUDE.md` exists in repo root and has been read in full
6. `docs/si-audit.md` has been read in full — this is your SI reference for all tasks, do not re-fetch SI from the web

If all pass: create branch `revision-m1a-dominic-round2` (or checkout if exists), then proceed to Task 1.

---

## Global constraints (apply to EVERY task)

- DO NOT start `pnpm dev` or any dev server.
- DO NOT run Playwright during tasks (Playwright is only used inside `@verifier`).
- DO NOT use `curl`, web fetch, or any outbound HTTP.
- DO NOT install new npm packages. If Framer Motion is not installed, use CSS keyframes in `app/globals.css` as fallback — see Task 1.
- DO NOT modify: `next.config.mjs`, `middleware.ts`, `i18n/routing.ts`, `i18n/request.ts`, `tailwind.config.ts`, `tsconfig.json`, `components.json`, `package.json`, `pnpm-lock.yaml`, anything in `supabase/` or `lib/supabase/`.
- DO NOT refactor code outside the task's declared file scope.
- DO NOT add code comments (project convention from CLAUDE.md — code stays comment-free).
- DO NOT commit, push, or stage files. Human reviews each task diff manually.
- If a bash command runs longer than 45 seconds, abort and report.
- Between every two tasks: run `pnpm build`. If it fails, STOP all subsequent tasks and print last 20 lines of build output to FINAL REPORT.
- All new strings in German must use **formal Sie** form (Dominic confirmed — B2B DACH convention).
- All new i18n keys added to `messages/de.json` must exist identically in `messages/en.json` and vice versa.
- Never verify success by looking at a mocked test or compilation success alone. `@verifier` must grep actual file contents and run real build.

---

## Dependency graph

```
Task 1 (Hero)           → independent
Task 2 (MarketplaceMarquee) → independent
Task 3 (Section tones)  → must run AFTER Task 1 (Hero is one of the sections Task 3 won't touch, but Task 3 relies on orange-wash CSS utility that Task 1 may introduce)
Task 4 (Navbar toggle)  → independent, ARCHITECTURAL RISK
Task 5 (Influencer page) → must run AFTER Task 4 (needs working toggle to be visible)
Task 6 (DE translations) → must run LAST among code-writing tasks (covers keys added by 1–5)
Task 7 (Final sweep)    → runs LAST (read-only + minor fixes)
```

**Execution order:** 1 → 2 → 3 → 4 → 5 → 6 → 7

---

## Hard-stop rule for Task 4

Task 4 is the single architectural risk. Budget: **2 `@verifier` attempts maximum**.

If both FAIL:
- Do NOT attempt Task 5.
- Skip directly to Task 6.
- In FINAL REPORT: `"Task 4 BLOCKED after 2 attempts. Task 5 SKIPPED. Degraded scope — human decision required before client delivery. Current navbar state: <describe>."`

This is a deliberate fallback to save the rest of the revision.

---

## Feedback map (Dominic's 11 points → tasks)

| # | Feedback point | Task |
|---|---|---|
| 1 | Logo + hero dashboard too small | Task 1 |
| 2 | Dashboard entrance animations missing | Task 1 |
| 3 | German translations wrong / literal | Task 6 |
| 4 | KPI numbers too small, influencer photos missing | Task 1 |
| 5 | Brand/Creator switch too complicated | Task 4 |
| 6 | Subpages and menu items must change per view | Task 4 |
| 7 | Creator page must match SI structure | Task 5 |
| 8 | White cards on colored backgrounds (alternating section tones) | Task 3 |
| 9 | Marketplace logo bar too large | Task 2 |
| 10 | CTA audit (click through every button) | Task 7 |
| 11 | Full SI re-study independently | Task 0 (DONE — `docs/si-audit.md`) |

---

# TASK 1 — Hero rebuild

**Feedback points:** 1, 2, 4
**Risk:** Medium (screenshot capture is manual, everything else is isolated)

## File scope (allowed to modify)

- `components/landing/sections/Hero.tsx`
- `messages/de.json` — add keys under `landing.hero.*` only
- `messages/en.json` — mirror all keys added to de.json
- `app/globals.css` — add `@keyframes` + utility classes ONLY if Framer Motion is not installed
- `public/hero-dashboard.png` — leave in place, human will replace manually (see TODO-HUMAN below)

## Prohibited in this task

- Do not modify any other section file (PlatformFeatures, HowItWorks, etc. — that's Task 3).
- Do not touch `components/landing/navbar.tsx` (that's Task 4).
- Do not change `tailwind.config.ts` — custom keyframes go in `globals.css`.

## Detection step (run first)

Grep `package.json` for `framer-motion`. Set variable `USE_FRAMER=true|false`. Log result at start of task.

If `USE_FRAMER=true`: import `motion` from `framer-motion` for entrance animations.
If `USE_FRAMER=false`: add `@keyframes` and `.animate-*` utility classes to `app/globals.css`.

## Spec — informed by `docs/si-audit.md`

### Layout (matches SI Brands-home hero pattern, section "Page: Home — Brands view / Hero pattern")

- Two-column at `lg+` breakpoint: left 45% text stack, right 50%+ visual composition
- Stacked on `md` and below (text on top, visual below)
- Section vertical padding: `py-24 lg:py-32` (matches audit "~140px vertical")
- Section horizontal gutter: `px-6 lg:px-10` (matches audit "~40px horizontal")
- Max content width: `max-w-7xl mx-auto`

### Hero background

Soft orange wash — adaptation of SI's 8% violet rule (audit section "Global patterns #6–7"):

```css
background: linear-gradient(180deg, rgba(249, 115, 22, 0.08) 0%, rgba(255, 255, 255, 1) 100%);
```

Implement inline via Tailwind arbitrary values or add to `globals.css` as `.hero-wash` utility class.

### H1 typography — matches SI audit "Typography / H1 ≈ 57.6px / weight 400"

- Font size: `text-5xl lg:text-6xl` (~48–60px)
- Font weight: `font-normal` (400, NOT bold — this is the editorial feel Dominic wants)
- Color: existing Prüffuchs dark text (`text-slate-900` or project token)
- Line height: `leading-[1.1]`

### Rotating keyword inside H1 — SI signature move (audit Global pattern #9)

Headline structure:
> Micro-Influencer für Ihr Wachstum auf **[Amazon | OTTO | Kaufland | Zalando]**

Implementation:
- Keyword swaps every 2.5 seconds
- Fade out + fade in transition (200ms)
- Rotating array: `["Amazon", "OTTO", "Kaufland", "Zalando"]`
- Keyword rendered in Prüffuchs orange (`text-orange-500`) to draw the eye
- Use `useState` + `useEffect` interval
- i18n keys: `landing.hero.headlinePrefix` + `landing.hero.rotatingKeywords[]`

### Subline

- 1–2 sentences, placed directly below H1
- `text-lg lg:text-xl text-slate-600`
- Max width `max-w-xl`
- i18n key: `landing.hero.subline`

### CTA buttons — 2 primary + secondary pattern from SI

- Primary: "Erstgespräch buchen" → Calendly link from `lib/site-config.ts`
- Secondary: "Ich bin Influencer" → `/de/influencer` (ghost button style)
- Existing shadcn `<Button>` variants
- i18n keys: `landing.hero.ctaPrimary`, `landing.hero.ctaSecondary`

### Right-column visual composition

Three layered elements:

**1. Dashboard screenshot (main visual)**

- `<Image>` from `next/image`, `src="/hero-dashboard.png"`
- Width `min 640px` on `lg+`, `min 520px` on `md`
- `rounded-2xl shadow-2xl`
- `priority` prop (above the fold)
- **TODO-HUMAN marker:** The current `public/hero-dashboard.png` is the old mockup. It must be replaced with a freshly captured screenshot from the REAL brand dashboard (`/dashboard/brand`) rendered via `brand-dashboard.tsx`. See "TODO-HUMAN after task" section at end of Task 1.

**2. Influencer photo row (audit Global pattern — creator headshots used in SI credibility sections)**

- Absolute positioned over the bottom-left corner of the dashboard screenshot
- Row of 5 circular avatars, 44px each, overlapping by `-ml-2`
- Images from: `/prueffuchs-creator-01.jpg` through `-05.jpg`
- **TODO-HUMAN marker:** these images do not exist yet. Human will download from `@prueffuchsde` Instagram (permission already confirmed by Dominic on Friday). For now, reference the paths in code — Next.js will 404 until the files are added, but the build will not fail. Render a fallback `bg-slate-200` circle via CSS if image fails (`onError` handler).
- Add subtle white ring: `ring-2 ring-white`
- Container: `absolute -bottom-6 left-6 flex items-center`

**3. Fox mascot**

- `<Image src="/prueffuchs-mascot-full.png">`
- Positioned bottom-right, overlapping the dashboard screenshot
- Size: `w-44 lg:w-52` (~180–200px)
- `absolute -right-8 -bottom-4`
- Hidden on mobile (`hidden md:block`)

### Entrance animations

**If Framer Motion installed:**

```tsx
import { motion } from "framer-motion";
```

Sequence (delays relative to page load):
- Headline: fade + slide-up from `y: 20`, delay 0ms, duration 500ms
- Subline: same, delay 150ms
- CTAs: same, delay 300ms
- Dashboard visual: fade + scale from `0.95`, delay 400ms, duration 600ms
- Influencer row: fade, delay 700ms
- Mascot: fade + slide from right (`x: 40`), delay 800ms, duration 500ms

**If Framer Motion NOT installed:**

Add to `app/globals.css`:

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fadeSlideLeft {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
.anim-fade-up { animation: fadeSlideUp 500ms ease-out forwards; opacity: 0; }
.anim-fade-scale { animation: fadeScale 600ms ease-out forwards; opacity: 0; }
.anim-fade-left { animation: fadeSlideLeft 500ms ease-out forwards; opacity: 0; }
.delay-150 { animation-delay: 150ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-700 { animation-delay: 700ms; }
.delay-800 { animation-delay: 800ms; }
```

Apply to each element via className.

## Acceptance criteria (verifier checks)

- [ ] `pnpm build` exits 0
- [ ] `pnpm tsc --noEmit` exits 0 (or `pnpm typecheck` if script exists)
- [ ] `grep -c "rotating\|rotatingKeyword\|useEffect" components/landing/sections/Hero.tsx` ≥ 2
- [ ] `grep -c "motion\.\|anim-fade" components/landing/sections/Hero.tsx` ≥ 4
- [ ] `grep "hero-dashboard.png" components/landing/sections/Hero.tsx` returns ≥ 1
- [ ] `grep "prueffuchs-mascot-full.png" components/landing/sections/Hero.tsx` returns ≥ 1
- [ ] `grep "prueffuchs-creator-" components/landing/sections/Hero.tsx` returns ≥ 1
- [ ] `grep "font-normal\|font-light" components/landing/sections/Hero.tsx` returns ≥ 1 (H1 weight)
- [ ] `node -e "JSON.parse(require('fs').readFileSync('messages/de.json','utf8'))"` exits 0
- [ ] `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"` exits 0
- [ ] All new keys under `landing.hero.*` in de.json exist identically in en.json (compare key sets via script)
- [ ] No files modified outside declared scope (git diff --name-only within allowed list)
- [ ] No code comments added to Hero.tsx (`grep -c "^\s*//\|/\*" components/landing/sections/Hero.tsx` returns 0)
- [ ] Task report includes TODO-HUMAN markers for: screenshot capture, creator photos

## TODO-HUMAN after task

Write these explicitly to FINAL REPORT:

1. **Screenshot capture:** Run manually after Task 1 completes:
   ```bash
   pnpm dev
   # then in another terminal:
   npx playwright screenshot \
     --viewport-size=1280,800 \
     --wait-for-timeout=2000 \
     http://localhost:3000/de/dashboard/brand \
     public/hero-dashboard.png
   ```
   Replace `public/hero-dashboard.png` with the result. Verify KPI numbers are readable (≥ 48px in output).

2. **Creator photos:** Download 5 authentic creator photos from `@prueffuchsde` Instagram and save as `public/prueffuchs-creator-01.jpg` through `-05.jpg`. Square crop, ~200x200px each. If Instagram photos are unavailable, use stock placeholders from Pexels tagged "creator woman product" to unblock the build.

---

# TASK 2 — Marketplace logo bar resize

**Feedback point:** 9
**Risk:** Minimal

## File scope

- `components/landing/sections/MarketplaceMarquee.tsx`

## Prohibited

- Do not modify SVG files in `public/marketplaces/`
- Do not touch any other component

## Spec — matches SI audit "logo marquee pattern"

Per audit: SI trust-logos marquee is `~93px tall`, thin, unobtrusive. Current Prüffuchs bar is likely oversized (Dominic's feedback point 9).

Changes:
- Logo max height: `max-h-8` (32px) on `lg+`, `max-h-6` (24px) on mobile
- Container vertical padding: `py-10 lg:py-12` (was likely `py-16` or larger)
- Gap between logos: `gap-8 lg:gap-12` (if currently larger, reduce)
- Opacity on logos: `opacity-60 hover:opacity-100` (grayscale-to-color effect optional)
- Marquee animation duration: if current is fast (<30s), change to `40s` for calmer feel
- Background: white (no tinting — marquee sits on plain white section)

## Acceptance criteria

- [ ] `pnpm build` exits 0
- [ ] `grep "max-h-8\|max-h-6" components/landing/sections/MarketplaceMarquee.tsx` returns ≥ 1
- [ ] `grep "max-h-12\|max-h-16\|max-h-20" components/landing/sections/MarketplaceMarquee.tsx` returns 0 (old large sizes removed)
- [ ] `grep "py-10\|py-12" components/landing/sections/MarketplaceMarquee.tsx` returns ≥ 1
- [ ] No files modified outside declared scope

---

# TASK 3 — Section surface tones + content cards

**Feedback point:** 8
**Risk:** Medium (touches 8 files — consistency risk)

## File scope

- `components/landing/sections/PlatformFeatures.tsx`
- `components/landing/sections/HowItWorks.tsx`
- `components/landing/sections/CreatorCommunity.tsx`
- `components/landing/sections/Testimonials.tsx`
- `components/landing/sections/FAQ.tsx`
- `components/landing/sections/FeaturedPublications.tsx`
- `components/landing/sections/StatsBar.tsx`
- `components/landing/sections/FinalCTA.tsx`
- `components/landing/sections/influencer/InfluencerBenefits.tsx`
- `components/landing/sections/influencer/InfluencerHowItWorks.tsx`
- `components/landing/sections/influencer/InfluencerRequirements.tsx`
- `app/globals.css` — add 2 utility classes

## Prohibited

- Do not touch `Hero.tsx`, `MarketplaceMarquee.tsx`, `Footer.tsx`, `navbar.tsx`
- Do not modify section content (copy, structure, imports) — only spacing, background, and card styling

## Spec — informed by audit "Global patterns #6–7"

### Critical correction from Dominic's feedback wording

Dominic said "white cards on colored backgrounds." Audit reveals SI actually does **alternating section surface tones with white content cards on top**. The sections themselves get a subtle tinted background; cards stay white.

### Add to `app/globals.css`

```css
.section-wash-orange {
  background: linear-gradient(180deg, rgba(249, 115, 22, 0.08) 0%, rgba(255, 255, 255, 1) 100%);
}
.section-wash-cream {
  background: linear-gradient(180deg, rgba(254, 243, 199, 0.4) 0%, rgba(255, 255, 255, 1) 100%);
}
```

### Alternation pattern (top to bottom of landing page)

Apply to each section's root element (use `cn()` if project uses it, otherwise direct className):

| Section | Surface tone |
|---|---|
| Hero (Task 1) | orange wash — already handled |
| MarketplaceMarquee (Task 2) | white — already handled |
| PlatformFeatures | `section-wash-orange` |
| StatsBar | white |
| HowItWorks | `section-wash-cream` |
| CreatorCommunity | white |
| FeaturedPublications | `section-wash-orange` |
| Testimonials | white |
| FAQ | `section-wash-cream` |
| FinalCTA | white (with existing CTA treatment) |

Influencer page sections follow the same alternation from top (orange → white → cream → white).

### Section spacing (applies to ALL sections in scope)

- Vertical padding: `py-20 lg:py-28` (matches audit "~140px")
- Horizontal gutter: `px-6 lg:px-10`
- Max content width unchanged (keep existing `max-w-*` patterns)

### Content card styling (cards INSIDE sections)

Wherever a section renders a card or tile (feature card, how-it-works step, testimonial, FAQ item):
- Card background: `bg-white`
- Border radius: `rounded-2xl`
- Shadow: `shadow-sm hover:shadow-md transition-shadow`
- Border: `border border-slate-100`
- Padding: `p-6 lg:p-8`

Do NOT add these styles if the card already has them — match existing patterns, don't duplicate.

### H2 section headings — consistency pass (audit "Typography")

Ensure every section H2 uses:
- `text-3xl lg:text-4xl`
- `font-normal` (matches SI's editorial weight)
- `text-slate-900`
- `mb-4`

## Acceptance criteria

- [ ] `pnpm build` exits 0
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] `grep -rn "section-wash-orange\|section-wash-cream" components/landing/sections/ | wc -l` ≥ 6
- [ ] `grep "section-wash-orange" app/globals.css` returns 1 match
- [ ] `grep "section-wash-cream" app/globals.css` returns 1 match
- [ ] `grep -c "py-20\|py-28" components/landing/sections/*.tsx components/landing/sections/influencer/*.tsx` ≥ 8
- [ ] No files modified outside declared scope
- [ ] No code comments added

---

# TASK 4 — Navbar toggle + per-view nav (ARCHITECTURAL, HARD-STOP RULE APPLIES)

**Feedback points:** 5, 6
**Risk:** HIGH — budget: 2 `@verifier` attempts, then hard-stop

## File scope

- `components/landing/navbar.tsx`
- `lib/navigation.ts` — add/update per-view nav config
- `messages/de.json` — add keys under `nav.brand.*` and `nav.creator.*`
- `messages/en.json` — mirror

## Prohibited

- Do not modify `app/[locale]/layout.tsx`
- Do not modify any file in `app/[locale]/(brand)/` or `app/[locale]/(creator)/`
- Do not touch `middleware.ts` or `i18n/routing.ts`
- Do not create new route segments

## Key insight (saves hours)

Route groups `(brand)` and `(creator)` already exist in `app/[locale]/`. The toggle does NOT require routing changes — it's a pure navbar logic change:

- `(brand)` view is served at `/de` (or locale root)
- `(creator)` view is served at `/de/influencer`
- Navbar reads current pathname via `usePathname()` and renders different nav items based on whether pathname matches `/[locale]/influencer*` (creator view) or otherwise (brand view)

## Spec — informed by audit "Navigation (Brands)" + "Navigation (Creators)"

### Toggle UI (audit: "top-left segmented control")

- Segmented pill control at the very top of navbar, left-aligned
- Two buttons: `Für Marken` (Sie form) and `Für Creator`
- Active state: solid orange background + white text
- Inactive state: transparent + slate text
- Click on "Für Marken" → `router.push('/{locale}')`
- Click on "Für Creator" → `router.push('/{locale}/influencer')`
- Locale-aware via `useLocale()` from `next-intl`
- Persistent across pages within the same view

### Brand view nav structure (audit: "Platform ▾ | Solutions ▾ | Pricing | Resources ▾")

Prüffuchs adaptation:

- **Plattform ▾** (dropdown, 4 items)
  - Influencer-Kampagnen → `#platform-features` (anchor)
  - Automatisierte Verifikation → `#platform-features`
  - Kampagnen-Management → `#how-it-works`
  - Admin-Dashboard → `#platform-features`
- **Lösungen ▾** (dropdown, 4 items)
  - Amazon-Verkäufer → `#marketplaces`
  - OTTO & Kaufland → `#marketplaces`
  - Zalando-Brands → `#marketplaces`
  - Shopify-Stores → `#marketplaces`
- **Preise** (direct link) → `#pricing` anchor
- **Ressourcen ▾** (dropdown, 3 items)
  - FAQ → `#faq`
  - Kontakt → `mailto:team@prueffuchs.de`
  - Impressum → `/de/impressum` (page may 404 — that's fine for M1a)
- Primary CTA: `Erstgespräch buchen` → Calendly link
- Secondary: `Anmelden` → `/de/login`

### Creator view nav structure (audit: "Flat nav links, no dropdowns")

- **So funktioniert's** → `/de/influencer#how-it-works`
- **Kategorien** (flat inline links — audit pattern from SI creator nav)
  - Beauty & Cosmetics
  - Fashion
  - Home & Living
  - Fitness & Sport
  - Food & Drink
- **Anforderungen** → `/de/influencer#requirements`
- Primary CTA: `Jetzt als Creator registrieren` → `/de/signup?role=creator`
- Secondary: `Anmelden` → `/de/login`

### Navbar implementation sketch

```tsx
"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");

  const isCreatorView = pathname.startsWith("/influencer");
  const nav = isCreatorView ? creatorNav(t) : brandNav(t);

  return (
    <header className="...">
      <ViewToggle
        active={isCreatorView ? "creator" : "brand"}
        onBrand={() => router.push("/")}
        onCreator={() => router.push("/influencer")}
      />
      <Logo />
      <NavItems items={nav.items} />
      <div className="ml-auto flex gap-2">
        <Button>{nav.ctaPrimary}</Button>
        <Link href="/login">{t("login")}</Link>
      </div>
    </header>
  );
}
```

Use existing shadcn `NavigationMenu` (`components/ui/navigation-menu.tsx`) for dropdowns on brand side. Use plain flex+gap for creator side flat nav.

### Logo size fix (Dominic's feedback point 1 partial — logo in navbar too small)

- Logo height: `h-10 lg:h-12` (was likely `h-6` or `h-8`)
- Logo wrapped in `<Link href="/">` (locale-aware)
- Uses `/prueffuchs-logo.png`

## Acceptance criteria

- [ ] `pnpm build` exits 0
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] `grep -c "usePathname\|isCreatorView" components/landing/navbar.tsx` ≥ 2
- [ ] `grep "ViewToggle\|view-toggle\|segmented" components/landing/navbar.tsx` returns ≥ 1
- [ ] `grep "brandNav\|creatorNav\|brand.*items\|creator.*items" components/landing/navbar.tsx lib/navigation.ts` returns ≥ 2
- [ ] `grep "h-10\|h-12" components/landing/navbar.tsx` returns ≥ 1 (logo size)
- [ ] de.json has keys: `nav.brand.platform`, `nav.brand.solutions`, `nav.brand.pricing`, `nav.brand.resources`, `nav.creator.howItWorks`, `nav.creator.categories`, `nav.creator.requirements`
- [ ] en.json has all the same keys
- [ ] Both JSONs parse as valid JSON
- [ ] No files modified outside declared scope
- [ ] No code comments added

## Hard-stop behaviour

After the implementation subagent finishes, invoke `@verifier`:
- If PASS: proceed to Task 5
- If FAIL (attempt 1): dispatch a fix subagent with the verifier's failure list, then re-invoke `@verifier`
- If FAIL (attempt 2): STOP Task 4. Do NOT run Task 5. Jump to Task 6. Write to FINAL REPORT:
  ```
  ❌ TASK 4 BLOCKED — navbar toggle could not be verified after 2 attempts.
  Failure details: <verifier output>
  Current navbar state: <describe>
  Task 5 (Influencer page) SKIPPED because it depends on working toggle.
  HUMAN DECISION REQUIRED before Tuesday client delivery:
    (a) Revert Task 4 changes and ship M1a without per-view nav (degraded scope)
    (b) Dedicate dedicated block to manual navbar fix before deploy
  ```

---

# TASK 5 — Influencer page rebuild (depends on Task 4)

**Feedback point:** 7
**Risk:** Medium-high, ~4 hours of work packed into one task
**Skipped if:** Task 4 hard-stopped

## File scope

- `components/landing/sections/influencer/InfluencerHero.tsx`
- `components/landing/sections/influencer/InfluencerBenefits.tsx`
- `components/landing/sections/influencer/InfluencerHowItWorks.tsx`
- `components/landing/sections/influencer/InfluencerRequirements.tsx`
- `components/landing/sections/influencer/InfluencerCTA.tsx`
- `app/[locale]/(creator)/influencer/page.tsx` (section ordering only, no new imports)
- `messages/de.json` — add/update keys under `influencer.*`
- `messages/en.json` — mirror

## Prohibited

- Do not create new files (existing influencer section files are enough)
- Do not modify navbar (Task 4 already handled)
- Do not touch brand-side sections

## Spec — matches SI creator home structure (audit "Page: Home — Creators view")

### Section order in `influencer/page.tsx`

1. `<InfluencerHero />`
2. `<MarketplaceMarquee />` (reused from brand side — shared trust element per audit pattern)
3. `<InfluencerBenefits />` — "Easy to get started" equivalent
4. `<InfluencerHowItWorks />` — simplified, NOT sticky-scroll (see note)
5. `<StatsBar />` (reused from brand side)
6. `<InfluencerRequirements />` — safety/requirements block
7. `<InfluencerCTA />` — final CTA band

### InfluencerHero — hero wash + left-text right-visual

- Background: `section-wash-orange` (match audit "violet wash on creators hero, 8% opacity")
- H1 static (no rotating keyword — rotating move is unique to brand hero per audit)
- H1: `Werde Teil der führenden Creator-Community in Deutschland`
- H1 styling matches Task 1 (font-normal, text-5xl lg:text-6xl, leading-[1.1])
- Subline: 1 sentence about earning reimbursements
- CTAs: primary "Jetzt registrieren" → `/de/signup?role=creator`, secondary "So funktioniert's" → anchor scroll
- Right visual: single authentic creator photo (use `/prueffuchs-creator-01.jpg`, same TODO-HUMAN as Task 1) + fox mascot positioned bottom-right
- Entrance animations same pattern as Task 1

### InfluencerBenefits — 3-column benefit grid

- Grid of 3 white cards on `section-wash-orange` — already handled by Task 3 if applied
- Each card: icon (lucide-react, existing stack) + H3 + body
- Cards: "Echte Produkte", "Faire Vergütung", "Flexible Kampagnen"

### InfluencerHowItWorks — simplified 4-step

**Note:** Audit flags SI's sticky-scroll storytelling section as creator-side signature. It's 2700px tall and complex. For M1a we explicitly do NOT replicate sticky-scroll — instead, render 4 step cards in a simple 2x2 or horizontal layout. Document this decision in FINAL REPORT as `"Simplified how-it-works for M1a. Full sticky-scroll pattern deferred to future iteration — audit reference: Global pattern #20."`

Steps:
1. Registrieren & Profil verbinden
2. Kampagne auswählen
3. Produkt bestellen & posten
4. Vollständige Erstattung erhalten

### InfluencerRequirements — audit "safety/trust block"

- Single block with bullet list of requirements
- Min 200 followers, min 1.5% engagement, Germany/Austria location
- Trust signals: "DSGVO-konform", "Zahlungen via Stripe", "Sichere Verifikation"

### InfluencerCTA — final CTA band

- `py-20 lg:py-28`, white bg
- Single H2 + single primary button
- CTA: `Jetzt als Creator registrieren`

## Acceptance criteria

- [ ] `pnpm build` exits 0
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] `grep -l "section-wash-orange" components/landing/sections/influencer/InfluencerHero.tsx` returns 1 match
- [ ] `grep "font-normal" components/landing/sections/influencer/InfluencerHero.tsx` returns ≥ 1
- [ ] All 5 influencer section files modified (git diff --name-only shows them)
- [ ] de.json contains keys: `influencer.hero.*`, `influencer.benefits.*`, `influencer.howItWorks.*`, `influencer.requirements.*`, `influencer.finalCta.*`
- [ ] en.json mirrors all keys
- [ ] No sticky-scroll or IntersectionObserver-based pinning logic (confirmed absent)
- [ ] No files modified outside declared scope
- [ ] No code comments added

---

# TASK 6 — German translations marketing-quality pass (Sie form)

**Feedback point:** 3
**Risk:** Low, tedious
**Must run AFTER:** Tasks 1–5

## File scope

- `messages/de.json` — rewrite every landing-related value for marketing-quality German
- `messages/en.json` — fix any English values that leaked in or are low quality

## Prohibited

- Do not change any JSON keys, only values
- Do not remove any keys
- Do not modify any `.tsx` or `.ts` file

## Spec

### Form: formal Sie throughout

- All customer-facing landing copy uses Sie/Ihr/Ihnen
- Applies to BOTH brand side and creator side (Dominic: "Sie, formally, traditionally for B2B DACH market")

### Quality bar

Not literal word-for-word translation. Rewrite each string as if a native German B2B copywriter was writing it for a premium SaaS landing. Specifically:

- **Avoid Anglicisms.** No "Content", "Engagement", "Dashboard" where a natural German word fits. "Dashboard" is acceptable (established German tech vocabulary). "Engagement-Rate" is acceptable. "Content" should become "Inhalt" or rephrased.
- **Avoid literal translations.** "Easy to get started" → NOT "Leicht anzufangen"; instead "In wenigen Minuten startklar".
- **Use active voice.** German passive ("wird verifiziert") is less punchy than active ("Wir verifizieren").
- **Short declaratives for CTAs.** "Jetzt starten", "Kostenlos testen", "Erstgespräch buchen" — not "Bitte kontaktieren Sie uns für weitere Informationen".
- **Maintain Prüffuchs tone.** From Dominic's design brief: "clean, professional, results-oriented, confident, performance system for marketplace growth, NOT lifestyle platform". Translations should feel like a Bloomberg terminal, not a wellness app.

### Sections to pass through

- `landing.hero.*` (Task 1 added keys)
- `landing.platformFeatures.*`
- `landing.howItWorks.*`
- `landing.stats.*`
- `landing.creatorCommunity.*`
- `landing.featuredPublications.*`
- `landing.testimonials.*`
- `landing.faq.*`
- `landing.finalCta.*`
- `nav.brand.*` (Task 4 added)
- `nav.creator.*` (Task 4 added)
- `influencer.*` (Task 5 added)
- `common.*` (buttons, labels)

### Process

1. Read full `messages/de.json`
2. For each key under landing / nav / influencer / common namespace, evaluate the current German against the quality bar above
3. Rewrite any string that fails (literal, Anglicism-heavy, passive, or off-tone)
4. Ensure consistency: "Creator" / "Influencer" / "Brand" usage — pick one German equivalent per term and stick with it across all keys
5. Update `en.json` only if an English value is broken or embarrassingly low quality — do not rewrite polished English strings
6. Validate JSON after every write

### Glossary for consistency (use throughout)

| English | German (Sie form) |
|---|---|
| Brand | Marke |
| Creator / Influencer | Creator |
| Campaign | Kampagne |
| Product reimbursement | Produkterstattung |
| Post verification | Post-Verifikation |
| Follower count | Follower-Anzahl |
| Engagement rate | Engagement-Rate |
| Get started | Jetzt starten |
| Book a demo / Erstgespräch | Erstgespräch buchen |
| How it works | So funktioniert's |
| Learn more | Mehr erfahren |

## Acceptance criteria

- [ ] `node -e "JSON.parse(require('fs').readFileSync('messages/de.json','utf8'))"` exits 0
- [ ] `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"` exits 0
- [ ] Key parity: diff of sorted key lists between de.json and en.json is empty
- [ ] `grep -c '"du "\|"dein "\|"dich "\|"dir "' messages/de.json` returns 0 (no informal Du form in final file — case-insensitive check)
- [ ] `grep -ic '"sie \|"ihr \|"ihnen ' messages/de.json` returns ≥ 5 (Sie form actively used)
- [ ] `pnpm build` exits 0 (catches any broken key reference from .tsx files)
- [ ] No .tsx or .ts files modified

---

# TASK 7 — Final sweep (CTA audit + regression check)

**Feedback points:** 10, 11
**Risk:** Minimal

## File scope

Read-only grep across entire repo. Only allowed writes:
- Minor string fixes in any single file if a specific broken CTA or dead anchor is found
- `docs/revision-report.md` (new file with findings)

## Spec

### 1. CTA audit — grep every `href` and `onClick` in landing components

```bash
grep -rn "href=\|onClick=" components/landing/ app/[locale]/(brand)/ app/[locale]/(creator)/
```

For each href found, verify:
- Internal links use `next/link` with locale-aware routing
- Anchor links (`#section-id`) match an actual `id=` in any component
- External links (Calendly) match the URL in `lib/site-config.ts`
- Mailto links are correct (`team@prueffuchs.de` or `noreply@prueffuchs.de`)

Report any mismatches.

### 2. SI-audit regression check

For each of these audit patterns, confirm it's now present somewhere in the codebase:

- [ ] Hero left-text right-visual layout (Task 1)
- [ ] Rotating H1 keyword (Task 1)
- [ ] `section-wash-orange` / `section-wash-cream` alternation (Task 3)
- [ ] Marketplace marquee `max-h-8` (Task 2)
- [ ] Navbar per-view rendering (Task 4, if not blocked)
- [ ] H2 `font-normal` on section headings (Task 3)
- [ ] No code comments in any modified file
- [ ] No console.log leftovers (`grep -rn "console.log" components/landing/`)

### 3. Build + typecheck + regression tests

- [ ] `pnpm build` exits 0
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] If `pnpm test` exists and passes without network: run it. Otherwise skip.
- [ ] If `tests/qa-m1a.spec.ts` exists: do NOT run it (requires dev server). Report that human should run `pnpm exec playwright test qa-m1a` before deploy.

### 4. Write `docs/revision-report.md`

Markdown file with:
- Tasks completed (with @verifier verdicts)
- Tasks skipped (with reason)
- TODO-HUMAN items (screenshot capture, creator photos, Playwright regression)
- CTA audit findings
- Regression check results
- Known open issues
- Recommended pre-deploy checklist

## Acceptance criteria

- [ ] `docs/revision-report.md` exists and is > 50 lines
- [ ] No new .tsx / .ts files added to repo (only docs/)
- [ ] Build passes
- [ ] Report lists all TODO-HUMAN items from prior tasks

---

# `@verifier` subagent — usage reminder

After every task, invoke `@verifier` with:
- The task number and title
- The full acceptance criteria list (copy-paste from task block)
- The list of files the task was ALLOWED to modify (for scope check)
- Explicit instruction: "Run every grep command. Run `pnpm build`. Run `pnpm tsc --noEmit`. Validate JSON files. Do not trust the implementation subagent's self-report. Output PASS or FAIL with per-criterion status."

`@verifier` returns a verdict. On FAIL, dispatch a fix subagent with the verifier's output, then re-invoke `@verifier`. After 2 failed attempts on any task (except Task 4 which already has explicit hard-stop), log the failure and proceed to next task unless the dependency graph forbids it.

---

# FINAL REPORT format

Print to console at end of orchestration:

```
================================================================
PRÜFFUCHS M1A REVISION ROUND 2 — FINAL REPORT
Branch: revision-m1a-dominic-round2
Time: <start> → <end> (<duration>)
================================================================

## Task verdicts

| Task | Status | Attempts | Notes |
|---|---|---|---|
| 1 Hero | PASS/FAIL/SKIPPED | n | ... |
| 2 MarketplaceMarquee | ... | ... | ... |
| 3 Section tones | ... | ... | ... |
| 4 Navbar toggle | ... | ... | ... |
| 5 Influencer page | ... | ... | ... |
| 6 DE translations | ... | ... | ... |
| 7 Final sweep | ... | ... | ... |

## Build health
pnpm build: PASS/FAIL
pnpm tsc --noEmit: PASS/FAIL

## Files modified (git diff --name-only)
<list>

## TODO-HUMAN (must be done before client delivery)
1. Capture new hero-dashboard.png screenshot via Playwright
2. Download 5 creator photos from @prueffuchsde Instagram
3. Run tests/qa-m1a.spec.ts against dev server
4. Visual review of entire landing in DE + EN
5. Review docs/revision-report.md
6. <any task-specific blockers>

## Known issues / degraded scope
<list, or "None">

## Client delivery readiness
READY / NOT READY — <reason>

## NOT COMMITTED. Human reviews all changes manually.
================================================================
```

---

# How to use this orchestrator

1. Save this file as `docs/revision-orchestrator.md` in repo
2. Open a fresh Claude Code session (`/clear`) in repo root
3. Read this file into context: `@docs/revision-orchestrator.md`
4. Prompt Claude Code with: `"You are the orchestrator described in docs/revision-orchestrator.md. Run all pre-flight checks, then execute Task 1 through Task 7 per the dependency graph. Invoke @verifier after every task. Respect all hard-stop rules. I am going to sleep. Print FINAL REPORT when done."`
5. Leave the session running. Estimated wall time: 3–6 hours depending on verifier fix loops.
6. Wake up, read FINAL REPORT, handle TODO-HUMAN items, review diffs, run Playwright tests manually, then push.
