# Prüffuchs — Project Rules

## Communication
Спілкуватися зі мною виключно українською мовою.

## Quality Standard
This is a $11,500 production contract with strict milestone acceptance criteria.
Zero tolerance for: broken pages, console errors, untranslated text, non-responsive layouts.
Every feature must work perfectly before Andrii manually tests it.

## After EVERY completed block of work:
1. Build and verify: `pnpm build` must pass with 0 errors
2. Run lint: `pnpm lint` must pass
3. Open browser and manually verify the feature works
4. Write a short summary:
   - What was built
   - How to test it (exact steps)
   - What edge cases were handled
   - Any known limitations

## Code Rules
- Never refactor surrounding code unless explicitly asked
- Never add new packages without explicit approval
- Match existing patterns in the codebase
- All new Supabase tables must have RLS policies
- Never leave TODO comments in production code
- All text must exist in both DE and EN via next-intl

## Stack
- Next.js 14+ App Router
- Tailwind CSS + shadcn/ui
- Supabase (Auth + RLS + Edge Functions + Storage)
- next-intl (DE/EN)
- Vercel deployment

## Design System
- Primary accent: Orange (#F97316) — CTAs, highlights, fox mascot
- Secondary: Blue (#3B82F6) — trust signals, B2B elements
- Background: Clean white/light gray
- Font: Inter
- Style: Clean, professional, results-oriented. NOT lifestyle/pastel.
- Component base: shadcn/ui, customized to Prüffuchs brand

## Testing Requirements Before ANY Submission
- All 3 roles tested end-to-end: Influencer, Brand, Admin
- Responsive: 1920/1440/1366 desktop, 1024/768 tablet, 430/393/375 mobile
- No horizontal scroll at any breakpoint
- DE and EN text both display correctly
- No console errors
- All links and buttons functional
- Load time under 3 seconds

## Milestone Structure
M1a (Week 1): Landing Page + Branding + FAQ + DE/EN + SEO
M1b (Week 2): All 3 Dashboards + Auth + RLS + ToS + View Switch
M2a (Week 3-4): Campaign Workflow + Emails + Automations
M2b (Week 5-6): Stripe Connect + Credits + KYC + Deposits
M3a (Week 7-8): Meta/TikTok OAuth + Engagement + Trust Score
M3b (Week 9-10): AI Verification + Sales Tracking + Waitlist
M4a (Week 11): AI Chatbot
M4b (Week 12): Reports + QA + Staging + Handover
