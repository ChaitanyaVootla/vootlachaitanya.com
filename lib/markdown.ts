// Plain-markdown twins of the posts (/blog/<slug>/index.md) and of the blog
// index (/blog/index.md), for agents and anyone who wants the text alone.
//
// The MDX source is parsed and written back out as ordinary markdown. The
// few components a post can use are turned into their nearest markdown
// equivalent; inline SVG drawings cannot be, so they are named instead.

import type { BlockContent, Parent, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { blogPath, formatDate, getPosts, postUrl, type Post } from "./blog";
import { site, writing } from "./site";

type Jsx = MdxJsxFlowElement | MdxJsxTextElement;

function attr(node: Jsx, name: string): string | undefined {
  const found = node.attributes.find((a): a is MdxJsxAttribute => a.type === "mdxJsxAttribute" && a.name === name);
  if (!found || found.value === null || found.value === undefined) return undefined;
  return typeof found.value === "string" ? found.value : found.value.value;
}

const absolute = (url: string) => (url.startsWith("/") ? `${site.url}${url}` : url);

const italic = (value: string): RootContent => ({
  type: "paragraph",
  children: [{ type: "emphasis", children: [{ type: "text", value }] }],
});

// What a JSX element in the post becomes in plain markdown.
function replace(node: Jsx): RootContent[] {
  switch (node.name) {
    case "Callout": {
      const label = attr(node, "title") ?? (attr(node, "tone") === "warning" ? "Careful" : "Note");
      return [
        {
          type: "blockquote",
          children: [
            { type: "paragraph", children: [{ type: "strong", children: [{ type: "text", value: label }] }] },
            ...(node.children as BlockContent[]),
          ],
        },
      ];
    }
    case "Figure": {
      const src = attr(node, "src");
      const caption = attr(node, "caption");
      const out: RootContent[] = src
        ? [{ type: "paragraph", children: [{ type: "image", url: absolute(src), alt: attr(node, "alt") ?? "" }] }]
        : (node.children as RootContent[]);
      return caption ? [...out, italic(caption)] : out;
    }
    case "Diagram": {
      const title = attr(node, "title");
      const caption = attr(node, "caption");
      const parts = [title ? `Diagram: ${title}` : "Diagram", caption].filter(Boolean) as string[];
      const described = parts.map((part) => part.replace(/[.\s]+$/, "")).join(". ");
      return [italic(`${described}. (The drawing is in the HTML version.)`)];
    }
    default:
      // Lowercase tags (raw HTML or SVG) have no markdown form; other
      // components keep their text content.
      if (!node.name || /^[a-z]/.test(node.name)) return [];
      return node.children as RootContent[];
  }
}

function transform(parent: Parent) {
  const next: RootContent[] = [];
  for (const child of parent.children as RootContent[]) {
    if (child.type === "mdxjsEsm" || child.type === "mdxFlowExpression" || child.type === "mdxTextExpression") continue;
    if (child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement") {
      const replaced = replace(child);
      const holder = { type: "root", children: replaced } as Root;
      transform(holder);
      next.push(...holder.children);
      continue;
    }
    if (child.type === "link" || child.type === "image" || child.type === "definition") child.url = absolute(child.url);
    if ("children" in child) transform(child as Parent);
    next.push(child);
  }
  (parent as Root).children = next;
}

// Read with MDX syntax, write back without it.
const reader = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
const writer = unified()
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", emphasis: "_", fences: true, rule: "-", listItemIndent: "one" });

function bodyMarkdown(post: Post): string {
  const tree = reader.parse(post.body);
  transform(tree);
  return writer.stringify(tree);
}

export function postMarkdown(post: Post): string {
  const meta = [
    `- Author: ${site.name} (${site.url})`,
    `- Published: ${formatDate(post.date)}${post.updated ? ` · Updated: ${formatDate(post.updated)}` : ""}`,
    `- Reading time: about ${post.readingMinutes} min`,
    post.tags.length ? `- Tags: ${post.tags.join(", ")}` : "",
    `- Canonical: ${postUrl(post.slug)}`,
    post.linkedin ? `- Discussion: ${post.linkedin}` : "",
  ].filter(Boolean);

  return `# ${post.title}

> ${post.description}

${meta.join("\n")}

---

${bodyMarkdown(post).trim()}

---

More writing: ${site.url}${blogPath} · RSS: ${site.url}${blogPath}rss.xml
`;
}

export function blogIndexMarkdown(): string {
  const posts = getPosts();
  const list = posts.length
    ? posts
        .map(
          (p) =>
            `- [${p.title}](${postUrl(p.slug)}) (${formatDate(p.date)}, ${p.readingMinutes} min): ${p.description} Markdown: ${postUrl(p.slug)}index.md`,
        )
        .join("\n")
    : `_${writing.empty}_`;

  return `# ${writing.eyebrow} — ${site.name}

> ${writing.lede}

${list}

- RSS: ${site.url}${blogPath}rss.xml
- Home: ${site.url}/ (markdown: ${site.url}/index.md)
`;
}
