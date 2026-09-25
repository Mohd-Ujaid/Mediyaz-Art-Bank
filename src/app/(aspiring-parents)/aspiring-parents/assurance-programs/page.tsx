import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Quality & Cryo-Viability Assurance | Mediyaz ART Bank India",
  description:
    "Learn about Mediyaz ART Bank's clinical quality standards, cryopreservation protocols, and laboratory assurance for donor gametes in India under the ART Act, 2021.",
};

const AssuranceProgramsPage = () => {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/find_donor.jpg"
            alt="Clinical Assurance - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Clinical Assurance
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT MAIN ARTICLE */}
          <article className="min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Quality Assurance &amp; Cryo-Viability Standards
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              Assisted reproduction represents both an emotional and financial commitment for intending parents. While biological processes such as fertilization and pregnancy can never be ethically guaranteed by any responsible medical institution, Mediyaz ART Bank provides stringent <b>laboratory quality assurance</b>, validated cryopreservation protocols, and continuous cold-chain governance in compliance with the <b>Assisted Reproductive Technology (Regulation) Act, 2021</b>.
            </p>

            {/* In-Content CTA Box */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/aspiring_parent_3.3.png"
                  alt="Assurance Consultation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Laboratory Standards Guidance
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Our clinical coordinators work with your treating embryologist to ensure seamless thaw protocols and sample documentation.
                </p>
                <Link
                  href="/contacts"
                  className="mt-4 inline-block rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
                >
                  Consult Our Clinical Team
                </Link>
              </div>
            </div>

            {/* Quality Standards */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Our Four Pillars of Quality Assurance
            </h2>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Pillar 01
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Validated Cryopreservation &amp; Vitrification
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  All oocytes are vitrified using standardized closed-carrier vitrification systems to prevent ice-crystal formation and ensure high post-thaw survival. Semen samples undergo controlled-rate cryopreservation with proven cryoprotectants evaluated according to WHO laboratory benchmarks.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Pillar 02
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Mandatory 6-Month Semen Quarantine
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  In strict adherence to Indian ART guidelines, donor semen is maintained in liquid nitrogen quarantine for a full 180 days. Samples are released to registered clinics only after the donor tests non-reactive on repeat serology for HIV, Hepatitis B, Hepatitis C, and Syphilis.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Pillar 03
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Data-Logged Cold-Chain Transport
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Samples are transported directly to your registered fertility clinic in certified dry vapor liquid nitrogen shippers maintaining stable temperatures below -150°C. Shipments are monitored with calibrated electronic temperature loggers to verify unbroken cold-chain integrity upon delivery.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
                  Pillar 04
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1 mb-2">
                  Laboratory Replacement Protocol
                </h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  In the rare event that donor gametes fail to meet defined post-thaw survival benchmarks due to documented transport anomalies, Mediyaz ART Bank coordinates with your treating clinic to supply replacement screened gametes under our clinical replacement policy without additional banking service charges.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/aspiring-parents/donors"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
              >
                Explore Donor Screening
              </Link>
              <Link
                href="/aspiring-parents/financing"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                View Financial Guidance
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_3.1.png"
                  alt="Quality Standards"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Quality Standards
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Every donor gamete sample adheres to national regulatory and embryological cryo-preservation benchmarks.
                </p>
                <Link
                  href="/aspiring-parents/donors"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
                >
                  View Donor Protocols
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#95e0b9]/40 p-6 text-center border-b border-gray-100">
                <h4 className="font-serif text-xl font-bold text-[#285b63]">
                  Embryology Coordination
                </h4>
              </div>
              <div className="p-6">
                <blockquote className="text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;The temperature logs and thaw documentation provided by Mediyaz ART Bank made lab integration effortless for our clinical team.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Senior Embryologist, Partner IVF Center
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
                    → For Intending Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/donors"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium"
                  >
                    → Our Donors &amp; Screening
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

export default AssuranceProgramsPage;
