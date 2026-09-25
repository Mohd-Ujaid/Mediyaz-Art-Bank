"use client";

import { useSearchParams } from "next/navigation";
import { SpermRegistrationForm } from "@/features/sperm-registration/components/SpermRegistrationForm";
import { EggRegistrationForm } from "@/features/egg-registration/components/EggRegistrationForm";
import { Suspense } from "react";
import { ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, Dna, Baby } from "lucide-react";
import Link from "next/link";

function RegisterContent() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type");
  const draftId = searchParams.get("draftId") || searchParams.get("id") || undefined;

  if (rawType === "egg") {
    return (
      <div>
        <div className="text-center mb-6 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-200 rounded-full mb-3 uppercase shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" /> ART Act 2021 Compliant Oocyte Bank
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-[#1d3840]">
            Egg Donor Registration
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#555] max-w-2xl mx-auto leading-relaxed">
            Official clinical registration form for voluntary female egg donors. Includes mandatory statutory husband consent and obstetric records under Section 27 of ART Act 2021.
          </p>
        </div>
        <EggRegistrationForm draftId={draftId} />
      </div>
    );
  }

  if (rawType === "sperm") {
    return (
      <div>
        <div className="text-center mb-6 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#285b63] bg-[#285b63]/10 border border-[#285b63]/20 rounded-full mb-3 uppercase shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" /> ART Act 2021 Compliant Semen Bank
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-[#1d3840]">
            Sperm Donor Registration
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#555] max-w-2xl mx-auto leading-relaxed">
            Official clinical registration form for voluntary male semen donors. Certified ART bank semen cryopreservation with statutory 180-day cryogenic quarantine.
          </p>
        </div>
        <SpermRegistrationForm draftId={draftId} />
      </div>
    );
  }

  // Selection Landing Screen for /register
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#285b63] bg-[#285b63]/10 border border-[#285b63]/20 rounded-full mb-3 uppercase">
          <ShieldCheck className="w-3.5 h-3.5" /> Ministry of Health & Family Welfare — ART Act 2021
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1d3840]">
          Donor Registry Portal
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Please select your intended donor program to access the dedicated statutory registration form.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sperm Donor Option */}
        <div className="rounded-2xl border border-teal-200 bg-white p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#285b63]/10 text-[#285b63] flex items-center justify-center">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#285b63] bg-[#285b63]/10 px-2 py-0.5 rounded">Male Donor</span>
              <h2 className="text-xl font-bold text-[#1d3840] mt-1.5">Sperm Donor Registration</h2>
              <p className="text-xs text-gray-600 mt-1">
                For voluntary male semen donors registering for ART bank cryopreservation and statutory 180-day quarantine.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Age eligibility: <strong>21 to 55 years</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Comprehensive semen analysis & viral screening</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Statutory cryogenic preservation protocol</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/register/sperm"
              className="w-full flex items-center justify-center gap-2 bg-[#285b63] hover:bg-[#1d464d] text-white font-bold text-xs py-3 px-6 rounded-xl transition"
            >
              Start Sperm Donor Registration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Egg Donor Option */}
        <div className="rounded-2xl border border-rose-200 bg-white p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">Female Donor</span>
              <h2 className="text-xl font-bold text-[#1d3840] mt-1.5">Egg Donor Registration</h2>
              <p className="text-xs text-gray-600 mt-1">
                For voluntary female oocyte donors registering under Section 27 of the ART Act 2021 with statutory consent records.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Age eligibility: <strong>23 to 35 years</strong> (Statutory)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Ever-married with living child (&ge; 3 years old)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Mandatory husband / spouse consent declaration</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/register/egg"
              className="w-full flex items-center justify-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs py-3 px-6 rounded-xl transition shadow-sm"
            >
              Start Egg Donor Registration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonorRegisterPage() {
  return (
    <div className="bg-[#edf3f1]/40 min-h-screen py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-t-[#285b63] border-gray-200 rounded-full animate-spin" />
        </div>
      }>
        <RegisterContent />
      </Suspense>
    </div>
  );
}
