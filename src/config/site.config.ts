/**
 * ==============================================================================
 * MEDIYAZ ART BANK - PRODUCTION SITE & BRANDING CONFIGURATION
 * ==============================================================================
 * Central configuration file for white-label enterprise deployment.
 * All brand names, logos, contact info, accreditations, and legal notices
 * are managed here and can be overridden via environment variables.
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Mediyaz ART Bank",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "Mediyaz",
  tagline: "Seeds for Life",
  description:
    "Mediyaz ART Bank – Seeds for Life. A registered Assisted Reproductive Technology (ART) Bank in India, dedicated to ethical screening, cryopreservation, and supply of donor gametes (sperm and oocytes) to registered ART clinics in strict compliance with the ART (Regulation) Act, 2021.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://mediyazartbank.com",

  // Brand Assets & Styling
  logo: {
    text: "Mediyaz ART Bank",
    mark: "M",
    symbolUrl: "/img/logo.webp",
    fullUrl: "/img/logo.webp",
  },

  // Contact Information
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 9667780807",
    emergencyHotline:
      process.env.NEXT_PUBLIC_EMERGENCY_HOTLINE || "+91 9667780807",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mediyazartbank.com",
    supportEmail:
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@mediyazartbank.com",
    clinicalDeskEmail: "info@mediyazartbank.com",
    address: {
      street: "336 Gali No. 4, Govindpuri",
      city: "Kalkaji, South Delhi",
      state: "Delhi",
      zip: "110019",
      country: "India",
    },
    hours: "10:00 AM - 06:00 PM | Monday - Saturday (IST)",
  },

  // Clinical Accreditations & Compliance Badges (India-Specific)
  accreditations: [
    {
      name: "ART Act 2021 Registered",
      detail: "Registered ART Bank under the Assisted Reproductive Technology Act, 2021",
      icon: "ShieldCheck",
    },
    {
      name: "ICMR & National Board Standards",
      detail: "Adherent to National ART & Surrogacy Registry and ICMR Guidelines",
      icon: "Award",
    },
    {
      name: "NABL Partner Laboratories",
      detail: "All Diagnostic & Genetic Testing Conducted in NABL-Accredited Labs",
      icon: "FileCheck",
    },
    {
      name: "Statutory Anonymity & Data Security",
      detail: "Strict Non-Disclosure & Encrypted Donor-Recipient Data Protection",
      icon: "Lock",
    },
  ],

  // Clinical Metrics
  metrics: {
    complianceRate: "100%",
    registeredClinics: "150+",
    screenedDonors: "1,200+",
    yearsExperience: "15+",
    statesServed: "Pan-India",
  },

  // Social & Reference Links
  links: {
    twitter: "https://twitter.com/mediyazfertility",
    linkedin: "https://linkedin.com/company/mediyazfertility",
    facebook: "https://facebook.com/mediyazfertility",
  },
};

export type SiteConfig = typeof siteConfig;
