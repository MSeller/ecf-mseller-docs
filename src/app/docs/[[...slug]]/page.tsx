import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { generateHowToSchema, generateVideoSchema } from '../../schema';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const slug = params.slug?.join('/') ?? '';
  const isCertification = slug === 'certification/process';

  return (
    <>
      {isCertification && (
        <>
          <JsonLd data={generateHowToSchema()} />
          <JsonLd data={generateVideoSchema()} />
        </>
      )}
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // Docs are served from docs.ecf.mseller.app; ecf.mseller.app/docs only
  // redirects here, so it must not be the canonical host.
  const baseUrl = 'https://docs.ecf.mseller.app';
  const slug = params.slug?.join('/') ?? '';
  const pageUrl = slug ? `${baseUrl}/docs/${slug}` : `${baseUrl}/docs`;

  const title = page.data.seoTitle ?? page.data.title;

  return {
    title,
    description: page.data.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: page.data.description,
      url: pageUrl,
      type: 'article',
    },
  };
}
