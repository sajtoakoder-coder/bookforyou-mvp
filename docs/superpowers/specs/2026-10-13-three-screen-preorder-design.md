# BOOKFORYOU: three-screen home and preorder

## Purpose

Replace the current long editorial home page with the client's three-screen sales narrative. The home page should explain the product in one pass, give a clear non-payment preorder action, and retain the separate edition and collection routes as supporting pages.

Success means a visitor can understand the product, the ritual, the curator's role, the current release, price, and limited run without scrolling through the former multi-chapter story. The design remains photographic, quiet, and premium on desktop and mobile.

## Scope

### Screen 1 — release and action

The opening screen contains the exact supplied positioning:

- BOOKFORYOU and “Книжный подарок для себя и близких”.
- “Книга. Для тебя.”
- The supplied explanation of the question, the manually selected coordinates, release metadata, “20 экземпляров”, and the 4 900 ₽ preorder CTA.
- One full-bleed product photograph with a dark readable text field; it must not duplicate the image in the following screen.

The selector “Для того, кто хочет реализоваться” is a visual disclosure affordance only until the client supplies multiple states/releases. It opens a short static explanatory line; it does not pretend to personalize the book or collect a quiz answer.

### Screen 2 — object and ritual

One integrated photograph of the complete set is followed by “Три вопроса. Одна книга.” and the client's three steps. The curator's individual selection of the three coordinates is a closing note. This replaces separate question, kit, envelope, and how-it-works chapters.

The section must have an explicit visual boundary and use only the supplied product photographs. There is no envelope-opening animation in this scope.

### Screen 3 — curator and close

This screen presents Rita Lenskikh, the approved quotation, “Иногда книга знает больше чем мы сами”, a second preorder CTA, and a compact footer with Telegram plus the legal links. It intentionally removes the separate gift, collection teaser, and long curator chapters from the home page.

## Preorder behaviour

Clicking either “Заказать · 4 900 ₽” / “Выбрать выпуск №001” opens an accessible modal. It asks for:

- name;
- one required contact field (Telegram handle or phone);
- optional email;
- required acknowledgement of the personal-data policy.

There is explicitly no basket, card form, payment provider, or payment claim. The success screen must only appear after a real submission response. Failed submission keeps data in the modal and displays a clear recovery message.

### Integration boundary

The client needs to choose and provide one receiver before the form can go live: a CRM/webhook, e-mail form service, or Telegram bot. The browser must never contain bot tokens or other secrets. The UI will call a single environment-backed preorder endpoint; until it is configured, the public CTA must state that preorder requests are not yet being accepted rather than silently discard contacts.

## Visual system and responsive layout

Retain the existing palette and typography: ink wine `#160b08`, wine `#4b1714`, paper `#eee2cc`, brass `#b8945b`; Cormorant Garamond for display and Manrope for body.

Desktop has three intentionally different spreads rather than three similar cards:

1. A text-led first fold with the photographic kit on the right.
2. A full-width product/ritual spread with the three steps aligned as an ordered sequence.
3. A dark curator close with the quotation as the central visual object.

Mobile stacks each screen as copy, one photograph where relevant, then action. Every interactive control is at least 44px high. The modal supports Escape, native dialog focus trapping, a visible close control, and reduced motion.

## Architecture

- Replace `HomePage`'s current 11-section sequence with a compact page composed from `ReleaseHero`, `ReadingRitual`, `CuratorClose`, and `PreorderDialog`.
- Keep release data in `data/editions.ts`; add the limited-run and intended-state copy there, rather than hard-coding them in multiple components.
- Keep existing edition, collection, legal, header, and footer routes. The home footer becomes compact; the site-wide footer remains the source of legal links on non-home routes.
- Introduce a small `preorder` boundary module with a typed request/result contract. It has no real provider implementation until the client selects one.

## Failure states

- If a product photo fails, use the existing retry UI; do not show an unrelated illustration.
- If the preorder endpoint is unavailable, show a visible "Заявки пока не принимаются" state and do not report success.
- Required consent/contact validation is inline and announced to assistive technology.

## Verification

- Unit tests pin the three sections, provided copy, no payment fields, accessible modal controls, validation, and no success state without a successful handler response.
- Browser tests cover 320, 375, 768, and desktop widths; no horizontal overflow; keyboard dialog use; reduced motion; image retry; and the two CTAs opening the same preorder flow.
- Screenshot review covers the full mobile sequence and all three desktop screens.

## Exclusions

- Internet acquiring, cards, SberPay/SBP, online cash register, payment receipts, delivery rates, return workflow, envelope opening, page turning, analytics/cookie banner, and data storage are not part of this change.
- Legal texts are separate client-supplied/legally reviewed content. The form only links to the existing policy page.
