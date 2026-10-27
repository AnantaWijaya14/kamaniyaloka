# Kamaniyaloka

Bilingual villa website based on PRD v1.1. Next.js App Router, React, TypeScript, and custom responsive CSS. This is a review implementation; deployment requires the owner's explicit approval.

## Development

Node.js 22.6+ (validated on 24). From this repository:

```sh
npm ci
npm run dev
```

Open the local development server on port 3000; `/` redirects to `/id`. English is under `/en`. Each locale contains home, about, villas, amenities, gallery, rental inquiry, location, and contact, plus individual details for Villas A, B, and C.

```sh
npm test
npm run typecheck
npm run build
npm run start
npm run test:e2e
```

Browser tests require Playwright Chromium (`npx playwright install chromium`), or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an installed Chromium executable. In the cloud environment: `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e`. Screenshot output defaults to `test-results/review` and can be changed using `REVIEW_OUTPUT_DIR`.

## Content and media

- `lib/content.ts`: verified capacities, amenities, address, and navigation.
- `components/site.tsx`: bilingual page copy and inquiry UI.
- `lib/media.ts`: owner-approved photo manifest; place files in `public/images/`. Supply dimensions and equivalent Indonesian/English alt text. Gallery supports unit/category filters and a keyboard-accessible native-dialog lightbox. No property photographs have been supplied, so it currently displays clearly labelled abstract illustrations.
- Temporary typography wordmark is not an approved logo redesign.
- `lib/inquiry.ts`: validation, bilingual summary, and WhatsApp handoff. No database, email delivery, automatic booking, or availability API. Input is held only in memory; it is sent to WhatsApp only when the visitor follows the link and sends their message there.
- External Google Fonts use system-font fallbacks if unavailable.

## Review before launch

Confirm real photographs, existing/final logo, brand copy, rates/deposit/utilities/rental policies, and the official Maps pin. The map link currently searches the provided address; it does not claim a verified pin. Prices and availability are intentionally referred to the administrator. CMS integration and consent-based external analytics are not configured; content is maintained in the repository. Field Core Web Vitals and a full WCAG audit require separate production measurement/review.

## Vercel deployment (only after owner approval)

The repository uses Vercel's standard Next.js preset: install `npm ci`, build `npm run build`, default output directory. No secrets are required for the current static-content application. After approval, connect the repository/project and set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS production origin, without a trailing slash, then deploy. This enables canonical/hreflang URLs, sitemap entries and indexing. Without that variable the review build is noindex with a disallow-all robots policy and an empty sitemap. Confirm domain/HTTPS, all 22 localized routes, WhatsApp recipient, and real media after deploying.

Vercel deployment requires separate owner approval. GitHub review branches may be pushed when authorized; merging or deploying should follow the agreed review process.
