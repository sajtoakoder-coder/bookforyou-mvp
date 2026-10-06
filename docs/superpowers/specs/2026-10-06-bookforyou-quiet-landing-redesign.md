# BOOKFORYOU — Quiet Landing Redesign

## Goal

Recompose the BOOKFORYOU MVP around the spatial and typographic discipline of the supplied simple-landing reference, while keeping the BOOKFORYOU wine-and-paper identity and the existing cultural-book purpose. The result must feel like a minimal book edition rather than a SaaS landing page, a luxury template, or a copied website.

## Reference translation

The reference contributes a dark uninterrupted opening field, large two-tone headline, sparse navigation, a single pale action, generous empty space and a subtle background texture. BOOKFORYOU translates these decisions rather than copying implementation or copy:

- Reference black becomes `#21080F` / `#4A0F1D` wine.
- Reference grey secondary headline becomes dusty paper/copper, never interface grey.
- Reference dotted technical field becomes a barely visible paper-fibre / ink-grain treatment created in CSS, with no canvas, shader or downloaded texture.
- Reference CTA becomes `Смотреть выпуск №001` and leads to the existing edition route.
- The book kit and literary information replace product/component marketing content.

## Visual system

- **Dark stage:** hero, gift turn and footer use ink wine. The hero has one large two-line Russian title, `КНИГА` / `ДЛЯ ТЕБЯ`; the second line is subdued paper colour.
- **Paper stage:** the physical kit, curator and collection use `#F2E9DB` / `#FBF7F0` with ink text. They read as open printed spreads, not cards.
- **Accent:** `#9C7357` is only for rules, issue metadata and quiet labels.
- **Type:** Cormorant Garamond is display type; Manrope is information type. Display has tight tracking and `1.1` or less leading; body remains `1rem` minimum, `1.5–1.6` leading and a readable measure. Price and issue number use tabular figures.

## Page composition

### Home

1. Sparse masthead on the wine field: wordmark, collection/story/gift links, current issue and compact menu.
2. Hero title, one line of specific copy, pale CTA, and a quiet issue/price line. Object render may appear as a small cropped witness at the edge, never as a competing hero.
3. Light edition spread with four objects in an unequal editorial grid.
4. Dark gift turn containing one emotional proposition and the existing `#gift` target.
5. Light curator spread, with text only until an authentic portrait is supplied.

### Edition and collection

Edition retains its wine-to-paper progression and vertical release context. Collection retains a paper field: current issue is the only large panel; future issues are thin publication rows. No product card grid.

## Interaction

- One short title reveal on first load may be used; reduced motion renders all content immediately.
- CTA can use a small pointer-only magnetic translation capped at 12px; it must remain fully usable without a pointer and must be disabled for touch and reduced-motion users.
- Navigation hover is a restrained colour/rule transition, not a text scramble, dock or pill effect.
- Do not add Motion, GSAP, Tailwind, 21st packages, shaders, gradients, glass effects or animated background decoration.

## Non-negotiables

Keep routes, Russian copy where not intentionally replaced, exact price `4 900 ₽`, legal placeholders, accessibility semantics, 44px controls, focus visibility, no horizontal overflow and no-commerce MVP scope. Do not introduce bookshelves, candles, magic, gold decoration, fake availability, customer data collection or invented seller information.

## Verification

Run all current unit tests, production build and Playwright route/responsive suites. Manually verify home at 375/768/1024/1440px for readable title/CTA, wine/paper contrast, no horizontal overflow and reduced-motion visibility.
