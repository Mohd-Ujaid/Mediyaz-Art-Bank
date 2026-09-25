"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Building2, 
  Users, 
  Sparkles, 
  ArrowRight,
  Filter
} from "lucide-react";

interface Testimonial {
  id: string;
  category: "parents" | "clinics" | "donors";
  categoryLabel: string;
  quote: string;
  author: string;
  identity: string;
  location: string;
  date: string;
  rating: number;
  highlight: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    category: "parents",
    categoryLabel: "Intended Parents",
    highlight: "Healthy Twins After 6 Years of Waiting",
    quote:
      "After multiple failed cycles elsewhere, our fertility specialist recommended Mediyaz ART Bank for donor oocytes. The phenotypic matching was remarkably detailed, and having a full Beta-Thalassemia and genetic carrier report gave us absolute peace of mind. Today, we are blessed with healthy twins. The level of professionalism, legal clarity, and donor health verification is truly unmatched in India.",
    author: "Sneha & Rahul M.",
    identity: "Intended Parents (Verified)",
    location: "Mumbai, Maharashtra",
    date: "August 2026",
    rating: 5,
    avatar: "/img/t1.jpg",
  },
  {
    id: "t2",
    category: "clinics",
    categoryLabel: "IVF & Fertility Clinic",
    highlight: "Consistent Post-Thaw Motility & Zero Compliance Friction",
    quote:
      "As a clinical embryologist managing hundreds of ICSI cycles annually, sample consistency is paramount. Mediyaz donor semen straws feature superior post-thaw progressive motility (>45%) consistently. More importantly, their digital adherence to the ART Act 2021—from 180-day cryogenic quarantine documentation to National Registry compliance—makes audits effortless for our center.",
    author: "Dr. Ananya Sen, MD",
    identity: "Chief Embryologist, Nova Fertility Care",
    location: "Bengaluru, Karnataka",
    date: "July 2026",
    rating: 5,
    avatar: "/img/t2.jpg",
  },
  {
    id: "t3",
    category: "donors",
    categoryLabel: "Altruistic Donor",
    highlight: "Respectful Care & Complete Statutory Insurance",
    quote:
      "Deciding to become an egg donor was a meaningful personal choice. The medical team at Mediyaz treated me with immense dignity. Every ultrasound was explained patiently, the 12-month health insurance was handed over prior to stimulation, and retrieval was smooth with quick recovery. I felt protected, valued, and respected every step of the journey.",
    author: "Pooja V.",
    identity: "Verified Egg Donor",
    location: "Pune, Maharashtra",
    date: "June 2026",
    rating: 5,
    avatar: "/img/t3.jpg",
  },
  {
    id: "t4",
    category: "parents",
    categoryLabel: "Intended Parents",
    highlight: "Transparent Genetic Screening & Complete Confidentiality",
    quote:
      "We were nervous about donor anonymity and legal parentage. The legal counseling provided through Mediyaz clearly explained Sections 27 and 31 of the ART Act 2021. Reviewing the donor's multigenerational health pedigree gave us total confidence. Our baby girl is now 4 months old, and we will forever be grateful for Mediyaz's ethical commitment.",
    author: "Aakash & Neha T.",
    identity: "Intended Parents (Verified)",
    location: "New Delhi",
    date: "May 2026",
    rating: 5,
    avatar: "/img/testimonial-1.png",
  },
  {
    id: "t5",
    category: "clinics",
    categoryLabel: "IVF & Fertility Clinic",
    highlight: "Dependable Liquid Nitrogen Dry Shipper Logistics",
    quote:
      "Timely delivery in validated cryogenic vapor-phase shippers is crucial for embryo synchronization. Mediyaz has never missed a requisition window. Every vial arrives with continuous temperature data loggers and tamper-evident seals. They are our premier ART banking partner.",
    author: "Dr. K. R. Nambiar",
    identity: "Director, LifeBridge Reproductive Medicine",
    location: "Chennai, Tamil Nadu",
    date: "April 2026",
    rating: 5,
    avatar: "/img/testimonial-2.png",
  },
  {
    id: "t6",
    category: "donors",
    categoryLabel: "Altruistic Donor",
    highlight: "Transparent Pre-Screening & Professional Ethics",
    quote:
      "The pre-donation health checkup was thorough—including blood panels, ultrasound, and genetic counseling. The staff made sure I fully understood the altruistic nature and legal protections before giving my formal consent. It is rare to see an organization that prioritizes donor well-being as strictly as Mediyaz.",
    author: "Sunita D.",
    identity: "Verified Egg Donor",
    location: "Hyderabad, Telangana",
    date: "March 2026",
    rating: 5,
    avatar: "/img/testimonial-3.png",
  },
];

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "parents" | "clinics" | "donors">("all");

  const filtered = TESTIMONIALS.filter(
    (t) => activeTab === "all" || t.category === activeTab
  );

  return (
    <main className="w-full overflow-hidden bg-white text-[#414141]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/home.jpg"
            alt="Mediyaz ART Bank Testimonials"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-16 md:px-10 md:pt-16 md:pb-20 lg:px-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff2f0] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#ff7468]">
              <Sparkles className="h-3.5 w-3.5" />
              Verified Experiences
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
              Stories of Hope, Trust &amp; Clinical Excellence
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#555]">
              Discover how intended parents, leading ART reproductive clinics, and altruistic donors experience compassionate care, statutory protection, and scientific rigor with Mediyaz ART Bank.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>100% Verified Clinical Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#ff7468]" />
                <span>Confidential &amp; Anonymity Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KEY STATS BAR ================= */}
      <section className="border-y border-slate-100 bg-[#fff9f8] py-8">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1d3840]">5,000+</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Families Assisted</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#ff7468]">100+</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Partner IVF Centers</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1d3840]">99.8%</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Post-Thaw Viability Rate</p>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#ff7468]">100%</div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">ART Act 2021 Compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERABLE TESTIMONIALS SECTION ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-24 lg:px-16">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { key: "all", label: "All Testimonials" },
            { key: "parents", label: "Intending Parents" },
            { key: "clinics", label: "Fertility Clinics & Doctors" },
            { key: "donors", label: "Altruistic Donors" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#1d3840] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#ff7468]/30"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block rounded-full bg-[#fff2f0] px-3 py-1 text-[11px] font-bold text-[#ff7468]">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1d3840] leading-snug">
                  "{item.highlight}"
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1d3840]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.identity} • {item.location}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLINICAL QUALITY SPOTLIGHT ================= */}
      <section className="bg-slate-50/80 py-16 sm:py-20 border-t border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                Laboratory Assurance
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#1d3840]">
                Why Fertility Specialists Trust Mediyaz ART Bank
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Fertility treatment outcomes hinge on gamete viability, normal chromosomal karyotype, and absence of infectious contaminants. Every sample released by Mediyaz meets stringent international embryology thresholds:
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>&gt; 45% post-thaw progressive sperm motility</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Automated CASA morphology verification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>180-day serological window re-test release</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>ISO Class 5 clean air handling environments</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/clinics"
                  className="inline-flex items-center rounded-lg bg-[#1d3840] px-5 py-3 text-sm font-semibold text-white hover:bg-[#285d64] transition"
                >
                  Partner With Us (Clinics)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Learn About Our Laboratory
                </Link>
              </div>
            </div>

            <div className="relative h-[280px] sm:h-[340px] w-full rounded-xl overflow-hidden shadow-xs border border-slate-100">
              <Image
                src="/img/about_3.png"
                alt="Embryology specialist at work"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="bg-gradient-to-r from-[#1d3840] to-[#285d64] text-white py-16 sm:py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
            Start Your Journey with Mediyaz Today
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-200">
            Join thousands of satisfied parents and fertility specialists across India who trust Mediyaz for certified, compliant, and compassionate gamete banking.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/aspiring-parents"
              className="rounded-lg bg-[#ff7468] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff5d4f] transition"
            >
              For Intended Parents
            </Link>
            <Link
              href="/contacts"
              className="rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#1d3840] hover:bg-slate-100 transition"
            >
              Contact Our Medical Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
