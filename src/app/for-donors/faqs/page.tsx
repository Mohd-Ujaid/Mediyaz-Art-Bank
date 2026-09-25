"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const donorFaqs: FaqCategory[] = [
  {
    title: "Eligibility & Legal Criteria in India",
    items: [
      {
        question: "What are the statutory qualifications to become an egg donor in India?",
        answer:
          "Under the Assisted Reproductive Technology (Regulation) Act, 2021, an oocyte (egg) donor must be an ever-married woman aged between 23 and 35 years who has at least one living healthy biological child of her own (minimum age 3 years). She must possess good physical and mental health, a normal BMI, and pass all genetic and infectious disease screenings.",
      },
      {
        question: "What are the qualifications to become a sperm donor in India?",
        answer:
          "Under the ART Act 2021, a sperm donor must be a healthy male aged between 21 and 55 years with normal semen parameters, negative infectious disease screening, normal chromosomal karyotype (46,XY), and absence of hereditary genetic conditions. His semen sample is held in mandatory 180-day cryo-quarantine before clinical clearance.",
      },
      {
        question: "How many times is an egg donor permitted to donate in India?",
        answer:
          "Under the ART Act, 2021, an oocyte donor is permitted to donate oocytes ONLY ONCE in her entire lifetime. Furthermore, her retrieved oocytes may not be distributed to more than one commissioning couple or intending woman. This statutory safeguard exists to protect donor health and prevent reproductive commercialization.",
      },
      {
        question: "Is gamete donation anonymous under Indian law?",
        answer:
          "Yes. Sections 27 and 28 of the ART Act 2021 mandate strict statutory anonymity. Donors have no parental rights, responsibilities, or liabilities towards any resulting child. Likewise, the identity of the donor is strictly confidential and protected from disclosure to the intending parents or child, except upon a direct order from a competent court.",
      },
    ],
  },
  {
    title: "Clinical Process & Health Safety",
    items: [
      {
        question: "Will donating eggs affect my ability to have more children in the future?",
        answer:
          "No. Oocyte donation does not deplete your reproductive reserve or affect future fertility. In each natural menstrual cycle, a woman's ovaries recruit a cohort of follicles, of which normally only one matures while the others undergo natural atresia (degeneration). Stimulation medications merely allow this single natural monthly cohort to mature together so they can be retrieved.",
      },
      {
        question: "What medications are involved in an egg donation cycle?",
        answer:
          "Under the supervision of a registered fertility specialist, the donor receives daily subcutaneous hormone injections (recombinant FSH / HMG and a GnRH antagonist) for approximately 10 to 12 days to support follicular growth, monitored closely by ultrasound scans. A trigger injection is given approximately 35–36 hours prior to retrieval.",
      },
      {
        question: "How is the egg retrieval procedure conducted?",
        answer:
          "The retrieval is a daycare outpatient procedure taking approximately 15 to 20 minutes. It is performed transvaginally under light intravenous sedation administered by a qualified anesthesiologist. An ultrasound-guided fine aspiration needle collects mature oocytes directly from the follicles. There are no incisions, cuts, or stitches.",
      },
      {
        question: "What tests are performed on sperm donors before acceptance?",
        answer:
          "Sperm donors undergo comprehensive semen analysis (evaluating count, progressive motility, morphology, and cryo-survival), Hb HPLC Thalassemia screening, chromosomal karyotype (46,XY), and dual-stage infectious serology (HIV 1 & 2, HBsAg, HCV, VDRL/Syphilis) at accredited NABL laboratories.",
      },
    ],
  },
  {
    title: "Statutory Insurance & Expense Reimbursement",
    items: [
      {
        question: "Are egg donors provided with medical insurance in India?",
        answer:
          "Yes. In strict adherence to the ART (Regulation) Act, 2021 and ART Rules, 2022, every oocyte donor is provided with a mandatory 12-month health insurance policy underwritten by an IRDAI-registered insurance company. This policy covers all medical expenses, hospitalizations, or complications arising from the stimulation or retrieval procedure.",
      },
      {
        question: "Are gametes purchased or commercially traded?",
        answer:
          "No. Under Sections 38 and 39 of the ART Act 2021, commercial sale, advertisement, or brokering of gametes is strictly forbidden and punishable by law. Donation is voluntary and altruistic. Donors receive statutory insurance coverage and permissible reimbursement for actual travel costs, clinic incidentals, and documented loss of wages.",
      },
      {
        question: "Do donors incur any out-of-pocket medical or laboratory costs?",
        answer:
          "None. All clinical evaluations, blood screenings, ultrasound monitoring, medications, daycare procedures, and post-procedure checkups are fully covered by Mediyaz ART Bank.",
      },
    ],
  },
];

export default function DonorFaqsPage() {
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
      ? donorFaqs
      : donorFaqs.filter((cat) => cat.title === activeCategory);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.webp"
            alt="Donor FAQs - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Prospective Donor FAQs
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-[1450px] px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT CONTENT */}
          <article className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#285b62]">
              Statutory Guidelines for Donors in India
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Get verified answers regarding sperm and egg donation eligibility, the single lifetime donation limit for oocyte donors, mandatory 12-month IRDAI insurance, and full confidentiality under the Assisted Reproductive Technology (Regulation) Act, 2021.
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 pb-4 border-b border-gray-100">
              {["All", "Eligibility & Legal Criteria in India", "Clinical Process & Health Safety", "Statutory Insurance & Expense Reimbursement"].map(
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

            {/* Accordion Categories */}
            <div className="mt-8 space-y-8">
              {filteredCategories.map((cat, catIdx) => (
                <div key={cat.title} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#285b62] font-serif border-b border-gray-100 pb-2">
                    {cat.title}
                  </h3>

                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => {
                      const isOpen = !!openItems[`${catIdx}-${itemIdx}`];
                      return (
                        <div
                          key={item.question}
                          className="rounded-2xl border border-gray-200 bg-white transition hover:border-[#285d64]/40"
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(catIdx, itemIdx)}
                            className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="font-serif text-base sm:text-lg font-semibold text-[#285b62] pr-4">
                              {item.question}
                            </span>
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-sm font-bold text-[#285b62]">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6 animate-fade-in">
                              <p className="text-sm sm:text-base leading-relaxed text-[#555]">
                                {item.answer}
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

            {/* Ready to Apply Banner */}
            <div className="mt-12 rounded-2xl bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-[#285b62] font-serif">
                  Ready to Check Your Eligibility?
                </h4>
                <p className="text-sm text-[#555] mt-1">
                  Complete our confidential pre-screening form under Indian ART guidelines.
                </p>
              </div>
              <Link
                href="/inquiry"
                className="whitespace-nowrap rounded-xl bg-[#ff7468] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
              >
                Apply as a Donor
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2b5862] font-serif mb-4">
                Donor Resources
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
                    → Clinical Process Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/donor-compensation"
                    className="block py-1 text-[#285b62] hover:text-[#ff7468] font-medium"
                  >
                    → Insurance &amp; Reimbursement
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