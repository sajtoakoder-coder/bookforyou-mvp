# Product composition revision

Request: fix the collection's lower-right typography, redesign the edition page, and enlarge/integrate both kit photograph presentations. Existing frontend-only scope, client photographs, wine palette, fonts, routes, selection behavior and launch availability retained. No additional approval waits or agents, following the user's standing preferences.

## Changes

- Collection: remove the overlapping decorative 001. Present the complete kit across the release spread, with a dark directional text scrim. Correct future-release status contrast on ivory and give small-screen metadata an explicit wrapping grid.
- Edition: replace the giant number rail, vertical price and small inset photograph with a large book/copy spread. Keep the price horizontal, availability non-interactive, and add real back/kit links. The audience line is from chapter 10 of the supplied client storyboard, not invented curator copy. The unprovided curator text remains an honest placeholder in a smaller editorial note.
- Kit: full-width overview scene with directional shading; mobile/tablet photo transitions only at its section boundaries. Detail photographs fill a large edge-aligned gallery rather than sitting inside feathered rectangles. Portrait book framing is tall enough to preserve its top/bottom; landscape details deliberately use tighter photographic crops. No source images were edited, recolored or blurred.
- Reuse the existing kit selector on the edition page instead of the older duplicate static image grid. No new dependency or backend.

This supersedes the four-edge photograph masks and naturally proportioned detail-frame description in the earlier editorial-polish note. Preserve those earlier notes as history.

## Verification

36 unit tests and 47 browser tests passed. TypeScript and production build passed; git diff whitespace check passed. Visually inspected collection, edition and kit spreads at desktop/mobile sizes, all four detail selections on desktop, and the revised stacked tablet overview. Narrow 320px and landscape layouts with 200% text checked for overflow. Navigation, focus restoration, anchor links, reduced motion, image fallback and keyboard detail selection remain covered.

Local-only revision; no GitHub push or production deployment performed for this request.
