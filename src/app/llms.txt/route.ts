import { source } from '@/lib/source';
import { markdownUrl, siteUrl } from '@/lib/llm';

export const dynamic = 'force-static';

// Index for LLM agents, following https://llmstxt.org. Sections mirror the
// sidebar, and every link points at the page's plain-Markdown version.
export function GET() {
  const pages = new Map(source.getPages().map((page) => [page.url, page]));
  const lines: string[] = [];

  type Node = (typeof source.pageTree.children)[number];
  const entry = (url: string) => {
    const page = pages.get(url);
    if (!page) return;
    const description = page.data.description ? `: ${page.data.description}` : '';
    lines.push(`- [${page.data.title}](${siteUrl}${markdownUrl(url)})${description}`);
  };
  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      if (node.type === 'separator') {
        lines.push('', `## ${String(node.name)}`, '');
      } else if (node.type === 'page') {
        entry(node.url);
      } else {
        lines.push('', `### ${String(node.name)}`, '');
        if (node.index) entry(node.index.url);
        walk(node.children);
      }
    }
  };
  walk(source.pageTree.children);

  const body = `# MSeller ECF — Facturación Electrónica República Dominicana

> MSeller ECF es una API para emitir Comprobantes Fiscales Electrónicos (e-CF) ante la DGII de República Dominicana. El integrador envía un JSON; MSeller lo convierte a XML, lo firma con el certificado digital del emisor, lo envía a la DGII y guarda el XML firmado por 10 años.

La documentación está en español. Cada enlace apunta a la versión en Markdown de la página.

- Documentación completa en un solo archivo: ${siteUrl}/llms-full.txt
- Cualquier página en Markdown: agrega \`.md\` a su URL (por ejemplo ${siteUrl}/docs/integration/authentication.md)
${lines.join('\n')}

## Datos clave

- **Base URL del API**: https://ecf.api.mseller.app/{entorno}, donde {entorno} es TesteCF (pruebas), CerteCF (certificación) o eCF (producción)
- **Portal MSeller**: https://ecf.mseller.app
- **Portal DGII de certificación**: https://ecf.dgii.gov.do/certecf/portalcertificacion
- **Proveedor**: IT SOLUCLICK SRL (RNC 130862346)
- **Software**: MSeller, versión 1.0, tipo EXTERNO
- **Soporte**: hello@mseller.app
- **Discord**: https://discord.gg/7xnNByfWTG
- **Video tutorial de certificación**: https://www.youtube.com/watch?v=Y7uITwsA-LE
`;

  return new Response(body.replace(/\n{3,}/g, '\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
