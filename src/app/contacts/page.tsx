"use client";

import React, { useState } from "react";
import Image from "next/image";
import { submitContactAction } from "./actions";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please provide a valid email address";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number";
    }
    if (!formData.userType) errors.userType = "Please select your category";
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
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
      const res = await submitContactAction(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        if (res.fieldErrors) {
          setFormErrors(res.fieldErrors);
        }
        setServerError(res.error || "Failed to submit. Please check your information.");
      }
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setServerError("A network error occurred. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full overflow-hidden bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/home.jpg"
            alt="Contact Mediyaz ART Bank India"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white/70" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1440px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Contact Us
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* LEFT FORM SECTION */}
          <div className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#285b63]">
              Connect with Mediyaz ART Bank
            </h2>

            <p className="mt-4 max-w-[850px] text-sm sm:text-base leading-relaxed text-[#444]">
              Mediyaz ART Bank operates under the Assisted Reproductive Technology (Regulation) Act, 2021. Whether you are an intending parent seeking donor sample requisition through your registered clinic, a prospective voluntary donor checking eligibility, or an ART clinic specialist coordinating clinical delivery, our medical coordination team is here to assist you with confidentiality and precision.
            </p>

            {/* FORM CONTAINER */}
            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
              <h3 className="font-serif text-2xl font-normal text-[#285b63]">
                Send Us a Message
              </h3>
              <p className="mt-1 text-xs text-[#666]">
                All fields marked with an asterisk (*) are required.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-xl bg-[#95e0b9]/30 border border-[#285b63]/30 p-8 text-center animate-fade-in">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#285b63] text-white text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#285b63]">
                    Inquiry Sent Successfully
                  </h4>
                  <p className="mt-2 text-sm text-[#444] max-w-md mx-auto">
                    Thank you for reaching out, {formData.firstName}. A clinical coordinator will review your message and contact you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        userType: "",
                        message: "",
                      });
                    }}
                    className="mt-6 rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 w-full space-y-5">
                  {serverError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.firstName}
                        aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                        type="text"
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.firstName ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.firstName}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.lastName}
                        aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                        type="text"
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          if (formErrors.lastName) setFormErrors({ ...formErrors, lastName: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.lastName ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                        }}
                        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                          formErrors.email ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                        }`}
                      />
                      {formErrors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                      >
                        Phone Number (India) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500" aria-hidden="true">
                          +91
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          required
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? "phone-error" : undefined}
                          type="tel"
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" });
                          }}
                          className={`h-11 w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                            formErrors.phone ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="userType"
                      className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                    >
                      I am an <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrors.userType}
                      aria-describedby={formErrors.userType ? "userType-error" : undefined}
                      value={formData.userType}
                      onChange={(e) => {
                        setFormData({ ...formData, userType: e.target.value });
                        if (formErrors.userType) setFormErrors({ ...formErrors, userType: "" });
                      }}
                      className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                        formErrors.userType ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                      }`}
                    >
                      <option value="" disabled>
                        Please select your inquiry category
                      </option>
                      <option value="parent">Intending Parent / Commissioning Couple</option>
                      <option value="egg-donor">Prospective Egg (Oocyte) Donor</option>
                      <option value="sperm-donor">Prospective Sperm Donor</option>
                      <option value="clinic">Registered ART Clinic / Embryologist</option>
                      <option value="other">Regulatory / General ART Inquiry</option>
                    </select>
                    {formErrors.userType && <p id="userType-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.userType}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold text-[#285b63]"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                      rows={4}
                      placeholder="How can our clinical care team assist you today?"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: "" });
                      }}
                      className={`w-full resize-none rounded-xl border bg-white p-3.5 text-sm leading-relaxed text-[#444] outline-none transition focus-visible:ring-2 focus-visible:ring-[#285b63] ${
                        formErrors.message ? "border-red-400 bg-red-50/20" : "border-gray-300 focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                      }`}
                    />
                    {formErrors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-[#ff7468] px-8 py-3 text-xs font-bold text-white shadow-xs transition duration-200 hover:bg-[#ff5242] active:scale-[0.98] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[#285b63] focus-visible:outline-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* DIRECT PHONE SECTION */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <p className="text-sm text-[#666]">
                Prefer to speak with a clinical care coordinator directly?
              </p>
              <p className="mt-1 font-serif text-2xl sm:text-3xl text-[#285b63] font-bold">
                Call +91 9667780807
              </p>
              <p className="text-xs text-[#777] mt-1">
                Available Monday – Saturday, 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8">
            {/* Story Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-[#8ddfbd]/40 p-6 text-center">
                <h3 className="font-serif text-2xl font-normal text-[#285b63]">
                  Clinical Trust
                </h3>
              </div>

              <div className="p-6">
                <blockquote className="text-xs sm:text-sm leading-relaxed text-[#555] italic">
                  &ldquo;Reaching out to Mediyaz ART Bank gave us absolute clarity on legal parentage under Section 31 of the ART Act and donor genetic screening. Their team coordinated directly with our fertility doctor with utmost professionalism.&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-bold text-[#285b63]">
                  — Intended Parent Feedback (New Delhi)
                </p>
              </div>
            </div>

            {/* Help Card */}
            <div className="rounded-2xl bg-[#edf3f1] p-6 text-center border border-[#285b63]/10">
              <h4 className="font-serif text-xl font-normal text-[#285b63]">
                Registered ART Bank
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#555]">
                Compliant with the Assisted Reproductive Technology (Regulation) Act, 2021. Serving intended parents and registered clinics nationwide.
              </p>
              <a
                href="tel:+919667780807"
                className="mt-4 inline-block w-full rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5242]"
              >
                Call +91 9667780807
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}