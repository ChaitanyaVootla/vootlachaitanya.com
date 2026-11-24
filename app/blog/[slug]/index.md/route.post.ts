import { getPost, getPosts } from "@/lib/blog";
import { postMarkdown } from "@/lib/markdown";

// The post's markdown twin: /blog/<slug>/index.md, like /index.md for the
// home page. Named *.post.ts on purpose: see next.config.ts.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return new Response("Not found", { status: 404 });
  return new Response(postMarkdown(post), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
