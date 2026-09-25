import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Become an Egg Donor in India | Mediyaz ART Bank",
  description:
    "Explore eligibility requirements and clinical steps to become an egg donor under India's ART Act 2021. Review age, marital status, health checks, and statutory insurance.",
};

export default function BecomeAnEggDonorPage() {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.webp"
            alt="Become an Egg Donor in India - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Become an Egg Donor
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Clinical Steps &amp; Statutory Guidelines in India
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Becoming an oocyte (egg) donor is an extraordinary act of kindness that enables intended parents to experience the joy of raising a child. At Mediyaz ART Bank, our clinical care and screening protocols are governed strictly by the Assisted Reproductive Technology (Regulation) Act, 2021, providing top-tier medical supervision, informed consent, and comprehensive insurance protection for every donor.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Apply Today as an Egg Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Check Your Statutory Eligibility
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Our confidential pre-screening questionnaire takes just a few minutes to verify basic ART Act requirements.
                </p>
                <Link
                  href="/inquiry"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Start Pre-Screening
                </Link>
              </div>
            </div>

            {/* Basic Eligibility */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Statutory Eligibility Criteria (ART Act 2021)
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Age 23 – 35 Years</h4>
                <p className="text-xs text-[#666] mt-1">Legally specified age window ensuring optimal clinical maturity and physical well-being.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Ever-Married with Living Child</h4>
                <p className="text-xs text-[#666] mt-1">Must be an ever-married woman with at least one living healthy child of her own (minimum age 3 years).</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Once-in-a-Lifetime Donation</h4>
                <p className="text-xs text-[#666] mt-1">Under Indian law, a woman can donate oocytes only once in her lifetime to safeguard reproductive health.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Good Physical &amp; Mental Health</h4>
                <p className="text-xs text-[#666] mt-1">Normal BMI, non-smoker, free from chronic conditions and hereditary genetic disorders.</p>
              </div>
            </div>

            {/* 5-Step Process */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              The 5-Stage Clinical Donation Process
            </h2>

            <ol className="mt-6 space-y-5">
              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 01
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Confidential Pre-Screening &amp; Eligibility Check
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Submit basic information regarding your age, marital status, child&apos;s age, and health history to verify alignment with the ART (Regulation) Act, 2021.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 02
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Clinical, Genetic &amp; Diagnostic Evaluation
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Undergo a complete medical examination at a registered partner clinic: pelvic sonography (antral follicle count), AMH level, blood group, Hb HPLC Thalassemia screening, chromosomal karyotype (46,XX), and NABL infectious disease serology at zero cost to you.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 03
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Informed Consent &amp; Statutory Insurance Coverage
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Receive comprehensive psychological counseling and formal informed consent documentation. In compliance with ART Rules 2022, a mandatory 12-month health insurance policy underwritten by an IRDAI-registered insurer is executed for your protection.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 04
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Ovarian Stimulation Cycle (10–12 Days)
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Under the supervision of a registered reproductive endocrinologist, you administer daily subcutaneous hormone injections for 10 to 12 days, monitored via periodic ultrasound scans and serum estradiol tests.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Step 05
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Daycare Oocyte Retrieval &amp; Post-Care Follow-up
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  A minor 15-to-20-minute outpatient procedure performed transvaginally under light intravenous sedation with zero surgical incisions. After brief recovery observation, permissible travel reimbursements and wage compensations are finalized.
                </p>
              </li>
            </ol>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/inquiry"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                Apply as an Egg Donor
              </Link>
              <Link
                href="/for-donors/donor-compensation"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Insurance &amp; Reimbursement Details
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Become a Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Register Your Interest
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Submit your preliminary pre-screening application in accordance with Indian ART regulations.
                </p>
                <Link
                  href="/inquiry"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  Start Pre-Screening
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#95e0b9]/40 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Donor Experience
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;The medical team made me feel completely safe and informed. Everything from the ultrasound scans to the insurance policy was transparent and handled with care.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Registered Egg Donor (India)
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
                    href="/for-donors/how-to-donate-eggs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Clinical Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/donor-compensation"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Insurance &amp; Reimbursement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/faqs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Egg Donor FAQs
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
