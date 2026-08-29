# Maren Vale

Marketing site for Maren Vale, a life and leadership coach. Five pages, built
around scroll as the primary interaction.

- **About** (`/`) — the front door: hero, principles, career timeline
- **Services** (`/services`) — one-on-one coaching and keynote speaking
- **Journal** (`/blog`, `/blog/[slug]`) — long-form writing
- **FAQ** (`/faq`)
- **Contact** (`/contact`)

## Before you launch

**The copy that ships with this repo is a placeholder persona.** "Maren Vale",
the biography, the timeline and the journal posts were written to build the site
against, not to describe a real coach. Replace them before this is pointed at a
real domain:

| What | Where |
| --- | --- |
| Name, role, tagline, email, phone, location | `SITE` in `src/lib/content.ts` |
| Biography and "who this is for" copy | `src/app/page.tsx` |
| Career timeline | `TIMELINE` in `src/lib/content.ts` |
| Services, pricing, process | `SERVICES` / `PROCESS` in `src/lib/content.ts` |
| Journal posts | `POSTS` in `src/lib/content.ts` |
| FAQ | `FAQ_SECTIONS` in `src/lib/content.ts` |
| Practice facts | `PRACTICE_FACTS` in `src/app/page.tsx` |

Two of those need more care than a find-and-replace.

**Credentials.** The site deliberately claims no accreditation anywhere. The
About page lists how the practice operates instead — client cap, engagement
length, location. Accreditation is the one claim on a coaching site a
prospective client will actually check, and naming a body the coach is not
registered with is a legal and professional problem rather than a copy mistake.
Add real credentials to `PRACTICE_FACTS` once you have the exact designation and
year, and only what you could evidence on request.

**Contact details.** `SITE.email` and `SITE.phone` are placeholders — the phone
number is in the reserved `555` range and the domain is not registered to this
project. The contact form delivers to `SITE.email`, so an unreplaced address
means enquiries go nowhere.

Also set `NEXT_PUBLIC_SITE_URL`. Without it, canonical URLs, `sitemap.xml` and
`robots.txt` fall back to `localhost` — wrong, but visibly wrong, which is the
point: guessing at a plausible domain would publish SEO signals pointing at a
site somebody else owns.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19, TypeScript, Tailwind CSS v4
- **GSAP** with ScrollTrigger — anything scrubbed or pinned
- **Lenis** — interpolated scroll position, which every scrubbed effect samples
- **Three.js** — one scene, on the About hero
- **Motion** (Framer Motion) — component-local state: entrances, disclosure, nav, forms
- **Zod** — contact-form validation in a server action

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

`cp .env.example .env.local` to configure enquiry delivery. Without it the
contact form still works end to end and logs the enquiry to the server instead
of sending it.

## The animation rules this site follows

Each technique is here because it does a job. The reasoning lives in comments
next to the code; in short:

| Technique | Where | Job |
| --- | --- | --- |
| Smooth scroll (Lenis) | Site-wide | Raw wheel deltas make a scrub read as jumps. Driven by GSAP's ticker so there is one loop per frame. |
| Pin | Services | Each service stays on screen while its own detail scrolls past, so price and format stay attached to the copy. |
| Horizontal scroll | About timeline | Used once, where the horizontal axis is what the form already means. |
| Parallax | Hero washes, journal covers | Depth on decorative layers. Never on text. |
| Scroll progress | Header, articles | Page progress in the header; a separate article-scoped bar with minutes remaining. |
| Scroll-linked | Principles rule, hero field | Position indicators, in continuous proportion to scroll. |

Two restraints are as deliberate as the effects. Service panels change
**sequentially rather than cross-fading** — two paragraphs dissolving through
each other are unreadable for the whole transition. And **Contact is the
quietest page**: no pin, no parallax, nothing scroll-linked, because someone
filling it in has already decided.

## Accessibility and resilience

- `prefers-reduced-motion` is honoured everywhere. Pins and scrubs do not run at
  all, the WebGL field renders one settled frame, and the layout resolves to its
  final state — never a hidden or half-scrubbed one.
- Below `md`, the pinned and horizontal sections fall back to normal document
  flow and native swipe. The enhanced version layers onto markup that already
  works.
- With JavaScript disabled the site reads as plain HTML (a `noscript` rule in
  the root layout forces animated elements to their resting state) and the
  contact form still posts, because it is a server action.
- The WebGL scene disposes on unmount, stops drawing when off-screen or when the
  tab is hidden, and is skipped entirely where WebGL is unavailable.

## Content

All copy lives in `src/lib/content.ts` — site metadata, navigation, services,
process, timeline, principles, journal posts and FAQ. Pages import from it, so
editorial changes never touch layout code.

Journal covers are gradients derived from the post slug (`src/lib/art.ts`).
There is no photography and no external image host, which keeps the CSP simple.

## Security headers

`next.config.ts` sets the CSP and related headers. It uses
`script-src 'self' 'unsafe-inline'` rather than a per-request nonce, because the
nonce approach forces every page to render on demand and these pages fetch
nothing. The header comment explains the trade and what would need to change if
user-generated content ever reaches a page.

## Deploying

A standard Next.js app — every page prerenders at build time, and the only
server-side work is the contact action. Set `NEXT_PUBLIC_SITE_URL` so canonical
URLs, `sitemap.xml` and `robots.txt` point at the real domain.
