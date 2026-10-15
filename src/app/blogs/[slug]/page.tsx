import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  User, 
  Share2,
} from "lucide-react";
import BlogArticleClient from "./BlogArticleClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogData(slug: string) {
  try {
    await connectToDatabase();
    
    let rawBlog = await Blog.findOne({
      slug,
      $or: [{ published: true }, { status: "PUBLISHED" }, { status: { $exists: false } }],
    }).lean();

    if (!rawBlog) return null;

    const plainContent = ((rawBlog as any).content || "").replace(/<[^>]+>/g, " ").replace(/[\r\n]+/g, " ").trim();
    const excerpt =
      (rawBlog as any).excerpt ||
      (plainContent.length > 170 ? plainContent.slice(0, 170) + "..." : plainContent);
    const wordCount = plainContent ? plainContent.split(/\s+/).length : 0;
    const readTime = (rawBlog as any).readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
    const coverImage = (rawBlog as any).coverImage || (rawBlog as any).image || "/img/home.jpg";

    const blog = {
      ...(rawBlog as any),
      _id: (rawBlog as any)._id?.toString() || slug,
      coverImage,
      excerpt,
      readTime,
      publishedAt: (rawBlog as any).publishedAt || (rawBlog as any).createdAt || new Date().toISOString(),
      author:
        typeof (rawBlog as any).author === "object" && (rawBlog as any).author?.name
          ? (rawBlog as any).author
          : {
              name: "Mediyaz Clinical Editorial Board",
              role: "ART Clinical & Embryology Specialists",
              avatar: "/img/logo.webp",
            },
    };

    const rawRelated = await Blog.find({
      category: (blog as any).category,
      slug: { $ne: (blog as any).slug },
      $or: [{ published: true }, { status: "PUBLISHED" }, { status: { $exists: false } }],
    })
      .limit(3)
      .lean();

    const related = rawRelated.map((r: any) => ({
      title: r.title,
      slug: r.slug,
      category: r.category,
      coverImage: r.coverImage || r.image || "/img/home.jpg",
      excerpt: r.excerpt || (r.content ? r.content.replace(/<[^>]+>/g, " ").slice(0, 150) + "..." : ""),
      readTime: r.readTime || "5 min read",
      publishedAt: r.publishedAt || r.createdAt || new Date().toISOString(),
    }));

    return {
      blog: JSON.parse(JSON.stringify(blog)),
      related: JSON.parse(JSON.stringify(related)),
    };
  } catch (error) {
    console.error("Error retrieving blog from DB:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);
  if (!data || !data.blog) {
    return {
      title: "Article Not Found | Mediyaz ART Bank Blog",
    };
  }
  return {
    title: `${data.blog.title} | Mediyaz ART Bank`,
    description: data.blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data || !data.blog) {
    notFound();
  }

  const { blog, related } = data;

  return <BlogArticleClient blog={blog} related={related} />;
}

