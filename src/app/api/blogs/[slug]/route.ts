import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    let blog: any = null;

    try {
      await connectToDatabase();
      blog = await Blog.findOne({
        slug,
        $or: [{ published: true }, { status: "PUBLISHED" }, { status: { $exists: false } }],
      }).lean();
    } catch (dbErr) {
      console.warn("DB connection warning in single blog API:", dbErr);
    }

    if (!blog) {
      blog = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Article not found." },
        { status: 404 }
      );
    }

    // Optionally fetch related articles in the same category
    const related = await Blog.find({
      category: blog.category,
      slug: { $ne: blog.slug },
      published: true,
    })
      .limit(3)
      .select("title slug excerpt category readTime publishedAt coverImage")
      .lean();

    return NextResponse.json({
      success: true,
      blog,
      related,
    });
  } catch (error: any) {
    console.error("Error fetching single blog from DB:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
