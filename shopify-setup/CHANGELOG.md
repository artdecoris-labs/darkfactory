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

## Template for new entries

```markdown
## YYYY-MM-DD — <what changed, in one line>

| # | Change | Mutation | Reversal |
| --- | --- | --- | --- |
| 1 | | | |
```
