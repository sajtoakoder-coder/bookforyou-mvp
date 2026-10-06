# BOOKFORYOU Luxury Campaign Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing MVP into a premium, conversion-oriented Luxury Campaign while preserving its truthful non-commerce scope.

**Architecture:** Keep the current React routes and typed data model. Recompose existing page and shared components around campaign primitives—header, release plaque, typographic hero, numbered object grid and collection rows—then validate actual navigation and visual behavior in Playwright.

**Tech Stack:** React, TypeScript, Vite, CSS modules, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-06-bookforyou-luxury-campaign-redesign.md`

## Global Constraints

- Keep `/`, `/edition/001`, `/collection` and all truthful legal pages; do not add checkout, payment, cart, forms, analytics, cookies or user-data collection.
- Preserve exact price `4 900 ₽` and CTA `СКОРО БУДЕТ ДОСТУПНО`.
- Retain approved colors and Cormorant Garamond/Manrope pairing.
- Do not introduce shelves, old-book stacks, pens, candles, gold frames, magic, tarot, astrology, ribbons, bows or a uniform e-commerce card grid.
- Keep 44×44 px targets, focus visibility, route scroll/focus reset, `prefers-reduced-motion`, 375/768/1024/1440 support and no horizontal overflow.
- Retain local, replaceable object renders; they remain secondary to type.

## Review Focus

- A hero may be visually dominant without hiding the release plaque or header at 375 px; test at 375 and 1440 in Task 3.
- The campaign CTA must remain unavailable/non-submitting and cannot become a purchase control; test in Task 1.
- Typography must retain natural Russian wrapping without horizontal overflow; test page overflow at every target viewport in Task 3.
- Motion must not hide essential content or run under reduced motion; test in Task 3.
- Legal pages and direct navigation remain unchanged; regression-test routes in Task 3.

## Planned File Structure

- `src/components/Header.*` — campaign header and responsive navigation treatment.
- `src/components/AvailabilityNotice.*` — release plaque semantics and styling.
- `src/components/ObjectDetails.*` — numbered four-object grid.
- `src/components/EditionCard.*` — collection hero/row variants.
- `src/pages/HomePage.*` — campaign hero and launch-story page.
- `src/pages/EditionPage.*` — release product-story page.
- `src/pages/CollectionPage.*` — finite collection row layout.
- `src/**/*.test.tsx`, `e2e/*.spec.ts` — regression and visual behavior coverage.

### Task 1: Build campaign primitives

**Files:**
- Modify: `src/components/Header.tsx`, `Header.module.css`, `Header.test.tsx`
- Modify: `src/components/AvailabilityNotice.tsx`, `AvailabilityNotice.module.css`, `AvailabilityNotice.test.tsx`
- Modify: `src/components/ObjectDetails.tsx`, `ObjectDetails.module.css`, `SharedEditorial.test.tsx`

**Interfaces:** Produces a campaign header, release plaque and numbered-object layout consumed by every public page.

- [ ] **Step 1: Write failing component tests**

Assert desktop header exposes `COLLECTION`, `STORY`, `GIFT`, `№001 · 4 900 ₽`; assert release plaque uses exact unavailable CTA and has no purchase semantics; assert four object labels expose `01–04`.

- [ ] **Step 2: Run focused tests red**

Run: `npm test -- --run src/components/Header.test.tsx src/components/AvailabilityNotice.test.tsx src/components/SharedEditorial.test.tsx`

Expected: FAIL because campaign copy/numbering is absent.

- [ ] **Step 3: Implement campaign primitives**

Rework the header into a visible campaign layer with a mobile wordmark/number/menu composition. Convert availability into a typographic release plaque, keeping native unavailable semantics. Render physical objects as an asymmetric numbered grid; retain alt text and render fallbacks.

- [ ] **Step 4: Run focused tests and build**

Run: `npm test -- --run src/components/Header.test.tsx src/components/AvailabilityNotice.test.tsx src/components/SharedEditorial.test.tsx && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components && git commit -m "feat: add luxury campaign primitives"`

### Task 2: Recompose public pages as a luxury campaign

**Files:**
- Modify: `src/pages/HomePage.tsx`, `HomePage.module.css`, `HomePage.test.tsx`
- Modify: `src/pages/EditionPage.tsx`, `EditionPage.module.css`, `EditionPage.test.tsx`
- Modify: `src/pages/CollectionPage.tsx`, `CollectionPage.module.css`, `CollectionPage.test.tsx`
- Modify: `src/components/EditionCard.tsx`, `EditionCard.module.css`

**Interfaces:** Consumes Task 1 primitives and typed edition data; produces the three redesigned public pages.

- [ ] **Step 1: Write failing page tests**

Assert homepage renders split campaign title `BOOK / FOR / YOU`, `№001`, release plaque, and the launch statement band. Assert edition has `001` and exact price; assert collection renders current release as a hero panel and remaining releases as finite rows.

- [ ] **Step 2: Run page tests red**

Run: `npm test -- --run src/pages/HomePage.test.tsx src/pages/EditionPage.test.tsx src/pages/CollectionPage.test.tsx`

Expected: FAIL because campaign structures are absent.

- [ ] **Step 3: Implement page hierarchy and CSS modules**

Make typography, strict grid and contrast the primary visual system. Home gets oversized type and cropped secondary object. Edition gets sticky `001`, edge price and alternating wine/paper sections. Collection uses one wide current-release panel and compact editorial rows. Use 375 px as the base and add 768/1024/1440 adjustments without changing DOM reading order.

- [ ] **Step 4: Run page tests and build**

Run: `npm test -- --run src/pages/HomePage.test.tsx src/pages/EditionPage.test.tsx src/pages/CollectionPage.test.tsx && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/pages src/components/EditionCard* && git commit -m "feat: redesign pages as luxury campaign"`

### Task 3: Validate campaign behavior and responsive presentation

**Files:**
- Modify: `e2e/navigation.spec.ts`, `e2e/responsive.spec.ts`
- Modify: `src/styles/global.css`, `src/components/RouteEffects.tsx` only if tests expose a motion/visibility regression

**Interfaces:** Consumes completed campaign pages; produces browser evidence for presentation readiness.

- [ ] **Step 1: Write failing browser checks**

At 375 and 1440 assert header and release plaque are visible, campaign title is not horizontally clipped, CTA remains unavailable, and collection-to-edition navigation resets scroll/focus. Assert reduced motion leaves campaign content visible.

- [ ] **Step 2: Run browser checks red**

Run: `npm run test:e2e`

Expected: FAIL until campaign selectors/layout are updated.

- [ ] **Step 3: Update tests and fix responsive/motion defects**

Await image decode before screenshots; retain no-overflow checks at 375/768/1024/1440 and direct legal-route checks. Fix only failures revealed by these checks.

- [ ] **Step 4: Run complete verification**

Run: `npm test -- --run && npm run build && npm run test:e2e`

Expected: all checks PASS.

- [ ] **Step 5: Commit**

Run: `git add e2e src/styles/global.css src/components/RouteEffects.tsx && git commit -m "test: verify luxury campaign presentation"`

## Plan Self-Review

- **Spec coverage:** Tasks 1–3 cover the campaign header, typographic hero, release plaque, object grid, edition and collection hierarchy, responsive motion, legal-route preservation and accessibility.
- **Type consistency:** Existing route/data contracts remain unchanged; new tests consume only public text/roles and current components.
- **Review focus:** Every listed visual/interaction failure mode has an owning task and verification.
- **Proportion:** The plan records concrete files, copy and checks without prescribing CSS implementation line by line.
