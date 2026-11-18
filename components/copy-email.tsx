"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address is still a mailto link right beside this.
    }
  }

  return (
    <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
