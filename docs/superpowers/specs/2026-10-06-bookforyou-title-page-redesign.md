# BOOKFORYOU — «Титульный лист»

## Purpose

Make the existing MVP feel like a contemporary cultural edition rather than a generic luxury landing page. The primary audience is a client reviewing an early presentation and a reader deciding whether release №001 is a meaningful physical object. The page must sell the idea of a carefully chosen book without imitating an online bookstore or promising unavailable commerce.

## Constraints

- Preserve the MVP routes, Russian copy, exact price `4 900 ₽`, legal placeholders, accessibility, and mobile priority.
- Keep the wine-and-paper palette. Do not introduce gold, gradients, mystical imagery, shelves, candles, ornamental frames, generic ecommerce cards, fake urgency, or invented services.
- Use supplied object renders only as supporting material. Real book photographs can replace them later without structural changes.
- Do not add cart, checkout, payment, inventory, delivery, analytics, cookies, or data collection.

## Design decision

The redesign uses the **Title Page** direction. Its memorable device is one oversized typographic composition—`BOOK / FOR / YOU`—treated as the cover of a contemporary edition. The site earns its premium character through crop, scale, paper-like fields, precise rhythm and restraint rather than decorative luxury signals.

### Tokens

| Role | Value | Use |
| --- | --- | --- |
| Ink wine | `#21080F` | deep stage background and footer |
| Cover wine | `#4A0F1D` | hero and editorial blocks |
| Paper | `#F2E9DB` | primary reading surface |
| Raised paper | `#FBF7F0` | quiet contrast in details |
| Ink | `#1B1715` | text on paper |
| Dusty copper | `#9C7357` | limited rules, markers and release metadata |

Display text remains Cormorant Garamond; Manrope remains the information face. The pairing is already loaded and has sufficient contrast, so the work is in optical scale and hierarchy rather than adding a third face. Price and release number use tabular figures. Display is tightly tracked at large sizes; headings are `1.1–1.2` line-height; body is `1.5–1.6`, `16px` minimum, and limited to readable measures.

### Home page

1. **Title-page hero.** A wine field holds the large three-line title. A small release marker, one cropped object fragment and a paper-like action plaque provide scale contrast. The action is explicit: `Смотреть выпуск №001`.
2. **Thesis strip.** One sentence that explains the object, not a row of generic benefits.
3. **Physical edition spread.** The four kit components read as an asymmetric editorial layout; numbers only appear because this is a real four-part inventory. Objects get unequal areas based on their role, not equal cards.
4. **Gift turn.** A dark interlude makes the “for another person” proposition emotionally legible and retains the existing `#gift` anchor.
5. **Curator and collection.** The curator block stays text-first until an authentic portrait exists. The current release is editorially prominent; future releases appear as a short publication list rather than product tiles.

### Edition and collection

Edition №001 becomes an expanded title-page sequence: number, release context, object image, physical composition and price form a continuous story. The collection page opens with the current release as a single large publication, followed by slim rows for upcoming issues. Existing route and focus behaviour stays unchanged.

### Header and interaction

The header acts as a usable publication masthead: wordmark, meaningful navigation, current release and a compact menu control. It must stay legible against paper and wine contexts. Hover and pressed states are small and material (color shift, 1–2px transform); no scattered scroll fade-ins. One restrained hero reveal is allowed. `prefers-reduced-motion` displays all information immediately.

### Responsive and accessibility

At mobile widths, title, release marker and action retain their order and do not turn into tiny editorial labels. Text stays selectable, headings remain semantic, the language remains Russian, focus is visible, targets remain at least 44px, and no route overflows horizontally at 375px. Respect the existing skip link, route focus and keyboard menu behaviour.

## Anti-template review

The previous campaign direction relied on conventional premium cues—plaque, dark hero, numbered details and card-like object areas. This revision removes their equal visual weight. It makes the typography the only deliberate spectacle, uses numbering only for the actual kit sequence, replaces generic benefits with one thesis, and gives every following section a publication role. The wine palette is derived from a book cover and print ink, not a generic luxury theme.

## Verification

- Existing unit and route tests remain green; update tests only where deliberately changed accessible names or structure require it.
- Build succeeds with `npm run build`.
- Browser checks cover home, edition and collection at 375, 768, 1024 and 1440px for readable text, no horizontal overflow, working menu/routes and reduced-motion behaviour.
- Typography audit confirms semantic descending heading scale, unitless leading, readable paragraph measure, 16px body size and tabular price/release figures.
