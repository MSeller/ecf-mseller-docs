import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { getPageMarkdown } from '@/lib/llm';

export const dynamic = 'force-static';

// Served at `/docs/<slug>.md` through the rewrite in next.config.mjs.
export async function GET(
  _req: Request,
  props: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(getPageMarkdown(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
