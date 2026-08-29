import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  // siteUrl() falls back to localhost when NEXT_PUBLIC_SITE_URL is unset. A
  // deploy in that state is misconfigured, and the worst outcome is search
  // engines indexing it with unreachable canonical URLs — so refuse crawling
  // until the real origin is configured, rather than publishing nonsense.
  const configured = !base.includes("localhost");

  return {
    rules: configured
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(configured ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
