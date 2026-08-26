# ArtDecoris Design System

**Brand:** ArtDecoris — *Made In Art* · Belgium (Antwerp region, +32 3 361 63 80, info@artdecoris.com)
**Purpose of this system:** author ArtDecoris storefront work — including a **Shopify** theme — plus campaign, catalogue and deck material that looks like the brand.

## 1. Company & product context

ArtDecoris sells **exclusive interior and exterior decoration carrying designs by contemporary artists**. Every SKU is positioned as an artwork rather than décor: limited editions, named artists, in-house state-of-the-art digital printing. Artists have worked with Nike, LVMH, Ferrari, Estée Lauder, Gucci, Lamborghini, Chanel and De Ferla.

**Represented artists / designers:** Anne Mondy (French; vibrant colour, organic shapes) · B.R.A.S.S. · Juan de Lascurain.

**Catalogue structure**
- *home deco* — Candles, Cushions Indoor, Diffusers, Lighting, Wall art
- *outdoor deco* — Beanbags, Cushions Outdoor
- *Shop by artist* — Anne Mondy, B.R.A.S.S., Juan de Lascurain
- *Custom made* — on-site consultation → design proposal → creation (murals, objects, lobbies)
- *B2B portal*, downloadable catalogue (FlippingBook), blog, FAQ

**Surfaces**
1. **Storefront** (primary) — home, category/collection, product detail, cart, artist landing pages, custom-art service page, about/team, blog, FAQ, B2B portal. Currently built on **Odoo eCommerce**; the brief is to move this vocabulary onto **Shopify**.
2. Newsletter + catalogue (secondary, same visual language).

Trilingual: English (UK), Nederlands, Français. Prices in EUR, formatted `98.35 €`.

## 2. Sources used

| Source | What was read |
| --- | --- |
| `https://www.artdecoris.com/` | homepage copy, hero, value props, category row, artist row, highlight blocks |
| `https://www.artdecoris.com/about-us` | brand story, philosophy, team bios, footer + nav IA |
| `https://www.artdecoris.com/custom-art` | custom-made service flow and copy |
| `https://www.artdecoris.com/shop/wall-decoration-bici-166` | full PDP structure: gallery, variants, price, stock, tabs, spec table, related products |
| `https://www.artdecoris.com/shop/wall-decoration-hearts-164`, `…-flowers-165`, `…-ojitos-168` | product names, prices, descriptions |

No Figma file, no repository and no brand book were supplied. **Nothing was recreated from screenshots.**

### Known gaps — please close these
1. **No CSS or theme source.** The live site is Odoo-rendered; its stylesheet and colour values were not reachable from this environment. **The colour ramps and type choices in `tokens/` are an informed reconstruction of the brand's gallery-neutral look, not measured values.** Send hex codes (or a theme export) and they will be swapped in.
2. **No font binaries.** Substituted **Cormorant Garamond** (display serif) + **Karla** (body sans) from Google Fonts. Flagged in `tokens/fonts.css`.
3. **Assets are hotlinked, not vendored** (except the logo). The site's media (`/web/image/…`) could not be downloaded here. `assets/images.js` holds the real live URLs; they render in a browser but nothing is stored in this project. **Please drop the source files (product photography, artist portraits, signatures) into `assets/`.**
4. **Logo:** `assets/logo.png` — the real Art Decoris mark, supplied by the brand: a black ink splatter with **ART DECORIS** knocked out in uppercase sans. It is used in the storefront header (≈60px tall), inverted on ink backgrounds (footer), and on the project tile. Nothing was drawn or approximated. A vector (SVG/EPS) version would still be welcome for print and large formats.

## 3. Content fundamentals

**Voice:** a gallery owner who is genuinely warm — exclusive, never cold. Confident craft claims, no hype stacking.

- **Person:** "we" for ArtDecoris, "you/your" for the customer. Never "I" outside team bios (bios do use first person: *"I have the privilege of blending my love for design…"*).
- **Headlines are often questions.** *"An exclusive interior piece by an artist in your home?"* · *"Do you want exclusivity with a custom-made art work?"* · *"A unique masterpiece on your wall?"*
- **Sentence case in prose; UPPERCASE with wide tracking for UI labels** (`ADD TO CART`, `SHOP OUR PRODUCTS`, `OUR COLLECTION`). Titles use title case for products (*Wall Decoration Bici*) and sentence case for sections (*Discover our exclusive collection*).
- **Vocabulary that recurs:** exclusive, unique, contemporary, top-notch, limited edition, state-of-the-art, eye-catcher, work of art, atmosphere, transform, prestige. Superlatives are attached to *evidence* (artist names, brand collaborations, printing method).
- **Product copy pattern:** one benefit line ("Take your interior to the next level with…"), then material/craft, then sizes, then who it's for, then a cross-sell nudge ("Complete the experience with a matching candle or diffuser.").
- **Length:** hero 8–14 words; section intros 1–2 sentences; product description 3–5 sentences.
- **Reassurance copy is fixed and repeated:** *15-days money-back guarantee* · *Delivery time: 2-3 Business Days*.
- **Emoji: no.** (One 🎨 appears on an Instagram bio — never on-site.) No exclamation stacking; at most one "!" per block, usually none.
- **Artist names always in full** on first use: *Juan de Lascurain*, *Anne Mondy*, *B.R.A.S.S.*
- **Prices:** `98.35 €` — amount, space, symbol; dot as decimal separator.
- Avoid: discount-shouting, countdown urgency, "shop now!!", generic e-commerce filler.

## 4. Visual foundations

**Idea:** the page is a gallery wall. Warm paper surfaces, near-black ink, one gilded accent; all the colour comes from the artwork.

- **Colour.** Warm near-black `--ink-900 #12100E` for text and solid buttons. Surfaces are warm off-whites (`--paper-050 #FAF8F5`, `--paper-100 #F4F1EC`) — never blue-grey. One brand accent, **brass** (`--brass-500 #B08D57`), used for rules, hover states and the gilded CTA. `--accent-*` (coral, ochre, jade, lapis, plum) are drawn from the artwork and are for editorial moments only — never UI chrome. Semantics are muted and rare. **Never** use gradients as decoration; the only gradients are photo protection scrims.
- **Type.** Display serif (Cormorant Garamond, 300–400) for every heading, hero and product title. Humanist sans (Karla) for body at 15px/1.55, capped at ~56ch. The brand's signature detail is **uppercase sans with wide tracking** — `.14em` on controls, `.22em` on eyebrows. No sans headings, no serif body.
- **Spacing.** 4px base scale; `--section-y: 112px` between sections; 40px page gutters; 1280px container; 32px product-grid gap. Generous whitespace is the luxury signal — when in doubt, add space, not decoration.
- **Backgrounds.** Mostly flat paper. Photography is **full-bleed** (hero, category tiles, editorial split blocks) and always art *in situ* — real interiors, warm daylight, some grain, no cut-out white-box styling for lifestyle shots (product photography itself is square on neutral). No patterns, no textures, no hand-drawn illustration. There is no repeating deco motif in the source — do not invent one.
- **Corner radii.** Effectively square: `--radius-card: 0`, `--radius-image: 0`, controls `2px`. The only pill is the cart/wishlist count bubble.
- **Cards.** Product cards are white, square-cornered, **no border** — a hairline box-shadow at rest (`--shadow-hairline`), lifting to `--shadow-hover` with the image zooming 3.5%. Text is centred: uppercase artist, serif title, price. No coloured left borders, ever.
- **Shadows.** Four steps only: hairline (rest) → lift (hover on light cards) → hover (product cards) → frame (`--shadow-frame`, for framed-artwork mocks). Inner shadow (`--inset-press`) only as the button press cue. Overlay panels use `--shadow-overlay`.
- **Borders & rules.** One hairline weight (`--border-hairline #E4DFD7`) for dividers and table rows; `--border-strong` (ink) for outline buttons and the active tab; a 56px **brass rule** under centred section titles as editorial punctuation.
- **Animation.** Slow and calm: 160ms for control colour changes, 240ms base, 420ms for image zoom, 700ms for reveals. Easing `--ease-out-soft cubic-bezier(.16,.84,.44,1)`. Fades and slow zooms only — no bounce, no spring, no parallax gimmicks.
- **Hover states.** Links and ghost buttons shift to brass. Outline buttons **invert** to solid ink. Solid ink buttons lighten to `--ink-700`. Images zoom `--zoom-image-hover: 1.035` and the card's shadow deepens. Nothing changes size except images.
- **Press states.** 1px downward nudge plus `--inset-press`; no scale-down, no colour flash.
- **Transparency & blur.** Only two uses: `--gradient-protect` (bottom-up ink scrim) behind labels on photography, and `--overlay-veil` + `blur(6px)` for controls floating over an image (quick-view, gallery arrows). Never blurred panels over flat colour.
- **Layout rules.** Sticky header (announcement bar + 96px row) is the only fixed element. Content is centred in a 1280px container; hero and category rows may run full-bleed. Product grids: 3 columns with filters, 4 without.
- **Imagery colour vibe.** Warm, slightly desaturated interiors; the artwork supplies the saturation. No cool/blue grading, no black & white, no heavy filters.
- **Iconography** — see §5.

## 5. Iconography

The source site's icon usage is thin and mixed, and this is documented rather than tidied up:
- **Odoo theme glyph font** (Font Awesome derivative) for header utilities, social links and the cart/wishlist counters. Not extractable from this environment.
- **Flat PNG spot icons at 50px** from icons8 for the four trust statements under the hero (`icons8-artist-50.png`, `icons8-craft-50.png`, `icons8-interior-50.png`, `Approval.png`). These are hotlinked in `assets/images.js` as `iconArtist`, `iconCraft`, `iconInterior`, `iconApproval` and used by `ValueProp`.
- **Country-flag PNGs** for the language switcher (`/base/static/img/country_flags/…`).
- **No emoji, no unicode-glyph icons** anywhere on-site.

**Substitution (flagged):** for UI icons this system uses **Lucide** from CDN (`https://unpkg.com/lucide@0.451.0`) at 20px / 1.5 stroke — the closest light-line match to the Odoo glyph font. Swap for the real icon font when it is available. Icons are always monochrome, inherit `currentColor`, and are never used decoratively at large sizes.

## 6. Index of this project

| Path | What it is |
| --- | --- |
| `styles.css` | the single entry point consumers link — `@import`s only |
| `tokens/` | `fonts.css` (font substitution notice), `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css` |
| `assets/logo.png` | the Art Decoris ink-splatter mark (supplied by the brand) |
| `assets/images.js` | live ArtDecoris image URLs (`window.AD_IMAGES`) — hotlinked, not vendored |
| `guidelines/*.card.html` | 21 foundation specimen cards (Colors, Type, Spacing, Foundations, Brand) |
| `components/core/` | Button, IconButton, Badge, Price, Input, SectionHeading, Tabs |
| `components/commerce/` | ProductCard, CategoryTile, ArtistCard, SizeSelector, QuantityStepper, ValueProp, SpecTable |
| `templates/collection-page/` | copy-and-edit shop-page template (Design Component) |
| `ui_kits/storefront/` | click-through recreation: home, collection, product, cart, custom-art (`index.html`) |
| `thumbnail.html` | project tile |
| `SKILL.md` | Agent-Skills wrapper so this folder works inside Claude Code |

**Component inventory rationale.** The source defines no component library, so the inventory was derived strictly from what the live storefront renders. Nothing speculative was added.
*Intentional additions:* none. *Deliberately omitted (present on site but not enough source detail):* login/register, B2B portal, blog templates, checkout steps, review widgets (the site has none).

**Template:** *Collection page* — announcement bar, header, section heading and a 3-up product grid, ready to copy into a consuming project.

## 7. Using this for Shopify

- Map tokens to theme settings: `--ink-900` → text, `--paper-050` → background, `--brass-500` → accent/button. Keep radii at 0.
- `ProductCard` mirrors a card snippet: media (square, hover-swap second image), uppercase vendor = artist, serif title, `Price`.
- `SizeSelector` is the variant picker (Size, Designer). `Badge tone="soldOut"` covers `!available`.
- PDP tabs are Description / Specifications / Technical specifications; the source publishes "TBC" for the latter two — keep them empty rather than inventing content.
- Keep the fixed reassurance line ("15-days money-back guarantee · Delivery 2–3 business days") in the announcement bar and on the PDP.
