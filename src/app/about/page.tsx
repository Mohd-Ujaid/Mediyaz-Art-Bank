import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Dna, 
  Building2, 
  Microscope, 
  Scale, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock,
  FileText
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mediyaz ART Bank | Licensed Indian Gamete Bank & Cryo-Facility",
  description:
    "Learn about Mediyaz ART Bank's commitment to ethical gamete banking, 100% compliance with the Indian ART Act 2021, multi-tier genetic screening, and compassionate patient care.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Scale,
      title: "100% Statutory Compliance",
      description:
        "Fully licensed under the Assisted Reproductive Technology (Regulation) Act, 2021 and Rules 2022. Registered on the National ART and Surrogacy Registry portal with zero exceptions.",
      badge: "ART Act 2021",
    },
    {
      icon: Dna,
      title: "Multi-Tier Genetic Screening",
      description:
        "Rigorous carrier screening for Beta-Thalassemia (Hb HPLC), G6PD assays, and 550-band G-banding cytogenetic karyotyping to protect your future generations against monogenic disorders.",
      badge: "Clinical Genetics",
    },
    {
      icon: Microscope,
      title: "180-Day Cryo-Quarantine",
      description:
        "Every donor semen specimen undergoes mandatory 6-month cryogenic vapor-phase quarantine with repeat infectious serology before release, eliminating diagnostic window-period risks.",
      badge: "-196°C Cryo-Chain",
    },
    {
      icon: HeartHandshake,
      title: "Statutory Donor Protection",
      description:
        "Altruistic donors receive mandatory 12-month IRDAI-registered medical insurance (Rule 13), psychological pre-counseling, and strict single-lifetime donation monitoring.",
      badge: "Rule 13 Compliance",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Legislative Foundation",
      text: "Aligned operations from day one with the landmark Indian ART Regulation Act, creating a clear division between clinical IVF care and gamete banking.",
    },
    {
      year: "2023",
      title: "Pan-India Clinic Network",
      text: "Partnered with over 100 accredited fertility clinics, IVF hospitals, and reproductive centers across major metropolitan regions in India.",
    },
    {
      year: "2024",
      title: "Advanced Genetic Panel Integration",
      text: "Introduced standardized Beta-Thalassemia HPLC, Spinal Muscular Atrophy, and high-resolution karyotyping across all active donor candidates.",
    },
    {
      year: "2026",
      title: "Digitized Cryo-Chain Custody",
      text: "Deployed tamper-evident cryogenic RFID tracking and verified temperature-logged dry shipper logistics for 100% specimen integrity.",
    },
  ];

  const leadership = [
    {
      name: "Dr. Arvind Chawla, MD",
      role: "Head of Diagnostic & Genetic Screening",
      bio: "Pathologist with over 18 years in hemoglobinopathy diagnostics, karyotyping interpretation, and clinical serology oversight.",
      image: "/img/man.png",
    },
    {
      name: "Dr. Meenakshi Sundaram, Ph.D.",
      role: "Chief Cryobiologist & Laboratory Director",
      bio: "Specialist in gamete vitrification, computer-assisted semen analysis (CASA), and vapor-phase liquid nitrogen storage protocols.",
      image: "/img/woman.png",
    },
    {
      name: "Adv. Kavita Ramanathan",
      role: "Legal Director & ART Statutory Counsel",
      bio: "Legal authority on the ART Act 2021, Surrogacy Act, statutory donor anonymity, and registry governance.",
      image: "/img/woman.png",
    },
    {
      name: "Dr. Priyamvada Joshi, MS, DNB",
      role: "Senior Consultant in Reproductive Medicine",
      bio: "Fertility surgeon guiding safe controlled ovarian stimulation, OHSS prevention, and donor clinical care.",
      image: "/img/woman.png",
    },
  ];

  return (
    <main className="w-full overflow-hidden bg-white text-[#414141]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/about1.jpg"
            alt="About Mediyaz ART Bank"
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
              About Mediyaz ART Bank
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
              Pioneering Ethical, Licensed &amp; Advanced ART Banking in India
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#555]">
              Empowering intended parents, fertility specialists, and donors through uncompromising compliance with the Indian ART Act 2021, multi-tiered genetic health safeguards, and compassionate medical care.
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
                href="/testimonials"
                className="inline-flex items-center justify-center rounded-lg border border-[#2b5860]/30 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#1d3840] hover:bg-white transition"
              >
                Read Testimonials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & ETHOS SECTION ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              Our Foundation
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal leading-snug text-[#1d3840]">
              Built to uphold the highest standard of reproductive medicine and legal security.
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#555]">
              <p>
                Mediyaz ART Bank was established with a singular, resolute objective: to provide Indian fertility clinics and aspiring families with an independent, medically rigorous, and legally unassailable source of donor gametes.
              </p>
              <p>
                In compliance with the <strong>Assisted Reproductive Technology (Regulation) Act, 2021</strong>, gamete banking is fundamentally decoupled from IVF clinical treatments. This statutory boundary eliminates conflicts of interest, ensures independent medical clearance, and protects all participants under clear legal parenthood and donor anonymity protections.
              </p>
              <p>
                From voluntary donor recruitment through 180-day cryogenic quarantine, every step in our chain-of-custody is tracked with surgical precision, audited by legal experts, and guided by profound human empathy.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="rounded-xl bg-[#fff9f8] p-4 border border-[#ff7468]/15">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1d3840]">100%</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">ART Act 2021 Compliant</div>
              </div>
              <div className="rounded-xl bg-[#fff9f8] p-4 border border-[#ff7468]/15">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#ff7468]">100+</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Accredited Partner Clinics</div>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
            <Image
              src="/img/about_2.png"
              alt="Mediyaz ART Bank cleanroom laboratory"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ================= 4 PILLARS OF CLINICAL EXCELLENCE ================= */}
      <section className="bg-slate-50/75 py-16 sm:py-24 border-y border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              Quality Architecture
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1d3840]">
              The Four Pillars of Mediyaz ART Banking
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600">
              Every donor profile, gamete specimen, and clinical shipment adheres to stringent diagnostic, cryogenic, and statutory benchmarks.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-xs border border-slate-200/80 transition-all hover:shadow-md hover:border-[#ff7468]/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff2f0] text-[#ff7468]">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#1d3840]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPLIANCE & LEGAL FRAMEWORK ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="rounded-2xl bg-[#1d3840] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
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

      {/* ================= MEDICAL LEADERSHIP & TEAM ================= */}
      <section className="bg-slate-50/60 py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              Clinical Governance
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#1d3840]">
              Our Medical &amp; Regulatory Leadership
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Guided by distinguished authorities across embryology, reproductive pathology, cytogenetics, and health law.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white p-6 shadow-xs border border-slate-200/80 transition hover:shadow-md hover:border-[#ff7468]/30"
              >
                <div className="relative h-28 w-28 mx-auto rounded-full overflow-hidden bg-slate-100 border-2 border-[#fff2f0]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1d3840]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#ff7468]">
                    {member.role}
                  </p>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
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
              Since our establishment, Mediyaz ART Bank has continually elevated the quality standards of gamete cryopreservation in India.
            </p>

            <div className="mt-8 space-y-6">
              {milestones.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff2f0] text-xs font-bold text-[#ff7468]">
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

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
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
    </main>
  );
}
