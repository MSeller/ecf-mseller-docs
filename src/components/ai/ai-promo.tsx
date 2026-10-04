import Link from "next/link";
import { Banner } from "fumadocs-ui/components/banner";

const guideUrl = "/docs/resources/ai-agents";

/** Dismissible strip at the top of every docs page. */
export function AiBanner() {
  return (
    <Banner id="ai-docs-banner" variant="rainbow" height="3rem">
      <Link href={guideUrl} className="inline-flex flex-wrap items-center justify-center gap-x-2 px-8">
        <span className="hidden rounded-full bg-fd-primary sm:inline px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-fd-primary-foreground">
          Nuevo
        </span>
        <span className="md:hidden">Usa estas docs con tu IA</span>
        <span className="hidden md:inline">
          Integra más rápido con IA: dale toda esta documentación a ChatGPT, Claude o Cursor
        </span>
        <span className="font-semibold underline underline-offset-4">Ver cómo →</span>
      </Link>
    </Banner>
  );
}

/** Card pinned above the sidebar navigation; stays after the banner is closed. */
export function AiSidebarCard() {
  return (
    <Link
      href={guideUrl}
      className="mb-2 block rounded-lg border border-fd-primary/30 bg-fd-primary/10 p-3 text-sm transition-colors hover:bg-fd-primary/15"
    >
      <p className="font-semibold text-fd-foreground">🤖 Docs para tu agente de IA</p>
      <p className="mt-1 text-xs text-fd-muted-foreground">
        Toda la documentación en un archivo: <code className="text-fd-primary">llms-full.txt</code>
      </p>
    </Link>
  );
}
