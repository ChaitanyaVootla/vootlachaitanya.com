import { Arrow } from "@/components/arrow";
import { ThemeToggle } from "@/components/theme-toggle";
import { blogPath, formatDate, postPath, type Post } from "@/lib/blog";
import { site, writing } from "@/lib/site";

// Shared pieces of the blog pages and the home page's "Latest from the blog".

export const feedPath = `${blogPath}rss.xml`;

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#agents", label: "Agents" },
  { href: "/#projects", label: "Projects" },
  { href: blogPath, label: "Blog" },
] as const;

// The same top bar as the home page; its links lead back into the home page.
export function BlogHeader() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true" />
      <header className="top">
        <div className="wrap top__row">
          <a className="brand" href="/" aria-label={`${site.name} — home`}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">{site.name}</span>
          </a>
          <nav className="top__nav" aria-label="Site">
            {links.map((item) => (
              <a key={item.href} href={item.href} aria-current={item.href === blogPath ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="top__actions">
            <ThemeToggle />
            <a className="btn btn--ghost top__resume" href={feedPath}>
              RSS
            </a>
            <a className="btn" href="/#contact">
              Contact
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export function BlogFooter({ markdown }: { markdown: string }) {
  return (
    <footer className="foot">
      <div className="wrap foot__row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="foot__links">
          <a href="/">Home</a>
          <a href={feedPath}>RSS</a>
          <a href={markdown}>Markdown</a>
          <a href="#main">
            Back to top
            <span aria-hidden="true"> ↑</span>
          </a>
        </p>
      </div>
    </footer>
  );
}

export function PostList({ posts, level = "h2" }: { posts: Post[]; level?: "h2" | "h3" }) {
  const Title = level;
  return (
    <ol className="posts">
      {posts.map((post) => (
        <li key={post.slug} className="posts__item reveal">
          <a className="posts__link" href={postPath(post.slug)}>
            <time className="posts__date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="posts__main">
              <Title className="posts__title">{post.title}</Title>
              <span className="posts__desc">{post.description}</span>
              <span className="posts__meta">
                <span>{post.readingMinutes} min read</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="posts__tag">
                    {tag}
                  </span>
                ))}
              </span>
            </span>
            <Arrow dir="right" />
          </a>
        </li>
      ))}
    </ol>
  );
}

// A plain HTML form that posts straight to Buttondown, so subscribing works
// without JavaScript. With no username configured it falls back to RSS.
export function Subscribe({ source }: { source: string }) {
  const { username } = site.newsletter;
  const copy = writing.subscribe;
  return (
    <section className="subscribe" id="subscribe" aria-labelledby="subscribe-heading">
      <p className="eyebrow">
        <span className="eyebrow__num">→</span>
        <span>Subscribe</span>
      </p>
      <h2 className="subscribe__heading" id="subscribe-heading">
        {copy.heading}
      </h2>
      {username ? (
        <>
          <p className="subscribe__note">{copy.withForm}</p>
          <form
            className="subscribe__form"
            action={`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(username)}`}
            method="post"
          >
            <label className="visually-hidden" htmlFor="subscribe-email">
              Email address
            </label>
            <input
              id="subscribe-email"
              className="subscribe__input"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <button className="btn btn--lg" type="submit" data-umami-event="subscribe" data-umami-event-source={source}>
              Subscribe
              <Arrow dir="right" />
            </button>
          </form>
          <p className="subscribe__alt">
            Or follow along with the <a href={feedPath}>RSS feed</a>.
          </p>
        </>
      ) : (
        <>
          <p className="subscribe__note">{copy.withoutForm}</p>
          <div className="actions">
            <a className="btn btn--lg" href={feedPath} data-umami-event="rss-click" data-umami-event-source={source}>
              Follow by RSS
              <Arrow dir="right" />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
