"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";

const Footer = () => {
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenMobileSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#1d3840] text-white"
    >
      {/* Subtle background ambient light */}
      <div 
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" 
        aria-hidden="true" 
      />

      {/* ================= DESKTOP FOOTER ================= */}
      <div className="container mx-auto hidden max-w-[1400px] px-6 py-16 lg:block">
        
        {/* TOP BRAND & AUTHORITY ROW */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr_220px] pb-12 border-b border-white/10 items-start">
          
          {/* Col 1: Brand Logo + Registered Badge + Direct Contacts */}
          <div>
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/img/logo.webp"
                alt="Mediyaz ART Bank Logo"
                width={240}
                height={75}
                className="h-14 sm:h-16 w-auto object-contain brightness-0 invert transition-opacity group-hover:opacity-90"
              />
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-[#95e0b9] border border-white/15 mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#95e0b9]" />
              <span>ART Act 2021 Registered Bank</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <a
                href="tel:+919667780807"
                className="flex items-center gap-2.5 text-white hover:text-[#95e0b9] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff7468]/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#ff7468]" />
                </div>
                <span className="font-mono font-medium tracking-wide">+91 96677 80807</span>
              </a>

              <Link
                href="/contacts"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-teal-300" />
                </div>
                <span>Direct Clinical Liaison Desk</span>
              </Link>

              <div className="flex items-center gap-2.5 text-slate-400 text-[11px] pt-0.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Mon–Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Col 2: Regulatory SEO Text (Trust tags removed per request) */}
          <div className="max-w-[720px] lg:px-4">
            <h3 className="font-serif text-lg font-medium text-white mb-3 tracking-wide">
              Mediyaz ART Bank | Registered ART Bank under ART Act, 2021
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) Bank in India operating in strict accordance with the Assisted Reproductive Technology (Regulation) Act, 2021 and ART Rules. We facilitate ethical donor gamete screening, semen cryopreservation, oocyte vitrification, and quarantine storage, supplying exclusively to registered ART Clinics upon official medical requisition.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              In full compliance with Indian statutory mandates, all gamete donations are strictly voluntary, altruistic, and anonymous. We ensure comprehensive infectious disease screening, Thalassemia &amp; genetic carrier testing, semen quarantine, and statutory health insurance coverage for oocyte donors.
            </p>
          </div>

          {/* Col 3: Right Side - Only Social & Contact Us Button per user request */}
          <div className="flex flex-col items-start lg:items-end justify-between h-full space-y-6">
            <div>
              <div className="text-[11px] font-semibold text-slate-300 lg:text-right mb-3">
                Official Channels
              </div>
              <ul className="flex items-center gap-2.5">
                <li>
                  <a
                    aria-label="X (Twitter)"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs text-white/80 transition hover:border-white hover:bg-white/15 hover:text-white"
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    𝕏
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs text-white/80 transition hover:border-white hover:bg-white/15 hover:text-white"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ◎
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs text-white/80 transition hover:border-white hover:bg-white/15 hover:text-white"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    f
                  </a>
                </li>
                <li>
                  <a
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs text-white/80 transition hover:border-white hover:bg-white/15 hover:text-white"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    in
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50] shadow-sm hover:shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* ================= 6-COLUMN NAVIGATION LINKS (ORIGINAL STRUCTURE) ================= */}
        <ul
          aria-label="Footer Navigation"
          id="footer-menu"
          className="pt-10 pb-8 grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {/* Column 1: Aspiring Parents */}
          <li>
            <Link
              href="/aspiring-parents"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              Aspiring Parents
            </Link>

            <ul className="submenu space-y-2.5">
              <li>
                <Link
                  href="/aspiring-parents"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  For Aspiring Parents
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/donors"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Our Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/assurance-programs"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Assurance Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/financing"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Financing
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/faqs"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/genetic-screening"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Genetic Screening
                </Link>
              </li>
              <li>
                <Link
                  href="/donor-request"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Request a Donor
                </Link>
              </li>
            </ul>
          </li>

          {/* Column 2: Donors */}
          <li>
            <Link
              href="/for-donors"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              Donors
            </Link>

            <ul className="submenu space-y-2.5">
              <li>
                <Link
                  href="/for-donors"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Donor Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/become-an-egg-donor"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Become an Egg Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/become-a-sperm-donor"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Become a Sperm Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/how-to-donate-eggs"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  How to Donate Eggs
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/donor-compensation"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Insurance &amp; Reimbursement
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/faqs"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Donor FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Donor Pre-Screening
                </Link>
              </li>
            </ul>
          </li>

          {/* Column 3: Clinics */}
          <li>
            <Link
              href="/clinics"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              Clinics
            </Link>

            <ul className="submenu space-y-2.5">
              <li>
                <Link
                  href="/clinics"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  For Clinics
                </Link>
              </li>
              <li>
                <Link
                  href="/clinics/become-partners"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/refer-partner"
                  className="text-[13px] text-white/75 hover:text-teal-300 font-medium transition-colors"
                >
                  Refer Partner Program
                </Link>
              </li>
              <li>
                <Link
                  href="/refer-partner/dashboard"
                  className="text-[13px] text-white/75 hover:text-emerald-300 font-medium transition-colors"
                >
                  Partner Portal (Dashboard)
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Request Materials
                </Link>
              </li>
            </ul>
          </li>

          {/* Column 4: About Us */}
          <li>
            <Link
              href="/about"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              About Us
            </Link>

            <ul className="submenu space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  About Mediyaz ART Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-[13px] text-white/75 hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </li>

          {/* Column 5: Contact Us */}
          <li>
            <Link
              href="/contacts"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              Contact Us
            </Link>
          </li>

          {/* Column 6: Blog */}
          <li>
            <Link
              href="/blogs"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468] transition-colors"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* ================= OVERSIZED EDITORIAL BRAND WORDMARK ================= */}
        <div className="relative my-8 select-none overflow-hidden border-y border-white/10 py-6 sm:py-8 text-center pointer-events-none">
          <span className="block font-sans font-black tracking-tighter text-[9.5vw] xl:text-[130px] leading-none text-white/[0.07] select-none whitespace-nowrap">
            Mediyaz ART Bank
          </span>
        </div>

        {/* ================= BOTTOM LEGAL & COPYRIGHT ROW ================= */}
        <div className="flex flex-col gap-4 pt-2 text-[12px] text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            <span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>{" "}
              |{" "}
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/compliance" className="hover:text-white transition-colors">
                ART Act Compliance
              </Link>
            </span>
          </p>

          <Link
            className="all-languages-button hover:text-white transition-colors"
            href="/contacts"
          >
            Translate
          </Link>
        </div>

        <p className="mt-4 text-[12px] text-white/60">
          © 2026 Mediyaz ART Bank. All rights reserved.
        </p>
      </div>

      {/* ================= MOBILE FOOTER ================= */}
      <div className="container mobile mx-auto block px-5 py-12 lg:hidden">
        {/* Mobile Top Brand & Contact Info */}
        <div className="mb-6">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/img/logo.webp"
              alt="Mediyaz ART Bank Logo"
              width={200}
              height={60}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-[#95e0b9] border border-white/15 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#95e0b9]" />
            <span>ART Act 2021 Registered Bank</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <a
              href="tel:+919667780807"
              className="flex items-center gap-2.5 text-white hover:text-[#95e0b9] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-[#ff7468]" />
              </div>
              <span className="font-mono font-medium">+91 96677 80807</span>
            </a>

            <Link
              href="/contacts"
              className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-teal-300" />
              </div>
              <span>Direct Clinical Liaison Desk</span>
            </Link>

            <div className="flex items-center gap-2.5 text-slate-400 text-[11px] pt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Mon–Sat: 9:00 AM – 7:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Mobile Action & Social Channels */}
        <div className="flex items-center justify-between gap-4 py-4 mb-6 border-y border-white/10">
          <ul className="social-media flex items-center gap-2.5">
            <li>
              <a
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xs"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                𝕏
              </a>
            </li>
            <li>
              <a
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xs"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ◎
              </a>
            </li>
            <li>
              <a
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xs"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>
            </li>
          </ul>

          <Link
            href="/contacts"
            className="rounded-xl bg-[#ff7468] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Navigation Accordions */}
        <ul
          aria-label="Footer Navigation"
          id="footer-menu-mobile"
          className="border-t border-white/15"
        >
          {/* Aspiring Parents */}
          <li className="border-b border-white/15">
            <button
              type="button"
              onClick={() => toggleSection("parents")}
              className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold"
            >
              Aspiring Parents
              <span className="text-xl font-light">
                {openMobileSection === "parents" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "parents" && (
              <ul className="submenu space-y-2.5 pb-4 pl-3">
                <li>
                  <Link href="/aspiring-parents" className="text-sm text-white/75 hover:text-white">
                    For Aspiring Parents
                  </Link>
                </li>
                <li>
                  <Link href="/aspiring-parents/donors" className="text-sm text-white/75 hover:text-white">
                    Our Donors
                  </Link>
                </li>
                <li>
                  <Link href="/aspiring-parents/assurance-programs" className="text-sm text-white/75 hover:text-white">
                    Assurance Programs
                  </Link>
                </li>
                <li>
                  <Link href="/aspiring-parents/financing" className="text-sm text-white/75 hover:text-white">
                    Financing
                  </Link>
                </li>
                <li>
                  <Link href="/aspiring-parents/faqs" className="text-sm text-white/75 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/aspiring-parents/genetic-screening" className="text-sm text-white/75 hover:text-white">
                    Genetic Screening
                  </Link>
                </li>
                <li>
                  <Link href="/donor-request" className="text-sm text-white/75 hover:text-white">
                    Request a Donor
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Donors */}
          <li className="border-b border-white/15">
            <button
              type="button"
              onClick={() => toggleSection("donors")}
              className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold"
            >
              Donors
              <span className="text-xl font-light">
                {openMobileSection === "donors" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "donors" && (
              <ul className="submenu space-y-2.5 pb-4 pl-3">
                <li>
                  <Link href="/for-donors" className="text-sm text-white/75 hover:text-white">
                    Donor Overview
                  </Link>
                </li>
                <li>
                  <Link href="/for-donors/become-an-egg-donor" className="text-sm text-white/75 hover:text-white">
                    Become an Egg Donor
                  </Link>
                </li>
                <li>
                  <Link href="/for-donors/become-a-sperm-donor" className="text-sm text-white/75 hover:text-white">
                    Become a Sperm Donor
                  </Link>
                </li>
                <li>
                  <Link href="/for-donors/how-to-donate-eggs" className="text-sm text-white/75 hover:text-white">
                    How to Donate Eggs
                  </Link>
                </li>
                <li>
                  <Link href="/for-donors/donor-compensation" className="text-sm text-white/75 hover:text-white">
                    Insurance &amp; Reimbursement
                  </Link>
                </li>
                <li>
                  <Link href="/for-donors/faqs" className="text-sm text-white/75 hover:text-white">
                    Donor FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/inquiry" className="text-sm text-white/75 hover:text-white">
                    Donor Pre-Screening
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Clinics */}
          <li className="border-b border-white/15">
            <button
              type="button"
              onClick={() => toggleSection("clinics")}
              className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold"
            >
              Clinics
              <span className="text-xl font-light">
                {openMobileSection === "clinics" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "clinics" && (
              <ul className="submenu space-y-2.5 pb-4 pl-3">
                <li>
                  <Link href="/clinics" className="text-sm text-white/75 hover:text-white">
                    For Clinics
                  </Link>
                </li>
                <li>
                  <Link href="/clinics/become-partners" className="text-sm text-white/75 hover:text-white">
                    Become a Partner
                  </Link>
                </li>
                <li>
                  <Link href="/refer-partner" className="text-sm text-teal-300 font-medium">
                    Refer Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="/refer-partner/dashboard" className="text-sm text-emerald-300 font-medium">
                    Partner Portal (Dashboard)
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-sm text-white/75 hover:text-white">
                    Request Materials
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* About Us */}
          <li className="border-b border-white/15">
            <button
              type="button"
              onClick={() => toggleSection("about")}
              className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold"
            >
              About Us
              <span className="text-xl font-light">
                {openMobileSection === "about" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "about" && (
              <ul className="submenu space-y-2.5 pb-4 pl-3">
                <li>
                  <Link href="/about" className="text-sm text-white/75 hover:text-white">
                    About Mediyaz ART Bank
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-sm text-white/75 hover:text-white">
                    Testimonials
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="border-b border-white/15 py-4">
            <Link href="/contacts" className="text-[15px] font-semibold block">
              Contact Us
            </Link>
          </li>

          <li className="border-b border-white/15 py-4">
            <Link href="/blogs" className="text-[15px] font-semibold block">
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile SEO Text */}
        <div className="seo-text mt-8">
          <h3 className="mb-3 text-[16px] font-semibold leading-7">
            Mediyaz ART Bank | Registered ART Bank under ART Act, 2021
          </h3>

          <p className="text-[13px] leading-6 text-white/80">
            Operating in accordance with India&apos;s Assisted Reproductive Technology (Regulation) Act, 2021, Mediyaz ART Bank provides ethically screened, quarantined donor gametes to registered fertility clinics with strict anonymity, donor welfare, and comprehensive medical safety.
          </p>
        </div>

        {/* Mobile Oversized Brand Wordmark */}
        <div className="relative my-8 select-none overflow-hidden border-y border-white/10 py-5 text-center pointer-events-none">
          <span className="block font-sans font-black tracking-tighter text-[10vw] leading-none text-white/[0.07] select-none whitespace-nowrap">
            Mediyaz ART Bank
          </span>
        </div>

        {/* Mobile Bottom */}
        <div className="pt-2">
          <p className="text-[11px] leading-6 text-white/70">
            <span>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>{" "}
              |{" "}
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/compliance" className="hover:text-white">
                ART Act Compliance
              </Link>
            </span>
          </p>

          <p className="mt-4 text-[11px] text-white/60">
            © 2026 Mediyaz ART Bank. All rights reserved. | Registered under ART (Regulation) Act, 2021.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
