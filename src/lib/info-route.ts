import type { Metadata } from "next";
import { INFO_PAGES, infoPageByPath } from "@/data/pages";
import { pageMetadata } from "./seo";

/** Helpers for optional catch-all routes that render INFO_PAGES under a prefix. */
export function infoParams(prefix: string) {
  return INFO_PAGES.filter((p) => p.path === prefix || p.path.startsWith(prefix + "/")).map((p) => ({
    slug: p.path === prefix ? [] : p.path.slice(prefix.length + 1).split("/"),
  }));
}

export const infoPath = (prefix: string, slug?: string[]) => (slug?.length ? `${prefix}/${slug.join("/")}` : prefix);

export function infoMetadata(path: string): Metadata {
  const p = infoPageByPath(path);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle, description: p.description, path: p.path, image: p.image });
}
