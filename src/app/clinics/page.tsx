import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "For Registered ART Clinics & Embryologists | Mediyaz ART Bank India",
  description:
    "Partner with Mediyaz ART Bank under Section 21 of the ART Act 2021. Certified donor sperm and oocyte supply, NABL diagnostic testing, and temperature-logged cryo-transit.",
};

const ClinicsPage = () => {
  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/about_1.png"
            alt="ART Clinic Partnership - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1480px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            For Registered ART Clinics
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1480px] px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            {/* INTRO */}
            <div>
              <p className="text-base sm:text-lg leading-relaxed text-[#555]">
                Under Section 21 of the Assisted Reproductive Technology (Regulation) Act, 2021, an ART Bank is statutorily authorized to supply donor gametes exclusively to officially registered ART Clinics (Level 1 and Level 2) upon receipt of a written requisition signed by a registered medical practitioner. Mediyaz ART Bank partners with leading fertility centers and IVF laboratories across India to deliver cryopreserved donor gametes with complete regulatory compliance, full pedigree documentation, and verified cold-chain integrity.
              </p>
            </div>

            {/* CLINICAL ADVANTAGES */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#285b63]">
                Clinical &amp; Regulatory Advantages for Clinics
              </h2>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/40 p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#285d64] text-white flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#285b63] mb-2">
                    Strict Regulatory Compliance (ART Act 2021)
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Complete statutory adherence to National ART Registry reporting, single-lifetime egg donation limits, 180-day semen quarantine, and statutory donor anonymity under Sections 27 and 28.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/40 p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#285d64] text-white flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#285b63] mb-2">
                    NABL Diagnostic &amp; Genetic Transparency
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Every donor profile is backed by comprehensive NABL diagnostic reports: Hb HPLC Thalassemia testing, G6PD enzyme assays, high-resolution G-band karyotypes, and dual serological screening.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/40 p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#285d64] text-white flex items-center justify-center font-bold text-sm mb-3">
                    03
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#285b63] mb-2">
                    Cryo-Viability &amp; Protocol Standardization
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Closed-system vitrification for oocytes and controlled-rate freezing for semen, delivering reliable post-thaw recovery parameters for your embryology team with standardized thaw protocols.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-[#edf3f1]/40 p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#285d64] text-white flex items-center justify-center font-bold text-sm mb-3">
                    04
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#285b63] mb-2">
                    Direct Cold-Chain Transit Coordination
                  </h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    Certified liquid nitrogen dry vapor shippers sustaining -150°C to -196°C, equipped with continuous temperature logging and dual tamper-evident custody seals, delivered directly to your clinic OT.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA BANNER */}
            <div className="mt-12 rounded-2xl bg-[#285d64] p-8 text-white">
              <h3 className="text-2xl font-serif font-semibold">
                Register Your ART Clinic Partnership
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                Streamline donor gamete requisitioning for your clinical practice. Inquire today to establish compliant clinical affiliation agreements under the ART (Regulation) Act, 2021.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/clinics/become-partners"
                  className="rounded-xl bg-[#ff7468] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/contacts"
                  className="rounded-xl bg-white/15 border border-white/30 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/25"
                >
                  Contact Clinical Coordinator
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Clinic Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/clinics/become-partners"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Clinic Partnership Agreement
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
                    → Genetic &amp; Diagnostic Panels
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
              </ul>
            </div>

            <div className="rounded-2xl bg-[#edf3f1] p-6 text-center border border-[#285d64]/10">
              <h4 className="text-lg font-bold font-serif text-[#285b63]">
                Direct Clinical Desk
              </h4>
              <p className="mt-2 text-xs text-[#555] leading-relaxed">
                Reproductive endocrinologists and embryology lab directors can connect directly with our medical directorate.
              </p>
              <a
                href="tel:+919667780807"
                className="mt-3 block font-bold text-base text-[#285d64]"
              >
                +91 9667780807
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ClinicsPage;