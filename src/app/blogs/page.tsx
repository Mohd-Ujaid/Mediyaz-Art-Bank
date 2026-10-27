"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, Calendar, ArrowRight, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { INITIAL_BLOG_POSTS } from "@/lib/blogs-data";

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
}

const categories = [
  "All",
  "Clinical Procedures",
  "Embryo & Cryopreservation",
  "Egg Donation Guide",
  "Legal & Regulatory",
  "Donor Care & Health",
  "Clinical Quality & Screening",
];

export default function BlogsPage() {
  // Pre-seed articles directly from INITIAL_BLOG_POSTS for instant, zero-delay initial render
  const [blogs, setBlogs] = useState<BlogPost[]>(() =>
    INITIAL_BLOG_POSTS.map((b) => ({
      title: b.title,
      slug: b.slug,
      category: b.category,
      readTime: b.readTime,
      excerpt: b.excerpt,
      author: {
        name: "Mediyaz ART Bank",
        role: "",
        avatar: "/img/logo.webp",
      },
      publishedAt: b.publishedAt,
      coverImage: b.coverImage,
      tags: b.tags,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Stale-while-revalidate pattern: fetch latest from DB silently in background
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        setBlogs(data.blogs);
      }
    } catch (err: any) {
      console.warn("Background blog sync warning:", err);
      if (blogs.length === 0) {
        setError(err.message || "Unable to connect to articles database.");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

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

  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/home.jpg"
            alt="Mediyaz ART Bank Blog"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/90" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-7 pb-8 sm:px-8 sm:pt-9 sm:pb-10 md:px-10 lg:px-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#285b63]/10 text-[#285b63] text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Clinical Publications &amp; Regulatory Insights
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Clinical Blog &amp; Insights
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#555] max-w-2xl leading-relaxed">
            Expert articles on Assisted Reproductive Technology (ART) regulations, gamete cryopreservation protocols, donor health safeguards, and genetic screening in India.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-8 sm:py-14 md:px-10 lg:px-16">
        {/* Search and Category Filter Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-200/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#285b63] text-white shadow-xs"
                    : "bg-[#edf3f1] text-[#285b63] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by topic, keyword, or treatment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-8 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#285b63] focus:ring-2 focus:ring-[#285b63]/20 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skeleton Loading State */}
        {loading && <BlogSkeleton />}

        {/* Error State */}
        {!loading && error && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Failed to load articles</h3>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#285b63] text-white text-xs font-bold shadow-xs hover:bg-[#1f484e] transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg font-serif text-[#285b63]">
              No articles found matching &ldquo;{searchQuery || selectedCategory}&rdquo;
            </p>
            <p className="text-xs text-gray-400 mt-1">Try refining your search terms or choosing a different category.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-xl bg-[#ff7468] hover:bg-[#ff5d50] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Article Cards Grid & Featured Spotlight */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="mt-8 space-y-10">
            {/* Featured Article Spotlight (when viewing 'All' and no search filter) */}
            {selectedCategory === "All" && !searchQuery && filteredPosts.length > 0 && (
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1d3840] via-[#285b63] to-[#1d3840] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#285b63]/30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#e3c582] px-3.5 py-1 text-xs font-black text-[#1d3840] uppercase tracking-wider">
                        Featured Publication
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                        {filteredPosts[0].category}
                      </span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {filteredPosts[0].readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white tracking-tight">
                      <Link href={`/blogs/${filteredPosts[0].slug}`} className="hover:text-[#e3c582] transition">
                        {filteredPosts[0].title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-200 line-clamp-3 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>

                    <div className="pt-2 flex items-center gap-4 flex-wrap">
                      <Link
                        href={`/blogs/${filteredPosts[0].slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#e3c582] hover:bg-[#d8b870] text-[#1d3840] text-xs font-bold py-3 px-6 transition duration-150 shadow-md hover:-translate-y-0.5"
                      >
                        Read Full Guide <ArrowRight className="w-4 h-4" />
                      </Link>
                      <span className="text-xs text-slate-300">
                        Updated {formatDate(filteredPosts[0].publishedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                      <Image
                        src={filteredPosts[0].coverImage || "/img/home.jpg"}
                        alt={filteredPosts[0].title}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 450px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of articles */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(selectedCategory === "All" && !searchQuery ? filteredPosts.slice(1) : filteredPosts).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition duration-300 hover:-translate-y-1.5 hover:border-[#285b63]/50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#285b63]/20"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                      <Image
                        src={post.coverImage || "/img/home.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3.5 left-3.5 z-1">
                        <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 font-bold text-xs text-[#285b63] shadow-xs border border-slate-200/50">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#1d3840] transition group-hover:text-[#ff7468]">
                        {post.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs border-t border-slate-100 pt-4 mt-2">
                    <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285b63]"></span>
                      Mediyaz ART Bank
                    </span>
                    <span className="font-bold text-[#ff7468] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function BlogSkeleton() {
  return (
    <div className="mt-8 space-y-10 animate-pulse">
      {/* Featured Banner Skeleton */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-100/90 border border-slate-200 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-36 rounded-full bg-slate-200" />
              <div className="h-6 w-28 rounded-full bg-slate-200" />
              <div className="h-6 w-20 rounded-full bg-slate-200" />
            </div>
            <div className="h-9 w-4/5 rounded-xl bg-slate-200" />
            <div className="h-9 w-2/3 rounded-xl bg-slate-200" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>
            <div className="pt-2 h-11 w-40 rounded-xl bg-slate-200" />
          </div>
          <div className="lg:col-span-5 h-64 lg:h-72 rounded-2xl bg-slate-200" />
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs"
          >
            <div>
              <div className="w-full h-48 sm:h-52 bg-slate-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-5 w-5/6 rounded bg-slate-200" />
                <div className="h-5 w-3/5 rounded bg-slate-200" />
                <div className="space-y-1.5 pt-2">
                  <div className="h-3.5 w-full rounded bg-slate-100" />
                  <div className="h-3.5 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}