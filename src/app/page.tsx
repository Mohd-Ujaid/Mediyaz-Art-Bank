import React from "react";
import Link from "next/link";
import { Playfair_Display, Montserrat, PT_Serif } from "next/font/google";
import Image from "next/image";

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
});

const HomePage = () => {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen relative top-0 pb-20 sm:pb-24">
        <div
          className="w-full h-full min-h-[100vh] bg-cover bg-center bg-no-repeat fixed inset-0 z-[-1]"
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
        />
        
        {/* Subtle overlay for optimal text contrast */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

        <div className="relative z-2 max-w-[92.5rem] mx-auto px-6 sm:px-10 pt-28 sm:pt-36 lg:pt-44">
          <h1
            className={`mt-4 sm:mt-8 text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#1d3840] tracking-tight ${playfair.className} pl-0 sm:pl-4 drop-shadow-xs`}
          >
            The Registered ART Bank
          </h1>

          <div className="mt-8 sm:mt-12 flex flex-col md:flex-row items-stretch md:items-start w-full relative gap-8 lg:gap-10">
            {/* First Hero Card: Intending Parent */}
            <div className="w-full max-w-[24rem] mx-auto md:mx-0 text-center rounded-[2rem] bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#ff7664]/60 shadow-xl shadow-slate-900/5 transition duration-300 hover:shadow-2xl hover:border-[#ff7664] flex flex-col justify-between">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.95rem] font-normal text-[#2b5860] leading-snug mb-6 tracking-tight ${playfair.className}`}
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
                      className="rounded-full w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>

                  <p className="text-[#3a4447] mb-6 text-center text-xs sm:text-sm leading-relaxed">
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
                  className="flex-1 py-2.5 px-3 text-white bg-[#ff6b59] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:bg-[#ff5242] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Second Hero Card: Become a Donor */}
            <div className="w-full max-w-[24rem] mx-auto md:mx-0 text-center rounded-[2rem] bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#e3c582] shadow-xl shadow-slate-900/5 transition duration-300 hover:shadow-2xl hover:border-[#d8b870] flex flex-col justify-between">
              <div>
                <h2
                  className={`text-2xl sm:text-[1.95rem] font-normal text-[#2b5860] leading-snug mb-6 tracking-tight ${playfair.className}`}
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
                      className="rounded-full w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </figure>

                  <p className="text-[#3a4447] mb-6 text-center text-xs sm:text-sm leading-relaxed">
                    Bring hope to couples facing involuntary infertility. <strong className="font-semibold text-[#1d3840]">Mediyaz ART Bank</strong> welcomes eligible, healthy individuals for altruistic sperm and egg donation under the Assisted Reproductive Technology (Regulation) Act, 2021. Experience a structured, confidential, and medically supervised process with health screenings, statutory insurance coverage, and ethical care.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-center justify-center pt-2">
                <Link
                  href="/inquiry"
                  className="flex-1 py-2.5 px-3 text-[#2a383d] bg-[#e3c582] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:bg-[#d8b870] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                >
                  Become a Donor
                </Link>
                <Link
                  href="/for-donors"
                  className="flex-1 py-2.5 px-3 text-[#2a383d] bg-[#e3c582] text-xs sm:text-sm text-center font-bold rounded-xl shadow-xs transition duration-200 hover:bg-[#d8b870] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
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
        {/* Section About */}
        <section
          className="
            bg-[#2b5860]
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
            <div className="z-10 relative text-[#222] bg-white max-w-[54rem] border border-slate-100 mx-auto py-10 sm:py-14 md:py-16 px-6 sm:px-12 md:px-16 rounded-[2rem] flex flex-col justify-center shadow-2xl">
              <h2
                className={`mb-6 text-[#ff5242] ${playfair.className} text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight font-semibold tracking-tight`}
              >
                Welcome to <span className="font-bold text-[#1d3840]">Mediyaz ART Bank</span>
              </h2>

              <p
                className={`mb-5 text-[#444] text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Mediyaz ART Bank is a registered Assisted Reproductive Technology (ART) Bank in India established under the Assisted Reproductive Technology (Regulation) Act, 2021. We operate to support intending couples, registered fertility clinics, and altruistic donors by providing medically screened donor semen and oocytes, advanced cryopreservation protocols, and transparent clinical coordination.
              </p>

              <p
                className={`text-[#444] text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed ${montserrat.className}`}
              >
                Our mission is to uphold the highest standards of reproductive ethics, medical safety, and statutory compliance. From mandatory infectious disease screening and genetic carrier testing (including Thalassemia panels) to standardized 6-month semen quarantine, strict donor anonymity, and statutory insurance coverage for oocyte donors, we ensure every step of your journey is safe, responsible, and compliant with Indian law.
              </p>
            </div>
          </div>
        </section>

        {/* ================= SECTION STATS ================= */}
        <section className="relative text-center bg-[#95e0b9] py-16 sm:py-20 px-6 block border-y border-emerald-300/40">
          <div className="max-w-[92.5rem] mx-auto">
            <h2
              className={`text-[#2b5860] text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              A Trusted ART Banking Network Across India
            </h2>

            <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mt-10 sm:mt-12 [&>li]:list-none [&>li]:w-[16rem] sm:[&>li]:w-[18rem] [&>li]:h-[14rem] sm:[&>li]:h-[16rem] [&>li]:flex [&>li]:flex-col [&>li]:justify-center [&>li]:items-center [&>li]:gap-3 sm:[&>li]:gap-4 [&>li]:rounded-3xl [&>li]:bg-white [&>li]:shadow-md [&>li]:border [&>li]:border-emerald-100/80 [&>li]:transition-all [&>li]:duration-300 hover:[&>li]:-translate-y-2 hover:[&>li]:shadow-xl">
              <li>
                <p
                  className={`
                    ${playfair.className}
                    text-5xl sm:text-[76px]
                    leading-none
                    font-bold
                    text-[#ff6b59]
                    tabular-nums
                  `}
                >
                  20k+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#2b5860] text-center leading-snug`}>
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
                    text-[#ff6b59]
                    tabular-nums
                  `}
                >
                  100+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#2b5860] text-center leading-snug`}>
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
                    text-[#ff6b59]
                    tabular-nums
                  `}
                >
                  25+
                </p>
                <p className={`text-base sm:text-[1.25rem] font-serif font-bold ${playfair.className} text-[#2b5860] text-center leading-snug`}>
                  Years of Experience
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ================= SECTION ABOUT (GUIDANCE) ================= */}
        <section className="py-16 sm:py-24 lg:py-28 px-6 bg-white block">
          <div className="flex flex-col lg:flex-row items-center justify-between z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 gap-12 lg:gap-16">
            <div className="w-full lg:max-w-[32rem]">
              <h2
                className={`text-2xl sm:text-3xl lg:text-[2.35rem] leading-tight mb-6 font-semibold ${playfair.className} text-[#2b5860] tracking-tight`}
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

              <div className="mt-8">
                <Link
                  href="/aspiring-parents"
                  className={`text-white inline-flex items-center justify-center text-xs sm:text-sm rounded-xl font-bold tracking-wide px-7 py-3 bg-[#ff6b59] transition duration-200 hover:bg-[#ff5242] shadow-xs hover:shadow-md active:scale-95 ${montserrat.className}`}
                >
                  Learn More
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

        {/* ================= SECTION STORIES ================= */}
        <section className="relative text-center py-16 sm:py-24 px-6 bg-gradient-to-b from-[#f5ebd2] via-[#fbf7ee] to-white block">
          <div
            className={`z-1 relative mx-auto max-w-[92.5rem] px-2 sm:px-8 text-center text-black ${montserrat.className}`}
          >
            <h2
              className={`text-[#20363d] text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight ${playfair.className} font-semibold tracking-tight`}
            >
              Experiences &amp; Clinical Journeys
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-[80rem] mx-auto mt-10 sm:mt-12">
              {/* Testimonial 1 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-amber-200/70 shadow-lg shadow-amber-950/5 transition duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-white shadow-md mb-6">
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
                <cite className="mt-5 text-[#2b5860] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Ananya &amp; Vikram <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, New Delhi)</span>
                </cite>
              </div>

              {/* Testimonial 2 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-amber-200/70 shadow-lg shadow-amber-950/5 transition duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-white shadow-md mb-6">
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
                <cite className="mt-5 text-[#2b5860] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
                  — Meera &amp; Rajesh <span className="font-normal text-slate-500 block text-xs mt-0.5">(Intending Parents, Mumbai)</span>
                </cite>
              </div>

              {/* Testimonial 3 */}
              <div className="w-full max-w-[22rem] mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-amber-200/70 shadow-lg shadow-amber-950/5 transition duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  <figure className="w-full max-w-[13rem] mx-auto overflow-hidden block relative rounded-full aspect-square ring-4 ring-white shadow-md mb-6">
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
                <cite className="mt-5 text-[#2b5860] block font-bold text-xs sm:text-sm not-italic border-t border-slate-100 pt-3 text-left">
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

        {/* ================= SECTION ARTICLES ================= */}
        <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 px-6 bg-white block text-[#000]">
          <div className="relative z-1 mx-auto max-w-[92.5rem] px-2 sm:px-8">
            <h2
              className={`text-[#2b5860] ${playfair.className} font-semibold text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight`}
            >
              Resources on Indian ART Regulations &amp; Gamete Banking
            </h2>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Article 1 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_1.png"
                        alt="Genetic carrier screening"
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b5860] leading-snug group-hover:text-[#ff7468] transition">
                      <Link href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking">
                        Understanding Genetic Carrier &amp; Thalassemia Screening in Indian Donors
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Why pre-donation hemoglobinopathy panels, Beta-Thalassemia screening, and chromosomal karyotyping are vital clinical safeguards for intending parents under Indian guidelines…
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/beta-thalassemia-hemoglobinopathy-screening-art-banking">
                    Read article →
                  </Link>
                </div>
              </article>

              {/* Article 2 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/understanding-art-regulation-act-2021-india" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_2.png"
                        alt="The ART Regulation Act 2021"
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b5860] leading-snug group-hover:text-[#ff7468] transition">
                      <Link href="/blogs/understanding-art-regulation-act-2021-india">
                        The ART (Regulation) Act, 2021: Statutory Rights &amp; Donor Anonymity
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A clear breakdown of statutory donor anonymity, parenthood rights from birth, prohibition of commercial gamete sales, and clinic requisition mandates in India…
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/understanding-art-regulation-act-2021-india">
                    Read article →
                  </Link>
                </div>
              </article>

              {/* Article 3 */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#285d64]/40 group">
                <div>
                  <Link href="/blogs/clinical-journey-oocyte-donor-indian-regulations" className="block overflow-hidden rounded-2xl bg-slate-100">
                    <div className="relative h-[13.5rem] w-full overflow-hidden">
                      <Image
                        src="/img/aspiring_parent_3.1.png"
                        alt="The Donor Journey in India"
                        fill
                        className="object-cover object-center transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b5860] leading-snug group-hover:text-[#ff7468] transition">
                      <Link href="/blogs/clinical-journey-oocyte-donor-indian-regulations">
                        The Donor Journey in India: Eligibility, Health Safety &amp; Statutory Insurance
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A comprehensive guide to donor eligibility under Indian law, the one-time oocyte donation rule, semen quarantine protocols, and mandatory 12-month donor health insurance…
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link className="inline-flex items-center text-xs font-bold text-[#ff7664] hover:text-[#ff5242] transition gap-1" href="/blogs/clinical-journey-oocyte-donor-indian-regulations">
                    Read article →
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
};

export default HomePage;
