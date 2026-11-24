// The RSS feed, with every post in full.
//
// React's HTML renderer (react-dom/server) is not available to route
// handlers, which run as React Server Components. Posts are plain server
// components with no state or effects, so the element tree MDX returns is
// walked here directly: function components are called, host elements become
// hast nodes, and hast-util-to-html writes the string.

import type { Element, ElementContent, Properties, Root, RootContent } from "hast";
import { toHtml } from "hast-util-to-html";
import { Fragment, isValidElement, type ReactNode } from "react";
import { feedComponents } from "@/components/mdx";
import { blogPath, getPosts, lastModified, postUrl, type Post } from "./blog";
import { compilePost } from "./mdx";
import { site, writing } from "./site";

type AnyProps = Record<string, unknown> & { children?: ReactNode };

const kebab = (key: string) => (key.startsWith("--") ? key : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));

async function toHast(node: unknown): Promise<RootContent[]> {
  if (node === null || node === undefined || typeof node === "boolean") return [];
  if (typeof node === "string" || typeof node === "number") return [{ type: "text", value: String(node) }];
  if (Array.isArray(node)) return (await Promise.all(node.map(toHast))).flat();
  if (node instanceof Promise) return toHast(await node);
  if (!isValidElement(node)) throw new Error(`The feed renderer cannot handle ${String(node)}`);

  const { type } = node;
  const props = node.props as AnyProps;
  if (type === Fragment) return toHast(props.children);
  if (typeof type === "function") return toHast(await (type as (p: AnyProps) => unknown)(props));
  if (typeof type !== "string") throw new Error("The feed renderer only handles plain components");

  const properties: Properties = {};
  let children = await toHast(props.children);
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || value === null || value === undefined || value === false) continue;
    if (typeof value === "function") continue;
    if (key === "dangerouslySetInnerHTML") {
      children = [{ type: "raw", value: (value as { __html: string }).__html }];
    } else if (key === "className") {
      properties.className = String(value).split(/\s+/).filter(Boolean);
    } else if (key === "style" && typeof value === "object") {
      properties.style = Object.entries(value as Record<string, string | number>)
        .map(([k, v]) => `${kebab(k)}:${v}`)
        .join(";");
    } else {
      properties[key] = value as Properties[string];
    }
  }
  return [{ type: "element", tagName: type, properties, children: children as ElementContent[] }];
}

// Feed readers ignore our stylesheet, so drop what only makes sense with it,
// and make site-relative links absolute.
function tidy(nodes: RootContent[]) {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    const el = node as Element;
    delete el.properties.style;
    delete el.properties.tabIndex;
    for (const key of ["href", "src"] as const) {
      const value = el.properties[key];
      if (typeof value === "string" && value.startsWith("/")) el.properties[key] = `${site.url}${value}`;
    }
    tidy(el.children as RootContent[]);
  }
}

export async function postHtml(post: Post): Promise<string> {
  const { Content } = await compilePost(post);
  const children = await toHast(Content({ components: feedComponents }));
  tidy(children);
  const root: Root = { type: "root", children };
  return toHtml(root, { allowDangerousHtml: true });
}

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
const rfc822 = (iso: string) => new Date(iso).toUTCString();

export async function rssXml(): Promise<string> {
  const posts = getPosts();
  const feedUrl = `${site.url}${blogPath}rss.xml`;
  const items = await Promise.all(
    posts.map(
      async (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <dc:creator>${escapeXml(site.name)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
      <content:encoded>${cdata(await postHtml(post))}</content:encoded>
    </item>`,
    ),
  );
  // Dated by the newest post rather than the build, so rebuilding with no new
  // writing does not look like a change to feed readers.
  const updated = posts.length ? rfc822(posts.map(lastModified).sort().at(-1)!) : undefined;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${site.name} — ${writing.eyebrow}`)}</title>
    <link>${site.url}${blogPath}</link>
    <description>${escapeXml(writing.lede)}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${updated ? `    <lastBuildDate>${updated}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;
}
