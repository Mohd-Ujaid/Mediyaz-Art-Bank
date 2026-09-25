"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HowToDonateEggsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is the egg retrieval procedure painful or invasive?",
      answer:
        "The retrieval is a minor daycare procedure taking approximately 15 to 20 minutes. It is performed transvaginally under light intravenous sedation administered by a qualified anesthesiologist, meaning you experience zero pain during the procedure. Afterward, donors generally feel mild menstrual-like cramping for 24 hours.",
    },
    {
      question: "Will donating eggs deplete my natural fertility reserve?",
      answer:
        "No. Each month, a woman's body recruits a cohort of multiple follicles naturally, but only one follicle matures while the rest naturally degenerate (atresia). Ovarian stimulation medications simply nourish this existing monthly cohort so that mature oocytes can be retrieved rather than lost.",
    },
    {
      question: "How does the statutory 12-month insurance protect me?",
      answer:
        "In strict adherence to the ART (Regulation) Rules, 2022, an official 12-month health insurance policy is underwritten by an IRDAI-registered insurer before stimulation begins. This policy guarantees full coverage for any medical, hospitalization, or recovery expenses related to the donation cycle.",
    },
  ];

  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.jpg"
            alt="Clinical Oocyte Donation Process - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Clinical Oocyte Donation Process
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              The Step-by-Step Medical Timeline in India
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Understanding every medical and legal step of oocyte donation provides complete confidence. At Mediyaz ART Bank, every cycle is conducted in strict compliance with the Assisted Reproductive Technology (Regulation) Act, 2021, under the care of certified fertility specialists and clinical embryologists.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Apply as Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Check Eligibility Under the ART Act
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Ever-married women aged 23–35 with a living child are eligible for voluntary single-lifetime donation with mandatory IRDAI insurance.
                </p>
                <Link
                  href="/inquiry"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Start Pre-Screening
                </Link>
              </div>
            </div>

            {/* Phase Breakdown */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              The 4 Clinical Phases
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Phase 01: Pre-Screening, Diagnostic &amp; Legal Preparation
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Comprehensive Medical &amp; Insurance Execution
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Verification of eligibility criteria (age 23–35, ever-married, child aged 3+), pelvic baseline scan, blood count, Hb HPLC Thalassemia screening, chromosomal karyotype, NABL serology, informed consent, and issuance of the statutory 12-month IRDAI health insurance policy.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Phase 02: Controlled Ovarian Stimulation (10–12 Days)
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Monitored Follicular Development
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Under the supervision of a registered fertility physician, you receive daily subcutaneous hormone injections (FSH/HMG) to safely stimulate follicular growth. You attend 3 to 4 short morning appointments for ultrasound follicle tracking and hormone blood checks.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Phase 03: Ovulation Trigger &amp; Daycare Retrieval (Day 12–14)
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Minor Transvaginal Follicular Aspiration
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  A trigger injection is given approximately 35–36 hours before retrieval to induce final oocyte maturation. The retrieval is performed transvaginally under light intravenous sedation in a registered ART clinic OT. The procedure takes only 15–20 minutes with zero surgical cuts.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Phase 04: Recovery, Follow-Up &amp; Expense Reimbursement
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Post-Procedure Care &amp; Statutory Finalization
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  After 45 minutes of recovery observation, you return home accompanied by a family member. Lawfully permissible travel reimbursements and compensation for documented loss of wages are settled. A routine checkup confirms full recovery.
                </p>
              </div>
            </div>

            {/* In-Page FAQ Accordion */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#285b63] mb-6">
                Clinical Process FAQs
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.question}
                      className="rounded-2xl border border-gray-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-base sm:text-lg font-semibold text-[#285b63] pr-4">
                          {faq.question}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-sm font-bold text-[#285b63]">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6 animate-fade-in">
                          <p className="text-sm leading-relaxed text-[#555]">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/find_donor_1.png"
                  alt="How to Donate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Register Your Interest
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Start your confidential pre-screening application under Indian ART regulations.
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
                  &ldquo;The doctor explained every ultrasound image and the nurse was so gentle. The daycare retrieval was painless and I felt completely supported.&rdquo;
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
                    href="/for-donors/become-an-egg-donor"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Statutory Qualifications
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