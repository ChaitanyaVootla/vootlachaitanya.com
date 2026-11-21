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
| `lib/site.ts`              | **All the content.** Bio, career, project, stack, contact. Edit text here.              |
| `app/page.tsx`             | The page itself                                                                        |
| `app/globals.css`          | All styling. Colours for light and dark are the tokens at the top of the file.          |
| `app/layout.tsx`           | Fonts, metadata, structured data, theme bootstrapping                                  |
| `app/opengraph-image.tsx`  | The share image, drawn at build time                                                   |
| `app/llms*.txt/route.ts`   | `llms.txt` and `llms-full.txt`, generated from `lib/site.ts`                           |
| `components/`              | The three interactive bits: theme toggle, copy-email button, live project preview      |
| `public/`                  | Portrait and `Resume.pdf`                                                              |
| `resume/resume.tex`        | Source of the resume. Self-contained LaTeX; `npm run resume` needs Tectonic, or use Overleaf |
| `legacy/`                  | The 2022 version of the site, kept for reference. Not built or deployed.               |

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
