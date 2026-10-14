import React from "react";
import Link from "next/link";
import { Playfair_Display, Montserrat, PT_Serif } from "next/font/google";
import Image from "next/image";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
});

export default function HomePage() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen relative top-0 pb-20 sm:pb-24">
        {/* Fixed Hero Photography Background */}
        <div
          className="w-full h-full min-h-[100vh] bg-cover bg-center bg-no-repeat fixed inset-0 z-[-1]"
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
        />
        
        {/* Refined gradient scrim for optimal contrast and warmth */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-white/40 via-white/10 to-black/25 pointer-events-none" />

        <div className="relative z-2 max-w-[92.5rem] mx-auto px-6 sm:px-10 pt-28 sm:pt-36 lg:pt-44">
          
          {/* Statutory Credential Badge */}
          <div className="pl-0 sm:pl-4 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#285b63]/20 text-[#285b63] text-xs font-semibold tracking-wide shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#285b63]" />
              Assisted Reproductive Technology (Regulation) Act, 2021
            </span>
          </div>

          <h1
            className={`mt-2 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#1d3840] tracking-tight ${playfair.className} pl-0 sm:pl-4 drop-shadow-xs`}
          >
            The Registered ART Bank
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col md:flex-row items-stretch md:items-start w-full relative gap-8 lg:gap-10">
            
            {/* First Hero Card: Intending Parent */}
            <div className="w-full max-w-[24.5rem] mx-auto md:mx-0 text-center rounded-[2rem] bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff7664]/80 flex flex-col justify-between group">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.95rem] font-medium text-[#1d3840] leading-snug mb-6 tracking-tight ${playfair.className}`}
                >
                  I am an Intending Parent
                </h2>

                <div className="max-w-[15rem] mx-auto">
                  <figure className="mx-auto mt-0 mb-6 w-full overflow-hidden rounded-full relative aspect-square ring-4 ring-[#ff7664]/20 shadow-md">
                    <Image
                      src="/img/aspiring_parent_3.3.png"
                      alt="Intending Parent Support"
                      width={500}
                      height={500}
                      priority
                      className="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>

                  <p className="text-slate-700 mb-6 text-center text-xs sm:text-sm leading-relaxed">
                    Whether you are starting your assisted reproduction journey or exploring donor gametes, <strong className="font-semibold text-[#1d3840]">Mediyaz ART Bank</strong> supports intending couples and women in full compliance with the ART (Regulation) Act, 2021. In partnership with your registered fertility clinic, we provide ethically screened donor sperm and donor oocytes with complete statutory anonymity and verified medical records.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-center justify-center pt-2">
                <Link
                  href="/aspiring-parents/donors"
                  className="flex-1 py-2.5 px-3 text-white bg-[#ff6b59] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:bg-[#ff5242] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Find Your Donor
                </Link>
                <Link
                  href="/aspiring-parents"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Second Hero Card: Become a Donor */}
            <div className="w-full max-w-[24.5rem] mx-auto md:mx-0 text-center rounded-[2rem] bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#d8b870] flex flex-col justify-between group">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.95rem] font-medium text-[#1d3840] leading-snug mb-6 tracking-tight ${playfair.className}`}
                >
                  I Want to Become a Donor
                </h2>

                <div className="max-w-[15rem] mx-auto">
                  <figure className="mx-auto mt-0 mb-6 w-full overflow-hidden rounded-full relative aspect-square ring-4 ring-[#e3c582]/30 shadow-md">
                    <Image
                      src="/img/find_donor_1.png"
                      alt="Become an Altruistic Donor"
                      width={500}
                      height={500}
                      priority
                      className="rounded-full w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </figure>

                  <p className="text-slate-700 mb-6 text-center text-xs sm:text-sm leading-relaxed">
                    Bring hope to couples facing involuntary infertility. <strong className="font-semibold text-[#1d3840]">Mediyaz ART Bank</strong> welcomes eligible, healthy individuals for altruistic sperm and egg donation under the Assisted Reproductive Technology (Regulation) Act, 2021. Experience a structured, confidential, and medically supervised process with health screenings, statutory insurance coverage, and ethical care.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-center justify-center pt-2">
                <Link
                  href="/register"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-[#e3c582] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:bg-[#d8b870] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Become a Donor
                </Link>
                <Link
                  href="/for-donors"
                  className="flex-1 py-2.5 px-3 text-[#1d3840] bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="z-1 block relative leading-6">
        
        {/* ================= SECTION ABOUT / WELCOME ================= */}
        <section
          className="
            bg-[#204850]
            relative
            py-16 sm:py-24 lg:py-28
            overflow-hidden
          "
        >
          <div className="z-1 relative mx-auto max-w-[92.5rem] px-6 sm:px-10">
            {/* Top right circular decorative image */}
            <figure className="hidden xl:block overflow-hidden aspect-square w-72 2xl:w-80 absolute -top-8 right-12 rounded-full shadow-2xl ring-4 ring-white/10 opacity-90 transition-transform duration-500 hover:scale-105 pointer-events-none">
              <Image
                src="/img/about_4.png"
                alt="ART Bank Standards"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Bottom left circular decorative image */}
            <figure className="hidden xl:block overflow-hidden aspect-square w-72 2xl:w-80 absolute -bottom-8 left-12 rounded-full shadow-2xl ring-4 ring-white/10 opacity-90 transition-transform duration-500 hover:scale-105 pointer-events-none">
              <Image
                src="/img/about-2.png"
                alt="Clinical Safety"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Centered White Welcome Card */}
            <div className="z-10 relative text-slate-800 bg-white max-w-[54rem] border border-slate-100 mx-auto py-10 sm:py-14 md:py-16 px-6 sm:px-12 md:px-16 rounded-[2rem] flex flex-col justify-center shadow-2xl">
              <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider mb-2">
                Statutory Reproductive Healthcare
              </span>
              <h2
                className={`mb-6 text-[#1d3840] ${playfair.className} text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight font-semibold tracking-tight`}
              >
                Welcome to <span className="font-bold text-[#285b63]">Mediyaz ART Bank</span>
              </h2>

              <p
                className={`mb-5 text-slate-600 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) Bank in India established under the Assisted Reproductive Technology (Regulation) Act, 2021. We operate to support intending couples, registered fertility clinics, and altruistic donors by providing medically screened donor semen and oocytes, advanced cryopreservation protocols, and transparent clinical coordination.
              </p>

              <p
                className={`text-slate-600 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Our mission is to uphold the highest standards of reproductive ethics, medical safety, and statutory compliance. From mandatory infectious disease screening and genetic carrier testing (including Thalassemia panels) to standardized 6-month semen quarantine, strict donor anonymity, and statutory insurance coverage for oocyte donors, we ensure every step of your journey is safe, responsible, and compliant with Indian law.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION STATS (TRUSTED NETWORK) ================= */}
        <section className="relative text-center bg-[#edf5f2] py-16 sm:py-20 px-6 block border-y border-slate-200/80">
          <div className="max-w-[92.5rem] mx-auto">
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Pan-India Clinical Footprint
            </span>
            <h2
              className={`text-[#1d3840] text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              A Trusted ART Banking Network Across India
            </h2>

            <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-12 [&>li]:list-none [&>li]:w-[16rem] sm:[&>li]:w-[18rem] [&>li]:h-[14rem] sm:[&>li]:h-[16rem] [&>li]:flex [&>li]:flex-col [&>li]:justify-center [&>li]:items-center [&>li]:gap-3 sm:[&>li]:gap-4 [&>li]:rounded-3xl [&>li]:bg-white [&>li]:shadow-sm [&>li]:border [&>li]:border-slate-200/80 [&>li]:transition-all [&>li]:duration-300 hover:[&>li]:-translate-y-1.5 hover:[&>li]:shadow-xl">
              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  20k+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Donors
                </p>
              </li>

              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  100+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Partner ART <br /> Clinics
                </p>
              </li>

              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#1d3840]
                    tabular-nums
                  `}
                >
                  25+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#285b63] text-center leading-snug`}>
                  Years of Experience
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ================= SECTION CLINICAL GUIDANCE ================= */}
        <section className="py-16 sm:py-24 lg:py-28 px-6 bg-white block">
          <div className="flex flex-col lg:flex-row items-center justify-between z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 gap-12 lg:gap-16">
            <div className="w-full lg:max-w-[34rem]">
              <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
                Consultative Care
              </span>
              <h2
                className={`text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight mb-6 font-semibold ${playfair.className} text-[#1d3840] tracking-tight`}
              >
                Dedicated Clinical Guidance for Intending Parents &amp; Fertility Clinics
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  At Mediyaz ART Bank, we understand that assisted reproduction involves deeply personal medical decisions. In strict accordance with the Assisted Reproductive Technology (Regulation) Act, 2021, our experienced team provides clinical guidance to help intending parents and treating fertility specialists select compatible, thoroughly screened donor gametes.
                </p>
                <p>
                  Under Indian law, all gamete donations remain strictly anonymous. Intending parents and doctors can review comprehensive, non-identifying donor profiles—including physical traits, educational background, multi-generational medical history, and expanded genetic carrier screening panels.
                </p>
                <p>
                  Once donor gametes are requisitioned by your registered ART clinic, our cryo-logistics team delivers quarantined, temperature-monitored samples directly to your clinic&apos;s embryology laboratory in certified liquid nitrogen dry vapor shippers, ensuring full regulatory adherence and cold-chain integrity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/aspiring-parents"
                  className={`text-white inline-flex items-center justify-center text-xs sm:text-sm rounded-xl font-bold tracking-wide px-7 py-3 bg-[#ff6b59] transition duration-200 hover:bg-[#ff5242] shadow-xs hover:shadow-md active:scale-95 ${montserrat.className}`}
                >
                  Learn More
                </Link>
                <Link
                  href="/compliance"
                  className="text-xs font-bold text-[#1d3840] hover:text-[#285b63] transition-colors"
                >
                  Review Cold-Chain Protocols &rarr;
                </Link>
              </div>
            </div>

            <figure className="w-full lg:flex-1 rounded-2xl overflow-hidden shadow-xl border border-slate-100 relative">
              <Image
                src="/img/home1.png"
                alt="Clinical Guidance & Quality Protocols"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </figure>
          </div>
        </section>

        {/* ================= SECTION EXPERIENCES & CLINICAL JOURNEYS ================= */}
        <section className="relative text-center py-16 sm:py-24 px-6 bg-gradient-to-b from-[#fbf8f2] via-[#faf7f0] to-white block border-t border-slate-200/60">
          <div
            className={`z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 text-center text-black ${montserrat.className}`}
          >
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Patient &amp; Donor Voices
            </span>
            <h2
              className={`text-[#1d3840] text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              Experiences &amp; Clinical Journeys
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[80rem] mx-auto mt-10 sm:mt-12">
              
              {/* Testimonial 1 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t1.jpg"
                      alt="Intending Parents Feedback"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;After struggling with severe male factor infertility, our reproductive specialist recommended donor insemination. Mediyaz ART Bank guided our clinic through the selection process. Having a donor with verified Thalassemia carrier clearance and complete semen quarantine gave us immense reassurance. Our healthy son was born last winter.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Ananya &amp; Vikram <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, New Delhi)</span>
                </cite>
              </div>

              {/* Testimonial 2 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t2.jpg"
                      alt="Intending Couple Review"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;Facing advanced maternal age, we required donor oocytes for our IVF treatment. Mediyaz ART Bank provided detailed, non-identifying clinical profiles matching our physical characteristics and blood group. The transparent process and legal adherence under the ART Act gave us absolute confidence at every step.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Meera &amp; Rajesh <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, Mumbai)</span>
                </cite>
              </div>

              {/* Testimonial 3 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-slate-100 shadow-md mb-6">
                    <Image
                      src="/img/t3.jpg"
                      alt="Altruistic Egg Donor Experience"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>
                  <blockquote className="text-left">
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;As an ever-married mother of two choosing to donate eggs altruistically, the medical team treated me with utmost dignity. The clinical evaluations were thorough, the doctors explained every step of stimulation and retrieval, and the statutory health insurance coverage gave my family complete peace of mind.&rdquo;
                    </p>
                  </blockquote>
                </div>
                <cite className="mt-5 text-[#285b63] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Pooja M. <span className="font-normal text-slate-500 block text-xs mt-0.5">(Altruistic Egg Donor, Gurugram)</span>
                </cite>
              </div>

            </div>

            <div className="flex justify-center md:justify-start pt-12 sm:pt-14 relative max-w-[80rem] mx-auto">
              <Link
                href="/aspiring-parents"
                className="text-[#1d3840] font-bold text-sm sm:text-base underline underline-offset-4 hover:text-[#ff7468] transition inline-flex items-center gap-1.5"
              >
                Learn more about donor gamete access →
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SECTION ARTICLES & RESOURCES ================= */}
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-6 bg-white block text-slate-900 border-t border-slate-200/60">
          <div className="relative z-1 mx-auto max-w-[92.5rem] px-2 sm:px-8">
            <span className="text-xs font-bold text-[#285b63] uppercase tracking-wider block mb-2">
              Clinical Insights
            </span>
            <h2
              className={`text-[#1d3840] ${playfair.className} font-semibold text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight`}
            >
              Resources on Indian ART Regulations &amp; Gamete Banking
            </h2>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              
              {/* Article 1 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_1.png"
                        alt="Beta-Thalassemia & Hemoglobinopathy Screening"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="mt-5">
                    <p className="text-xs text-slate-500 mb-2 flex items-center justify-between flex-wrap gap-1">
                      <span>August 25th, 2026</span>
                      <span className="font-bold text-[#ff7664] bg-[#fff2f0] px-2.5 py-0.5 rounded-full text-[11px]">
                        Genetic Safety
                      </span>
                    </p>

                    <h3 className={`text-lg sm:text-xl font-bold text-[#1d3840] leading-snug group-hover:text-[#ff7468] transition ${playfair.className}`}>
                      <Link href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking">
                        Why Universal Thalassemia HPLC Screening is Vital for Donor Oocytes &amp; Semen
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      Beta-thalassemia is one of the most prevalent inherited hemoglobin disorders in India. Learn why automated high-performance liquid chromatography (HPLC) is mandatory.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking">
                    Read article &rarr;
                  </Link>
                </div>
              </article>

              {/* Article 2 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/understanding-art-regulation-act-2021-india" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_2.png"
                        alt="Understanding the ART Regulation Act 2021"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="mt-5">
                    <p className="text-xs text-slate-500 mb-2 flex items-center justify-between flex-wrap gap-1">
                      <span>August 18th, 2026</span>
                      <span className="font-bold text-[#ff7664] bg-[#fff2f0] px-2.5 py-0.5 rounded-full text-[11px]">
                        Legal &amp; Regulatory
                      </span>
                    </p>

                    <h3 className={`text-lg sm:text-xl font-bold text-[#1d3840] leading-snug group-hover:text-[#ff7468] transition ${playfair.className}`}>
                      <Link href="/blogs/understanding-art-regulation-act-2021-india">
                        A Complete Clinical Guide to the Indian ART Regulation Act 2021 for Patients
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      Understand your legal rights, statutory anonymity protections under Section 28, and single-lifetime oocyte donation safeguards under Indian law.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/understanding-art-regulation-act-2021-india">
                    Read article &rarr;
                  </Link>
                </div>
              </article>

              {/* Article 3 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/clinical-journey-oocyte-donor-indian-regulations" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_3.1.png"
                        alt="Clinical Journey of an Oocyte Donor"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="mt-5">
                    <p className="text-xs text-slate-500 mb-2 flex items-center justify-between flex-wrap gap-1">
                      <span>July 30th, 2026</span>
                      <span className="font-bold text-[#ff7664] bg-[#fff2f0] px-2.5 py-0.5 rounded-full text-[11px]">
                        Donor Care &amp; Health
                      </span>
                    </p>

                    <h3 className={`text-lg sm:text-xl font-bold text-[#1d3840] leading-snug group-hover:text-[#ff7468] transition ${playfair.className}`}>
                      <Link href="/blogs/clinical-journey-oocyte-donor-indian-regulations">
                        The Altruistic Egg Donor Clinical Protocol: Preparation, Safety &amp; Rule 13 Coverage
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      A step-by-step walkthrough of medical evaluations, hormonal stimulation monitoring, egg retrieval under anesthesia, and post-procedure medical insurance.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/clinical-journey-oocyte-donor-indian-regulations">
                    Read article &rarr;
                  </Link>
                </div>
              </article>

            </div>

            <div className="mt-12 text-center">
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center rounded-xl border border-[#2b5860]/30 bg-white px-7 py-3.5 text-sm font-bold text-[#1d3840] hover:border-[#ff7468] hover:text-[#ff7468] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-2xs"
              >
                View all articles &amp; clinical resources →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
