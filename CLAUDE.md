# Portfolio Website — Architecture Context

## Stack
- **Framework:** Astro 5 (static output, zero JS by default)
- **Language:** TypeScript (strict mode)
- **Package manager:** Bun
- **Hosting:** GitHub Pages via GitHub Actions (`withastro/action`)
- **Sitemap:** `@astrojs/sitemap` integration

## Architecture Patterns

### Content Layer (Astro Content Collections)
- Markdown collections with Zod-validated frontmatter for `projects` and `experience`
- JSON collections via `file()` loader for `skills` and `social`
- Static JSON import for site-wide config (`site.json`)
- Schema definitions in `src/content.config.ts`

### Component Architecture
- **Layout pattern:** `BaseLayout` wraps all pages with `BaseHead` (meta/SEO), `Header`, `Footer`
- **Section pattern:** Generic `Section` component wraps each page section with consistent `id`, heading, and spacing
- **Data-fetching boundary:** Only container components (`ProjectGrid`, `ExperienceTimeline`, `SkillGroup`) call `getCollection()`. Leaf components (`ProjectCard`, `TimelineItem`) receive typed props only
- **Slot composition:** `TimelineItem` uses `<slot />` for rendered markdown body content

### Styling Pattern
- CSS custom properties in `:root` for all theming (colors, fonts, spacing)
- Component-scoped `<style>` blocks using BEM naming
- `:global()` selector for styling rendered markdown content inside scoped components
- Mobile-first responsive design via media queries on custom properties
- `clamp()` for fluid typography

### Security
- CSP via `<meta http-equiv>` in `BaseHead` (GitHub Pages limitation — no server headers)
- `.gitignore` covers `.env`, `.env.*`, `*.local`
- External links use `rel="noopener noreferrer"`
- Form action restricted to `https:` in CSP

### SEO
- Open Graph + Twitter Card meta in `BaseHead`
- JSON-LD Person schema structured data
- Canonical URLs via `Astro.site` + `Astro.url.pathname`
- Auto-generated sitemap via `@astrojs/sitemap`
- `robots.txt` in `public/`

### Accessibility
- Skip-to-content link in `BaseLayout`
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<time>`, `<footer>`)
- `aria-label` on navigation, social links, tech stack lists
- `aria-expanded` + `aria-controls` on mobile menu toggle
- `.sr-only` / `.focus:not-sr-only` utility classes
- `:focus-visible` outline on all interactive elements

## Commands
- `bun run dev` — Start dev server
- `bun run build` — Type-check + build static site
- `bun run preview` — Preview built site locally
- `bun run check` — Run Astro type checker only

## Adding Content
- **New project:** Create `.md` in `src/content/projects/` with frontmatter: `title`, `description`, `techStack[]`, `liveUrl?`, `repoUrl?`, `featured`, `sortOrder`
- **New experience:** Create `.md` in `src/content/experience/` with frontmatter: `role`, `company`, `companyUrl?`, `startDate`, `endDate?`, `location?`, `type?`
- **Skills:** Edit `src/data/skills.json` — array of `{ id, category, items[] }`
- **Social links:** Edit `src/data/social.json` — array of `{ id, platform, url, icon }`
- **Site config:** Edit `src/data/site.json` — `name`, `title`, `tagline`, `email`, `siteUrl`
