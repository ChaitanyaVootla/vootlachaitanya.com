# vootlachaitanya.com

Source for [vootlachaitanya.com](https://vootlachaitanya.com) — a one-page personal site.

It is a [Next.js](https://nextjs.org) app that is exported to plain static files. There is no
server: the files sit in an S3 bucket and CloudFront serves them.

## Working on it

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                              |
| `npm run build`     | Static export into `out/`                               |
| `npm run preview`   | Serve `out/` locally, exactly as it will be deployed    |
| `npm run typecheck` | TypeScript check                                        |
| `npm run deploy`    | Upload `out/` to S3 and refresh CloudFront (see below)  |
| `npm run resume`    | Compile `resume/resume.tex` into `public/Resume.pdf`    |

## Where things live

| Path                       | What                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `lib/site.ts`              | **All the content.** Bio, career, Cue, projects, stack, contact, newsletter and analytics settings. Edit text here. |
| `content/blog/`            | **The posts.** One `<slug>.mdx` file each (see "Writing a post")                        |
| `app/page.tsx`             | The home page                                                                          |
| `app/blog/`                | `/blog/` index, post pages, per-post share image and markdown twin, `rss.xml`           |
| `app/globals.css`          | All styling. Colours for light and dark (code colours included) are the tokens at the top. |
| `app/layout.tsx`           | Fonts, metadata, structured data, theme bootstrapping, RSS link, Umami script          |
| `app/opengraph-image.tsx`  | The share image, drawn at build time                                                   |
| `app/llms*.txt/route.ts`   | `llms.txt` and `llms-full.txt`, generated from `lib/site.ts` and the posts             |
| `lib/blog.ts`              | Reads posts and frontmatter, drafts, reading time, sorting                             |
| `lib/mdx.ts`               | Compiles a post: GitHub-flavoured markdown, heading ids, syntax highlighting           |
| `lib/feed.ts`, `lib/markdown.ts` | The RSS feed (full posts) and the plain-markdown twins                           |
| `components/`              | Theme toggle, copy-email button, live project preview, blog pieces, MDX components     |
| `public/`                  | Portrait and `Resume.pdf`                                                              |
| `resume/resume.tex`        | Source of the resume. Self-contained LaTeX; `npm run resume` needs Tectonic, or use Overleaf |
| `legacy/`                  | The 2022 version of the site, kept for reference. Not built or deployed.               |

## Writing a post

Add `content/blog/<slug>.mdx`. The file name is the URL: `content/blog/tool-contracts.mdx` becomes
`/blog/tool-contracts/`. Use lowercase words joined by hyphens.

```mdx
---
title: Tool contracts are the interface
description: One or two sentences. Used for the index, search results, share cards and the feed.
date: 2026-12-01            # ISO date, required
updated: 2026-12-08         # optional; becomes dateModified and the sitemap's lastmod
tags: [agents, harness]     # optional
projects: [Kosh, Pramāṇa]   # optional; project names as in lib/site.ts. Links the post and the project to each other
draft: true                 # optional; leave out (or false) to publish
linkedin: https://www.linkedin.com/feed/update/urn:li:activity:…   # optional; adds "Discuss on LinkedIn"
---

Start with a paragraph. The title is the page's only h1, so headings in the post start at `##`.
```

- **Drafts** (`draft: true`) always show in `npm run dev`, never in a normal build. To build them
  too: `BLOG_DRAFTS=1 npm run build`. Draft pages carry `noindex`.
- **Preview**: `npm run dev` and open `/blog/`. Posts are read on every request, so refresh after an
  edit. If the dev server was started with no posts at all, restart it after adding the first one.
- **What a post can use**: GitHub-flavoured markdown (tables, footnotes, task lists), fenced code with
  a language (` ```ts `, ` ```sql `…; highlighted at build time, colours in `app/globals.css`), and
  three components: `<Callout title="…">` (or `tone="warning"`), `<Figure src alt caption width height />`
  and `<Diagram title="…" caption="…"><svg>…</svg></Diagram>` for inline SVG drawn with
  `currentColor` and `var(--accent)`. Posts with three or more `##` headings get a table of contents.
  Diagrams can move without any script: give a path `className="flow__wire"` for marching dashes, put an
  `<animateMotion>` inside a `<circle className="flow__dot">` for a travelling marker, and wrap each step of a
  sequence in `<g className="flow__step" style={{ "--i": 0 }}>` (up to eight) to light them in turn. All of it
  stops for readers who ask for reduced motion.
  `content/blog/writing-kit.mdx` is a draft that uses every one of them; it is there for checking the design.
- **Where a post shows up**: the newest one is announced at the top of the home page, the newest three
  are listed in its first section, and a post that names `projects` is linked from those project entries.
- **Every post gets**: `/blog/<slug>/` with article metadata and `BlogPosting` JSON-LD, a share image at
  `/blog/<slug>/og.png`, a markdown twin at `/blog/<slug>/index.md`, an entry in `/blog/rss.xml` (in
  full), `sitemap.xml`, `llms.txt` and `llms-full.txt`, and a spot in "Latest writing" on the home page.
- **Subscribe and analytics** are switched on in `lib/site.ts`: set `newsletter.username` (Buttondown)
  to show the email form instead of the RSS link, and `analytics.websiteId` (Umami) to add the script
  to production builds.
- **Sharing**: tag links you post so visits can be told apart, e.g. for LinkedIn
  `https://vootlachaitanya.com/blog/<slug>/?utm_source=linkedin&utm_medium=social&utm_campaign=<slug>`.
  The canonical URL on the page stays untagged.

Why the post routes are named `page.post.tsx`, `route.post.ts`: a static export fails on a dynamic
route that has no pages to build, so `next.config.ts` only treats `*.post.*` files as routes while
there is at least one post to publish. With none, the blog is just the index and the feed.

## Hosting

| Piece        | Value                                                                              |
| ------------ | ---------------------------------------------------------------------------------- |
| S3 bucket    | `vootlachaitanya-com-site` (ap-south-1), private, read by CloudFront through OAC    |
| CloudFront   | `E12N8HOCSGZRTZ` → `vootlachaitanya.com`, `www.vootlachaitanya.com`                 |
| Index pages  | CloudFront function `vootla-rewrite-index` turns `/path/` into `/path/index.html`   |
| Not found    | 403 and 404 from S3 are answered with `/404.html`                                   |

## Deploying

```bash
npm run build
npm run deploy -- --dry-run   # optional: see what would change
npm run deploy
```

`scripts/deploy.sh` uploads `out/` with the right cache headers and then invalidates
CloudFront. It uses whatever AWS credentials are active in the shell (`AWS_PROFILE`, or
`AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`).

By default nothing is deleted from the bucket, so files from older builds stay reachable.
Pass `--prune` to remove everything that is not in the current build:

```bash
npm run deploy -- --prune
```

Pushing to GitHub only runs a build check. To let GitHub deploy on every push to `main`,
add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as repository secrets and set the
repository variable `DEPLOY_ON_PUSH` to `true`.
