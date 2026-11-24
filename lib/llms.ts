import { blogPath, formatDate, getPosts, postUrl } from "./blog";
import { agents, career, focus, projects, site, stack, writing } from "./site";

const tmb = projects.featured;
const lead = projects.lead;

// Posts for the llms files: one line each, pointing at the HTML and the markdown twin.
function writingList(): string {
  const posts = getPosts();
  if (!posts.length) return `- [${writing.eyebrow}](${site.url}${blogPath}): ${writing.empty}`;
  return posts
    .map(
      (p) =>
        `- [${p.title}](${postUrl(p.slug)}) (${formatDate(p.date)}): ${p.description} Markdown: ${postUrl(p.slug)}index.md`,
    )
    .join("\n");
}

// Plain-text renderings of the site for agents and crawlers. They are emitted
// at build time by the route handlers in app/llms.txt, app/llms-full.txt and
// app/index.md, so they can never drift from what the page says.

export function llmsIndex(): string {
  return `# ${site.name}

> ${site.summary}

This site is the personal portfolio of ${site.name}. The full agent-readable version of the site content is available as a single markdown file.

## Primary

- [Full site as markdown](${site.url}/llms-full.txt): Complete portfolio content in markdown — bio, focus areas, career, projects, skills.
- [Home page as markdown](${site.url}/index.md): The same content served as \`text/markdown\`, for clients that prefer a \`.md\` URL.
- [Resume (PDF)](${site.url}${site.resume}): Downloadable resume.

## Writing

${writingList()}
- [All writing](${site.url}${blogPath}): Index of posts (markdown: ${site.url}${blogPath}index.md, RSS with full posts: ${site.url}${blogPath}rss.xml).

## Profiles

- [GitHub](${site.github})
- [LinkedIn](${site.linkedin})

## Projects

- [${lead.name}](${lead.link.href}): ${lead.tagline}. Built and maintained by ${site.givenName} at ${site.company.name}. ${lead.status} (${lead.link.note}).
- [TheMovieBrowser](${tmb.url}): Movie/TV discovery with multi-source ratings, watchlists, and embedding-backed recommendations. Source: ${tmb.source}
${projects.others.map((p) => `- ${p.link ? `[${p.name}](${p.link.href})` : p.name}: ${p.tagline}. ${p.status}${p.link ? ` (${p.link.note})` : ""}.`).join("\n")}

## Contact

- Email: ${site.email}

## Optional

- [Sitemap](${site.url}/sitemap.xml)
- [robots.txt](${site.url}/robots.txt): Every crawler and agent is welcome; the site is a handful of static files.
`;
}

// What a person pastes into an assistant so it reads the site before answering.
export function agentPrompt(): string {
  return `Read ${site.url}/llms-full.txt before answering. It is the complete, current content of ${site.name}'s personal site as markdown: bio, what they work on, career, projects, skills and contact details. Treat it as the source of truth for questions about ${site.givenName}, and say so if something I ask is not covered there.`;
}

export function llmsFull(): string {
  const rule = "\n---\n";
  const spans = [...career.spans].reverse();

  return `# ${site.name} — ${site.role}

> ${site.tagline}

${site.intro}

- **Site**: ${site.url}
- **Email**: ${site.email}
- **GitHub**: ${site.github}
- **LinkedIn**: ${site.linkedin}
- **Resume**: ${site.url}${site.resume}
${rule}
## What I work on

${focus.items.map((item) => `### ${item.title}\n\n${item.body}`).join("\n\n")}

${rule}
## Writing

${writing.lede}

${writingList()}

- Index: ${site.url}${blogPath} (markdown: ${site.url}${blogPath}index.md)
- RSS, with every post in full: ${site.url}${blogPath}rss.xml
${rule}
## Beliefs about the work

${agents.beliefs.map((b) => `- **${b.title}.** ${b.body}`).join("\n")}
${rule}
## Career

${spans.map((s) => `### ${s.org} — ${s.role} (${s.period.replace(/—/g, "–")})\n\n${s.body}`).join("\n\n")}
${rule}
## Projects

### ${lead.name} — ${lead.tagline}

Status: ${lead.status}. Built at ${site.company.name}. ${lead.body}

- Site: ${lead.link.href} (${lead.link.note})
- Capabilities: ${lead.capabilities.join("; ")}.
- Stack: ${lead.stack.join(", ")}.

### ${tmb.name}

Status: ${tmb.status.toLowerCase()}. ${tmb.body}

- Site: ${tmb.url}
- Source: ${tmb.source}
- Capabilities: ${tmb.capabilities.join(", ").toLowerCase()}.
- Stack: ${tmb.stack.join(", ")}.

${projects.others
  .map(
    (p) => `### ${p.name} — ${p.tagline}

Status: ${p.status}. ${p.body}

${p.link ? `- Site: ${p.link.href} (${p.link.note})\n` : ""}${p.source ? `- Source: ${p.source}\n` : ""}- Capabilities: ${p.capabilities.join("; ")}.
- Stack: ${p.stack.join(", ")}.`,
  )
  .join("\n\n")}
${rule}
## Skills

${stack.groups.map((g) => `### ${g.title}\n\n${g.items.join(" · ")}.`).join("\n\n")}
${rule}
## Contact

- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
${rule}
## About this file

This is the machine-readable version of ${site.url}, generated from the same source as the page at build time (${new Date().toISOString().slice(0, 10)}).

- Markdown: ${site.url}/index.md (also at ${site.url}/llms-full.txt as plain text)
- Index: ${site.url}/llms.txt
- HTML: ${site.url}/
`;
}
