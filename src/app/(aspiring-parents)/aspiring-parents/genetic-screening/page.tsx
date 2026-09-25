import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Donor Genetic & Medical Screening | Mediyaz ART Bank India",
  description:
    "Comprehensive genetic screening for sperm and egg donors under the ART Act 2021: Hb HPLC Thalassemia screening, chromosomal karyotyping, G6PD, and infectious disease panels.",
};

const GeneticScreeningPage = () => {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/about_1.png"
            alt="Genetic Screening - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Donor Genetic &amp; Medical Screening
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Advanced Clinical &amp; Genetic Safety in India
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              At Mediyaz ART Bank, genetic safety is the cornerstone of our clinical standards. In accordance with the Assisted Reproductive Technology (Regulation) Act, 2021 and ICMR guidelines, every prospective sperm and egg donor undergoes multi-tier diagnostic evaluations at NABL-accredited laboratories. Our testing protocols are specifically calibrated for Indian population genetics to ensure the utmost safety for intending parents.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/aspiring_parent_1.png"
                  alt="Clinical Genetic Counseling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Genetic Matching &amp; Clinic Support
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Our clinical team assists your treating ART specialist by providing non-identifying genetic summary sheets to cross-match carrier status with intending parents.
                </p>
                <Link
                  href="/contacts"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Consult Our Medical Team
                </Link>
              </div>
            </div>

            {/* Primary Genetic Panels */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Population-Specific Genetic &amp; Hematological Panels
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              To address monogenic recessive disorders prevalent in the Indian subcontinent, all approved donors are rigorously tested for high-frequency genetic mutations:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Beta-Thalassemia (Hb HPLC)</h4>
                <p className="text-xs text-[#666] mt-1">High Performance Liquid Chromatography to detect beta-thalassemia traits and abnormal hemoglobin variants (HbE, HbS, HbD).</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Spinal Muscular Atrophy (SMA)</h4>
                <p className="text-xs text-[#666] mt-1">SMN1 exon 7 and 8 copy number analysis to screen for carrier mutations responsible for infantile motor neuron disease.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">G6PD Enzyme Deficiency</h4>
                <p className="text-xs text-[#666] mt-1">Quantitative assessment of Glucose-6-Phosphate Dehydrogenase activity to avoid hereditary hemolytic vulnerability.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h4 className="font-bold text-[#285b63] text-sm">Cystic Fibrosis (CFTR) &amp; Fragile X</h4>
                <p className="text-xs text-[#666] mt-1">Targeted carrier screening for common CFTR pathogenic mutations and FMR1 premutation repeat expansions.</p>
              </div>
            </div>

            {/* Chromosomal Karyotype Analysis */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Chromosomal Karyotyping (G-Banding)
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Peripheral blood cytogenetic karyotyping (550+ band resolution) is performed for all donors: 46,XX for female egg donors and 46,XY for male sperm donors. This confirms normal chromosome complement and structure, ruling out balanced reciprocal or Robertsonian translocations, pericentric inversions, or mosaicisms that could cause implantation failure or congenital anomalies.
            </p>

            {/* Mandatory Infectious Disease Quarantine */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Infectious Disease Serology &amp; Semen Quarantine
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              In accordance with national safety directives, all gamete donors undergo dual-phase serological testing for HIV-I &amp; II, Hepatitis B Surface Antigen (HBsAg), Hepatitis C Virus (Anti-HCV), and Syphilis (VDRL/RPR). Semen samples are cryopreserved and placed into a mandatory 180-day quarantine period, releasing for clinical use only after the donor tests negative in repeat serology at the conclusion of the quarantine.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/aspiring-parents/donors"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                Explore Donor Screening
              </Link>
              <Link
                href="/contacts"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Speak with a Medical Coordinator
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_2.png"
                  alt="Screening Support Mediyaz ART Bank"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Clinical Requisitions
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Review complete genetic panel summaries through your registered treating ART clinic.
                </p>
                <Link
                  href="/contacts"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#e3c582]/30 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Clinical Trust
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;Mediyaz ART Bank&apos;s thorough HPLC Thalassemia profiling and karyotype verification made our embryology team completely confident in requisitioning donor samples.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Senior ART Clinic Specialist (Delhi NCR)
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
                    href="/aspiring-parents/donors"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Our Donors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Assurance &amp; Quality
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

export default GeneticScreeningPage;
