import { getOrderedPages, getPageMarkdown, siteUrl } from '@/lib/llm';

export const dynamic = 'force-static';

// The whole documentation as one Markdown file, in sidebar order, so an agent
// can load it into context in a single request.
export function GET() {
  const intro = `# Documentación MSeller ECF (completa)

> API para emitir Comprobantes Fiscales Electrónicos (e-CF) ante la DGII de República Dominicana. Este archivo contiene toda la documentación de ${siteUrl} en Markdown. Índice: ${siteUrl}/llms.txt`;

  const pages = getOrderedPages().map(getPageMarkdown);

  return new Response([intro, ...pages].join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
