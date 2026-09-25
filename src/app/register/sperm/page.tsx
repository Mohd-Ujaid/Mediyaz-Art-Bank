"use client";

import { useSearchParams } from "next/navigation";
import { SpermRegistrationForm } from "@/features/sperm-registration/components/SpermRegistrationForm";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";

function SpermRegisterContent() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get("id") || undefined;

  return (
    <div>
      {/* Top Header Banner */}
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

export default function SpermDonorRegisterPage() {
  return (
    <div className="bg-[#edf3f1]/40 min-h-screen py-12">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-t-[#285b63] border-gray-200 rounded-full animate-spin" />
        </div>
      }>
        <SpermRegisterContent />
      </Suspense>
    </div>
  );
}
