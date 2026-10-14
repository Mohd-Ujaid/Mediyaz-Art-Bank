import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ShieldCheck, 
  FileCheck, 
  Dna, 
  Microscope, 
  Scale, 
  Award, 
  CheckCircle2, 
  Building2, 
  Clock, 
  HeartHandshake,
  AlertCircle,
  FileSpreadsheet,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "ART Act 2021 Statutory Compliance & Quality Manual | Mediyaz ART Bank India",
  description:
    "Comprehensive guide to Mediyaz ART Bank's adherence to the Assisted Reproductive Technology (Regulation) Act, 2021 and Rules 2022. Overview of Form 13/14 filings, Rule 13 insurance, 180-day cryo-quarantine, and genetic screening standards.",
};

export default function CompliancePage() {
  const complianceChecklist = [
    {
      mandate: "Bank Registration under Section 15",
      requirement: "Mandatory state and national licensing via the National ART and Surrogacy Registry.",
      status: "100% Certified",
      law: "Section 15, ART Act 2021",
    },
    {
      mandate: "Single-Lifetime Donation Monitoring",
      requirement: "Aadhaar-linked biometric hash check to prevent repeated oocyte stimulation.",
      status: "Active Firewall",
      law: "Section 27(2), ART Act 2021",
    },
    {
      mandate: "Statutory Rule 13 Medical Insurance",
      requirement: "12-month general health insurance policy for oocyte donors against retrieval risks and OHSS.",
      status: "IRDAI-Backed Policy",
      law: "Rule 13, ART Rules 2022",
    },
    {
      mandate: "Mandatory 180-Day Cryo-Quarantine",
      requirement: "Semen specimens locked in liquid nitrogen for 6 months prior to repeat serological release.",
      status: "Cold-Chain Enforced",
      law: "Rule 9, ART Rules 2022",
    },
    {
      mandate: "Statutory Anonymity & Privacy",
      requirement: "Zero donor photo disclosure to parents; non-identifying phenotypic profiles only.",
      status: "Air-Gapped Anonymity",
      law: "Section 28, ART Act 2021",
    },
    {
      mandate: "Form 13 Informed Consent & Undertaking",
      requirement: "Signed donor declaration, husband consent, and clinical counseling dossier.",
      status: "Dual-Witnessed Filings",
      law: "Rule 13, Form 13 Schedule",
    },
    {
      mandate: "Form 14 Clinic Requisition & Custody Handover",
      requirement: "Treating ART clinic requisition with temperature-monitored dry shipper chain of custody.",
      status: "Mandatory Workflow",
      law: "Section 21, Form 14 Schedule",
    },
  ];

  return (
    <div className="bg-[#f8faf9] min-h-screen text-[#1d3840] selection:bg-[#285b63] selection:text-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#1d3840] to-[#285b63] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Statutory Regulatory Manual
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            ART Act 2021 Regulatory Compliance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            Mediyaz ART Bank is an accredited gamete banking institution operating in complete alignment with the <strong>Assisted Reproductive Technology (Regulation) Act, 2021</strong> and the <strong>ART Rules, 2022</strong>. Every specimen and clinical dossier is auditable for statutory regulatory inspections.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Core Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#285b63] flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1d3840] mb-2">Form 13 &amp; 14 Dossiers</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every candidate and hospital shipment is bound by official statutory forms mandated under Indian law, guaranteeing legal traceability and custody verification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1d3840] mb-2">Rule 13 Health Insurance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mandatory 12-month health insurance underwritten by an IRDAI-registered insurer protecting every voluntary oocyte donor against all retrieval-related medical events.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1d3840] mb-2">180-Day Cryo-Quarantine</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strict 6-month cryogenic vapor-phase quarantine with repeat viral serology (HIV, HBV, HCV, VDRL) to eliminate diagnostic window-period infectious risks.
            </p>
          </div>
        </section>

        {/* Clinical Genetic Screening Protocol */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#285b63] uppercase tracking-wider mb-2">
            <Dna className="w-4 h-4" />
            Tier-1 Clinical Genetics
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1d3840] mb-4">
            Statutory Screening &amp; Infectious Serology Protocols
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            In compliance with Section 21 of the ART Act 2021, all donors accepted into Mediyaz ART Bank undergo comprehensive medical pre-screening:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-[#1d3840] mb-2">Genetic &amp; Hematological Assays:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li><strong>Hemoglobin HPLC:</strong> High-performance liquid chromatography for Beta-Thalassemia and hemoglobinopathies.</li>
                <li><strong>550-Band Karyotyping:</strong> Cytogenetic G-banding analysis for structural and numerical chromosomal abnormalities.</li>
                <li><strong>G6PD Assay:</strong> Quantitative glucose-6-phosphate dehydrogenase deficiency screen.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-[#1d3840] mb-2">Infectious Disease Serology (Repeat at Day 180):</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li>HIV I &amp; II (Chemiluminescence / 4th Gen ELISA)</li>
                <li>HBsAg (Hepatitis B Surface Antigen)</li>
                <li>Anti-HCV (Hepatitis C Total Antibodies)</li>
                <li>VDRL / RPR (Syphilis Serology)</li>
                <li>CMV &amp; Rubella IgG/IgM assays</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regulatory Audit Checklist Table */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-bold text-[#285b63] uppercase tracking-wider mb-1">Audit Verification</div>
              <h2 className="font-serif text-2xl font-bold text-[#1d3840]">Statutory Compliance Checklist</h2>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              MOHFW Audit Ready
            </span>
          </div>

          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700">
                  <th className="py-3 px-4 font-bold">Statutory Mandate</th>
                  <th className="py-3 px-4 font-bold">Clinical Requirement</th>
                  <th className="py-3 px-4 font-bold">Governing Statute</th>
                  <th className="py-3 px-4 font-bold text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {complianceChecklist.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row.mandate}</td>
                    <td className="py-3.5 px-4 text-xs leading-relaxed">{row.requirement}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{row.law}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Institutional Contact & Audit Assistance */}
        <section className="bg-gradient-to-r from-[#1d3840] to-[#285b63] text-white p-8 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">Hospital Inspection &amp; Audit Queries</h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Are you an accredited ART clinic needing regulatory verification dossiers, Form 14 requisition forms, or cryogenic cold-chain validation logs?
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contacts"
              className="px-5 py-2.5 rounded-xl bg-white text-[#1d3840] text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs"
            >
              Contact Regulatory Wing
            </Link>
            <Link
              href="/terms"
              className="px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-bold hover:bg-white/20 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
