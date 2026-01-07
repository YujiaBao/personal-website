# LLM Guidelines & Project Documentation

This document serves as a guide for AI agents and developers working on this repository. It outlines the project structure, technology stack, coding conventions, and common workflows.

## 1. Project Overview
This is a personal portfolio website for **Yujia Bao**. It was migrated from a Jekyll/Ruby-based static site to a modern **Next.js** application.

-   **Primary Goal:** Showcase professional experience, research publications, and projects.
-   **Design Philosophy:** Clean, academic yet modern, fast, and accessible.
-   **Hosting:** GitHub Pages (via static export).

## 2. Technology Stack
-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router).
-   **Language:** TypeScript.
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/).
-   **Animations:** [Framer Motion](https://www.framer.com/motion/).
-   **Icons:** [Lucide React](https://lucide.dev/).
-   **Image Optimization:** `next-image-export-optimizer` (required for static export to GitHub Pages).

## 3. Directory Structure

```
/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (fonts, global styles)
│   ├── page.tsx          # Main homepage (single-page architecture)
│   └── globals.css       # Global Tailwind directives
├── components/           # React components
├── data/                 # Static data content (EDIT HERE to update site)
│   ├── profile.ts        # Bio, social links, experience
│   └── publications.ts   # Research papers list
├── public/               # Static assets
│   ├── assets/           # Images, PDFs, etc.
│   └── nextImageExportOptimizer/ # Generated optimized images (do not commit)
├── lib/                  # Utility functions (e.g., cn())
└── out/                  # Static build output (deployed to GH Pages)
```

## 4. Coding Conventions

### A. Component Architecture
*   **Modularization:** Break down large pages into smaller components in `components/`.
*   **Client vs. Server:** Use `"use client"` only when necessary (e.g., for interactivity, hooks). The root layout should generally remain a Server Component if possible, but `page.tsx` is currently a Client Component due to animations and state.

### B. Styling
*   **Tailwind First:** Use Tailwind utility classes for all styling.
*   **Dark Mode:** Support dark mode using the `dark:` prefix (e.g., `bg-white dark:bg-slate-900`).
*   **Responsive:** Mobile-first approach. Use `md:`, `lg:` prefixes for desktop overrides.

### C. Image Handling
*   **Optimization:** Do **NOT** use the standard `next/image` component directly if it requires a server (which GitHub Pages does not support for optimization).
*   **Tool:** Use `<ExportedImage>` from `next-image-export-optimizer`.
*   **Import:** `import ExportedImage from "next-image-export-optimizer";`
*   **Source:** Place images in `public/` and reference them starting with `/` (e.g., `/assets/img/profile.jpeg`).

### D. Data Management
*   **Separation of Concerns:** Content should be separated from presentation.
*   **Editing:** To update the user's bio, add a job, or add a paper, edit the files in `data/` (`profile.ts`, `publications.ts`). Avoid hardcoding text in components.

## 5. workflows & Commands

### Development
```bash
npm run dev
```

### Build & Deployment
The project uses GitHub Actions for deployment.
1.  **Build:** `npm run build` (Runs `next build` + image optimization).
2.  **Commit:** Push changes to `main`.
3.  **Deploy:** GitHub Actions automatically builds and pushes to `gh-pages`.

### Architecture Recommendations (Future Refactoring)
The current `app/page.tsx` is large. Future tasks should focus on extracting sections into dedicated components:
-   `components/HeroSection.tsx`
-   `components/ExperienceSection.tsx`
-   `components/PublicationsSection.tsx`
-   `components/Navbar.tsx`

## 6. Common Tasks

### Adding a New Publication
1.  Open `data/publications.ts`.
2.  Add a new object to the `publications` array.
3.  Ensure all fields (title, authors, venue, year, etc.) are populated.
4.  If the paper has a TL;DR, add it to the `tldr` field.

### Updating Profile Picture
1.  Place the new image in `public/assets/img/`.
2.  Update the path in `app/page.tsx` (or `profile.ts` if moved there).
3.  Run `npm run build` locally to verify optimization works.
