import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  User, 
  ArrowRight,
  Share2
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogData(slug: string) {
  try {
    await connectToDatabase();
    
    // Auto-seed if database has 0 blogs
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(
        INITIAL_BLOG_POSTS.map((p) => ({
          ...p,
          published: true,
          publishedAt: new Date(p.publishedAt),
        }))
      );
    }

    const blog = await Blog.findOne({ slug, published: true }).lean();
    if (!blog) return null;

    const related = await Blog.find({
      category: blog.category,
      slug: { $ne: blog.slug },
      published: true,
    })
      .limit(3)
      .select("title slug excerpt category readTime publishedAt coverImage")
      .lean();

    return {
      blog: JSON.parse(JSON.stringify(blog)),
      related: JSON.parse(JSON.stringify(related)),
    };
  } catch (error) {
    console.error("Error retrieving blog:", error);
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

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to render content blocks
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let keyIdx = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p key={`p-${keyIdx++}`} className="text-sm sm:text-base leading-relaxed text-[#444] mb-5">
              {text}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        flushParagraph();
        continue;
      }

      if (line.startsWith("## ")) {
        flushParagraph();
        elements.push(
          <h2 key={`h2-${keyIdx++}`} className="font-serif text-2xl sm:text-3xl font-bold text-[#1d3840] mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushParagraph();
        elements.push(
          <h3 key={`h3-${keyIdx++}`} className="font-serif text-lg sm:text-xl font-bold text-[#285b63] mt-6 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        flushParagraph();
        elements.push(
          <li key={`li-${keyIdx++}`} className="text-xs sm:text-sm text-[#444] leading-relaxed ml-5 list-disc mb-2">
            {line.replace(/^[-*]\s+/, "")}
          </li>
        );
      } else if (line.startsWith("> ")) {
        flushParagraph();
        elements.push(
          <blockquote key={`bq-${keyIdx++}`} className="p-4 sm:p-5 my-5 border-l-4 border-[#285b63] bg-[#edf3f1]/60 rounded-r-xl italic text-xs sm:text-sm text-[#285b63] leading-relaxed">
            {line.replace(/^>\s+/, "")}
          </blockquote>
        );
      } else if (line === "---") {
        flushParagraph();
        elements.push(
          <hr key={`hr-${keyIdx++}`} className="my-8 border-t border-gray-200" />
        );
      } else {
        currentParagraph.push(line);
      }
    }
    flushParagraph();

    return elements;
  };

  return (
    <main className="min-h-screen bg-[#fafbfc] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Breadcrumbs */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#285b63] hover:text-[#ff7468] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-[#edf3f1] px-3.5 py-1 text-xs font-bold text-[#285b63]">
                {blog.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {blog.readTime}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(blog.publishedAt)}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[#1d3840] mb-5 tracking-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic border-l-4 border-[#ff7468] pl-4 py-2 mb-6 bg-[#ff7468]/5 rounded-r-2xl">
              {blog.excerpt}
            </p>

            {/* Author Byline */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#285b63]/10 flex items-center justify-center text-[#285b63] font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#1d3840]">
                    {blog.author?.name || "Mediyaz Clinical Editorial Board"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {blog.author?.role || "ART Clinical & Embryology Specialists"}
                  </p>
                </div>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Featured Cover Image */}
          {blog.coverImage && (
            <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-md">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">
            {renderContent(blog.content)}
          </div>

          {/* Statutory Advisory Callout */}
          <div className="mt-10 p-5 rounded-2xl bg-[#edf3f1]/80 border border-[#285b63]/20 flex items-start gap-3 text-xs text-[#285b63] leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#285b63] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#1d3840] mb-0.5">Statutory Clinical Notice (ART Act 2021)</p>
              <p className="text-slate-600">
                Articles published by Mediyaz ART Bank are strictly for clinical education, statutory awareness, and general guidance under the Assisted Reproductive Technology (Regulation) Act, 2021. For patient-specific diagnosis or fertility protocols, consult a registered Level 2 ART clinical specialist.
              </p>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-[#285b63] hover:bg-[#1d454c] text-white text-xs font-bold py-2.5 px-5 transition duration-150 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
            </Link>

            <Link
              href="/inquiry"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7468] hover:underline"
            >
              Pre-Screening Inquiry <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </article>

        {/* Related Articles Section */}
        {related && related.length > 0 && (
          <section className="mt-14">
            <h3 className="font-serif text-2xl font-bold text-[#1d3840] mb-6">
              Related Clinical Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item: any) => (
                <Link
                  key={item.slug}
                  href={`/blogs/${item.slug}`}
                  className="group block rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285b63]/40 transition duration-300"
                >
                  <div className="relative w-full h-36 overflow-hidden bg-slate-100">
                    <Image
                      src={item.coverImage || "/img/home.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#285b63] bg-[#edf3f1] px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#1d3840] group-hover:text-[#ff7468] transition mt-2 mb-1.5 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>
                    <span className="text-xs font-bold text-[#ff7468] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
