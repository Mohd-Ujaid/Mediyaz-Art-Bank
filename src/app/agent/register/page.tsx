"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AgentRegisterRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/refer-partner");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-50">
      <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      <p className="text-xs font-semibold text-slate-600">Redirecting to Refer Partner Program...</p>
    </div>
  );
}
