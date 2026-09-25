import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Check if collection is empty, auto-seed if needed
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("No blogs found in database. Auto-seeding initial clinical blogs...");
      await Blog.insertMany(
        INITIAL_BLOG_POSTS.map((post) => ({
          ...post,
          published: true,
          publishedAt: new Date(post.publishedAt),
        }))
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = { published: true };

    if (category && category !== "All") {
      query.category = category;
    }

    const escapeRegex = (s: string) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (search && search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), "i");
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { tags: searchRegex },
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error: any) {
    console.error("Error fetching blogs from DB:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch blogs from database",
      },
      { status: 500 }
    );
  }
}
