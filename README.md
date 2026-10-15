# smugiwara.com

Personal portfolio of Sarat Angajala (mugiwaraa.eth), built with a claymorphism design language.

**Stack:** Next.js (App Router, static export) · Tailwind CSS v4 · Framer Motion

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in ./out
pnpm start      # serve ./out locally
```

## Editing content

All copy (bio, jobs, projects, stack, links) lives in `src/lib/content.ts`.
Set `profile.email` there to show an email button in the contact section.

## Design system

Clay tokens live in `src/app/globals.css`: surfaces, shadows (`shadow-raised`, `shadow-pressed`, `shadow-accent`)
and the accent palette. The theme (light/dark) and accent (coral/graphite/pacific) are swapped through
`data-theme` / `data-accent` on `<html>` and persisted in localStorage.

## Deploy

`pnpm build` emits a fully static site in `out/`, so it can be hosted on any static host (GitHub Pages,
Cloudflare Pages, Netlify, Vercel). `public/CNAME` is already set to `smugiwara.com` for GitHub Pages.
