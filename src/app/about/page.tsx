import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Award, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Stethoscope 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mediyaz ART Bank | Leadership, Clinical Excellence & Statutory Compliance",
  description:
    "Learn about Mediyaz ART Bank: Founded by Imtiyaz Shaikh with 20+ years of gamete banking experience, advised by Chief IVF Specialist Dr. Nalini Gupta (Leeds, UK), and 100% compliant with the Indian ART Act 2021.",
};

export default function AboutPage() {
  const stats = [
    { value: "20+", label: "Years Experience", subtext: "Leadership in Donor & Gamete Care" },
    { value: "100+", label: "Partner Clinics", subtext: "Accredited IVF Centers Pan-India" },
    { value: "100%", label: "ART Act 2021", subtext: "Statutory Registry Compliance" },
    { value: "180-Day", label: "Cryo-Quarantine", subtext: "Tested at -196°C Vapor Phase" },
  ];


  const operationalTeam = [
    {
      name: "Dr. S.H. Hashmi",
      role: "General Physician, MBBS",
      tagline: "Clinical Health Screening & Medical Fitness",
      bio: "Oversees rigorous physical examinations, general clinical evaluations, vital parameters, and serological infectious disease screenings for all voluntary donor applicants.",
      image: "/img/team/dr-hashmi.webp",
      badge: "MBBS Physician",
    },
    {
      name: "Mohd. Faiyaz",
      role: "Centre Coordinator",
      tagline: "Facility Operations & Chain-of-Custody",
      bio: "Manages day-to-day center operations, patient and clinic liaison schedules, biometric donor verification, and strict legal documentation under ART Act protocols.",
      image: "/img/team/mohd-faiyaz.webp",
      badge: "Operations Lead",
    },
    {
      name: "Mohd. Riyaz",
      role: "Market Coordinator",
      tagline: "Hospital Outreach & Cryo-Logistics",
      bio: "Coordinates relationships with accredited fertility clinics, IVF hospitals, and manages rapid, temperature-monitored cryogenic vapor shipper logistics across India.",
      image: "/img/team/mohd-riyaz.webp",
      badge: "Logistics Specialist",
    },
  ];

  const milestones = [
    {
      year: "2004",
      title: "Foundational Vision",
      text: "Founder Imtiyaz Shaikh begins dedicated work in gamete donor coordination and reproductive services, establishing enduring standards of donor care and patient trust.",
    },
    {
      year: "2021",
      title: "ART Act 2021 Enactment",
      text: "Mediyaz aligns 100% of its banking architecture with the landmark Assisted Reproductive Technology (Regulation) Act, establishing statutory separation between clinics and gamete banking.",
    },
    {
      year: "2023",
      title: "National Clinic Network",
      text: "Surpassed 100+ accredited fertility hospital partnerships across Delhi NCR, Uttar Pradesh, Punjab, Haryana, Rajasthan, and major Indian healthcare hubs.",
    },
    {
      year: "2024",
      title: "Advanced Genetic Panels",
      text: "Integrated standardized Beta-Thalassemia Hb HPLC, high-resolution karyotyping, and infectious disease nucleic acid testing (NAT) across all donor pipelines.",
    },
    {
      year: "2026",
      title: "Digitized Cryo Telemetry",
      text: "Deployed continuous liquid nitrogen telemetry monitoring with automated alarms and RFID-verified specimen chain-of-custody tracking.",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-white text-[#414141]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/about1.jpg"
            alt="Mediyaz ART Bank Laboratory"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/75" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-16 md:px-10 md:pt-16 md:pb-20 lg:px-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff2f0] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#ff7468]">
              <Building2 className="h-3.5 w-3.5" />
              About Mediyaz ART Bank
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
              Pioneering Ethical, Licensed &amp; Advanced ART Banking in India
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#555]">
              Empowering intended parents, fertility specialists, and altruistic donors through uncompromising compliance with the Indian ART Act 2021, multi-tiered genetic health safeguards, and over two decades of dedicated care.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/aspiring-parents"
                className="inline-flex items-center justify-center rounded-lg bg-[#ff7468] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff5d4f] transition"
              >
                For Intended Parents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/clinics"
                className="inline-flex items-center justify-center rounded-lg border border-[#2b5860]/30 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#1d3840] hover:bg-white transition"
              >
                For Partner Clinics
              </Link>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 backdrop-blur-md shadow-xs transition hover:shadow-md hover:border-[#ff7468]/40"
              >
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1d3840]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#ff7468]">
                  {stat.label}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUNDER SPOTLIGHT ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Founder Photo & Badge */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#ff7468]/20 bg-slate-900">
                <Image
                  src="/img/team/imtiyaz-shaikh.webp"
                  alt="Imtiyaz Shaikh - Founder, Mediyaz ART Bank"
                  fill
                  className="object-cover object-center"
                  sizes="256px"
                />
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1d3840] px-4 py-1 text-xs font-semibold text-white">
                  <Award className="h-3.5 w-3.5 text-[#ff7468]" />
                  Founder &amp; Managing Director
                </span>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-[#1d3840]">
                  Imtiyaz Shaikh
                </h3>
                <p className="mt-1 text-sm font-medium text-[#ff7468]">
                  20+ Years Track Record in Gamete Banking &amp; Donor Care
                </p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 shadow-2xs">
                  Ethical Gamete Banking
                </span>
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 shadow-2xs">
                  ART Act Compliance
                </span>
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 shadow-2xs">
                  Donor Welfare First
                </span>
              </div>
            </div>

            {/* Right: Founder Message & Vision */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                <Sparkles className="h-3.5 w-3.5" />
                Founder&apos;s Vision &amp; Philosophy
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-[#1d3840]">
                &ldquo;Every family&apos;s journey deserves unconditional integrity, transparency, and absolute clinical precision.&rdquo;
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#555]">
                <p>
                  With more than two decades of hands-on experience in assisted reproduction and donor services, <strong>Imtiyaz Shaikh</strong> established Mediyaz ART Bank to address a vital need in Indian healthcare: an independent, fully licensed gamete bank founded on ethical donor care, statutory compliance, and rigorous scientific benchmarks.
                </p>
                <p>
                  Having guided hundreds of aspiring parents and worked directly with donors across varied socio-economic backgrounds, Imtiyaz focuses on relating to people at a deeply personal, human level. His philosophy bridges compassionate patient support with the uncompromising requirements of India&apos;s <strong>ART (Regulation) Act, 2021</strong>.
                </p>
                <p>
                  Under his leadership, Mediyaz ART Bank has grown into a trusted gamete cryo-facility, partnering with over 100 premier IVF hospitals and clinics nationwide, ensuring that every intending couple receives safe, genetically evaluated, and legally protected gametes.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-6">
                <div>
                  <div className="text-sm font-bold text-[#1d3840]">Imtiyaz Shaikh</div>
                  <div className="text-xs text-slate-500">Founder, Mediyaz ART Bank</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-xs text-slate-500">
                  Registered under ART Act 2021 • New Delhi, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHIEF MEDICAL ADVISOR FEATURE: DR. NALINI GUPTA ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-8 sm:px-8 sm:py-12 lg:px-16">
        <div className="overflow-hidden rounded-3xl bg-white border border-[#b8860b]/30 shadow-lg">
          {/* Header Bar */}
          <div className="bg-[#b8860b] px-6 py-6 sm:px-10 sm:py-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Chief IVF &amp; Embryology Advisory
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  Dr. Nalini Gupta
                </h2>
                <p className="mt-1 text-sm sm:text-base text-amber-100 font-medium">
                  MBBS, MD, M.Sc in Clinical Embryology with Distinction from the University of Leeds, United Kingdom
                </p>
                <p className="text-xs sm:text-sm text-white/90">
                  Senior Consultant Gynaecologist &amp; IVF Specialist in New Delhi, India • 30+ Years Experience
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/20 text-center sm:text-right hidden sm:block">
                <div className="text-2xl font-bold text-white">30+</div>
                <div className="text-xs text-amber-100">Years Clinical Mastery</div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#fffefc] to-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text Description */}
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#555]">
                <p className="font-medium text-[#1d3840] text-base sm:text-lg">
                  Dr. Nalini Gupta is an internationally acclaimed authority in obstetrics, gynaecology, clinical embryology, and advanced assisted reproductive treatments.
                </p>
                <p>
                  She holds an esteemed reputation across India and abroad for her deep clinical expertise in managing complex reproductive challenges, recurrent IVF failure, advanced maternal age protocols, and individualized fertility therapies. Her holistic approach bridges state-of-the-art laboratory embryology with the emotional well-being of prospective parents.
                </p>
                <p>
                  Having earned her <strong>M.Sc in Clinical Embryology with distinction from the University of Leeds (UK)</strong>, Dr. Gupta brings world-class scientific oversight to Mediyaz ART Bank. She advises our clinical teams on laboratory vitrification protocols, carrier genetic screening thresholds, computer-assisted semen analysis (CASA) calibration, and clinic-to-patient matching ethics.
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50/60 p-3 border border-amber-200/60 text-[#1d3840]">
                    <CheckCircle2 className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>UK Leeds Embryology Oversight</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50/60 p-3 border border-amber-200/60 text-[#1d3840]">
                    <CheckCircle2 className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>Advanced Oocyte &amp; Sperm Screening</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50/60 p-3 border border-amber-200/60 text-[#1d3840]">
                    <CheckCircle2 className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>Complex Infertility Specialization</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50/60 p-3 border border-amber-200/60 text-[#1d3840]">
                    <CheckCircle2 className="h-4 w-4 text-[#b8860b] shrink-0" />
                    <span>Holistic, Patient-Centric Ethics</span>
                  </div>
                </div>
              </div>

              {/* Portrait */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative h-60 w-60 sm:h-64 sm:w-64 rounded-full overflow-hidden border-4 border-[#b8860b]/30 shadow-xl bg-slate-100 ring-4 ring-amber-100">
                  <Image
                    src="/img/team/dr-nalini-gupta.webp"
                    alt="Dr. Nalini Gupta - Senior IVF Specialist & Clinical Embryology Advisor"
                    fill
                    className="object-cover object-center"
                    sizes="256px"
                  />
                </div>
                <div className="mt-4">
                  <div className="font-serif text-lg font-bold text-[#1d3840]">
                    Dr. Nalini Gupta
                  </div>
                  <div className="text-xs text-[#b8860b] font-semibold">
                    MBBS, MD, M.Sc Embryology (Leeds, UK)
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Gynaecologist &amp; IVF Specialist • New Delhi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE OPERATIONAL & CLINICAL TEAM ================= */}
      <section className="bg-slate-50/70 py-16 sm:py-24 border-y border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              The Care Team
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1d3840]">
              Clinical Governance &amp; Operations Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Dedicated professionals ensuring medical fitness, strict ART Act compliance, seamless facility coordination, and pan-India cryogenic delivery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {operationalTeam.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 transition-all hover:shadow-md hover:border-[#ff7468]/40"
              >
                <div>
                  <div className="relative h-44 w-44 mx-auto rounded-full overflow-hidden bg-slate-100 border-3 border-white shadow-md ring-2 ring-slate-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      sizes="176px"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <span className="inline-block rounded-full bg-[#fff2f0] px-3 py-0.5 text-[11px] font-bold text-[#ff7468] uppercase tracking-wider">
                      {member.badge}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-[#1d3840]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#173d45]">
                      {member.role}
                    </p>
                    <p className="mt-1 text-xs text-[#ff7468] font-medium">
                      {member.tagline}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified ART Personnel
                  </span>
                  <span>Mediyaz Team</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= COMPLIANCE & LEGAL FRAMEWORK ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-8 sm:px-8 sm:py-12 lg:px-16">
        <div className="rounded-3xl bg-[#1d3840] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-1 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#ff7468]">
              <Lock className="h-3.5 w-3.5" />
              Statutory Transparency &amp; Safety
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-normal leading-tight">
              Absolute Donor Anonymity &amp; Conclusive Legal Parentage
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
              <p>
                <strong>Section 27 &amp; 28 (Anonymity):</strong> The identity of gamete donors is legally protected and strictly confidential. Intended couples review comprehensive, non-identifying profiles (phenotypic traits, educational background, multi-generational medical history, and blood compatibility) without compromising donor privacy.
              </p>
              <p>
                <strong>Section 31 (Conclusive Parentage):</strong> Under Indian law, a child born through donor gametes is deemed to be the legitimate child of the intending parents from the moment of conception, possessing all statutory rights of inheritance and legitimacy. The donor relinquishes all parental rights.
              </p>
              <p>
                <strong>Prohibition of Commercial Trade:</strong> Gamete donation is strictly altruistic. Commercial buying, selling, or brokering of gametes is completely prohibited under Chapter VII of the Act.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blogs/understanding-art-regulation-act-2021-india"
                className="inline-flex items-center rounded-lg bg-[#ff7468] px-5 py-3 text-sm font-semibold text-white hover:bg-[#ff5d4f] transition"
              >
                Read Legal Guide on ART Act 2021
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Consult Legal &amp; Compliance Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCREDITATIONS & MILESTONES ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              Our Journey
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1d3840]">
              Milestones in Quality &amp; Trust
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded on deep clinical experience, Mediyaz ART Bank has continually elevated the quality standards of gamete cryopreservation and ethical reproduction in India.
            </p>

            <div className="mt-8 space-y-6">
              {milestones.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff2f0] text-xs font-bold text-[#ff7468]">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-[#1d3840]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mb-6">
              Accreditations &amp; Protocol Standards
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Registered under the <strong>National Assisted Reproductive Technology and Surrogacy Board</strong>, Ministry of Health and Family Welfare (MoHFW), Government of India.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Adherence to <strong>ISO Class 5 (Grade A)</strong> laminar clean air work stations for gamete processing and vitrification.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Mandatory <strong>Rule 13 Statutory Health Insurance</strong> policies for all voluntary egg donors through IRDAI-registered insurers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Continuous 24/7 liquid nitrogen telemetry monitoring with dual audible and digital SMS telemetry alarms.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Link
                href="/clinics"
                className="inline-flex items-center text-sm font-bold text-[#ff7468] hover:text-[#ff5242] transition"
              >
                Learn how we partner with accredited fertility clinics →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="bg-gradient-to-r from-[#1d3840] to-[#285d64] text-white py-16 sm:py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
            Ready to Take the Next Step in Your Journey?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Whether you are intending parents seeking confidential gamete access, an ART clinic specialist coordinating requisitions, or exploring altruistic donation, our dedicated team is here to assist you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/aspiring-parents"
              className="rounded-lg bg-[#ff7468] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff5d4f] transition"
            >
              For Intended Parents
            </Link>
            <Link
              href="/for-donors/become-an-egg-donor"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Become an Egg Donor
            </Link>
            <Link
              href="/for-donors/become-a-sperm-donor"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Become a Sperm Donor
            </Link>
            <Link
              href="/contacts"
              className="rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#1d3840] hover:bg-slate-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
