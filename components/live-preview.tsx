"use client";

import { useEffect, useRef, useState } from "react";

type Frame = { width: number; height: number; scale: number };

// The site is rendered at a real viewport size and scaled down to fit, so the
// preview shows the actual layout rather than a squeezed one. Narrow screens
// get the phone layout, wide screens the desktop one.
const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 430, height: 780 };

export function LivePreview({ url, host, title }: { url: string; host: string; title: string }) {
  const view = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = view.current;
    if (!el) return;

    const measure = () => {
      const available = el.clientWidth;
      const size = available < 560 ? PHONE : DESKTOP;
      setFrame({ ...size, scale: available / size.width });
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);

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

    return () => {
      resize.disconnect();
      visible.disconnect();
    };
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
      <div
        ref={view}
        className="browser__view"
        style={frame ? { height: Math.round(frame.height * frame.scale) } : undefined}
        onMouseLeave={() => setActive(false)}
      >
        <div className="browser__placeholder" aria-hidden="true">
          <span>{host}</span>
        </div>
        {frame && near && (
          <iframe
            src={url}
            title={title}
            width={frame.width}
            height={frame.height}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            tabIndex={active ? 0 : -1}
            style={{ transform: `scale(${frame.scale})` }}
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
