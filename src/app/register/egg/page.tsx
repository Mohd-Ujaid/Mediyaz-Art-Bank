"use client";

import { useSearchParams } from "next/navigation";
import { EggRegistrationForm } from "@/features/egg-registration/components/EggRegistrationForm";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";

function EggRegisterContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId") || searchParams.get("id") || undefined;

  return (
    <div>
      {/* Top Header Banner */}
      {/* <div className="text-center mb-6 max-w-4xl mx-auto px-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold tracking-wider text-rose-700 bg-rose-50 border border-rose-200 rounded-full mb-3 uppercase shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" /> ART Act 2021 Compliant Oocyte Bank
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-[#1d3840]">
          Egg Donor Registration
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#555] max-w-2xl mx-auto leading-relaxed">
          Official clinical registration form for voluntary female egg donors. Includes mandatory statutory husband consent and obstetric records under Section 27 of ART Act 2021.
        </p>
      </div> */}

      <EggRegistrationForm draftId={draftId} />
    </div>
  );
}

export default function EggDonorRegisterPage() {
  return (
    <div className="bg-[#edf3f1]/40 min-h-screen py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-t-[#285b63] border-gray-200 rounded-full animate-spin" />
        </div>
      }>
        <EggRegisterContent />
      </Suspense>
    </div>
  );
}
