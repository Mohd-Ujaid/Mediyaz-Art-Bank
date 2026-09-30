"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    {
      name: "Aspiring Parents",
      href: "/aspiring-parents",
      dropdown: [
        { name: "For Aspiring Parents", href: "/aspiring-parents" },
        { name: "Our Donors", href: "/aspiring-parents/donors" },
        { name: "Assurance Programs", href: "/aspiring-parents/assurance-programs" },
        { name: "Financing", href: "/aspiring-parents/financing" },
        { name: "FAQs", href: "/aspiring-parents/faqs" },
        { name: "Genetic Screening", href: "/aspiring-parents/genetic-screening" },
        { name: "Request a Donor", href: "/donor-request" },
      ],
    },
    {
      name: "Donors",
      href: "/for-donors",
      dropdown: [
        { name: "Donor Overview", href: "/for-donors" },
        { name: "Become an Egg Donor", href: "/for-donors/become-an-egg-donor" },
        { name: "Become a Sperm Donor", href: "/for-donors/become-a-sperm-donor" },
        { name: "Sperm Donor Registration", href: "/register/sperm" },
        { name: "Egg Donor Registration", href: "/register/egg" },
        { name: "How to Donate Eggs", href: "/for-donors/how-to-donate-eggs" },
        {
          name: "Insurance & Reimbursement",
          href: "/for-donors/donor-compensation",
        },
        { name: "Donor FAQs", href: "/for-donors/faqs" },
        { name: "Donor Pre-Screening", href: "/inquiry" },
      ],
    },
    {
      name: "Clinics",
      href: "/clinics",
      dropdown: [
        { name: "For Clinics", href: "/clinics" },
        { name: "Become a Partner", href: "/clinics/become-partners" },
      ],
    },
    {
      name: "About Us",
      href: "/about",
      dropdown: [
        { name: "About Mediyaz ART Bank", href: "/about" },
        { name: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      name: "Contact Us",
      href: "/contacts",
    },
    {
      name: "Blog",
      href: "/blogs",
    },
  ];

  const handleDropdownClick = (name: string) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs transition-all border-b border-slate-100">
      {/* Top Announcement Bar */}
      <div className="bg-[#1b4c54] text-white py-2 px-4 text-xs sm:text-sm text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
        <p className="truncate sm:overflow-visible">Mediyaz ART Bank — Registered ART Bank under the Assisted Reproductive Technology (Regulation) Act, 2021</p>
      </div>

      <nav className="mx-auto flex max-w-[1920px] items-center lg:items-start justify-between px-6 lg:px-12 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center group">
          <Image
            src="/img/logo.webp"
            alt="Mediyaz ART Bank"
            width={320}
            height={95}
            priority
            className="h-12 sm:h-16 lg:h-18 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            href="/aspiring-parents/donors"
            className="rounded-full bg-[#ff7468] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#ff5d50] transition-colors"
          >
            Find A Donor
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#173d45] hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#285b63] focus-visible:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff7468]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex flex-col items-end gap-5">
          {/* Top CTA Pill Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/aspiring-parents/donors"
              className="rounded-full bg-[#ff7468] px-5 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-[#ff5d50] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-xs"
            >
              Find A Donor
            </Link>

            <Link
              href="/inquiry"
              className="rounded-full bg-[#1b4c54] px-5 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-[#153e45] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-xs"
            >
              Donor Application
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-[#ff7468] px-5 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-[#ff5d50] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-xs"
            >
              Register
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {/* Main Navigation */}
                {link.dropdown ? (
                  <button
                    type="button"
                    onClick={() => handleDropdownClick(link.name)}
                    aria-expanded={openDropdown === link.name}
                    className="text-[15px] font-semibold text-[#173d45] transition-colors duration-150 hover:text-[#ff7468] cursor-pointer flex items-center gap-1.5 py-1"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.name ? "rotate-180 text-[#ff7468]" : "text-[#173d45]/60"
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-[15px] font-semibold text-[#173d45] transition-colors duration-150 hover:text-[#ff7468] py-1 inline-block"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown */}
                {link.dropdown && openDropdown === link.name && (
                  <div
                    className="
                      absolute right-0 top-full mt-2
                      min-w-[260px]
                      bg-white/98
                      p-2
                      shadow-xl shadow-slate-900/10
                      backdrop-blur-xl
                      border border-slate-100
                      rounded-2xl
                      animate-slide-down
                      z-50
                    "
                  >
                    <div className="flex flex-col gap-0.5">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="
                            whitespace-nowrap
                            px-3.5 py-2.5
                            text-xs sm:text-sm
                            font-medium
                            text-[#173d45]
                            transition-colors duration-150
                            hover:text-[#ff7468]
                            hover:bg-slate-50
                            rounded-xl
                          "
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-t border-slate-100 shadow-2xl px-6 py-6 max-h-[85vh] overflow-y-auto animate-fade-in z-50">
          <div className="flex flex-col gap-2.5 pb-6 border-b border-slate-100">
            <Link
              href="/aspiring-parents/donors"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-[#ff7468] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#ff5d50] transition-colors"
            >
              Find A Donor
            </Link>
            <Link
              href="/inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-[#1b4c54] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#153e45] transition-colors"
            >
              Donor Application
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-[#ff7468] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#ff5d50] transition-colors"
            >
              Register
            </Link>
          </div>

          <div className="flex flex-col gap-1 mt-5">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-100/70 pb-2 mb-2 last:border-b-0">
                {link.dropdown ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDropdownClick(link.name)}
                      className="flex w-full items-center justify-between py-2 text-sm sm:text-base font-bold text-[#173d45] hover:text-[#ff7468] transition-colors cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#1b4c54] transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180 text-[#ff7468]" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.name && (
                      <div className="flex flex-col gap-1 pl-3 pt-1 pb-2 animate-fade-in border-l-2 border-[#1b4c54]/20 ml-2 mt-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1.5 px-2 text-xs sm:text-sm font-medium text-[#285d64] hover:text-[#ff7468] hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm sm:text-base font-bold text-[#173d45] hover:text-[#ff7468] transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
