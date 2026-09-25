"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSpermFormStore } from "../store/sperm-registration.store";
import { FileUploadField } from "@/features/file-upload/components/FileUploadField";
import { SpermRegistrationReview } from "./SpermRegistrationReview";
import {
  createDraftSpermRegistrationAction,
  getSpermRegistrationAction,
  updateSpermRegistrationStepAction,
  submitSpermRegistrationAction,
} from "../actions/sperm-registration.actions";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  FileText,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Save,
  Lock,
  HeartPulse,
  UserCheck,
  Calendar,
  AlertCircle,
  Users,
  ClipboardList,
  Copy,
  Check,
  CreditCard,
  Smartphone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
const MARITAL_STATUSES = ["Married", "Single", "Divorced", "Widowed"] as const;
const COMPLEXIONS = ["Fair", "Very Fair", "Wheatish", "Medium", "Olive", "Brown", "Dark"] as const;
const HAIR_COLORS = ["Black", "Dark Brown", "Brown", "Light Brown", "Blonde", "Other"] as const;
const EYE_COLORS = ["Black", "Dark Brown", "Brown", "Hazel", "Green", "Blue", "Grey", "Other"] as const;

const HEIGHT_OPTIONS = [
  "4 ft 6 in", "4 ft 7 in", "4 ft 8 in", "4 ft 9 in", "4 ft 10 in", "4 ft 11 in",
  "5 ft 0 in", "5 ft 1 in", "5 ft 2 in", "5 ft 3 in", "5 ft 4 in", "5 ft 5 in",
  "5 ft 6 in", "5 ft 7 in", "5 ft 8 in", "5 ft 9 in", "5 ft 10 in", "5 ft 11 in",
  "6 ft 0 in", "6 ft 1 in", "6 ft 2 in", "6 ft 3 in", "6 ft 4 in", "6 ft 5 in", "6 ft 6 in", "6 ft 7 in"
] as const;

const WEIGHT_OPTIONS = Array.from({ length: 81 }, (_, i) => `${40 + i} kg`);


const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Chandigarh", "Puducherry", "Other"
];

function calculateAge(dobString: string): number | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
}

const SPERM_DOCUMENTS = [
  { key: "passportPhoto", label: "Donor Photograph", required: true, folder: "profile-images", cropMode: "photo" as const },
  { key: "aadhaarFront", label: "Aadhaar Card (Front)", required: true, folder: "documents", cropMode: "document" as const },
  { key: "aadhaarBack", label: "Aadhaar Card (Back)", required: true, folder: "documents", cropMode: "document" as const },
  { key: "signature", label: "Donor Signature", required: true, folder: "documents", cropMode: "signature" as const },
  { key: "otherDocument", label: "Medical / Fitness Record (Optional)", required: false, folder: "documents", cropMode: "document" as const },
];

export function SpermRegistrationForm({ draftId }: { draftId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useSpermFormStore();

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [aadhaarInput, setAadhaarInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRegId, setSubmittedRegId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = (id: string) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    toast.success("Registration ID copied to clipboard!");
    setTimeout(() => setCopiedId(false), 2200);
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const {
    registrationId,
    setRegistrationId,
    personalInfo,
    contactInfo,
    medicalInfo,
    donorInfo,
    documents,
    emergencyContact,
    consent,
    referral,
    agentCode,
    updatePersonalInfo,
    updateContactInfo,
    updateMedicalInfo,
    updateDonorInfo,
    updateDocuments,
    updateEmergencyContact,
    updateConsent,
    updateReferral,
    setAgentCode,
    loadFromServer,
    isSaving,
    isSubmitting,
    setIsSaving,
    setIsSubmitting,
  } = store;

  // Track referral code from query param (?ref=, ?referral=, ?agent=, ?agentCode=)
  useEffect(() => {
    const urlRefer = searchParams?.get("ref") || searchParams?.get("referral") || searchParams?.get("agent") || searchParams?.get("agentCode");
    if (urlRefer) {
      const code = urlRefer.toUpperCase().trim();
      setAgentCode(code);
      updateReferral({ patientOrDonorId: code, sourceReferralType: "Refer" });
    }
  }, [searchParams]);

  // Restore draft if draftId given
  useEffect(() => {
    if (draftId) {
      getSpermRegistrationAction(draftId).then((res) => {
        if (res.success && res.registration) {
          loadFromServer(res.registration);
          setIsOtpVerified(true);
          setAadhaarInput(res.registration.personalInfo?.aadhaarNumber || "");
          setPhoneInput(res.registration.contactInfo?.mobileNumber || "");
          if (res.registration.contactInfo?.emailAddress) {
            setEmailInput(res.registration.contactInfo.emailAddress);
          }
          if (res.registration.status === "SUBMITTED") {
            setIsSubmitted(true);
            setSubmittedRegId(res.registration.registrationId);
          }
        }
      });
    }
  }, [draftId]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleSendOtp = async () => {
    if (!aadhaarInput || aadhaarInput.length !== 12) {
      setOtpError("Aadhaar Number must be exactly 12 digits.");
      return;
    }
    if (!phoneInput || phoneInput.length < 10) {
      setOtpError("Mobile Number must be at least 10 digits.");
      return;
    }
    const cleanEmail = emailInput.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setOtpError("Please enter a valid Email address to receive your OTP.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/donor-registration/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          phone: phoneInput,
          aadhaar: aadhaarInput,
          email: cleanEmail,
          donorType: "Sperm Donor",
          registrationId: registrationId || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setResendCountdown(30);
        toast.success(`Verification OTP sent to ${cleanEmail}! Please check your inbox.`);
      } else {
        setOtpError(data.error || "Failed to send OTP.");
        toast.error(data.error || "Failed to send OTP.");
      }
    } catch {
      setOtpError("Network error. Please try again.");
      toast.error("Network error.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!otpInput || otpInput.length < 4) {
      setOtpError("Please enter the 6-digit OTP sent to your email.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/donor-registration/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          email: cleanEmail,
          phone: phoneInput,
          otp: otpInput,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Email OTP verified successfully!");

        // Create or load draft sperm registration
        const createRes = await createDraftSpermRegistrationAction({
          personalInfo: { aadhaarNumber: aadhaarInput, gender: "Male" },
          contactInfo: { mobileNumber: phoneInput, emailAddress: cleanEmail },
          registrationSource: "online_inquiry",
          referral,
          agentCode: agentCode || (referral?.sourceReferralType === "Refer" ? referral?.patientOrDonorId : undefined),
        });

        if (createRes.success && createRes.registration) {
          loadFromServer(createRes.registration);
          setRegistrationId(createRes.registrationId);
          setIsOtpVerified(true);
          updatePersonalInfo({ aadhaarNumber: aadhaarInput, gender: "Male" });
          updateContactInfo({ mobileNumber: phoneInput, emailAddress: cleanEmail });
          toast.success(createRes.isExisting ? "Existing draft loaded!" : "New draft initiated!");
        } else {
          toast.error("Failed to initialize registration record.");
        }
      } else {
        setOtpError(data.error || "Invalid OTP entered.");
        toast.error(data.error || "Invalid OTP.");
      }
    } catch {
      setOtpError("Verification failed. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!personalInfo.fullName?.trim()) errs.fullName = "Full name is required";
    if (!personalInfo.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
    if (!personalInfo.bloodGroup) errs.bloodGroup = "Blood group is required";
    if (!personalInfo.maritalStatus) errs.maritalStatus = "Marital status is required";
    if (!personalInfo.education?.trim()) errs.education = "Education qualification is required";
    if (!personalInfo.occupation?.trim()) errs.occupation = "Occupation is required";
    if (!personalInfo.height?.trim()) errs.height = "Height is required";
    if (!personalInfo.weight?.trim()) errs.weight = "Weight is required";
    if (!personalInfo.complexion?.trim()) errs.complexion = "Skin colour / complexion is required";
    if (!personalInfo.hairColor?.trim()) errs.hairColor = "Hair color is required";
    if (!personalInfo.eyeColor?.trim()) errs.eyeColor = "Eye color is required";

    if (!contactInfo.currentAddress?.trim()) errs.currentAddress = "Current address is required";
    if (!contactInfo.state?.trim()) errs.state = "State is required";
    if (!contactInfo.city?.trim()) errs.city = "City is required";
    if (!contactInfo.pincode || contactInfo.pincode.length < 6) errs.pincode = "Valid 6-digit pincode is required";
    
    // Optional email format validation
    if (contactInfo.emailAddress?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.emailAddress.trim())) {
      errs.emailAddress = "Please enter a valid email address";
    }

    // Referral validation: Refer Name is mandatory only when "Refer" is selected
    if (referral.sourceReferralType === "Refer") {
      const refId = (referral.patientOrDonorId || agentCode || "").trim();
      if (!refId) {
        errs.referId = "Enter Refer Name is required when Refer is selected";
      }
    }

    // Age validation: 21 to 55 for sperm donor
    if (!personalInfo.dateOfBirth) {
      errs.dateOfBirth = "Date of birth is required";
    } else {
      const calculatedAge = calculateAge(personalInfo.dateOfBirth);
      if (calculatedAge === null || calculatedAge < 21 || calculatedAge > 55) {
        errs.dateOfBirth = "Sperm donor age must be between 21 and 55 years under ART Act 2021";
        errs.age = "Donor must be between 21 and 55 years";
      }
    }

    setErrors(errs);
    return errs;
  };

  const validateStep2 = () => {
    // Medical & Donor info (defaults exist, no blocker)
    return true;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!documents.passportPhoto?.url) errs.passportPhoto = "Passport photograph is required";
    if (!documents.aadhaarFront?.url) errs.aadhaarFront = "Aadhaar Front copy is required";
    if (!documents.aadhaarBack?.url) errs.aadhaarBack = "Aadhaar Back copy is required";
    if (!documents.signature?.url) errs.signature = "Donor digital signature is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!consent.confirmTruth) errs.confirmTruth = "Must confirm information truthfulness";
    if (!consent.agreeVoluntary) errs.agreeVoluntary = "Must agree to voluntary donation";
    if (!consent.consentScreening) errs.consentScreening = "Must consent to medical screening";
    if (!consent.allowStorage) errs.allowStorage = "Must consent to cryopreservation & 180-day quarantine";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const errs = validateStep1();
      const errKeys = Object.keys(errs);
      if (errKeys.length > 0) {
        const firstKey = errKeys[0];
        const firstError = errs[firstKey];
        toast.error(firstError || "Please fill in all required fields.");
        
        // Scroll smoothly to the first missing field so user immediately sees it
        setTimeout(() => {
          const el = document.querySelector(`[data-field="${firstKey}"], [name="${firstKey}"], #${firstKey}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            if (el instanceof HTMLElement && typeof el.focus === "function") {
              el.focus();
            }
          } else {
            window.scrollTo({ top: 150, behavior: "smooth" });
          }
        }, 50);
        return;
      }
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    if (currentStep === 3 && !validateStep3()) {
      toast.error("Please upload all required identity documents & signature.");
      return;
    }

    // Advance step immediately so UI is snappy, responsive and never blocked
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Auto-save progress in background without blocking UI progression
    if (registrationId) {
      setIsSaving(true);
      updateSpermRegistrationStepAction(registrationId, {
        personalInfo,
        contactInfo,
        medicalInfo,
        donorInfo,
        documents,
        emergencyContact,
        consent,
        referral,
        agentCode: agentCode || (referral?.sourceReferralType === "Refer" ? referral?.patientOrDonorId : undefined),
        currentStep: currentStep + 1,
      })
        .catch((saveErr) => {
          console.warn("Auto-save draft warning:", saveErr);
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    if (!validateStep4()) {
      toast.error("Please confirm all mandatory statutory consent declarations.");
      return;
    }

    if (!registrationId) return;

    setIsSubmitting(true);
    const res = await submitSpermRegistrationAction(registrationId, {
      personalInfo,
      contactInfo,
      medicalInfo,
      donorInfo,
      documents,
      emergencyContact,
      consent,
      referral,
      agentCode: agentCode || (referral?.sourceReferralType === "Refer" ? referral?.patientOrDonorId : undefined),
    });
    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setSubmittedRegId(registrationId);
      toast.success("Sperm Donor Registration submitted successfully!");
    } else {
      toast.error(res.error || "Submission failed. Please try again.");
    }
  };

  // ──────────────── SUBMISSION CONFIRMATION VIEW ────────────────
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
          {/* Header Banner */}
          <div className="relative bg-gradient-to-b from-[#1d3840] via-[#224b52] to-[#285b63] px-6 sm:px-10 py-10 text-center text-white overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-400/20 border-2 border-emerald-400/50 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9 text-emerald-300" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-emerald-200 border border-white/15 mb-2.5 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                ART Act 2021 Registered
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Sperm Registration Submitted!
              </h1>
              <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Your official male semen donor registration has been received and entered into the Mediyaz ART Bank secure registry.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Registration ID Ticket Card */}
            <div className="relative bg-gradient-to-br from-[#edf3f1] to-teal-50/60 border-2 border-[#285b63]/25 rounded-2xl p-5 sm:p-6 text-center shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-bold text-[#285b63] uppercase tracking-wider">Official Registration ID</span>
                <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full border border-teal-200 text-teal-700 font-semibold shadow-2xs">
                  Active Reference
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 my-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#1d3840] font-mono tracking-wider">
                  {submittedRegId}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyId(submittedRegId || "")}
                  className="h-8 px-2.5 bg-white hover:bg-slate-50 border-slate-300 text-slate-700 text-xs font-semibold gap-1.5 shadow-2xs cursor-pointer"
                  title="Copy Registration ID"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy ID</span>
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Please save this Registration ID to track semen analysis status, cryogenic quarantine, and appointment updates.
              </p>
            </div>

            {/* Next Steps Milestone Cards */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#285b63]" />
                  Next Clinical Steps
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">Timeline: 24 - 48 Hours</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Application & Eligibility Review",
                    text: "Our medical team reviews donor age eligibility (21-55) and health pre-screening within 2 business days.",
                    icon: FileText,
                  },
                  {
                    step: "2",
                    title: "Semen Analysis & Health Screening",
                    text: "You will be scheduled for semen parameter analysis and routine health screening tests.",
                    icon: HeartPulse,
                  },
                  {
                    step: "3",
                    title: "Cryogenic Quarantine",
                    text: "Mandatory 180-day cryogenic quarantine in liquid nitrogen is initiated after collection under Section 27 of ART Act 2021.",
                    icon: ShieldCheck,
                  },
                ].map(({ step, title, text, icon: Icon }) => (
                  <div
                    key={step}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#285b63]/10 border border-[#285b63]/20 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs text-[#285b63]">
                      <Icon className="w-4 h-4 text-[#285b63]" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-slate-800">{title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support note */}
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/70 text-xs text-teal-900 flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Need help or have questions? Our Semen Bank clinical desk is available Monday through Saturday.</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 text-center bg-[#285b63] hover:bg-[#1d464d] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-md shadow-[#285b63]/20 transition"
              >
                Back to Home
              </Link>
              <Link
                href="/contacts"
                className="flex-1 text-center border-2 border-[#285b63]/30 hover:border-[#285b63] text-[#285b63] hover:bg-[#edf3f1] text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition"
              >
                Contact Semen Bank Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────── PRE-SCREENING & OTP VERIFICATION VIEW ────────────────
  if (!isOtpVerified) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
        <Card className="border-slate-200/80 shadow-xl shadow-slate-200/60 rounded-3xl overflow-hidden bg-white">
          {/* Top Decorative Header Accent */}
          <div className="h-2 bg-gradient-to-r from-[#285b63] via-teal-500 to-[#1d3840]" />

          <CardHeader className="text-center pt-8 pb-4 px-6 sm:px-8">
            {/* Trust Icon */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#285b63]/10 to-teal-50 border border-[#285b63]/20 flex items-center justify-center mb-3.5 shadow-xs">
              <ShieldCheck className="w-7 h-7 text-[#285b63]" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#285b63] bg-[#285b63]/10 border border-[#285b63]/20 mx-auto mb-2">
              <Lock className="w-3 h-3 text-[#285b63]" />
              ART Act 2021 Verified Portal
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-serif font-bold text-[#1d3840] tracking-tight">
              Sperm Donor Pre-Screening
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
              Under ART Act 2021 regulations, male semen donors must verify their identity via Aadhaar, Mobile, and Email OTP before initiating semen registry.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-6 sm:px-8 pb-8 pt-2">
            {/* Aadhaar Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Aadhaar Number (12 Digits) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-slate-400" /> UIDAI Verification
                </span>
              </div>
              <div className="relative">
                <Input
                  placeholder="12-digit Aadhaar Number"
                  maxLength={12}
                  value={aadhaarInput}
                  disabled={otpSent}
                  onChange={(e) => setAadhaarInput(e.target.value.replace(/\D/g, ""))}
                  className="font-mono text-sm pl-3 h-11 border-slate-300 focus:border-[#285b63] focus:ring-2 focus:ring-[#285b63]/20 rounded-xl"
                />
              </div>
              <p className="text-[11px] text-slate-400">Enter your 12-digit UIDAI Aadhaar number without spaces.</p>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-slate-400" /> Linked with Aadhaar
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  +91
                </span>
                <Input
                  placeholder="10-digit Mobile Number"
                  maxLength={10}
                  value={phoneInput}
                  disabled={otpSent}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                  className="font-mono text-sm pl-14 h-11 border-slate-300 focus:border-[#285b63] focus:ring-2 focus:ring-[#285b63]/20 rounded-xl"
                />
              </div>
              <p className="text-[11px] text-slate-400">Enter your 10-digit UIDAI registered mobile number.</p>
            </div>

            {/* Email Address Input (Mandatory, Receives OTP) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#285b63]" /> OTP Destination
                </span>
              </div>
              <div className="relative flex items-center">
                <Input
                  type="email"
                  placeholder="donor@example.com"
                  value={emailInput}
                  disabled={otpSent}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="text-sm pl-3 h-11 border-slate-300 focus:border-[#285b63] focus:ring-2 focus:ring-[#285b63]/20 rounded-xl"
                />
              </div>
              <p className="text-[11px] text-slate-400">A 6-digit verification OTP will be sent to this email address.</p>
            </div>

            {/* Agent / Referral Code pill */}
            {agentCode && (
              <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-xs text-teal-800 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-teal-700" />
                </div>
                <span>Referral Partner Applied: <strong className="font-mono font-bold text-teal-900">{agentCode}</strong></span>
              </div>
            )}

            {/* OTP Input Block */}
            {otpSent && (
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#285b63]" />
                    Enter 6-Digit OTP <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-600 font-medium truncate max-w-[200px]" title={emailInput}>
                    Sent to {emailInput}
                  </span>
                </div>
                <Input
                  placeholder="• • • • • •"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                  className="font-mono text-center tracking-[0.4em] text-lg font-bold h-12 bg-white border-slate-300 focus:border-[#285b63] focus:ring-2 focus:ring-[#285b63]/20 rounded-xl"
                  autoFocus
                />
              </div>
            )}

            {/* Error Message */}
            {otpError && (
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{otpError}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2">
              {!otpSent ? (
                <Button
                  onClick={handleSendOtp}
                  disabled={otpLoading || aadhaarInput.length !== 12 || phoneInput.length < 10 || !emailInput || !emailInput.includes("@")}
                  className="w-full bg-[#285b63] hover:bg-[#1d464d] text-white font-bold h-12 rounded-xl shadow-md shadow-[#285b63]/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {otpLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-1" />}
                  Send Verification OTP to Email
                </Button>
              ) : (
                <div className="space-y-2.5">
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || otpInput.length < 4}
                    className="w-full bg-[#285b63] hover:bg-[#1d464d] text-white font-bold h-12 rounded-xl shadow-md shadow-[#285b63]/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {otpLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                    Verify OTP & Proceed
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleSendOtp}
                    disabled={resendCountdown > 0 || otpLoading}
                    className="w-full text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg h-9"
                  >
                    {resendCountdown > 0 ? `Resend OTP to Email in ${resendCountdown}s` : "Resend OTP to Email"}
                  </Button>
                </div>
              )}
            </div>

            {/* Trust and Encryption Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>256-bit encrypted • Confidential UIDAI compliance</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ──────────────── MULTI-STEP REGISTRATION WIZARD ────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Progress Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#285b63] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { step: 1, label: "Identity & Contact" },
            { step: 2, label: "Medical & Semen Profile" },
            { step: 3, label: "Identity Documents" },
            { step: 4, label: "Review & Consent" },
          ].map((item) => {
            const isPassed = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            return (
              <div key={item.step} className="flex flex-col items-center z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isPassed
                      ? "bg-[#285b63] text-white"
                      : isCurrent
                      ? "bg-[#285b63] text-white ring-4 ring-[#285b63]/20"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                </div>
                <span className={`text-[11px] font-medium mt-1.5 hidden sm:block ${isCurrent ? "text-[#285b63] font-bold" : "text-gray-500"}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-border py-4 px-6 flex flex-row items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#285b63] bg-[#285b63]/10 px-2 py-0.5 rounded">
              Sperm Donor Registry — Step {currentStep} of 4
            </span>
            <CardTitle className="text-lg font-serif text-[#1d3840] mt-1">
              {currentStep === 1 && "Identity & Contact Details"}
              {currentStep === 2 && "Medical Profile & Semen Screening Parameters"}
              {currentStep === 3 && "Identity Proofs & Signature Upload"}
              {currentStep === 4 && "Review & Legal Declarations"}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {(contactInfo.mobileNumber || phoneInput) && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                <Phone className="w-3 h-3 text-[#285b63]" />
                +91 {contactInfo.mobileNumber || phoneInput}
              </span>
            )}
            {(contactInfo.emailAddress || emailInput) && (
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                <Mail className="w-3 h-3 text-[#285b63]" />
                {contactInfo.emailAddress || emailInput}
              </span>
            )}
            {registrationId && (
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block">Registration ID</span>
                <span className="text-xs font-mono font-bold text-[#285b63]">{registrationId}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {/* ────── STEP 1: PERSONAL & CONTACT ────── */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name (as on Aadhaar) <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="fullName"
                    placeholder="Enter full legal name"
                    value={personalInfo.fullName}
                    onChange={(e) => {
                      updatePersonalInfo({ fullName: e.target.value });
                      clearError("fullName");
                    }}
                    className={errors.fullName ? "border-rose-500" : ""}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Date of Birth <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => {
                      const dob = e.target.value;
                      const age = calculateAge(dob);
                      updatePersonalInfo({ dateOfBirth: dob, age: age ?? undefined });
                      clearError("dateOfBirth");
                      clearError("age");
                    }}
                    className={errors.dateOfBirth ? "border-rose-500" : ""}
                  />
                  {errors.dateOfBirth && <p className="text-[11px] text-rose-500">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Age (Years) <span className="text-rose-500">*</span>
                    </label>
                    {personalInfo.dateOfBirth && (() => {
                      const calculatedAge = calculateAge(personalInfo.dateOfBirth);
                      if (calculatedAge === null) return null;
                      const isValid = calculatedAge >= 21 && calculatedAge <= 55;
                      return (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isValid ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {isValid ? "Eligible (21-55)" : "Ineligible (21-55 only)"}
                        </span>
                      );
                    })()}
                  </div>
                  <Input
                    data-field="age"
                    type="text"
                    readOnly
                    placeholder="Auto-calculated from Date of Birth"
                    value={(() => {
                      const calculatedAge = calculateAge(personalInfo.dateOfBirth);
                      return calculatedAge !== null ? `${calculatedAge} Years` : "";
                    })()}
                    className="bg-slate-50 font-semibold text-slate-800 cursor-not-allowed"
                  />
                  {errors.age && <p className="text-[11px] text-rose-500">{errors.age}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Blood Group <span className="text-rose-500">*</span></label>
                  <select
                    data-field="bloodGroup"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.bloodGroup ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.bloodGroup}
                    onChange={(e) => {
                      updatePersonalInfo({ bloodGroup: e.target.value });
                      clearError("bloodGroup");
                    }}
                  >
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <p className="text-[11px] text-rose-500">{errors.bloodGroup}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Marital Status <span className="text-rose-500">*</span></label>
                  <select
                    data-field="maritalStatus"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.maritalStatus ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.maritalStatus}
                    onChange={(e) => {
                      updatePersonalInfo({ maritalStatus: e.target.value });
                      clearError("maritalStatus");
                    }}
                  >
                    <option value="">Select Marital Status</option>
                    {MARITAL_STATUSES.map((ms) => (
                      <option key={ms} value={ms}>{ms}</option>
                    ))}
                  </select>
                  {errors.maritalStatus && <p className="text-[11px] text-rose-500">{errors.maritalStatus}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Education / Qualification <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="education"
                    placeholder="e.g. Graduate / B.Tech / M.Sc"
                    value={personalInfo.education || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ education: e.target.value });
                      clearError("education");
                    }}
                    className={errors.education ? "border-rose-500" : ""}
                  />
                  {errors.education && <p className="text-[11px] text-rose-500">{errors.education}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Occupation / Profession <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="occupation"
                    placeholder="e.g. Software Engineer, Teacher, Accountant"
                    value={personalInfo.occupation || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ occupation: e.target.value });
                      clearError("occupation");
                    }}
                    className={errors.occupation ? "border-rose-500" : ""}
                  />
                  {errors.occupation && <p className="text-[11px] text-rose-500">{errors.occupation}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Height (Feet) <span className="text-rose-500">*</span></label>
                  <select
                    data-field="height"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.height ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.height || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ height: e.target.value });
                      clearError("height");
                    }}
                  >
                    <option value="">Select Height (in feet)</option>
                    {HEIGHT_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {errors.height && <p className="text-[11px] text-rose-500">{errors.height}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Weight (kg) <span className="text-rose-500">*</span></label>
                  <select
                    data-field="weight"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.weight ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.weight || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ weight: e.target.value });
                      clearError("weight");
                    }}
                  >
                    <option value="">Select Weight (in kg)</option>
                    {WEIGHT_OPTIONS.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  {errors.weight && <p className="text-[11px] text-rose-500">{errors.weight}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Skin Colour / Complexion <span className="text-rose-500">*</span></label>
                  <select
                    data-field="complexion"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.complexion ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.complexion || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ complexion: e.target.value });
                      clearError("complexion");
                    }}
                  >
                    <option value="">Select Skin Colour</option>
                    {COMPLEXIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.complexion && <p className="text-[11px] text-rose-500">{errors.complexion}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Hair Color <span className="text-rose-500">*</span></label>
                  <select
                    data-field="hairColor"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.hairColor ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.hairColor || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ hairColor: e.target.value });
                      clearError("hairColor");
                    }}
                  >
                    <option value="">Select Hair Color</option>
                    {HAIR_COLORS.map((hc) => (
                      <option key={hc} value={hc}>{hc}</option>
                    ))}
                  </select>
                  {errors.hairColor && <p className="text-[11px] text-rose-500">{errors.hairColor}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Eye Color <span className="text-rose-500">*</span></label>
                  <select
                    data-field="eyeColor"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.eyeColor ? "border-rose-500" : "border-input"}`}
                    value={personalInfo.eyeColor || ""}
                    onChange={(e) => {
                      updatePersonalInfo({ eyeColor: e.target.value });
                      clearError("eyeColor");
                    }}
                  >
                    <option value="">Select Eye Color</option>
                    {EYE_COLORS.map((ec) => (
                      <option key={ec} value={ec}>{ec}</option>
                    ))}
                  </select>
                  {errors.eyeColor && <p className="text-[11px] text-rose-500">{errors.eyeColor}</p>}
                </div>
              </div>

              <hr className="border-gray-200" />
              <h4 className="text-sm font-bold text-slate-800">Contact & Address Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Current Address <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="currentAddress"
                    placeholder="Flat / House No, Street, Landmark"
                    value={contactInfo.currentAddress}
                    onChange={(e) => {
                      updateContactInfo({ currentAddress: e.target.value });
                      clearError("currentAddress");
                    }}
                    className={errors.currentAddress ? "border-rose-500" : ""}
                  />
                  {errors.currentAddress && <p className="text-[11px] text-rose-500">{errors.currentAddress}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">State <span className="text-rose-500">*</span></label>
                  <select
                    data-field="state"
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs ${errors.state ? "border-rose-500" : "border-input"}`}
                    value={contactInfo.state}
                    onChange={(e) => {
                      updateContactInfo({ state: e.target.value });
                      clearError("state");
                    }}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-[11px] text-rose-500">{errors.state}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">City / District <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="city"
                    placeholder="City / District"
                    value={contactInfo.city}
                    onChange={(e) => {
                      updateContactInfo({ city: e.target.value, district: e.target.value });
                      clearError("city");
                    }}
                    className={errors.city ? "border-rose-500" : ""}
                  />
                  {errors.city && <p className="text-[11px] text-rose-500">{errors.city}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Pincode <span className="text-rose-500">*</span></label>
                  <Input
                    data-field="pincode"
                    placeholder="6-digit Pincode"
                    maxLength={6}
                    value={contactInfo.pincode}
                    onChange={(e) => {
                      updateContactInfo({ pincode: e.target.value.replace(/\D/g, "") });
                      clearError("pincode");
                    }}
                    className={errors.pincode ? "border-rose-500" : ""}
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-500">{errors.pincode}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Mobile Number (Verified)</span>
                    <span className="text-rose-500">*</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </label>
                  <Input
                    value={contactInfo.mobileNumber || phoneInput}
                    disabled
                    className="bg-slate-50 font-mono text-slate-700 cursor-not-allowed text-xs h-9 border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>Email Address (Verified via OTP)</span>
                    <span className="text-rose-500">*</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </label>
                  <Input
                    data-field="emailAddress"
                    type="email"
                    value={contactInfo.emailAddress || emailInput}
                    disabled
                    className="bg-slate-50 font-mono text-slate-700 cursor-not-allowed text-xs h-9 border-emerald-300"
                  />
                </div>
              </div>

              <hr className="border-gray-200" />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Emergency Contact Person</h4>
                  <p className="text-[11px] text-slate-500">Optional — only used for urgent clinical notifications if needed.</p>
                </div>
                <span className="text-[10px] font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Optional</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Contact Person Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <Input
                    placeholder="Name of relative / kin"
                    value={emergencyContact.contactPersonName || ""}
                    onChange={(e) => updateEmergencyContact({ contactPersonName: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Relationship <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <Input
                    placeholder="e.g. Spouse, Father, Brother"
                    value={emergencyContact.relationship || ""}
                    onChange={(e) => updateEmergencyContact({ relationship: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Emergency Phone Number <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <Input
                    placeholder="10-digit phone number"
                    maxLength={10}
                    value={emergencyContact.phoneNumber || ""}
                    onChange={(e) => updateEmergencyContact({ phoneNumber: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>

              <hr className="border-gray-200" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">Where did you hear from us?</h4>
                <p className="text-[11px] text-slate-500">Please let us know how you discovered Mediyaz ART Bank.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Where did you hear from us? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    data-field="sourceReferralType"
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={referral.sourceReferralType || "Online"}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateReferral({ sourceReferralType: val });
                      if (val !== "Refer") {
                        clearError("referId");
                      }
                    }}
                  >
                    <option value="Online">Online</option>
                    <option value="Our Staff">Our Staff</option>
                    <option value="Refer">Refer</option>
                  </select>
                </div>

                {referral.sourceReferralType === "Refer" && (
                  <div className="space-y-1 animate-in fade-in">
                    <label className="text-xs font-semibold text-slate-700">
                      Refer Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      data-field="referId"
                      placeholder="Enter Refer Name"
                      value={referral.patientOrDonorId || agentCode || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateReferral({ patientOrDonorId: val });
                        setAgentCode(val);
                        if (val.trim()) {
                          clearError("referId");
                        }
                      }}
                      className={`text-xs font-medium ${errors.referId ? "border-rose-500" : ""}`}
                    />
                    {errors.referId && <p className="text-[11px] text-rose-500">{errors.referId}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ────── STEP 2: MEDICAL & DONOR INFO ────── */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-3">
                <HeartPulse className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-900">
                  <p className="font-bold">ART Act 2021 Semen Screening Mandate</p>
                  <p className="mt-0.5">Sperm donors undergo stringent testing for transmissible infections (HIV, HBsAg, HCV, VDRL) and karyotyping. Donors must maintain 2–7 days of sexual abstinence before sample donation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Abstinence Period (Days prior to donation)</label>
                  <Input
                    placeholder="e.g. 3 days"
                    value={donorInfo.abstinencePeriod || ""}
                    onChange={(e) => updateDonorInfo({ abstinencePeriod: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Previous Semen Donation History</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={donorInfo.previousDonationHistory || "No"}
                    onChange={(e) => updateDonorInfo({ previousDonationHistory: e.target.value as "Yes" | "No" })}
                  >
                    <option value="No">No (First time donor)</option>
                    <option value="Yes">Yes (Have donated previously)</option>
                  </select>
                </div>

                {donorInfo.previousDonationHistory === "Yes" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Number of Previous Donations</label>
                      <Input
                        placeholder="e.g. 2"
                        value={donorInfo.numberOfDonations || ""}
                        onChange={(e) => updateDonorInfo({ numberOfDonations: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Last Donation Date</label>
                      <Input
                        type="date"
                        value={donorInfo.lastDonationDate || ""}
                        onChange={(e) => updateDonorInfo({ lastDonationDate: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Diabetes</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={medicalInfo.diabetes || "No"}
                    onChange={(e) => updateMedicalInfo({ diabetes: e.target.value })}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Hypertension</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={medicalInfo.hypertension || "No"}
                    onChange={(e) => updateMedicalInfo({ hypertension: e.target.value })}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Smoking Status</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={medicalInfo.smokingStatus || "Never"}
                    onChange={(e) => updateMedicalInfo({ smokingStatus: e.target.value })}
                  >
                    <option value="Never">Never</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Regularly">Regularly</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Alcohol Consumption</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                    value={medicalInfo.alcoholConsumption || "Never"}
                    onChange={(e) => updateMedicalInfo({ alcoholConsumption: e.target.value })}
                  >
                    <option value="Never">Never</option>
                    <option value="Socially">Socially</option>
                    <option value="Regularly">Regularly</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Medical / Surgical History Notes (Optional)</label>
                  <Input
                    placeholder="Any relevant past health conditions or surgical procedures"
                    value={medicalInfo.medicalHistory || ""}
                    onChange={(e) => updateMedicalInfo({ medicalHistory: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ────── STEP 3: DOCUMENTS ────── */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <p className="font-bold">Secure Identity & Consent Verification</p>
                  <p className="mt-0.5">Please upload clear scanned photos of your identity proofs and donor signature. All files are securely encrypted.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPERM_DOCUMENTS.map((doc) => (
                  <div key={doc.key} className="space-y-1">
                    <FileUploadField
                      label={doc.label}
                      value={(documents as any)[doc.key]}
                      onChange={(file) => updateDocuments({ [doc.key]: file })}
                      required={doc.required}
                      accept=".png,.jpg,.jpeg,.webp"
                      folder={doc.folder}
                      enableCrop={true}
                      cropMode={doc.cropMode}
                      error={errors[doc.key]}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ────── STEP 4: REVIEW & STATUTORY CONSENT ────── */}
          {currentStep === 4 && (
            <SpermRegistrationReview
              registrationId={registrationId}
              personalInfo={personalInfo}
              contactInfo={contactInfo}
              donorInfo={donorInfo}
              medicalInfo={medicalInfo}
              emergencyContact={emergencyContact}
              referral={referral}
              documents={documents}
              consent={consent}
              errors={errors}
              updateConsent={updateConsent}
              onEditStep={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* ────── NAVIGATION BUTTONS ────── */}
          <div className="pt-6 mt-6 border-t border-gray-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="text-xs font-bold gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {currentStep < 4 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={isSaving}
                  className="bg-[#285b63] hover:bg-[#1d464d] text-white text-xs font-bold gap-1.5 px-6"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold gap-1.5 px-8 h-10 shadow-md"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                  Submit Sperm Donor Registration
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
