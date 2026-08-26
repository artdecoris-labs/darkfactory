# Odoo ↔ Shopify terminology

Odoo is not being replaced, so both vocabularies stay in use and a connector sits between
them. Several words exist in **both systems with different — sometimes opposite —
meanings.** Those are the ones that cause silent data corruption, because nothing errors:
a value simply lands in a field that means something else.

---

## False friends — same word, different concept

Read this section before writing any mapping code.

### `Vendor` ⚠ the worst one

| | Meaning |
| --- | --- |
| **Odoo** | A **purchase supplier** — who you *buy from*. `res.partner` linked via `product.supplierinfo`. Back-office data, never shown to shoppers. |
| **Shopify** | The product's **brand or maker** — a free-text attribution string shown to shoppers, filterable, with its own storefront route. |

**Opposite ends of the supply chain.** A connector that maps "Vendor" to "Vendor" puts
your supplier's name on the storefront.

The correct mapping is diagonal:

```
Odoo Brand  ──────────────────▶  Shopify Vendor
Odoo Vendor  ─────╳──────────▶  (nothing — supplier data stays in Odoo)
```

### `Template`

| | Meaning |
| --- | --- |
| **Odoo** | `product.template` — the **parent product record** that variants hang off. Also, separately, a QWeb view. |
| **Shopify** | A **page layout file** (`templates/product.json`) listing which sections render. |

Entirely unrelated. `product.template` is data; `templates/product.json` is presentation.

### `Category`

| | Meaning |
| --- | --- |
| **Odoo** | `product.category` — the **internal accounting and inventory** category. Not customer-facing. |
| **Odoo** | `product.public.category` — the **browsable shop** category. This is the customer-facing one. |
| **Shopify** | No object called Category. The browsable equivalent is a **Collection**. |

Mapping `product.category` produces a collection tree shaped like the accounting chart.
Use `product.public.category`, and note products link to it through `public_categ_ids`,
**not** `categ_id`.

### `Attribute` / `Option`

| | Meaning |
| --- | --- |
| **Odoo** | `product.attribute` — **unlimited** per product; variants are generated from the matrix. |
| **Shopify** | **Option** — hard cap of **3 per product**, on every plan. |

Cheap in an ERP, scarce in Shopify. See `migration-mapping.md`.

### `Customer`

| | Meaning |
| --- | --- |
| **Odoo** | `res.partner` — **one model for everything**: customers, suppliers, companies, contacts, employees. A "customer" is a partner with `customer_rank > 0`. |
| **Shopify** | A **distinct object**, buyers only. |

Filter on `customer_rank`, or suppliers and staff arrive as customers.

### `Product`

| | Meaning |
| --- | --- |
| **Odoo** | `product.template` = the abstract product. `product.product` = a concrete sellable variant. |
| **Shopify** | **Product** = the listing. **Variant** = the sellable thing. |

The concepts align but the naming inverts: **Odoo's `product.product` is Shopify's
Variant**, not Shopify's Product.

### `Order`

| | Meaning |
| --- | --- |
| **Odoo** | `sale.order` — begins life as a **quotation**, moves through confirmation, delivery and invoicing. |
| **Shopify** | Created when **checkout completes** and is already paid. |

An Odoo order may never have been paid. A Shopify order always has been.

### `Page`

| | Meaning |
| --- | --- |
| **Odoo** | `website.page` — a **page-builder** page with drag-and-drop blocks. |
| **Shopify** | A **simple content page**. Layout comes from sections and templates, not from the page record. |

Odoo page content does not survive the move intact; it has to be rebuilt as sections or
simplified to rich text.

### `Website`

Odoo: the **CMS app** (`website` module). Shopify: the **Online Store** sales channel.

---

## Straight mappings

| Concept | Odoo | Shopify |
| --- | --- | --- |
| Browsable grouping | `product.public.category` | Collection |
| Designer / maker | brand | `vendor` *(subject to the licensing question)* |
| Variant | `product.product` | ProductVariant |
| Option value | `product.attribute.value` | Option value |
| Image / file | `ir.attachment`, `image_1920` | File / MediaImage |
| Blog post | `blog.post` | Article |
| Custom data | Studio fields | Metafield / Metaobject |
| Stock on hand | `stock.quant` | InventoryLevel |
| Currency | `res.currency` | Markets |

## No equivalent

| Odoo | Note |
| --- | --- |
| `product.pricelist` | No equivalent below Plus. Markets covers currency and region only; B2B catalogues are Plus. |
| Stock **valuation**, accounting, VAT returns | Not Shopify's job. Stays in Odoo. |
| Helpdesk + knowledge base | No native Shopify equivalent. |
| MRP / made-to-order configurator | No native equivalent. |
| Multi-company | One Shop per store. |

---

## Rules for the connector

1. **Never map by name.** Map by explicit field pairs, written down and reviewed. "Vendor
   → Vendor" is the failure mode this whole document exists to prevent.
2. **Direction is per field**, not per object. Decide who owns each field before syncing.
3. **Join on `odoo.id`**, never on name, SKU or handle. Names change.
4. Anything with **no equivalent** stays in Odoo and is linked to, not rebuilt.
