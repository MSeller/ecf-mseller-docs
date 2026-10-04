import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { AiBanner, AiSidebarCard } from '@/components/ai/ai-promo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AiBanner />
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        sidebar={{ banner: <AiSidebarCard /> }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
