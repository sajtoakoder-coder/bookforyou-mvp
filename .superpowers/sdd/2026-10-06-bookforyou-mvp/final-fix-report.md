# Final review fix wave — 2026-10-06

## Changes

- Added `RouteEffects` in the router shell. Client navigation, including Back, moves focus to the new page's `h1` (main landmark fallback), makes it programmatically focusable, and resets scroll to the top without a smooth animation. Initial direct loads preserve normal first-Tab behavior. Manual history scroll restoration prevents the browser from restoring an old scroll offset after the route effect; the prior setting is restored on unmount.
- Removed the mobile menu's competing focus return after navigation. Escape still returns focus to the menu button; navigation now leaves focus on the new page heading.
- Added the actual mobile collection-card regression: at 375 × 812, scroll to “Узнать о выпуске”, click, then verify edition URL, focused heading in the viewport and scrollY = 0; Back also focuses the collection heading and resets scroll. The mobile-menu test also checks destination focus.
- Screenshot readiness now awaits `img.decode()` for each image, including already-loaded images. Rejected decodes return a failed bounded polling result, allowing an image fallback to load and preventing an unresolved load-event wait on a broken image. Captures also await fonts and reveal activation, return to the top and disable animations for stable full-page evidence.
- Added restrained, one-time scroll reveals on existing editorial inner blocks, object detail articles and the curator block. Only opacity and a 12 px vertical transform transition over the existing 400 ms token. Initial viewport content remains visible. Reduced motion leaves everything visible, including after a live preference change; absent browser APIs also leave content visible. Observer/listener cleanup occurs on navigation/unmount. Content and reading order are unchanged.

## Verification

- Before implementation: `npm run test:e2e -- e2e/navigation.spec.ts -g 'mobile collection card'` reported the expected failing regression (missing destination heading focus). The Windows test-server teardown stayed running after the failure and was interrupted after the successful verification runs.
- Focused component checks: `npm test -- --run src/components/Header.test.tsx src/App.routes.test.tsx` — 2 files, 15 tests passed.
- Focused browser checks: `npm run test:e2e -- e2e/navigation.spec.ts -g 'mobile'` — 2 tests passed, including collection-card navigation and mobile-menu destination focus.
- `npm test -- --run` — 10 files, 31 tests passed.
- `npm run build` — TypeScript and Vite production build passed.
- `npm run test:e2e` — all 18 tests passed in the configured Edge Chromium channel. Coverage includes scroll reveals, live reduced-motion changes, direct routes, navigation, fallback imagery, keyboard focus, control sizing and four responsive widths.
- `git diff --check` — passed (only Windows LF/CRLF conversion notices).

## Regenerated visual evidence

Regenerated and visually inspected the ignored local artifacts `test-results/qa-home-375.png`, `qa-home-768.png`, `qa-home-1024.png` and `qa-home-1440.png`. Each contains all five images, the editorial and curator sections, and the footer. No reveal-hidden content, blank image tiles, horizontal overflow or clipped Russian copy was found.

## Self-review

All three final-review findings are addressed. The route effect deliberately applies the requested top-of-page behavior to Back/Forward as well as link navigation. Focus is not stolen on initial page load. The menu's Escape behavior is preserved, while route focus has one owner. Reveals enhance existing static markup without changing semantics or adding layout animations. Screenshot decoding fails clearly on unrecoverable broken images instead of silently approving incomplete evidence.

No dependencies, forms, cookies, analytics, storage, commerce flow, payment controls, backend/API, legal claims or personal-data collection were added. Existing content and unavailable-purchase behavior are preserved. The available Edge Chromium channel remains the browser validation environment; no cross-browser claim is made. No known final-fix defects remain.
