# Odoo → Shopify field mapping

The contract between the two halves of the ETL. Written **before** the extractor so the
staging schema has something to encode.

> **Status: partly verified.** The instance was probed on 2026-08-26; the environment
> facts below are confirmed. Individual **field names are still unverified** — confirm
> each against the live database during the Phase 2 reconnaissance run.

## The source instance

| | |
| --- | --- |
| Storefront | <https://www.artdecoris.com> |
| Odoo version | **18.0+e — Enterprise** (confirmed via `/web/webclient/version_info`) |
| Hosting | **Odoo.sh** (confirmed via `Server:` response header) |
| Database name | in `secrets/odoo.local.env` — not committed |
| XML-RPC | `/xmlrpc/2/common` and `/xmlrpc/2/object` both confirmed reachable |

## Access

XML-RPC. `ODOO_URL`, `ODOO_DB`, `ODOO_USER`, `ODOO_API_KEY` from
`secrets/odoo.local.env` (gitignored).

```
/xmlrpc/2/common  → authenticate
/xmlrpc/2/object  → execute_kw(db, uid, key, model, 'search_read', [domain], {fields, offset, limit})
```

**Authentication is by API key, not password.** Odoo 14+ requires a key when two-factor
auth is on, and Odoo.sh instances normally have it enabled. Generate one at
**Settings → Users → *your user* → Account Security → New API Key**. The key is shown
once. It carries that user's full permissions, so use an account with read access to
Sales, Inventory, Contacts and Website — read-only is sufficient for extraction.

Always page. Never `search_read` an entire model in one call. Odoo.sh enforces per-worker
request timeouts, so keep batches small (500–1000 records) and expect to resume.

## Catalog

### `product.public.category` → Shopify custom collection

> **Use `product.public.category`, not `product.category`.** These are different models
> and mixing them up is the classic Odoo→Shopify mistake. `product.category` is the
> *internal* accounting/inventory category. `product.public.category` is the **eCommerce
> category** — what shoppers actually browse on the website, and what should become
> Shopify collections. Extract both; map the public one.

| Odoo | Shopify | Notes |
| --- | --- | --- |
| `id` | metafield `odoo.id` | Idempotency key |
| `name` | `title` | |
| `parent_id` | — | **Shopify collections are flat.** Nesting must become tags, filters, or a menu structure. Decide in `transform/category-to-collection.yaml`. |
| `sequence` | — | Preserves the merchandising order Odoo shows |
| `website_meta_title` / `website_meta_description` | `seo` | |

Products link to these via `product.template.public_categ_ids` (many2many), **not**
`categ_id`.

### `product.template` → Shopify product

| Odoo | Shopify | Notes |
| --- | --- | --- |
| `id` | metafield `odoo.id` | Idempotency key |
| `name` | `title` | |
| `description_sale` / `website_description` | `descriptionHtml` | Sanitize. Odoo website descriptions carry theme-specific markup that will not survive. |
| `default_code` | variant `sku` | On single-variant products |
| `list_price` | variant `price` | Confirm tax-inclusive vs exclusive |
| `standard_price` | `inventoryItem.cost` | |
| `weight` | variant `weight` | Odoo is kg by default — confirm |
| `barcode` | variant `barcode` | |
| `public_categ_ids` | collection membership | eCommerce categories (many2many). `categ_id` is the internal accounting category — keep it as a metafield at most. |
| `active` | `status` | `false` → `ARCHIVED` |
| `is_published` | `status` | `false` → `DRAFT` |
| `attribute_line_ids` | `productOptions` | See variant limits below |

### `product.product` → Shopify variant

| Odoo | Shopify |
| --- | --- |
| `id` | metafield `odoo.id` |
| `default_code` | `sku` |
| `product_template_attribute_value_ids` | `optionValues` |
| `lst_price` | `price` |
| `qty_available` | inventory quantity |

### Images

`ir.attachment` (`res_model = 'product.template'` / `'product.product'`), plus the
base64 `image_1920` field. Download to `staging/media/`, content-hash the filenames,
then `stagedUploadsCreate` → `fileCreate` → attach.

### ⚠ Variant ceiling

Shopify allows **3 options** per product. The variant limit was raised to **2048 for all
merchants in October 2025**, so variants are rarely the binding constraint - options are.

Every Art Decoris product observed uses exactly three: **Size + Designer + a category
option** (Beanbag Option, Cushion Option). That is the ceiling, catalogue-wide, with zero
headroom.

**Designer is not really a product option** - it does not vary within a product, it
attributes it. Moving it to `vendor` frees the third slot across the whole catalogue and
fixes the artist model at the same time.

> **There is no escape hatch below Shopify Plus.** Combined Listings — the official way
> to exceed three options — is **Plus/enterprise only** (and needs a theme at v15.0.0+).
> Below Plus the alternatives all give something up:
>
> | Approach | Inventory | Filtering | Price varies |
> | --- | --- | --- | --- |
> | Third-party option app | depends on app | often breaks | depends |
> | Product/variant metafield | none | yes, via Search & Discovery | no |
> | Line-item properties | none | no | no |
>
> So freeing the Designer slot is not housekeeping — it is what keeps a fourth option
> possible at all without a plan upgrade.

## Artists — the gap the design assumes

The design handoff has artist cards, artist portraits and an Artists mega-menu, but
there is no "artist" concept in Shopify and none in this mapping until now. On the live
Odoo site the concept is real but **split across two models**:

| What | Where it lives in Odoo | Evidence |
| --- | --- | --- |
| Artist's works | **brand** records (Theme Prime brands feature) | `/shop/all-brands`, `/shop/anne-mondy` |
| Artist's story + portrait | **`website.page`** CMS pages | `/anne-mondy`, `/brass`, `/juan-de-lascurain` |

Known artists: Anne Mondy, B.R.A.S.S., Juan de Lascurain. Confirm the full list against
the brand model during reconnaissance — only Anne Mondy currently has a `/shop/` brand
page in the sitemap, so the two sets may not line up.

### Target model in Shopify

Shopify has no native artist object. The right home is a **metaobject**, with a
collection for browsing and a product metafield for the link:

1. **Metaobject definition `artist`** — this is where the photo and story live.

   | Field | Type |
   | --- | --- |
   | `name` | single_line_text |
   | `portrait` | file_reference |
   | `bio` | rich_text |
   | `statement` | rich_text (optional) |
   | `odoo_page_id` / `odoo_brand_id` | single_line_text — idempotency |

   Give the definition the **online store** capability so each entry gets a real URL for
   the story page.

2. **Collection per artist** — `/collections/anne-mondy`, holding that artist's works.
   This is what `/shop/<artist>` redirects to.

3. **Product metafield `custom.artist`** — a metaobject reference pointing at the
   artist. This is what lets a product page show "by Anne Mondy" and drives the artist
   cards.

### Joining products to artists

**Never join on the display name.** Odoo publishes the same brand under more than one
spelling — `BRASS` and `B.R.A.S.S.` both appear, and the brands page renders one of them
with a zero-width no-break space (U+FEFF). A product carrying `BRASS` and an artist
called `B.R.A.S.S.` look identical to a human and never match in code.

The artist metaobject therefore has an explicit **`vendor`** field holding the exact
Shopify vendor string. That is the join key:

```
Odoo Designer attribute
   → transform/vendor-normalisation.yaml
      → Shopify product.vendor  ══ artist.vendor  → artist metaobject
```

The map and its normalisation steps live in `transform/vendor-normalisation.yaml`.
The evaluation gate must fail on an unmapped Odoo value, or a vendor with no matching
artist — both are silent in production otherwise.

**Not every product has a designer.** *Iridescent Monolith* has no product attributes at
all. `vendor` cannot be assumed populated; the fallback is a business decision, not a
technical one.

### Extraction

Add to the extractor: the brand model (confirm its technical name — likely
`product.brand`) and `website.page` filtered to the artist slugs. Portraits come from
the CMS page images, **not** from the resized `/web/image/` derivatives already pulled
into the design system.

### Redirects

| Odoo | Shopify |
| --- | --- |
| `/<artist-slug>` | artist metaobject story URL |
| `/shop/<artist-slug>` | `/collections/<artist-handle>` |
| `/shop/all-brands` | an artists index page |

## Customers

`res.partner` where `customer_rank > 0` → Shopify customer.

| Odoo | Shopify |
| --- | --- |
| `id` | metafield `odoo.id` |
| `email` | `email` (required, must be unique) |
| `name` | split into `firstName` / `lastName` |
| `phone` / `mobile` | `phone` (E.164) |
| address fields | `addresses[]` |

**Passwords cannot migrate.** Customers must reset. This needs a comms plan before
cutover and has GDPR implications — do not silently skip it. Suppress Shopify's account
invite emails during the load unless the comms plan says otherwise.

## Orders

`sale.order` (state `sale` / `done`) + `sale.order.line`.

Historical orders import with limited editability and cannot be re-processed for
payment. They are for customer-account continuity and reporting, not operations. Map
`odoo.id`, order number, dates, line items, totals, and the customer link.

## Languages — the multiplier nobody costed

The storefront is **trilingual**, and this was not in the original scope. It multiplies
the extract: every translatable field arrives three times, not once.

Confirmed on the live site — all three return 200 and carry genuinely different copy,
so this is a **migration**, not a translation job:

| Locale | Odoo URL | Shopify |
| --- | --- | --- |
| **nl** | `/nl/<slug>` | **primary** — lives in the resource's own fields |
| en | `/<slug>` | registered translation |
| fr | `/fr/<slug>` | registered translation |

> **Dutch is the Shopify primary locale**, but `artdecoris.com` serves **English** by
> default. Extracting "the" value without specifying a language therefore yields English
> and quietly puts it in the Dutch slot. This already happened once with the artist
> entries and had to be corrected.

### Extracting per language

Pass the language in the XML-RPC **context**. Each call returns that language's values:

```python
models.execute_kw(db, uid, key, 'product.template', 'search_read',
                  [domain], {'fields': fields, 'context': {'lang': 'nl_BE'}})
```

So the extract loops **models × languages**. Confirm the exact installed codes from
`res.lang` during reconnaissance — `nl_BE` vs `nl_NL`, `en_GB` vs `en_US`,
`fr_BE` vs `fr_FR` all differ and guessing produces silent fallbacks to the default
language rather than errors.

*(Background, to verify: Odoo 16 moved field translations from the `ir.translation`
model into JSONB columns on the record. The context approach above works either way, so
nothing depends on this.)*

### Loading into Shopify

Primary-locale values go into the resource's own fields. Everything else is registered:

1. `shopLocaleEnable` for each additional locale.
2. For each resource, read `translatableResource.translatableContent` — this returns a
   **`digest`** per field.
3. `translationsRegister` with that digest alongside the translated value.

**The digest is the part that bites.** Shopify uses it to detect a translation written
against a source value that has since changed. Register with a stale digest and the
translation is rejected or flagged outdated — so the digest must be read *at load time*,
not cached from an earlier run.

### What is translatable

Products (title, description, handle, SEO), collections, pages, articles, **metaobjects**
(the artist definition already has the `translatable` capability), theme content and
section settings, and shop policies.

### Structure differs per language at source

Odoo's Dutch and French pages merge paragraphs that the English one splits — Anne Mondy
is 3 paragraphs in English and 2 in Dutch, with more characters. **Do not treat unequal
paragraph counts as truncation.** Each language keeps its own structure; the evaluation
gate should compare character counts, not paragraph counts.

### Consequences for the rest of the pipeline

- **Staging schema.** Translatable fields need a per-locale shape, not a single string.
  Decide this in `contracts/staging.schema.json` before writing the extractor — retrofitting
  it means rewriting both halves.
- **Redirects triple.** `/nl/<slug>` and `/fr/<slug>` both need targets, and Shopify
  localises URLs with a locale prefix on the primary domain.
- **Evaluation gate.** Add a check for missing translations per locale — a product with no
  French title is a silent gap that surfaces as an English word on a French page.

## Redirects and SEO

Every old Odoo URL needs a 301. Generated into `transform/redirects.yaml`, loaded with
`urlRedirectCreate`.

| Odoo pattern | Shopify pattern |
| --- | --- |
| `/shop/product/<slug>-<id>` | `/products/<handle>` |
| `/shop/category/<slug>-<id>` | `/collections/<handle>` |
| CMS pages (`website.page`) | `/pages/<handle>` |

Handles must be stable — generate once, record in staging, and never regenerate on a
re-run or every redirect breaks.

## Open questions

1. ~~Odoo version~~ — confirmed 18.0 Enterprise on Odoo.sh. The website/eCommerce module
   is clearly in use (the storefront is live).
2. Tax configuration — are `list_price` values tax-inclusive? Belgium/EU VAT applies.
3. Multi-currency? Multi-warehouse?
3a. ~~Languages?~~ — confirmed **nl / en / fr**, all live on the Odoo site. Confirm the
   exact `res.lang` codes during reconnaissance.
4. Approximate record counts per model (drives paging and runtime estimates).
5. ~~Variant ceiling?~~ - confirmed: every product sampled uses exactly 3 options
   (Size, Designer, category option). At the limit, no headroom. Confirm the store's own
   figures with `shop { resourceLimits { maxProductOptions maxProductVariants } }`.
6. ~~Are there Odoo CMS pages?~~ — yes. Beyond the artist pages: `/about-us`,
   `/custom-art`, `/faq`, `/terms`, `/contactus`, plus a `/blog` with 2 posts and an
   Odoo `/helpdesk` knowledge base. Decide which become Shopify pages, which become
   blog articles, and which are dropped.
7. Confirm the technical name of the brand model backing `/shop/all-brands`.
