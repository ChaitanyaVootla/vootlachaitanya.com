"use client";

import { useEffect, useRef, useState } from "react";

// The embedded site is shown at its real size, one CSS pixel per pixel. It is
// responsive, so it simply lays itself out for whatever width the frame has.
// (An earlier version rendered it at 1440px and scaled it down with a CSS
// transform, which made the text small and soft.)
export function LivePreview({ url, host, title }: { url: string; host: string; title: string }) {
  const view = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = view.current;
    if (!el) return;

    // Only start loading the other site once the reader is getting close.
    const visible = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          visible.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    visible.observe(el);
    return () => visible.disconnect();
  }, []);

  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="browser__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser__url">
          <span className="live-dot" aria-hidden="true" />
          {host}
        </span>
        <a className="browser__open" href={url} target="_blank" rel="noopener">
          Open site
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
      <div ref={view} className="browser__view" onMouseLeave={() => setActive(false)}>
        <div className="browser__placeholder" aria-hidden="true">
          <span>{host}</span>
        </div>
        {near && (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            tabIndex={active ? 0 : -1}
          />
        )}
        {!active && (
          <button type="button" className="browser__cover" onClick={() => setActive(true)}>
            <span>Click to interact</span>
          </button>
        )}
      </div>
    </div>
  );
}
