import type { MetadataRoute } from "next";
import { blogPath, getPosts, lastModified, postUrl } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const newest = posts.map(lastModified).sort().at(-1);
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}${blogPath}`,
      ...(newest ? { lastModified: newest } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: postUrl(post.slug),
      lastModified: lastModified(post),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
