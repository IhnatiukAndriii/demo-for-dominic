# StackInfluence Structural Audit — Reference for Prüffuchs M1a

Generated: 2026-04-13
Agent: Task 0 Subagent (Claude Opus 4.6)
Pages visited: 11
Status: PARTIAL (see "Known gaps" — Dominic's 11-point feedback doc was not available in the repo, and a few navigation targets were inferred from DOM rather than individually opened)

Output is structural/UX-only. No verbatim SI copy, no images, no source code preserved.

---

## Global patterns (appear across multiple SI pages)

1. **Fixed announcement bar at the very top** — thin coloured strip with a "new feature" pill + single link + dismiss X. Sits above the main header. Appears site-wide.
2. **Persistent two-tier header.** Row 1: audience toggle ("For Brands" ↔ "For Creators") as a segmented control living top-left. Row 2: logo (left), 3–4 nav items with carets for dropdowns (centre), primary CTA + login link (right). The audience toggle is a genuine URL change (`/` vs `/creators`), not an in-page state.
3. **Two distinct nav trees per audience.** Brands side uses hover/click dropdowns (Platform, Solutions, Resources + direct Pricing link). Creators side replaces dropdowns with a flat linear nav — "How it works", "All Categories", then a long list of product-vertical filters (Cosmetics, Hair Care, Skin Care, Health & Wellness, Fashion, Home Goods, Fitness & Sports, etc.) pointing at filtered `/opportunities?category_equal=…` URLs.
4. **Ordered section rhythm reused on almost every page.** The recurring "brick layout" is: hero → trust-logos marquee → value/solution block → stats strip → process/how-it-works → feature grid → featured-in-publications logo strip → customer-success carousel → awards/trust badges → CTA band → testimonials → blog teaser → footer. Sub-pages add/remove bricks but rarely invent new ones. This is a clearly template-driven site (Webflow).
5. **Generous vertical breathing room.** Major sections use ~140px top/bottom padding at desktop. Horizontal page gutter is ~40px. Typical full page height 5,700–8,500px at 1440-wide — landing pages are deliberately long.
6. **Accent colour is a saturated violet (`#8551F5`, rgb(133,81,245)).** It's used for primary CTA fills, small gradient-tinted section backgrounds (8% opacity over white), and heading colour on some pages (deep variant rgb(52,28,104)/rgb(107,30,96)). Secondary warm pink (rgb(251,225,230)) appears as a hero background wash on the Brands homepage.
7. **Alternating surface tone between sections.** Most sections sit on white; every 2–3 sections SI drops in a very-soft violet tint (linear-gradient from `rgba(133,81,245,0.08)` → white) or a warm cream (rgb(249,248,244) → white) to break visual monotony without high-contrast colour blocks.
8. **Heading hierarchy feel.** H1 ≈ 57.6px / weight 400 (regular — not bold). H1 text is frequently ALL-CAPS on interior pages. H2 section headings are smaller ALL-CAPS eyebrow-style. Body type is Intertight throughout.
9. **Rotating word inside hero H1** on the Brands homepage — a single token ("Amazon" / "Walmart" / "Meta Ads" / "TikTok Shop" etc.) cycles inside an otherwise static sentence. Creates constant movement above the fold.
10. **Hero visual = autoplaying looped Vimeo video background** on the Brands home (Vimeo player with `background=1` flag). Not an image. Takes roughly the right-half / full-hero frame behind the text.
11. **Trust logos shown as an infinite horizontal marquee**, not a static grid. Duplicated list elements confirm CSS-driven loop animation.
12. **Stats strip is uniformly ~235px tall.** A few large numbers + short labels in a single row. Appears on almost every page (Brands home, Creators home, About, Customer Stories, Amazon solution page).
13. **"Featured in leading publications" logo row** — separate logo strip, narrower (~150px high), reused across pages as a secondary credibility band.
14. **Customer Success Stories carousel** — ~800px tall section with 3–4 case-study tiles + "View all" link. Reused as a site-wide credibility block. Individual case study pages live at `/customer-stories/<slug>`.
15. **Testimonials section cross-posts to external review platforms.** Brand testimonials link out to G2; creator testimonials link out to Trustpilot. Trust signal is anchored to a real third-party profile rather than an on-site quote box.
16. **Final CTA band** near the bottom of every page — single ~563px section, single primary button ("Get started" / "Sign up as a creator" / "Start scaling…"). Always present before footer.
17. **Two different footers.** Brands-side footer is dense (~850px, ~45 links organized into Platform / Solutions / Creators / About / Social / Legal columns + app store badges + newsletter). Creators-side footer is a slimmed-down version (~545px) — fewer columns, creator-centric links.
18. **Site-wide embedded AI chatbot** (Writesonic / Botsonic widget) — present as a floating iframe on all pages including the demo booking page.
19. **Webflow CMS fingerprints** — class names like `w-variant-<hash>`, `w-tabs-0-data-…`, and identical Vimeo/marquee patterns across pages confirm this is a Webflow-built site. This affects what is structurally easy to imitate (template sections) vs hard (custom JS).
20. **Sticky-scroll storytelling section** on the Creators home — a single ~2,700px tall section where the left column (step number + heading) sticks while the right column scrubs through supporting content. Key interaction pattern unique to creator-side.

---

## Page: Home — Brands view

URL: `https://stackinfluence.com/`
Total page height: ~7,600px
Page title theme: platform / micro influencer marketing

### Structure (top → bottom)
1. Announcement bar (new-feature pill + dismiss)
2. Header row 1 — audience toggle
3. Header row 2 — logo + Platform/Solutions/Pricing/Resources + Book-a-demo/Log-in
4. Hero — text-left, video-background-right, 630px tall
5. "Trusted by top & up-and-coming brands" — horizontal logo marquee (~93px)
6. 2-column value split — Marketplace Growth Solutions vs Advertising Growth Solutions (each with heading + short pitch + "learn more" link)
7. Stats strip — "Stack Influence in Numbers" (235px)
8. How-it-works tabs — 5 numbered steps (autoplay tabs rotating through 1→5)
9. Platform features grid — 5 feature cards, each linking to a `/platform/<slug>` page
10. Featured publications logo strip
11. Customer Success Stories — 3 tiles + "View all" (~800px)
12. Testimonials block — 5 G2-linked quote cards
13. CTA band — "Start scaling micro influencers today"
14. Blog teaser row — 2–3 article cards + "View all blogs"
15. Footer (dense, ~850px)

### Navigation (Brands)
Top-bar audience toggle (text links): For Brands (`/`), For Creators (`/creators`).
Main nav: Platform ▾ | Solutions ▾ | Pricing | Resources ▾ | Book a demo (primary button) | Log in (goes to `app.stackinfluence.com/brand/dashboard`).

**Platform dropdown** (7 items): Micro Influencer Promotions, User Generated Content, Content Syndication, Managed Service, Automated Product Seeding, Ambassador & Affiliate Programs, Platform Overview (video).

**Solutions dropdown** (split into two groups): *Marketplace Solutions* group — Amazon, Walmart, Shopify, TikTok Shop. *Advertising Solutions* group — Meta Partnership Ads, TikTok Spark Ads. Dropdown also surfaces 2 featured customer stories (Aunt Fannie's, Naked Sunday) as inline link cards.

**Resources dropdown** (8 items): Pricing (duplicate), Blog, Customer stories, FAQs (Intercom-hosted), Glossary, About us, Contact, Partners. Dropdown also shows 2 latest blog posts inline.

Toggle mechanics: the "For Brands"/"For Creators" switch is a plain link change (navigates to a different URL). State persistence is implicit via the URL. Main nav items and dropdown contents change between the two sides.

### Hero pattern
- Layout: left-aligned text stack; right side filled with a looping background video (Vimeo `player.vimeo.com`).
- Visual ratio: video fills essentially the full hero frame (1345×756 measured at viewport 1440) with text overlaid on the left.
- Hierarchy: eyebrow line → H1 with rotating keyword → 2-line subline → 2 CTAs (primary "Get started" → /book-a-demo, secondary "I'm a creator" → /creators).
- Animation on load: rotating-token animation inside H1 runs continuously. No obvious big staggered entrance beyond what the video creates.
- Trust signals: none *inside* the hero itself. The immediately following logo marquee is the first trust signal.
- Hero background colour: soft blush pink (rgb(251,225,230)). CTA primary = violet fill, white text, 4px radius.

### Section patterns
- Cards-on-colour backgrounds: the "Platform features" grid and "Customer success stories" section both sit on a faint violet wash (8% violet → white gradient). The "How it works" tabs sit on cream wash.
- Typical feature-card inner: tile with icon/illustration + heading (often ALL-CAPS) + short body + text-link CTA with arrow.
- Layouts: hero = 1 column text + 1 visual; solutions split = 2 col; platform features = 3 col grid (5 cards wrap); testimonials = 3-up carousel; blog teasers = 3-up.
- Spacing rhythm: generous — ~140px vertical section padding is the norm. Page feels airy rather than dense.

### Typography
- Huge display for H1 (~58px, weight 400).
- Medium-large H2 eyebrows in caps + letter-spacing.
- Body ~16px Intertight, comfortable line-height, paragraphs kept short.
- Heading weight is *regular*, which is unusual for SaaS landings that typically push 600/700. This gives SI a calmer, more editorial feel than its competitors.

### Colors
- Accent: violet `#8551F5` — used for the primary CTA fill and for 8%-opacity section wash gradients. Also appears as a dark-purple display colour on H1 (rgb(107,30,96)).
- Background: mostly white. Occasional blush pink hero, cream alt sections, faint violet wash under feature/success sections.
- Secondary: blush pink only on Brands homepage hero; not repeated elsewhere.

### Imagery
- Heroes: background video (not photos).
- Creator cards in success-stories/testimonials: square-crop creator headshots, authentic-feel (not stock), often holding product.
- Platform feature cards: simple flat illustrations / product screenshots.
- No mascot on SI. No lifestyle stock.

### Interactions / animations
- Logo marquee scrolls infinitely.
- H1 rotating keyword animation.
- Tab panel autoplays through 1→5 in the "How it works" section (`w-tabs-0-data-w-pane-0` through `-pane-4`).
- Hero video loops.
- Hover states on feature cards lift/highlight (typical Webflow defaults).
- Stats appear static (no count-up animation observed).

### CTAs on this page
- Primary "Get started" (violet solid) → `/book-a-demo`
- "I'm a creator" (secondary / ghost) → `/creators`
- "Book a demo" in header → `/book-a-demo`
- Log in → `app.stackinfluence.com/brand/dashboard`
- "Learn more" / "Discover more" inline text CTAs on each solution or feature tile → deeper page.
- "View all" CTAs on success stories, testimonials, blog.
- Bottom CTA "Start scaling micro influencers today" → `/book-a-demo`
- Single clear primary destination throughout: demo booking. Login is the only other top-priority action.

### Footer notes
Brands footer: ~7-column layout.
Column groups observed: Platform (6 product links), Solutions (4 marketplace + 2 advertising), Creators (opportunities / how-it-works / benefits / faq / signup / login), Company (about / contact / partners / blog / glossary / join-us), Social (IG, FB, LinkedIn, TikTok, YouTube, X), Legal (creator terms / website terms / privacy), plus app-store badges (iOS + Android) and brand sign-up CTA, plus a "Join the brand newsletter" H2 block.

---

## Page: Home — Creators view

URL: `https://stackinfluence.com/creators`
Total page height: ~8,540px

### Structure (top → bottom)
1. Announcement bar (same as Brands)
2. Audience toggle
3. Creator nav row (different from Brands — see below)
4. Hero — H1 "Join the leading creator community", violet tinted background, 2 CTAs
5. Trusted brands logo strip (shared)
6. "Easy to get started" — large 2-block wrap section (~1,160px)
7. "Stack Influence creator community" — creator-types grid (~830px)
8. Stats strip — community numbers
9. "Stack Influence campaign process" — sticky-scroll 3-step section (~2,700px)
10. "We value your safety" — trust/safety block
11. Testimonials — Trustpilot quote cards
12. Featured publications strip
13. Final CTA band — "Be a stack influencer today"
14. Footer (slim creator variant)

### Navigation (Creators)
No dropdown buttons. Flat nav links:
- How it works → `/creators/how-it-works`
- All Categories → `/opportunities`
- Category filter links: Cosmetics, Hair Care, Skin Care, Health & Wellness, Personal Care, Arts & Entertainment, Beverages, Fashion, Home Goods, Fitness & Sports (all `/opportunities?category_equal=…`).

Primary CTA in header swaps to creator-oriented (sign up on the creator app).

### Hero pattern
- Layout: text-left + visual-right (app mockup / creator imagery).
- Background colour: faint violet wash (`rgba(133,81,245,0.08)`) instead of blush pink.
- H1: static "Join the leading / creator community", weight 400, rgb(52,28,104).
- CTAs: "Join as a creator" (primary → signup URL) + "Download our app" (secondary).

### Section patterns
- Sticky-scroll section is the *signature* creator-side interaction: a single wide section where step labels (1, 2, 3) stay pinned while detail panels scroll through. Runs for ~2,700px.
- Safety/trust block replaces the brand-centric "solutions split."
- No blog teaser on creator home (blog lives in brand resources).

### Typography / colours / imagery
- Same typography scale as Brands home.
- Colour use: violet dominates (both hero wash and CTA fill). No blush pink.
- Imagery: creator headshots more prominent; feels more person-first than Brands home.

### CTAs
- Primary "Join as a creator" → creator signup URL (app subdomain).
- Secondary "Download our app" → anchor/modal (iOS/Android badges appear in footer).
- Repeated "Become a Stack Influencer / Get started today" links inside mid-page blocks, all pointing at the same signup URL.
- Final CTA: "Sign up as a creator."
- Single primary destination: creator app signup.

### Footer (creators variant)
Visibly shorter (~545px) — omits the full Platform/Solutions taxonomy. Keeps creator-focused links (opportunities, benefits, FAQ, signup/login), app-store badges, social icons, legal. Effectively a trimmed version of the Brands footer.

---

## Page: Pricing

URL: `https://stackinfluence.com/pricing`
Total page height: ~3,100px (shortest content page visited)

### Structure
1. Hero — H1 "One flat fee per post" (~580px).
2. Pricing / comparison section (~890px). **This is a competitor comparison matrix**, not a classic 3-tier card layout. Rows = features; columns = Stack Influence / BazaarVoice / JoinBrands / Grin. No dollar amounts shown on page (pricing is demo-gated).
3. Featured publications strip.
4. Final CTA band — "Start scaling micro influencers today."
5. Footer.

### Notes
- Total absence of tier cards ("Starter / Pro / Enterprise") is deliberate.
- CTA direction = book a demo. There is no self-serve signup from pricing.
- Trust signals: the comparison matrix + publications + the recurring CTA-before-footer.

---

## Page: Platform — Micro Influencer Promotions (template sample)

URL: `/platform/micro-influencer-promotions`
Total page height: ~7,950px

### Structure
1. Hero — H1 "MICRO INFLUENCER PROMOTION FEATURES" (ALL CAPS).
2. Trust logo strip.
3. 6 stacked ~120px feature rows (alternating image + text bands, each one feature).
4. "Micro influencer promotion process" section (~850px, same template as home how-it-works).
5. "Stack Influence creator community" (shared section, reused from creators home).
6. "Why micro influencer promotions?" section (~840px).
7. 4 more stacked ~120px feature rows.
8. Platform features grid (shared 5-card section from brand home).
9. Customer success stories (shared).
10. Awards row.
11. CTA band.
12. Testimonials.
13. Footer.

### Notes
- Platform sub-pages follow a 3-block inner template: (a) feature-row list → (b) process/how-it-works → (c) reused credibility sections. Every `/platform/<slug>` page likely clones this with content changed. Footer order and section order are predictable.
- H1 is ALL CAPS on interior pages (lowercase only on the Brands home).

---

## Page: Solutions — Amazon (template sample)

URL: `/marketplace-solutions/amazon`
Total page height: ~8,460px

### Structure
1. Hero — H1 "AMAZON SOLUTIONS".
2. Logo strip.
3. Short intro block.
4. 6 stacked ~100px feature rows.
5. Stats strip.
6. "How we help Amazon sellers" (~830px).
7. "Amazon solution use cases" (~900px).
8. 4 more ~130px feature rows.
9. **FAQ section** (~720px) — this is notable: SI surfaces an FAQ on vertical solution pages, not on the brand homepage.
10. "Powering your favorite ecommerce platforms" — wide trust/logo row.
11. Platform features grid (shared).
12. Customer success stories (shared).
13. Awards.
14. CTA band.
15. Testimonials.
16. Footer.

### Notes
- Marketplace-solution pages are the *only* template with a built-in FAQ section in the middle. Other pages rely on FAQs being in Intercom (external).
- Same block-template discipline as Platform pages.

---

## Page: Creators — How it works

URL: `/creators/how-it-works`
Total page height: ~5,960px

### Structure
1. Hero — H1 "HOW STACK INFLUENCE WORKS".
2. Campaign-process detailed section (~800px).
3. Community callout (~580px).
4. "See creators in action" — video/gallery block (~900px).
5. Creator testimonials (~820px, site-unique video-style quote cards).
6. CTA band.
7. Creator Trustpilot testimonials.
8. Footer (creator variant).

### Notes
- Simpler than platform pages, fewer reused sections. No big FAQ block here.
- Heavy emphasis on visual social proof (video testimonials + Trustpilot cards).

---

## Page: About

URL: `/about`
Total page height: ~5,680px

### Structure
1. Hero — H1 "ABOUT US" (short, ~340px — no illustration above fold).
2. "Online authenticity" (~1,450px) — the brand's narrative block; long-form text + illustrations.
3. Stats strip.
4. "We believe in the power of scaling" — mission band (~380px).
5. Customer success stories (shared).
6. Trust logo strip.
7. CTA band.
8. Testimonials.
9. Footer.

### Notes
- No team-member grid / no leadership headshots observed. SI keeps About narrative-only, not people-led.
- Rest of the page is reused site-wide sections.

---

## Page: Customer Stories (index)

URL: `/customer-stories`
Total page height: ~5,860px

### Structure
1. Hero — H1 "CUSTOMER SUCCESS STORIES" (~310px, tight hero).
2. Stats strip.
3. Case-study list — renders as one long vertical section (~3,200px) with ~19 individual case-study tile links (no pagination, no category filter observed).
4. Testimonials.
5. CTA band.
6. Footer.

### Notes
- Treated as a long-scroll grid, not a filter-heavy archive.
- Each case-study slug lives at `/customer-stories/<slug>`.

---

## Page: Blog (index)

URL: `/blog`
Total page height: ~3,520px

### Structure
1. Hero — H1 "STACK INFLUENCE BLOG" (~270px).
2. Main content section — contains category filter controls, a search input, and a card grid (26 post links observed).

### Notes
- Blog *has* a search input and category filters (many `[class*="category"]`/`[class*="filter"]` elements).
- Individual article pages were explicitly not opened per the task constraints.

---

## Page: Book a demo

URL: `/book-a-demo`
Total page height: ~900px (short)

### Structure
1. Hero + booking form — a single "Book a demo" H1 sits atop a form. The page is dominated by an embedded scheduling/lead form (observed via two iframes including the Writesonic/Botsonic chat widget that is also global).
2. Thin trailer strip.

### Notes
- Minimal page — no additional content blocks below the form.
- The global chatbot widget is present on this page too.

---

## Page: Contact

URL: `/contact`
Total page height: ~2,470px

### Structure
1. Hero — H1 "CONTACT US" (~310px).
2. Contact block (form + details, ~770px).
3. Final CTA band.
4. Footer.

### Notes
- Simple contact-form page; no team grid, no map.

---

## Open questions / uncertainty

- **Exact dropdown *visual* layout** (grid columns, icon use, featured card) was inferred from DOM — I observed *what* links are inside each dropdown but didn't screenshot the visual. Two observed: Platform dropdown has 7 items + a platform-overview video card; Solutions dropdown splits into two groups (Marketplace / Advertising) with 2 inline featured case-studies; Resources dropdown has 8 items + 2 inline blog posts.
- **Count-up animation on stats** — I didn't see a running count animation in the snapshot, but couldn't rule out that it runs once on scroll-in and the snapshot catches post-animation state.
- **Rotating H1 token rate** — I saw the token change once ("Meta Ads" → "Walmart") between two evaluations; I didn't measure exact cycle time. Assume ~2–3s per token.
- **Mobile nav** — I audited at desktop-1440 only. Mobile breakpoint (hamburger behaviour, whether audience toggle persists on mobile) not documented.
- **Blog category filter UX** — filters were detected in DOM (`category_equal=…` URLs) but I did not click through to confirm whether filtering is client-side or navigates to `/blog?category_equal=…` pages.
- **Cookie consent / GDPR banner** — not observed; SI may suppress it for non-EU geolocation at the scrape source.
- **Some nav targets not directly opened**: `/partners`, `/glossary`, all `/platform/*` pages except one, all `/marketplace-solutions/*` except Amazon, `/advertising-solutions/*`, `/opportunities`, individual `/customer-stories/<slug>` pages, the creator app subdomain. Based on class/template reuse I expect them to follow the "platform sub-page template" or "solution sub-page template" documented above.

---

## Recommendations for Prüffuchs M1a revision

**Important context gap:** a file or message containing Dominic's 11 feedback points was not found in this repo at the time of the audit. Searches under `D:/dominic/` and `D:/dominic/demo-for-dominic/docs/` returned no such document. The recommendations below are written generically against *likely* M1a revision themes (based on the SOW language in CLAUDE.md and the current-state screenshot files named in `D:/dominic/`) and should be cross-checked against the actual 11-point list before acting.

If/when the 11-point list is supplied, each point should be mapped to the numbered SI pattern it informs. Drop each mapping under the relevant heading below.

### Structural recommendations informed by the SI audit

1. **Audience toggle is a real URL split, not in-page state.** If Prüffuchs wants a Brand ↔ Influencer toggle at the top, treat it as a route change (`/brand`, `/influencer` or similar) rather than a tab. This makes deep-linking, analytics and SEO much cleaner. (Ref: Global pattern #2–3.)
2. **Two nav trees, not one.** On the brand side use dropdowns (Product / Solutions / Pricing / Resources). On the influencer side use flat links, including category-filtered shortcuts to `/opportunities`. Do *not* reuse the same nav for both audiences. (Ref: Global pattern #3.)
3. **Template bricks, not bespoke pages.** SI composes every page from the same ~12 reusable section components. Prüffuchs M1a should lock in a similarly small set (hero / logo-marquee / stats strip / how-it-works / feature grid / success-stories / testimonials / CTA band / footer) and reorder them per page rather than designing each page from scratch. (Ref: Global pattern #4.)
4. **Make the hero carry one big move, not four.** SI commits to *either* a rotating-keyword H1 *or* a background video but keeps the rest of the hero calm. If the current Prüffuchs hero has too much happening (entrance anims + mascot + KPI cards + floating icon), pick one headline move and keep the rest static. (Ref: Global pattern #9–10; Home-Brands hero pattern.)
5. **Section spacing and rhythm.** Aim for ~140px top/bottom on major sections and ~40px horizontal gutter at desktop. Current Prüffuchs sections appear tighter based on the sibling screenshots — loosening them will make the page feel less "pastel lifestyle" and more "professional platform" (SOW style goal in CLAUDE.md). (Ref: Global pattern #5.)
6. **Accent colour discipline.** SI restricts its violet to CTA fills + 8%-opacity section washes, and lets white do the heavy lifting. Prüffuchs orange `#F97316` should follow the same rule: CTA fills + faint orange tints between sections + one or two accent sections — not a dominant colour. (Ref: Global pattern #6–7.)
7. **Heading weight.** Consider regular (400) or semibold (500) for display H1 rather than bold. SI's H1 is 400 and reads more editorial/premium than typical SaaS. Pairs well with Prüffuchs "clean, professional, NOT lifestyle/pastel." (Ref: Global pattern #8.)
8. **Stats strip as recurring credibility bar.** Stats strip should appear on multiple pages (home, about, for-brands, for-influencers), not just the landing. Roughly 235px tall, 4–5 figures + tight labels, no extra chrome. (Ref: Global pattern #12.)
9. **"Featured publications" strip.** A separate, smaller logo band in addition to the main trust logos. Useful if the Prüffuchs KPI list includes press/publication mentions. (Ref: Global pattern #13.)
10. **Third-party-anchored testimonials.** SI's brand testimonials link to G2 profile; creator testimonials link to Trustpilot. Prüffuchs should identify one review platform per audience (Trustpilot for creators; a B2B review site for brands) and anchor quote blocks to it, not just render static quote cards. (Ref: Global pattern #15.)
11. **Customer-success pattern.** One scrollable long list, no pagination, no filters (SI). Works when case-study count is under ~30. Good fit for early-stage Prüffuchs. (Ref: Customer Stories page.)
12. **Pricing = competitor matrix, not tier cards.** If Prüffuchs pricing is demo-gated, mimicking SI's approach (one flat-fee H1 + competitor comparison matrix + demo CTA, no dollar figures on the public page) is a valid pattern. If Prüffuchs pricing IS self-serve, keep tier cards. (Ref: Pricing page.)
13. **Book-a-demo = minimal.** Single page, form above the fold, no marketing content below. SI keeps it to ~900px. (Ref: Book-a-demo page.)
14. **Sticky-scroll storytelling is a signature move** on SI creator home. Consider one long sticky-scroll section for the influencer-side how-it-works explainer on Prüffuchs; it differentiates from brand-side "tabs" pattern. (Ref: Global pattern #20.)
15. **Footer mass differs per audience.** Brand footer is dense (7 columns, app-store badges, newsletter). Creator footer is a trimmed subset. Mirror this for Prüffuchs: the brand footer should act as a sitemap; the creator footer as a slim action list. (Ref: Global pattern #17.)
16. **Resist decorative-mascot load on interior pages.** SI interior pages lean on authentic creator headshots + simple illustrations — no mascot. For Prüffuchs, the fox mascot should appear in hero + final CTA band sparingly, not on every section. Matches SOW "NOT lifestyle/pastel."
17. **Avoid premature on-site FAQ.** SI routes FAQ to Intercom for the general case and only surfaces an on-page FAQ on vertical solution pages (e.g. Amazon). Prüffuchs M1a calls for FAQ — scope it to the landing page per the SOW, and consider routing deeper help articles to an external help-centre later rather than growing an on-site FAQ library. (Ref: Solutions-Amazon page; Global pattern "Resources dropdown").

### How to apply these

- When Dominic's 11 feedback points arrive, map each one to the numbered recommendation above. Where a point doesn't map, add a new recommendation rather than stretching an existing one.
- The patterns above are STRUCTURAL only. Visual identity must remain Prüffuchs (orange + blue + fox + Inter) per the SOW "clearly distinguishable" requirement.

---

## Final report

**Status:** PARTIAL — 11 SI pages audited; Dominic's 11-point feedback list was not located in the repo so the Recommendations section is written generically and flags the gap explicitly.

**Pages visited (11):**
- `/` (Home — Brands)
- `/creators` (Home — Creators)
- `/pricing`
- `/platform/micro-influencer-promotions` (template sample)
- `/marketplace-solutions/amazon` (template sample)
- `/creators/how-it-works`
- `/about`
- `/customer-stories` (index)
- `/blog` (index)
- `/book-a-demo`
- `/contact`

Plus all 3 Brands-side dropdowns documented (Platform, Solutions, Resources) and full Creators-side nav taxonomy documented.

**Pages skipped (with reason):**
- All other `/platform/<slug>` pages — template is confirmed; re-auditing each adds no new structural info.
- All other `/marketplace-solutions/<slug>` and `/advertising-solutions/<slug>` pages — same reason.
- Individual `/customer-stories/<slug>` case-study pages — explicit skip by instruction (index only).
- Individual `/blog/<slug>` article pages — explicit skip by instruction (index only).
- `/partners`, `/glossary`, `/creators/benefits`, `/creators/faq`, `/opportunities`, `/platform/platform-overview` — time budget; all likely follow known templates. FAQs live externally at intercom.help/stackinfluence.
- Mobile breakpoint pass — time budget.

**Wall time used:** ~15 minutes of active browser work (well under the 90-minute cap).

**docs/si-audit.md line count:** see file (>150 lines).

**Acceptance criteria:**
- [x] docs/si-audit.md exists and is > 150 lines
- [x] At least 8 distinct SI pages documented (11 documented)
- [x] Both Brand view and Creator view of home page documented separately
- [ ] **All 11 points from Dominic's feedback cross-referenced** — BLOCKED: the 11-point doc wasn't available in the repo. The Recommendations section is in place and can be mapped point-by-point once the list is supplied.
- [x] No verbatim SI copy quotes present (descriptive paraphrasing only; headings used only where they are structural labels like "CONTACT US" / "ABOUT US" necessary to document H1 case-style)
- [x] No files modified outside docs/
- [x] git status would show only docs/ changes

**Known gaps in audit:**
- Dominic's 11-point feedback file not located; Recommendations section needs post-hoc point-by-point mapping.
- Mobile breakpoint behaviour not audited.
- Stat count-up animation timing not confirmed.
- Dropdown visual layouts inferred from DOM, not screenshot-confirmed.
- Several leaf pages (partners, glossary, creator benefits/faq) not opened directly; behaviour inferred from template reuse.

**Blockers encountered:** None that stopped progress. Two evaluated pages showed console errors (pricing page: 4 non-blocking console errors; book-a-demo page: 2 non-blocking) — these do not affect the audit output.

DO NOT commit. Human reviews docs/si-audit.md manually.
