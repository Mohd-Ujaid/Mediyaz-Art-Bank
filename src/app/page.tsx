import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import { ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

// Enable Incremental Static Regeneration (ISR) - caches page for 5 minutes
// Eliminates cold database roundtrips on slow mobile connections
export const revalidate = 300;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

async function getHomepageBlogs() {
  try {
    await connectToDatabase();
    // Projection: fetch only necessary lightweight fields for homepage cards
    const rawBlogs = await Blog.find({
      $or: [{ published: true }, { status: "PUBLISHED" }, { status: { $exists: false } }],
    })
      .select("title slug category coverImage image excerpt readTime publishedAt createdAt author")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(3)
      .lean();

    if (rawBlogs && rawBlogs.length > 0) {
      return rawBlogs.map((b: any) => {
        const plainContent = (b.content || "").replace(/<[^>]+>/g, " ").replace(/[\r\n]+/g, " ").trim();
        const excerpt =
          b.excerpt ||
          (plainContent.length > 170 ? plainContent.slice(0, 170) + "..." : plainContent) ||
          "Clinical guidance and regulatory information.";
        const wordCount = plainContent ? plainContent.split(/\s+/).length : 0;
        const readTime = b.readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        const coverImage = b.coverImage || b.image || "/img/home.webp";

        return {
          title: b.title,
          slug: b.slug,
          category: b.category,
          coverImage,
          excerpt,
          readTime,
          publishedAt: b.publishedAt || b.createdAt || new Date().toISOString(),
          author:
            typeof b.author === "object" && b.author?.name
              ? b.author
              : { name: "Mediyaz Clinical Editorial Board" },
        };
      });
    }
    return [];
  } catch (err) {
    console.error("Error loading homepage blogs from DB:", err);
    return [];
  }
}

export default async function HomePage() {
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

  const featuredArticles = await getHomepageBlogs();

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen relative top-0 pb-20 sm:pb-24">
        {/* Fixed Hero Background Image - Content scrolls over fixed image */}
        <div className="w-full h-full min-h-[100vh] fixed inset-0 z-[-1] overflow-hidden">
          <Image
            src="/img/hero.webp"
            alt="Mediyaz ART Bank - Intended Parents and Altruistic Donor Gamete Support"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        
        {/* Refined gradient scrim for optimal contrast and warmth */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-white/40 via-white/10 to-black/25 pointer-events-none" />

        <div className="relative z-2 max-w-[92.5rem] mx-auto px-6 sm:px-10 pt-28 sm:pt-36 lg:pt-44">
          
          {/* Statutory Credential Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#285b63]/25 text-[#285b63] text-xs font-bold tracking-wide shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#285b63]" />
              Assisted Reproductive Technology (Regulation) Act, 2021
            </span>
          </div>

          <h1
            className={`mt-2 text-3xl sm:text-5xl lg:text-[4rem] font-semibold text-[#1d3840] tracking-tight leading-[1.1] ${playfair.className} drop-shadow-xs max-w-3xl`}
          >
            The Registered ART Bank
          </h1>

          <p className="mt-4 text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed">
            Pioneering ethical, confidential, and fully compliant gamete banking services across India for intended parents, registered fertility clinics, and altruistic donors.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-stretch md:items-start w-full relative gap-6 sm:gap-8 lg:gap-10">
            
            {/* First Hero Card: Intending Parent */}
            <div className="w-full max-w-[24.5rem] mx-auto md:mx-0 text-center rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff7664]/60 flex flex-col justify-between group">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.85rem] font-medium text-[#1d3840] leading-snug mb-5 tracking-tight ${playfair.className}`}
                >
                  I am an Intending Parent
                </h2>

                <div className="max-w-[14.5rem] mx-auto">
                  <figure className="mx-auto mt-0 mb-5 w-full overflow-hidden rounded-full relative aspect-square ring-4 ring-[#ff7664]/20 shadow-md">
                    <Image
                      src="/img/aspiring_parent_3.3.webp"
                      alt="Intending Parent Support"
                      width={240}
                      height={240}
                      sizes="(max-width: 640px) 232px, 240px"
                      className="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>

                  <p className="text-slate-700 mb-5 text-center text-xs sm:text-sm leading-relaxed">
                    Whether you are starting your assisted reproduction journey or exploring donor gametes, <strong className="font-semibold text-[#1d3840]">Mediyaz ART Bank</strong> supports intending couples and women in full compliance with the ART (Regulation) Act, 2021. In partnership with your registered fertility clinic, we provide ethically screened donor sperm and donor oocytes with complete statutory anonymity and verified medical records.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-center justify-center pt-2">
                <Link
                  href="/aspiring-parents/donors"
                  className="flex-1 py-2.5 px-3 text-white bg-[#ff6b59] hover:bg-[#ff5242] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Find Your Donor
                </Link>
                <Link
                  href="/aspiring-parents"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Second Hero Card: Become a Donor */}
            <div className="w-full max-w-[24.5rem] mx-auto md:mx-0 text-center rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#d8b870] flex flex-col justify-between group">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.85rem] font-medium text-[#1d3840] leading-snug mb-5 tracking-tight ${playfair.className}`}
                >
                  I Want to Become a Donor
                </h2>

                <div className="max-w-[14.5rem] mx-auto">
                  <figure className="mx-auto mt-0 mb-5 w-full overflow-hidden rounded-full relative aspect-square ring-4 ring-[#e3c582]/35 shadow-md">
                    <Image
                      src="/img/find_donor_1.webp"
                      alt="Become an Altruistic Donor"
                      width={240}
                      height={240}
                      sizes="(max-width: 640px) 232px, 240px"
                      className="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>

                  <p className="text-slate-700 mb-5 text-center text-xs sm:text-sm leading-relaxed">
                    Bring hope to couples facing involuntary infertility. <strong className="font-semibold text-[#1d3840]">Mediyaz ART Bank</strong> welcomes eligible, healthy individuals for altruistic sperm and egg donation under the Assisted Reproductive Technology (Regulation) Act, 2021. Experience a structured, confidential, and medically supervised process with health screenings, statutory insurance coverage, and ethical care.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-center justify-center pt-2">
                <Link
                  href="/register"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-[#e3c582] hover:bg-[#d8b870] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Become a Donor
                </Link>
                <Link
                  href="/for-donors"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="z-1 block relative leading-6">
        
        {/* ================= SECTION ABOUT / WELCOME ================= */}
        <section
          className="
            bg-[#204850]
            relative
            py-16 sm:py-24 lg:py-28
            overflow-hidden
            content-auto
          "
        >
          <div className="z-1 relative mx-auto max-w-[92.5rem] px-6 sm:px-10">
            {/* Top right circular decorative image */}
            <figure className="hidden xl:block overflow-hidden aspect-square w-72 2xl:w-80 absolute -top-8 right-12 rounded-full shadow-2xl ring-4 ring-white/10 opacity-90 transition-transform duration-500 hover:scale-105 pointer-events-none">
              <Image
                src="/img/about_4.webp"
                alt="ART Bank Standards"
                width={320}
                height={320}
                loading="lazy"
                sizes="320px"
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Bottom left circular decorative image */}
            <figure className="hidden xl:block overflow-hidden aspect-square w-72 2xl:w-80 absolute -bottom-8 left-12 rounded-full shadow-2xl ring-4 ring-white/10 opacity-90 transition-transform duration-500 hover:scale-105 pointer-events-none">
              <Image
                src="/img/about-2.webp"
                alt="Clinical Safety"
                width={320}
                height={320}
                loading="lazy"
                sizes="320px"
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Centered White Welcome Card */}
            <div className="z-10 relative text-slate-800 bg-white max-w-[54rem] border border-slate-100 mx-auto py-10 sm:py-14 md:py-16 px-6 sm:px-12 md:px-16 rounded-[2rem] flex flex-col justify-center shadow-2xl">
              <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider mb-2">
                Statutory Reproductive Healthcare
              </span>
              <h2
                className={`mb-6 text-[#1d3840] ${playfair.className} text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight font-semibold tracking-tight`}
              >
                Welcome to <span className="font-bold text-[#285b63]">Mediyaz ART Bank</span>
              </h2>

              <p
                className={`mb-5 text-slate-600 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) Bank in India established under the Assisted Reproductive Technology (Regulation) Act, 2021. We operate to support intending couples, registered fertility clinics, and altruistic donors by providing medically screened donor semen and oocytes, advanced cryopreservation protocols, and transparent clinical coordination.
              </p>

              <p
                className={`text-slate-600 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Our mission is to uphold the highest standards of reproductive ethics, medical safety, and statutory compliance. From mandatory infectious disease screening and genetic carrier testing (including Thalassemia panels) to standardized 6-month semen quarantine, strict donor anonymity, and statutory insurance coverage for oocyte donors, we ensure every step of your journey is safe, responsible, and compliant with Indian law.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION STATS (TRUSTED NETWORK) ================= */}
        <section className="relative text-center bg-[#edf5f2] py-16 sm:py-20 px-6 block border-y border-slate-200/80 content-auto">
          <div className="max-w-[92.5rem] mx-auto">
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Pan-India Clinical Footprint
            </span>
            <h2
              className={`text-[#1d3840] text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              A Trusted ART Banking Network Across India
            </h2>

            <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-12 [&>li]:list-none [&>li]:w-[16rem] sm:[&>li]:w-[18rem] [&>li]:h-[14rem] sm:[&>li]:h-[16rem] [&>li]:flex [&>li]:flex-col [&>li]:justify-center [&>li]:items-center [&>li]:gap-3 sm:[&>li]:gap-4 [&>li]:rounded-3xl [&>li]:bg-white [&>li]:shadow-sm [&>li]:border [&>li]:border-slate-200/80 [&>li]:transition-all [&>li]:duration-300 hover:[&>li]:-translate-y-1.5 hover:[&>li]:shadow-xl">
              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  20k+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Donors
                </p>
              </li>

              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  100+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Partner ART <br /> Clinics
                </p>
              </li>

              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  25+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Years of Experience
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ================= SECTION CLINICAL GUIDANCE ================= */}
        <section className="py-16 sm:py-24 lg:py-28 px-6 bg-white block content-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 gap-12 lg:gap-16">
            <div className="w-full lg:max-w-[34rem]">
              <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
                Consultative Care
              </span>
              <h2
                className={`text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight mb-6 font-semibold ${playfair.className} text-[#1d3840] tracking-tight`}
              >
                Dedicated Clinical Guidance for Intending Parents &amp; Fertility Clinics
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  At Mediyaz ART Bank, we understand that assisted reproduction involves deeply personal medical decisions. In strict accordance with the Assisted Reproductive Technology (Regulation) Act, 2021, our experienced team provides clinical guidance to help intending parents and treating fertility specialists select compatible, thoroughly screened donor gametes.
                </p>
                <p>
                  Under Indian law, all gamete donations remain strictly anonymous. Intending parents and doctors can review comprehensive, non-identifying donor profiles—including physical traits, educational background, multi-generational medical history, and expanded genetic carrier screening panels.
                </p>
                <p>
                  Once donor gametes are requisitioned by your registered ART clinic, our cryo-logistics team delivers quarantined, temperature-monitored samples directly to your clinic&apos;s embryology laboratory in certified liquid nitrogen dry vapor shippers, ensuring full regulatory adherence and cold-chain integrity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/aspiring-parents"
                  className={`text-white inline-flex items-center justify-center text-xs sm:text-sm rounded-xl font-bold tracking-wide px-7 py-3 bg-[#ff6b59] transition duration-200 hover:bg-[#ff5242] shadow-xs hover:shadow-md active:scale-95 ${montserrat.className}`}
                >
                  Learn More
                </Link>
                <Link
                  href="/compliance"
                  className="text-xs font-bold text-[#1d3840] hover:text-[#285b63] transition-colors"
                >
                  Review Cold-Chain Protocols &rarr;
                </Link>
              </div>
            </div>

            <figure className="w-full lg:flex-1 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative">
              <Image
                src="/img/home1.webp"
                alt="Clinical Guidance & Quality Protocols"
                width={720}
                height={450}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 720px"
                className="w-full h-auto object-cover"
              />
            </figure>
          </div>
        </section>

        {/* ================= SECTION EXPERIENCES & CLINICAL JOURNEYS ================= */}
        <section className="relative text-center py-16 sm:py-24 px-6 bg-gradient-to-b from-[#fbf8f2] via-[#faf7f0] to-white block border-t border-slate-200/60 content-auto">
          <div
            className={`z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 text-center text-black ${montserrat.className}`}
          >
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Patient &amp; Donor Voices
            </span>
            <h2
              className={`text-[#1d3840] text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              Experiences &amp; Clinical Journeys
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[80rem] mx-auto mt-10 sm:mt-12">
              
              {/* Testimonial 1 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t1.webp"
                      alt="Intending Parents Feedback"
                      width={208}
                      height={208}
                      loading="lazy"
                      sizes="(max-width: 640px) 180px, 208px"
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;After struggling with severe male factor infertility, our reproductive specialist recommended donor insemination. Mediyaz ART Bank guided our clinic through the selection process. Having a donor with verified Thalassemia carrier clearance and complete semen quarantine gave us immense reassurance. Our healthy son was born last winter.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Ananya &amp; Vikram <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, New Delhi)</span>
                </cite>
              </div>

              {/* Testimonial 2 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t2.webp"
                      alt="Intending Couple Review"
                      width={208}
                      height={208}
                      loading="lazy"
                      sizes="(max-width: 640px) 180px, 208px"
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;Facing advanced maternal age, we required donor oocytes for our IVF treatment. Mediyaz ART Bank provided detailed, non-identifying clinical profiles matching our physical characteristics and blood group. The transparent process and legal adherence under the ART Act gave us absolute confidence at every step.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Meera &amp; Rajesh <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, Mumbai)</span>
                </cite>
              </div>

              {/* Testimonial 3 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t3.webp"
                      alt="Altruistic Egg Donor Experience"
                      width={208}
                      height={208}
                      loading="lazy"
                      sizes="(max-width: 640px) 180px, 208px"
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;As an ever-married mother of two choosing to donate eggs altruistically, the medical team treated me with utmost dignity. The clinical evaluations were thorough, the doctors explained every step of stimulation and retrieval, and the statutory health insurance coverage gave my family complete peace of mind.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Pooja M. <span className="font-normal text-slate-500 block text-xs mt-0.5">(Altruistic Egg Donor, Gurugram)</span>
                </cite>
              </div>

            </div>

            <div className="flex justify-center md:justify-start pt-12 sm:pt-14 relative max-w-[80rem] mx-auto">
              <Link
                href="/aspiring-parents"
                className="text-[#1d3840] font-bold text-sm sm:text-base underline underline-offset-4 hover:text-[#ff7468] transition inline-flex items-center gap-1.5"
              >
                Learn more about donor gamete access →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SECTION ARTICLES & RESOURCES ================= */}
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-6 bg-white block text-slate-900 border-t border-slate-200/60 content-auto">
          <div className="relative z-1 mx-auto max-w-[92.5rem] px-2 sm:px-8">
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Clinical Insights
            </span>
            <h2
              className={`text-[#1d3840] ${playfair.className} font-semibold text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight`}
            >
              Resources on Indian ART Regulations &amp; Gamete Banking
            </h2>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {featuredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group"
                >
                  <div>
                    <Link href={`/blogs/${article.slug}`} className="block overflow-hidden rounded-2xl bg-slate-100">
                      <div className="relative h-[13.5rem] w-full overflow-hidden">
                        <Image
                          src={article.coverImage || "/img/home.webp"}
                          alt={article.title}
                          width={480}
                          height={320}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="font-bold text-[#285b63] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] shadow-2xs border border-slate-200/50">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="mt-5">
                      <p className="text-xs text-slate-500 mb-2 flex items-center justify-between flex-wrap gap-1">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {article.readTime}
                        </span>
                      </p>

                      <h3 className={`text-lg sm:text-xl font-bold text-[#1d3840] leading-snug group-hover:text-[#ff7468] transition ${playfair.className}`}>
                        <Link href={`/blogs/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium truncate max-w-[60%]">
                      {article.author?.name ? article.author.name.split("&")[0].trim() : "Mediyaz Clinical"}
                    </span>
                    <Link
                      className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1 group-hover:translate-x-1 duration-200"
                      href={`/blogs/${article.slug}`}
                    >
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center rounded-xl border border-[#2b5860]/30 bg-white px-7 py-3.5 text-sm font-bold text-[#1d3840] hover:border-[#ff7468] hover:text-[#ff7468] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-2xs"
              >
                View all clinical articles &amp; regulatory guides →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
