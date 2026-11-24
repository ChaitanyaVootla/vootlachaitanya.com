// Posts are MDX files in content/blog/<slug>.mdx with YAML frontmatter.
//
// This module only reads files and frontmatter, so it stays cheap and can be
// imported from next.config.ts as well as from pages. Compiling the MDX body
// lives in lib/mdx.tsx.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { site } from "./site";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD or a full timestamp) */
  date: string;
  updated?: string;
  tags: string[];
  /** Names of the projects (as in lib/site.ts) this post is about */
  projects: string[];
  draft: boolean;
  /** URL of the LinkedIn post where this is being discussed */
  linkedin?: string;
  readingMinutes: number;
  /** The MDX source with the frontmatter removed */
  body: string;
};

const dir = join(process.cwd(), "content", "blog");
const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const wordsPerMinute = 230;

/** Drafts show in `next dev`, and in a build only with BLOG_DRAFTS=1. */
export function draftsVisible(): boolean {
  return process.env.BLOG_DRAFTS === "1" || process.env.NODE_ENV === "development";
}

function fail(file: string, problem: string): never {
  throw new Error(`content/blog/${file}: ${problem}`);
}

function isoDate(file: string, field: string, value: unknown): string {
  const text = value instanceof Date ? value.toISOString() : typeof value === "string" ? value.trim() : "";
  if (!/^\d{4}-\d{2}-\d{2}/.test(text) || Number.isNaN(Date.parse(text))) {
    fail(file, `"${field}" must be an ISO date such as 2026-11-24, got ${JSON.stringify(value)}`);
  }
  return text;
}

function readingMinutes(body: string): number {
  const words = body
    .replace(/<[^>]*>/g, " ") // JSX and HTML tags
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  if (!slugPattern.test(slug)) fail(file, "file names must be lowercase words joined by hyphens");

  const source = readFileSync(join(dir, file), "utf8");
  const match = frontmatter.exec(source);
  if (!match) fail(file, "missing the --- frontmatter --- block at the top");

  const data = (parseYaml(match[1]) ?? {}) as Record<string, unknown>;
  const text = (field: string, required: boolean) => {
    const value = data[field];
    if (value === undefined || value === null || value === "") {
      if (required) fail(file, `"${field}" is required`);
      return undefined;
    }
    if (typeof value !== "string") fail(file, `"${field}" must be a string`);
    return value.trim();
  };

  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    fail(file, `"tags" must be a list of strings`);
  }
  const about = data.projects ?? [];
  if (!Array.isArray(about) || !about.every((name) => typeof name === "string")) {
    fail(file, `"projects" must be a list of project names`);
  }
  if (data.draft !== undefined && typeof data.draft !== "boolean") fail(file, `"draft" must be true or false`);

  const linkedin = text("linkedin", false);
  if (linkedin && !/^https:\/\//.test(linkedin)) fail(file, `"linkedin" must be an https:// URL`);

  const body = source.slice(match[0].length);
  return {
    slug,
    title: text("title", true)!,
    description: text("description", true)!,
    date: isoDate(file, "date", data.date),
    updated: data.updated === undefined ? undefined : isoDate(file, "updated", data.updated),
    tags: tags as string[],
    projects: about as string[],
    draft: data.draft === true,
    linkedin,
    readingMinutes: readingMinutes(body),
    body,
  };
}

const cache = new Map<boolean, Post[]>();

/** Every post, newest first. Drafts are left out unless `drafts` is true. */
export function getPosts({ drafts = draftsVisible() }: { drafts?: boolean } = {}): Post[] {
  // In `next dev` posts are re-read on every request, so a refresh shows edits.
  const useCache = process.env.NODE_ENV !== "development";
  const hit = useCache && cache.get(drafts);
  if (hit) return hit;

  const files = existsSync(dir) ? readdirSync(dir).filter((file) => file.endsWith(".mdx")) : [];
  const posts = files
    .map(readPost)
    .filter((post) => drafts || !post.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug));

  if (useCache) cache.set(drafts, posts);
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/** The posts either side of this one: `newer` and `older`. */
export function neighbours(slug: string): { newer?: Post; older?: Post } {
  const posts = getPosts();
  const i = posts.findIndex((post) => post.slug === slug);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}

export const blogPath = "/blog/";
export const postPath = (slug: string) => `/blog/${slug}/`;
export const postUrl = (slug: string) => `${site.url}${postPath(slug)}`;

/** The newest date a post carries, for lastModified and the feed. */
export const lastModified = (post: Post) => post.updated ?? post.date;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));
