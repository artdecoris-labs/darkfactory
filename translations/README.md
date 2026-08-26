# Translations

Trilingual content for the Shopify store, extracted from the live Odoo site rather than
written or machine-translated. Odoo already serves all three languages:

| Locale | Odoo URL |
| --- | --- |
| `nl` **primary** | `/nl/<slug>` |
| `en` | `/<slug>` |
| `fr` | `/fr/<slug>` |

## artists.csv

`handle, field, locale, value` — 27 rows: three artists × three locales × three fields
(`name`, `blurb`, `bio`).

Loaded as: **`nl` into the metaobject's own fields** (Dutch is the shop's primary locale),
with `en` and `fr` registered as translations via `translationsRegister`.

### Two things to know before trusting it

- **Paragraph structure differs per language at source.** The Dutch and French pages merge
  what English splits — Anne Mondy is 3 paragraphs in EN and 2 in NL, with the Dutch first
  paragraph covering the first two English ones. No content is missing; the counts simply
  differ. Each language keeps its own structure.
- **`blurb` is derived, not authored.** It is the first sentence of the first paragraph,
  taken mechanically. That gives an honest, on-brand line but a long one for a card. Worth
  a human pass in **Translate & Adapt**, which is also where it should be edited from now
  on — not here.

## Re-generating

The extractor is not yet part of the migration repo. When Phase B starts it belongs
there, since the catalog needs the same three-language treatment: Odoo stores
translations per field, so every product name and description multiplies by three.
