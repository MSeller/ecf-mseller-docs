import { source } from '@/lib/source';

// Plain-Markdown versions of the docs for LLM agents (https://llmstxt.org).
// Everything is generated from the MDX files at build time, so it never drifts
// from what the site shows.

export const siteUrl = 'https://docs.ecf.mseller.app';

type Page = NonNullable<ReturnType<typeof source.getPage>>;

/** Pages in sidebar order (the order of `meta.json`), not file-system order. */
export function getOrderedPages(): Page[] {
  const byUrl = new Map(source.getPages().map((page) => [page.url, page]));
  const ordered: Page[] = [];

  type Node = (typeof source.pageTree.children)[number];
  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      if (node.type === 'page') {
        const page = byUrl.get(node.url);
        if (page) ordered.push(page);
      } else if (node.type === 'folder') {
        if (node.index) {
          const page = byUrl.get(node.index.url);
          if (page) ordered.push(page);
        }
        walk(node.children);
      }
    }
  };
  walk(source.pageTree.children);

  // Anything missing from meta.json still belongs in the output.
  for (const page of byUrl.values()) {
    if (!ordered.includes(page)) ordered.push(page);
  }
  return ordered;
}

/** `/docs/integration/overview` → `/docs/integration/overview.md` */
export function markdownUrl(url: string): string {
  return `${url}.md`;
}

export function getPageMarkdown(page: Page): string {
  const header = [
    `# ${page.data.title}`,
    '',
    `URL: ${siteUrl}${page.url}`,
    page.data.description ? `\n> ${page.data.description}` : '',
  ].join('\n');

  return `${header}\n\n${mdxToMarkdown(page.data.content)}`.trim() + '\n';
}

const absolutize = (line: string) =>
  line
    .replace(/\]\(\/(docs|images)/g, `](${siteUrl}/$1`)
    .replace(/href="\/(docs|images)/g, `href="${siteUrl}/$1`);

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`${name}=(?:"([^"]*)"|'([^']*)')`))?.slice(1).find((v) => v !== undefined);
}

/** Turns a raw HTML/JSX block (`<div>…</div>`) into the link it carries. */
function htmlBlockToMarkdown(block: string): string {
  const video = block.match(/youtube\.com\/embed\/([\w-]+)/);
  if (video) {
    const title = attr(block, 'title') ?? 'Video';
    return `Video: [${title}](https://www.youtube.com/watch?v=${video[1]})`;
  }
  const href = attr(block, 'href');
  if (href) {
    const text = block
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return `[${text || href}](${href})`;
  }
  return '';
}

/**
 * Converts the MDX used in `content/docs` to plain Markdown. Code blocks are
 * left untouched (they hold the e-CF XML/JSON samples); outside them the custom
 * components become their Markdown equivalent.
 */
export function mdxToMarkdown(mdx: string): string {
  const body = mdx.replace(/^---\n[\s\S]*?\n---\n/, '');
  const lines = body.split('\n');
  const out: string[] = [];

  let fence: string | null = null;
  let quote = false; // inside <Callout>

  const push = (line: string) => {
    if (!quote) return out.push(line);
    out.push(line.trim() === '' ? '>' : `> ${line.replace(/^ {2}/, '')}`);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (fence) {
      if (fenceMatch && trimmed.startsWith(fence)) fence = null;
      push(line);
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      push(line);
      continue;
    }

    // <Mermaid chart="…" /> — may span several lines.
    if (trimmed.startsWith('<Mermaid')) {
      let tag = line;
      while (!/\/>\s*$/.test(tag) && i < lines.length - 1) tag += '\n' + lines[++i];
      // A literal `\n` followed by indentation separates statements; any other
      // `\n` is a line break inside a node label.
      const chart = (tag.match(/chart="([\s\S]*?)"\s*\/>/)?.[1] ?? '')
        .replace(/\\n(?=\s)/g, '\n')
        .replaceAll('\\n', '<br/>')
        .trim();
      push('```mermaid');
      chart.split('\n').forEach(push);
      push('```');
      continue;
    }

    const callout = trimmed.match(/^<Callout\b([^>]*)>$/);
    if (callout) {
      const type = attr(callout[1], 'type');
      const title = attr(callout[1], 'title') ?? (type === 'warn' ? 'Importante' : 'Nota');
      quote = true;
      push(`**${type === 'warn' ? '⚠️ ' : ''}${title}**`);
      push('');
      continue;
    }
    if (trimmed === '</Callout>') {
      quote = false;
      continue;
    }

    const tab = trimmed.match(/^<TabsContent\b([^>]*)>$/);
    if (tab) {
      push(`**${attr(tab[1], 'value')}**`);
      push('');
      continue;
    }
    if (/^<\/?(Tabs|TabsContent|Steps|Step)\b[^>]*>$/.test(trimmed)) continue;
    if (/^<br\s*\/?>$/.test(trimmed)) continue;

    // Raw HTML blocks (Discord button, YouTube embed).
    if (/^<div\b/.test(trimmed)) {
      let block = line;
      let depth = 0;
      for (let j = i; j < lines.length; j++) {
        if (j > i) block += '\n' + lines[j];
        depth += (lines[j].match(/<div\b/g) ?? []).length;
        depth -= (lines[j].match(/<\/div>/g) ?? []).length;
        if (depth <= 0) {
          i = j;
          break;
        }
      }
      const md = htmlBlockToMarkdown(block);
      if (md) push(md);
      continue;
    }

    push(absolutize(line));
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
