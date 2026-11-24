import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found — Chaitanya Vootla",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="lost" id="main">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__num">404</span>
          <span>Span not found</span>
        </p>
        <h1 className="lost__title">
          Nothing at this path<span className="hero__dot">.</span>
        </h1>
        <p className="lede">This run ended early. Start again from the home page, or read the blog.</p>
        <div className="actions">
          <a className="btn btn--lg" href="/">
            Back to the start
          </a>
          <a className="btn btn--ghost btn--lg" href="/blog/">
            Read the blog
          </a>
        </div>
      </div>
    </main>
  );
}
