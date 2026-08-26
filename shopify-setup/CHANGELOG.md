# Shopify store change log

Every change made to the store itself — not the theme, which is tracked in git in
`artdecoris-shop-theme-00`. Store changes leave no diff, so without this there is no
record of what was altered or how to undo it.

**Append an entry whenever a mutation changes the store.** Record the reversal, not just
the action.

Resource ids are deliberately **not** here — this repository is public. They live in
`C:\DevOps\artdecoris-private\store-ids.local.md`, or look them up on demand.

---

## 2026-08-26 — Artist model, content and navigation

Store: the handle in the theme repo's gitignored `shopify.theme.toml`.
All changes made through `shopify store execute` using the files in this folder.

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 1 | `artist` metaobject definition created — 6 fields (`name` required, `portrait`, `blurb`, `bio`, `signature`, `collection`); capabilities `publishable`, `translatable`, `onlineStore` (urlHandle `artists`); `storefront: PUBLIC_READ` | `metaobjectDefinitionCreate` | `metaobjectDefinitionDelete` — **destroys all entries** |
| 2 | Product metafield `custom.artist` created — `metaobject_reference`, `storefront: PUBLIC_READ` | `metafieldDefinitionCreate` | `metafieldDefinitionDelete` |
| 3 | Three artist entries created, all `ACTIVE`: `anne-mondy`, `brass`, `juan-de-lascurain`. Name, blurb and story copy migrated from the live Odoo pages — no copy was written for this | `metaobjectCreate` ×3 | `metaobjectDelete` |
| 4 | Three portrait images uploaded to Files, from `artdecoris-shop-design-system/assets/` | `stagedUploadsCreate` → `fileCreate` ×3 | `fileDelete` |
| 5 | Portraits attached to the three artists | `metaobjectUpdate` ×3 | set `portrait` to empty |
| 6 | Page **Meet the artists** created — handle `artists`, `templateSuffix: artists`, published | `pageCreate` | `pageDelete` |
| 7 | Main menu (`main-menu`, "Hoofdmenu") gained **Meet the artists** → `/pages/artists`. The three existing items were read and resent unchanged | `menuUpdate` | `menuUpdate` with the original three items |

### Notes

- **`menuUpdate` replaces the whole item list.** It does not append. Existing items must
  be read and sent back or they are deleted. This applies to any future menu change.
- A **development theme** also exists, created automatically by `shopify theme dev`. It is
  disposable and not connected to any branch.
- App scopes were granted incrementally as each step needed them. The full working set is
  in [README.md](README.md).

---

## 2026-08-26 — Trilingual content

Dutch stays the primary locale; English and French added alongside. All content was
**migrated from the live Odoo site**, which already publishes all three languages at
`/<slug>`, `/nl/<slug>` and `/fr/<slug>`. Nothing was written or machine-translated.

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 8 | Locales `en` and `fr` enabled | `shopLocaleEnable` ×2 | `shopLocaleDisable` |
| 9 | Both published — **after** translations existed, so no locale was ever live and empty | `shopLocaleUpdate` ×2 | `shopLocaleUpdate` `published: false` |
| 10 | The three artist entries rewritten with **Dutch** in their own fields. They previously held English, which sat wrongly in the primary slot | `metaobjectUpdate` ×3 | re-run with the English values |
| 11 | 18 translations registered — 3 artists × 2 locales × 3 fields | `translationsRegister` ×3 | `translationsRemove` |

### Resolved — locales had to be assigned to the **domain**

Alternate-locale URLs returned 404 even after the locales were enabled and published.
Publishing a locale is not enough, and neither is adding it to the market: each language
must be **assigned to a domain** in *Settings → Languages*. Done in admin, since the
primary market reports `webPresences` as empty while `marketWebPresenceCreate` refuses
with `domainId has already been taken` — the existing web presence is neither readable
nor updatable through that API surface.

Verified afterwards, each serving its own language:

| URL | |
| --- | --- |
| `/pages/artists` | 200 — Dutch |
| `/en/pages/artists` | 200 — English |
| `/fr/pages/artists` | 200 — French |

`hreflang` now advertises `nl`, `en`, `fr` and `x-default`. Individual story pages
resolve in all three.

> Admin lists English and French as **"No translations"**. That counter tracks theme and
> store content, not metaobjects — the artist translations are registered and demonstrably
> serving. Do not treat that label as a failure.

> **The same trap will hit the catalog.** A product can carry perfect French copy and still
> 404 if the language is not assigned to a domain. Publishing ≠ routing.

---

## 2026-08-26 — Eight sample products from the Odoo catalogue

The store had **zero products**, so the homepage product section rendered empty. Eight
real products were migrated from `artdecoris.com` to make the storefront reviewable —
titles, descriptions, images, prices and designers all from the live site, nothing
invented.

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 12 | Eight products created, `ACTIVE`, each with an `odoo.id` metafield and `vendor` set to its designer | `productCreate` ×8 | `productDelete` |
| 13 | Prices set — `productCreate` defaults a new variant to 0.00 | `productVariantsBulkUpdate` ×8 | re-run with correct values |
| 14 | All eight published to the **Online Store** channel | `publishablePublish` ×8 | `publishableUnpublish` |

### What this exercise proved

**`productCreate` with `status: ACTIVE` does not publish to any sales channel.** The
products existed, were ACTIVE, had images and prices, and were invisible on the
storefront — `publishedAt: null`, `onlineStoreUrl: null`. The bulk load in Phase B must
publish explicitly, or it will appear to succeed and sell nothing.

**Prices are locale-formatted in the HTML.** The English page renders `4,249.00` — comma
as the *thousands* separator. A naive comma-to-dot conversion turns €4,249 into €4.25.
The Dutch and French pages use `4.249,00`, the other way round. **Take prices from the
Odoo API, not from scraped pages.**

### Two data problems this surfaced

1. **Not every product has a designer.** *Iridescent Monolith* has no attributes at all —
   no Designer, no Size. `vendor` cannot be assumed populated; it was set to
   `Art Decoris` as a placeholder and needs a real rule.
2. **Designer names do not match the artist records.** Odoo says `BRASS`; the artist
   metaobject, built from the artist page, says `B.R.A.S.S.` The vendor→artist join
   silently fails for that one. The migration needs a normalisation rule, and the
   evaluation gate should flag any vendor with no matching artist entry.

---

## 2026-08-26 — Vendor join made explicit

The sample load exposed that Odoo's designer value `BRASS` did not match the artist
record `B.R.A.S.S.`, so the product→artist join failed silently. Odoo publishes both
spellings, and the brands page renders one with a zero-width no-break space.

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 15 | `vendor` field added to the `artist` metaobject definition — the exact Shopify vendor string, used as the join key instead of the display name | `metaobjectDefinitionUpdate` | `metaobjectDefinitionUpdate` with `delete` |
| 16 | Vendor keys set: `Anne Mondy`, `B.R.A.S.S.`, `Juan de Lascurain` | `metaobjectUpdate` ×3 | clear the field |
| 17 | *Diffuser White Fololo* vendor normalised `BRASS` → `B.R.A.S.S.` | `productUpdate` | `productUpdate` |

Vendors are now consistent: Anne Mondy ×3, Juan de Lascurain ×3, B.R.A.S.S. ×1,
Art Decoris ×1 (the product with no designer at all).

`transform/vendor-normalisation.yaml` carries the map and the normalisation steps —
strip BOM and zero-width characters, trim, collapse whitespace — so this cannot recur
during the bulk load.

---

## Template for new entries

```markdown
## YYYY-MM-DD — <what changed, in one line>

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 1 | | | |
```
