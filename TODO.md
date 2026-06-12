# La Botteghina — Status & Next Steps

_Last updated: 2026-06-12_

## Done

- [x] Design decisions resolved (see `CONTEXT.md` for shared language)
  - Dark gallery mood, flat curated Wall, per-Work pages, inquiry-only selling,
    restrained animation (no 3D), English only, files-in-repo content
- [x] Site built: Astro 6 + TypeScript + React islands
  - Home (hero crossfade + Wall with tilt/glow hover, scroll reveals)
  - Work pages (lightbox zoom, Story with drop cap, Medium line, prev/next,
    pre-filled inquiry form)
  - About, Contact, 404, sitemap, OpenGraph images
- [x] 21 real works processed from `incoming/` (2 duplicate re-exports skipped),
  placeholders removed
- [x] GitHub repo created (`Memnoc/labotteghina-art`), Pages enabled,
  CI deploy working (Node 22 pinned after Astro 6 engine failure)
- [x] **Live:** https://memnoc.github.io/labotteghina-art/

## Blocked on Matteo

- [ ] **Web3Forms key** — inquiry form errors on submit until this exists.
      Sign up at https://web3forms.com with the inbox that should receive
      inquiries → give key to Claude → added as repo secret `WEB3FORMS_KEY`
      + local `.env` → redeploy. ~5 minutes total.
- [ ] **Title / year corrections** — all 21 works carry provisional Italian
      titles and guessed year "2024". Reply with corrections per slug
      (files in `src/content/works/*.md`).
- [ ] **Stories rewrite** — current Stories are Claude's drafts. Rewrite in
      your own voice, or dictate and Claude places them.
- [ ] **About page bio** — current text is a draft of the bottega narrative;
      review/personalize. Portrait or workspace photo optional.

## When domain is purchased

1. Tell Claude the domain name.
2. Repo → Settings → Pages → Custom domain → enter it (GitHub shows the DNS
   records; at the registrar: CNAME `www` → `memnoc.github.io`, A/ALIAS on
   apex per GitHub's docs). Claude can do the repo side via `gh`.
3. Update repo Actions variables: `SITE_URL` = `https://yourdomain.tld`,
   `BASE_PATH` = `/`.
4. Redeploy (any push, or `gh workflow run`).
5. Check "Enforce HTTPS" once the certificate is issued (can take ~1 h).

## Later / nice to have

- More works from ArtStation backlog (drop exports in `incoming/`, map them in
  `scripts/process-incoming.mjs` or just add `.md` + image per README recipe)
- Decide whether fan studies (Frieren, Invisibile) stay on the Wall or move
  to a separate section
- Pricing/prints policy if inquiry volume justifies it
- OG social-card check after custom domain switch
