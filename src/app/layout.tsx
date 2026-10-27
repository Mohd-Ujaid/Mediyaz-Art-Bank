import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mediyazartbank.com"),
  alternates: {
    canonical: "https://mediyazartbank.com",
  },
  title: {
    default: "Mediyaz ART Bank | Registered ART Bank in India | Sperm & Egg Donation",
    template: "%s | Mediyaz ART Bank",
  },
  description:
    "Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) bank in India under the ART (Regulation) Act, 2021, providing medically screened donor sperm and donor oocytes exclusively to registered fertility clinics.",
  keywords: [
    "Mediyaz ART Bank",
    "ART Bank India",
    "Assisted Reproductive Technology Act 2021",
    "Sperm Donation India",
    "Egg Donation India",
    "Donor Semen Bank",
    "Donor Oocyte Bank",
    "Fertility Clinic Network India",
    "Genetic Carrier Screening",
    "Intended Parents India",
    "Registered ART Bank Delhi",
  ],
  authors: [{ name: "Mediyaz ART Bank" }],
  openGraph: {
    title: "Mediyaz ART Bank | Registered ART Bank in India | Sperm & Egg Donation",
    description:
      "Ethical, medically screened donor sperm and donor oocytes supplied exclusively to registered ART clinics in compliance with the ART (Regulation) Act, 2021.",
    url: "https://mediyazartbank.com",
    siteName: "Mediyaz ART Bank",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/img/logo.webp",
        width: 1200,
        height: 630,
        alt: "Mediyaz ART Bank - Registered ART Bank under ART Regulation Act 2021",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediyaz ART Bank | Registered ART Bank in India",
    description:
      "Ethical, medically screened donor sperm and donor oocytes supplied exclusively to registered ART clinics in compliance with the ART (Regulation) Act, 2021.",
    images: ["/img/logo.webp"],
  },
  icons: {
    icon: "/img/logo.webp",
    shortcut: "/img/logo.webp",
    apple: "/img/logo.webp",
  },
};

export const viewport = {
  themeColor: "#285b63",
  width: "device-width",
  initialScale: 1,
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://mediyazartbank.com/#organization",
      "name": "Mediyaz ART Bank",
      "url": "https://mediyazartbank.com",
      "logo": "https://mediyazartbank.com/img/logo.webp",
      "image": "https://mediyazartbank.com/img/hero.jpg",
      "description":
        "Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) bank in India under the ART (Regulation) Act, 2021, providing medically screened donor sperm and donor oocytes exclusively to registered fertility clinics.",
      "telephone": "+91-9667780807",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
      },
      "medicalSpecialty": [
        "Obstetric",
        "Gynecologic",
        "ReproductiveEndocrinology",
      ],
      "availableService": [
        {
          "@type": "MedicalTherapy",
          "name": "Donor Semen Banking & Cryopreservation",
        },
        {
          "@type": "MedicalTherapy",
          "name": "Altruistic Donor Oocyte Vitrification",
        },
        {
          "@type": "MedicalTest",
          "name": "Beta-Thalassemia HPLC & Genetic Carrier Screening",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#222]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#285b63] focus:px-5 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
