import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  Scale, 
  ShieldAlert, 
  FileCheck2, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Ban, 
  FileText,
  HeartHandshake,
  Clock,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use & Statutory Service Conditions | Mediyaz ART Bank India",
  description:
    "Official Terms of Use for Mediyaz ART Bank. Compliant with the Assisted Reproductive Technology (Regulation) Act, 2021, ART Rules 2022, PC-PNDT Act 1994, and Indian Contract Act 1872.",
};

export default function TermsOfUsePage() {
  const lastUpdated = "October 14, 2026";

  return (
    <div className="bg-[#f8faf9] min-h-screen text-[#1d3840] selection:bg-[#285b63] selection:text-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#1d3840] to-[#285b63] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-5">
            <Scale className="w-4 h-4 text-emerald-300" />
            Statutory Clinical &amp; Legal Framework
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Terms of Use &amp; Service Agreement
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            These terms govern all registrations, gamete cryopreservation, clinical screenings, and hospital allocations at Mediyaz ART Bank in strict accordance with the <strong>Assisted Reproductive Technology (Regulation) Act, 2021</strong>, the <strong>ART Rules, 2022</strong>, and the <strong>PC-PNDT Act, 1994</strong>.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/70">
            <span><strong>Applicable Laws:</strong> Acts of Parliament of India</span>
            <span>•</span>
            <span><strong>Last Revised:</strong> {lastUpdated}</span>
            <span>•</span>
            <span><strong>Forum:</strong> New Delhi Jurisdiction</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Sticky Index */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#285b63]" />
                Terms Index
              </h2>
              <nav className="text-xs space-y-2 text-slate-600">
                <a href="#acceptance" className="block hover:text-[#285b63] transition-colors">1. Binding Agreement</a>
                <a href="#prohibitions" className="block hover:text-[#285b63] transition-colors font-semibold text-rose-700">2. Statutory Prohibitions</a>
                <a href="#altruism" className="block hover:text-[#285b63] transition-colors">3. Altruistic Standards</a>
                <a href="#eligibility" className="block hover:text-[#285b63] transition-colors">4. Donor Eligibility Criteria</a>
                <a href="#clinic-requisition" className="block hover:text-[#285b63] transition-colors">5. ART Clinic Requisition</a>
                <a href="#quarantine" className="block hover:text-[#285b63] transition-colors">6. 180-Day Quarantine</a>
                <a href="#liability" className="block hover:text-[#285b63] transition-colors">7. Clinical Disclaimers</a>
                <a href="#jurisdiction" className="block hover:text-[#285b63] transition-colors font-semibold text-[#285b63]">8. Jurisdiction &amp; Law</a>
              </nav>
            </div>
          </aside>

          {/* Terms Content Body */}
          <main className="lg:col-span-3 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            {/* Clause 1 */}
            <section id="acceptance" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 01</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Acceptance of Terms &amp; Regulatory Licensure
              </h2>
              <p>
                By accessing this portal, submitting an intake dossier, registering as a donor candidate, or placing an official clinical requisition as a licensed fertility clinic, you agree to be bound by these Terms of Use and all statutory covenants set forth by the <strong>Ministry of Health and Family Welfare (MOHFW)</strong>, Government of India.
              </p>
              <p className="mt-3">
                Mediyaz ART Bank operates exclusively as an accredited Assisted Reproductive Technology Bank holding valid registration under Section 15 of the <strong>Assisted Reproductive Technology (Regulation) Act, 2021</strong>. We are not an IVF treatment clinic; we function as a specialized repository and screening institution supplying quarantined biological gametes to registered Level 1 and Level 2 ART Clinics.
              </p>
            </section>

            {/* Clause 2 - CRITICAL STATUTORY PROHIBITIONS */}
            <section id="prohibitions" className="bg-rose-50/50 p-6 sm:p-8 rounded-2xl border-2 border-rose-300 shadow-xs">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-1">
                <Ban className="w-4 h-4" />
                Statutory Prohibitions Under Indian Criminal Law
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mb-3">
                Zero Tolerance: Commercial Sale, Sex Selection &amp; Surrogacy
              </h2>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-800">
                <div className="bg-white p-4 rounded-xl border border-rose-200">
                  <h4 className="font-bold text-rose-950 mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    A. Absolute Ban on Commercial Sale of Gametes (Section 27)
                  </h4>
                  <p>
                    Under Section 27(1) of the ART Act 2021, human oocytes and semen cannot be bought, sold, traded, or commercialized. Any monetary exchange other than approved statutory medical expense reimbursements and insurance under Rule 13 constitutes a cognizable criminal offense punishable with rigorous imprisonment up to 12 years and fines up to ₹25,00,000.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-rose-200">
                  <h4 className="font-bold text-rose-950 mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    B. Strict Prohibition of Sex Determination (PC-PNDT Act, 1994)
                  </h4>
                  <p>
                    In accordance with the <strong>Pre-Conception and Pre-Natal Diagnostic Techniques (Prohibition of Sex Selection) Act, 1994</strong>, Mediyaz ART Bank does not perform, facilitate, entertain, or disclose any sex selection tests, sperm sorting for gender preference, or pre-implantation sex determination. Any inquiry soliciting sex selection will be immediately reported to the State Appropriate Authority.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-rose-200">
                  <h4 className="font-bold text-rose-950 mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    C. Total Prohibition of Commercial Surrogacy (Surrogacy Act, 2021)
                  </h4>
                  <p>
                    Under the <strong>Surrogacy (Regulation) Act, 2021</strong>, commercial surrogacy is completely illegal in India. Mediyaz ART Bank operates strictly as a gamete bank; we do not provide, facilitate, arrange, or recruit surrogate mothers under any circumstances.
                  </p>
                </div>
              </div>
            </section>

            {/* Clause 3 */}
            <section id="altruism" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 03</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Altruistic Standards &amp; Rule 13 Medical Insurance
              </h2>
              <p>
                All gamete donations facilitated through Mediyaz are fundamentally altruistic. Donors do not receive remuneration or commercial compensation for biological material.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <h4 className="font-bold text-[#1d3840] mb-2 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#285b63]" />
                  Statutory Rights of Oocyte Donors Under Rule 13:
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                  <li><strong>12-Month Health Insurance:</strong> Mandatory health insurance underwritten by an IRDAI-registered general insurance company covering any clinical complications, hospitalization, or ovarian hyperstimulation syndrome (OHSS) arising from the retrieval process.</li>
                  <li><strong>Statutory Out-of-Pocket Reimbursements:</strong> Actual travel allowances, conveyance, nutrition allowances, and clinical examination fees directly disbursed to the donor&apos;s personal bank account in compliance with MOHFW guidelines.</li>
                </ul>
              </div>
            </section>

            {/* Clause 4 */}
            <section id="eligibility" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 04</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Donor Eligibility Criteria (Section 27 Mandates)
              </h2>
              <p>
                To qualify as an eligible donor on our register, candidates must satisfy the non-derogable standards specified under Indian law:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-rose-800 mb-2">Oocyte (Egg) Donor Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Female citizen aged between <strong>23 and 35 years</strong>.</li>
                    <li>Must be ever-married with <strong>at least one living child</strong> of her own, who has reached a minimum age of three (3) years.</li>
                    <li>Execution of mandatory written consent by her spouse/husband.</li>
                    <li><strong>Single Lifetime Limit:</strong> Permitted to donate oocytes only once in her entire lifetime.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-teal-800 mb-2">Semen (Sperm) Donor Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Male citizen aged between <strong>21 and 55 years</strong>.</li>
                    <li>Strict physical, chromosomal, and viral serology clearance.</li>
                    <li>Willingness to undergo the mandatory 180-day cryogenic quarantine protocol with re-testing.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Clause 5 */}
            <section id="clinic-requisition" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 05</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Clinic Requisition &amp; Direct-to-Consumer Prohibition
              </h2>
              <p>
                Mediyaz ART Bank strictly complies with Section 21 of the ART Act 2021:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600">
                <li>Gametes are supplied <strong>exclusively to registered ART Clinics</strong> upon submission of a formal medical requisition signed by the registered medical practitioner (Form 14).</li>
                <li><strong>No Individual Handover:</strong> We do not deliver, sell, or release gametes directly to intending parents, individuals, or unauthorized courier agents.</li>
                <li>All shipments are transported in certified dry vapor liquid nitrogen shippers (-196°C) equipped with real-time temperature loggers.</li>
              </ul>
            </section>

            {/* Clause 6 */}
            <section id="quarantine" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 06</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Statutory 180-Day Cryogenic Quarantine (Semen)
              </h2>
              <p>
                Under ART Rules 2022, all donor semen specimens must remain in liquid nitrogen cryogenic storage for a minimum mandatory quarantine period of <strong>one hundred eighty (180) days</strong>.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Prior to clinical release, the donor must undergo repeat blood serological testing for HIV I &amp; II, HBsAg, Anti-HCV, and Syphilis to eliminate the diagnostic window period. No sperm vial can be requisitioned or released before the completion and verification of this secondary screening.
              </p>
            </section>

            {/* Clause 7 */}
            <section id="liability" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 07</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Clinical Disclaimers &amp; Limitation of Liability
              </h2>
              <p>
                While Mediyaz certifies comprehensive genetic karyotyping, HPLC Thalassemia testing, and cryogenic cold-chain integrity, human assisted reproduction depends on complex clinical factors governed by the treating ART clinic:
              </p>
              <div className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                <p>• <strong>No Clinical Outcome Guarantee:</strong> Mediyaz does not guarantee fertilization rates, embryo grading, implantation, pregnancy, or live birth.</p>
                <p>• <strong>Independent Medical Advice:</strong> Intending parents must consult their registered fertility specialist regarding gamete compatibility and clinical suitability.</p>
                <p>• <strong>Cap on Liability:</strong> To the maximum extent permitted under Indian law, Mediyaz ART Bank&apos;s total aggregate liability arising out of any supply contract shall not exceed the invoice fee paid for the specific gamete batch requisitioned.</p>
              </div>
            </section>

            {/* Clause 8 */}
            <section id="jurisdiction" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Clause 08</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms of Use shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong>Republic of India</strong>.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Any legal claim, dispute, or proceeding arising under or in connection with these Terms or the services of Mediyaz ART Bank shall be subject to the exclusive jurisdiction of the competent courts of <strong>New Delhi, India</strong>, after exhausting mandatory statutory grievance redressal avenues.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
