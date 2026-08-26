---
name: theme-release
description: The Art Decoris theme release flow - five gates from local edit to live storefront. Use when changing the theme, validating it, promoting stage to main, or going live.
---

# Theme release flow

Five gates. Each one has to pass before the next. Nothing skips ahead.

```
  local edit ──▶ ① local validate ──▶ ② push stage ──▶ ③ admin validate ──▶ ④ PR to main ──▶ ⑤ go live
   (stage)        theme check           auto-syncs        preview stage        review diff      publish
                  + theme dev           to stage theme    theme in admin                        main theme
```

## Theme ↔ branch map

| Branch | Shopify theme | Published? |
| --- | --- | --- |
| `stage` | `artdecoris-shop-theme-00/stage` | No |
| `main` | `artdecoris-shop-theme-00/main` | **No — not yet** |
| *(none)* | `Horizon` | **Yes — this is the live storefront** |

The live storefront runs a standalone *Horizon* theme that is **not connected to this
repo**. Until go-live it stays that way, and `main` is previewed only. IDs are in the
gitignored `shopify.theme.toml`. Re-check with `shopify theme list` — look for `[live]`.

---

## ① Edit and validate locally — on `stage`

```powershell
git -C C:\DevOps\artdecoris-shop-theme-00 switch stage
git -C C:\DevOps\artdecoris-shop-theme-00 pull      # see the two-way sync warning below
shopify theme check --fail-level error              # automated gate — must pass
shopify theme dev                                   # http://127.0.0.1:9292
```

`shopify theme dev` serves your **local working copy** through a throwaway *Development*
theme. It does not touch `stage`, `main`, or the live theme. This is the fast loop —
hot reload, uncommitted edits visible immediately.

**Gate:** theme check clean, and the change reviewed by a human at desktop *and* mobile
widths, in both colour schemes.

## ② Push to `stage`

```powershell
git add -A && git commit && git push origin stage
```

The GitHub integration syncs the branch to the `stage` theme automatically, usually
within a minute.

## ③ Validate in the admin

**Online Store → Themes → `artdecoris-shop-theme-00/stage` → Preview.**

This is the first time the change is rendered by Shopify's real infrastructure rather
than the local proxy — CDN, real product data, real money formatting.

> ### ⚠ Look, do not edit
>
> **The GitHub integration is two-way.** Anything you change in the theme editor is
> committed straight back to the connected branch by the Shopify bot, and edits within
> ~10 seconds are batched into one commit. That means:
>
> - Editing the `stage` theme in admin **writes commits to `stage`** — your local clone
>   is now behind. Always `git pull` before resuming local work.
> - Editing the `main` theme in admin **writes commits to `main`, bypassing the PR
>   gate entirely.** Never customize the `main` theme in admin.
>
> If you do edit in admin deliberately, pull immediately afterwards so local and remote
> agree. `Reset to last commit` in admin discards admin-side changes if you'd rather.

**Gate:** renders correctly on real data, and `git status` locally is still clean after
a `git pull`.

## ④ PR `stage` → `main`

Always by pull request. Never push directly to `main`.

Review the diff properly — in particular `config/settings_data.json`, which is where
theme-editor changes land if anyone edited in admin. A surprise there means step ③ was
not read-only.

```powershell
git diff --stat main stage
```

Merging syncs the `main` theme. **This still reaches no customers** while `main` is
unpublished — preview it from admin the same way as `stage`.

**Gate:** diff contains only intended changes; `main` theme previews correctly.

## ⑤ Go live — one time, deliberate

Only when confident:

**Online Store → Themes → `artdecoris-shop-theme-00/main` → Publish.**

- **Keep the old `Horizon` theme.** Do not delete it. It is the instant rollback: if
  something breaks, republish it and the storefront reverts in seconds, then fix forward
  on `stage`.
- After this, `main` **is** the live storefront, and the caution in step ③ about the
  `main` theme becomes critical rather than merely tidy.
- Update the table at the top of this skill so it stops saying `main` is unpublished.

---

## Never

- Push directly to `main`.
- Run `shopify theme push` or `shopify theme publish` against a connected theme.
- Publish anything without the user explicitly asking.
- Customize the `main` theme in the admin theme editor.
