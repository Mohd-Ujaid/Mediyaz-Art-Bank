"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception safely to client telemetry or console without revealing secrets
    console.error("[Application Boundary Error]:", error?.message || "Unexpected error");
  }, [error]);

  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#edf3f1]/40 px-6 py-20">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff7468]">
            Notice — An Error Occurred
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d3840] font-normal leading-tight">
            We encountered an unexpected issue
          </h1>
          <p className="text-sm text-[#555] leading-relaxed max-w-md mx-auto">
            Our technical team has been notified. You can try refreshing this action or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#285b63] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d464d] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-xs font-bold text-[#444] shadow-xs transition hover:bg-gray-50"
          >
            <Home className="w-3.5 h-3.5" />
            Return to Homepage
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-[#777]">
            For clinical assistance or urgent inquiries, contact Mediyaz Desk at{" "}
            <span className="font-bold text-[#285b63]">+91 9667780807</span>
          </p>
        </div>
      </div>
    </main>
  );
}
