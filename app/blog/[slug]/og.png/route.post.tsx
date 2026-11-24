import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

// Each post's share image, drawn at build time into /blog/<slug>/og.png in the
// style of app/opengraph-image.tsx. A route with a .png name (rather than the
// opengraph-image file convention) so the file keeps an extension and S3
// serves it as image/png. Named *.post.tsx on purpose: see next.config.ts.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

const ink = "#0d0d0b";
const paper = "#f0ede4";
const muted = "#a39f94";
const accent = "#ff5a1f";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return new Response("Not found", { status: 404 });

  const [display, mono] = await Promise.all([
    font("bricolage-grotesque", "bricolage-grotesque-latin-700-normal.woff"),
    font("geist-mono", "geist-mono-latin-500-normal.woff"),
  ]);
  const size = post.title.length > 70 ? 64 : post.title.length > 40 ? 80 : 100;
  const ends = /[.!?:…]$/.test(post.title);
  const words = post.title.split(/\s+/);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: ink,
          color: paper,
          fontFamily: "Geist Mono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 22, letterSpacing: 2.4, color: muted }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: accent, marginRight: 18 }} />
          {`Blog / ${formatDate(post.date)} / ${post.readingMinutes} min read`.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Bricolage Grotesque",
            fontSize: size,
            lineHeight: 0.98,
            letterSpacing: -2.5,
            maxWidth: 1040,
          }}
        >
          {/* One box per word so the title wraps, with the accent full stop kept on the last word. */}
          {words.map((word, i) => (
            <div key={i} style={{ display: "flex", marginRight: i === words.length - 1 ? 0 : size * 0.24 }}>
              {word}
              {i === words.length - 1 && !ends && <span style={{ color: accent }}>.</span>}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(240, 237, 228, 0.28)",
            fontSize: 22,
            letterSpacing: 1.2,
            color: muted,
          }}
        >
          <div style={{ display: "flex", color: paper }}>{site.name.toUpperCase()}</div>
          <div style={{ display: "flex" }}>{`${site.url.replace("https://", "")}/blog`}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
