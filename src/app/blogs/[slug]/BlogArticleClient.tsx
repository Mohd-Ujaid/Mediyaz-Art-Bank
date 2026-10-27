"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  User,
  ArrowRight,
  Share2,
  Check,
  BookOpen,
  List,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

interface BlogArticleClientProps {
  blog: {
    title: string;
    slug: string;
    category: string;
    readTime: string;
    excerpt: string;
    author?: {
      name: string;
      role: string;
      avatar?: string;
    };
    publishedAt: string;
    coverImage?: string;
    tags?: string[];
    content: string;
  };
  related?: Array<{
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishedAt: string;
    coverImage?: string;
  }>;
}

export default function BlogArticleClient({ blog, related }: BlogArticleClientProps) {
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Track active heading
      const headingElements = document.querySelectorAll("h2[id]");
      let currentActive = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) {
          currentActive = el.id;
        }
      });
      if (currentActive) {
        setActiveHeading(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(`${blog.title} - Read on Mediyaz ART Bank: ${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

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

  // Extract table of contents headings (from HTML or Markdown)
  const extractHeadings = (content: string) => {
    if (!content) return [];
    const headings: Array<{ id: string; text: string; level: number }> = [];

    const isHtml = /<(h[1-6]|p|blockquote|ul|ol|div)[^>]*>/i.test(content);
    if (isHtml) {
      const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const rawText = match[2].replace(/<[^>]+>/g, "").trim();
        const id = rawText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        if (rawText && id) {
          headings.push({ id, text: rawText, level });
        }
      }
      return headings;
    }

    const lines = content.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        headings.push({ id, text, level: 2 });
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        headings.push({ id, text, level: 3 });
      }
    });

    return headings;
  };

  const formatHtmlContent = (html: string) => {
    if (!html) return "";
    let processed = html;

    // Inject id and styling into h2 tags for Table of Contents linkage
    processed = processed.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<div class="pt-8 mb-4 border-t border-slate-100 first:border-t-0"><h2 id="${id}" class="scroll-mt-28 font-serif text-2xl sm:text-3xl font-bold text-[#1d3840] tracking-tight"${attrs}>${text}</h2></div>`;
    });

    // Inject id and styling into h3 tags
    processed = processed.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/gi, (match, attrs, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h3 id="${id}" class="scroll-mt-28 font-serif text-xl sm:text-2xl font-bold text-[#285b63] mt-7 mb-3 tracking-tight"${attrs}>${text}</h3>`;
    });

    return processed;
  };

  const headings = extractHeadings(blog.content);

  // Sanitize math/latex strings before markdown parsing
  const cleanMathSymbols = (text: string): string => {
    if (!text) return "";
    return text
      .replace(/\$\\ge\s*([0-9.]+)\\text\{\s*ng\/mL\}\$/g, "≥ $1 ng/mL")
      .replace(/\$\\ge\s*([0-9.]+)\$/g, "≥ $1")
      .replace(/\$\\le\s*([0-9.]+)\$/g, "≤ $1")
      .replace(/\$37(\.0)?\^\\circ\\text\{C\}\$/g, "37°C")
      .replace(/\$-196\^\\circ\\text\{C\}\$/g, "−196°C")
      .replace(/\$-78\.5\^\\circ\\text\{C\}\$/g, "−78.5°C")
      .replace(/\$-150\^\\circ\\text\{C\}\$/g, "−150°C")
      .replace(/\$20,000\^\\circ\\text\{C\}\$/g, "20,000°C")
      .replace(/\$E_2\$/g, "E₂ (Estradiol)")
      .replace(/\$([0-9.]+)\^\\circ\\text\{C\}\$/g, "$1°C");
  };

  // Parse inline markdown (**bold**, *italic*, `code`, [link](url))
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    if (!text) return "";
    const cleaned = cleanMathSymbols(text);
    const regex = /(\*\*[\s\S]+?\*\*|\*[^\s*][\s\S]*?[^\s*]\*|`[^`]+?`|\[[^\]]+?\]\([^)]+?\))/g;
    const parts = cleaned.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Bold **text**
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        const inner = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-[#1d3840]">
            {inner}
          </strong>
        );
      }

      // Italic *text*
      if (part.startsWith("*") && part.endsWith("*") && part.length >= 2 && !part.startsWith("**")) {
        const inner = part.slice(1, -1);
        return (
          <em key={index} className="italic text-slate-800">
            {inner}
          </em>
        );
      }

      // Inline code `text`
      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        const inner = part.slice(1, -1);
        return (
          <code key={index} className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-[#285b63] font-mono">
            {inner}
          </code>
        );
      }

      // Markdown links [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        return (
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#285b63] underline font-semibold hover:text-[#ff7468] transition"
          >
            {linkText}
          </a>
        );
      }

      return part;
    });
  };

  // Markdown Parser with Alerts & Enhanced Typography
  const renderRichContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let currentListItems: React.ReactNode[] = [];
    let isOrderedList = false;
    let keyIdx = 0;

    const flushList = () => {
      if (currentListItems.length > 0) {
        if (isOrderedList) {
          elements.push(
            <ol key={`ol-${keyIdx++}`} className="list-decimal pl-6 mb-6 space-y-2 text-slate-700 text-base sm:text-[17px] leading-relaxed">
              {currentListItems}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${keyIdx++}`} className="list-disc pl-6 mb-6 space-y-2 text-slate-700 text-base sm:text-[17px] leading-relaxed">
              {currentListItems}
            </ul>
          );
        }
        currentListItems = [];
        isOrderedList = false;
      }
    };

    const flushParagraph = () => {
      flushList();
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p key={`p-${keyIdx++}`} className="text-base sm:text-[17px] leading-relaxed text-slate-700 mb-6 font-normal">
              {renderInlineMarkdown(text)}
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
        const text = line.replace("## ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        elements.push(
          <div key={`h2-wrap-${keyIdx++}`} className="pt-8 mb-4 border-t border-slate-100 first:border-t-0">
            <h2 id={id} className="scroll-mt-28 font-serif text-2xl sm:text-3xl font-bold text-[#1d3840] tracking-tight">
              {renderInlineMarkdown(text)}
            </h2>
          </div>
        );
      } else if (line.startsWith("### ")) {
        flushParagraph();
        elements.push(
          <h3 key={`h3-${keyIdx++}`} className="font-serif text-xl sm:text-2xl font-bold text-[#285b63] mt-7 mb-3 tracking-tight">
            {renderInlineMarkdown(line.replace("### ", "").trim())}
          </h3>
        );
      } else if (line.startsWith("> [!NOTE]")) {
        flushParagraph();
        let alertBody = "";
        i++;
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          alertBody += " " + lines[i].replace(/^>\s*/, "").trim();
          i++;
        }
        elements.push(
          <div key={`note-${keyIdx++}`} className="my-6 p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3.5 shadow-2xs">
            <Info className="w-5 h-5 text-[#285b63] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-teal-900 leading-relaxed font-medium">
              <strong className="block text-[#1d3840] mb-0.5">Clinical Note</strong>
              {renderInlineMarkdown(alertBody.trim())}
            </div>
          </div>
        );
      } else if (line.startsWith("> [!IMPORTANT]") || line.startsWith("> [!WARNING]")) {
        flushParagraph();
        let alertBody = "";
        i++;
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          alertBody += " " + lines[i].replace(/^>\s*/, "").trim();
          i++;
        }
        elements.push(
          <div key={`important-${keyIdx++}`} className="my-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3.5 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              <strong className="block text-amber-900 mb-0.5">Statutory Requirement (ART Act 2021)</strong>
              {renderInlineMarkdown(alertBody.trim())}
            </div>
          </div>
        );
      } else if (line.startsWith("> [!TIP]")) {
        flushParagraph();
        let alertBody = "";
        i++;
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          alertBody += " " + lines[i].replace(/^>\s*/, "").trim();
          i++;
        }
        elements.push(
          <div key={`tip-${keyIdx++}`} className="my-6 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3.5 shadow-2xs">
            <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              <strong className="block text-emerald-900 mb-0.5">Specialist Recommendation</strong>
              {renderInlineMarkdown(alertBody.trim())}
            </div>
          </div>
        );
      } else if (line.startsWith("> ")) {
        flushParagraph();
        elements.push(
          <blockquote key={`bq-${keyIdx++}`} className="p-5 my-6 border border-slate-200/80 bg-[#edf3f1]/40 rounded-2xl italic text-sm sm:text-base text-[#1d3840] leading-relaxed">
            {renderInlineMarkdown(line.replace(/^>\s+/, ""))}
          </blockquote>
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        if (currentParagraph.length > 0) flushParagraph();
        if (isOrderedList && currentListItems.length > 0) flushList();
        isOrderedList = false;
        currentListItems.push(
          <li key={`li-${keyIdx++}`} className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
          </li>
        );
      } else if (/^\d+\.\s+/.test(line)) {
        if (currentParagraph.length > 0) flushParagraph();
        if (!isOrderedList && currentListItems.length > 0) flushList();
        isOrderedList = true;
        currentListItems.push(
          <li key={`num-li-${keyIdx++}`} className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            {renderInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
          </li>
        );
      } else if (line === "---") {
        flushParagraph();
        elements.push(<hr key={`hr-${keyIdx++}`} className="my-8 border-t border-slate-200/80" />);
      } else {
        flushList();
        currentParagraph.push(line);
      }
    }
    flushParagraph();

    return elements;
  };

  return (
    <>
      <div className="min-h-screen bg-[#fafbfc] pt-6 sm:pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Navigation Bar */}
          <div className="flex items-center justify-between py-4 mb-6 border-b border-slate-200/70 text-xs flex-wrap gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-bold text-[#285b63] hover:text-[#ff7468] transition"
            >
              <ArrowLeft className="w-4 h-4" /> All Clinical Articles
            </Link>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-[#285b63] hover:text-[#285b63] transition shadow-2xs font-semibold cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Link"}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs font-semibold cursor-pointer"
                title="Share on WhatsApp"
              >
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Article Content (8 cols) */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-xs">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="rounded-full bg-[#edf3f1] px-3.5 py-1 text-xs font-bold text-[#285b63]">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {blog.readTime}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(blog.publishedAt)}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#1d3840] mb-6 tracking-tight">
                {blog.title}
              </h1>

              {/* Summary Lead Excerpt */}
              <div className="text-base sm:text-lg text-slate-700 leading-relaxed italic border border-slate-200/80 p-5 mb-8 bg-[#edf3f1]/40 rounded-2xl">
                {renderInlineMarkdown(blog.excerpt)}
              </div>

              {/* Author Attribution Card */}
              <div className="flex items-center justify-between p-4 mb-8 rounded-2xl bg-slate-50 border border-slate-100 flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-8 relative flex items-center">
                    <Image
                      src="/img/logo.webp"
                      alt="Mediyaz ART Bank"
                      width={160}
                      height={48}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <div className="h-5 w-px bg-slate-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-sm font-bold text-[#1d3840]">
                      Published by Mediyaz ART Bank
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {blog.author?.role || "Clinical Editorial & ART Compliance Board"}
                    </p>
                  </div>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="relative w-full h-64 sm:h-80 md:h-[380px] rounded-2xl overflow-hidden mb-10 border border-slate-200/80 shadow-md">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Formatted Article Body */}
              <div className="article-body">
                {/<(h[1-6]|p|blockquote|ul|ol|div)[^>]*>/i.test(blog.content) ? (
                  <div
                    className="prose prose-slate max-w-none text-slate-700 leading-relaxed [&>p]:text-base [&>p]:sm:text-[17px] [&>p]:leading-relaxed [&>p]:text-slate-700 [&>p]:mb-6 [&>ul]:space-y-3 [&>ul]:mb-6 [&>ul]:pl-5 [&>ul]:list-disc [&>ol]:space-y-3 [&>ol]:mb-6 [&>ol]:pl-5 [&>ol]:list-decimal [&>li]:leading-relaxed [&>blockquote]:my-6 [&>blockquote]:rounded-r-xl"
                    dangerouslySetInnerHTML={{ __html: formatHtmlContent(blog.content) }}
                  />
                ) : (
                  renderRichContent(blog.content)
                )}
              </div>

              {/* Clinical Disclaimers */}
              <div className="mt-12 p-6 rounded-2xl bg-[#edf3f1]/90 border border-[#285b63]/25 flex items-start gap-3.5 text-xs text-[#285b63] leading-relaxed">
                <ShieldCheck className="w-6 h-6 text-[#285b63] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1d3840] text-sm mb-1">Mediyaz ART Bank Clinical & Statutory Advisory</p>
                  <p className="text-slate-600 leading-relaxed">
                    This publication is prepared by registered medical embryologists and legal counsels in accordance with the Assisted Reproductive Technology (Regulation) Act, 2021. Information presented herein is for clinical education and regulatory transparency. For personalized reproductive consultations or donor allocations, contact our clinical operations desk.
                  </p>
                </div>
              </div>

              {/* Bottom Quick Navigation */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#285b63] hover:bg-[#1d454c] text-white text-xs font-bold py-2.5 px-5 transition duration-150 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
                </Link>

                <Link
                  href="/inquiry"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff7468] hover:bg-[#e8564a] text-white text-xs font-bold py-2.5 px-5 transition duration-150 shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Pre-Screening Inquiry</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </article>

            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Sticky Table of Contents */}
              {headings.length > 0 && (
                <div className="sticky top-36 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-[#1d3840] font-serif font-bold text-base">
                    <List className="w-4 h-4 text-[#285b63]" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-2">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-xs leading-snug py-1.5 px-2.5 rounded-lg transition-all duration-150 ${
                          activeHeading === h.id
                            ? "bg-[#285b63] text-white font-bold translate-x-1"
                            : "text-slate-600 hover:text-[#285b63] hover:bg-[#edf3f1]"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>

                  {/* Contextual Action Card inside Sidebar */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#285b63] to-[#1d3840] text-white">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e3c582] uppercase tracking-wider mb-2">
                        <ShieldCheck className="w-3.5 h-3.5" /> Altruistic Registry
                      </div>
                      <h4 className="font-serif text-sm font-bold leading-snug mb-2">
                        Considering Becoming an Altruistic Egg Donor?
                      </h4>
                      <p className="text-[11px] text-slate-200 leading-relaxed mb-4">
                        Experience a safe, confidential, and legally protected donation process with comprehensive health insurance.
                      </p>
                      <Link
                        href="/register/egg"
                        className="inline-block w-full text-center py-2 px-3 rounded-xl bg-[#e3c582] hover:bg-[#d8b870] text-[#1d3840] text-xs font-bold transition shadow-xs"
                      >
                        Start Pre-Screening
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </aside>

          </div>

          {/* Related Articles Carousel / Grid */}
          {related && related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#285b63]">Keep Reading</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d3840] mt-1">
                    Related Clinical Publications
                  </h3>
                </div>
                <Link
                  href="/blogs"
                  className="text-xs font-bold text-[#ff7468] hover:underline flex items-center gap-1"
                >
                  View All 13 Topics <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blogs/${item.slug}`}
                    className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285b63]/40 transition duration-300"
                  >
                    <div>
                      <div className="relative w-full h-40 overflow-hidden bg-slate-100">
                        <Image
                          src={item.coverImage || "/img/home.jpg"}
                          alt={item.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 350px"
                        />
                        <div className="absolute top-2.5 left-2.5 z-1">
                          <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-[#285b63] shadow-2xs">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.readTime}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1d3840] group-hover:text-[#ff7468] transition mt-1.5 mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-[#ff7468] font-bold border-t border-slate-50 pt-3">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
