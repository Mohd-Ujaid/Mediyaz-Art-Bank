import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Ensure all defined blog posts exist and have updated WebP assets & author credentials
    const bulkSyncOps = INITIAL_BLOG_POSTS.map((post) => ({
      updateOne: {
        filter: { slug: post.slug },
        update: {
          $set: {
            coverImage: post.coverImage,
            image: post.coverImage,
            author: {
              name: "Mediyaz ART Bank",
              role: "Clinical Editorial Board",
              avatar: "/img/logo.webp",
            },
          },
          $setOnInsert: {
            title: post.title,
            slug: post.slug,
            category: post.category,
            readTime: post.readTime,
            excerpt: post.excerpt,
            tags: post.tags,
            content: post.content,
            status: "PUBLISHED",
            published: true,
            publishedAt: new Date(post.publishedAt),
          },
        },
        upsert: true,
      },
    }));
    await Blog.bulkWrite(bulkSyncOps);

    // Update all existing records to ensure consistent author credentials
    await Blog.updateMany(
      {},
      {
        $set: {
          "author.name": "Mediyaz ART Bank",
          "author.role": "Clinical Editorial Board",
          "author.avatar": "/img/logo.webp",
        },
      }
    );

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
      const rawCover = b.coverImage || b.image || "/img/home.webp";
      const coverImage = rawCover.startsWith("/img/blogs/") && rawCover.endsWith(".jpg")
        ? rawCover.replace(".jpg", ".webp")
        : rawCover;

      return {
        ...b,
        _id: b._id.toString(),
        coverImage,
        excerpt,
        readTime,
        publishedAt: b.publishedAt || b.createdAt || new Date().toISOString(),
        author: {
          name: "Mediyaz ART Bank",
          role: b.author?.role || "Clinical Editorial Board",
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
    console.error("Error fetching blogs from DB, using fallback:", error);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let fallback = INITIAL_BLOG_POSTS.map((b) => ({
      ...b,
      published: true,
      status: "PUBLISHED",
    }));

    if (category && category !== "All") {
      fallback = fallback.filter((b) => b.category === category);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      fallback = fallback.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: fallback.length,
      blogs: fallback,
    });
  }
}
