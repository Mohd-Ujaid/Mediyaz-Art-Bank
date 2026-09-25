import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, BookOpen, Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#edf3f1]/40 px-6 py-20">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#edf3f1] flex items-center justify-center text-[#285b63]">
          <ShieldAlert className="w-8 h-8 text-[#285b63]" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff7468]">
            Error 404 — Page Not Found
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d3840] font-normal leading-tight">
            We couldn&apos;t find the page you&apos;re looking for
          </h1>
          <p className="text-sm text-[#555] leading-relaxed max-w-md mx-auto">
            The page may have moved, or the link may be outdated. Please use the links below to navigate our registered ART Bank services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#285b63] px-4 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d464d]"
          >
            <Home className="w-3.5 h-3.5" />
            Homepage
          </Link>
          <Link
            href="/for-donors"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#285b63] bg-white px-4 py-3 text-xs font-bold text-[#285b63] shadow-xs transition hover:bg-[#edf3f1]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            For Donors
          </Link>
          <Link
            href="/clinics"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-[#444] shadow-xs transition hover:bg-gray-50"
          >
            <Building2 className="w-3.5 h-3.5" />
            For Clinics
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-[#777]">
            Need immediate clinical support? Call our helpline at{" "}
            <span className="font-bold text-[#285b63]">+91 9667780807</span>
          </p>
        </div>
      </div>
    </main>
  );
}
