import type { NextConfig } from "next";

// Static export: `next build` writes the whole site to ./out, which is what
// gets synced to S3 (see scripts/deploy.sh). trailingSlash keeps every route
// as <route>/index.html so the CloudFront index rewrite can resolve it.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
