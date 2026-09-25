import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Pricing Transparency & Banking Services | Mediyaz ART Bank India",
  description:
    "Transparent pricing for donor sperm and egg banking services under the ART Act 2021. Review itemized screening, storage, insurance, and medical financing options in India.",
};

const FinancingPage = () => {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.jpg"
            alt="ART Banking Services & Financial Clarity - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Transparent Pricing &amp; Financial Clarity
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Clear, Compliant Banking Fees for Intending Parents
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              In strict accordance with Sections 38 and 39 of the Assisted Reproductive Technology (Regulation) Act, 2021, the commercial sale or trading of human gametes is prohibited by law in India. At Mediyaz ART Bank, we maintain absolute pricing transparency. Our service fees cover comprehensive clinical screening, advanced NABL genetic and infectious testing, mandatory 6-month semen quarantine, statutory 12-month donor health insurance, and temperature-monitored cryogenic custody.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/aspiring_parent_3.1.png"
                  alt="Clinical Care Coordinator"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Speak with a Banking Coordinator
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Receive an itemized breakdown of clinical screening fees, donor statutory insurance, cryogenic logistics, and registered clinic delivery.
                </p>
                <Link
                  href="/contacts"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Request Fee Schedule
                </Link>
              </div>
            </div>

            {/* Financing Solutions */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              What Is Included in Your Banking Fee
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  Clinical, Genetic &amp; Diagnostic Screening
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Every donor sample undergoes exhaustive screening: Hb HPLC electrophoresis for Thalassemia traits, G6PD assays, high-resolution G-band karyotyping (46,XX / 46,XY), and dual-stage serology for HIV-I/II, HBsAg, Anti-HCV, and VDRL/Syphilis at certified NABL laboratories.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  Statutory Donor Insurance &amp; 180-Day Quarantine
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  For oocyte donation, fees include the statutory 12-month health insurance policy underwritten by an IRDAI-registered insurer as mandated by the ART Act 2021. For donor semen, fees cover the complete 180-day cryogenic quarantine and post-quarantine re-testing protocol before clinical release.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  Healthcare Financing &amp; Medical EMI Options in India
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  To assist couples throughout their fertility journey, we work alongside reputed Indian healthcare lending partners and registered clinic networks that offer flexible, interest-subsidized EMI assistance for ART procedures and gamete banking services.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/aspiring-parents/donors"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                View Screening Standards
              </Link>
              <Link
                href="/contacts"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Inquire About Banking Fees
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_3.3.png"
                  alt="Explore Registered ART Donors"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Begin Your Journey
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Review non-identifying medical profiles and transparent clinical banking standards.
                </p>
                <Link
                  href="/aspiring-parents/donors"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  View Donor Profiles
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#95e0b9]/40 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Parent Feedback
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;Mediyaz provided complete itemized clarity on all clinical screening and quarantine fees from day one. No ambiguities, completely professional and compliant with the ART Act.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Intending Couple (New Delhi)
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Parent Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/aspiring-parents"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → For Aspiring Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Quality &amp; Cryo-Viability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/faqs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Aspiring Parent FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default FinancingPage;
