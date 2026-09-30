"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, Calendar, ArrowRight, Loader2, BookOpen, AlertCircle, RefreshCw } from "lucide-react";

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
  "Legal & Regulatory",
  "Genetic Health",
  "Intending Parents",
  "Donor Care & Insurance",
  "Clinical Quality",
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        throw new Error(data.error || "Failed to load articles");
      }
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Unable to connect to articles database.");
    } finally {
      setLoading(false);
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
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
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

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap">
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
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by topic, keyword, or law..."
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

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center">
            <Loader2 className="w-9 h-9 text-[#285b63] animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium text-[#285b63]">Fetching articles from database...</p>
          </div>
        )}

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

        {/* Article Cards Grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs transition duration-300 hover:-translate-y-1.5 hover:border-[#285b63]/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#285b63]/20"
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

                    <h2 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#285b63] transition group-hover:text-[#ff7468]">
                      {post.title}
                    </h2>

                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs border-t border-slate-100 pt-4 mt-2">
                  <span className="text-slate-500 text-[11px] font-medium">
                    {post.author?.name ? post.author.name.split("&")[0].trim() : "Mediyaz Clinical"}
                  </span>
                  <span className="font-bold text-[#ff7468] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}