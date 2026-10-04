"use client";

import { useState } from "react";

const siteUrl = "https://docs.ecf.mseller.app";

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-card px-2.5 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground";

function prompt(markdownUrl: string) {
  return `Lee la documentación de MSeller ECF (facturación electrónica e-CF de la DGII) en ${markdownUrl} y ayúdame a integrarla en mi sistema. Si necesitas más contexto, la documentación completa está en ${siteUrl}/llms-full.txt`;
}

/** "Copy / open in an AI assistant" buttons shown under every page title. */
export function PageActions({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const markdownPath = `${url}.md`;
  const markdownUrl = `${siteUrl}${markdownPath}`;
  const q = encodeURIComponent(prompt(markdownUrl));

  async function copy() {
    try {
      const res = await fetch(markdownPath);
      await navigator.clipboard.writeText(await res.text());
    } catch {
      // Clipboard blocked (permissions, insecure context): show the file instead.
      window.open(markdownPath, "_blank");
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="not-prose flex flex-wrap items-center gap-2 border-b border-fd-border pb-4">
      <button type="button" onClick={copy} className={buttonClass}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {copied ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        {copied ? "¡Copiado!" : "Copiar para IA"}
      </button>
      <a href={markdownPath} target="_blank" rel="noreferrer" className={buttonClass}>
        Ver Markdown
      </a>
      <a href={`https://chatgpt.com/?hints=search&q=${q}`} target="_blank" rel="noreferrer" className={buttonClass}>
        Abrir en ChatGPT
      </a>
      <a href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noreferrer" className={buttonClass}>
        Abrir en Claude
      </a>
    </div>
  );
}
