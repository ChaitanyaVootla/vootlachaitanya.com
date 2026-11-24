import { rssXml } from "@/lib/feed";

// RSS 2.0 with every post in full: /blog/rss.xml
export const dynamic = "force-static";

export async function GET() {
  return new Response(await rssXml(), {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
