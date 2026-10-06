# BOOKFORYOU Title Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the deployed BOOKFORYOU MVP into a restrained, typographic “Title Page” experience without changing its product scope or routes.

**Architecture:** Preserve the existing React routes and data model. Recompose the existing page and shared component CSS around new visual tokens and typographic roles; reuse the current book-object images only as secondary imagery. Retain current accessible header, hash navigation and legal routes, updating tests only where intentional content and structure change.

**Tech Stack:** React 18, TypeScript, React Router, CSS Modules, vanilla CSS, Vitest, Playwright, Vite.

**Spec:** `docs/superpowers/specs/2026-10-06-bookforyou-title-page-redesign.md`

## Global Constraints

- Keep Russian copy, `4 900 ₽`, legal placeholders, current routes and no-commerce MVP scope.
- Use only the defined wine/paper/ink/copper token palette; do not add gold, gradients, mystical imagery, generic product grids or stock imagery.
- Retain Cormorant Garamond for display and Manrope for information; no third font or dependency.
- Keep semantic headings, 44px controls, visible focus, selectable text, route focus/hash behavior and reduced-motion support.
- Use unitless line-height; body text is at least `1rem`; price and release number use `font-variant-numeric: tabular-nums`.
- Verify 375, 768, 1024 and 1440px with no horizontal page overflow.

## Review Focus

- At 375px, the three-line hero title, release marker and CTA must remain readable without horizontal overflow.
- Keyboard users must still open, navigate and close the mobile menu, including a route change from GIFT.
- The `/#gift` link must scroll/focus the real gift section, not leave the visitor at the top of the home page.
- Reduced-motion users must receive all hero text and navigation without hidden/reveal-only content.
- A long edition title or price must remain legible in collection and edition layouts without clipping.

---

### Task 1: Establish title-page tokens and masthead type hierarchy

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.module.css`
- Test: `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: existing CSS custom properties and `Header` link/button markup.
- Produces: semantic color/type tokens and a responsive masthead that later page CSS consumes through `var(...)`.

- [ ] **Step 1: Add a failing masthead semantic test**

Extend `src/components/Header.test.tsx` to assert that the wordmark, `COLLECTION`, `STORY`, `GIFT`, release text and menu button retain their accessible names.

- [ ] **Step 2: Run the focused test to record the baseline**

Run: `npm test -- Header.test.tsx`
Expected: PASS before CSS-only refactor; record that the test protects intended structure.

- [ ] **Step 3: Replace visual token values in `src/styles/tokens.css`**

Set the six roles from the spec (`#21080F`, `#4A0F1D`, `#F2E9DB`, `#FBF7F0`, `#1B1715`, `#9C7357`) and add named type-role custom properties only when a shared component uses them.

- [ ] **Step 4: Tighten global type defaults in `src/styles/global.css`**

Set root-only font smoothing, Russian-friendly body rhythm, display tracking, `text-wrap: balance` for headings, `text-wrap: pretty` for paragraphs, and tabular figures on price/release selectors. Do not apply blanket text transforms or disable text selection.

- [ ] **Step 5: Restyle `src/components/Header.module.css` as a masthead**

Keep current layout/interaction markup. Use the new background contexts, non-uppercase visual treatment where copy permits, explicit active-state treatment, small transform/opacity interaction feedback, and the existing 44px menu control.

- [ ] **Step 6: Run focused tests and build**

Run: `npm test -- Header.test.tsx && npm run build`
Expected: tests pass and Vite emits `dist/`.

- [ ] **Step 7: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css src/components/Header.module.css src/components/Header.test.tsx
git commit -m "style: establish title page visual system"
```

### Task 2: Recompose the home page around the title-page hero and edition spread

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/HomePage.module.css`
- Modify: `src/components/ObjectDetails.module.css`
- Modify: `src/components/EditorialSection.module.css`
- Test: `src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `Edition`, `HeroObject`, `ObjectDetails`, `EditorialSection`, `AvailabilityNotice`, and new root tokens from Task 1.
- Produces: the `#gift` target, an accessible hero heading and a four-part editorial physical-edition spread.

- [ ] **Step 1: Add failing home-page assertions**

In `src/pages/HomePage.test.tsx`, assert the hero exposes `BOOK FOR YOU`, one explicit link `Смотреть выпуск №001`, the exact price `4 900 ₽`, and the `gift` section is addressable by ID.

- [ ] **Step 2: Run the focused home-page test**

Run: `npm test -- HomePage.test.tsx`
Expected: FAIL only for the new CTA wording before the JSX update.

- [ ] **Step 3: Update `HomePage.tsx` copy and structure**

Replace decorative kicker/plaque wording with the title-page hierarchy and explicit CTA. Keep a single thesis strip, the existing object data, the `gift` anchor, curator quote and no portrait placeholder. Do not add product cards or new imagery.

- [ ] **Step 4: Rebuild `HomePage.module.css` as one title-page composition**

Make the large three-line title the only spectacle; crop the existing hero object to a supporting edge fragment. Give the thesis, object spread, gift turn and curator distinct publication roles. Use unequal grid regions for the actual four kit parts, no equal-card row, and one restrained transform/opacity hero sequence only.

- [ ] **Step 5: Update shared editorial/object CSS**

In `ObjectDetails.module.css` and `EditorialSection.module.css`, replace uniform card treatment with paper fields, print rules and responsive asymmetric layout while preserving semantic document order.

- [ ] **Step 6: Run focused home tests and build**

Run: `npm test -- HomePage.test.tsx SharedEditorial.test.tsx && npm run build`
Expected: all selected tests and build pass.

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.tsx src/pages/HomePage.module.css src/components/ObjectDetails.module.css src/components/EditorialSection.module.css src/pages/HomePage.test.tsx
git commit -m "feat: compose title page home experience"
```

### Task 3: Carry the publication system into edition and collection routes

**Files:**
- Modify: `src/pages/EditionPage.module.css`
- Modify: `src/pages/CollectionPage.module.css`
- Modify: `src/components/EditionCard.module.css`
- Test: `src/pages/EditionPage.test.tsx`
- Test: `src/pages/CollectionPage.test.tsx`

**Interfaces:**
- Consumes: unchanged edition route/data and shared tokens from Task 1.
- Produces: a current-edition story and a compact future-release publication list without product-grid semantics.

- [ ] **Step 1: Add route-level assertions**

Extend the edition and collection tests to assert exact visible `4 900 ₽`, `№001`, and navigation back to the collection/home route where those flows already exist.

- [ ] **Step 2: Run focused route tests**

Run: `npm test -- EditionPage.test.tsx CollectionPage.test.tsx`
Expected: PASS before visual refactor; they protect route copy and links.

- [ ] **Step 3: Restyle `EditionPage.module.css`**

Express number, object image, composition and price as a continuous title-page story using alternating wine/paper fields. Keep every price and release label readable, using tabular figures.

- [ ] **Step 4: Restyle collection and edition-card CSS**

Make the active release a large publication block. Render future issues as compact, semantically ordered editorial rows; do not use equal widths, generic shadows or rounded ecommerce tiles.

- [ ] **Step 5: Run focused tests and build**

Run: `npm test -- EditionPage.test.tsx CollectionPage.test.tsx && npm run build`
Expected: all selected tests and build pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/EditionPage.module.css src/pages/CollectionPage.module.css src/components/EditionCard.module.css src/pages/EditionPage.test.tsx src/pages/CollectionPage.test.tsx
git commit -m "style: extend title page system to publication routes"
```

### Task 4: Verify interaction, responsive typography and deployment readiness

**Files:**
- Modify: `e2e/navigation.spec.ts`
- Modify: `e2e/responsive.spec.ts`
- Test: `src/App.routes.test.tsx`

**Interfaces:**
- Consumes: finished routes, header and `RouteEffects` behavior.
- Produces: browser-level regression coverage for navigation, GIFT hash and viewport constraints.

- [ ] **Step 1: Extend browser assertions for title-page navigation**

In `e2e/navigation.spec.ts`, assert that `GIFT` reaches `#gift` and that the focused section is visible after navigation; retain mobile menu Escape and focus-return checks.

- [ ] **Step 2: Extend responsive assertions**

In `e2e/responsive.spec.ts`, check `document.documentElement.scrollWidth <= window.innerWidth` at 375/768/1024/1440 for `/`, `/edition/001` and `/collection`, and inspect the home CTA at 375px.

- [ ] **Step 3: Run unit, build and Playwright suites**

Run: `npm test -- --run && npm run build && npx playwright test`
Expected: all tests pass, Vite build succeeds and viewport/navigation suites report no overflow or focus failure.

- [ ] **Step 4: Manually audit typography and motion**

At 375/768/1024/1440, verify readable display/body measures, descending headings, visible focus, tabular price/release values, no text clipping and immediate content in reduced-motion mode. Record any unverified browser condition in the implementation report.

- [ ] **Step 5: Commit**

```bash
git add e2e/navigation.spec.ts e2e/responsive.spec.ts src/App.routes.test.tsx
git commit -m "test: cover title page responsive interactions"
```
