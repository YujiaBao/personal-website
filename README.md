# Yujia Bao - Personal Website

[![Deploy Status](https://github.com/yujiabao/yujiabao.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/yujiabao/yujiabao.github.io/actions/workflows/deploy.yml)
[![Security Audit](https://github.com/yujiabao/yujiabao.github.io/actions/workflows/audit.yml/badge.svg)](https://github.com/yujiabao/yujiabao.github.io/actions/workflows/audit.yml)

This is the source code for my personal website, hosted at [www.yujia.io](https://www.yujia.io).

It is built as a modern, static portfolio site using **Next.js** and **Tailwind CSS**.

## 🚀 Technologies

-   **[Next.js 16](https://nextjs.org/)** - React Framework for production.
-   **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for styling.
-   **[TypeScript](https://www.typescriptlang.org/)** - Static type checking.
-   **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React.
-   **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons.

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yujiabao/yujiabao.github.io.git
    cd yujiabao.github.io
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build & Export

This project is configured for **Static HTML Export**.

To build the application for production:

```bash
npm run build
```

This will generate a static version of the site in the `out/` directory.

## 🚀 Deployment

This repository is configured to automatically deploy to **GitHub Pages** via GitHub Actions.

-   The workflow file is located at `.github/workflows/deploy.yml`.
-   Deployment is triggered automatically on pushes to the `main` branch.
-   The build artifact from the `out/` directory is uploaded and deployed to the `gh-pages` environment.

## 📂 Project Structure

-   `app/` - Next.js App Router pages and layouts.
    -   `page.tsx` - The main homepage component.
    -   `layout.tsx` - Root layout definition.
    -   `globals.css` - Global styles and Tailwind directives.
-   `data/` - Static data files for easy content updates.
    -   `profile.ts` - Bio, experience, education, and social links.
    -   `publications.ts` - List of research publications.
-   `public/` - Static assets (images, PDFs, CNAME).
-   `lib/` - Utility functions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).