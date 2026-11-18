import { AgentKit } from "@/components/agent-kit";
import { CopyEmail } from "@/components/copy-email";
import { LivePreview } from "@/components/live-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { agentPrompt } from "@/lib/llms";
import { agents, career, contact, facts, focus, machine, nav, project, site, stack } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ dir = "up-right" }: { dir?: "up-right" | "down" | "right" }) {
  const paths = {
    "up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
    down: "M8 3v10M3.5 8.5L8 13l4.5-4.5",
    right: "M3 8h10M8.5 3.5L13 8l-4.5 4.5",
  };
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d={paths[dir]} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

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

export default function Home() {
  const { axis, spans } = career;
  const range = axis.end - axis.start;
  const ticks = Array.from({ length: range / 2 }, (_, i) => axis.start + i * 2);
  // Rendered at build time; the open-ended bar runs to "now" as of the last deploy.
  const today = new Date();
  const now = today.getFullYear() + today.getMonth() / 12;

  return (
    <>
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
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="top__actions">
            <ThemeToggle />
            <a className="btn btn--ghost top__resume" href={site.resume}>
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
                  . Mostly working on agents these days, with a day job in clinical-trial software.
                </p>
                <div className="actions">
                  <a className="btn btn--lg" href={`mailto:${site.email}`}>
                    Start a conversation
                    <Arrow dir="up-right" />
                  </a>
                  <a className="btn btn--ghost btn--lg" href="#project">
                    View active project
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

        <section className="section" id="work">
          <div className="wrap section__grid">
            <SectionHead index={1} label={focus.eyebrow} />
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
            <SectionHead index={2} label={career.eyebrow} />
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
            <SectionHead index={3} label={agents.eyebrow} />
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

        <section className="section" id="project">
          <div className="wrap section__grid">
            <SectionHead index={4} label={project.eyebrow} />
            <div className="section__body">
              <h2 className="reveal">{project.heading}</h2>
              <p className="lede reveal">{project.lede}</p>

              <div className="project reveal">
                <div className="project__main">
                  <p className="status">
                    <span className="live-dot" aria-hidden="true" />
                    {project.status}
                  </p>
                  <h3 className="project__name">{project.name}</h3>
                  <p className="project__body">{project.body}</p>
                  <div className="actions">
                    <a className="btn" href={project.url} target="_blank" rel="noopener">
                      Visit site
                      <Arrow dir="up-right" />
                    </a>
                    <a className="btn btn--ghost" href={project.source} target="_blank" rel="noopener">
                      GitHub
                      <Arrow dir="up-right" />
                    </a>
                  </div>
                </div>
                <div className="project__side">
                  <ul className="ticks">
                    {project.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                  <ul className="chips" aria-label="Stack">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap project__preview reveal">
            <LivePreview url={project.url} host={project.host} title={`Live preview of ${project.name}`} />
          </div>
        </section>

        <section className="section" id="stack">
          <div className="wrap section__grid">
            <SectionHead index={5} label={stack.eyebrow} />
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
            <SectionHead index={6} label={contact.eyebrow} />
            <div className="section__body">
              <h2 className="contact__heading reveal">{contact.heading}</h2>
              <a className="contact__email reveal" href={`mailto:${site.email}`}>
                <span>{site.email}</span>
                <Arrow dir="up-right" />
              </a>
              <div className="contact__row reveal">
                <CopyEmail email={site.email} />
                <ul className="contact__links">
                  <li>
                    <a href={site.phone.href}>{site.phone.display}</a>
                  </li>
                  <li>
                    <a href={site.github} target="_blank" rel="noopener me">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener me">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={site.resume}>Résumé (PDF)</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section machine" id="for-ai">
          <div className="wrap section__grid">
            <SectionHead index={7} label={machine.eyebrow} />
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
