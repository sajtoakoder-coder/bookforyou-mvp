# BOOKFORYOU MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, three-page presentation site for BOOKFORYOU that communicates the premium physical book-object concept without providing ordering or payments.

**Architecture:** A Vite + React + TypeScript single-page application provides three URL-addressable views using React Router. Content and asset paths live in one typed edition-data module; page components compose small reusable editorial and product-object components. Generated 3D-style renders are static, replaceable assets with meaningful alt text and an `onError` fallback, while CSS owns layout, visual tokens, responsive behavior, and reduced-motion support.

**Tech Stack:** Vite, React, TypeScript, React Router, CSS modules or component-scoped CSS, Vitest, React Testing Library, Playwright, generated WebP/PNG visual assets.

**Spec:** `docs/superpowers/specs/2026-10-06-bookforyou-mvp-design.md`

## Global Constraints

- Keep the MVP limited to `/`, `/edition/001`, `/collection`, and legal-information placeholder pages; do not add orders, checkout, payments, forms, analytics, cookies, a server, database, CMS, or API.
- Use the CTA copy `Скоро будет доступно`; it must not imply that a purchase can be completed.
- Store edition number, price, copy and all visual asset paths in one typed static data module; do not hard-code this content in page components.
- Use `Cormorant Garamond` for display text and `Manrope` for interface and body text, with body text at least 16 px on phones.
- Use the approved tokens: `#180F0E`, `#5B2027`, `#F2EADD`, `#FBF7F0`, `#261A17`, and `#F4EDE2`; verify normal text foreground/background pairs at WCAG AA 4.5:1 or better.
- Do not use mystical imagery, tarot/astrology, candles, feathers, ink wells, shelf backgrounds, old-book stacks, gold frames, leaf logos, bright CTA treatment, delivery/quality/gift icons in the hero, or an endless product grid.
- Render the book, box, sealed envelope and coordinate card as a coherent museum-lit burgundy object scene; generated assets must be replaceable later by real photography without component changes.
- Keep all tap targets at least 44×44 px, retain visible keyboard focus, avoid horizontal scrolling, and test 375, 768, 1024 and 1440 px widths.
- Respect `prefers-reduced-motion`; only use transform and opacity for decorative movement and provide static image fallbacks.
- Keep legal placeholder pages truthful: do not invent seller details, delivery terms, return terms, payment methods, privacy claims, or personal-data consent.

## Review Focus

- Image asset failure: every hero/object image must retain its reserved composition and show a static fallback rather than a broken-image icon; covered in Task 3.
- Reduced-motion visitors: decorative parallax and reveal effects must be removed without hiding content; covered in Task 4.
- Narrow phones: navigation, headings, edition cards and CTA must fit a 375 px viewport without horizontal scroll or clipped Russian copy; covered in Task 5.
- Direct links: opening `/edition/001`, `/collection`, or a legal page directly must display the correct view; covered in Task 2 and Task 6.
- Non-commercial boundary: every visible purchase CTA must use `Скоро будет доступно` and no payment/order controls may appear; covered in Task 6.

## Planned File Structure

- `package.json` — project commands and dependencies.
- `vite.config.ts`, `tsconfig.json`, `index.html` — Vite and TypeScript configuration.
- `src/main.tsx` — app bootstrap.
- `src/App.tsx` — route map and shared route shell.
- `src/data/editions.ts` — `Edition` types, release №001 and collection placeholder data.
- `src/data/legalPages.ts` — typed legal-placeholder labels and intentionally non-commercial copy.
- `src/styles/tokens.css` — color, typography, spacing, focus and motion tokens.
- `src/styles/global.css` — resets, responsive primitives, body styles and `prefers-reduced-motion` overrides.
- `src/components/Header.tsx` — wordmark, desktop navigation and accessible mobile menu.
- `src/components/Footer.tsx` — legal navigation only.
- `src/components/HeroObject.tsx` — object-scene image, fallback state and optional motion class.
- `src/components/EditorialSection.tsx` — reusable heading/body editoral layout.
- `src/components/ObjectDetails.tsx` — four physical-object detail panels.
- `src/components/EditionCard.tsx` — accessible collection-preview card.
- `src/components/AvailabilityNotice.tsx` — non-purchasable release CTA.
- `src/pages/HomePage.tsx` — brand story, hero, objects, gift and curator sections.
- `src/pages/EditionPage.tsx` — dynamically selected edition №001 page.
- `src/pages/CollectionPage.tsx` — finite collection view.
- `src/pages/LegalPlaceholderPage.tsx` — truthful legal-information placeholder screen.
- `src/assets/renders/*.webp` — hero, book, box, envelope and coordinate-card static renders.
- `src/assets/renders/fallback-object.webp` — neutral static fallback composition.
- `src/**/*.test.tsx` — unit/component tests.
- `e2e/*.spec.ts` — viewport and navigation browser checks.

### Task 1: Create the application foundation and design tokens

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Create: `src/App.test.tsx`

**Interfaces:**
- Produces: `<App />` mounted by `src/main.tsx`; CSS custom properties consumed by all later components.

- [ ] **Step 1: Write the failing app-shell test**

```tsx
it('renders the BOOKFORYOU application shell', () => {
  render(<App />)
  expect(screen.getByRole('banner')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the app and test runtime do not exist.

- [ ] **Step 3: Initialise the Vite React TypeScript project and add test tooling**

Add scripts `dev`, `build`, `test`, `test:watch`, and `test:e2e`. Configure Vitest with jsdom and React Testing Library. Install React Router for URL-addressable screens and Playwright for later viewport tests.

- [ ] **Step 4: Implement `App() => JSX.Element` and token files**

Mount a semantic application shell with a `header`, `main`, and `footer` placeholder. Define the approved color tokens, Cormorant Garamond/Manrope font imports, an 8 px spacing scale, focus-ring token, 44 px control-height token, and shared motion-duration tokens. Add global reset, readable 16 px mobile body text, image sizing rules, horizontal-overflow protection, and a `prefers-reduced-motion` override that disables decorative transitions and animations.

- [ ] **Step 5: Run the test and production build**

Run: `npm test -- --run src/App.test.tsx && npm run build`

Expected: PASS and a completed Vite production build.

- [ ] **Step 6: Commit foundation files**

Run after git initialization: `git add package.json vite.config.ts tsconfig.json index.html src && git commit -m "chore: scaffold bookforyou MVP"`

### Task 2: Model replaceable content and route every MVP page

**Files:**
- Create: `src/data/editions.ts`, `src/data/legalPages.ts`
- Modify: `src/App.tsx`
- Create: `src/App.routes.test.tsx`

**Interfaces:**
- Consumes: `<App />` and global route shell from Task 1.
- Produces: `Edition`, `getEditionBySlug(slug: string): Edition | undefined`, `collection: readonly Edition[]`, `legalPages`, and route components used by Tasks 5–6.

- [ ] **Step 1: Write failing tests for data and direct routes**

```tsx
it('finds BOOKFORYOU №001 by slug', () => {
  expect(getEditionBySlug('001')?.price).toBe('4 900 ₽')
})

it('renders the collection for a direct URL', () => {
  renderAtPath('/collection')
  expect(screen.getByRole('heading', { name: /коллекция/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- --run src/App.routes.test.tsx`

Expected: FAIL because the data module and routes do not exist.

- [ ] **Step 3: Implement the typed content modules**

Define `Edition` with `slug`, `number`, `title`, `author`, `price`, `audienceLine`, `curatorText`, `assetPaths`, and `isCurrent`. Populate `001` at `4 900 ₽`; use explicit, neutral Russian placeholders for missing author/title data and no invented business/legal data. Include only a small finite set of collection placeholders.

- [ ] **Step 4: Implement the router in `App()`**

Map `/`, `/edition/:slug`, `/collection`, and `/legal/:slug`. Serve a not-found view for an unknown route or unknown edition. Route components may be minimal semantic placeholders at this task; visual content follows later tasks.

- [ ] **Step 5: Run the data and route tests**

Run: `npm test -- --run src/App.routes.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit routing and data model**

Run: `git add src/App.tsx src/data src/App.routes.test.tsx && git commit -m "feat: add MVP content model and routes"`

### Task 3: Produce replaceable object-scene assets and a resilient hero component

**Files:**
- Create: `src/assets/renders/hero-kit.webp`, `src/assets/renders/book-detail.webp`, `src/assets/renders/box-detail.webp`, `src/assets/renders/envelope-detail.webp`, `src/assets/renders/coordinates-card.webp`, `src/assets/renders/fallback-object.webp`
- Create: `src/components/HeroObject.tsx`, `src/components/HeroObject.module.css`
- Create: `src/components/HeroObject.test.tsx`
- Modify: `src/data/editions.ts`

**Interfaces:**
- Consumes: `Edition['assetPaths']` from Task 2 and design tokens from Task 1.
- Produces: `HeroObject({ asset: AssetSource; alt: string; priority?: boolean }): JSX.Element`.

- [ ] **Step 1: Create the visual assets through ImageGen**

Generate a coherent set of static 3D-style editorial renders: a burgundy hardback book, box, sealed envelope and light coordinate card, on a dark matte museum-lit surface. Generate a wider hero composition and four close detail crops. Exclude all forbidden TЗ motifs. Export optimized WebP files with the exact names above and preserve a dedicated fallback composition.

- [ ] **Step 2: Write the failing image-error test**

```tsx
it('swaps to the static fallback when the render cannot load', () => {
  render(<HeroObject asset={brokenAsset} alt="Комплект BOOKFORYOU" />)
  fireEvent.error(screen.getByRole('img', { name: /комплект/i }))
  expect(screen.getByRole('img', { name: /комплект/i })).toHaveAttribute('src', fallbackAsset.src)
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- --run src/components/HeroObject.test.tsx`

Expected: FAIL because `HeroObject` does not exist.

- [ ] **Step 4: Implement `HeroObject` and wire asset paths**

Render a semantic `figure`/`img` pair with explicit dimensions or aspect ratio to avoid layout shift. On `onError`, replace the requested render source with `fallback-object.webp` while preserving the meaningful alt text. Mark only the above-the-fold hero image as high-priority; lazy-load secondary details.

- [ ] **Step 5: Run the component test and build**

Run: `npm test -- --run src/components/HeroObject.test.tsx && npm run build`

Expected: PASS and image assets are bundled.

- [ ] **Step 6: Commit visual assets and hero resilience**

Run: `git add src/assets/renders src/components/HeroObject* src/data/editions.ts && git commit -m "feat: add book-object renders and hero fallback"`

### Task 4: Build shared editorial, navigation and availability components

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Header.module.css`, `src/components/Header.test.tsx`
- Create: `src/components/Footer.tsx`, `src/components/EditorialSection.tsx`, `src/components/ObjectDetails.tsx`, `src/components/AvailabilityNotice.tsx`
- Create: component CSS modules and component tests under `src/components/`

**Interfaces:**
- Consumes: router paths from Task 2, `HeroObject` from Task 3, and global tokens from Task 1.
- Produces: `Header()`, `Footer()`, `EditorialSection(props)`, `ObjectDetails({ edition }: { edition: Edition })`, and `AvailabilityNotice()` for page assembly.

- [ ] **Step 1: Write failing interaction tests**

```tsx
it('opens and closes the mobile navigation with an accessible button', async () => {
  render(<Header />)
  await user.click(screen.getByRole('button', { name: /меню/i }))
  expect(screen.getByRole('navigation', { name: /основная/i })).toBeVisible()
})

it('uses only the non-purchasable availability copy', () => {
  render(<AvailabilityNotice />)
  expect(screen.getByText('Скоро будет доступно')).toBeVisible()
  expect(screen.queryByText(/^купить$/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run src/components/Header.test.tsx src/components/AvailabilityNotice.test.tsx`

Expected: FAIL because the shared components do not exist.

- [ ] **Step 3: Implement shared components with semantic interaction rules**

Build a wordmark header with desktop links and a 44 px keyboard-operable menu button. Keep focus visible, close the menu on route change and Escape, and avoid hover-only controls. Build the footer with the four legal links. Use editorial/object components to express the approved physical-object and curator content. Implement availability as a non-submitting, non-payment control with no cart icon.

- [ ] **Step 4: Add motion CSS and reduced-motion behavior**

Use only opacity/transform for subtle entrance, press and hero-parallax effects. Use 150–300 ms for controls, an explicitly slow ambient hero transform, and disable both under `prefers-reduced-motion`.

- [ ] **Step 5: Run all component tests**

Run: `npm test -- --run src/components`

Expected: PASS.

- [ ] **Step 6: Commit shared components**

Run: `git add src/components && git commit -m "feat: add editorial navigation and availability components"`

### Task 5: Compose and style the public editorial pages

**Files:**
- Create: `src/pages/HomePage.tsx`, `src/pages/HomePage.module.css`, `src/pages/HomePage.test.tsx`
- Create: `src/pages/EditionPage.tsx`, `src/pages/EditionPage.module.css`, `src/pages/EditionPage.test.tsx`
- Create: `src/pages/CollectionPage.tsx`, `src/pages/CollectionPage.module.css`, `src/pages/CollectionPage.test.tsx`
- Create: `src/components/EditionCard.tsx`, `src/components/EditionCard.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Edition` data, route parameters, `Header`, `Footer`, `HeroObject`, `EditorialSection`, `ObjectDetails`, and `AvailabilityNotice` from Tasks 2–4.
- Produces: complete views for `/`, `/edition/001`, and `/collection`.

- [ ] **Step 1: Write failing page-content tests**

```tsx
it('shows every required physical object on the home page', () => {
  renderAtPath('/')
  expect(screen.getByText('КНИГА')).toBeVisible()
  expect(screen.getByText('КОРОБКА')).toBeVisible()
  expect(screen.getByText('ЗАПЕЧАТАННЫЙ КОНВЕРТ')).toBeVisible()
  expect(screen.getByText('КАРТОЧКА С КООРДИНАТАМИ')).toBeVisible()
})

it('marks №001 as the current collection release', () => {
  renderAtPath('/collection')
  expect(screen.getByText(/bookforyou №001/i)).toBeVisible()
})
```

- [ ] **Step 2: Run the page tests to verify they fail**

Run: `npm test -- --run src/pages`

Expected: FAIL because the public page components do not exist.

- [ ] **Step 3: Implement `HomePage()`**

Assemble the dark hero, “Почему эта книга здесь,” physical-object sequence, gift section, and short curator block. Use large editorial display type and an intentionally compact navigation; do not add prohibited motifs or marketing-icon rows.

- [ ] **Step 4: Implement `EditionPage()` and `CollectionPage()`**

Read the route slug via `getEditionBySlug`. Show the current edition’s price `4 900 ₽`, neutral missing-title/author placeholders, object details and `AvailabilityNotice`. Keep collection cards finite and content-led; highlight the current release without a commerce-grid aesthetic.

- [ ] **Step 5: Implement responsive styles**

Start at 375 px with a vertical hero composition, readable text and usable navigation. Add layout breakpoints at 768, 1024 and 1440 px. Make desktop wider and more spacious without changing reading order. Reserve image space and ensure no layout overflows.

- [ ] **Step 6: Run page tests and production build**

Run: `npm test -- --run src/pages && npm run build`

Expected: PASS and completed build.

- [ ] **Step 7: Commit page composition**

Run: `git add src/pages src/components/EditionCard* src/App.tsx && git commit -m "feat: compose BOOKFORYOU editorial pages"`

### Task 6: Add legal placeholders and release-quality browser checks

**Files:**
- Create: `src/pages/LegalPlaceholderPage.tsx`, `src/pages/LegalPlaceholderPage.test.tsx`
- Create: `e2e/navigation.spec.ts`, `e2e/responsive.spec.ts`, `playwright.config.ts`
- Modify: `src/components/Footer.tsx`, `src/App.tsx`

**Interfaces:**
- Consumes: `legalPages` from Task 2 and public page routes from Task 5.
- Produces: four truthful legal placeholder pages and automated viewport/direct-link coverage.

- [ ] **Step 1: Write failing legal-page tests**

```tsx
it.each(['requisites', 'privacy', 'terms', 'delivery'])('does not invent data for %s', (slug) => {
  renderAtPath(`/legal/${slug}`)
  expect(screen.getByText(/будет опубликована к запуску продаж/i)).toBeVisible()
  expect(screen.queryByText(/инн|огрн/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the legal tests to verify they fail**

Run: `npm test -- --run src/pages/LegalPlaceholderPage.test.tsx`

Expected: FAIL because the legal page does not exist.

- [ ] **Step 3: Implement `LegalPlaceholderPage()` and footer wiring**

Render a unique heading for each of the four required legal areas and the exact truthful availability statement. Do not add forms, cookies, business data, payment logos, delivery promises or consent checkboxes. Confirm every footer link uses its direct route.

- [ ] **Step 4: Write and run browser checks**

Add Playwright tests that: open each direct public/legal URL; navigate from header/footer; assert `Скоро будет доступно` on the edition page; emulate `prefers-reduced-motion`; and check the document has no horizontal overflow at 375, 768, 1024 and 1440 px.

Run: `npm run test:e2e`

Expected: PASS in Chromium for all defined routes and viewports.

- [ ] **Step 5: Perform manual visual QA**

Open the site at all four target widths. Check contrast, focus rings, menu touch targets, the static hero fallback, line wrapping for Russian copy, absence of banned imagery, and the absence of a cart/order/payment flow.

- [ ] **Step 6: Run the complete verification suite**

Run: `npm test -- --run && npm run build && npm run test:e2e`

Expected: all unit tests, production build and browser checks PASS.

- [ ] **Step 7: Commit legal and QA coverage**

Run: `git add src/pages/LegalPlaceholderPage* src/components/Footer.tsx src/App.tsx e2e playwright.config.ts && git commit -m "feat: add legal placeholders and MVP quality checks"`

## Plan Self-Review

- **Spec coverage:** Tasks 1–6 cover every spec section: MVP scope, three public pages, visual tokens, type, 3D-render replacement/fallback, motion, legal placeholders, accessibility and viewport verification.
- **Step scan:** Each task has an explicit failing test, failure command, implementation action, passing verification and commit. Asset generation is bounded to the exact six replaceable render files.
- **Type consistency:** `Edition`, `assetPaths`, `getEditionBySlug`, `HeroObject`, `AvailabilityNotice` and legal route contracts are defined before their consumers and named consistently.
- **Review focus:** All five user-impacting failure classes named above have an owning task and test/check.
- **Proportion:** The plan defines interfaces, files and tests without prescribing component bodies or CSS declarations line by line.
