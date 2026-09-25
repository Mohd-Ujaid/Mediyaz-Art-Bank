"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
    <header ref={navRef} className="sticky top-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs transition-all border-b border-gray-100">
      {/* Top Announcement Bar */}
      <div className="bg-[#1b4c54] text-white py-2 px-4 text-xs sm:text-sm text-center font-medium tracking-wide">
        <p>Mediyaz ART Bank — Registered ART Bank under the Assisted Reproductive Technology (Regulation) Act, 2021 | Certified Sperm & Egg Bank</p>
      </div>

      <nav className="mx-auto flex max-w-[1920px] items-center lg:items-start justify-between px-6 lg:px-12 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/img/logo.webp"
            alt="Mediyaz ART Bank"
            width={320}
            height={95}
            priority
            className="h-14 sm:h-18 lg:h-20 w-auto object-contain"
          />
        </Link>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/aspiring-parents/donors"
            className="rounded-full bg-[#ff7468] px-4 py-1.5 text-xs font-bold text-white shadow-xs"
          >
            Find A Donor
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#173d45]/20 bg-white text-[#173d45] focus-visible:ring-2 focus-visible:ring-[#285b63] focus-visible:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex flex-col items-end gap-6">
          {/* Top CTA Pill Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/aspiring-parents/donors"
              className="rounded-full bg-[#ff7468] px-6 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#ff5d50] hover:shadow-md active:scale-[0.98]"
            >
              Find A Donor
            </Link>

            <Link
              href="/inquiry"
              className="rounded-full bg-[#1b4c54] px-6 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#153e45] hover:shadow-md active:scale-[0.98]"
            >
              Donor Application
            </Link>


            <Link
              href="/register"
              className="rounded-full bg-[#ff7468] px-6 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#ff5d50] hover:shadow-md active:scale-[0.98]"
            >
              Register
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {/* Main Navigation */}
                {link.dropdown ? (
                  <button
                    type="button"
                    onClick={() => handleDropdownClick(link.name)}
                    aria-expanded={openDropdown === link.name}
                    className="text-base font-semibold text-[#173d45] transition hover:text-[#ff7468] cursor-pointer flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-base font-semibold text-[#173d45] transition hover:text-[#ff7468]"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown */}
                {link.dropdown && openDropdown === link.name && (
                  <div
                    className="
                      absolute right-0 top-full mt-3
                      min-w-[240px]
                      bg-white/95
                      px-4 py-3
                      shadow-xl
                      backdrop-blur-md
                      border border-gray-100
                      rounded-xl
                      animate-slide-down
                      z-50
                    "
                  >
                    <div className="flex flex-col">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="
                            whitespace-nowrap
                            px-3 py-2
                            text-sm
                            font-medium
                            text-[#173d45]
                            transition
                            hover:text-[#ff7468]
                            hover:bg-[#173d45]/5
                            rounded-lg
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
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-t border-gray-100 shadow-xl px-6 py-6 max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="flex flex-col gap-3 pb-6 border-b border-gray-100">
            <Link
              href="/aspiring-parents/donors"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-[#ff7468] py-2.5 text-sm font-bold text-white shadow-xs"
            >
              Find A Donor
            </Link>
            <Link
              href="/inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-[#1b4c54] py-2.5 text-sm font-bold text-white shadow-xs"
            >
              Donor Application
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-[#ff7468] py-2.5 text-sm font-bold text-white shadow-xs"
            >
              Register
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-gray-100 pb-3">
                {link.dropdown ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => handleDropdownClick(link.name)}
                      className="flex w-full items-center justify-between text-base font-bold text-[#173d45]"
                    >
                      <span>{link.name}</span>
                      <span className="text-xl text-[#1b4c54]">
                        {openDropdown === link.name ? "−" : "+"}
                      </span>
                    </button>
                    {openDropdown === link.name && (
                      <div className="flex flex-col gap-2 pl-4 pt-3 pb-1 animate-fade-in">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1 text-sm font-medium text-[#285d64] hover:text-[#ff7468]"
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
                    className="block text-base font-bold text-[#173d45] hover:text-[#ff7468]"
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
