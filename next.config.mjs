import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/",
        destination: "/docs",
        locale: false,
      },
      // Plain-Markdown version of each page for LLM agents.
      { source: "/docs.md", destination: "/llms.mdx" },
      { source: "/docs/:path*.md", destination: "/llms.mdx/:path*" },
    ];
  },
};

export default withMDX(config);
