"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#edf3f1]/60 font-sans text-[#414141] antialiased">
        <main className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#1d3840]">
                Service Temporarily Unavailable
              </h1>
              <p className="text-sm text-[#666]">
                An unexpected system issue occurred. Please click below to reload the application.
              </p>
            </div>

            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#285b63] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d464d] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reload Application
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
