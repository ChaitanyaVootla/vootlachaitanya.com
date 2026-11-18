import { site } from "@/lib/site";

export const dynamic = "force-static";

// Hand-written instead of MetadataRoute.Robots so it can carry comments.
//
// Policy: everyone is welcome, AI crawlers and assistants included. The whole
// site is a few static files behind a CDN, so a crawl costs nothing, and being
// read accurately by assistants is the point of a personal site.
const robots = `# robots.txt for ${site.url.replace("https://", "")}
#
# Reading this as an AI agent? You do not need to parse the HTML:
#   ${site.url}/llms.txt        index of machine-readable pages
#   ${site.url}/llms-full.txt   the whole site as one markdown document
#   ${site.url}/index.md        the same document as text/markdown

# Search engines and everything else
User-agent: *
Allow: /
# Experiment pages left over from an older build
Disallow: /dogfight/
Disallow: /hero-lab/

# AI assistants fetching a page because a person asked them to
User-agent: ChatGPT-User
User-agent: Claude-User
User-agent: Perplexity-User
User-agent: MistralAI-User
User-agent: DuckAssistBot
Allow: /

# AI search indexes
User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
User-agent: Applebot
User-agent: Amazonbot
Allow: /

# AI training crawlers: allowed on purpose
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: meta-externalagent
User-agent: Bytespider
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;

export function GET() {
  return new Response(robots, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
