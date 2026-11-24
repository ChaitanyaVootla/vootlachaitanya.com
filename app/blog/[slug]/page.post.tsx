import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/arrow";
import { BlogFooter, BlogHeader, Subscribe } from "@/components/blog";
import { mdxComponents } from "@/components/mdx";
import { formatDate, getPost, getPosts, lastModified, neighbours, postPath, postUrl } from "@/lib/blog";
import { compilePost } from "@/lib/mdx";
import { site } from "@/lib/site";

// Named *.post.tsx on purpose: see next.config.ts.

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

const shareImage = (slug: string) => `${postPath(slug)}og.png`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = postPath(post.slug);
  const image = { url: shareImage(post.slug), width: 1200, height: 630, alt: post.title };
  return {
    title: `${post.title} — ${site.name}`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: path,
      types: { "text/markdown": [{ url: `${path}index.md`, title: "This post as markdown" }] },
    },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: lastModified(post),
      authors: [site.url],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

// The title takes the same full stop as the name on the home page, unless it
// already ends in punctuation of its own.
function Title({ text }: { text: string }) {
  if (/[.!?:…]$/.test(text)) return <>{text}</>;
  return (
    <>
      {text}
      <span className="hero__dot" aria-hidden="true">
        .
      </span>
    </>
  );
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { Content, headings } = await compilePost(post);
  const { newer, older } = neighbours(post.slug);
  const showToc = headings.filter((h) => h.depth === 2).length >= 3;
  const url = postUrl(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: lastModified(post),
    image: `${site.url}${shareImage(post.slug)}`,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
    ...(post.linkedin ? { discussionUrl: post.linkedin } : {}),
  };

  return (
    <>
      <BlogHeader />
      <main id="main" className="post">
        <article className="wrap">
          <header className="post__head">
            <p className="hero__kicker">
              <a href="/">Home</a>
              <span className="hero__slash" aria-hidden="true">
                /
              </span>
              <a href="/blog/">Blog</a>
              {post.draft && <span className="post__draft">Draft</span>}
            </p>
            <h1 className="post__title">
              <Title text={post.title} />
            </h1>
            <p className="post__dek">{post.description}</p>
          </header>

          <div className="section__grid post__grid">
            <aside className="post__aside">
              <dl className="post__meta">
                <div>
                  <dt>Published</dt>
                  <dd>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </dd>
                </div>
                {post.updated && (
                  <div>
                    <dt>Updated</dt>
                    <dd>
                      <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </dd>
                  </div>
                )}
                <div>
                  <dt>Reading</dt>
                  <dd>{post.readingMinutes} min</dd>
                </div>
                {post.tags.length > 0 && (
                  <div>
                    <dt>Tags</dt>
                    <dd>
                      <ul className="chips" aria-label="Tags">
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {post.projects.length > 0 && (
                  <div>
                    <dt>About</dt>
                    <dd>
                      <ul className="chips" aria-label="Projects">
                        {post.projects.map((name) => (
                          <li key={name}>
                            <a href="/#projects">{name}</a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
              {showToc && (
                <nav className="toc" aria-labelledby="toc-label">
                  <p className="toc__label" id="toc-label">
                    On this page
                  </p>
                  <ol>
                    {headings.map((h) => (
                      <li key={h.id} className={h.depth === 3 ? "toc__sub" : undefined}>
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </aside>

            <div className="post__body">
              <div className="prose">
                <Content components={mdxComponents} />
              </div>

              <footer className="post__foot">
                {/* Most readers arrive from a link and have never seen the home page. */}
                <div className="author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.portrait.src} alt="" width={56} height={56} loading="lazy" decoding="async" />
                  <div>
                    <p className="author__name">Written by {site.name}</p>
                    <p className="author__bio">{site.summary}</p>
                    <p className="author__links">
                      <a href="/">About me</a>
                      <a href="/#projects">Projects</a>
                      <a href={site.github} target="_blank" rel="noopener" data-umami-event="profile-click" data-umami-event-profile="github">
                        GitHub
                      </a>
                      <a href={site.linkedin} target="_blank" rel="noopener" data-umami-event="profile-click" data-umami-event-profile="linkedin">
                        LinkedIn
                      </a>
                    </p>
                  </div>
                </div>

                {post.linkedin && (
                  <div className="post__discuss">
                    <p>Questions, disagreements, war stories: the conversation about this one is on LinkedIn.</p>
                    <a
                      className="btn btn--ghost"
                      href={post.linkedin}
                      target="_blank"
                      rel="noopener"
                      data-umami-event="discuss-linkedin"
                      data-umami-event-post={post.slug}
                    >
                      Discuss on LinkedIn
                      <Arrow dir="up-right" />
                    </a>
                  </div>
                )}

                <Subscribe source={post.slug} />

                {(newer || older) && (
                  <nav className="pager" aria-label="More posts">
                    {newer ? (
                      <a className="pager__link" href={postPath(newer.slug)}>
                        <span className="pager__dir">
                          <Arrow dir="left" /> Newer
                        </span>
                        <span className="pager__title">{newer.title}</span>
                      </a>
                    ) : (
                      <span />
                    )}
                    {older && (
                      <a className="pager__link pager__link--older" href={postPath(older.slug)}>
                        <span className="pager__dir">
                          Older <Arrow dir="right" />
                        </span>
                        <span className="pager__title">{older.title}</span>
                      </a>
                    )}
                  </nav>
                )}
              </footer>
            </div>
          </div>
        </article>
      </main>
      <BlogFooter markdown={`${postPath(post.slug)}index.md`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
