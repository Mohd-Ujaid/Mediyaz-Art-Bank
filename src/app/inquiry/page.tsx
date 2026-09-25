"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, InquiryFormValues } from "@/features/inquiry/inquiry.schema";
import { submitInquiryAction } from "./actions";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck, User, PhoneCall, MapPin, FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      donationInterest: "sperm",
      country: "India",
      consent: false,
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setServerError(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    try {
      const result = await submitInquiryAction(formData);
      
      if (result.success) {
        setSuccess(true);
      } else {
        setServerError(result.error || "Failed to submit inquiry. Please check your information and try again.");
      }
    } catch (error) {
      setServerError("A network error occurred. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf3f1]/60 py-16 px-4 sm:px-6">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden text-center p-8 sm:p-12 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#285b63]/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#285b63]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#285b63]">
            Pre-Screening Inquiry Received
          </h2>
          <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-md mx-auto">
            Thank you for taking the first step. Our clinical coordinator will review your confidential details in accordance with the Assisted Reproductive Technology (Regulation) Act, 2021 and contact you within 1–2 business days.
          </p>

          <div className="bg-[#edf3f1] rounded-xl p-4 border border-[#285b63]/20 text-xs text-[#285b63] text-left space-y-1.5">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Next Steps:
            </p>
            <p className="text-[#555]">• Initial telephone eligibility confirmation</p>
            <p className="text-[#555]">• Complimentary preliminary health evaluation at our partner clinic</p>
            <p className="text-[#555]">• Full explanation of statutory anonymity and donor protections</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="rounded-xl bg-[#285b63] hover:bg-[#1d464d] text-white text-xs font-bold py-3 px-6 transition"
            >
              Return to Homepage
            </Link>
            <Link
              href="/for-donors"
              className="rounded-xl border border-[#285b63] text-[#285b63] hover:bg-[#edf3f1] text-xs font-bold py-3 px-6 transition"
            >
              Read Donor Guide
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf3f1]/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-[#285b63] bg-[#285b63]/10 rounded-full mb-3 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" /> ART Act 2021 Compliant
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-[#1d3840]">
            Donor Pre-Screening Inquiry
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#555] max-w-xl mx-auto leading-relaxed">
            Begin preliminary confidential screening with Mediyaz ART Bank. All inquiries are strictly protected under Indian statutory confidentiality mandates.
          </p>

          {/* Statutory Criteria Card */}
          <div className="mt-5 bg-white border border-[#285b63]/20 rounded-xl p-4 text-xs text-[#444] text-left max-w-2xl mx-auto shadow-xs">
            <p className="font-bold text-[#285b63] mb-1">Statutory Age &amp; Medical Criteria (ART Act 2021):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555]">
              <div>• <strong>Sperm Donors:</strong> Healthy males aged 21–55 years.</div>
              <div>• <strong>Egg Donors:</strong> Ever-married females aged 23–35 with a living child (min 3 yrs).</div>
            </div>
          </div>
        </div>

        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <form className="p-6 sm:p-10 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            
            {/* SECTION 1: Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <User className="w-4 h-4 text-[#285b63]" />
                <h2 className="text-base font-bold text-[#285b63]">
                  1. Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name as per Aadhaar"
                    {...register("fullName")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.fullName ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("gender")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.gender ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.dateOfBirth ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth.message}</p>}
                </div>
              </div>
            </div>

            {/* SECTION 2: Donation Program */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <FileCheck2 className="w-4 h-4 text-[#285b63]" />
                <h2 className="text-base font-bold text-[#285b63]">
                  2. Donation Program
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#285b63] mb-1">
                  Program of Interest <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("donationInterest")}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                >
                  <option value="sperm">Sperm Donor Program (Male, Age 21–55)</option>
                  <option value="egg">Egg Donor Program (Ever-Married Female, Age 23–35 with Living Child)</option>
                </select>
                {errors.donationInterest && <p className="mt-1 text-xs text-red-600">{errors.donationInterest.message}</p>}
                <p className="mt-1.5 text-xs text-[#666]">
                  Under Indian law, donations are voluntary, confidential, and medically supervised.
                </p>
              </div>
            </div>

            {/* SECTION 3: Contact & Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <PhoneCall className="w-4 h-4 text-[#285b63]" />
                <h2 className="text-base font-bold text-[#285b63]">
                  3. Contact &amp; Location
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Mobile Number (India) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      {...register("mobileNumber")}
                      className={`h-11 w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-[#333] outline-none transition ${
                        errors.mobileNumber ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && <p className="mt-1 text-xs text-red-600">{errors.mobileNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    {...register("emailAddress")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.emailAddress ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.emailAddress && <p className="mt-1 text-xs text-red-600">{errors.emailAddress.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Preferred Contact Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Morning, 10:00 AM – 1:00 PM"
                    {...register("preferredContactTime")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.preferredContactTime ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.preferredContactTime && <p className="mt-1 text-xs text-red-600">{errors.preferredContactTime.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi"
                    {...register("city")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.city ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR"
                    {...register("state")}
                    className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition ${
                      errors.state ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                    }`}
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#285b63] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="India"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Notes & Statutory Consent */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#285b63]" />
                <h2 className="text-base font-bold text-[#285b63]">
                  4. Additional Notes &amp; Statutory Declaration
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#285b63] mb-1">
                  Questions or Medical Notes <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={3}
                  placeholder="Share any questions regarding eligibility, medical testing, or scheduling..."
                  className="w-full rounded-xl border border-gray-300 bg-white p-3.5 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
              </div>

              {/* Statutory Consent Box */}
              <div className="rounded-xl bg-[#edf3f1]/60 border border-[#285b63]/20 p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register("consent")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#285b63] focus:ring-[#285b63]"
                  />
                  <label htmlFor="consent" className="text-xs text-[#444] leading-relaxed cursor-pointer select-none">
                    <strong className="text-[#285b63]">Statutory Declaration:</strong> I confirm that I meet the preliminary eligibility criteria under the Assisted Reproductive Technology (Regulation) Act, 2021. I understand that gamete donation is voluntary, altruistic, and strictly anonymous. I consent to confidential contact by Mediyaz ART Bank clinical coordinators. <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="mt-2 text-xs text-red-600 pl-7 font-medium">
                    {errors.consent.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff7468] hover:bg-[#ff5d50] active:scale-[0.99] text-white py-3.5 px-6 text-sm font-bold shadow-xs transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Submitting Pre-Screening...
                  </>
                ) : (
                  <>
                    Submit Confidential Pre-Screening
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-gray-500">
                🔒 Your privacy is protected under Indian statutory confidentiality mandates (Sections 27 &amp; 28, ART Act 2021).
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
