import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Mail, 
  Phone, 
  Building2, 
  AlertCircle,
  EyeOff,
  Database,
  UserCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection Charter | Mediyaz ART Bank India",
  description:
    "Official Privacy Policy of Mediyaz ART Bank compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act) and Section 28 of the Assisted Reproductive Technology (Regulation) Act, 2021. Learn how donor anonymity and clinical records are protected.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 14, 2026";

  return (
    <div className="bg-[#f8faf9] min-h-screen text-[#1d3840] selection:bg-[#285b63] selection:text-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#1d3840] to-[#285b63] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Statutory Data Protection Charter
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Privacy Policy &amp; Confidentiality Protocols
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            Operating under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and <strong>Section 28 of the Assisted Reproductive Technology (Regulation) Act, 2021</strong>, Mediyaz ART Bank enforces strict anonymity, biometric isolation, and encrypted medical records.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/70">
            <span><strong>Effective Date:</strong> January 1, 2025</span>
            <span>•</span>
            <span><strong>Last Revised:</strong> {lastUpdated}</span>
            <span>•</span>
            <span><strong>Jurisdiction:</strong> Republic of India</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#285b63]" />
                Charter Index
              </h2>
              <nav className="text-xs space-y-2 text-slate-600">
                <a href="#fiduciary" className="block hover:text-[#285b63] transition-colors">1. Data Fiduciary Identity</a>
                <a href="#data-collected" className="block hover:text-[#285b63] transition-colors">2. Categories of Data</a>
                <a href="#anonymity" className="block hover:text-[#285b63] transition-colors font-semibold text-[#285b63]">3. Section 28 Anonymity</a>
                <a href="#aadhaar" className="block hover:text-[#285b63] transition-colors">4. Aadhaar &amp; Biometrics</a>
                <a href="#purpose" className="block hover:text-[#285b63] transition-colors">5. Lawful Purpose</a>
                <a href="#retention" className="block hover:text-[#285b63] transition-colors">6. Cryo-Record Retention</a>
                <a href="#rights" className="block hover:text-[#285b63] transition-colors">7. Data Principal Rights</a>
                <a href="#security" className="block hover:text-[#285b63] transition-colors">8. Security &amp; Encryption</a>
                <a href="#grievance" className="block hover:text-[#285b63] transition-colors font-semibold text-rose-700">9. Grievance Officer</a>
              </nav>
            </div>
          </aside>

          {/* Policy Clauses Body */}
          <main className="lg:col-span-3 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            {/* Clause 1 */}
            <section id="fiduciary" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 01</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Identity of the Data Fiduciary
              </h2>
              <p>
                <strong>Mediyaz ART Bank</strong> (&quot;Mediyaz&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;the Bank&quot;) is a registered Assisted Reproductive Technology Bank in India, established in compliance with Section 15 of the <strong>Assisted Reproductive Technology (Regulation) Act, 2021 (Act No. 42 of 2021)</strong> and the <strong>Assisted Reproductive Technology (Regulation) Rules, 2022</strong>.
              </p>
              <p className="mt-3">
                For the purposes of the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, Mediyaz ART Bank functions as a <em>Data Fiduciary</em> determining the purpose and means of processing personal data relating to voluntary gamete donors, intending parents, registered ART fertility clinics, and referral personnel across India.
              </p>
            </section>

            {/* Clause 2 */}
            <section id="data-collected" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 02</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Categories of Personal &amp; Sensitive Health Data Collected
              </h2>
              <p>
                In strict adherence to clinical standards mandated by the <strong>National Assisted Reproductive Technology and Surrogacy Board</strong>, we collect only data necessary for legal eligibility, genetic screening, and cryogenic safety:
              </p>

              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-[#1d3840] flex items-center gap-2 text-sm">
                    <UserCheck className="w-4 h-4 text-[#285b63]" />
                    A. Voluntary Donors (Oocyte &amp; Semen Candidates)
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-xs sm:text-sm space-y-1.5 text-slate-600">
                    <li><strong>Statutory Demographic &amp; Marital Status:</strong> Full legal name, date of birth, marital status, and proof of living child (&ge; 3 years of age) as required under Section 27 for female oocyte donors.</li>
                    <li><strong>Masked Aadhaar Verification:</strong> 12-digit UID verification via UIDAI-compliant offline XML / virtual ID. Raw Aadhaar numbers are never stored in unmasked form.</li>
                    <li><strong>Genetic &amp; Serological Health Records:</strong> Hemoglobin HPLC (Thalassemia carrier screening), 550-band G-banding karyotyping, G6PD assays, infectious viral serology (HIV I &amp; II, HBsAg, Anti-HCV, VDRL/Syphilis).</li>
                    <li><strong>Phenotypic Profiles:</strong> Height, weight, eye color, hair texture, skin tone, educational qualifications, native language, and professional background (used solely for non-identifying phenotypic matching).</li>
                    <li><strong>Banking Coordinates:</strong> Bank account number, IFSC code, and PAN for processing statutory out-of-pocket medical expense reimbursements and mandatory 12-month health insurance under Rule 13.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-[#1d3840] flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-[#285b63]" />
                    B. Registered ART Fertility Clinics &amp; Treating Specialists
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-xs sm:text-sm space-y-1.5 text-slate-600">
                    <li>State Appropriate Authority ART Clinic Registration Certificate and Level 1 / Level 2 classification.</li>
                    <li>Treating reproductive endocrinologist/embryologist name, registration number, medical requisition documents (Form 14), and clinic shipping coordinates.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Clause 3 - CRITICAL STATUTORY CLAUSE */}
            <section id="anonymity" className="bg-emerald-50/50 p-6 sm:p-8 rounded-2xl border-2 border-emerald-300 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                <EyeOff className="w-4 h-4" />
                Statutory Non-Negotiable Mandate
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 mb-3">
                Section 28 Anonymity Firewall — Absolute Prohibition of Identity Sharing
              </h2>
              <p className="text-emerald-950 font-medium leading-relaxed">
                In strict compliance with <strong>Section 28 of the Assisted Reproductive Technology (Regulation) Act, 2021</strong>:
              </p>
              <div className="mt-3 bg-white p-5 rounded-xl border border-emerald-200 text-xs sm:text-sm space-y-3 text-slate-800">
                <p>
                  <strong>1. Shielded Non-Identifying Matching:</strong> Intending parents and registered fertility clinics are provided access only to <em>non-identifying phenotypic summaries</em> (blood group, height, educational background, hobbies, and genetic carrier clearance).
                </p>
                <p>
                  <strong>2. Zero Donor Photo Disclosure:</strong> Photographic records, full legal names, residential addresses, and contact numbers of gamete donors are permanently withheld from intending parents and treating clinics.
                </p>
                <p>
                  <strong>3. Reciprocal Protection:</strong> The identity and clinical files of the recipient couple/intending parents are never made accessible to the donor.
                </p>
                <p>
                  <strong>4. Legal Exceptions:</strong> Under Indian law, identifying records can be disclosed <em>only and exclusively</em> upon a formal, sealed order issued by a court of competent jurisdiction (High Court or Supreme Court of India) in rare, life-threatening genetic medical investigations.
                </p>
              </div>
            </section>

            {/* Clause 4 */}
            <section id="aadhaar" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 04</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Aadhaar Authentication &amp; Biometric Anti-Duplication
              </h2>
              <p>
                Under Section 27 of the ART Act 2021, an oocyte donor may donate oocytes <strong>only once in her lifetime</strong>. To enforce this statutory safety protocol without compromising privacy:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600">
                <li>We conduct identity verification using UIDAI-compliant offline verification.</li>
                <li>Biometric verification hashes are mapped to a secure national de-duplication registry to guarantee that no candidate undergoes repeated stimulation cycles across multiple banks or hospitals.</li>
                <li>Raw biometrics and unmasked Aadhaar numbers are never stored in plain text or sold to third-party data brokers.</li>
              </ul>
            </section>

            {/* Clause 5 */}
            <section id="purpose" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 05</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Lawful Purpose &amp; Consent Architecture
              </h2>
              <p>
                Data processing is executed strictly under the lawful grounds established in Section 6 and Section 7 of the DPDP Act 2023:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#1d3840] block mb-1">Form 13 Informed Consent</span>
                  Every donor executes statutory Form 13 with full medical counseling before clinical inclusion.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#1d3840] block mb-1">Legal Obligation Fulfillment</span>
                  Processing is mandatory to comply with quarterly filings to the National ART Registry under the Ministry of Health and Family Welfare (MOHFW).
                </div>
              </div>
            </section>

            {/* Clause 6 */}
            <section id="retention" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 06</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Cryo-Chain Records &amp; Data Retention Period
              </h2>
              <p>
                In accordance with <strong>Rule 9 of the Assisted Reproductive Technology (Regulation) Rules, 2022</strong>, all records relating to donor screening, cryopreservation temperatures, liquid nitrogen logbooks, and gamete disposition must be preserved for a statutory duration of not less than <strong>ten (10) years</strong>, or as specified by the National Board.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-slate-600">
                Following the expiration of statutory retention mandates and resolution of all regulatory requirements, archival records are purged or permanently anonymized using cryptographically irreversible methods.
              </p>
            </section>

            {/* Clause 7 */}
            <section id="rights" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 07</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Data Principal Rights Under the DPDP Act, 2023
              </h2>
              <p>
                As a Data Principal residing in India, you are entitled to statutory rights under Section 11, 12, and 13 of the DPDP Act 2023:
              </p>
              <div className="mt-3 space-y-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Right to Access Summary:</strong> Request an overview of personal data undergoing processing and identity of Data Fiduciaries.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Right to Correction:</strong> Rectify inaccurate, incomplete, or out-of-date demographic details.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Right of Grievance Redressal:</strong> Register grievances directly with our designated Grievance Officer, with escalation rights to the Data Protection Board of India.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Statutory Exception:</strong> The right to erasure does not supersede mandatory statutory medical retention obligations mandated under the ART Act 2021.</span>
                </div>
              </div>
            </section>

            {/* Clause 8 */}
            <section id="security" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-bold text-[#285b63] tracking-wider uppercase">Section 08</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1d3840] mt-1 mb-4">
                Technical Security Safeguards &amp; ISO Standards
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <Lock className="w-5 h-5 text-[#285b63] mx-auto mb-2" />
                  <span className="font-bold block text-slate-800">AES-256 Bit</span>
                  <span className="text-[11px] text-slate-500">Database encryption at rest for all clinical dossiers</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <Database className="w-5 h-5 text-[#285b63] mx-auto mb-2" />
                  <span className="font-bold block text-slate-800">TLS 1.3 In-Transit</span>
                  <span className="text-[11px] text-slate-500">Encrypted pipeline between browser, API, and cloud DB</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <ShieldCheck className="w-5 h-5 text-[#285b63] mx-auto mb-2" />
                  <span className="font-bold block text-slate-800">Role-Based Access</span>
                  <span className="text-[11px] text-slate-500">Multi-factor administrative auth with immutable audit logs</span>
                </div>
              </div>
            </section>

            {/* Clause 9 - STATUTORY GRIEVANCE OFFICER */}
            <section id="grievance" className="bg-rose-50/50 p-6 sm:p-8 rounded-2xl border-2 border-rose-200 shadow-xs">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-1">
                <Mail className="w-4 h-4" />
                Statutory Redressal Mechanism
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mb-3">
                Grievance Redressal Officer (Indian DPDP Act &amp; IT Rules)
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm">
                In compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Grievance Officer for Mediyaz ART Bank is:
              </p>

              <div className="mt-4 bg-white p-5 rounded-xl border border-rose-200 text-xs sm:text-sm space-y-2 text-slate-800">
                <p><strong>Designation:</strong> Chief Compliance &amp; Grievance Redressal Officer</p>
                <p><strong>Entity:</strong> Mediyaz ART Bank (A Unit of Mediyaz Healthcare Pvt. Ltd.)</p>
                <p><strong>Office Address:</strong> ART Bank Regulatory Wing, New Delhi, India</p>
                <p><strong>Grievance Email:</strong> <a href="mailto:grievance@mediyaz.com" className="text-rose-700 font-semibold underline">grievance@mediyaz.com</a></p>
                <p><strong>Helpline:</strong> <a href="tel:+919667780807" className="text-rose-700 font-semibold">+91 9667780807</a></p>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  Statutory Redressal Commitment: All privacy grievances and subject access requests are formally acknowledged within 48 hours and resolved within thirty (30) calendar days as prescribed under Indian law.
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
