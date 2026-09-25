"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
      {/* ================= DESKTOP FOOTER ================= */}
      <div className="container1 mx-auto hidden max-w-[1400px] px-6 py-16 lg:block">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr_180px]">
          {/* Logo + Contact */}
          <div>
            <span className="block">
              <div className="logo mb-8">
                <Link href="/" className="inline-block">
                  <Image
                    src="/img/logo.webp"
                    alt="Mediyaz ART Bank Logo"
                    width={240}
                    height={75}
                    className="h-14 sm:h-16 w-auto object-contain brightness-0 invert"
                  />
                </Link>
              </div>

              <p className="mb-8 text-[15px] leading-7 text-white">
                <Link
                  href="/contacts"
                  className="underline underline-offset-2 transition hover:text-[#e7c9dd]"
                >
                  Send us a message
                </Link>{" "}
                or call{" "}
                <a
                  href="tel:+919667780807"
                  className="underline underline-offset-2 transition hover:text-[#e7c9dd]"
                >
                  +91 9667780807
                </a>
              </p>

              
            </span>
          </div>

          {/* SEO Text */}
          <div className="seo-text max-w-[760px]">
            <h3 className="mb-5 text-[18px] font-semibold leading-7">
              Mediyaz ART Bank | Registered ART Bank under ART Act, 2021
            </h3>

            <p className="text-[16px] leading-7 text-white/90 mb-4">
              Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) Bank in India operating in strict accordance with the Assisted Reproductive Technology (Regulation) Act, 2021 and ART Rules. We facilitate ethical donor gamete screening, semen cryopreservation, oocyte vitrification, and quarantine storage, supplying exclusively to registered ART Clinics upon official medical requisition.
            </p>
            <p className="text-[16px] leading-7 text-white/90">
              In full compliance with Indian statutory mandates, all gamete donations are strictly voluntary, altruistic, and anonymous. We ensure comprehensive infectious disease screening, Thalassemia &amp; genetic carrier testing, semen quarantine, and statutory health insurance coverage for oocyte donors.
            </p>
          </div>

          {/* Social + Connect */}
          <div className="third-column">
            <ul className="social-media mb-10 flex items-center gap-4">
              <li>
                <a
                  aria-label="twitter"
                  className="twitter flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:bg-white/10"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm">𝕏</span>
                </a>
              </li>

              <li>
                <a
                  aria-label="instagram"
                  className="instagram flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:bg-white/10"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm">◎</span>
                </a>
              </li>

              <li>
                <a
                  aria-label="facebook"
                  className="facebook flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:bg-white/10"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm">f</span>
                </a>
              </li>
            </ul>

            <div className="rei-logo">
              <Link
                href="/contacts"
                className="inline-block rounded-xl bg-[#ff7468] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#ff5d50]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Menu */}
        <ul
          aria-label="Footer Navigation"
          id="footer-menu"
          className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-white/20 pt-10 md:grid-cols-3 lg:grid-cols-6"
        >
          {/* Aspiring Parents */}
          <li>
            <Link
              href="/aspiring-parents"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468]"
            >
              Aspiring Parents
            </Link>

            <ul className="submenu space-y-2">
              <li>
                <Link
                  href="/aspiring-parents"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  For Aspiring Parents
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/donors"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Our Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/assurance-programs"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Assurance Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/financing"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Financing
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/faqs"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/aspiring-parents/genetic-screening"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Genetic Screening
                </Link>
              </li>
              <li>
                <Link
                  href="/donor-request"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Request a Donor
                </Link>
              </li>
            </ul>
          </li>

          {/* Donors */}
          <li>
            <Link
              href="/for-donors"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468]"
            >
              Donors
            </Link>

            <ul className="submenu space-y-2">
              <li>
                <Link
                  href="/for-donors"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Donor Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/become-an-egg-donor"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Become an Egg Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/become-a-sperm-donor"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Become a Sperm Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/how-to-donate-eggs"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  How to Donate Eggs
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/donor-compensation"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Insurance &amp; Reimbursement
                </Link>
              </li>
              <li>
                <Link
                  href="/for-donors/faqs"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Donor FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Donor Pre-Screening
                </Link>
              </li>
            </ul>
          </li>

          {/* Clinics */}
          <li>
            <Link
              href="/clinics"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468]"
            >
              Clinics
            </Link>

            <ul className="submenu space-y-2">
              <li>
                <Link
                  href="/clinics"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  For Clinics
                </Link>
              </li>
              <li>
                <Link
                  href="/clinics/become-partners"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/refer-partner"
                  className="text-[13px] text-white/75 hover:text-white font-medium text-teal-300"
                >
                  Refer Partner Program
                </Link>
              </li>
              <li>
                <Link
                  href="/refer-partner/dashboard"
                  className="text-[13px] text-white/75 hover:text-white font-medium text-emerald-300"
                >
                  Partner Portal (Dashboard)
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Request Materials
                </Link>
              </li>
            </ul>
          </li>

          {/* About Us */}
          <li>
            <Link
              href="/about"
              className="mb-4 block text-left text-[15px] font-semibold text-white hover:text-[#ff7468]"
            >
              About Us
            </Link>

            <ul className="submenu space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  About Mediyaz ART Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-[13px] text-white/75 hover:text-white"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </li>

          {/* Contact */}
          <li>
            <Link
              href="/contacts"
              className="text-[15px] font-semibold hover:text-[#e7c9dd]"
            >
              Contact Us
            </Link>
          </li>

          {/* Blog */}
          <li>
            <Link
              href="/blogs"
              className="text-[15px] font-semibold hover:text-[#e7c9dd]"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Bottom Links */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-[12px] text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            <span>
              <Link href="/contacts" className="hover:text-white">
                Terms of Use
              </Link>{" "}
              |{" "}
              <Link href="/contacts" className="hover:text-white">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/contacts" className="hover:text-white">
                ART Act Compliance
              </Link>
            </span>
          </p>

          <Link
            className="all-languages-button hover:text-white"
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
      <div className="container1 mobile mx-auto block px-5 py-12 lg:hidden">
        <div>
          <div className="logo mb-7">
            <Link href="/" className="inline-block">
              <Image
                src="/img/logo.webp"
                alt="Mediyaz ART Bank Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>
        </div>

        <p className="mb-7 text-[14px] leading-6">
          <Link
            href="/contacts"
            className="underline underline-offset-2"
          >
            Send us a message
          </Link>{" "}
          or call{" "}
          <a href="tel:+919667780807" className="underline underline-offset-2">
            +91 9667780807
          </a>
        </p>

        {/* Mobile Footer Navigation Accordions */}
        <ul
          aria-label="Footer Navigation"
          id="footer-menu-mobile"
          className="border-t border-white/20"
        >
          {/* Aspiring Parents */}
          <li className="border-b border-white/20">
            <button
              type="button"
              onClick={() => toggleSection("parents")}
              className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold"
            >
              Aspiring Parents
              <span className="text-xl font-light">
                {openMobileSection === "parents" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "parents" && (
              <ul className="submenu space-y-3 pb-5 pl-3 animate-fade-in">
                <li>
                  <Link
                    href="/aspiring-parents"
                    className="text-sm text-white/75"
                  >
                    For Aspiring Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/donors"
                    className="text-sm text-white/75"
                  >
                    Our Donors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="text-sm text-white/75"
                  >
                    Assurance Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/financing"
                    className="text-sm text-white/75"
                  >
                    Financing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/faqs"
                    className="text-sm text-white/75"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/genetic-screening"
                    className="text-sm text-white/75"
                  >
                    Genetic Screening
                  </Link>
                </li>
                <li>
                  <Link
                    href="/inquiry"
                    className="text-sm text-white/75"
                  >
                    Become an Egg Donor
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Donors */}
          <li className="border-b border-white/20">
            <button
              type="button"
              onClick={() => toggleSection("donors")}
              className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold"
            >
              Donors
              <span className="text-xl font-light">
                {openMobileSection === "donors" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "donors" && (
              <ul className="submenu space-y-3 pb-5 pl-3 animate-fade-in">
                <li>
                  <Link
                    href="/for-donors"
                    className="text-sm text-white/75"
                  >
                    Donor Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/become-an-egg-donor"
                    className="text-sm text-white/75"
                  >
                    Become an Egg Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/become-a-sperm-donor"
                    className="text-sm text-white/75"
                  >
                    Become a Sperm Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/how-to-donate-eggs"
                    className="text-sm text-white/75"
                  >
                    How to Donate Eggs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/donor-compensation"
                    className="text-sm text-white/75"
                  >
                    Insurance &amp; Reimbursement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-donors/faqs"
                    className="text-sm text-white/75"
                  >
                    Donor FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/inquiry"
                    className="text-sm text-white/75"
                  >
                    Donor Pre-Screening
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Clinics */}
          <li className="border-b border-white/20">
            <button
              type="button"
              onClick={() => toggleSection("clinics")}
              className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold"
            >
              Clinics
              <span className="text-xl font-light">
                {openMobileSection === "clinics" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "clinics" && (
              <ul className="submenu space-y-3 pb-5 pl-3 animate-fade-in">
                <li>
                  <Link
                    href="/clinics"
                    className="text-sm text-white/75"
                  >
                    For Clinics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clinics/become-partners"
                    className="text-sm text-white/75"
                  >
                    Become a Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refer-partner"
                    className="text-sm text-teal-300 font-medium"
                  >
                    Refer Partner Program
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refer-partner/dashboard"
                    className="text-sm text-emerald-300 font-medium"
                  >
                    Partner Portal (Dashboard)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-sm text-white/75"
                  >
                    Request Materials
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* About Us */}
          <li className="border-b border-white/20">
            <button
              type="button"
              onClick={() => toggleSection("about")}
              className="flex w-full items-center justify-between py-5 text-left text-[15px] font-semibold"
            >
              About Us
              <span className="text-xl font-light">
                {openMobileSection === "about" ? "−" : "+"}
              </span>
            </button>

            {openMobileSection === "about" && (
              <ul className="submenu space-y-3 pb-5 pl-3 animate-fade-in">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white/75"
                  >
                    About Mediyaz ART Bank
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="text-sm text-white/75"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="border-b border-white/20 py-5">
            <Link
              href="/contacts"
              className="text-[15px] font-semibold"
            >
              Contact Us
            </Link>
          </li>

          <li className="border-b border-white/20 py-5">
            <Link
              href="/blogs"
              className="text-[15px] font-semibold"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile SEO */}
        <div className="seo-text mt-10">
          <h3 className="mb-5 text-[17px] font-semibold leading-7">
            Mediyaz ART Bank | Registered ART Bank under ART Act, 2021
          </h3>

          <p className="text-[13px] leading-6 text-white/85">
            Operating in accordance with India&apos;s Assisted Reproductive Technology (Regulation) Act, 2021, Mediyaz ART Bank provides ethically screened, quarantined donor gametes to registered fertility clinics with strict anonymity, donor welfare, and comprehensive medical safety.
          </p>
        </div>

        {/* Mobile Social */}
        <div className="third-column mt-10">
          <ul className="social-media flex items-center gap-4">
            <li>
              <a
                aria-label="twitter"
                className="twitter flex h-9 w-9 items-center justify-center rounded-full border border-white/40"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                𝕏
              </a>
            </li>

            <li>
              <a
                aria-label="instagram"
                className="instagram flex h-9 w-9 items-center justify-center rounded-full border border-white/40"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ◎
              </a>
            </li>

            <li>
              <a
                aria-label="facebook"
                className="facebook flex h-9 w-9 items-center justify-center rounded-full border border-white/40"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Bottom */}
        <div className="mt-10 border-t border-white/20 pt-6">
          <p className="text-[11px] leading-6 text-white/70">
            <span>
              <Link href="/contacts" className="hover:text-white">
                Terms of Use
              </Link>{" "}
              |{" "}
              <Link href="/contacts" className="hover:text-white">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="/contacts" className="hover:text-white">
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
