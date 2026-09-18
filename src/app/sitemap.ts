import { source } from "@/lib/source";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://docs.ecf.mseller.app";

  // Get all documentation pages
  const pages = source.getPages();

  const docUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.url === "/docs" ? 1.0 : page.url.includes("certification") ? 0.95 : 0.8,
  }));

  // The docs index (/docs) is already one of the pages; "/" is only a rewrite
  // of it, so it is not listed separately.
  return docUrls;
}
