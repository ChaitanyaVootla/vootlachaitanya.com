"use client";

import { useEffect, useState } from "react";

type Copied = "prompt" | "markdown" | "failed" | null;

// Buttons that hand the site to an AI assistant: a ready-made prompt, the
// page itself as markdown, and one-click links that open an assistant with
// the prompt already typed in.
export function AgentKit({ prompt, markdownUrl }: { prompt: string; markdownUrl: string }) {
  const [copied, setCopied] = useState<Copied>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy(kind: "prompt" | "markdown") {
    try {
      const text = kind === "prompt" ? prompt : await fetch(markdownUrl).then((res) => res.text());
      await navigator.clipboard.writeText(text);
      setCopied(kind);
    } catch {
      setCopied("failed");
    }
  }

  const query = encodeURIComponent(prompt);

  return (
    <div className="kit">
      <div className="kit__prompt">
        <p className="kit__label">Prompt</p>
        <p className="kit__text">{prompt}</p>
      </div>
      <div className="kit__actions">
        <button type="button" className="btn" onClick={() => copy("prompt")}>
          {copied === "prompt" ? "Copied" : "Copy prompt"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => copy("markdown")}>
          {copied === "markdown" ? "Copied" : "Copy page as Markdown"}
        </button>
        <a className="btn btn--ghost" href={`https://claude.ai/new?q=${query}`} target="_blank" rel="noopener">
          Open in Claude
        </a>
        <a className="btn btn--ghost" href={`https://chatgpt.com/?q=${query}`} target="_blank" rel="noopener">
          Open in ChatGPT
        </a>
      </div>
      <p className="kit__status" aria-live="polite">
        {copied === "failed" ? "Copying was blocked by the browser. The links below have the same content." : ""}
      </p>
    </div>
  );
}
