"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { submitClinicPartnershipAction } from "./actions";
import { Loader2 } from "lucide-react";

const benefits = [
  {
    title: "Registered ART Clinic Supply (Section 21)",
    text: "Seamlessly requisition cryopreserved donor sperm and oocytes upon written clinical requisition by a registered medical practitioner, in full compliance with the ART Act 2021.",
  },
  {
    title: "NABL-Accredited Diagnostic Reports",
    text: "Access complete non-identifying donor profiles including Hb HPLC Thalassemia screening, chromosomal karyotypes (46,XX / 46,XY), G6PD assays, and dual serology.",
  },
  {
    title: "Dedicated Embryology & Clinic Liaisons",
    text: "Our clinical coordination team works directly with your IVF lab directors to manage requisition paperwork, National Registry compliance, and scheduled cryo-transit.",
  },
  {
    title: "Cold-Chain Integrity & Quality Protocol",
    text: "Certified liquid nitrogen dry vapor shippers maintaining -150°C to -196°C with continuous temperature logging and dual tamper-evident custody seals.",
  },
];

export default function BecomePartnersPage() {
  const [formData, setFormData] = useState({
    clinicName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    artRegistrationNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.clinicName.trim()) errors.clinicName = "Clinic or hospital name is required";
    if (!formData.contactName.trim()) errors.contactName = "Contact person / director name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please provide a valid clinical email address";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit contact number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await submitClinicPartnershipAction(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setServerError(res.error || "Failed to submit partnership request. Please try again.");
      }
    } catch (err: any) {
      console.error("Clinic partnership submission error:", err);
      setServerError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/about_1.png"
            alt="Clinic Partnerships - Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            ART Clinic Partnerships
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#285b63]">
              Partnering Under the Assisted Reproductive Technology Act, 2021
            </h2>

            <p className="mt-4 max-w-[850px] text-base leading-relaxed text-[#444]">
              As a registered ART Bank, Mediyaz ART Bank is dedicated to supporting registered fertility clinics, Level 1 and Level 2 ART centers, and embryology teams across India with compliant donor gamete banking, verified genetic screening, and tamper-sealed cryogenic logistics.
            </p>

            {/* Partnership Benefits Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-gray-200 bg-[#edf3f1]/40 p-6"
                >
                  <h3 className="font-serif text-lg font-bold text-[#285b63] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555]">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Partnership Application Form */}
            <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <h3 className="font-serif text-2xl font-normal text-[#285b63] mb-2">
                Register Your ART Clinic Partnership
              </h3>
              <p className="text-sm text-[#555] mb-6">
                Fill out the form below and our clinical relations team will connect with your center to verify ART Act registration details and provide formal affiliate onboarding documentation.
              </p>

              {submitted ? (
                <div className="rounded-xl bg-[#95e0b9]/30 border border-[#285b63]/30 p-6 text-center animate-fade-in">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#285b63] text-white">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#285b63]">
                    Thank You for Your Partnership Request
                  </h4>
                  <p className="mt-2 text-sm text-[#444]">
                    Your clinic inquiry has been received. Our medical directorate will contact your clinic coordinator promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {serverError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700">
                      {serverError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="clinicName"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Registered Clinic / Hospital Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="clinicName"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.clinicName}
                        aria-describedby={formErrors.clinicName ? "clinicName-error" : undefined}
                        type="text"
                        placeholder="e.g. Apex Fertility & IVF Centre"
                        value={formData.clinicName}
                        onChange={(e) => {
                          setFormData({ ...formData, clinicName: e.target.value });
                          if (formErrors.clinicName) setFormErrors({ ...formErrors, clinicName: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.clinicName ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.clinicName && <p id="clinicName-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.clinicName}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contactName"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Medical Director / Senior Embryologist <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contactName"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.contactName}
                        aria-describedby={formErrors.contactName ? "contactName-error" : undefined}
                        type="text"
                        placeholder="e.g. Dr. R. K. Sharma, Medical Director"
                        value={formData.contactName}
                        onChange={(e) => {
                          setFormData({ ...formData, contactName: e.target.value });
                          if (formErrors.contactName) setFormErrors({ ...formErrors, contactName: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.contactName ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.contactName && <p id="contactName-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.contactName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Clinical Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "clinicEmail-error" : undefined}
                        type="email"
                        placeholder="doctor@ivfclinic.in"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#333] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.email ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.email && <p id="clinicEmail-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Contact Number (India) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500" aria-hidden="true">
                          +91
                        </span>
                        <input
                          id="phone"
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? "clinicPhone-error" : undefined}
                          type="tel"
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                          }}
                          className={`h-11 w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-[#333] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                            formErrors.phone ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p id="clinicPhone-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="e.g. New Delhi"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63] focus-visible:ring-2 focus-visible:ring-[#285b63]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        State
                      </label>
                      <input
                        id="state"
                        type="text"
                        placeholder="e.g. Delhi NCR"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63] focus-visible:ring-2 focus-visible:ring-[#285b63]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="regNum"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        ART Clinic Reg. No. <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="regNum"
                        type="text"
                        placeholder="National Registry ID"
                        value={formData.artRegistrationNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, artRegistrationNumber: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63] focus-visible:ring-2 focus-visible:ring-[#285b63]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                    >
                      Requisition Inquiries / Cryo-Logistics Requirements
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Specify your clinic's donor gamete requirements, dry shipper scheduling, or compliance questions..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#333] outline-none transition focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63] focus-visible:ring-2 focus-visible:ring-[#285b63]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff7468] px-8 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242] active:scale-[0.98] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#285b63] focus-visible:outline-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      "Submit Clinic Partnership Request"
                    )}
                  </button>
                </form>
              )}
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
                    href="/clinics"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → For Clinics Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/donors"
                    className="block py-1 text-[#285d64] hover:text-[#ff7468] font-medium"
                  >
                    → Donor Screening Standards
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
                    → Cryo-Viability Protocols
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#edf3f1] p-6 text-center border border-[#285b63]/10">
              <h4 className="text-lg font-bold font-serif text-[#285b63]">
                Clinical Desk
              </h4>
              <p className="mt-2 text-xs text-[#555] leading-relaxed">
                Connect with our lab operations specialists directly.
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
}