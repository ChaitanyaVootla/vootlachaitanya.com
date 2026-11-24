import type { Metadata } from "next";
import { BlogFooter, BlogHeader, PostList, Subscribe } from "@/components/blog";
import { blogPath, getPosts } from "@/lib/blog";
import { site, writing } from "@/lib/site";

const title = `${writing.eyebrow} — ${site.name}`;

export const metadata: Metadata = {
  title,
  description: writing.lede,
  alternates: {
    canonical: blogPath,
    types: { "text/markdown": [{ url: `${blogPath}index.md`, title: "This page as markdown" }] },
  },
  openGraph: {
    type: "website",
    url: blogPath,
    siteName: site.name,
    title,
    description: writing.lede,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: writing.lede,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <BlogHeader />
      <main id="main" className="blog">
        <header className="wrap post__head">
          <p className="hero__kicker">
            <a href="/">Home</a>
            <span className="hero__slash" aria-hidden="true">
              /
            </span>
            <span>{writing.eyebrow}</span>
          </p>
          <h1 className="post__title">
            {writing.heading.replace(/\.$/, "")}
            <span className="hero__dot" aria-hidden="true">
              .
            </span>
          </h1>
          <p className="post__dek">{writing.lede}</p>
        </header>

        <section className="wrap section__grid blog__grid" aria-label="Posts">
          <header className="section__head">
            <p className="eyebrow">
              <span className="eyebrow__num">{pad(posts.length)}</span>
              <span>{posts.length === 1 ? "Post" : "Posts"}</span>
            </p>
          </header>
          <div className="section__body">
            {posts.length > 0 ? (
              <PostList posts={posts} />
            ) : (
              <p className="blog__empty">
                <span className="live-dot live-dot--idle" aria-hidden="true" />
                {writing.empty}
              </p>
            )}
            <Subscribe source="blog-index" />
          </div>
        </section>
      </main>
      <BlogFooter markdown={`${blogPath}index.md`} />
    </>
  );
}
