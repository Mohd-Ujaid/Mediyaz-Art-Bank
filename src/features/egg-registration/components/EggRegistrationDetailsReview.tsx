"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Edit3,
  UserCheck,
  Phone,
  HeartPulse,
  Activity,
  Eye,
  Users,
  CheckCircle2,
  FileText,
  ExternalLink,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  EggPersonalInfo,
  EggContactInfo,
  EggDonorInfo,
  EggMedicalInfo,
  EggEmergencyContact,
  EggReferral,
  EggDocuments,
} from "../validations/egg-registration.schema";

interface EggRegistrationDetailsReviewProps {
  registrationId?: string | null;
  personalInfo: EggPersonalInfo;
  contactInfo: EggContactInfo;
  donorInfo: EggDonorInfo;
  medicalInfo: EggMedicalInfo;
  emergencyContact?: EggEmergencyContact;
  referral?: EggReferral;
  documents: EggDocuments;
  onEditStep: (step: number) => void;
}

const formatAddress = (addr = "", city = "", state = "", country = "India", pin = "") => {
  const parts = [addr, city, state, country, pin].filter((p) => Boolean(p?.trim()));
  return parts.length > 0 ? parts.join(", ") : "—";
};

export function EggRegistrationDetailsReview({
  registrationId,
  personalInfo,
  contactInfo,
  donorInfo,
  medicalInfo,
  emergencyContact,
  referral,
  documents,
  onEditStep,
}: EggRegistrationDetailsReviewProps) {
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

  const docList = [
    { label: "Donor Photograph", doc: documents.passportPhoto, required: true },
    { label: "Aadhaar Card (Front)", doc: documents.aadhaarFront, required: true },
    { label: "Aadhaar Card (Back)", doc: documents.aadhaarBack, required: true },
    { label: "Donor Digital Signature", doc: documents.signature, required: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      {/* ──────────────── STEP HEADING & SUBTITLE ──────────────── */}
      <div className="border-b border-slate-200/90 pb-4 mb-2">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#285b63]/10 text-[#285b63] border border-[#285b63]/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#285b63]" />
            Step 4 of 5
          </span>
          <span className="text-xs text-slate-400 font-medium">• Review & Verification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1d3840] tracking-tight">
          Review Your Registration Details
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
          Please carefully review all the information and uploaded documents you provided across previous steps. You can click <span className="inline-flex items-center gap-1 font-semibold text-[#285b63] bg-[#edf3f1] px-1.5 py-0.5 rounded text-xs border border-[#285b63]/20"><Edit3 className="w-3 h-3 inline" /> Edit</span> on any section below to make changes before proceeding to legal declarations and consent.
        </p>
      </div>

      {/* ──────────────── SECTION 1: PERSONAL & DEMOGRAPHIC DETAILS ──────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#285b63]" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              1. Personal Details & Physical Traits
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(1)}
            className="h-7 px-3 text-xs font-semibold text-[#285b63] border-[#285b63]/40 hover:bg-[#edf3f1] gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit Section
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3.5 gap-x-6 py-2 text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Full Legal Name</span>
            <span className="text-gray-900 font-semibold text-sm">{personalInfo.fullName || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Gender</span>
            <span className="text-gray-900 font-semibold">Female</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Date of Birth / Age</span>
            <span className="text-gray-900 font-semibold">
              {personalInfo.dateOfBirth || "—"} {personalInfo.age ? `(${personalInfo.age} yrs)` : ""}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Blood Group</span>
            <span className="text-[#285b63] font-bold text-sm">{personalInfo.bloodGroup || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Marital Status</span>
            <span className="text-gray-900 font-semibold">{personalInfo.maritalStatus || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Education</span>
            <span className="text-gray-900 font-semibold">{personalInfo.education || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Occupation</span>
            <span className="text-gray-900 font-semibold">{personalInfo.occupation || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Monthly Income</span>
            <span className="text-gray-900 font-semibold">{personalInfo.monthlyIncome || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Religion</span>
            <span className="text-gray-900 font-semibold">{personalInfo.religion || "—"}</span>
          </div>

          {personalInfo.hobby ? (
            <div>
              <span className="text-gray-400 text-[11px] block font-medium">Hobby / Interests</span>
              <span className="text-gray-900 font-semibold">{personalInfo.hobby}</span>
            </div>
          ) : null}

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Aadhaar Number</span>
            <span className="font-mono text-gray-900 font-semibold">
              {personalInfo.aadhaarNumber ? `XXXX-XXXX-${personalInfo.aadhaarNumber.slice(-4)}` : "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">PAN Number</span>
            <span className="font-mono text-gray-900 font-semibold">{personalInfo.panNumber || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Height</span>
            <span className="text-gray-900 font-semibold">{personalInfo.height || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Weight</span>
            <span className="text-gray-900 font-semibold">{personalInfo.weight || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Skin Complexion</span>
            <span className="text-gray-900 font-semibold">{personalInfo.complexion || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Hair Color / Eye Color</span>
            <span className="text-gray-900 font-semibold">
              {personalInfo.hairColor || "—"} / {personalInfo.eyeColor || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ──────────────── SECTION 2: HUSBAND & FAMILY DETAILS ──────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#285b63]" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              2. Husband & Family Details (ART Act 2021)
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(1)}
            className="h-7 px-3 text-xs font-semibold text-[#285b63] border-[#285b63]/40 hover:bg-[#edf3f1] gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit Section
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3.5 gap-x-6 py-2 text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Husband / Spouse Legal Name</span>
            <span className="text-gray-900 font-semibold text-sm">
              {personalInfo.husbandName || personalInfo.spouseName || "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Husband Education</span>
            <span className="text-gray-900 font-semibold">
              {personalInfo.husbandEducation || personalInfo.spouseEducation || "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Husband Occupation</span>
            <span className="text-gray-900 font-semibold">
              {personalInfo.husbandOccupation || personalInfo.spouseOccupation || "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Total Deliveries</span>
            <span className="text-gray-900 font-semibold">
              {donorInfo.numberOfDeliveries ? `${donorInfo.numberOfDeliveries} child(ren)` : "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Age of Youngest Living Child</span>
            <span className="text-gray-900 font-semibold">
              {donorInfo.pregnancyHistory ? `${donorInfo.pregnancyHistory} years (min. 3 yrs required)` : "—"}
            </span>
          </div>

          {personalInfo.fatherName && (
            <div>
              <span className="text-gray-400 text-[11px] block font-medium">Father's Name</span>
              <span className="text-gray-900 font-semibold">{personalInfo.fatherName}</span>
            </div>
          )}

          {personalInfo.motherName && (
            <div>
              <span className="text-gray-400 text-[11px] block font-medium">Mother's Name</span>
              <span className="text-gray-900 font-semibold">{personalInfo.motherName}</span>
            </div>
          )}
        </div>
      </div>

      {/* ──────────────── SECTION 3: CONTACT & RESIDENTIAL ADDRESSES ──────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#285b63]" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              3. Contact & Residential Details
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(1)}
            className="h-7 px-3 text-xs font-semibold text-[#285b63] border-[#285b63]/40 hover:bg-[#edf3f1] gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit Section
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-6 py-2 text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Verified Mobile Number</span>
            <span className="font-mono text-gray-900 font-semibold">{contactInfo.mobileNumber || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Alternate Mobile Number</span>
            <span className="font-mono text-gray-900 font-semibold">{contactInfo.alternateMobile || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Email Address</span>
            <span className="text-gray-900 font-semibold">{contactInfo.emailAddress || "—"}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-gray-400 text-[11px] block font-medium">Current Residential Address</span>
            <span className="text-gray-900 font-semibold leading-relaxed">{fullAddress}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">City, State & Pincode</span>
            <span className="text-gray-900 font-semibold">
              {[contactInfo.city, contactInfo.state, contactInfo.pincode].filter(Boolean).join(", ") || "—"}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-gray-400 text-[11px] block font-medium">Permanent Address (as per Aadhaar Card)</span>
            <span className="text-gray-800 leading-relaxed">{permAddress}</span>
          </div>

          {emergencyContact?.contactPersonName && (
            <div>
              <span className="text-gray-400 text-[11px] block font-medium">Emergency Contact</span>
              <span className="text-gray-900 font-semibold">
                {emergencyContact.contactPersonName} ({emergencyContact.relationship || "Contact"}) • {emergencyContact.phoneNumber || ""}
              </span>
            </div>
          )}

          {referral?.sourceReferralType && (
            <div>
              <span className="text-gray-400 text-[11px] block font-medium">Referral / Channel Source</span>
              <span className="text-gray-900 font-semibold">
                {referral.sourceReferralType}{" "}
                {referral.patientOrDonorId ? `(${referral.patientOrDonorId})` : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ──────────────── SECTION 4: OBSTETRIC & CLINICAL PROFILE ──────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-[#285b63]" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              4. Obstetric History & Clinical Profile
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(2)}
            className="h-7 px-3 text-xs font-semibold text-[#285b63] border-[#285b63]/40 hover:bg-[#edf3f1] gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit Section
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3.5 gap-x-6 py-2 text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Total Deliveries</span>
            <span className="text-gray-900 font-semibold">{donorInfo.numberOfDeliveries || "—"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Age of Youngest Living Child</span>
            <span className="text-gray-900 font-semibold">
              {donorInfo.pregnancyHistory ? `${donorInfo.pregnancyHistory} yrs` : "—"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Previous Egg Donation</span>
            <span className="text-[#285b63] font-bold">
              {donorInfo.previousEggDonation === "Yes" ? "Yes (Ineligible)" : "No (Lifetime first donation)"}
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Blood Transfusion History</span>
            <span className="text-gray-900 font-semibold">{donorInfo.bloodTransfusionHistory || "No"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Substance Abuse History</span>
            <span className="text-gray-900 font-semibold">{donorInfo.substanceAbuseHistory || "No"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Diabetes Condition</span>
            <span className="text-gray-900 font-semibold">{medicalInfo.diabetes || "No"}</span>
          </div>

          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Hypertension Condition</span>
            <span className="text-gray-900 font-semibold">{medicalInfo.hypertension || "No"}</span>
          </div>
        </div>
      </div>

      {/* ──────────────── SECTION 5: UPLOADED IDENTITY DOCUMENTS & SIGNATURE ──────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#285b63]" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              5. Uploaded Identity Documents & Digital Signature
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEditStep(3)}
            className="h-7 px-3 text-xs font-semibold text-[#285b63] border-[#285b63]/40 hover:bg-[#edf3f1] gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit / Re-upload
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {docList.map((item, idx) => {
            const isUploaded = Boolean(item.doc?.url);
            return (
              <div
                key={idx}
                className={`border rounded-lg p-2.5 flex flex-col items-center text-center text-xs transition-colors ${
                  isUploaded ? "border-teal-200 bg-teal-50/20" : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <span className="text-[10px] font-semibold text-slate-700 line-clamp-1 mb-2">
                  {item.label} {item.required && <span className="text-rose-500">*</span>}
                </span>

                {isUploaded ? (
                  <div className="space-y-1.5 w-full flex flex-col items-center">
                    <div className="w-20 h-20 rounded border border-slate-200 bg-white overflow-hidden flex items-center justify-center p-1 shadow-2xs group relative">
                      <img
                        src={item.doc!.url}
                        alt={item.label}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc({ url: item.doc!.url, title: item.label })}
                        className="inline-flex items-center gap-1 text-[10px] text-[#285b63] font-bold hover:underline"
                      >
                        <Eye className="w-2.5 h-2.5" /> View
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={() => onEditStep(3)}
                        className="inline-flex items-center gap-0.5 text-[10px] text-slate-500 hover:text-slate-800"
                      >
                        Edit
                      </button>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-teal-700 bg-teal-100/70 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Uploaded
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5 w-full flex flex-col items-center">
                    <div className="w-20 h-20 rounded border border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-[10px] text-slate-400 p-1">
                      <FileText className="w-5 h-5 text-slate-300 mb-1" />
                      <span>No file</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onEditStep(3)}
                      className="inline-flex items-center gap-1 text-[10px] text-rose-600 font-bold hover:underline"
                    >
                      <Edit3 className="w-2.5 h-2.5" /> {item.required ? "Upload Now" : "Upload (Optional)"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ──────────────── IMAGE PREVIEW LIGHTBOX MODAL ──────────────── */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-4 space-y-3 shadow-2xl relative border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#285b63]" />
                <h3 className="font-bold text-sm text-slate-800">{previewDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-slate-50 rounded-xl p-2 border border-slate-100">
              <img
                src={previewDoc.url}
                alt={previewDoc.title}
                className="max-h-[65vh] w-auto object-contain rounded shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <a
                href={previewDoc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#285b63] font-bold hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
              </a>
              <Button
                type="button"
                size="sm"
                onClick={() => setPreviewDoc(null)}
                className="bg-[#285b63] hover:bg-[#1d464d] text-white text-xs px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
