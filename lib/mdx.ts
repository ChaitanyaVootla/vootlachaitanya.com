// Compiles a post's MDX at build time. Pages render the result as a server
// component; the RSS feed renders the same tree to an HTML string.

import { evaluate } from "@mdx-js/mdx";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import type { Element, ElementContent, Root } from "hast";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createCssVariablesTheme, createHighlighter, type ShikiTransformer } from "shiki";
import type { Post } from "./blog";

type MDXContent = Awaited<ReturnType<typeof evaluate>>["default"];
export type Heading = { id: string; text: string; depth: 2 | 3 };
export type CompiledPost = { Content: MDXContent; headings: Heading[] };

// Code colours are CSS variables (--code-*), defined next to the other theme
// tokens in app/globals.css, so code follows the light/dark switch with the
// rest of the page and no second set of markup is needed.
const theme = createCssVariablesTheme({ name: "site", variablePrefix: "--code-", fontStyle: true });

const languages = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "sql",
  "bash",
  "shell",
  "python",
  "yaml",
  "diff",
  "md",
  "html",
  "css",
  "toml",
  "dockerfile",
];

let highlighter: ReturnType<typeof createHighlighter> | undefined;
const getHighlighter = () => (highlighter ??= createHighlighter({ themes: [theme], langs: languages }));

// Label each block with its language so the frame can show it.
const languageLabel: ShikiTransformer = {
  name: "site:language-label",
  pre(node) {
    node.properties["data-lang"] = this.options.lang;
  },
};

const text = (node: ElementContent | Root): string =>
  node.type === "text"
    ? node.value
    : "children" in node
      ? (node.children as ElementContent[]).map(text).join("")
      : "";

// Collects the h2/h3 outline (after rehype-slug has given them ids) for the
// table of contents.
function rehypeOutline(headings: Heading[]) {
  return () => (tree: Root) => {
    const walk = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        const depth = child.tagName === "h2" ? 2 : child.tagName === "h3" ? 3 : 0;
        const id = child.properties.id;
        if (depth && typeof id === "string" && id !== "footnote-label") {
          headings.push({ id, text: text(child).trim(), depth: depth as 2 | 3 });
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}

const compiled = new Map<string, Promise<CompiledPost>>();

async function compile(post: Post): Promise<CompiledPost> {
  const shiki = await getHighlighter();
  const headings: Heading[] = [];
  const { default: Content } = await evaluate(post.body, {
    ...(runtime as unknown as Parameters<typeof evaluate>[1]),
    development: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeOutline(headings),
      () =>
        rehypeShikiFromHighlighter(shiki, {
          theme: "site",
          defaultLanguage: "text",
          fallbackLanguage: "text",
          transformers: [languageLabel],
        }),
    ],
  });
  return { Content, headings };
}

// Keyed by the source text, so an edited post is recompiled in `next dev`.
export function compilePost(post: Post): Promise<CompiledPost> {
  const key = `${post.slug}\0${post.body}`;
  let hit = compiled.get(key);
  if (!hit) {
    hit = compile(post).catch((error: unknown) => {
      throw new Error(`content/blog/${post.slug}.mdx could not be compiled: ${String(error)}`, { cause: error });
    });
    compiled.set(key, hit);
  }
  return hit;
}
