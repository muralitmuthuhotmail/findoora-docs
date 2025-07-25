import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/", "/_next/", "/admin/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
