"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const parentFaqs: FaqCategory[] = [
  {
    category: "Indian Legal Framework & Eligibility",
    items: [
      {
        q: "What is an ART Bank under the Assisted Reproductive Technology (Regulation) Act, 2021?",
        a: "Under the ART (Regulation) Act, 2021, an ART Bank is a legally registered organization established to recruit, screen, cryopreserve, and store gametes (sperm and oocytes) and supply them exclusively to registered ART clinics upon valid written medical requisition. Mediyaz ART Bank operates strictly under these statutory guidelines and ICMR benchmarks.",
      },
      {
        q: "Who is legally eligible to requisition donor gametes in India?",
        a: "Under the ART Act, 2021, gametes can be utilized by commissioning 'intending couples' (a legally married man and woman where the woman is aged between 21 and 50 years and the man is aged between 21 and 55 years) or an 'intending woman' (an unmarried woman, divorcee, or widow aged between 21 and 50 years).",
      },
      {
        q: "What are the legal parentage rights of children born through donor gametes in India?",
        a: "Under Section 31 of the ART Act, 2021, any child born through assisted reproductive technology using donor gametes is deemed to be the legitimate child of the intending couple or intending woman for all legal intents and purposes. The donor relinquishes all parental rights and has zero parental obligations or claims over the child.",
      },
      {
        q: "Is donor identity kept confidential under Indian law?",
        a: "Yes. Sections 27 and 28 of the ART Act strictly enforce absolute statutory anonymity. The identity and personal identifying details of the gamete donor cannot be disclosed to the intending parents, the clinic, or the resulting child, except pursuant to an order of a court of competent jurisdiction. Only non-identifying medical, demographic, and genetic profiles are shared.",
      },
    ],
  },
  {
    category: "Donor Screening & Testing Standards",
    items: [
      {
        q: "What medical and genetic screening do donors undergo?",
        a: "Every donor candidate undergoes thorough medical evaluation: Hb HPLC electrophoresis for Thalassemia traits, complete peripheral blood karyotyping (46,XX / 46,XY), G6PD assay, and advanced infectious disease serology (HIV-1/2, Hepatitis B HBsAg, Hepatitis C Anti-HCV, and Syphilis/VDRL) conducted at NABL-accredited diagnostic partner laboratories.",
      },
      {
        q: "What is the mandatory 180-day semen quarantine protocol?",
        a: "In accordance with national safety standards, all donor semen samples are cryopreserved and placed into a mandatory 6-month (180-day) quarantine period. The samples are only approved and cleared for clinical requisition after the donor tests negative in repeat infectious disease serology following the quarantine period.",
      },
      {
        q: "What are the statutory limits on oocyte (egg) donation in India?",
        a: "Under the ART Act, 2021, an oocyte donor must be an ever-married woman aged between 23 and 35 years who has at least one living healthy biological child of her own. Crucially, a woman is permitted to donate oocytes only once in her lifetime, and her retrieved oocytes may not be distributed to more than one commissioning couple or individual.",
      },
      {
        q: "Are donors covered by mandatory health insurance?",
        a: "Yes. In strict compliance with the ART Act 2021 and ART Rules 2022, every oocyte donor is provided with a mandatory 12-month health insurance policy underwritten by an IRDAI-registered insurance company, covering all medical complications or adverse outcomes arising from the donation procedure.",
      },
    ],
  },
  {
    category: "Ordering & Clinic Logistics",
    items: [
      {
        q: "Can intending parents receive donor samples directly at home?",
        a: "No. Under Section 21 of the ART Act, 2021, an ART Bank is prohibited from dispensing gametes directly to individuals. Gametes are only released and transported upon receipt of a formal written clinical requisition from a registered medical practitioner at an officially registered ART clinic.",
      },
      {
        q: "How are cryopreserved samples shipped to partner clinics across India?",
        a: "Samples are transported in certified dry vapor cryogenic shippers charged with liquid nitrogen, sustaining deep cryogenic temperatures (-150°C to -196°C) throughout transit. Each shipment includes dual tamper-evident custody seals, batch traceability documentation, and temperature-logged monitoring.",
      },
      {
        q: "Are gametes bought or sold commercially?",
        a: "No. Under Sections 38 and 39 of the ART Act 2021, the commercial sale, trading, or advertising of human gametes is strictly illegal and punishable by law. Gamete donation in India is altruistic and voluntary. The fee paid to Mediyaz ART Bank covers professional medical screening, laboratory testing, quarantine maintenance, statutory donor insurance, and cryogenic transit custody.",
      },
    ],
  },
];

const ParentFaqsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    "0-0": true,
  });

  const toggleItem = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories =
    activeCategory === "All"
      ? parentFaqs
      : parentFaqs.filter((cat) => cat.category === activeCategory);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/aspiring_parent_3.2.png"
            alt="Intending Parent FAQs - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[92.5rem] px-5 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* MAIN */}
      <main id="main" className="relative w-full overflow-hidden bg-white">
        <div className="relative mx-auto flex w-full max-w-[92.5rem] flex-col px-5 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:flex-row lg:items-start lg:gap-14 lg:px-16 lg:py-20 xl:gap-20">
          {/* LEFT CONTENT */}
          <div className="min-w-0 w-full lg:flex-1 lg:max-w-[850px]">
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight text-[#2b5860] font-serif">
              Guidance for Intending Parents in India
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Find clear, medically sound, and legally verified answers regarding sperm and egg donation under the Assisted Reproductive Technology (Regulation) Act, 2021.
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 pb-4 border-b border-gray-100">
              {["All", "Indian Legal Framework & Eligibility", "Donor Screening & Testing Standards", "Ordering & Clinic Logistics"].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                      activeCategory === tab
                        ? "bg-[#285d64] text-white shadow-xs"
                        : "bg-[#edf3f1] text-[#2b5860] hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Accordion List */}
            <div className="mt-8 space-y-8">
              {filteredCategories.map((cat, catIdx) => (
                <div key={cat.category} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#2b5860] font-serif border-b border-gray-100 pb-2">
                    {cat.category}
                  </h3>

                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => {
                      const isOpen = !!openItems[`${catIdx}-${itemIdx}`];
                      return (
                        <div
                          key={item.q}
                          className="rounded-2xl border border-gray-200 bg-white transition hover:border-[#285d64]/40"
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(catIdx, itemIdx)}
                            className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="text-base sm:text-lg font-semibold text-[#2b5860] pr-4 font-serif">
                              {item.q}
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-lg font-bold text-[#285d64]">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6 animate-fade-in">
                              <p className="text-sm sm:text-base leading-relaxed text-[#555]">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Still have questions card */}
            <div className="mt-12 rounded-2xl bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-[#2b5860] font-serif">
                  Have a Specific Question About ART Act Procedures?
                </h4>
                <p className="text-sm text-[#555] mt-1">
                  Our clinical coordinators are available to answer queries and coordinate directly with your treating fertility clinic.
                </p>
              </div>
              <Link
                href="/contacts"
                className="whitespace-nowrap rounded-xl bg-[#ff7468] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="mt-12 w-full lg:mt-0 lg:w-[300px] xl:w-[340px] lg:shrink-0 space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2b5860] font-serif mb-4">
                Parent Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/aspiring-parents"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → For Aspiring Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/donors"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Donor Screening Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/genetic-screening"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Genetic &amp; Medical Panels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Cryo-Viability Standards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/financing"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Transparent Banking Fees
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default ParentFaqsPage;
