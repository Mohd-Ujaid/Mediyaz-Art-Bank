"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function AgentDashboardRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (code) {
      router.replace(`/refer-partner/dashboard?code=${encodeURIComponent(code)}`);
    } else {
      router.replace("/refer-partner/dashboard");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-50">
      <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      <p className="text-xs font-semibold text-slate-600">Redirecting to Refer Partner Portal...</p>
    </div>
  );
}

export default function AgentDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
      }
    >
      <AgentDashboardRedirect />
    </Suspense>
  );
}
