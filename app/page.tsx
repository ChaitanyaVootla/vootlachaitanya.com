import { AgentKit } from "@/components/agent-kit";
import { Arrow } from "@/components/arrow";
import { PostList } from "@/components/blog";
import { CopyEmail } from "@/components/copy-email";
import { LivePreview } from "@/components/live-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { blogPath, getPosts, postPath, type Post } from "@/lib/blog";
import { agentPrompt } from "@/lib/llms";
import { agents, career, contact, facts, focus, machine, nav, projects, site, stack, writing } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

// The home page is the ProfilePage; the Person and WebSite it points at are
// declared once in the layout.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  name: site.title,
  description: site.description,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: { "@id": `${site.url}/#person` },
};

function SectionHead({ index, label }: { index: number; label: string }) {
  return (
    <header className="section__head">
      <p className="eyebrow">
        <span className="eyebrow__num">{pad(index)}</span>
        <span>{label}</span>
      </p>
    </header>
  );
}

type Entry = typeof projects.lead | (typeof projects.others)[number];

// One project: its details, then a full-width browser frame with a screenshot.
function ProjectEntry({ other, first = false, posts = [] }: { other: Entry; first?: boolean; posts?: Post[] }) {
  return (
    <div className={first ? "project-next project-next--first" : "project-next"}>
      <div className="wrap section__grid section__grid--plain">
        <div className="section__body">
          <div className="project reveal">
            <div className="project__main">
              <p className="status">
                {/* Pulsing dot: deployed and running. Hollow dot: not online yet. */}
                <span className={other.link ? "live-dot" : "live-dot live-dot--idle"} aria-hidden="true" />
                {other.status}
              </p>
              <h3 className="project__name">{other.name}</h3>
              <p className="project__tagline">{other.tagline}</p>
              <p className="project__body">{other.body}</p>
              {posts.length > 0 && (
                <ul className="project__posts">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <a href={postPath(post.slug)}>
                        <span>Write-up</span>
                        {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {(other.link || other.source) && (
                <div className="actions">
                  {other.link && (
                    <a className="btn" href={other.link.href} target="_blank" rel="noopener" data-umami-event="outbound-project" data-umami-event-project={other.name} data-umami-event-target="site">
                      Visit site
                      <Arrow dir="up-right" />
                    </a>
                  )}
                  {other.source && (
                    <a className="btn btn--ghost" href={other.source} target="_blank" rel="noopener" data-umami-event="outbound-project" data-umami-event-project={other.name} data-umami-event-target="github">
                      GitHub
                      <Arrow dir="up-right" />
                    </a>
                  )}
                  {other.link && <span className="project__note">{other.link.note}</span>}
                </div>
              )}
            </div>
            <div className="project__side">
              <ul className="ticks">
                {other.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <ul className="chips" aria-label="Stack">
                {other.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <figure className="wrap project__preview shot reveal">
        <div className="browser">
          <div className="browser__bar">
            <span className="browser__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="browser__url">{other.link ? other.link.label : other.name}</span>
            <a
              className="browser__open"
              href={`${other.shot.src}-2400.webp`}
              target="_blank"
              rel="noopener"
            >
              Full size
              <Arrow dir="up-right" />
            </a>
          </div>
          <img
            src={`${other.shot.src}-1600.webp`}
            srcSet={`${other.shot.src}-800.webp 800w, ${other.shot.src}-1600.webp 1600w, ${other.shot.src}-2400.webp 2400w`}
            sizes="(max-width: 90rem) 94vw, 1344px"
            width={2400}
            height={1500}
            alt={other.shot.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>{other.shot.caption}</figcaption>
      </figure>
    </div>
  );
}

export default function Home() {
  const { axis, spans } = career;
  const tmb = projects.featured;
  const range = axis.end - axis.start;
  const ticks = Array.from({ length: range / 2 }, (_, i) => axis.start + i * 2);
  // Rendered at build time; the open-ended bar runs to "now" as of the last deploy.
  const today = new Date();
  const now = today.getFullYear() + today.getMonth() / 12;

  // The Blog link is always there and comes first. The newest posts are shown
  // at the top of the page once something is published.
  const posts = getPosts();
  const latest = posts.slice(0, 3);
  const newest = latest[0];
  const about = (name: string) => posts.filter((post) => post.projects.includes(name));
  const links = [{ href: blogPath, label: "Blog" }, ...nav];
  // Section numbers stay consecutive whether or not the blog section is shown.
  let section = 0;
  const nextSection = () => ++section;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="progress" aria-hidden="true" />

      <header className="top">
        <div className="wrap top__row">
          <a className="brand" href="#top" aria-label={`${site.name} — back to top`}>
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">{site.name}</span>
          </a>
          <nav className="top__nav" aria-label="Sections">
            {links.map((item) => (
              <a key={item.href} href={item.href} data-blog={item.href === blogPath ? "" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="top__actions">
            <ThemeToggle />
            <a
              className="btn btn--ghost top__resume"
              href={site.resume}
              data-umami-event="resume-download"
              data-umami-event-location="header"
            >
              Résumé
              <Arrow dir="down" />
            </a>
            <a className="btn" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="wrap">
            {newest && (
              <a className="latest" href={postPath(newest.slug)} data-umami-event="latest-post" data-umami-event-post={newest.slug}>
                <span className="latest__tag">New on the blog</span>
                <span className="latest__title">{newest.title}</span>
                <Arrow dir="right" />
              </a>
            )}
            <p className="hero__kicker">
              <span className="live-dot" aria-hidden="true" />
              <span>{site.role}</span>
              <span className="hero__slash" aria-hidden="true">
                /
              </span>
              <span>{site.company.name}</span>
            </p>

            <div className="hero__head">
              <h1 className="hero__name">
                <span className="hero__line">{site.givenName}</span>
                <span className="hero__line">
                  {site.familyName}
                  <span className="hero__dot" aria-hidden="true">
                    .
                  </span>
                </span>
              </h1>
              <figure className="hero__portrait">
                <img
                  src={site.portrait.src}
                  width={799}
                  height={800}
                  alt={`Portrait of ${site.name} by a mountain lake in Sikkim`}
                  fetchPriority="high"
                />
                <figcaption>{site.portrait.caption}</figcaption>
              </figure>
            </div>

            <div className="hero__grid">
              <div className="hero__intro">
                <p className="hero__tagline">
                  Staff engineer at{" "}
                  <a href={site.company.url} target="_blank" rel="noopener">
                    {site.company.name}
                  </a>
                  , where I build AI agents for clinical trials. Most of the work is the harness around the model.
                </p>
                <div className="actions">
                  <a
                    className="btn btn--lg"
                    href={`mailto:${site.email}`}
                    data-umami-event="email-click"
                    data-umami-event-location="hero"
                  >
                    Start a conversation
                    <Arrow dir="up-right" />
                  </a>
                  <a className="btn btn--ghost btn--lg" href="#projects">
                    See projects
                    <Arrow dir="down" />
                  </a>
                </div>
              </div>
              <dl className="facts">
                {facts.map((fact) => (
                  <div key={fact.label} className="facts__item">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {latest.length > 0 && (
          <section className="section" id="blog">
            <div className="wrap section__grid">
              <SectionHead index={nextSection()} label={writing.latest} />
              <div className="section__body">
                <h2 className="reveal">{writing.heading}</h2>
                <PostList posts={latest} level="h3" />
                <div className="actions writing__more reveal">
                  <a className="btn btn--ghost" href={blogPath}>
                    All posts
                    <Arrow dir="right" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="section" id="work">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={focus.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{focus.heading}</h2>
              <p className="lede reveal">{focus.lede}</p>
              <ol className="rows">
                {focus.items.map((item, i) => (
                  <li key={item.title} className="row reveal">
                    <span className="row__num" aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <h3 className="row__title">{item.title}</h3>
                    <p className="row__body">{item.body}</p>
                  </li>
                ))}
              </ol>

            </div>
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={career.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{career.heading}</h2>
              <div className="trace">
                <div className="trace__axis" aria-hidden="true">
                  <span className="trace__axis-label">span</span>
                  <div className="trace__ticks">
                    {ticks.map((year) => (
                      <span key={year}>{year}</span>
                    ))}
                  </div>
                </div>
                <ol className="trace__rows">
                  {spans.map((span) => {
                    const end = span.to ?? now;
                    const left = ((span.from - axis.start) / range) * 100;
                    const width = ((end - span.from) / range) * 100;
                    return (
                      <li key={span.org} className={`span span--${span.kind}`}>
                        <div className="span__meta">
                          <h3>{span.org}</h3>
                          <p>{span.role}</p>
                          <p className="span__period">{span.period}</p>
                        </div>
                        <div className="span__lane" aria-hidden="true">
                          <div
                            className="span__bar"
                            style={{ left: `${left.toFixed(2)}%`, width: `${width.toFixed(2)}%` }}
                          />
                        </div>
                        <p className="span__body">{span.body}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="agents">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={agents.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{agents.heading}</h2>
              <p className="lede reveal">{agents.lede}</p>

              <div className="loop reveal">
                <ol className="loop__steps" aria-label="The loop">
                  {agents.loop.map((step, i) => (
                    <li key={step} style={{ "--i": i } as React.CSSProperties}>
                      <span className="loop__num">{pad(i + 1)}</span>
                      <span className="loop__label">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="loop__return" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="12" height="12">
                    <path d="M6 11V2M2 6l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              </div>

              <ul className="beliefs">
                {agents.beliefs.map((belief, i) => (
                  <li key={belief.title} className="belief reveal">
                    <span className="belief__num" aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <h3>{belief.title}</h3>
                    <p>{belief.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={projects.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{projects.heading}</h2>
              <p className="lede reveal">{projects.lede}</p>

            </div>
          </div>
          <ProjectEntry other={projects.lead} first posts={about(projects.lead.name)} />
          <div className="project-next">
            <div className="wrap section__grid section__grid--plain">
              <div className="section__body">
                <div className="project reveal">
                  <div className="project__main">
                    <p className="status">
                      <span className="live-dot" aria-hidden="true" />
                      {tmb.status}
                    </p>
                    <h3 className="project__name">{tmb.name}</h3>
                    <p className="project__body">{tmb.body}</p>
                    <div className="actions">
                      <a className="btn" href={tmb.url} target="_blank" rel="noopener" data-umami-event="outbound-project" data-umami-event-project={tmb.name} data-umami-event-target="site">
                        Visit site
                        <Arrow dir="up-right" />
                      </a>
                      <a className="btn btn--ghost" href={tmb.source} target="_blank" rel="noopener" data-umami-event="outbound-project" data-umami-event-project={tmb.name} data-umami-event-target="github">
                        GitHub
                        <Arrow dir="up-right" />
                      </a>
                    </div>
                  </div>
                  <div className="project__side">
                    <ul className="ticks">
                      {tmb.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                    <ul className="chips" aria-label="Stack">
                      {tmb.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrap project__preview reveal">
              <LivePreview url={tmb.url} host={tmb.host} title={`Live preview of ${tmb.name}`} />
            </div>
          </div>
          {projects.others.map((other) => (
            <ProjectEntry key={other.name} other={other} posts={about(other.name)} />
          ))}
        </section>

        <section className="section" id="stack">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={stack.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{stack.heading}</h2>
              <div className="stack">
                {stack.groups.map((group) => (
                  <div key={group.title} className="stack__group reveal">
                    <h3>
                      {group.title}
                      <span aria-hidden="true">{pad(group.items.length)}</span>
                    </h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={contact.eyebrow} />
            <div className="section__body">
              <h2 className="contact__heading reveal">{contact.heading}</h2>
              <a className="contact__email reveal" href={`mailto:${site.email}`} data-umami-event="email-click" data-umami-event-location="contact">
                <span>{site.email}</span>
                <Arrow dir="up-right" />
              </a>
              <div className="contact__row reveal">
                <CopyEmail email={site.email} />
                <ul className="contact__links">
                  <li>
                    <a href={site.phone.href} data-umami-event="phone-click">{site.phone.display}</a>
                  </li>
                  <li>
                    <a href={site.github} target="_blank" rel="noopener me" data-umami-event="profile-click" data-umami-event-profile="github">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener me" data-umami-event="profile-click" data-umami-event-profile="linkedin">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={site.resume} data-umami-event="resume-download" data-umami-event-location="contact">Résumé (PDF)</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section machine" id="for-ai">
          <div className="wrap section__grid">
            <SectionHead index={nextSection()} label={machine.eyebrow} />
            <div className="section__body">
              <h2 className="machine__heading reveal">{machine.heading}</h2>
              <p className="lede reveal">{machine.lede}</p>
              <div className="reveal">
                <AgentKit prompt={agentPrompt()} markdownUrl="/index.md" />
              </div>
              <ul className="machine__files reveal">
                {machine.files.map((file) => (
                  <li key={file.href}>
                    <a href={file.href}>
                      <span className="machine__path">{file.href}</span>
                      <span className="machine__note">{file.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__row">
          <p>
            © {today.getFullYear()} {site.name}
          </p>
          <p className="foot__links">
            <a href={blogPath}>Blog</a>
            <a href={`${blogPath}rss.xml`}>RSS</a>
            <a href="/llms.txt">llms.txt</a>
            <a href="/index.md">Markdown</a>
            <a href="#top">
              Back to top
              <span aria-hidden="true"> ↑</span>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
