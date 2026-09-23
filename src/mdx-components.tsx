import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Mermaid } from "@/components/mdx/mermaid";
import { Tabs, TabsContent } from "@/components/mdx/tabs";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    Step,
    Steps,
    Tabs,
    TabsContent,
    ...components,
  };
}
