# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Yujia Bao — a Next.js 16 static site deployed to GitHub Pages at www.yujia.io.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (next build + next-image-export-optimizer)
npm run lint     # ESLint
```

No test framework is configured. The build itself (`npm run build`) is the primary verification step — it runs static export and image optimization, catching type errors and build issues.

## Architecture

**Single-page app** with anchor-based navigation (`#about`, `#experience`, `#work`, `#publications`). All content lives on one scrollable page.

### Key files

- `app/page.tsx` — Main page component ("use client"). Contains all sections: hero, experience, publications, nav. This is the largest file and the main place UI changes happen.
- `app/layout.tsx` — Root layout (server component). Metadata, fonts (Inter, Open Sans), smooth scroll.
- `app/globals.css` — Tailwind v4 directives + custom utilities (`.container-width`, `.glass-panel`, `.text-gradient`).
- `components/ParticleBackground.tsx` — Canvas-based animated particle system, theme-aware.
- `data/profile.ts` — Bio, experience, education, social links. Edit here to update profile content.
- `data/publications.ts` — Publications array with typed `Publication` interface. Edit here to add papers.
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge).

### Content updates

Site content is separated from presentation. To update the site:
- **Add a publication:** Add an object to the `publications` array in `data/publications.ts` (fields: id, title, authors, venue, year, plus optional arxiv/pdf/code/project/tldr/selected).
- **Update profile/experience:** Edit `data/profile.ts`.
- **Update profile picture:** Place image in `public/assets/img/`, update path reference.

### Important conventions

- **Images:** Use `<ExportedImage>` from `next-image-export-optimizer`, NOT `next/image`. Standard Next.js image optimization requires a server, which GitHub Pages doesn't provide.
- **Styling:** Tailwind-first, mobile-first responsive (`md:`, `lg:` breakpoints), dark mode via `dark:` prefix.
- **Animations:** Framer Motion for interactive animations; CSS keyframes in globals.css for simpler ones.
- **Static export:** `next.config.ts` sets `output: "export"`. Build output goes to `/out/` (not committed). No server-side features (API routes, SSR, ISR) are available.

### Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages. Manual workflow dispatch is also available.
