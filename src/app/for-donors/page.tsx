import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Become a Sperm or Egg Donor | Mediyaz ART Bank India",
  description:
    "Learn about voluntary sperm and egg donation in India under the ART Act 2021. Explore eligibility criteria, statutory insurance coverage, screening, and legal guidelines.",
};

export default function ForDonorsPage() {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.webp"
            alt="Gamete Donation in India - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            For Prospective Donors
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT (SIDEBAR LAYOUT) ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Voluntary Gamete Donation in India
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Gamete donation is a profound altruistic act that helps couples and women overcome fertility hurdles to achieve the dream of parenthood. At Mediyaz ART Bank, our donation programs operate in rigorous compliance with the Assisted Reproductive Technology (Regulation) Act, 2021 and ART Rules. We ensure world-class clinical care, statutory confidentiality, full medical safety, and insurance protection for every voluntary donor.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Start Donor Application"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Check Your Eligibility
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Learn whether you qualify under the statutory age, medical, and marital criteria established by Indian law.
                </p>
                <Link
                  href="/inquiry"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Apply as a Donor
                </Link>
              </div>
            </div>

            {/* Donor Programs Overview */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Sperm &amp; Egg Donation Pathways
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sperm Donation Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                    Sperm Donation
                  </h3>
                  <ul className="text-sm text-[#555] space-y-2 leading-relaxed">
                    <li><strong>Eligibility:</strong> Healthy male aged 21 to 55 years.</li>
                    <li><strong>Screening:</strong> Semen analysis, Hb HPLC Thalassemia screening, karyotyping (46,XY), dual serology (HIV, HBsAg, HCV, VDRL).</li>
                    <li><strong>Quarantine:</strong> Mandatory 180-day cryo-quarantine with post-quarantine repeat infectious disease clearance.</li>
                    <li><strong>Single Couple Limit:</strong> Gametes are allocated to a single commissioning couple or individual only.</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href="/for-donors/become-a-sperm-donor"
                    className="inline-block rounded-xl bg-[#285b63] hover:bg-[#1d464d] text-white text-xs font-bold py-2.5 px-5 transition"
                  >
                    Become a Sperm Donor →
                  </Link>
                </div>
              </div>

              {/* Egg Donation Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                    Egg (Oocyte) Donation
                  </h3>
                  <ul className="text-sm text-[#555] space-y-2 leading-relaxed">
                    <li><strong>Eligibility:</strong> Ever-married female aged 23 to 35 years with at least one living child (aged 3+ years).</li>
                    <li><strong>Single Lifetime Limit:</strong> Under Indian law, an oocyte donor can donate only once in her lifetime.</li>
                    <li><strong>Statutory Insurance:</strong> Mandatory 12-month IRDAI-approved health insurance policy provided for donor protection.</li>
                    <li><strong>Allocation:</strong> Max 7 oocytes per commissioning couple or woman.</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href="/for-donors/become-an-egg-donor"
                    className="inline-block rounded-xl bg-[#285b63] hover:bg-[#1d464d] text-white text-xs font-bold py-2.5 px-5 transition"
                  >
                    Become an Egg Donor →
                  </Link>
                </div>
              </div>
            </div>

            {/* Key Pillars of Donor Care */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Key Pillars of Our Donor Care Program
            </h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  1. Statutory Donor Anonymity (Sections 27 &amp; 28)
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  The Assisted Reproductive Technology (Regulation) Act, 2021 mandates absolute donor privacy. Intending parents and resulting children have no legal right to access your personal identifying records, nor do donors have parental obligations or liabilities towards the child.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  2. 100% Free Health &amp; Genetic Diagnostics
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  All prospective donors receive an exhaustive clinical checkup at zero personal expense, including CBC, pelvic sonography (for egg donors), semen parameters (for sperm donors), Thalassemia HPLC, and infectious disease screenings at accredited NABL laboratories.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  3. Transparent Legal &amp; Expense Compliance
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Under Sections 38 and 39 of the ART Act 2021, commercial sale or purchase of gametes is strictly illegal in India. Donors participate altruistically. Permissible reimbursements cover actual travel expenses, medical incidentals, loss of wages, and mandatory health insurance premiums.
                </p>
                <Link
                  href="/for-donors/donor-compensation"
                  className="mt-3 inline-block text-xs font-bold text-[#ff7468] hover:underline"
                >
                  Learn more about insurance &amp; expense reimbursement →
                </Link>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  4. Dedicated Medical &amp; Psychological Counseling
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Donors receive structured psychological counseling and informed consent guidance before proceeding, ensuring you fully understand every medical step, legal implication, and clinical timeline.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/inquiry"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                Apply as a Donor
              </Link>
              <Link
                href="/for-donors/faqs"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Read Donor FAQs
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            {/* Get Started Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/find_donor_1.png"
                  alt="Apply as a Voluntary Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Register Your Interest
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Start your confidential pre-screening application under the ART (Regulation) Act, 2021.
                </p>
                <Link
                  href="/inquiry"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  Start Donor Application
                </Link>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#95e0b9]/40 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Donor Experience
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;The clinical care team at Mediyaz explained every aspect of the ART Act, completed all health checks, and arranged my insurance with complete respect and dignity.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Registered Altruistic Donor (India)
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Donor Guide
              </h3>
              <ul className="space-y-3 text-sm">
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
                    href="/for-donors/become-a-sperm-donor"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Become a Sperm Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/how-to-donate-eggs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Clinical Donation Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/donor-compensation"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Insurance &amp; Expense Reimbursement
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
