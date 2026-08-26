---
name: theme-release
description: Promote theme work from stage to main (the published live theme). Use when asked to release, publish, ship, or merge theme changes to production.
---

# Theme release: stage → main

`main` is the **release branch**. Treat every promotion as a production deploy.

> **As of 2026-08-26 the `main` theme is still unpublished.** The live storefront runs a
> separate *Horizon* theme not connected to this repo, so merging to `main` currently
> updates an unpublished theme and reaches no customers. That changes the moment someone
> publishes the `main` theme at launch — do not let this note make you casual about
> merges. Re-check with `shopify theme list` (look for the `[live]` marker) before
> assuming either way.

Publishing is always an explicit, separate action — never a side effect.

## Before promoting

1. Working tree clean, on `stage`, up to date:
   ```powershell
   git -C C:\DevOps\artdecoris-shop-theme-00 switch stage
   git -C C:\DevOps\artdecoris-shop-theme-00 pull
   git status --short          # must be empty
   ```
2. Validation passes:
   ```powershell
   shopify theme check --fail-level error
   ```
3. Previewed and reviewed by a human:
   ```powershell
   shopify theme dev -e stage
   ```
   Check desktop **and** mobile widths, and both colour schemes.
4. Review what is actually going out:
   ```powershell
   git diff --stat main stage
   ```
   Anything surprising in `config/settings_data.json` usually means someone edited the
   theme in Shopify admin. Resolve that before promoting.

## Promoting

Always by pull request — never a direct push to `main`.

```powershell
git push origin stage
# open a PR: stage -> main, review the diff, merge
```

Shopify's GitHub integration syncs the merged `main` to its connected theme. Whether
that theme is the live one depends on what is published — check `shopify theme list`.

## After promoting

- Load the live storefront and confirm the header, a collection page, a product page,
  and cart all render.
- If something is wrong, revert the merge commit and let the integration sync back.
  Do not hand-edit the live theme in admin.

## Never

- Push directly to `main`.
- Run `shopify theme push` against the live theme.
- Publish a theme from the CLI or an MCP tool without the user explicitly asking.
