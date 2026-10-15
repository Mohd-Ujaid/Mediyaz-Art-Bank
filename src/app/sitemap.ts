import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mediyazartbank.com";
  const currentDate = new Date();

  const routes = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/sperm-donation", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/egg-donation", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/for-donors", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/for-donors/become-a-sperm-donor", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/for-donors/become-an-egg-donor", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/for-donors/donor-compensation", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/for-donors/how-to-donate-eggs", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/for-donors/faqs", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/aspiring-parents", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/aspiring-parents/donors", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/donor-request", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/aspiring-parents/assurance-programs", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/aspiring-parents/financing", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/aspiring-parents/genetic-screening", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/aspiring-parents/faqs", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/clinics", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/clinics/become-partners", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/contacts", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/testimonials", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/inquiry", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/blogs", changeFrequency: "daily" as const, priority: 0.8 },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const dbBlogs = await Blog.find({
      $or: [{ published: true }, { status: "PUBLISHED" }],
    })
      .select("slug publishedAt updatedAt createdAt")
      .lean();

    blogEntries = dbBlogs.map((b: any) => ({
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: new Date(b.publishedAt || b.updatedAt || b.createdAt || currentDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Error generating blog sitemap from DB:", err);
  }

  return [...staticEntries, ...blogEntries];
}
