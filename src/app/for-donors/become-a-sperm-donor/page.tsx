import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Become a Sperm Donor in India | Mediyaz ART Bank",
  description:
    "Learn the statutory eligibility requirements, 180-day quarantine protocols, and clinical steps to become a sperm donor under India's ART (Regulation) Act, 2021.",
};

export default function BecomeASpermDonorPage() {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.webp"
            alt="Become a Sperm Donor in India - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Become a Sperm Donor
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Clinical Evaluation &amp; Statutory Guidelines in India
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Becoming a sperm donor is a noble contribution that helps infertile couples and intending parents achieve their dream of having a child. At Mediyaz ART Bank, our donor program operates in rigorous adherence to the Assisted Reproductive Technology (Regulation) Act, 2021, ensuring complete donor anonymity, clinical excellence, ethical oversight, and safety.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Apply as a Sperm Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Check Your Statutory Eligibility
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Complete our confidential pre-screening questionnaire to verify basic ART Act requirements before clinical consultation.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <Link
                    href="/register/sperm"
                    className="inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                  >
                    Register as Sperm Donor
                  </Link>
                  <Link
                    href="/inquiry"
                    className="inline-block rounded-xl border border-[#285b63] bg-white px-6 py-2.5 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
                  >
                    Quick Inquiry
                  </Link>
                </div>
              </div>
            </div>

            {/* Basic Eligibility */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Statutory Eligibility Criteria (ART Act 2021)
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Age 21 – 55 Years</h4>
                <p className="text-xs text-[#666] mt-1">
                  Legally specified age bracket established under Section 21(b) of the Assisted Reproductive Technology (Regulation) Act, 2021.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Optimal Semen Parameters</h4>
                <p className="text-xs text-[#666] mt-1">
                  High sperm count, normal progressive motility, and normal morphology assessed in accordance with WHO 6th Edition standards.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Infectious &amp; Genetic Health</h4>
                <p className="text-xs text-[#666] mt-1">
                  Free of communicable pathogens (HIV, Hepatitis B &amp; C, Syphilis) and hereditary genetic disorders (Thalassemia trait, abnormal karyotype).
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Identity &amp; Legal Anonymity</h4>
                <p className="text-xs text-[#666] mt-1">
                  Aadhaar-verified pedigree with 100% statutory confidentiality (Sections 27 &amp; 28) and zero parental rights or liabilities (Section 31).
                </p>
              </div>
            </div>

            {/* 5-Step Process */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              The 5-Stage Sperm Donation Process
            </h2>

            <ol className="mt-6 space-y-5">
              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 01
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Online Pre-Screening &amp; Application
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Submit basic information online including age, medical background, and contact details. Our clinical coordinator verifies eligibility under the ART Act 2021 guidelines.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 02
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Comprehensive Semen Analysis &amp; Cryo-Survival Test
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Provide an initial semen sample at our partner clinical laboratory following 2–3 days of abstinence. The sample is evaluated for count, progressive motility, morphology, and post-thaw cryo-recovery survival.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 03
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  NABL Serology, Genetic &amp; Health Screening
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Undergo thorough medical screening at zero cost: Hb HPLC Thalassemia trait screening, chromosomal karyotype (46,XY), G6PD assay, and dual serology for HIV 1 &amp; 2, HBsAg, HCV, and VDRL/Syphilis.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 04
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Cryopreservation &amp; Mandatory 180-Day Quarantine
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Approved donor samples are cryopreserved in liquid nitrogen (-196°C) and held in mandatory 180-day (6-month) clinical quarantine. No sample is ever released without completing this quarantine window.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 05
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Post-Quarantine Repeat Testing &amp; Clinical Release
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  After 180 days, the donor undergoes repeat negative infectious serology. Upon verified clearance, the banked samples are authorized for delivery exclusively to registered ART clinics upon written medical requisition.
                </p>
              </li>
            </ol>

            {/* Legal Protections */}
            <div className="mt-12 rounded-2xl bg-[#edf3f1] p-6 sm:p-8 border border-[#285b63]/20">
              <h3 className="font-serif text-2xl font-bold text-[#285b63] mb-3">
                Legal Protections for Donors (ART Act 2021)
              </h3>
              <ul className="space-y-3 text-sm text-[#444] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#285b63] font-bold">✓</span>
                  <span><strong>Statutory Anonymity (Sections 27 &amp; 28):</strong> Donor identifying details are never disclosed to intending parents, children, or clinics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#285b63] font-bold">✓</span>
                  <span><strong>Zero Parental Liabilities (Section 31):</strong> Intended parents are the sole legal parents. Donors have zero legal, financial, or parental obligations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#285b63] font-bold">✓</span>
                  <span><strong>Altruistic Donation:</strong> Purely voluntary donation with permissible travel and wage-loss reimbursements under statutory guidelines.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register/sperm"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                Start Sperm Donor Registration
              </Link>
              <Link
                href="/aspiring-parents/genetic-screening"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Diagnostic Screening Details
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Become a Sperm Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Register as a Donor
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Begin your confidential registration with Aadhaar verification and medical pre-screening.
                </p>
                <Link
                  href="/register/sperm"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  Apply as Sperm Donor
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#95e0b9]/40 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Statutory Protocol
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;Every semen sample undergoes a mandatory 180-day cryogenic quarantine with repeat negative serological screening before clinical release to registered ART clinics.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Mediyaz ART Bank Clinical Directorate
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Donor Guide
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/for-donors"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Donor Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/become-an-egg-donor"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Become an Egg Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/donors"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Donor Screening Standards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/genetic-screening"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Genetic &amp; Diagnostic Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/faqs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Donor FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
