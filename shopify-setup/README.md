# Shopify store setup

One-time Admin API configuration the theme depends on. Run in order.

The `artist-grid` block renders an empty state until step 1 exists — that is expected,
not a bug.

## Before you start

```powershell
shopify store auth --store <store>.myshopify.com `
  --scopes write_metaobject_definitions,write_metafield_definitions,read_products
```

The store handle is in the theme repo's gitignored `shopify.theme.toml`.

## 1. Create the `artist` metaobject definition

```powershell
shopify store execute -s <store>.myshopify.com --allow-mutations `
  --query-file shopify-setup/01-artist-metaobject.graphql `
  --variable-file shopify-setup/01-artist-metaobject.variables.json
```

**Keep the `id` it returns** — step 2 needs it.

Fields created: `name` (required), `portrait`, `blurb`, `bio`, `signature`, `collection`.
Only `name` is required, so an artist can be added before the photography exists.

Three capabilities are switched on deliberately:

| Capability | Why |
| --- | --- |
| `onlineStore` (`urlHandle: "artists"`) | Gives each artist a real story URL, so no bespoke page template is needed. The card falls back to the linked collection if this is off. |
| `translatable` | The storefront is EN / NL / FR. Turning this on later does not retro-fit existing entries cleanly. |
| `publishable` | Lets an artist be drafted before going live. |

`storefront: PUBLIC_READ` is **required** — without it the theme cannot read the entries
and every card renders empty.

## 2. Create the product → artist metafield

Paste the id from step 1 into `02-product-artist-metafield.variables.json`, replacing
`REPLACE_WITH_ID_FROM_STEP_01`, then:

```powershell
shopify store execute -s <store>.myshopify.com --allow-mutations `
  --query-file shopify-setup/02-product-artist-metafield.graphql `
  --variable-file shopify-setup/02-product-artist-metafield.variables.json
```

## 3. Add the first artists

Content → Metaobjects → Artists. Three exist on the Odoo site today: Anne Mondy,
B.R.A.S.S., Juan de Lascurain. The migration will populate the rest.

## 4. Vendor and collections

For each artist, set `vendor` on their products, then create an automated collection with
the single rule **Vendor is &lt;artist name&gt;** and a handle matching the metaobject.

> Shopify's `vendor` holds the **designer**, not a supplier. Odoo uses the same word for
> purchase suppliers — see `docs/odoo-shopify-terminology.md` before wiring any connector.

## Notes

- **Filtering by artist** uses `vendor`, which is filterable natively. The metafield is
  for display. If you later filter on the metafield instead, enable it in the
  **Search & Discovery** app — definition-level settings do not control that.
- If `file_type_options` is rejected on the portrait or signature fields, delete the
  `validations` array from those two entries and re-run. The field still works; it is
  just not restricted to images.
- These mutations are **not idempotent**. Re-running step 1 returns a
  `TAKEN` error rather than updating. To change a definition afterwards use
  `metaobjectDefinitionUpdate`.
