"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DonorCompensationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Are gametes bought or sold in India?",
      answer:
        "No. Under Sections 38 and 39 of the Assisted Reproductive Technology (Regulation) Act, 2021, the commercial buying, selling, or trading of human sperm and oocytes is strictly prohibited and illegal in India. Gamete donation is a voluntary, altruistic medical contribution to assist individuals and couples facing infertility.",
    },
    {
      question: "What financial provisions and reimbursements are permitted by law?",
      answer:
        "Under Indian regulations, donors receive: (1) Mandatory 12-month health insurance coverage from an IRDAI-registered insurer (for oocyte donors), (2) 100% coverage of all clinical screenings, laboratory tests, and medications, and (3) Lawful reimbursement of actual travel expenses, medical incidentals, and documented loss of wages incurred during donation days.",
    },
    {
      question: "How is the statutory 12-month donor insurance policy structured?",
      answer:
        "In strict compliance with the ART (Regulation) Rules, 2022, a 12-month health insurance policy is underwritten by an IRDAI-approved insurance company for oocyte donors. This provides comprehensive coverage against any unexpected medical complications, hospitalizations, or adverse outcomes directly related to the retrieval procedure.",
    },
    {
      question: "Will I have any out-of-pocket costs for medical or laboratory tests?",
      answer:
        "None. Every consultation, ultrasound scan, genetic carrier screen, infectious disease serology, and clinical procedure is paid in full by Mediyaz ART Bank. Donors never incur any personal medical expenditure.",
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.jpg"
            alt="Donor Care, Insurance & Reimbursement - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Donor Care, Insurance &amp; Reimbursement
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-[1450px] px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT CONTENT */}
          <article className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#285b62]">
              Ethical Compliance Under the ART Act, 2021
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              At Mediyaz ART Bank, we place donor health, legal transparency, and ethical integrity at the forefront of our operations. In strict adherence to Indian reproductive law, commercial trafficking or trading of gametes is forbidden. Instead, our donor care framework ensures complete medical safety, statutory insurance coverage, and lawful expense reimbursement.
            </p>

            {/* Compensation Highlights Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/50 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Statutory Protection
                </span>
                <h3 className="text-xl font-bold font-serif text-[#285b62] mt-1 mb-2">
                  12-Month IRDAI Insurance
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  As mandated under ART Rules 2022, oocyte donors receive an official 12-month health insurance policy from an IRDAI-registered insurer covering medical and retrieval-related contingencies.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/50 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Zero Out-of-Pocket
                </span>
                <h3 className="text-xl font-bold font-serif text-[#285b62] mt-1 mb-2">
                  100% Medical &amp; Diagnostic Coverage
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  All physician evaluations, pelvic sonograms, NABL laboratory panels, karyotyping, and fertility medications are provided at zero cost to the donor.
                </p>
              </div>
            </div>

            {/* Travel & Expense Reimbursement */}
            <h3 className="mt-12 text-2xl sm:text-3xl font-normal font-serif text-[#285b62]">
              Lawful Expense &amp; Wage Loss Reimbursement
            </h3>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              In accordance with statutory Indian guidelines, donors are eligible for reimbursement of actual and necessary expenses incurred during the clinical process. This includes local or inter-city travel to the registered ART clinic, incidental dietary support, and documented compensation for loss of wages resulting from clinic appointments and retrieval day rest.
            </p>

            {/* In-Page FAQs */}
            <div className="mt-12">
              <h3 className="text-2xl font-serif font-normal text-[#285b62] mb-6">
                Legal &amp; Financial FAQs
              </h3>

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
                        <span className="font-serif text-base sm:text-lg font-semibold text-[#285b62] pr-4">
                          {faq.question}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-sm font-bold text-[#285b62]">
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
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2b5862] font-serif mb-4">
                Donor Guide
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/for-donors"
                    className="block py-1 text-[#285b62] hover:text-[#ff7468] font-medium"
                  >
                    → Donor Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/become-an-egg-donor"
                    className="block py-1 text-[#285b62] hover:text-[#ff7468] font-medium"
                  >
                    → Become an Egg Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/how-to-donate-eggs"
                    className="block py-1 text-[#285b62] hover:text-[#ff7468] font-medium"
                  >
                    → Step-by-Step Clinical Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/faqs"
                    className="block py-1 text-[#285b62] hover:text-[#ff7468] font-medium"
                  >
                    → Donor FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#285d64] p-6 text-white text-center shadow-md">
              <h4 className="text-lg font-bold font-serif">
                Questions on ART Act Guidelines?
              </h4>
              <p className="mt-2 text-xs text-white/85 leading-relaxed">
                Our donor care coordinators are available to answer all questions regarding statutory insurance, screening, and clinical consent.
              </p>
              <Link
                href="/contacts"
                className="mt-4 inline-block w-full rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5242]"
              >
                Contact Coordinator
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}