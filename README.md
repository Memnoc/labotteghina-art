# La Botteghina

Portfolio site for an Italian digital painter — old-master technique, modern tools.
Built with Astro + TypeScript + React islands. Fully static; deploys to GitHub Pages.

See `CONTEXT.md` for the project's shared language (Work, Wall, Story, Inquiry…).

## Develop

```sh
npm install
node scripts/make-placeholders.mjs   # only until real artwork replaces placeholders
npm run dev                          # http://localhost:4321
npm run build && npm run preview     # production build check
```

## Add a Work

1. Drop the high-res export (JPG/PNG) into `src/content/works/images/`.
2. Create `src/content/works/<slug>.md`:

```md
---
title: "Title of the Painting"
year: 2026
medium: "Digital, Photoshop"
dimensions: "4000 × 6000 px"
cover: ./images/<slug>.jpg
order: 5        # position on the Wall (1 = first)
hero: true      # optional — include in the home-page crossfade
---

The Story — a paragraph in your voice about the work.
```

3. Commit and push. The site rebuilds and deploys automatically.

## Inquiries

The inquiry form posts to [Web3Forms](https://web3forms.com) — free, no backend.
Sign up with the email that should receive inquiries, copy the access key, then:

- **Locally:** put it in `.env` as `PUBLIC_WEB3FORMS_KEY=...`
- **In CI:** add it as a repository secret named `WEB3FORMS_KEY`
  (GitHub repo → Settings → Secrets and variables → Actions).

## Deploy (GitHub Pages)

One-time setup:

1. Create a GitHub repository and push this project to `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Repo → Settings → Secrets and variables → Actions:
   - Secret `WEB3FORMS_KEY` (see above)
   - Variable `SITE_URL` = `https://<user>.github.io`
   - Variable `BASE_PATH` = `/<repo>/`
4. Push — the workflow in `.github/workflows/deploy.yml` builds and publishes.

### Custom domain (later)

1. Buy the domain; in repo Settings → Pages set the custom domain and follow
   GitHub's DNS instructions (CNAME for `www`, A/ALIAS records for apex).
2. Update the variables: `SITE_URL` = `https://yourdomain.tld`, `BASE_PATH` = `/`.
3. Keep "Enforce HTTPS" checked.

## License

Source code: MIT (`LICENSE`). Artwork: **all rights reserved** — see
`LICENSE-ARTWORK.md`. The MIT grant does not extend to any image or Story.
