import type { ComponentPropsWithoutRef, ReactNode } from "react";

// The elements and components a post can use. They are plain server
// components: posts render to HTML at build time and ship no JavaScript.
//
// In a post:
//   <Callout title="Why this matters">Markdown **works** in here.</Callout>
//   <Figure src="/images/blog/x.png" alt="…" caption="…" width={1600} height={900} />
//   <Diagram title="What the drawing shows" caption="…"><svg viewBox="…">…</svg></Diagram>

type HeadingProps = ComponentPropsWithoutRef<"h2">;

function anchored(Tag: "h2" | "h3" | "h4") {
  return function Heading({ id, children, className, ...rest }: HeadingProps) {
    // The footnotes section brings its own (visually hidden) heading: leave it be.
    if (!id || id === "footnote-label") {
      return (
        <Tag id={id} className={className} {...rest}>
          {children}
        </Tag>
      );
    }
    return (
      <Tag id={id} className={className} {...rest}>
        {children}
        <a className="prose__anchor" href={`#${id}`} aria-label="Link to this section">
          #
        </a>
      </Tag>
    );
  };
}

function Link({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  return <a href={href} {...(external ? { rel: "noopener" } : {})} {...rest} />;
}

// Wide tables scroll inside their own box instead of pushing the page sideways.
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="prose__table" tabIndex={0} role="region" aria-label="Table, scrolls sideways">
      <table {...props} />
    </div>
  );
}

function Img({ alt = "", ...rest }: ComponentPropsWithoutRef<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}

export function Callout({
  title,
  tone = "note",
  children,
}: {
  title?: string;
  tone?: "note" | "warning";
  children: ReactNode;
}) {
  return (
    <aside className={`callout callout--${tone}`}>
      <p className="callout__label">{title ?? (tone === "warning" ? "Careful" : "Note")}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}

export function Figure({
  src,
  alt = "",
  caption,
  width,
  height,
  children,
}: {
  src?: string;
  alt?: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
  children?: ReactNode;
}) {
  return (
    <figure className="figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" /> : children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// A frame for an inline <svg>. Draw with currentColor and var(--accent) so the
// drawing follows the light and dark themes; `title` is what a screen reader hears.
export function Diagram({ title, caption, children }: { title: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="diagram" role="figure" aria-label={title}>
      <div className="diagram__canvas">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = {
  h2: anchored("h2"),
  h3: anchored("h3"),
  h4: anchored("h4"),
  a: Link,
  table: Table,
  img: Img,
  Callout,
  Figure,
  Diagram,
};

// Feed readers bring their own styles and ignore ours, so the RSS copy of a
// post gets plainer versions: no "#" anchors, and callouts become blockquotes.
function plain(Tag: "h2" | "h3" | "h4") {
  return function Heading({ children, id }: HeadingProps) {
    return <Tag id={id}>{children}</Tag>;
  };
}

export const feedComponents = {
  ...mdxComponents,
  h2: plain("h2"),
  h3: plain("h3"),
  h4: plain("h4"),
  table: (props: ComponentPropsWithoutRef<"table">) => <table {...props} />,
  Callout: ({ title, tone = "note", children }: { title?: string; tone?: "note" | "warning"; children: ReactNode }) => (
    <blockquote>
      <p>
        <strong>{title ?? (tone === "warning" ? "Careful" : "Note")}</strong>
      </p>
      {children}
    </blockquote>
  ),
};
