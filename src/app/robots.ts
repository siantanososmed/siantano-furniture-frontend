import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search"],
      },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    host: SITE_CONFIG.baseUrl,
  };
}
