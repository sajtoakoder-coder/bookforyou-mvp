# Three-Screen Preorder Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long BOOKFORYOU home sequence with three client-approved screens and a truthful, non-payment preorder dialog.

**Architecture:** `HomePage` becomes three presentational sections and one controlled preorder dialog. Edition metadata is extended once in `data/editions.ts`; a typed preorder boundary reports an unavailable receiver instead of silently losing contacts. Existing routes, header, legal pages, footer, and photo-retry component remain intact.

**Tech Stack:** React 19, TypeScript, React Router 7, CSS Modules, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-13-three-screen-preorder-design.md`

## Global Constraints

- Keep Cormorant Garamond, Manrope, `#160b08`, `#4b1714`, `#eee2cc`, and `#b8945b`; add no dependencies or stock imagery.
- The home page has exactly three sections: release/action, ritual, curator/close.
- Copy includes “20 экземпляров”, “Для того, кто хочет реализоваться”, the supplied three ritual steps, and the approved Rita quote.
- No card fields, basket, payment claim, payment provider, or success state without a real preorder response.
- Modal controls are at least 44px high, support keyboard use and reduced motion, and retain entries after failure.
- Maintain edition, collection, legal, header, footer, photo-retry, and responsive routes.

## Review Focus

- Unconfigured receiver: preserve entries and show “Заявки пока не принимаются”; never show success. Task 2.
- Network failure: preserve entries and show a retryable error; never show success. Task 2.
- Missing consent or both contacts: announce inline error and make no receiver call. Task 2.
- Escape, close, and backdrop: close modal and restore focus to the triggering CTA. Task 2.
- 320px and 200% text: no horizontal scroll and no hidden CTA. Task 4.
- Failed product image: current retry UI stays visible in new photo frames. Task 3.

---

## File Structure

- `src/data/editions.ts` — release metadata.
- `src/features/preorder/types.ts` — request/result/receiver contracts.
- `src/features/preorder/unconfiguredReceiver.ts` — safe default receiver.
- `src/components/PreorderDialog.tsx` and `.module.css` — native dialog, validation, submit/error state and focus restoration.
- `src/components/PreorderDialog.test.tsx` — modal behavior.
- `src/pages/HomePage.tsx` and `.module.css` — three screens plus dialog state.
- `src/pages/HomePage.test.tsx` and `e2e/three-screen-home.spec.ts` — content, responsive, dialog and regression coverage.

### Task 1: Release metadata and preorder boundary

**Files:**
- Modify: `src/data/editions.ts`
- Create: `src/features/preorder/types.ts`
- Create: `src/features/preorder/unconfiguredReceiver.ts`
- Create: `src/features/preorder/unconfiguredReceiver.test.ts`

**Interfaces:**
- Produces `PreorderRequest { name: string; telegram: string; phone: string; email: string; consent: true }`.
- Produces `PreorderResult = { ok: true } | { ok: false; code: 'unconfigured' | 'network' }`.
- Produces `PreorderReceiver = (request: PreorderRequest) => Promise<PreorderResult>`.
- Adds current-edition fields `run: '20 экземпляров'` and `audiencePrompt: 'Для того, кто хочет реализоваться'`.

- [ ] **Step 1: Write the failing receiver test**

```ts
it('does not claim a preorder was accepted without a configured receiver', async () => {
  await expect(unconfiguredReceiver(request)).resolves.toEqual({ ok: false, code: 'unconfigured' })
})
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/features/preorder/unconfiguredReceiver.test.ts`

Expected: FAIL because the receiver module does not exist.

- [ ] **Step 3: Implement the contract and receiver**

Implement `unconfiguredReceiver(request: PreorderRequest): Promise<PreorderResult>` to return `{ ok: false, code: 'unconfigured' }` without sending or logging data. Add fields only to edition data; do not duplicate release copy in components.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- --run src/features/preorder/unconfiguredReceiver.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/data/editions.ts src/features/preorder && git commit -m "feat: add preorder boundary and release metadata"`

### Task 2: Accessible preorder dialog with truthful unavailable state

**Files:**
- Create: `src/components/PreorderDialog.tsx`
- Create: `src/components/PreorderDialog.module.css`
- Create: `src/components/PreorderDialog.test.tsx`

**Interfaces:**
- Consumes Task 1 `PreorderReceiver`, `PreorderRequest`, and `PreorderResult`.
- Produces `PreorderDialog({ open: boolean; onClose: () => void; opener: HTMLElement | null; receiver: PreorderReceiver }): JSX.Element`.

- [ ] **Step 1: Write the failing dialog tests**

```tsx
it('rejects a blank contact and missing consent without invoking receiver', async () => {
  render(<OpenDialog receiver={receiver} />)
  await user.click(screen.getByRole('button', { name: 'Оставить заявку' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Укажите Telegram или телефон')
  expect(receiver).not.toHaveBeenCalled()
})

it('keeps fields and exposes the unconfigured state after submit', async () => {
  render(<OpenDialog receiver={unconfiguredReceiver} />)
  await fillValidForm()
  await user.click(screen.getByRole('button', { name: 'Оставить заявку' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('Заявки пока не принимаются')
  expect(screen.getByLabelText('Telegram')).toHaveValue('@reader')
})
```

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `npm test -- --run src/components/PreorderDialog.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement dialog and validation**

Use native `<dialog>` with the `showModal()`/`close()` lifecycle already used by `Header`. Label name, Telegram, phone and e-mail inputs; require name, consent, and either Telegram or phone; link consent to `/legal/privacy`; use `role="alert"` for errors. Only render a success view for `{ ok: true }`. For `{ ok: false, code: 'unconfigured' }`, retain values and show the exact unavailable message. Close on Escape, close button, and backdrop, then focus `opener`.

- [ ] **Step 4: Add success and keyboard tests**

Use an injected receiver resolving `{ ok: true }` to prove success is gated by a real result. Use one resolving `{ ok: false, code: 'network' }` to prove entries remain visible with “Не удалось отправить заявку. Попробуйте ещё раз.” Assert Escape closes the dialog and focuses the opening button.

- [ ] **Step 5: Run the focused test suite to verify it passes**

Run: `npm test -- --run src/components/PreorderDialog.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

Run: `git add src/components/PreorderDialog* && git commit -m "feat: add accessible preorder dialog"`

### Task 3: Replace home composition with the three approved screens

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/HomePage.module.css`
- Modify: `src/pages/HomePage.test.tsx`
- Modify: `e2e/home-sequence.spec.ts`

**Interfaces:**
- Consumes Task 1 edition fields and Task 2 `PreorderDialog`.
- Produces sections `release`, `ritual`, and `curator-close`; both CTAs open the same dialog.

- [ ] **Step 1: Rewrite failing home-page tests to the new structure**

```tsx
expect(sectionIds).toEqual(['release', 'ritual', 'curator-close'])
expect(screen.getByText('20 экземпляров')).toBeVisible()
expect(screen.getByText('Три вопроса. Одна книга.')).toBeVisible()
expect(screen.getByText('Рита Ленских')).toBeVisible()
expect(screen.getAllByRole('button', { name: /заказать|выбрать выпуск/i })).toHaveLength(2)
expect(screen.queryByText('Книга, которую проще передать, чем объяснить')).not.toBeInTheDocument()
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/pages/HomePage.test.tsx`

Expected: FAIL because the prior 11-section content remains.

- [ ] **Step 3: Implement sections and CTA state**

Replace old home content with supplied Russian copy. Use `HeroObject` for one kit photo in screen 1 and a distinct coordinate/envelope photo for screen 2. Render ritual as an ordered list. Make “Для того, кто хочет реализоваться” a `<details>` disclosure with a static explanation. Render Telegram as plain text (not a dead link) until the client supplies its address; add legal links in screen 3 without removing the site-wide footer. Store the CTA opener and pass `unconfiguredReceiver` until the client selects a receiver.

- [ ] **Step 4: Implement responsive visual layout**

Replace old home CSS selectors instead of layering overrides. Desktop: distinct text/photo release spread, object/ordered ritual spread, curator close. Mobile: copy → one photo → action, clear 1px boundaries, `clamp()` display type, 1.5rem gutters, full-width photographs and no adjacent duplicate image. Preserve `object-fit: cover`, existing tokens, focus styles, 44px CTAs and no continuous decorative motion.

- [ ] **Step 5: Update browser sequence coverage**

Change `e2e/home-sequence.spec.ts` to assert the three IDs, same dialog from both CTAs, three ritual list items, omitted old chapters, photo retry and the preserved edition route.

- [ ] **Step 6: Run focused tests to verify they pass**

Run: `npm test -- --run src/pages/HomePage.test.tsx && npm run test:e2e -- e2e/home-sequence.spec.ts --workers=2`

Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add src/pages/HomePage.tsx src/pages/HomePage.module.css src/pages/HomePage.test.tsx e2e/home-sequence.spec.ts && git commit -m "feat: replace home with three-screen preorder story"`

### Task 4: Responsive, dialog, and regression verification

**Files:**
- Create: `e2e/three-screen-home.spec.ts`
- Modify: `e2e/responsive.spec.ts`
- Modify: `e2e/image-framing.spec.ts`
- Modify: `e2e/mobile-editorial.spec.ts`

**Interfaces:**
- Consumes final three-section DOM and dialog behaviour from Tasks 2–3.

- [ ] **Step 1: Write the failing responsive test**

```ts
for (const width of [320, 375, 768, 1440]) {
  test(`three-screen home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    expect(await page.locator('main > section').evaluateAll(items => items.map(item => item.id))).toEqual(['release', 'ritual', 'curator-close'])
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}
```

- [ ] **Step 2: Run the focused suite to verify it fails**

Run: `npm run test:e2e -- e2e/three-screen-home.spec.ts --workers=2`

Expected: FAIL until Task 3 is complete.

- [ ] **Step 3: Add modal, landscape and reduced-motion assertions**

At 375px assert CTA controls are 44px high, Escape closes the dialog and no payment/card fields exist. At 812×375 with `html { font-size: 200%; }`, assert no overflow. Under reduced motion, assert zero dialog transition duration and visible content. At 1440px screenshot each screen and ensure only one visible product photo appears at an adjacent chapter boundary.

- [ ] **Step 4: Remove obsolete home expectations**

Remove test requirements for old `#gift`, `#inside`, `#questions`, `#keepsake`, and the old kit selector on home. Keep independent photo retry coverage on release/ritual images.

- [ ] **Step 5: Run the full verification suite**

Run: `npm test -- --run && npm run test:e2e -- --workers=3 && npm run build`

Expected: all unit tests, browser tests and production build pass.

- [ ] **Step 6: Inspect screenshots and commit**

Inspect 375px, 812×375px and 1440px screenshots for photograph continuity, dialog framing, section boundaries and readable text. Then run: `git add e2e/three-screen-home.spec.ts e2e/responsive.spec.ts e2e/image-framing.spec.ts e2e/mobile-editorial.spec.ts && git commit -m "test: cover three-screen preorder home"`.

## Self-Review

- Tasks 1–3 cover data, three screens, client copy, two CTAs, no payment, modal behavior and failure states; Task 4 covers responsive, keyboard, motion and photo regressions.
- Task 1 defines the receiver used in Task 2; Task 2 defines the dialog used in Task 3; Task 3 defines DOM asserted by Task 4.
- Every Review Focus input has an owning test in Tasks 2–4.
- Exclusions remain excluded: payment, provider, persistent receiver, cookie banner, delivery/return flow and animations are not added.
