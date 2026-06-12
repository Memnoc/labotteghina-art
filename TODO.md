# La Botteghina — Status & Next Steps

_Last updated: 2026-06-12_

## Matteo's checklist (do these, in order of value)

1. [ ] **Web3Forms key** (~5 min) — sign up at https://web3forms.com with the
       inbox that should receive inquiries; paste the access key to Claude.
       Until then the inquiry form fails on submit.
2. [ ] **Correct titles & years** — reply to Claude with fixes per slug
       (current values are guesses; table in `src/content/works/*.md`).
3. [ ] **Rewrite Stories in your voice** — or dictate, Claude places them.
4. [ ] **Review About-page bio** — personalize the bottega narrative;
       optional portrait/workspace photo.
5. [ ] **Buy the domain** — then tell Claude the name; switch steps below.

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
- [x] Licenses: MIT for code, all-rights-reserved for artwork
  (`LICENSE`, `LICENSE-ARTWORK.md`; holder Matteo Stara — name confirmed)

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
