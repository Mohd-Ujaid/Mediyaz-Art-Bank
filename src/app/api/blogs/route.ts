import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // One-time initial seed if the database collection is completely empty
    const existingCount = await Blog.countDocuments();
    if (existingCount === 0) {
      const bulkOps = INITIAL_BLOG_POSTS.map((post) => ({
        updateOne: {
          filter: { slug: post.slug },
          update: {
            $set: {
              ...post,
              image: post.coverImage,
              status: "PUBLISHED",
              published: true,
              publishedAt: new Date(post.publishedAt),
            },
          },
          upsert: true,
        },
      }));
      await Blog.bulkWrite(bulkOps);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {
      $or: [
        { published: true },
        { status: "PUBLISHED" },
        { status: { $exists: false } },
      ],
    };

    if (category && category !== "All") {
      query.category = category;
    }

    const escapeRegex = (s: string) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (search && search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), "i");
      query.$and = [
        {
          $or: [
            { title: searchRegex },
            { excerpt: searchRegex },
            { tags: searchRegex },
          ],
        },
      ];
    }

    const rawBlogs = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    // Normalize article data so whether created in Admin or seed, it renders consistently
    const blogs = rawBlogs.map((b: any) => {
      const plainContent = (b.content || "").replace(/<[^>]+>/g, " ").replace(/[\r\n]+/g, " ").trim();
      const excerpt =
        b.excerpt ||
        (plainContent.length > 170 ? plainContent.slice(0, 170) + "..." : plainContent) ||
        "Clinical guidance and regulatory information.";
      const wordCount = plainContent ? plainContent.split(/\s+/).length : 0;
      const readTime = b.readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
      const coverImage = b.coverImage || b.image || "/img/home.jpg";

      return {
        ...b,
        _id: b._id.toString(),
        coverImage,
        excerpt,
        readTime,
        publishedAt: b.publishedAt || b.createdAt || new Date().toISOString(),
        author:
          typeof b.author === "object" && b.author?.name
            ? b.author
            : {
                name: "Mediyaz Clinical Editorial Board",
                role: "ART Clinical & Embryology Specialists",
                avatar: "/img/logo.webp",
              },
      };
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error: any) {
    console.error("Error fetching blogs from DB:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles from database" },
      { status: 500 }
    );
  }
}
