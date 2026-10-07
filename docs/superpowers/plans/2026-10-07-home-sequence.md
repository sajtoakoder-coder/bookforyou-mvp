# Home Sequence Implementation Plan

> Execution: native, no subagents, as explicitly requested by the user. Additional approval waits waived by the user's instruction.

**Goal:** Follow the approved 12-block storyboard and strengthen kit/edition presentation without changing MVP scope.

**Architecture:** Compose the existing HomePage with focused narrative and first-edition components. Keep KitExplorer's selection interface, edition assets, footer routes and motion system.

**Tech Stack:** React, TypeScript, CSS Modules, Vitest, Playwright; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-07-home-sequence-design.md`

## Global Constraints

- Client photographs, existing wine/ivory tokens and fonts only.
- No backend, orders, subscription submissions, envelope animation or invented book/portrait.
- Retain `inside`, `gift`, `kit-preview` anchor/selection contracts.

## Review Focus

- 320px and enlarged text: no clipped headings or overflow.
- Hero footer: opaque backing and no intersection with photograph.
- Literary coordinates: explain page/line/paragraph without invented hidden values.
- Keyboard selector: all four objects selectable, stable stage, no matte bars.
- Reduced motion and image failure: text usable and existing fallback preserved.

### Task 1: Sequence and editorial components

Files: `src/pages/HomePage.tsx`, `src/pages/HomePage.test.tsx`, new `src/components/ReadingJourney.tsx` and `.module.css`.

Interfaces: ReadingJourney consumes `edition: Edition`; exports named `QuestionInvitation`, `ThreeQuestions`, `ReadingSteps`, `LastingEnvelope`. Sections expose IDs `begin`, `questions`, `how-it-works`, `keepsake`.

- [x] Add failing order test for `hero, idea, begin, questions, how-it-works, inside, keepsake, gift, curator, first-edition, home-collection` and footer.
- [x] Run `npm test -- --run src/pages/HomePage.test.tsx`; expect missing IDs/sections.
- [x] Implement narrative sections with client copy and compose in that order.
- [x] Verify four ordered steps, intellectual-game explanation and absence of purchase/forms.

### Task 2: Physical object presentation and hero legibility

Files: `src/pages/HomePage.module.css`, `src/components/KitExplorer.tsx` and `.module.css`, new `src/components/FirstEdition.tsx` and `.module.css`.

Interfaces: FirstEdition consumes `edition: Edition`; region ID `first-edition`, price from data, link `/edition/${edition.slug}`. KitExplorer retains existing buttons, live preview and initial selection.

- [x] Update tests to assert dedicated edition image/price/placeholders and kit overview.
- [x] Give kit a dominant all-object photograph, readable inventory and detail selector.
- [x] Add edition split-screen and isolate hero footer in an opaque strip.
- [x] Run unit tests and `npm run build`; expect pass.

### Task 3: Browser regression and visual review

Files: new `e2e/home-sequence.spec.ts`, existing `e2e/image-framing.spec.ts` / `responsive.spec.ts`.

- [x] Add tests for image/footer bounds at five widths, 320px/enlarged text, route links and ordered sections.
- [x] Run full Playwright regression, including image fallback, selector, navigation and reduced motion.
- [x] Inspect key mobile/desktop screenshots; correct framing/spacing if necessary.
- [x] Run `git diff --check`; hand off local preview and state deployment separately.

## Verification outcome

36 unit tests and 38 browser tests passed; production build passed. After the final mobile heading-width adjustment, all seven sequence tests passed again. Visually inspected hero, kit and edition on mobile and desktop plus envelope, questions, process and keepsake sections. Fixed two enlarged-text grid overflow issues. Verified port 5173 serves the updated components. No production deployment or remote push performed in this change request. Original book metadata and authentic curator portrait are still awaiting client confirmation/assets.
