import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Dna,
  Heart,
  Phone,
  ArrowRight,
  FileText,
  UserCheck,
  Award,
  Globe2,
} from "lucide-react";

export const metadata = {
  title: "Our Donors | Egg & Sperm Donor Screening | Mediyaz ART Bank India",
  description:
    "Choosing your donor is one of the most important decisions you will ever make. Discover our rigorous donor screening, 3-generation medical pedigree assessment, genetic karyotyping, and statutory ART Act 2021 compliance.",
};

export default function OurDonorsEditorialPage() {
  return (
    <div className="w-full bg-white text-[#414141]">
      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/aspiring-parent.webp"
            alt="Our Donors - Mediyaz ART Bank"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/50 to-white/75" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-[1450px] px-6 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-12 md:px-10 md:pt-16 md:pb-14 lg:px-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4c54]/10 text-xs font-semibold tracking-wide text-[#1b4c54] backdrop-blur-xs mb-3 border border-[#1b4c54]/15">
            <ShieldCheck className="w-4 h-4 text-[#ff7468]" />
            <span>Assisted Reproductive Technology (Regulation) Act, 2021 Registered</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1d3840]">
            Our Donors
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1450px] px-6 sm:px-8 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* ================= LEFT MAIN ARTICLE ================= */}
          <article className="min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal leading-tight text-[#285b63]">
              Finding a Donor (Sperm &amp; Oocyte)
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555]">
              We&apos;ve helped thousands of people build their families through innovative cryotechnology,
              rigorous medical screening, and world-class reproductive care. With India&apos;s most diverse,
              verified registry of donor gametes, Mediyaz ART Bank has an ethical donor match for every
              aspiring parent.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              We make the journey of choosing a donor transparent and reassuring by screening all of our donors
              to ensure they are physically and mentally healthy, have verified reproductive fitness, and
              represent a broad array of Indian regional, cultural, and phenotypic diversity. Our screening
              protocols strictly fulfill and exceed the statutory donor-screening standards mandated under the{" "}
              <b>Assisted Reproductive Technology (Regulation) Act, 2021</b> and National ART Registry guidelines.
            </p>

            {/* In-Content CTA Box (MyEggBank "Get Started" Pattern) */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-[#edf3f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                <Image
                  src="/img/aspiring_parent_3.3.png"
                  alt="Search Our Donors Database"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-xl font-bold text-[#285b63]">
                  Get Started
                </h3>
                <p className="mt-1 text-sm text-[#555]">
                  Search our diverse database of rigorously screened donors to find the best fit for your family.
                </p>
                <Link
                  href="/donors"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#ff7468] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#ff5d50]"
                >
                  <span>Find a Donor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Donor Assessment Section */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Donor Assessment &amp; Rigorous Screening
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Each prospective donor not only satisfies statutory physical and age requirements (21–35 years
              for oocyte donors with at least one living child; 21–55 years for semen donors), but also
              provides Mediyaz ART Bank with comprehensive baseline documentation:
            </p>

            <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-[#555] list-disc pl-5">
              <li>
                <b>A family medical history going back three generations</b> to investigate hereditary, metabolic,
                or familial health conditions.
              </li>
              <li>
                <b>An educational and occupational history</b> verifying academic degrees, professional credentials,
                and employment records.
              </li>
              <li>
                <b>A non-identifying personal statement</b> highlighting aptitudes, talents, and personal values.
              </li>
              <li>
                <b>A statutory travel &amp; behavioral screening</b> to evaluate infectious exposures and lifestyle factors.
              </li>
            </ul>

            <h3 className="mt-6 font-serif text-xl font-bold text-[#285b63]">
              Clinical Assessments &amp; Medical Testing
            </h3>

            <p className="mt-3 text-sm sm:text-base text-[#555] leading-relaxed">
              Every prospective donor undergoes thorough clinical assessments conducted by registered medical specialists:
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-[#fbfdfc] p-4">
                <div className="flex items-center gap-2 font-bold text-[#285b63] text-sm">
                  <Stethoscope className="w-4 h-4 text-[#ff7468]" />
                  <span>Physical &amp; Clinical Exam</span>
                </div>
                <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                  Conducted by registered reproductive physicians and nurse specialists, including full organ system
                  examinations and BMI evaluation.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-[#fbfdfc] p-4">
                <div className="flex items-center gap-2 font-bold text-[#285b63] text-sm">
                  <Dna className="w-4 h-4 text-[#ff7468]" />
                  <span>Genetic Counselor Review</span>
                </div>
                <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                  Detailed consultation with clinical genetic specialists evaluating multi-generational pedigrees
                  and molecular test results.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-[#fbfdfc] p-4">
                <div className="flex items-center gap-2 font-bold text-[#285b63] text-sm">
                  <UserCheck className="w-4 h-4 text-[#ff7468]" />
                  <span>Psychological Examination</span>
                </div>
                <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                  Standardized psychological evaluations to guarantee voluntary informed consent, emotional stability,
                  and statutory readiness.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-[#fbfdfc] p-4">
                <div className="flex items-center gap-2 font-bold text-[#285b63] text-sm">
                  <Award className="w-4 h-4 text-[#ff7468]" />
                  <span>Reproductive Evaluation</span>
                </div>
                <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                  Ultrasound antral follicle count (AFC) for oocyte donors; computerized semen analysis meeting
                  strict WHO morphological criteria for sperm donors.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm sm:text-base text-[#555] leading-relaxed">
              Medical and diagnostic testing helps ensure they are medically fit to be gamete donors through:
            </p>

            <ul className="mt-3 space-y-2 text-sm sm:text-base text-[#555] list-disc pl-5">
              <li>
                <b>Infectious disease serology:</b> Repeat testing for HIV 1 &amp; 2, Hepatitis B (HBsAg),
                Hepatitis C (HCV), Syphilis (VDRL), and Chlamydia PCR.
              </li>
              <li>
                <b>Hemoglobin HPLC (Thalassemia Screening):</b> High Performance Liquid Chromatography to exclude
                Beta-Thalassemia carriers and abnormal hemoglobin variants.
              </li>
              <li>
                <b>550-band cytogenetic karyotyping:</b> Chromosomal analysis (46,XX or 46,XY) to confirm normal
                chromosome structure and count.
              </li>
              <li>
                <b>Mandatory 180-day cryo-quarantine:</b> Cryopreservation in liquid nitrogen with repeat negative
                infectious disease testing prior to clinical release.
              </li>
            </ul>

            {/* Include Your Clinician Section */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Include Your Clinician
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              We recommend that all our aspiring parents discuss their selected donor&apos;s genetic and health
              report with their treating reproductive endocrinologist or fertility provider, who may advise
              reviewing and cross-referencing donor genetic results with those of the intended parents or partner.
            </p>

            <p className="mt-3 text-base leading-relaxed text-[#555]">
              Our clinical coordinators and match desk are always available to transmit certified medical sheets
              directly to your treating ART clinic&apos;s embryology laboratory. As an aspiring parent, you also
              have the ability to request customized carrier screening panels if recommended by your fertility specialist.
            </p>

            <p className="mt-4 text-sm text-[#555] bg-gray-50 border border-gray-200 rounded-xl p-4">
              If you have questions about Mediyaz ART Bank&apos;s genetic testing or want to coordinate clinical
              allocations with your treating hospital, you can speak to your doctor or{" "}
              <Link href="/contacts" className="text-[#285b63] font-bold underline hover:text-[#ff7468]">
                contact Mediyaz ART Bank
              </Link>{" "}
              at <b>+91 98765 43210</b>.
            </p>

            {/* Finding a Donor's Identity / Legal Anonymity */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Donor Identity &amp; Statutory Legal Protections
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              In accordance with Section 27 and Section 28 of the <b>Assisted Reproductive Technology (Regulation) Act, 2021</b>,
              gamete donation in India operates under strict statutory non-identifying protections:
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  1. Perpetual Legal Anonymity (Section 28)
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  The ART Bank and clinic are strictly prohibited by Indian law from divulging the personal name,
                  photograph, address, or contact details of the donor to the intending parents or resulting child.
                  Likewise, the identity of the recipient family is never disclosed to the donor, ensuring complete
                  mutual privacy.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  2. Comprehensive Non-Identifying Profile Access
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  Intending parents have full access to non-identifying phenotypic and clinical data, including height,
                  blood group, eye color, skin complexion, hair texture, educational qualifications, occupational field,
                  aptitudes, and complete 3-generation medical pedigrees.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-5 bg-white">
                <h4 className="font-bold text-[#285b63] text-base mb-1">
                  3. Central Registry Tracking (Section 27)
                </h4>
                <p className="text-sm text-[#555] leading-relaxed">
                  All donations are systematically logged in the National ART and Surrogacy Registry to enforce
                  single-lifetime donation limits, biometric deduplication, and full regulatory transparency.
                </p>
              </div>
            </div>

            {/* Ethnic & Cultural Preferences */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Ethnic &amp; Cultural Preferences
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Cultural heritage plays a meaningful role in many families&apos; donor journey, which is why we
              maintain a wide selection of donor profiles representing diverse linguistic, regional, and ancestral
              backgrounds across India:
            </p>

            <p className="mt-3 text-base leading-relaxed text-[#555]">
              Families looking for ties to their North Indian ancestry (Delhi, Punjab, Haryana, Uttar Pradesh, Rajasthan),
              South Indian heritage (Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala), East/Northeast Indian roots,
              or West Indian communities (Maharashtra, Gujarat) can explore matched phenotypic profiles with details on
              mother tongue and regional ancestry.
            </p>

            {/* Specialized Donor Traits */}
            <h2 className="mt-12 font-serif text-2xl sm:text-3xl font-normal text-[#285b63]">
              Specialized Donor Traits &amp; Characteristics
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Beyond cultural background, many families also prioritize specific attributes when choosing a donor:
            </p>

            <ul className="mt-3 space-y-2 text-sm sm:text-base text-[#555] list-disc pl-5">
              <li>
                <b>Intellect &amp; Academic Background:</b> Our database features donors holding Bachelor&apos;s,
                Master&apos;s, and Doctorate degrees in engineering, medicine, data science, humanities, and business.
              </li>
              <li>
                <b>Physical Characteristics:</b> Detailed records of height (tall, medium, petite), build (athletic,
                slender, medium), skin tone, eye color, and fitness background.
              </li>
              <li>
                <b>Blood Group Matching:</b> Complete ABO and Rh typing (O+, A+, B+, AB+, and negative factors) to
                align with medical and family requirements.
              </li>
            </ul>

            {/* Bottom Actions Bar */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link
                href="/donors"
                className="rounded-xl bg-[#ff7468] px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#ff5242] flex items-center gap-1.5"
              >
                <span>Browse Our Donors Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacts"
                className="rounded-xl border border-[#285b63] bg-white px-8 py-3 text-xs sm:text-sm font-bold text-[#285b63] transition hover:bg-[#edf3f1]"
              >
                Consult Our Medical Team
              </Link>
            </div>
          </article>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="space-y-8">
            {/* Sticky Get Started CTA Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-[#1d3840]">
                <Image
                  src="/img/aspiring_parent_3.1.png"
                  alt="Find Your Donor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff7468]">
                  Verified Catalog
                </span>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mt-1">
                  Get Started
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#555] leading-relaxed">
                  Search our diverse database of rigorously screened donors to find the best fit for your family.
                </p>
                <Link
                  href="/donors"
                  className="mt-4 inline-block w-full text-center rounded-xl bg-[#ff7468] py-2.5 text-xs font-bold text-white transition hover:bg-[#ff5d50] shadow-xs"
                >
                  Find a Donor
                </Link>
              </div>
            </div>

            {/* Testimonial / Patient Story Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/img/testimonial-1.png"
                  alt="Success Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff7468]">
                  Success Stories
                </div>
                <blockquote className="mt-2 text-xs sm:text-sm italic text-[#555] leading-relaxed">
                  &ldquo;Mediyaz ART Bank had multiple donors that matched our criteria. Having full Thalassemia HPLC
                  and karyotype reports gave our doctor and us total confidence.&rdquo;
                </blockquote>
                <p className="mt-3 text-xs font-bold text-[#285b63]">
                  — Anonymous Aspiring Parent, Delhi NCR
                </p>
              </div>
            </div>

            {/* Parent Resources Navigation Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#285b63] font-serif mb-4">
                Parent Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/aspiring-parents"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → For Aspiring Parents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donors"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Find a Donor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/assurance-programs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Assurance &amp; Quality
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/financing"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Financing Options
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/genetic-screening"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Genetic Screening
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aspiring-parents/faqs"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Aspiring Parent FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donor-request"
                    className="block py-1 text-[#285b63] hover:text-[#ff7468] font-medium transition"
                  >
                    → Requisition a Donor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Match Desk Helpline Card */}
            <div className="rounded-2xl border border-[#285b63]/20 bg-[#edf3f1] p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#285b63]">
                <Phone className="w-4 h-4 text-[#ff7468]" />
                <span>Clinical Match Desk</span>
              </div>
              <p className="mt-2 text-xs text-[#555] leading-relaxed">
                Need guidance on donor phenotype matching or coordinating with your treating IVF clinic?
              </p>
              <div className="mt-3 text-base font-bold text-[#1d3840]">
                +91 98765 43210
              </div>
              <Link
                href="/contacts"
                className="mt-3 inline-block w-full text-center rounded-xl border border-[#285b63] bg-white py-2 text-xs font-bold text-[#285b63] hover:bg-[#285b63] hover:text-white transition"
              >
                Send Us a Message
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
