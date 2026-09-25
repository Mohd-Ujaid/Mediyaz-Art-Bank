import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "For Intending Parents | Mediyaz ART Bank India",
  description:
    "Explore the donor sperm and donor egg journey with Mediyaz ART Bank under the Assisted Reproductive Technology (Regulation) Act, 2021. Learn about screening, legal protections, and clinical coordination.",
};

const AspiringParentsPage = () => {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/aspiring-parent.jpg"
            alt="For Intending Parents - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            For Intending Parents
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT (SIDEBAR LAYOUT) ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              How Donor Gamete Access Works in India
            </h1>

            <h2 className="mt-6 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Sperm &amp; Oocyte Donation Under the ART Act, 2021
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Mediyaz ART Bank welcomes intending couples and individuals seeking ethical assisted reproductive solutions. Under the <b>Assisted Reproductive Technology (Regulation) Act, 2021</b>, donor gametes (sperm and oocytes) are screened, cryopreserved, and supplied exclusively through registered ART Clinics. Whether you are addressing severe male-factor infertility, diminished ovarian reserve, or genetic concerns, we provide verified donor gametes with complete statutory compliance, medical safety, and transparency.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/aspiring_parent_3.3.png"
                  alt="Explore Donor Gametes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Begin Your Donor Search
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Review non-identifying health pedigrees, physical characteristics, and genetic carrier screening reports in consultation with your treating fertility clinic.
                </p>
                <Link
                  href="/aspiring-parents/donors"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  Explore Donor Profiles
                </Link>
              </div>
            </div>

            {/* Video / Visual Feature Container */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_2.png"
                  alt="Clinical Guidance Under Indian Law"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d3840]/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white font-serif text-lg sm:text-xl font-medium">
                    Compliant Clinical Support &amp; Rigorous Safety Standards Across India
                  </p>
                </div>
              </div>
            </div>

            {/* Scientific Explanation */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Eligibility for Intending Parents Under Indian Law
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              The ART (Regulation) Act, 2021 sets clear statutory eligibility criteria for individuals and couples accessing assisted reproductive services in India:
            </p>

            <ul className="mt-4 space-y-3 list-disc pl-6 text-base text-[#555] leading-relaxed">
              <li>
                <b>Intending Couple:</b> An infertile married couple where the woman is between <b>21 and 50 years</b> of age, and the male partner is between <b>21 and 55 years</b> of age.
              </li>
              <li>
                <b>Intending Woman:</b> An unmarried, divorced, or widowed woman between <b>21 and 50 years</b> of age seeking donor sperm services.
              </li>
              <li>
                <b>Legal Parentage:</b> Under Section 31 of the ART Act, any child born through ART using donor gametes is deemed the legitimate child of the intending couple or woman, with all rights of parentage and inheritance from birth. The donor has zero parental rights or financial obligations.
              </li>
            </ul>

            {/* Fresh vs Frozen Comparison */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Gamete Banking Protocols: Sperm &amp; Oocyte Cryopreservation
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Mediyaz ART Bank adheres to standardized cryopreservation and quarantine protocols to maximize safety and embryological outcomes:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/50 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Sperm Banking &amp; Quarantine
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Donor Semen Banking
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Semen samples are collected from eligible men (aged 21–55), evaluated per WHO laboratory criteria, and cryopreserved for a mandatory <b>6-month (180-day) quarantine</b>. Samples are released only after repeat negative serology for HIV, Hepatitis B/C, and Syphilis.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/50 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Oocyte Vitrification
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Donor Oocyte Banking
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Oocyte donors are ever-married women aged 23–35 with at least one living child of their own. Oocytes are retrieved via minor ultrasound-guided aspiration and vitrified using ultra-rapid cryo protocols. Under Indian law, an oocyte donor can donate only once in her life, and no more than 7 oocytes are allocated to any single intending couple.
                </p>
              </div>
            </div>

            {/* Strict Statutory Anonymity */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Strict Statutory Donor Anonymity in India
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Unlike jurisdictions with open-identity donor registries, Indian law mandates complete and perpetual anonymity between donors and intending parents:
            </p>

            <ol className="mt-6 space-y-4">
              <li className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  1. Complete Legal Anonymity (Sections 27 &amp; 28)
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  The ART Bank and clinic are strictly prohibited by law from divulging the identity, name, photograph, or identifying contact details of the donor to the intending parents or child. Likewise, the identity of the recipient family is never disclosed to the donor.
                </p>
              </li>

              <li className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  2. Non-Identifying Profile Access
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  Intending parents and their treating physicians receive extensive non-identifying information, including height, skin tone, eye color, hair texture, blood group, educational qualifications, occupational background, and comprehensive multi-generation family health pedigrees.
                </p>
              </li>

              <li className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  3. Central Registry Tracking
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  All donations are systematically logged in the National Assisted Reproductive Technology and Surrogacy Registry to enforce statutory single-lifetime donation limits and prevent consanguinity, ensuring absolute regulatory compliance.
                </p>
              </li>
            </ol>

            {/* Working with Registered Clinics */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Working with Your Registered ART Clinic
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              By law, Mediyaz ART Bank releases donor gametes solely to registered ART Clinics upon receiving a valid written clinical requisition from your treating reproductive endocrinologist. Our specialized cryo-logistics team coordinates directly with your clinic&apos;s embryology laboratory, ensuring seamless sample delivery in validated liquid nitrogen dry vapor shippers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/aspiring-parents/donors"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
              >
                Browse Donor Information
              </Link>
              <Link
                href="/contacts"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Speak with a Clinical Coordinator
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            {/* Get Started Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_3.1.png"
                  alt="Find Your Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Find Your Match
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Explore non-identifying donor profiles verified for health history, phenotypic matching, and genetic screening.
                </p>
                <Link
                  href="/aspiring-parents/donors"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  Explore Donor Profiles
                </Link>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#e3c582]/30 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Patient Experience
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;The non-identifying health profile matched our family background perfectly. Knowing the donor was fully screened under the ART Act 2021 gave our doctor and us total peace of mind.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Intending Parents, New Delhi
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Parent Resources
              </h3>
              <ul className="space-y-3 text-sm">
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
                    → Genetic Carrier &amp; Thalassemia Testing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Quality &amp; Clinical Assurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/financing"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Pricing &amp; Financial Guidance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/faqs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Intending Parent FAQs
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

export default AspiringParentsPage;
