# BOOKFORYOU Quiet Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the supplied minimal landing-page composition to BOOKFORYOU’s wine-and-paper publishing experience.

**Architecture:** Keep React routes and existing assets. Recompose only the home hero and shared visual CSS; preserve edition/collection structure and use the shared token system for continuity.

**Tech Stack:** React, TypeScript, CSS Modules, Vite, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-06-bookforyou-quiet-landing-redesign.md`

## Global Constraints

- No copied source, wording or assets from the reference.
- No Motion, GSAP, Tailwind, 21st packages, shaders, gradients or glass effects.
- Keep `4 900 ₽`, routes, legal placeholders, 44px targets, focus, Russian language, reduced motion and no-commerce scope.

## Review Focus

- The two-line Russian title and CTA fit at 375px without horizontal overflow.
- The wine hero retains enough contrast for the subdued second title line.
- The light object spread preserves DOM reading order.
- Reduced motion does not hide title or CTA.
- Existing GIFT hash navigation remains focused and visible.

### Task 1: Compose the quiet wine hero

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/HomePage.module.css`
- Modify: `src/pages/HomePage.test.tsx`

- [ ] Replace English three-line hero with semantic Russian `КНИГА` / `ДЛЯ ТЕБЯ` title, quiet issue line and one CTA while retaining current edition route.
- [ ] Add CSS-only grain-like field via a radial/repeating pattern limited to the wine hero, with a static reduced-motion-safe title reveal.
- [ ] Update home tests for the intentional accessible copy and execute `npm test -- HomePage.test.tsx`.

### Task 2: Align shared paper/dark surfaces and verify

**Files:**
- Modify: `src/components/Header.module.css`
- Modify: `src/components/Footer.module.css`
- Modify: `e2e/responsive.spec.ts`

- [ ] Align masthead/footer rules with the quiet wine stage without changing routes or menu behaviour.
- [ ] Extend responsive assertions for Russian hero lines and run `npm test -- --run`, `npm run build`, and `npx playwright test`.
- [ ] Commit and push only after every suite passes.
