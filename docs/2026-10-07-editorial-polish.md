# Follow-up: photograph edges, grid, wine surfaces and edition metadata

User requested six browser-marked changes after the home storyboard implementation.

- Kit overview and all four detail photographs use intersecting horizontal/vertical alpha masks. Pixels in the central subject remain sharp; no blur, filtering, recoloring or original-file edits.
- Keepsake now uses the same 50/50 desktop split as the adjacent gift section. Existing stacked layouts below 900px remain.
- Gift and home collection replace the rust highlight #60281b with wine-lit #451511, wine-deep #2b0a09 and existing chocolate #160b08. Ivory text remains unchanged. Decorative 001 uses subdued ivory rather than bright brass.
- Edition 001: title `Гений`, author `Теодор Драйзер`, taken from chapter 10 of the client's previously supplied numbered storyboard. These values are **not** present in the actual `tz.txt`, which begins with a fragment before section 10. This follows the user's observation that those supplied book details should replace the placeholders.
- The shared edition record now drives home, detail page, kit description and collection. Future editions 002/003 keep their unknown metadata. Curator-specific copy, authentic portrait, sales availability and backend remain unchanged/unconfirmed.

This metadata update supersedes the title/author-placeholder note in the earlier home-sequence spec and verification outcome. No new deployment is included in this revision.

Verification: production build succeeded; 36 unit tests and 43 browser tests passed. Desktop shared seam and mobile kit/first-edition screenshots were inspected. The mobile collection navigation test now explicitly centers its link before navigating, since the shorter confirmed book title can leave that link in the opening viewport; route focus and scroll-reset assertions are retained.
