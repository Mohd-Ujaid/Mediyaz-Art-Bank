import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mediyazartbank.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/uploads/",
          "/register",
          "/login",
          "/dashboard",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
