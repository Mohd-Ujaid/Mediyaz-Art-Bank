"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Edit3,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  AlertCircle,
  Eye,
  Activity,
  CheckCircle2,
  Calendar,
  Lock,
  Users,
  FileSpreadsheet,
  ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  SpermPersonalInfo,
  SpermContactInfo,
  SpermDonorInfo,
  SpermMedicalInfo,
  SpermEmergencyContact,
  SpermReferral,
  SpermDocuments,
  SpermConsent,
} from "../validations/sperm-registration.schema";

interface SpermRegistrationReviewProps {
  registrationId?: string | null;
  personalInfo: SpermPersonalInfo;
  contactInfo: SpermContactInfo;
  donorInfo: SpermDonorInfo;
  medicalInfo: SpermMedicalInfo;
  emergencyContact: SpermEmergencyContact;
  referral: SpermReferral;
  documents: SpermDocuments;
  consent: SpermConsent;
  errors: Record<string, string>;
  updateConsent: (data: Partial<SpermConsent>) => void;
  onEditStep: (step: number) => void;
}

// Helper component for underlined dynamic fields in legal documents
function DynamicField({
  value,
  fallback = "_______________",
}: {
  value?: string | number | null;
  fallback?: string;
}) {
  return (
    <span className="font-bold underline decoration-slate-400 underline-offset-2 px-1 text-slate-900">
      {value || fallback}
    </span>
  );
}

const formatAddress = (addr = "", city = "", state = "", country = "India", pin = "") => {
  const parts = [addr, city, state, country, pin].filter((p) => Boolean(p?.trim()));
  return parts.length > 0 ? parts.join(", ") : "—";
};

export function SpermRegistrationReview({
  registrationId,
  personalInfo,
  contactInfo,
  donorInfo,
  medicalInfo,
  emergencyContact,
  referral,
  documents,
  consent,
  errors,
  updateConsent,
  onEditStep,
}: SpermRegistrationReviewProps) {
  const [activeTab, setActiveTab] = useState<"details" | "legal" | "both">("both");
  const [previewDoc, setPreviewDoc] = useState<{ url: string; title: string } | null>(null);

  const fullAddress = formatAddress(
    contactInfo.currentAddress,
    contactInfo.city,
    contactInfo.state,
    contactInfo.country,
    contactInfo.pincode
  );

  const permAddress = formatAddress(
    contactInfo.permanentAddress || contactInfo.currentAddress,
    contactInfo.city,
    contactInfo.state,
    contactInfo.country,
    contactInfo.pincode
  );

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const numericMonth = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* ──────────────── HEADER BADGE & TAB SELECTOR ──────────────── */}
      <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/70 via-white to-sky-50/50 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#285b63]/10 text-[#285b63] border border-[#285b63]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#285b63]" />
                Semen (Sperm) Donor Program
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-100 text-teal-800 border border-teal-200">
                <CheckCircle2 className="w-3 h-3 text-teal-700" /> Aadhaar & Mobile Verified
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 font-serif">
              Pre-Submission Profile & Review
            </h3>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Please thoroughly review all recorded personal, clinical, semen donation history, and contact details before confirming legal consent under ART Act 2021.
            </p>
          </div>

          {registrationId && (
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs self-start md:self-center text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Registration Case ID
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#285b63]">
                {registrationId}
              </span>
            </div>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-5 pt-4 border-t border-teal-100/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("both")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "both"
                  ? "bg-white text-[#285b63] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Complete View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "details"
                  ? "bg-white text-[#285b63] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Registration & Contact Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("legal")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "legal"
                  ? "bg-white text-[#285b63] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" /> Registration Form, Contract & Consent
            </button>
          </div>

          <span className="text-[11px] text-slate-500 italic">
            Sections can be updated by clicking <strong>Edit</strong>
          </span>
        </div>
      </div>

      {/* ──────────────── TAB 1: REGISTRATION & CONTACT RECORD SUMMARY ──────────────── */}
      {(activeTab === "details" || activeTab === "both") && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#285b63] flex items-center gap-2">
              <FileText className="w-4 h-4" /> 1. Registration & Profile Details
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Personal & Demographic Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#285b63]" /> Personal Details
                </h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditStep(1)}
                  className="h-7 px-2 text-xs font-semibold text-[#285b63] hover:bg-[#edf3f1] gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Full Legal Name</span>
                  <strong className="text-slate-800">{personalInfo.fullName || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Gender</span>
                  <strong className="text-slate-800">{personalInfo.gender || "Male"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Birth / Age</span>
                  <strong className="text-slate-800">
                    {personalInfo.dateOfBirth || "—"} {personalInfo.age ? `(${personalInfo.age} yrs)` : ""}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Blood Group</span>
                  <strong className="text-[#285b63] font-bold">{personalInfo.bloodGroup || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Marital Status</span>
                  <strong className="text-slate-800">{personalInfo.maritalStatus || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Education</span>
                  <strong className="text-slate-800">{personalInfo.education || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Occupation</span>
                  <strong className="text-slate-800">{personalInfo.occupation || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Aadhaar Number</span>
                  <strong className="font-mono text-slate-800">
                    {personalInfo.aadhaarNumber
                      ? `XXXX-XXXX-${personalInfo.aadhaarNumber.slice(-4)}`
                      : "—"}
                  </strong>
                </div>
                {personalInfo.panNumber && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">PAN Number</span>
                    <strong className="font-mono text-slate-800">{personalInfo.panNumber}</strong>
                  </div>
                )}
                {personalInfo.religion && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Religion</span>
                    <strong className="text-slate-800">{personalInfo.religion}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Phenotypic & Physical Characteristics */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#285b63]" /> Physical & Phenotype Traits
                </h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditStep(1)}
                  className="h-7 px-2 text-xs font-semibold text-[#285b63] hover:bg-[#edf3f1] gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Height</span>
                  <strong className="text-slate-800">{personalInfo.height || "—"}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Weight</span>
                  <strong className="text-slate-800">{personalInfo.weight || "—"}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Complexion</span>
                  <strong className="text-slate-800">{personalInfo.complexion || "—"}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Hair Color</span>
                  <strong className="text-slate-800">{personalInfo.hairColor || "—"}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Eye Color</span>
                  <strong className="text-slate-800">{personalInfo.eyeColor || "—"}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                <span>
                  Physical traits are kept in a secure, non-identifying donor record for matching under ART Act 2021 guidelines.
                </span>
              </div>
            </div>

            {/* Card 3: Contact & Residential Details */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#285b63]" /> Contact & Address Details
                </h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditStep(1)}
                  className="h-7 px-2 text-xs font-semibold text-[#285b63] hover:bg-[#edf3f1] gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Mobile Number (Verified)</span>
                  <strong className="font-mono text-slate-800">{contactInfo.mobileNumber || "—"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Alternate Mobile</span>
                  <strong className="font-mono text-slate-800">{contactInfo.alternateMobile || "—"}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Email Address</span>
                  <strong className="text-slate-800">{contactInfo.emailAddress || "—"}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Current Residential Address</span>
                  <p className="text-slate-700 leading-snug font-medium">{fullAddress}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Permanent Address</span>
                  <p className="text-slate-700 leading-snug">{permAddress}</p>
                </div>
              </div>

              {/* Emergency Contact */}
              {emergencyContact?.contactPersonName && (
                <div className="pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Emergency Contact
                  </span>
                  <div className="flex items-center justify-between text-slate-700 bg-slate-50 p-2 rounded-lg">
                    <span>
                      <strong>{emergencyContact.contactPersonName}</strong> ({emergencyContact.relationship || "Contact"})
                    </span>
                    <span className="font-mono">{emergencyContact.phoneNumber || "—"}</span>
                  </div>
                </div>
              )}

              {/* Referral Details */}
              {referral?.sourceReferralType && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px]">Referral / Channel Source:</span>
                  <span className="font-semibold text-slate-800">
                    {referral.sourceReferralType}{" "}
                    {referral.patientOrDonorId ? `(${referral.patientOrDonorId})` : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Card 4: Semen Donation History & Clinical Profile (Sperm Specific) */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-[#285b63]" /> Semen Donation & Clinical History
                </h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditStep(2)}
                  className="h-7 px-2 text-xs font-semibold text-[#285b63] hover:bg-[#edf3f1] gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-sky-50/60 p-2.5 rounded-lg border border-sky-100">
                  <span className="text-sky-800 font-semibold block text-[10px]">
                    Previous Semen Donation History
                  </span>
                  <strong className="text-base text-sky-900">
                    {donorInfo.previousDonationHistory || "No"}
                  </strong>
                  <span className="text-[10px] text-sky-700 block mt-0.5">
                    {donorInfo.previousDonationHistory === "Yes"
                      ? `${donorInfo.numberOfDonations || "1"} prior donation(s)`
                      : "First time donor registry"}
                  </span>
                </div>

                <div className="bg-teal-50/60 p-2.5 rounded-lg border border-teal-100">
                  <span className="text-teal-800 font-semibold block text-[10px]">
                    Abstinence Period
                  </span>
                  <strong className="text-base text-teal-900">
                    {donorInfo.abstinencePeriod ? `${donorInfo.abstinencePeriod} Days` : "Optimal (2-5 Days)"}
                  </strong>
                  <span className="text-[10px] text-teal-700 block mt-0.5">
                    Clinical semen analysis protocol
                  </span>
                </div>

                {donorInfo.lastDonationDate && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Last Donation Date</span>
                    <strong className="text-slate-800">{donorInfo.lastDonationDate}</strong>
                  </div>
                )}

                {donorInfo.semenAnalysis && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">Semen Analysis Notes</span>
                    <p className="text-slate-700">{donorInfo.semenAnalysis}</p>
                  </div>
                )}

                <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
                  <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>
                    Mandatory 180-day cryogenic quarantine applies to all processed semen samples per ART Act 2021.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#285b63]" /> Uploaded Identity Documents & Digital Signature
              </h5>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(3)}
                className="h-7 px-2 text-xs font-semibold text-[#285b63] hover:bg-[#edf3f1] gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Donor Photograph", doc: documents.passportPhoto, key: "photo" },
                { label: "Aadhaar Front", doc: documents.aadhaarFront, key: "aadhaarFront" },
                { label: "Aadhaar Back", doc: documents.aadhaarBack, key: "aadhaarBack" },
                { label: "Digital Signature", doc: documents.signature, key: "signature" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 flex flex-col items-center text-center text-xs"
                >
                  <span className="text-[10px] font-semibold text-slate-600 line-clamp-1 mb-2">
                    {item.label}
                  </span>
                  {item.doc?.url ? (
                    <div className="space-y-1.5">
                      <div className="w-20 h-16 rounded border border-slate-200 bg-white overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                        <img
                          src={item.doc.url}
                          alt={item.label}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewDoc({ url: item.doc!.url, title: item.label })}
                        className="inline-flex items-center gap-1 text-[10px] text-[#285b63] font-bold hover:underline"
                      >
                        <Eye className="w-2.5 h-2.5" /> View
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-16 rounded border border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 italic">
                      Not Uploaded
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── TAB 2: STATUTORY LEGAL FORMS, CONTRACT & FORM 15 ──────────────── */}
      {(activeTab === "legal" || activeTab === "both") && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#285b63] flex items-center gap-2">
              <ScrollText className="w-4 h-4" /> 2. Semen Donor Registration Form & Legal Agreement
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">
              Official Formats under ART (Regulation) Act, 2021 & Rules, 2022
            </span>
          </div>

          {/* ──── SHEET 1: REGISTRATION FORM FOR SPERM DONOR ──── */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-6 md:p-8 space-y-6 font-serif relative">
            <div className="text-center pb-4 border-b border-slate-200">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#285b63] uppercase block mb-1">
                Mediyaz ART Bank • Form ART-SD-01
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wide text-slate-900 underline underline-offset-4">
                REGISTRATION FORM FOR SPERM DONOR
              </h3>
              <p className="text-xs font-sans text-slate-500 mt-1 font-normal">
                शुक्राणु दाता पंजीकरण प्रपत्र (असिस्टेड रिप्रोडक्टिव टेक्नोलॉजी विनियम 2021)
              </p>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-justify text-slate-800 leading-relaxed font-serif">
              <p>
                I, Mr <DynamicField value={personalInfo.fullName} /> age{" "}
                <DynamicField value={personalInfo.age} /> years, R/o{" "}
                <DynamicField value={fullAddress} />; having Aadhaar Card No.{" "}
                <DynamicField value={personalInfo.aadhaarNumber} /> and date of birth{" "}
                <DynamicField value={personalInfo.dateOfBirth} />, is willing to donate my
                Sperm to needy couple/woman and agree to abide by following terms.
              </p>

              <p className="text-slate-600">
                मैं, श्री <DynamicField value={personalInfo.fullName} />, आयु{" "}
                <DynamicField value={personalInfo.age} /> वर्ष, निवासी{" "}
                <DynamicField value={fullAddress} />; आधार कार्ड संख्या{" "}
                <DynamicField value={personalInfo.aadhaarNumber} /> और जन्म तिथि{" "}
                <DynamicField value={personalInfo.dateOfBirth} /> है। ज़रूरतमंद कपल/महिला को
                अपना स्पर्म डोनेट करने को तैयार हूँ और नीचे दी गई शर्तों को मानने के लिए सहमत हूँ।
              </p>

              <ol className="list-decimal pl-5 space-y-3.5 mt-4 text-xs">
                <li className="pl-2">
                  <p>
                    My date of birth <DynamicField value={personalInfo.dateOfBirth} /> age as on today is more than twenty-one years and less than fifty-five years.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मेरी जन्मतिथि <DynamicField value={personalInfo.dateOfBirth} /> है, आज के हिसाब से मेरी उम्र इक्कीस साल से ज़्यादा और पचपन साल से कम है।
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I agree that I am registering for donating my Sperm for non-commercial purpose and for the purposes of assisted reproductive technology services arising due to infertility, disease and/or social and medical concerns.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं सहमत हूँ कि मैं अपने स्पर्म को गैर-व्यावसायिक उद्देश्य के लिए और बांझपन, बीमारी और/या सामाजिक और मेडिकल चिंताओं के कारण होने वाली सेवाओं के लिए दान करने के लिए रजिस्टर कर रहा हूँ।
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I agree that I am willing to undergo pathology tests which are required to be done under the provisions of the Assisted Reproductive Technology (Regulation) Act, 2021 and Rules made thereunder.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं सहमत हूँ कि मैं पैथोलॉजी टेस्ट कराने का इच्छुक हूँ, जो कि सहायक प्रजनन प्रौद्योगिकी (विनियमन) अधिनियम, 2021 के प्रावधानों के तहत आवश्यक है।
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I confirm that at this stage and to the best of my knowledge I am not suffering from any known infectious diseases or genetic disorders.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं पुष्टि करता हूँ कि इस स्तर पर और जहाँ तक मेरी जानकारी है, मैं किसी ज्ञात संक्रामक रोग या आनुवंशिक विकार से पीड़ित नहीं हूँ।
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I agree that I will donate my Sperm to the needy couple/woman and go to the ART bank whenever informed by ART Bank namely (MEDIYAZ ART BANK) in the event my Sperm is collected and preserved, same may be used for statutory purposes.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं सहमत हूँ कि मैं ज़रूरतमंद कपल/महिला को अपना स्पर्म डोनेट करूँगा और जब भी ART बैंक (मेडियाज़ आर्ट बैंक) द्वारा मुझे बताया जाएगा, तो मैं वहाँ जाऊँगा...
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I agree and affirm that I will not try to know the identity of recipient and disclose the same to any person in the event the identity of recipient comes within my knowledge as per law.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं सहमत हूँ और पुष्टि करता हूँ कि मैं प्राप्तकर्ता की पहचान जानने की कोशिश नहीं करूँगा और कानून के अनुसार प्राप्तकर्ता की पहचान का खुलासा नहीं करूँगा।
                  </p>
                </li>

                <li className="pl-2">
                  <p>
                    I undertake and confirm that I am registering myself for donating my sperm with ART Bank namely (MEDIYAZ ART BANK) for the first time and confirm all stated details are true.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    मैं यह वादा करता हूँ और पुष्टि करता हूँ कि मैं पहली बार ART बैंक (मेडियाज़ आर्ट बैंक) में अपना स्पर्म डोनेट करने के लिए रजिस्टर कर रहा हूँ और सभी तथ्य सत्य हैं।
                  </p>
                </li>
              </ol>
            </div>

            {/* Signature Block */}
            <div className="flex justify-between items-end mt-8 pt-6 border-t border-slate-200 text-xs">
              <div className="text-center">
                <div className="font-serif italic text-sm mb-1 min-h-[48px] flex items-end justify-center">
                  {documents?.signature?.url ? (
                    <img
                      src={documents.signature.url}
                      alt="Donor Signature"
                      className="max-h-12 max-w-[140px] object-contain inline-block"
                    />
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">Digital Signature on File</span>
                  )}
                </div>
                <div className="border-t border-black w-44 mx-auto pt-1 font-bold">
                  Sperm Donor Signature
                  <br />
                  <span className="font-normal text-[10px] text-slate-500">
                    शुक्राणु दाता हस्ताक्षर
                  </span>
                </div>
              </div>

              <div className="text-center font-bold">
                <div className="mb-1 min-h-[48px] flex items-end justify-center">
                  <img
                    src="/images/signature.png"
                    alt="Director Signature"
                    className="max-h-12 max-w-[140px] object-contain inline-block"
                  />
                </div>
                <div className="border-t border-black w-44 mx-auto pt-1">
                  Mr. IMTIYAZ SHAIKH
                </div>
                <div className="text-[10px] font-normal text-slate-600">Director / Proprietor</div>
                <div className="text-[10px] font-normal text-slate-500">For MEDIYAZ ART BANK</div>
              </div>
            </div>
          </div>

          {/* ──── SHEET 2: CONTRACT BETWEEN ART BANK AND SEMEN DONOR ──── */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-6 md:p-8 space-y-6 font-serif relative">
            <div className="text-center pb-4 border-b border-slate-200">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#285b63] uppercase block mb-1">
                Cryopreservation Agreement
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wide text-slate-900 underline underline-offset-4">
                Contract between the ART bank and the Semen Donor
              </h3>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-justify text-slate-800 leading-relaxed font-serif">
              <p>
                The ART bank and the Donor agree to come into this contract today on the{" "}
                <DynamicField value={day} /> day of <DynamicField value={month} />, {year} as per the following conditions:
              </p>

              <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-lg border border-slate-200 text-xs">
                <p>
                  <strong>First Part:</strong> MEDIYAZ ART BANK, 366/4, Govindpuri Kalkaji, New Delhi 110019.
                </p>
                <p>
                  <strong>Second Part:</strong> Mr. <DynamicField value={personalInfo.fullName} />, age{" "}
                  <DynamicField value={personalInfo.age} /> years, R/o <DynamicField value={fullAddress} />; Aadhaar No.{" "}
                  <DynamicField value={personalInfo.aadhaarNumber} /> and date of birth{" "}
                  <DynamicField value={personalInfo.dateOfBirth} />, herein referred to as the Donor.
                </p>
              </div>

              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li className="pl-2">
                  The ART Bank agrees to accept the semen of the Donor and to cryopreserve it under mandatory 180-day quarantine as per the rules laid down in the ART (Regulation) Act, 2021.
                </li>
                <li className="pl-2">
                  The Donor agrees to disclose true health and hereditary history to the Bank without suppressing any material personal information.
                </li>
                <li className="pl-2">
                  The Donor agrees to relinquish all parental and legal rights over any child conceived from his donated gamete.
                </li>
                <li className="pl-2">
                  The Bank agrees to inform the Donor about all infectious and pathology tests necessary for the safety and protection of assisted reproduction procedures.
                </li>
                <li className="pl-2">
                  If the semen sample is not of acceptable clinical quality, the Donor agrees that the collected sample may be discarded per standard operating procedures.
                </li>
              </ol>
            </div>

            {/* Signature Block */}
            <div className="flex justify-between items-end mt-8 pt-6 border-t border-slate-200 text-xs">
              <div className="text-center font-bold">
                <div className="mb-1 min-h-[48px] flex items-end justify-center">
                  <img
                    src="/images/signature.png"
                    alt="Director Signature"
                    className="max-h-12 max-w-[140px] object-contain inline-block"
                  />
                </div>
                <div className="border-t border-black w-44 mx-auto pt-1">
                  Signature of ART Bank
                </div>
                <div className="text-[10px] font-normal text-slate-500">First Part</div>
              </div>

              <div className="text-center">
                <div className="font-serif italic text-sm mb-1 min-h-[48px] flex items-end justify-center">
                  {documents?.signature?.url ? (
                    <img
                      src={documents.signature.url}
                      alt="Donor Signature"
                      className="max-h-12 max-w-[140px] object-contain inline-block"
                    />
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">Digital Signature on File</span>
                  )}
                </div>
                <div className="border-t border-black w-44 mx-auto pt-1 font-bold">
                  Signature of Donor
                </div>
                <div className="text-[10px] font-normal text-slate-500">Second Part</div>
              </div>
            </div>
          </div>

          {/* ──── SHEET 3: FORM 15 CONSENT FORM FOR DONOR SPERM ──── */}
          <div className="bg-white border border-slate-300 shadow-sm rounded-2xl p-6 md:p-8 space-y-6 font-serif relative">
            <div className="text-center pb-4 border-b border-slate-200">
              <p className="text-xs font-sans text-slate-500">[See rule 13 (2) (ii)]</p>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wide text-slate-900 underline underline-offset-4 mt-1">
                FORM 15 — CONSENT FORM FOR THE DONOR SPERM
              </h3>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-justify text-slate-800 leading-relaxed font-serif">
              <p>
                I, Mr. <DynamicField value={personalInfo.fullName} /> Address: R/o{" "}
                <DynamicField value={fullAddress} /> Mobile number:{" "}
                <DynamicField value={contactInfo.mobileNumber} /> Aadhaar card number:{" "}
                <DynamicField value={personalInfo.aadhaarNumber} /> Willingly consent to donate my sperm to couple/individual who are unable to have a child by other means. At this stage and to the best of my knowledge I am free of any infectious diseases or genetic disorders.
              </p>

              <p>
                I have had a full discussion with Dr. Sanaul haq Hashmi (Clinician) Mediyaz ART Bank - 366/4 Govindpuri Kalkaji South Delhi 110019 on{" "}
                <DynamicField value={`${day} ${month} ${year}`} />.
              </p>

              <p>
                I understand that there will be no direct or indirect contact between the recipient and me, and my personal identity will not be disclosed to the recipient or to any child born through the use of my gametes.
              </p>

              <p>
                I understand that I shall have no parental rights whatsoever on the resulting offspring and vice versa.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 underline mb-2">
                  Endorsement by the ART Bank
                </h4>
                <p className="text-xs text-slate-600">
                  I/we have personally explained to <DynamicField value={personalInfo.fullName} /> the details and implications of his signing this consent/approval form, and made sure to the extent humanly possible that he understands these details and implications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-xs">
                  <div>
                    <div className="border-b border-black w-full h-8 flex items-end">
                      <span className="text-[11px] font-serif italic text-slate-700">Dr. Sanaul haq Hashmi</span>
                    </div>
                    <p className="text-[10px] font-bold mt-1 text-slate-700">
                      Name and signature of the Doctor
                    </p>
                  </div>
                  <div>
                    <div className="mb-1">
                      <img
                        src="/images/signature.png"
                        alt="Witness Signature"
                        className="max-h-10 max-w-[120px] object-contain inline-block"
                      />
                    </div>
                    <div className="border-t border-black w-full pt-1">
                      <p className="text-[10px] font-bold text-slate-700">
                        Witness from ART Bank: Imtiyaz Shaikh
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Mediyaz ART Bank, 366/4 Govindpuri Kalkaji New Delhi 110019
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── STEP 4 STATUTORY CONSENT DECLARATIONS (CHECKBOXES) ──────────────── */}
      <div className="space-y-4 p-5 rounded-2xl border border-teal-200 bg-teal-50/40 shadow-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#285b63] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#1d3840]">
              Legal Declarations under Assisted Reproductive Technology (Regulation) Act, 2021
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Please mark each declaration to confirm understanding and submit your registration.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={consent.confirmTruth}
              onChange={(e) => updateConsent({ confirmTruth: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63]"
            />
            <span>
              I solemnly declare that all personal, contact, and health details provided by me are completely truthful and authentic. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          {errors.confirmTruth && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.confirmTruth}</p>}

          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={consent.agreeVoluntary}
              onChange={(e) => updateConsent({ agreeVoluntary: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63]"
            />
            <span>
              I confirm that my semen donation is completely voluntary and altruistic without any coercion or undue influence. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          {errors.agreeVoluntary && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.agreeVoluntary}</p>}

          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={consent.consentScreening}
              onChange={(e) => updateConsent({ consentScreening: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63]"
            />
            <span>
              I give informed consent to undergo full infectious marker screening (HIV, Hepatitis B/C, VDRL, Karyotyping) and physical examination. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          {errors.consentScreening && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.consentScreening}</p>}

          <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={consent.allowStorage}
              onChange={(e) => updateConsent({ allowStorage: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63]"
            />
            <span>
              I consent to semen cryopreservation and mandatory 180-day cryogenic quarantine in the ART Bank before clinical utilization under ART Act 2021. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          {errors.allowStorage && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.allowStorage}</p>}
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-4 space-y-3 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h5 className="font-bold text-sm text-slate-800">{previewDoc.title}</h5>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold px-2 py-0.5"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-slate-50 rounded-xl p-2">
              <img
                src={previewDoc.url}
                alt={previewDoc.title}
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
