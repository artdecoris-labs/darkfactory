# Design handoff — 2026-08-26

Archived snapshot of the Claude Design project, kept so theme work has a stable
reference that does not depend on the remote project staying unchanged.

| | |
| --- | --- |
| Project | `claude.ai/design/p/bb6c0ac2-81d9-478c-9cfe-544b7253a755` |
| Artboard | `ArtDecoris Shopify Storefront.dc.html` |
| Design system | `artdecoris-design-system-246c33f1-d238-4bea-9f20-afe682af0c0e` |
| Obtained via | `Shopify migration UX design-handoff.zip` in `artdecoris-shop-design-system` |
| Archived | 2026-08-26 |

The zip export was used rather than a live Design API read: it contains the complete
project, so no `/design-login` authorization was needed.

## What is here

- `ArtDecoris Shopify Storefront.dc.html` — the storefront artboard (54 KB)
- `ds/tokens/*.css` — colors, typography, fonts, spacing, radius, elevation, motion
- `ds/styles.css`, `base.css` — element defaults
- `assets/` — the placeholder imagery **as shipped in the export**. The real photography
  lives in `artdecoris-shop-design-system/assets/`; do not use these for production.
- `support.js`, `_ds/` — canvas runtime, not needed for the theme

## Applied to the theme

`ds/tokens/*` → `artdecoris-shop-theme-00/config/settings_data.json`, as both the
`current` settings and a new **Art Decoris** preset. The stock `Horizon` preset is left
untouched as a revert point.

### Substitutions and approximations

- **Fonts are a substitution of a substitution.** `fonts.css` states the design already
  substituted Cormorant Garamond + Karla as "the closest Google Fonts matches" because
  the live Odoo site's font binaries were not obtainable. On top of that, **Cormorant
  Garamond is not in Shopify's font library** — only **Cormorant**, the same superfamily,
  which is what the theme now uses. If the real brand faces are ever identified, both
  layers of substitution should be revisited.
- **Type sizes are nearest matches.** Horizon offers a fixed size list, so exact rem
  values from the tokens cannot be set. Body is 16px against the token's 15px, rounded up
  for readability.
- **Page width.** The token container is 1280px; Horizon's narrowest option is 1440px.
  `narrow` is the closest available.

Anything the settings could not express should go in a thin custom CSS layer — **not** by
editing Horizon vendor files, which would make upstream upgrades expensive.
