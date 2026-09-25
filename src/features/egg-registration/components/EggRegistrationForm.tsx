"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEggFormStore } from "../store/egg-registration.store";
import { FileUploadField } from "@/features/file-upload/components/FileUploadField";
import { EggRegistrationDetailsReview } from "./EggRegistrationDetailsReview";
import { EggRegistrationReview } from "./EggRegistrationReview";
import {
  createDraftEggRegistrationAction,
  getEggRegistrationAction,
  findEggDraftAction,
  updateEggRegistrationStepAction,
  submitEggRegistrationAction,
} from "../actions/egg-registration.actions";
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
  Search,
  RotateCcw,
  Sparkles,
  ExternalLink,
  LogOut,
  Mail,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
const EGG_MARITAL_STATUSES = ["Married", "Divorced", "Widowed"] as const;
const COMPLEXIONS = ["Fair", "Very Fair", "Wheatish", "Medium", "Olive", "Brown", "Dark"] as const;
const HAIR_COLORS = ["Black", "Dark Brown", "Brown", "Light Brown", "Blonde", "Other"] as const;
const EYE_COLORS = ["Black", "Dark Brown", "Brown", "Hazel", "Green", "Blue", "Grey", "Other"] as const;
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi", "Jewish", "Other"] as const;

const HEIGHT_OPTIONS = [
  "4 ft 6 in", "4 ft 7 in", "4 ft 8 in", "4 ft 9 in", "4 ft 10 in", "4 ft 11 in",
  "5 ft 0 in", "5 ft 1 in", "5 ft 2 in", "5 ft 3 in", "5 ft 4 in", "5 ft 5 in",
  "5 ft 6 in", "5 ft 7 in", "5 ft 8 in", "5 ft 9 in", "5 ft 10 in", "5 ft 11 in",
  "6 ft 0 in", "6 ft 1 in", "6 ft 2 in", "6 ft 3 in", "6 ft 4 in", "6 ft 5 in", "6 ft 6 in", "6 ft 7 in"
] as const;

const WEIGHT_OPTIONS = Array.from({ length: 81 }, (_, i) => `${40 + i} kg`);

function calculateAge(dobString?: string): number | null {
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

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Chandigarh", "Puducherry", "Other"
];

const EGG_DOCUMENTS = [
  { key: "passportPhoto", label: "Donor Photograph", required: true, folder: "profile-images", cropMode: "photo" as const },
  { key: "aadhaarFront", label: "Aadhaar Card (Front)", required: true, folder: "documents", cropMode: "document" as const },
  { key: "aadhaarBack", label: "Aadhaar Card (Back)", required: true, folder: "documents", cropMode: "document" as const },
  { key: "signature", label: "Donor Digital Signature", required: true, folder: "documents", cropMode: "signature" as const },
];

const selectFieldClass = (hasError?: boolean, extraClass = "") =>
  `w-full h-11 rounded-lg border bg-white pl-4 pr-10 text-sm text-[#444] transition-all focus:outline-none focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
    hasError ? "border-rose-500 ring-1 ring-rose-500" : "border-gray-300" 
  } ${extraClass}`.trim();

const SESSION_STORAGE_KEY = "mediyaz_egg_active_session";

interface ActiveEggSession {
  registrationId: string;
  isOtpVerified: boolean;
  aadhaarInput: string;
  phoneInput: string;
  emailInput: string;
  currentStep: number;
  savedAt: number;
}

function saveActiveSession(data: Partial<ActiveEggSession>) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    const existing: Partial<ActiveEggSession> = raw ? JSON.parse(raw) : {};
    const updated: ActiveEggSession = {
      registrationId: data.registrationId ?? existing.registrationId ?? "",
      isOtpVerified: data.isOtpVerified ?? existing.isOtpVerified ?? false,
      aadhaarInput: data.aadhaarInput ?? existing.aadhaarInput ?? "",
      phoneInput: data.phoneInput ?? existing.phoneInput ?? "",
      emailInput: data.emailInput ?? existing.emailInput ?? "",
      currentStep: data.currentStep ?? existing.currentStep ?? 1,
      savedAt: Date.now(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

function getActiveSession(): ActiveEggSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearActiveSession() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {}
}

export function EggRegistrationForm({ draftId }: { draftId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useEggFormStore();

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
  const [detectedDraftSession, setDetectedDraftSession] = useState<ActiveEggSession | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRegId, setSubmittedRegId] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [sameAsResidential, setSameAsResidential] = useState(false);
  // Prominent banner notice shown on page reload / draft restore
  const [restoredNotice, setRestoredNotice] = useState<{ show: boolean; step: number; id: string } | null>(null);

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
    agentCode,
    setAgentCode,
    personalInfo,
    contactInfo,
    medicalInfo,
    donorInfo,
    documents,
    emergencyContact,
    consent,
    referral,
    updatePersonalInfo,
    updateContactInfo,
    updateMedicalInfo,
    updateDonorInfo,
    updateDocuments,
    updateEmergencyContact,
    updateConsent,
    updateReferral,
    loadFromServer,
    isSaving,
    isSubmitting,
    setIsSaving,
    setIsSubmitting,
  } = store;

  // 1. Unified initial hydration & resume on refresh, direct URL draft, or stored session
  useEffect(() => {
    const urlDraftId = draftId || searchParams?.get("draftId") || searchParams?.get("id");
    const urlStep = searchParams?.get("step");
    const active = getActiveSession();

    // Case A: A draftId is provided in URL or prop — ALWAYS load it directly
    if (urlDraftId) {
      getEggRegistrationAction(urlDraftId).then((res) => {
        if (res.success && res.registration) {
          loadFromServer(res.registration);
          setIsOtpVerified(true);
          setRegistrationId(res.registration.registrationId);
          if (res.registration.personalInfo?.aadhaarNumber) {
            setAadhaarInput(res.registration.personalInfo.aadhaarNumber);
          }
          if (res.registration.contactInfo?.mobileNumber) {
            setPhoneInput(res.registration.contactInfo.mobileNumber);
          }
          if (res.registration.contactInfo?.emailAddress) {
            setEmailInput(res.registration.contactInfo.emailAddress);
          }
          const resumeStep = urlStep ? parseInt(urlStep, 10) : (res.registration.currentStep || 1);
          setCurrentStep(resumeStep);
          saveActiveSession({
            registrationId: res.registration.registrationId,
            isOtpVerified: true,
            aadhaarInput: res.registration.personalInfo?.aadhaarNumber || "",
            phoneInput: res.registration.contactInfo?.mobileNumber || "",
            emailInput: res.registration.contactInfo?.emailAddress || "",
            currentStep: resumeStep,
          });

          setRestoredNotice({
            show: true,
            step: resumeStep,
            id: res.registration.registrationId,
          });

          if (res.registration.status === "SUBMITTED") {
            setIsSubmitted(true);
            setSubmittedRegId(res.registration.registrationId);
          } else {
            toast.success(`Resumed registration ${res.registration.registrationId} (Step ${resumeStep})!`);
          }
        } else {
          toast.error(res.error || `Could not find draft ${urlDraftId}. Please check the ID.`);
        }
      });
      return;
    }

    // Case B: User refreshed page with an active verified session
    if (active && active.isOtpVerified && active.registrationId) {
      setIsOtpVerified(true);
      if (active.aadhaarInput) setAadhaarInput(active.aadhaarInput);
      if (active.phoneInput) setPhoneInput(active.phoneInput);
      if (active.emailInput) setEmailInput(active.emailInput);
      const resumeStep = urlStep ? parseInt(urlStep, 10) : (active.currentStep || store.currentStep || 1);
      setCurrentStep(resumeStep);
      setRegistrationId(active.registrationId);

      getEggRegistrationAction(active.registrationId).then((res) => {
        if (res.success && res.registration) {
          loadFromServer(res.registration);
          if (res.registration.personalInfo?.aadhaarNumber) {
            setAadhaarInput(res.registration.personalInfo.aadhaarNumber);
          }
          if (res.registration.contactInfo?.mobileNumber) {
            setPhoneInput(res.registration.contactInfo.mobileNumber);
          }
          if (res.registration.contactInfo?.emailAddress) {
            setEmailInput(res.registration.contactInfo.emailAddress);
          }
          if (res.registration.status === "SUBMITTED") {
            setIsSubmitted(true);
            setSubmittedRegId(res.registration.registrationId);
          } else if (res.registration.currentStep && !urlStep) {
            setCurrentStep(res.registration.currentStep);
            saveActiveSession({ currentStep: res.registration.currentStep });
          }
        }
      });

      setRestoredNotice({
        show: true,
        step: resumeStep,
        id: active.registrationId,
      });

      toast.info(`Restored your active registration session (Step ${resumeStep})`, { duration: 3500 });
      return;
    }

    // Case C: Detected draft session banner
    if (active && active.registrationId) {
      setDetectedDraftSession(active);
    }
  }, []);



  // Manual save to draft handler
  const [isSavingManual, setIsSavingManual] = useState(false);

  const handleSaveDraftManual = async () => {
    if (!registrationId) {
      toast.error("No active draft session found to save.");
      return;
    }
    setIsSavingManual(true);
    try {
      const allData = store.getAllFormData();
      const res = await updateEggRegistrationStepAction(registrationId, {
        ...allData,
        currentStep,
      });
      if (res.success) {
        saveActiveSession({
          registrationId,
          currentStep,
          isOtpVerified: true,
          aadhaarInput: personalInfo.aadhaarNumber || aadhaarInput,
          phoneInput: contactInfo.mobileNumber || phoneInput,
          emailInput: contactInfo.emailAddress || emailInput,
        });
        toast.success(`Draft successfully saved! (Step ${currentStep} of 5)`, {
          description: `All your entered details and documents are preserved. ID: ${registrationId}`,
          duration: 4500,
        });
      } else {
        toast.error(res.error || "Failed to save draft.");
      }
    } catch {
      toast.error("Network error while saving draft.");
    } finally {
      setIsSavingManual(false);
    }
  };

  // Custom Exit Confirmation Modal State
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpenExitModal = () => {
    setIsExitModalOpen(true);
  };

  const handleConfirmExit = async () => {
    setIsExiting(true);
    try {
      if (registrationId && !isSubmitted) {
        const allData = store.getAllFormData();
        await updateEggRegistrationStepAction(registrationId, {
          ...allData,
          currentStep,
        });
      }

      clearActiveSession();
      store.resetForm();
      setIsOtpVerified(false);
      setRegistrationId(null);
      setCurrentStep(1);
      setAadhaarInput("");
      setPhoneInput("");
      setEmailInput("");
      setOtpInput("");
      setOtpSent(false);
      setDetectedDraftSession(null);
      setIsSubmitted(false);
      setSubmittedRegId("");
      setIsExitModalOpen(false);

      if (typeof window !== "undefined") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("draftId");
        newUrl.searchParams.delete("id");
        newUrl.searchParams.delete("step");
        window.history.replaceState(null, "", newUrl.toString());
      }

      toast.info("Session exited. All details are safely saved in your draft.", {
        description: registrationId ? `Your Registration ID is ${registrationId}` : undefined,
        duration: 5000,
      });
    } catch {
      toast.error("Error exiting session.");
    } finally {
      setIsExiting(false);
    }
  };

  // Live auto-save status for real-time visual feedback
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "idle">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  // Debounced background auto-save to MongoDB (persists 1.8s after user pauses typing)
  useEffect(() => {
    if (!isOtpVerified || !registrationId || isSubmitted) return;

    setAutoSaveStatus("saving");
    const timer = setTimeout(async () => {
      try {
        const allData = store.getAllFormData();
        await updateEggRegistrationStepAction(registrationId, {
          ...allData,
          currentStep,
        });
        saveActiveSession({
          registrationId,
          currentStep,
          isOtpVerified: true,
          aadhaarInput: personalInfo.aadhaarNumber || aadhaarInput,
          phoneInput: contactInfo.mobileNumber || phoneInput,
          emailInput: contactInfo.emailAddress || emailInput,
        });
        setAutoSaveStatus("saved");
        setLastSavedTime(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } catch (err) {
        console.warn("Background auto-save draft:", err);
        setAutoSaveStatus("saved");
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [
    isOtpVerified,
    registrationId,
    currentStep,
    isSubmitted,
    personalInfo,
    contactInfo,
    medicalInfo,
    donorInfo,
    documents,
    emergencyContact,
    consent,
    referral,
  ]);

  // Silent session save on window unload (NO browser popup, seamless data preservation)
  useEffect(() => {
    const handleSaveOnUnload = () => {
      if (isOtpVerified && registrationId && !isSubmitted) {
        saveActiveSession({
          registrationId,
          currentStep,
          isOtpVerified: true,
          aadhaarInput: personalInfo.aadhaarNumber || aadhaarInput,
          phoneInput: contactInfo.mobileNumber || phoneInput,
          emailInput: contactInfo.emailAddress || emailInput,
        });
      }
    };
    window.addEventListener("beforeunload", handleSaveOnUnload);
    return () => window.removeEventListener("beforeunload", handleSaveOnUnload);
  }, [isOtpVerified, registrationId, currentStep, isSubmitted, personalInfo, contactInfo, aadhaarInput, phoneInput, emailInput]);

  // Track refer code from query param
  useEffect(() => {
    const urlRefer = searchParams?.get("ref") || searchParams?.get("referral") || searchParams?.get("agent") || searchParams?.get("agentCode");
    if (urlRefer) {
      const code = urlRefer.toUpperCase().trim();
      setAgentCode(code);
      updateReferral({ patientOrDonorId: code, sourceReferralType: "Refer" });
    }
  }, [searchParams]);

  const goToStep = (stepNum: number) => {
    const clamped = Math.max(1, Math.min(stepNum, 5));
    setCurrentStep(clamped);
    saveActiveSession({ currentStep: clamped });
    if (typeof window !== "undefined" && registrationId) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("draftId", registrationId);
      newUrl.searchParams.set("step", String(clamped));
      window.history.replaceState(null, "", newUrl.toString());
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          donorType: "Egg Donor",
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

        // Create or load draft egg registration
        const createRes = await createDraftEggRegistrationAction({
          personalInfo: { aadhaarNumber: aadhaarInput, gender: "Female" },
          contactInfo: { mobileNumber: phoneInput, emailAddress: cleanEmail },
          agentCode: agentCode || undefined,
        });

        if (createRes.success && createRes.registration) {
          loadFromServer(createRes.registration);
          setRegistrationId(createRes.registrationId);
          setIsOtpVerified(true);
          const resumeStep = createRes.registration.currentStep || 1;
          setCurrentStep(resumeStep);
          updatePersonalInfo({ aadhaarNumber: aadhaarInput, gender: "Female" });
          updateContactInfo({ mobileNumber: phoneInput, emailAddress: cleanEmail });

          // Persist session to survive browser refresh
          saveActiveSession({
            registrationId: createRes.registrationId,
            isOtpVerified: true,
            aadhaarInput,
            phoneInput,
            emailInput: cleanEmail,
            currentStep: resumeStep,
          });

          // Sync URL with draftId and step
          if (typeof window !== "undefined") {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("draftId", createRes.registrationId);
            newUrl.searchParams.set("step", String(resumeStep));
            window.history.replaceState(null, "", newUrl.toString());
          }

          if (createRes.isExisting) {
            toast.success(`Draft found! Resumed your registration at Step ${resumeStep}.`, {
              description: `Registration ID: ${createRes.registrationId}`,
              duration: 4500,
            });
          } else {
            toast.success("Identity verified! Starting new registration.");
          }
        } else {
          const errMsg = createRes.error || "Failed to initialize registration record.";
          setOtpError(errMsg);
          toast.error(errMsg, { duration: 6000 });
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
    if (!personalInfo.monthlyIncome?.trim()) errs.monthlyIncome = "Monthly income is required";
    if (!personalInfo.religion?.trim()) errs.religion = "Religion is required";
    if (!personalInfo.hobby?.trim()) errs.hobby = "Hobby / Interests is required";
    if (!personalInfo.height?.trim()) errs.height = "Height is required";
    if (!personalInfo.weight?.trim()) errs.weight = "Weight is required";
    if (!personalInfo.complexion?.trim()) errs.complexion = "Skin colour / complexion is required";
    if (!personalInfo.hairColor?.trim()) errs.hairColor = "Hair color is required";
    if (!personalInfo.eyeColor?.trim()) errs.eyeColor = "Eye color is required";
    
    // Statutory ART Act 2021 criteria: Female, Age 23-35, ever married
    if (!personalInfo.dateOfBirth) {
      errs.dateOfBirth = "Date of birth is required";
    } else {
      const calculatedAge = calculateAge(personalInfo.dateOfBirth);
      if (calculatedAge === null || calculatedAge < 23 || calculatedAge > 35) {
        errs.dateOfBirth = "Under Section 27 of ART Act 2021, an oocyte donor must be between 23 and 35 years of age.";
        errs.age = "Donor must be between 23 and 35 years";
      }
    }

    if (personalInfo.maritalStatus === "Married") {
      if (!personalInfo.husbandName?.trim() && !personalInfo.spouseName?.trim()) {
        errs.husbandName = "Husband's name is mandatory for married egg donors under ART Act 2021";
      }
      if (!personalInfo.husbandOccupation?.trim() && !personalInfo.spouseOccupation?.trim()) {
        errs.husbandOccupation = "Husband's occupation is mandatory under ART Act 2021";
      }
      if (!personalInfo.husbandEducation?.trim() && !personalInfo.spouseEducation?.trim()) {
        errs.husbandEducation = "Husband's education is required under ART Act 2021";
      }
    }

    if (!contactInfo.permanentAddress?.trim()) errs.permanentAddress = "Residential address (as per Aadhaar Card) is required";
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

    setErrors(errs);
    return errs;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    const deliveries = parseInt(donorInfo.numberOfDeliveries || "0", 10);
    if (isNaN(deliveries) || deliveries < 1) {
      errs.numberOfDeliveries = "Under ART Act 2021, an egg donor must have at least one living child of her own (minimum 3 years of age).";
    }

    if (donorInfo.previousEggDonation === "Yes") {
      errs.previousEggDonation = "Under Section 27(3) of ART Act 2021, an oocyte donor can donate only ONCE in her entire lifetime.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!documents.passportPhoto?.url) errs.passportPhoto = "Donor photograph is required";
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
    if (!consent.confirmOnceInLifetime) errs.confirmOnceInLifetime = "Must declare that you have never donated oocytes previously";
    if (personalInfo.maritalStatus === "Married" && !consent.husbandConsentConfirmed) {
      errs.husbandConsentConfirmed = "Statutory husband consent is mandatory under ART Act 2021";
    }
    if (!consent.allowStorage) errs.allowStorage = "Must consent to medical expenses & statutory insurance coverage";

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
      toast.error("Please resolve statutory obstetric & donation eligibility criteria.");
      return;
    }
    if (currentStep === 3 && !validateStep3()) {
      toast.error("Please upload all required identity documents & signature.");
      return;
    }

    // Advance step and save session
    const nextStepNum = Math.min(currentStep + 1, 5);
    goToStep(nextStepNum);

    // Auto-save progress in background without blocking UI progression
    if (registrationId) {
      setIsSaving(true);
      updateEggRegistrationStepAction(registrationId, {
        personalInfo,
        contactInfo,
        medicalInfo,
        donorInfo,
        documents,
        emergencyContact,
        consent,
        referral,
        agentCode: agentCode || (referral?.sourceReferralType === "Refer" ? referral?.patientOrDonorId : undefined),
        currentStep: nextStepNum,
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
    const prevStepNum = Math.max(currentStep - 1, 1);
    goToStep(prevStepNum);
  };

  const handleFinalSubmit = async () => {
    if (!validateStep4()) {
      toast.error("Please confirm all mandatory statutory consent declarations below.");
      const consentEl = document.getElementById("statutory-consent-section");
      if (consentEl) {
        consentEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      let targetId: string = registrationId || "";
      if (!targetId) {
        const createRes = await createDraftEggRegistrationAction({
          personalInfo: { ...personalInfo, gender: "Female" },
          contactInfo: { ...contactInfo, mobileNumber: contactInfo.mobileNumber || phoneInput },
          agentCode: agentCode || undefined,
        });
        if (createRes.success && createRes.registrationId) {
          targetId = createRes.registrationId;
          setRegistrationId(targetId);
        } else {
          toast.error("Registration record not found. Please restart or verify phone number.");
          return;
        }
      }

      const res = await submitEggRegistrationAction(targetId, {
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

      if (res.success) {
        setIsSubmitted(true);
        setSubmittedRegId(targetId);
        clearActiveSession();
        store.resetForm();
        if (typeof window !== "undefined") {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("draftId");
          newUrl.searchParams.delete("step");
          window.history.replaceState(null, "", newUrl.toString());
        }
        toast.success("Egg Donor Registration submitted successfully!");
      } else {
        toast.error(res.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err?.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
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
                Egg Registration Submitted!
              </h1>
              <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Your official female oocyte donor registration has been received and entered into the Mediyaz ART Bank secure registry.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Registration ID Ticket Card */}
            <div className="relative bg-gradient-to-br from-[#edf3f1] to-teal-50/60 border-2 border-[#285b63]/25 rounded-2xl p-5 sm:p-6 text-center shadow-xs">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold text-[#285b63] text-center uppercase tracking-wider">Registration ID</span>
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

              <div className="flex flex-wrap items-center justify-center gap-3 my-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#1d3840] font-mono tracking-wider">
                  {submittedRegId}
                </span>
                
              </div>

              {/* <p className="text-xs text-slate-500 mt-2">
                Please save this Registration ID to track your clinical assessment, appointments, and compensation status.
              </p> */}
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
                    title: "Application Review",
                    text: "Our team verifies donor eligibility (age 23-35, marital record, and husband consent).",
                    icon: FileText,
                  },
                  {
                    step: "2",
                    title: "Health & Clinical Screening",
                    text: "You will be contacted by our coordinator to schedule ultrasound and health tests.",
                    icon: HeartPulse,
                  },
                  {
                    step: "3",
                    title: "Health & Life Insurance",
                    text: "A comprehensive health and life insurance policy is issued in your name under Section 22 of ART Act 2021.",
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
              <span>Need help or have questions? Our clinical donor desk is available Monday through Saturday.</span>
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
                Contact Clinical Desk
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
          {/* <div className="h-2 bg-gradient-to-r from-[#285b63] via-teal-500 to-[#1d3840]" /> */}

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
              Egg Donor Registration
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
              Under ART Act 2021 regulations, female oocyte donors must verify their identity via Aadhaar, Mobile, and Email OTP before initiating the official registry.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-6 sm:px-8 pb-8 pt-2">
            {/* Detected Incomplete Draft Resume Banner */}
            {detectedDraftSession && !isOtpVerified && (
              <div className="p-3.5 rounded-2xl border border-teal-200 bg-teal-50/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-teal-950 shadow-xs mb-3">
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5 text-teal-900">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    Unfinished Registration Detected
                  </div>
                  <p className="text-[11px] text-teal-700 mt-0.5">
                    ID: <span className="font-mono font-bold">{detectedDraftSession.registrationId}</span> (Step {detectedDraftSession.currentStep || 1})
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setIsOtpVerified(true);
                      setAadhaarInput(detectedDraftSession.aadhaarInput || "");
                      setPhoneInput(detectedDraftSession.phoneInput || "");
                      const resumeStep = detectedDraftSession.currentStep || 1;
                      setCurrentStep(resumeStep);
                      setRegistrationId(detectedDraftSession.registrationId);
                      getEggRegistrationAction(detectedDraftSession.registrationId).then((res) => {
                        if (res.success && res.registration) loadFromServer(res.registration);
                      });
                      saveActiveSession({ isOtpVerified: true });
                      if (typeof window !== "undefined") {
                        const newUrl = new URL(window.location.href);
                        newUrl.searchParams.set("draftId", detectedDraftSession.registrationId);
                        newUrl.searchParams.set("step", String(resumeStep));
                        window.history.replaceState(null, "", newUrl.toString());
                      }
                      toast.success(`Resumed registration from Step ${resumeStep}!`);
                    }}
                    className="bg-[#285b63] hover:bg-[#1d464d] text-white rounded-lg text-xs h-8 px-3"
                  >
                    Resume Step {detectedDraftSession.currentStep || 1}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      clearActiveSession();
                      setDetectedDraftSession(null);
                      store.resetForm();
                      toast.info("Cleared previous session. Ready to start fresh.");
                    }}
                    className="text-xs h-8 px-2.5 rounded-lg border-teal-300 text-teal-800 hover:bg-teal-100"
                  >
                    Start Fresh
                  </Button>
                </div>
              </div>
            )}

            {/* Aadhaar Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Aadhaar Number (12 Digits) <span className="text-rose-500">*</span>
                </label>
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
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-relaxed">{otpError}</span>
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
            {/* <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>256-bit encrypted • Confidential UIDAI compliance</span>
            </div> */}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ──────────────── MULTI-STEP REGISTRATION WIZARD ────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 ">
      {/* Progress Indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#285b63] -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {[
            { step: 1, label: "Identity & Spouse Details" },
            { step: 2, label: "Obstetric & Clinical" },
            { step: 3, label: "Documents Upload" },
            { step: 4, label: "Review Your Details" },
            { step: 5, label: "Legal Documents" },
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

      {/* Prominent On-Page Reload / Restored Notice Banner */}
      {restoredNotice && restoredNotice.show && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-2xl border border-emerald-300/80 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 text-emerald-950 flex items-center justify-between gap-3 shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-sm font-bold text-emerald-950">
                  Draft Restored Automatically
                </p>
                <span className="text-[10px] font-mono font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                  ID: {restoredNotice.id}
                </span>
                <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                  Step {restoredNotice.step} of 5
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-800 mt-0.5">
                All your previously filled details, phone (+91 {contactInfo.mobileNumber || phoneInput || "—"}), and Aadhaar have been safely restored. You can continue filling your form.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRestoredNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 p-1.5 rounded-xl hover:bg-emerald-200/50 transition shrink-0"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/70 border-b border-border py-2.5 px-4 sm:px-6 flex flex-row items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0 flex-nowrap">
            <span className="font-bold tracking-wider uppercase text-[11px] text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap shadow-2xs">
              Egg Donor Form — Step {currentStep} of 5
            </span>
            {registrationId && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#285b63]/10 text-[#285b63] border border-[#285b63]/20 shrink-0 whitespace-nowrap">
                ID: {registrationId}
                <button
                  type="button"
                  onClick={() => handleCopyId(registrationId)}
                  className="hover:text-black ml-0.5"
                  title="Copy Registration ID"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Mobile / Phone Number Badge */}
            {(contactInfo.mobileNumber || phoneInput) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs shrink-0 whitespace-nowrap">
                <Phone className="w-3 h-3 text-[#285b63]" />
                <span>+91 {contactInfo.mobileNumber || phoneInput}</span>
              </span>
            )}

            {/* Email Address Badge */}
            {(contactInfo.emailAddress || emailInput) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs shrink-0 whitespace-nowrap">
                <Mail className="w-3 h-3 text-[#285b63]" />
                <span>{contactInfo.emailAddress || emailInput}</span>
              </span>
            )}

            {/* Aadhaar Number Badge */}
            {(personalInfo.aadhaarNumber || aadhaarInput) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs shrink-0 whitespace-nowrap">
                <CreditCard className="w-3 h-3 text-[#285b63]" />
                <span>
                  {(() => {
                    const raw = (personalInfo.aadhaarNumber || aadhaarInput).trim();
                    return raw.length === 12
                      ? `Aadhaar: ${raw.slice(0, 4)} ${raw.slice(4, 8)} ${raw.slice(8)}`
                      : `Aadhaar: ${raw}`;
                  })()}
                </span>
              </span>
            )}

            {/* Real-Time Auto-Save Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs shrink-0 whitespace-nowrap">
              {autoSaveStatus === "saving" ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-teal-600" />
                  <span className="text-teal-900 font-semibold text-[11px]">Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-900 font-semibold text-[11px]">Auto-saved</span>
                  {lastSavedTime && (
                    <span className="text-[10px] text-emerald-700 font-mono">
                      ({lastSavedTime})
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleOpenExitModal}
              className="h-8 px-2.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg gap-1.5 font-medium shrink-0 whitespace-nowrap"
              title="Save draft and exit current session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Session</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {/* ────── STEP 1: PERSONAL, MARITAL & SPOUSE ────── */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Eligibility Criteria under ART Act 2021:</p>
                  <p className="mt-0.5">Egg donors must be female, aged between <strong>23 and 35 years</strong>, ever-married (Married, Divorced, or Widowed), and provide husband/spouse details.</p>
                </div>
              </div>

              {/* ────── 1. PERSONAL INFORMATION & PHYSICAL PROFILE ────── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <UserCheck className="w-4 h-4 text-[#285b63]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    1. Personal Information & Physical Profile
                  </h4>
                </div>

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
                        const isValid = calculatedAge >= 23 && calculatedAge <= 35;
                        return (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isValid ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}>
                            {isValid ? "Eligible (23-35)" : "Ineligible (23-35 only)"}
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
                      className={selectFieldClass(Boolean(errors.bloodGroup))}
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
                    <label className="text-xs font-semibold text-slate-700">Education / Qualification <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="education"
                      placeholder="e.g. Graduate / 12th Pass"
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
                    <label className="text-xs font-semibold text-slate-700">Donor Occupation <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="occupation"
                      placeholder="e.g. Homemaker, Teacher"
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
                    <label className="text-xs font-semibold text-slate-700">6. Monthly Income <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="monthlyIncome"
                      placeholder="e.g. ₹25,000 / month"
                      value={personalInfo.monthlyIncome || ""}
                      onChange={(e) => {
                        updatePersonalInfo({ monthlyIncome: e.target.value });
                        clearError("monthlyIncome");
                      }}
                      className={errors.monthlyIncome ? "border-rose-500" : ""}
                    />
                    {errors.monthlyIncome && <p className="text-[11px] text-rose-500">{errors.monthlyIncome}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">7. Religion <span className="text-rose-500">*</span></label>
                    <select
                      data-field="religion"
                      className={selectFieldClass(Boolean(errors.religion))}
                      value={personalInfo.religion || ""}
                      onChange={(e) => {
                        updatePersonalInfo({ religion: e.target.value });
                        clearError("religion");
                      }}
                    >
                      <option value="">Select Religion</option>
                      {RELIGIONS.map((rel) => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                    {errors.religion && <p className="text-[11px] text-rose-500">{errors.religion}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Hobby / Interests <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="hobby"
                      placeholder="e.g. Reading, Music, Cooking, Gardening"
                      value={personalInfo.hobby || ""}
                      onChange={(e) => {
                        updatePersonalInfo({ hobby: e.target.value });
                        clearError("hobby");
                      }}
                      className={errors.hobby ? "border-rose-500" : ""}
                    />
                    {errors.hobby && <p className="text-[11px] text-rose-500">{errors.hobby}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Height (Feet) <span className="text-rose-500">*</span></label>
                    <select
                      data-field="height"
                      className={selectFieldClass(Boolean(errors.height))}
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
                      className={selectFieldClass(Boolean(errors.weight))}
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
                    <label className="text-xs font-semibold text-slate-700">Complexion / Skin Colour <span className="text-rose-500">*</span></label>
                    <select
                      data-field="complexion"
                      className={selectFieldClass(Boolean(errors.complexion))}
                      value={personalInfo.complexion || ""}
                      onChange={(e) => {
                        updatePersonalInfo({ complexion: e.target.value });
                        clearError("complexion");
                      }}
                    >
                      <option value="">Select Complexion</option>
                      {COMPLEXIONS.map((comp) => (
                        <option key={comp} value={comp}>{comp}</option>
                      ))}
                    </select>
                    {errors.complexion && <p className="text-[11px] text-rose-500">{errors.complexion}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Hair Color <span className="text-rose-500">*</span></label>
                    <select
                      data-field="hairColor"
                      className={selectFieldClass(Boolean(errors.hairColor))}
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
                      className={selectFieldClass(Boolean(errors.eyeColor))}
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
              </div>

              {/* ────── 2. MARITAL, HUSBAND & CHILDREN INFORMATION ────── */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Users className="w-4 h-4 text-[#285b63]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    2. Marital, Husband & Children Information
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Marital Status <span className="text-rose-500">*</span></label>
                    <select
                      data-field="maritalStatus"
                      className={selectFieldClass(Boolean(errors.maritalStatus))}
                      value={personalInfo.maritalStatus}
                      onChange={(e) => {
                        updatePersonalInfo({ maritalStatus: e.target.value as any });
                        clearError("maritalStatus");
                      }}
                    >
                      <option value="">Select Marital Status</option>
                      {EGG_MARITAL_STATUSES.map((ms) => (
                        <option key={ms} value={ms}>{ms}</option>
                      ))}
                    </select>
                    {errors.maritalStatus && <p className="text-[11px] text-rose-500">{errors.maritalStatus}</p>}
                  </div>

                  {/* Husband fields (Mandatory if Married) */}
                  {personalInfo.maritalStatus === "Married" && (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Husband&apos;s Full Name <span className="text-rose-500">*</span></label>
                        <Input
                          data-field="husbandName"
                          placeholder="Husband's Legal Name"
                          value={personalInfo.husbandName || personalInfo.spouseName || ""}
                          onChange={(e) => {
                            updatePersonalInfo({ husbandName: e.target.value, spouseName: e.target.value });
                            clearError("husbandName");
                          }}
                          className={errors.husbandName ? "border-rose-500" : ""}
                        />
                        {errors.husbandName && <p className="text-[11px] text-rose-500">{errors.husbandName}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Husband&apos;s Education / Qualification <span className="text-rose-500">*</span></label>
                        <Input
                          data-field="husbandEducation"
                          placeholder="e.g. Graduate, 12th Pass, Post-Graduate"
                          value={personalInfo.husbandEducation || personalInfo.spouseEducation || ""}
                          onChange={(e) => {
                            updatePersonalInfo({ husbandEducation: e.target.value, spouseEducation: e.target.value });
                            clearError("husbandEducation");
                          }}
                          className={errors.husbandEducation ? "border-rose-500" : ""}
                        />
                        {errors.husbandEducation && <p className="text-[11px] text-rose-500">{errors.husbandEducation}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Husband&apos;s Occupation <span className="text-rose-500">*</span></label>
                        <Input
                          data-field="husbandOccupation"
                          placeholder="e.g. Business, Engineer, Farmer"
                          value={personalInfo.husbandOccupation || personalInfo.spouseOccupation || ""}
                          onChange={(e) => {
                            updatePersonalInfo({ husbandOccupation: e.target.value, spouseOccupation: e.target.value });
                            clearError("husbandOccupation");
                          }}
                          className={errors.husbandOccupation ? "border-rose-500" : ""}
                        />
                        {errors.husbandOccupation && <p className="text-[11px] text-rose-500">{errors.husbandOccupation}</p>}
                      </div>
                    </>
                  )}

                  {/* Children / Living Child Details */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Number of Deliveries / Living Children <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="numberOfDeliveries"
                      type="number"
                      min={1}
                      placeholder="Must be at least 1 (e.g. 1, 2)"
                      value={donorInfo.numberOfDeliveries || "1"}
                      onChange={(e) => {
                        updateDonorInfo({ numberOfDeliveries: e.target.value });
                        clearError("numberOfDeliveries");
                      }}
                      className={errors.numberOfDeliveries ? "border-rose-500" : ""}
                    />
                    {errors.numberOfDeliveries ? (
                      <p className="text-[11px] text-rose-500">{errors.numberOfDeliveries}</p>
                    ) : (
                      <p className="text-[10px] text-slate-400">Under ART Act 2021, donor must have at least 1 living child (age ≥ 3 years)</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Number of Abortions <span className="text-slate-400 font-normal">(if any)</span></label>
                    <Input
                      data-field="numberOfAbortions"
                      placeholder="e.g. No, 1, 2"
                      value={donorInfo.numberOfAbortions || "No"}
                      onChange={(e) => updateDonorInfo({ numberOfAbortions: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* ────── 3. CONTACT & RESIDENTIAL ADDRESSES ────── */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Phone className="w-4 h-4 text-[#285b63]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    3. Contact & Residential Addresses
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Mobile Number (Verified) <span className="text-rose-500">*</span></label>
                    <Input
                      value={contactInfo.mobileNumber || phoneInput}
                      disabled
                      className="bg-slate-50 font-mono text-slate-600 cursor-not-allowed text-xs h-9"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Alternate Mobile <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <Input
                      data-field="alternateMobile"
                      placeholder="10-digit alternate mobile number"
                      maxLength={10}
                      value={contactInfo.alternateMobile || ""}
                      onChange={(e) => updateContactInfo({ alternateMobile: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
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
                      className="bg-slate-50 font-mono text-slate-700 cursor-not-allowed text-xs h-10 border-emerald-300"
                    />
                  </div>

                  {/* Residential Address (as per Aadhaar Card) */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Residential Address (as per Aadhaar Card) <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="permanentAddress"
                      placeholder="Full permanent / residential address as printed on your Aadhaar card"
                      value={contactInfo.permanentAddress || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (sameAsResidential) {
                          updateContactInfo({ permanentAddress: val, currentAddress: val });
                        } else {
                          updateContactInfo({ permanentAddress: val });
                        }
                        clearError("permanentAddress");
                      }}
                      className={errors.permanentAddress ? "border-rose-500" : ""}
                    />
                    {errors.permanentAddress && <p className="text-[11px] text-rose-500">{errors.permanentAddress}</p>}
                  </div>

                  {/* Checkbox: Same as Residential */}
                  <div className="md:col-span-2 flex items-center gap-2 py-0.5">
                    <input
                      type="checkbox"
                      id="sameAsResidential"
                      checked={sameAsResidential}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSameAsResidential(checked);
                        if (checked) {
                          updateContactInfo({ currentAddress: contactInfo.permanentAddress || "" });
                          clearError("currentAddress");
                        }
                      }}
                      className="accent-[#285b63] rounded w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="sameAsResidential" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                      Current address is same as Residential Address (as per Aadhaar Card)
                    </label>
                  </div>

                  {/* Current Address */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Current Address <span className="text-rose-500">*</span></label>
                    <Input
                      data-field="currentAddress"
                      placeholder="Current residence / Flat / House No, Street, Landmark"
                      value={contactInfo.currentAddress || ""}
                      disabled={sameAsResidential}
                      onChange={(e) => {
                        updateContactInfo({ currentAddress: e.target.value });
                        clearError("currentAddress");
                      }}
                      className={`${errors.currentAddress ? "border-rose-500" : ""} ${sameAsResidential ? "bg-slate-50 text-slate-500 cursor-not-allowed" : ""}`}
                    />
                    {errors.currentAddress && <p className="text-[11px] text-rose-500">{errors.currentAddress}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">State <span className="text-rose-500">*</span></label>
                    <select
                      data-field="state"
                      className={selectFieldClass(Boolean(errors.state))}
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
                    placeholder="Name of relative / husband"
                    value={emergencyContact.contactPersonName || ""}
                    onChange={(e) => updateEmergencyContact({ contactPersonName: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Relationship <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <Input
                    placeholder="e.g. Husband, Mother, Brother"
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
                    className={selectFieldClass(false)}
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

          {/* ────── STEP 2: OBSTETRIC & CLINICAL ELIGIBILITY ────── */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              {/* <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                <HeartPulse className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-900">
                  <p className="font-bold">Mandatory Statutory Obstetric Rule (ART Act 2021 Section 27):</p>
                  <p className="mt-0.5">An egg donor must have at least one living child of her own (minimum 3 years of age), and cannot donate eggs more than once in her lifetime.</p>
                </div>
              </div> */}

              {/* 1. Obstetric History */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <ClipboardList className="w-4 h-4 text-[#285b63]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    1. Obstetric History
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Number of deliveries <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      data-field="numberOfDeliveries"
                      type="number"
                      min={1}
                      placeholder="Must be at least 1 (e.g. 1, 2, 3)"
                      value={donorInfo.numberOfDeliveries || "1"}
                      onChange={(e) => {
                        updateDonorInfo({ numberOfDeliveries: e.target.value });
                        clearError("numberOfDeliveries");
                      }}
                      className={errors.numberOfDeliveries ? "border-rose-500" : ""}
                    />
                    {errors.numberOfDeliveries && (
                      <p className="text-[11px] text-rose-500">{errors.numberOfDeliveries}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Number of abortions
                    </label>
                    <Input
                      data-field="numberOfAbortions"
                      placeholder="e.g. No, 0, or count"
                      value={donorInfo.numberOfAbortions ?? "No"}
                      onChange={(e) => {
                        updateDonorInfo({ numberOfAbortions: e.target.value });
                        clearError("numberOfAbortions");
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Other points of note
                    </label>
                    <Input
                      data-field="otherPointsOfNote"
                      placeholder="e.g. No, Full-term vaginal delivery"
                      value={donorInfo.otherPointsOfNote ?? "No"}
                      onChange={(e) => {
                        updateDonorInfo({ otherPointsOfNote: e.target.value });
                        clearError("otherPointsOfNote");
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Medical & Clinical History */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <HeartPulse className="w-4 h-4 text-[#285b63]" />
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    2. Medical & Clinical History
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Menstrual history
                    </label>
                    <select
                      data-field="menstrualCycleDetails"
                      className={selectFieldClass(false)}
                      value={donorInfo.menstrualCycleDetails || "Regular"}
                      onChange={(e) => {
                        updateDonorInfo({ menstrualCycleDetails: e.target.value });
                        clearError("menstrualCycleDetails");
                      }}
                    >
                      <option value="Regular">Regular</option>
                      <option value="Irregular">Irregular</option>
                      <option value="Regular (28-30 days cycle)">Regular (28-30 days cycle)</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      History of use of contraceptives
                    </label>
                    <select
                      data-field="contraceptiveHistory"
                      className={selectFieldClass(false)}
                      value={donorInfo.contraceptiveHistory || "No"}
                      onChange={(e) => {
                        updateDonorInfo({ contraceptiveHistory: e.target.value });
                        clearError("contraceptiveHistory");
                      }}
                    >
                      <option value="No">No</option>
                      <option value="Yes (OCP / Barrier)">Yes (OCP / Barrier)</option>
                      <option value="Yes (IUD / Copper-T)">Yes (IUD / Copper-T)</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Medical history
                    </label>
                    <Input
                      data-field="medicalHistory"
                      placeholder="e.g. No (or enter medical conditions)"
                      value={medicalInfo.medicalHistory ?? "No"}
                      onChange={(e) => {
                        updateMedicalInfo({ medicalHistory: e.target.value });
                        clearError("medicalHistory");
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Family history from the medical point of view
                    </label>
                    <Input
                      data-field="familyMedicalHistory"
                      placeholder="e.g. No (or enter hereditary conditions)"
                      value={medicalInfo.familyMedicalHistory ?? "No"}
                      onChange={(e) => {
                        updateMedicalInfo({ familyMedicalHistory: e.target.value });
                        clearError("familyMedicalHistory");
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      History of any abnormality in a child of the donor
                    </label>
                    <select
                      data-field="childAbnormalityHistory"
                      className={selectFieldClass(false)}
                      value={medicalInfo.childAbnormalityHistory || medicalInfo.geneticDisorders || "No"}
                      onChange={(e) => {
                        updateMedicalInfo({
                          childAbnormalityHistory: e.target.value,
                          geneticDisorders: e.target.value,
                        });
                        clearError("childAbnormalityHistory");
                      }}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      History of blood transfusion
                    </label>
                    <select
                      data-field="bloodTransfusionHistory"
                      className={selectFieldClass(false)}
                      value={donorInfo.bloodTransfusionHistory || "No"}
                      onChange={(e) => {
                        updateDonorInfo({ bloodTransfusionHistory: e.target.value });
                        clearError("bloodTransfusionHistory");
                      }}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">
                      History of substance abuse
                    </label>
                    <select
                      data-field="substanceAbuseHistory"
                      className={selectFieldClass(false)}
                      value={donorInfo.substanceAbuseHistory || "No"}
                      onChange={(e) => {
                        updateDonorInfo({ substanceAbuseHistory: e.target.value });
                        clearError("substanceAbuseHistory");
                      }}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Age of Youngest Living Child (Years)
                    </label>
                    <Input
                      placeholder="e.g. 4 years (must be at least 3 years)"
                      value={donorInfo.pregnancyHistory || ""}
                      onChange={(e) => updateDonorInfo({ pregnancyHistory: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Have you ever donated eggs before? <span className="text-rose-500">*</span>
                    </label>
                    <select
                      className={selectFieldClass(Boolean(errors.previousEggDonation))}
                      value={donorInfo.previousEggDonation || "No"}
                      onChange={(e) => updateDonorInfo({ previousEggDonation: e.target.value as "Yes" | "No" })}
                    >
                      <option value="No">No (Never donated eggs before)</option>
                      <option value="Yes">Yes (Have donated eggs previously)</option>
                    </select>
                    {errors.previousEggDonation && <p className="text-[11px] text-rose-500">{errors.previousEggDonation}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Diabetes</label>
                    <select
                      className={selectFieldClass(false)}
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
                      className={selectFieldClass(false)}
                      value={medicalInfo.hypertension || "No"}
                      onChange={(e) => updateMedicalInfo({ hypertension: e.target.value })}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ────── STEP 3: IDENTITY DOCUMENTS ────── */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <p className="font-bold">Identity & Husband Consent Uploads</p>
                  <p className="mt-0.5">Please upload clear photos of your identity proof, digital signature, and optional husband consent documentation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EGG_DOCUMENTS.map((doc) => (
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

          {/* ────── STEP 4: REVIEW DETAILS & UPLOADED DOCUMENTS ────── */}
          {currentStep === 4 && (
            <EggRegistrationDetailsReview
              registrationId={registrationId}
              personalInfo={personalInfo}
              contactInfo={contactInfo}
              donorInfo={donorInfo}
              medicalInfo={medicalInfo}
              emergencyContact={emergencyContact}
              referral={referral}
              documents={documents}
              onEditStep={(step) => {
                goToStep(step);
              }}
            />
          )}

          {/* ────── STEP 5: STATUTORY REVIEW & LEGAL CONSENT ────── */}
          {currentStep === 5 && (
            <EggRegistrationReview
              registrationId={registrationId}
              personalInfo={personalInfo}
              contactInfo={contactInfo}
              donorInfo={donorInfo}
              medicalInfo={medicalInfo}
              documents={documents}
              consent={consent}
              errors={errors}
              updateConsent={updateConsent}
              onEditStep={(step) => {
                goToStep(step);
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

            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraftManual}
                disabled={isSavingManual}
                className="text-xs font-bold gap-1.5 border-teal-600/40 text-teal-800 hover:bg-teal-50 px-4 h-9 rounded-xl shadow-2xs"
                title="Save current details to draft without advancing to next step"
              >
                {isSavingManual ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#285b63]" />
                ) : (
                  <Save className="w-3.5 h-3.5 text-[#285b63]" />
                )}
                Save as Draft
              </Button>

              {currentStep < 5 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={isSaving}
                  className="bg-[#285b63] hover:bg-[#1d464d] text-white text-xs font-bold gap-1.5 px-6 h-9 rounded-xl shadow-xs"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold gap-1.5 px-8 h-10 shadow-md rounded-xl"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                  Submit Egg Donor Registration
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ────── CUSTOM MEDIYAZ BRANDED EXIT CONFIRMATION MODAL ────── */}
      <AnimatePresence>
        {isExitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with Mediyaz Slate Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => !isExiting && setIsExitModalOpen(false)}
              className="fixed inset-0 bg-[#1d3840]/65 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#285b63]/15 overflow-hidden z-10 my-auto"
            >
              {/* Mediyaz Brand Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1d3840] via-[#285b63] to-[#3d7984]" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => !isExiting && setIsExitModalOpen(false)}
                disabled={isExiting}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-7 space-y-5">
                {/* Header Icon & Title */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#edf3f1] text-[#285b63] border border-[#285b63]/20 shrink-0">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 leading-tight">
                      Exit Registration Session?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Your entered information is safe with Mediyaz
                    </p>
                  </div>
                </div>

                {/* Draft Information Card */}
                {registrationId && (
                  <div className="bg-[#edf3f1]/70 border border-[#285b63]/20 rounded-2xl p-3.5 text-xs text-slate-700 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Active Draft
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#285b63] text-white">
                        Step {currentStep} of 5
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#285b63]/15 font-mono text-xs font-semibold text-[#1d3840]">
                      <span>{registrationId}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(registrationId);
                          toast.success("Draft ID copied to clipboard!");
                        }}
                        className="p-1 hover:text-[#285b63] text-slate-400 transition-colors"
                        title="Copy Registration ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(phoneInput || aadhaarInput) && (
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600">
                        {phoneInput && (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#285b63]" /> +91 {phoneInput}
                          </span>
                        )}
                        {aadhaarInput && (
                          <span className="inline-flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-[#285b63]" /> XXXX-{aadhaarInput.slice(-4)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Reassurance Notice Banner */}
                <div className="rounded-2xl bg-emerald-50/90 border border-emerald-200/90 p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 leading-relaxed">
                    <p className="font-semibold text-emerald-900">
                      All your data is preserved in your draft.
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      You can resume anytime from any device using your Registration ID, Mobile Number, or Aadhaar.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsExitModalOpen(false)}
                    disabled={isExiting}
                    className="h-10 px-4 text-xs font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Stay on Form
                  </Button>

                  <Button
                    type="button"
                    onClick={handleConfirmExit}
                    disabled={isExiting}
                    className="h-10 px-5 text-xs font-bold rounded-xl bg-[#285b63] hover:bg-[#1d3840] text-white shadow-md transition-all gap-2"
                  >
                    {isExiting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving & Exiting...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Save Draft & Exit</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
