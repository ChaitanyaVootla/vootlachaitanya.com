import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { getPosts } from "./lib/blog";

// Static export: `next build` writes the whole site to ./out, which is what
// gets synced to S3 (see scripts/deploy.sh). trailingSlash keeps every route
// as <route>/index.html so the CloudFront index rewrite can resolve it.
export default function config(phase: string): NextConfig {
  // Static export refuses a dynamic route whose generateStaticParams returns
  // nothing, so the per-post routes in app/blog/[slug] are named *.post.tsx /
  // *.post.ts and only count as routes while there is a post to build.
  // With zero published posts the blog is just /blog/ and the feed.
  const drafts = phase === PHASE_DEVELOPMENT_SERVER || process.env.BLOG_DRAFTS === "1";
  const hasPosts = getPosts({ drafts }).length > 0;

  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    reactStrictMode: true,
    pageExtensions: hasPosts ? ["tsx", "ts", "post.tsx", "post.ts"] : ["tsx", "ts"],
  };
}
