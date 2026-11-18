import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Rendered once at build time into a static PNG (out/opengraph-image).
export const dynamic = "force-static";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0d0d0b";
const paper = "#f0ede4";
const muted = "#a39f94";
const accent = "#ff5a1f";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export default async function OpengraphImage() {
  const [display, mono, portrait] = await Promise.all([
    font("bricolage-grotesque", "bricolage-grotesque-latin-700-normal.woff"),
    font("geist-mono", "geist-mono-latin-500-normal.woff"),
    readFile(join(process.cwd(), "public", site.portrait.src)),
  ]);
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

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
          {`${site.role} / ${site.company.name}`.toUpperCase()}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage Grotesque",
              fontSize: 158,
              lineHeight: 0.86,
              letterSpacing: -5,
            }}
          >
            <div style={{ display: "flex" }}>{site.givenName}</div>
            <div style={{ display: "flex" }}>
              {site.familyName}
              <span style={{ color: accent }}>.</span>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            width={232}
            height={272}
            alt=""
            style={{ objectFit: "cover", borderRadius: 10, marginBottom: 14 }}
          />
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
          <div style={{ display: "flex" }}>AI AGENTS · CLINICAL TRIALS · FULL-STACK</div>
          <div style={{ display: "flex", color: paper }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
