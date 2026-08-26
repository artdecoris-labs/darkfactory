# Theme experiments and A/B testing

One store, many themes. That constraint is fine — Shopify's model is built for it, and the
GitHub integration connects **one branch per theme**, so a feature branch *is* a theme
variant.

---

## The blunt constraint first

**You cannot A/B test without traffic, and the store is behind a password page.** Until
launch, "A/B testing" means **side-by-side comparison and human judgement**, not a
statistical test. That is still worth doing — it is just not a test, and calling it one
invites false confidence from a handful of internal clicks.

| | Before launch | After launch |
| --- | --- | --- |
| Mechanism | Branch → theme → preview link | Native rollouts, % traffic split |
| Decides by | Review and judgement | Measured conversion |
| Plan needed | Any | **Grow or higher** |

Shopify's native A/B testing lives in **Markets → rollouts**: replace the theme for a
percentage of visitors and compare. Overlapping rollouts divide traffic proportionally,
so run one theme experiment at a time unless you want to reason about interaction effects.

---

## Running a variant

```powershell
# 1. Branch from stage
git -C C:\DevOps\artdecoris-shop-theme-00 switch stage
git -C C:\DevOps\artdecoris-shop-theme-00 pull
git switch -c exp/artist-card-portrait
git push -u origin exp/artist-card-portrait
```

2. **Connect it.** Online Store → Themes → Add theme → Connect from GitHub → pick the
   `exp/…` branch. It arrives unpublished with its own preview URL.
3. **Compare.** Preview the variant against `stage` side by side. Same browser, same
   widths, same products.
4. **Decide, then clean up.** Winner merges into `stage` through the normal gates. Loser:
   delete the branch **and the theme**.

### Naming

Branch `exp/<what-changes>`, and give the Shopify theme the same name. When six themes are
sitting in admin, `exp/artist-card-portrait` tells you what it was; `stage-copy-2` does not.

---

## Hygiene that stops this getting messy

- **Themes are a limited resource** — around 20 per store. Dead experiment themes are the
  usual reason people hit that. Delete the theme when you delete the branch.
- **The GitHub sync is two-way.** Editing an experiment theme in the admin editor commits
  back to its `exp/` branch. That is often exactly what you want for a quick visual
  tweak — just `git pull` before touching it locally again.
- **Change one thing.** A variant that alters the artist card *and* the palette cannot
  tell you which one mattered.
- **Never publish an experiment theme.** Publishing is a launch action, not a test action.
- **Rebase or re-merge `stage` into long-lived variants**, or you end up comparing your
  change against a stale baseline rather than against current `stage`.

---

## Worth experimenting on

Ranked by how much the design leaves genuinely open:

1. **Artist card treatment** — portrait crop and whether the story link sits on the card or
   the name. The design shows one option; the content model supports several.
2. **Category tile aspect** — the tokens ask for 3:4 portrait, but the real imagery is
   square today. Test the crop before re-shooting.
3. **PDP gallery layout** — stacked versus thumbnail rail, on real product photography.
4. **Where Designer appears** on the product page once it moves from option to `vendor` —
   as a byline, a link to the collection, or a card.

## Not worth experimenting on

Palette, type scale and radii come from the design system. Those are brand decisions
already made; re-testing them turns a design system into an opinion poll.
