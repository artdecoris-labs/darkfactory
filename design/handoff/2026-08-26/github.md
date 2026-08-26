repo: artdecoris-labs/darkfactory
branch: main

## Last sync

date: 2026-08-20T16:12:35Z

### Updated in this project

- Read the repository tree: only `.gitignore`, `LICENSE` and `README.md` — no imagery or theme source to import yet.
- Storefront imagery is still pending; `assets/download_images.py` fetches the 21 files the design needs.
- Nothing in the project was overwritten from the repository.

## Screen map

| Project screen | Built from |
| --- | --- |
| Home (`ArtDecoris Shopify Storefront.dc.html`) | ArtDecoris design system + live storefront content — no repo source yet |
| Collection | ArtDecoris design system `templates/collection-page` |
| Product (PDP) | ArtDecoris design system + live PDP structure |
| Imagery (`assets/`) | pending: `artdecoris-labs/darkfactory` → `assets/` once pushed |

## Notes

Waiting on the repository to carry `assets/*` (21 storefront photos, names listed in
`assets/IMAGERY.md`). Once they are committed to `main`, they can be copied straight into
this project's `assets/` folder and the published artifact will match the preview.
