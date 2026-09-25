"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { VERIFIED_DONOR_CATALOG, DonorProfile } from "@/lib/donor-catalog";
import { submitDonorRequestAction } from "./actions";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  User,
  Dna,
  ArrowRight,
  PhoneCall,
  Calendar,
} from "lucide-react";

function DonorRequestFormContent() {
  const searchParams = useSearchParams();
  const paramDonorCode = searchParams.get("donor") || "";
  const paramGameteType = searchParams.get("type") || "";

  // State
  const [selectedDonorCode, setSelectedDonorCode] = useState<string>(paramDonorCode);
  const [gameteType, setGameteType] = useState<"egg" | "sperm" | "both">(
    paramGameteType === "sperm" ? "sperm" : "egg"
  );
  const [requestorType, setRequestorType] = useState<
    "commissioning_couple" | "commissioning_individual" | "fertility_clinic"
  >("commissioning_couple");

  const [primaryContactName, setPrimaryContactName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [preferredBloodGroup, setPreferredBloodGroup] = useState("");
  const [treatingClinicName, setTreatingClinicName] = useState("");
  const [treatingDoctorName, setTreatingDoctorName] = useState("");
  const [clinicCity, setClinicCity] = useState("");
  const [clinicArtRegNumber, setClinicArtRegNumber] = useState("");
  const [gameteQuantity, setGameteQuantity] = useState("Standard Cohort (6-8 vitrified oocytes)");
  const [tentativeCycleDate, setTentativeCycleDate] = useState("Within 30 Days");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [statutoryConsent, setStatutoryConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submissionResult, setSubmissionResult] = useState<{
    requisitionNumber: string;
    donorCode: string;
    gameteType: string;
    primaryContactName: string;
  } | null>(null);

  // Sync param donor when URL changes
  useEffect(() => {
    if (paramDonorCode) {
      setSelectedDonorCode(paramDonorCode);
    }
    if (paramGameteType === "sperm" || paramGameteType === "egg") {
      setGameteType(paramGameteType);
      if (paramGameteType === "sperm") {
        setGameteQuantity("2 Cryo Semen Vials (IUI/IVF/ICSI)");
      } else {
        setGameteQuantity("Standard Cohort (6-8 vitrified oocytes)");
      }
    }
  }, [paramDonorCode, paramGameteType]);

  // Find donor in catalog
  const selectedDonorProfile: DonorProfile | undefined = useMemo(() => {
    if (!selectedDonorCode || selectedDonorCode === "general_match") return undefined;
    return VERIFIED_DONOR_CATALOG.find(
      (d) => d.donorCode.toLowerCase() === selectedDonorCode.toLowerCase()
    );
  }, [selectedDonorCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setFieldErrors({});

    const formData = new FormData();
    formData.append("donorCode", selectedDonorCode);
    formData.append("gameteType", gameteType);
    formData.append("requestorType", requestorType);
    formData.append("primaryContactName", primaryContactName);
    formData.append("partnerName", partnerName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", "India");
    formData.append("preferredBloodGroup", preferredBloodGroup);
    formData.append("treatingClinicName", treatingClinicName);
    formData.append("treatingDoctorName", treatingDoctorName);
    formData.append("clinicCity", clinicCity);
    formData.append("clinicArtRegNumber", clinicArtRegNumber);
    formData.append("gameteQuantity", gameteQuantity);
    formData.append("tentativeCycleDate", tentativeCycleDate);
    formData.append("specialRequirements", specialRequirements);
    formData.append("statutoryConsent", statutoryConsent ? "true" : "false");

    try {
      const res = await submitDonorRequestAction(formData);
      if (res.success && res.requisitionNumber) {
        setSubmissionResult({
          requisitionNumber: res.requisitionNumber,
          donorCode: res.donorCode,
          gameteType: res.gameteType,
          primaryContactName: res.primaryContactName,
        });
      } else {
        setServerError(res.error || "Failed to submit requisition.");
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        }
      }
    } catch (err: any) {
      setServerError("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submissionResult) {
    return (
      <div className="min-h-screen bg-[#f8faf9] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden text-center p-8 sm:p-12 space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-18 h-18 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#285b63]/10 text-xs font-bold text-[#285b63] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff7468]" />
              Official Requisition Logged
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1d3840]">
              Donor Allocation Requisition Received
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Thank you, <strong className="text-[#1d3840]">{submissionResult.primaryContactName}</strong>. Your clinical request has been securely queued with the Mediyaz ART Bank match desk.
            </p>
          </div>

          {/* Requisition Token Box */}
          <div className="bg-[#edf3f1] rounded-2xl p-6 border border-[#285b63]/20 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-xs text-gray-500 uppercase font-semibold">Requisition Tracking No:</span>
              <span className="font-mono font-bold text-sm text-[#285b63]">{submissionResult.requisitionNumber}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Allocated Donor Profile:</span>
              <span className="font-mono font-bold text-gray-900">{submissionResult.donorCode}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Gamete Specification:</span>
              <span className="font-bold text-gray-800 capitalize">
                {submissionResult.gameteType === "egg" ? "Vitrified Oocytes" : "Cryopreserved Semen"}
              </span>
            </div>
          </div>

          {/* Clinical Roadmap */}
          <div className="text-left bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#285b63] flex items-center gap-2">
              What Happens Next?
            </h4>
            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#285b63] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div><strong>Match Desk Verification (24 Hours):</strong> Our medical team verifies donor cohort availability and cross-checks ABO-Rh blood group compatibility.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#285b63] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div><strong>Inter-Clinic Coordination:</strong> We contact your treating fertility specialist and laboratory embryologist to align thawed transfer cycle protocols.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#285b63] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div><strong>Cryo-Shipper Dispatch:</strong> Gametes are dispatched in certified Liquid Nitrogen dry shippers (-196°C) under continuous temperature logging.</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/aspiring-parents/donors"
              className="px-6 py-3 rounded-xl bg-[#285b63] hover:bg-[#1f484f] text-white text-xs font-bold transition shadow-xs"
            >
              Return to Donor Catalog
            </Link>
            <Link
              href="/contacts"
              className="px-6 py-3 rounded-xl border border-[#285b63] text-[#285b63] hover:bg-[#edf3f1] text-xs font-bold transition"
            >
              Contact Match Desk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#333] pt-24 pb-20">
      {/* ================= HERO BANNER ================= */}
      <section className="bg-gradient-to-r from-[#173037] via-[#214b53] to-[#285b63] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2d636b]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide text-[#95e0b9] backdrop-blur-xs mb-3 border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff7468]" />
            Direct ART Clinic Gamete Requisition Form
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
            Donor Gamete Requisition
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Formal clinical requisition for vitrified oocytes or cryopreserved semen. All allocations comply strictly with Sections 27 &amp; 28 of India&apos;s Assisted Reproductive Technology (Regulation) Act, 2021.
          </p>
        </div>
      </section>

      {/* ================= MAIN FORM CONTAINER ================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl flex items-start shadow-xs">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-800">Please Review Required Fields</h4>
              <p className="text-xs text-red-700 mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= STEP 1: SELECTED DONOR COHORT ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#285b63] text-white flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#1d3840]">
                    Donor Requested Form
                  </h2>
                  <p className="text-xs text-gray-500">
                    Specify the donor profile or request clinical phenotype matching.
                  </p>
                </div>
              </div>
              <Link
                href="/aspiring-parents/donors"
                className="text-xs font-bold text-[#ff7468] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>Browse Donor Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* If a donor is pre-selected, show preview card */}
            {selectedDonorProfile ? (
              <div className="bg-[#edf3f1] rounded-2xl p-5 border border-[#285b63]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner shrink-0"
                    style={{
                      background:
                        selectedDonorProfile.gameteType === "egg"
                          ? "linear-gradient(135deg, #ff7468 0%, #d85246 100%)"
                          : "linear-gradient(135deg, #285b63 0%, #173037 100%)",
                    }}
                  >
                    {selectedDonorProfile.donorCode.replace("MED-", "").slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#1d3840]">
                        {selectedDonorProfile.donorCode}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-white text-[#285b63] border border-gray-200">
                        {selectedDonorProfile.gameteType === "egg" ? "Vitrified Oocyte Donor" : "Cryo Semen Donor"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Blood: <strong className="text-[#ff7468]">{selectedDonorProfile.bloodType}</strong> • {selectedDonorProfile.heightFormatted} • {selectedDonorProfile.ethnicity} • {selectedDonorProfile.profession}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      ✓ Thalassemia HPLC Screened ({selectedDonorProfile.geneticScreenings.thalassemia.hba2Fraction}) • {selectedDonorProfile.geneticScreenings.karyotype.result}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/aspiring-parents/donors"
                    className="px-3 py-1.5 rounded-xl border border-[#285b63] bg-white text-[#285b63] text-xs font-bold hover:bg-gray-50 transition"
                  >
                    Change Donor
                  </Link>
                </div>
              </div>
            ) : (
              /* Dropdown to select donor or general match */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    REquest For  <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={gameteType}
                    onChange={(e) => setGameteType(e.target.value as any)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs font-medium focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="egg">Egg Donor</option>
                    <option value="sperm">Sperm Donor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Available Donor Profile
                  </label>
                  <select
                    value={selectedDonorCode}
                    onChange={(e) => {
                      setSelectedDonorCode(e.target.value);
                      const found = VERIFIED_DONOR_CATALOG.find((d) => d.donorCode === e.target.value);
                      if (found) {
                        setGameteType(found.gameteType);
                      }
                    }}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs font-medium focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  >
                    <option value="general_match">Phenotypic Match Assistance (Let Mediyaz Match Us)</option>
                    {VERIFIED_DONOR_CATALOG.map((donor) => (
                      <option key={donor.id} value={donor.donorCode}>
                        {donor.donorCode} — {donor.gameteType === "egg" ? "Egg" : "Sperm"} ({donor.bloodType}, {donor.heightFormatted}, {donor.profession})
                      </option>
                    ))}
                  </select>
                </div>

                
              </div>
            )}

            {/* Quantity & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Requested Gamete Quantity
                </label>
                <select
                  value={gameteQuantity}
                  onChange={(e) => setGameteQuantity(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                >
                  <option value="Standard Cohort (6-8 vitrified oocytes)">Standard Vitrified Oocyte Cohort (6–8 oocytes)</option>
                  <option value="Expanded Cohort (10-12 vitrified oocytes)">Expanded Oocyte Cohort (10–12 oocytes)</option>
                  <option value="2 Cryo Semen Vials (IUI/IVF/ICSI)">2 Semen Vials (Standard IVF / ICSI / IUI)</option>
                  <option value="4 Cryo Semen Vials (Multi-Cycle Reserve)">4 Semen Vials (Multi-Cycle Reserve)</option>
                </select>
              </div> */}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Intending Parent Blood Group
                </label>
                <select
                  value={preferredBloodGroup}
                  onChange={(e) => setPreferredBloodGroup(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                >
                  <option value="">Any Compatible Blood Group</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ================= STEP 2: COMMISSIONING INTENDING PARENT ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-[#285b63] text-white flex items-center justify-center font-bold text-xs">
                02
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1d3840]">
                  Commissioning Intending Party Details
                </h2>
                <p className="text-xs text-gray-500">
                  Confidential patient identifiers for statutory National ART Registry chain-of-custody.
                </p>
              </div>
            </div>

            {/* Requestor Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Submitted By <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRequestorType("commissioning_couple")}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                    requestorType === "commissioning_couple"
                      ? "border-[#285b63] bg-[#edf3f1] text-[#285b63] ring-1 ring-[#285b63]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div>Commissioning Couple</div>
                  <div className="text-[10px] font-normal text-gray-500 mt-0.5">Legally married couple in India</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRequestorType("commissioning_individual")}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                    requestorType === "commissioning_individual"
                      ? "border-[#285b63] bg-[#edf3f1] text-[#285b63] ring-1 ring-[#285b63]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div>Single Commissioning Parent</div>
                  <div className="text-[10px] font-normal text-gray-500 mt-0.5">Eligible individual per ART Act</div>
                </button>

                
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Primary Intending Parent Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="As per Aadhaar / Government Photo ID"
                  value={primaryContactName}
                  onChange={(e) => setPrimaryContactName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
                {fieldErrors.primaryContactName && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.primaryContactName[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Spouse / Partner Full Name {requestorType === "commissioning_couple" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  placeholder="Partner legal name (if married)"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Contact Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-300 pl-12 pr-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    required
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.phone[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Confidential Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="patient@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi NCR, Maharashtra, Karnataka"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
              </div>
            </div>
          </div>

          {/* ================= STEP 3: TREATING FERTILITY CLINIC ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-[#285b63] text-white flex items-center justify-center font-bold text-xs">
                03
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1d3840]">
                  Treatment ART Fertility Clinic Information
                </h2>
                <p className="text-xs text-gray-500">
                  Mandatory under ART Act 2021: Donor gametes can only be shipped directly to a registered Level 2 ART Clinic.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div >
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Treatment (Fertility Clinic / Hospital) Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apollo Fertility, Cloudnine Fertility, Indira IVF, Max Healthcare"
                  value={treatingClinicName}
                  onChange={(e) => setTreatingClinicName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
                {fieldErrors.treatingClinicName && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.treatingClinicName[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                   Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="Dr. Full Name"
                  value={treatingDoctorName}
                  onChange={(e) => setTreatingDoctorName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  states  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. South Extension, New Delhi"
                  value={clinicCity}
                  onChange={(e) => setClinicCity(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. South Extension, New Delhi"
                  value={clinicCity}
                  onChange={(e) => setClinicCity(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                  required
                />
              </div>

              {/* <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Anticipated Cycle / Transfer Timeline
                </label>
                <select
                  value={tentativeCycleDate}
                  onChange={(e) => setTentativeCycleDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                >
                  <option value="Immediate (Within 7-14 Days)">Immediate (Within 7–14 Days)</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="1-2 Months Out">1–2 Months Out</option>
                  <option value="3+ Months Out / Flexible">3+ Months Out / Flexible</option>
                </select>
              </div> */}

              {/* <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  National ART Registry Clinic No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. REG-CLINIC-DL-00192 (if known)"
                  value={clinicArtRegNumber}
                  onChange={(e) => setClinicArtRegNumber(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 px-4 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
              </div> */}

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Notes 
                </label>
                <textarea
                  rows={3}
                  placeholder="Note any specific phenotypic requirements, carrier match criteria, or delivery schedules..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
              </div>
            </div>
          </div>

          {/* ================= STEP 4: STATUTORY ART ACT DECLARATION ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <ShieldCheck className="w-5 h-5 text-[#285b63]" />
              <h2 className="font-serif text-lg font-bold text-[#1d3840]">
                Statutory Declaration &amp; Legal Undertaking
              </h2>
            </div>

            <div className="bg-[#edf3f1]/70 rounded-2xl p-5 border border-[#285b63]/20 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="statutoryConsent"
                  checked={statutoryConsent}
                  onChange={(e) => setStatutoryConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#285b63] focus:ring-[#285b63]"
                  required
                />
                <label
                  htmlFor="statutoryConsent"
                  className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none"
                >
                  <strong className="text-[#285b63]">Mandatory Statutory Undertaking (Sections 27 &amp; 28, ART Act 2021):</strong> I/We declare that the donor gametes requested will be used exclusively for our commissioning fertility treatment at the registered ART clinic named above. I/We understand that donor identity is confidential and protected by Indian law and cannot be revealed. I/We acknowledge that the donor has relinquished all parental rights, and gametes of this donor are allocated exclusively to our family cycle. <span className="text-red-500">*</span>
                </label>
              </div>
              {fieldErrors.statutoryConsent && (
                <p className="text-xs text-red-500 pl-7">{fieldErrors.statutoryConsent[0]}</p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ff7468] hover:bg-[#ff5d50] active:scale-[0.99] text-white py-4 px-6 text-sm font-bold shadow-md transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Submitting Requisition to Match Desk...
                  </>
                ) : (
                  <>
                    Submit Official Donor Requisition
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-2.5">
                🔒 All communications and patient data are handled under strict confidentiality per the ART Act 2021 and ICMR guidelines.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DonorRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8faf9]">
          <Loader2 className="w-8 h-8 text-[#285b63] animate-spin" />
        </div>
      }
    >
      <DonorRequestFormContent />
    </Suspense>
  );
}
