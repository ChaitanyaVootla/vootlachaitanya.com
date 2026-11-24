import { blogIndexMarkdown } from "@/lib/markdown";

// The blog index as markdown: /blog/index.md
export const dynamic = "force-static";

export function GET() {
  return new Response(blogIndexMarkdown(), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
