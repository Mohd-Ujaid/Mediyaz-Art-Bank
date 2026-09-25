"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Users,
  Copy,
  Check,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building2,
  Phone,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Share2,
  IndianRupee,
  Save,
  Loader2,
  Calendar,
  MapPin,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function ReferPartnerDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Filter & Search in Donors Table
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"donors" | "payouts" | "bank">("donors");

  // Bank & Payout Editing Form State
  const [bankForm, setBankForm] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });
  const [savingBank, setSavingBank] = useState(false);

  useEffect(() => {
    const urlCode = searchParams?.get("code")?.trim().toUpperCase();
    let savedCode = "";
    try {
      savedCode =
        localStorage.getItem("mediyaz_partner_code") ||
        localStorage.getItem("mediyaz_refer_id") ||
        localStorage.getItem("mediyaz_agent_code") ||
        "";
    } catch {}

    const targetCode = urlCode || savedCode;
    if (targetCode) {
      setActiveCode(targetCode);
      fetchDashboard(targetCode);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchDashboard = async (code: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/agents/dashboard?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setDashboardData(data);
        setActiveCode(code);
        try {
          localStorage.setItem("mediyaz_partner_code", code);
          localStorage.setItem("mediyaz_refer_id", code);
        } catch {}

        if (data.agent?.bankDetails) {
          setBankForm({
            accountHolderName: data.agent.bankDetails.accountHolderName || data.agent.fullName || "",
            bankName: data.agent.bankDetails.bankName || "",
            accountNumber: data.agent.bankDetails.accountNumber || "",
            ifscCode: data.agent.bankDetails.ifscCode || "",
            upiId: data.agent.bankDetails.upiId || "",
          });
        }
      } else {
        setError(data.error || "Failed to load Refer Partner profile.");
        setDashboardData(null);
      }
    } catch {
      setError("Network connection error. Please try again.");
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("mediyaz_partner_code");
      localStorage.removeItem("mediyaz_refer_id");
      localStorage.removeItem("mediyaz_agent_code");
      document.cookie = "mediyaz_partner_code=; Max-Age=0; path=/;";
    } catch {}
    setActiveCode(null);
    setDashboardData(null);
    router.push("/refer-partner");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleSaveBankDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCode) return;
    setSavingBank(true);
    try {
      const res = await fetch("/api/agents/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentCode: activeCode,
          bankDetails: bankForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Payout bank & UPI details updated successfully!");
        fetchDashboard(activeCode);
      } else {
        toast.error(data.error || "Failed to update payout details.");
      }
    } catch {
      toast.error("Network error while updating details.");
    } finally {
      setSavingBank(false);
    }
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://mediyaz.org";

  // If no partner session found
  if (!activeCode || (!loading && !dashboardData)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-white py-16 px-4">
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
            <Users className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Refer Partner Portal</h1>
          <p className="text-xs text-slate-500">
            Please sign in to access your Egg Donor referrals, clinical screening updates, and clinic payments.
          </p>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-4">
            {error && (
              <div className="p-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl">
                {error}
              </div>
            )}

            <Link href="/refer-partner" className="block">
              <Button className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-11">
                Sign In to Partner Portal &rarr;
              </Button>
            </Link>

            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don&apos;t have a Refer ID yet?{" "}
                <Link href="/refer-partner" className="font-bold text-teal-600 hover:underline">
                  Register as a Partner
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-50">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Loading your Partner Dashboard...</p>
      </div>
    );
  }

  const { agent, stats, donors } = dashboardData;
  const partnerCode = agent.referName || agent.agentCode;
  const eggReferralLink = `${baseUrl}/register/egg?ref=${partnerCode}`;
  const whatsappShareText = encodeURIComponent(
    `Hello! If you are interested in becoming an Egg Donor with Mediyaz ART Fertility Bank, please use our clinic registration link (Refer Name ${partnerCode} is pre-applied): ${eggReferralLink}`
  );

  // Filtered donors list
  const filteredDonors = donors.filter((d: any) => {
    if (statusFilter !== "all") {
      if (statusFilter === "PAID" && d.payoutStatus !== "PAID") return false;
      if (statusFilter === "PENDING" && d.payoutStatus === "PAID") return false;
      if (statusFilter === "APPROVED" && d.registrationStatus !== "APPROVED") return false;
      if (statusFilter === "SUBMITTED" && !["SUBMITTED", "UNDER_REVIEW"].includes(d.registrationStatus)) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        d.registrationId?.toLowerCase().includes(q) ||
        d.maskedName?.toLowerCase().includes(q) ||
        d.city?.toLowerCase().includes(q) ||
        d.bloodGroup?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md shadow-teal-600/20">
              {agent.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">{agent.fullName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-50 text-teal-700 border border-teal-200">
                  {agent.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Egg Donor Partner
                </span>
              </div>
              <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                <span>{agent.agencyName || "Independent Partner"}</span>
                {agent.city && <span>• {agent.city}, {agent.state}</span>}
                <span>• +91 {agent.mobileNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchDashboard(agent.agentCode)}
              className="rounded-xl text-xs h-9 border-slate-200 text-slate-600 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-xs h-9 border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Egg Donor Referral Banner & 1-Click Link */}
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-900/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-5 space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-md border border-white/20 text-teal-100">
              Official Referral Partner
            </span>
            <h2 className="text-2xl font-black">Your Refer Name</h2>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-3xl font-black tracking-widest font-mono bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
                {partnerCode}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(partnerCode, "code")}
                className="p-3 rounded-2xl bg-white text-teal-800 hover:bg-teal-50 transition-transform active:scale-95 shadow-md cursor-pointer font-bold text-xs flex items-center gap-1"
              >
                {copiedLink === "code" ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                Copy Refer Name
              </button>
            </div>
            <p className="text-xs text-teal-100/80 pt-1">
              Egg donor candidates select <span className="font-bold text-white">&quot;Refer&quot;</span> and enter Refer Name <span className="font-mono font-bold text-white">{partnerCode}</span> during registration.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
              <span className="font-bold text-rose-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                Direct Egg Donor Referral Link
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${whatsappShareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3 h-3" /> WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(eggReferralLink, "egg")}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLink === "egg" ? <Check className="w-3 h-3 text-teal-300" /> : <Copy className="w-3 h-3" />}
                  Copy Link
                </button>
              </div>
            </div>
            <p className="text-[11px] font-mono text-teal-100/80 bg-black/20 p-2.5 rounded-xl truncate">
              {eggReferralLink}
            </p>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-teal-100 pt-1">
              <span className="font-semibold">
                Clinic Reward: <span className="text-emerald-300 font-bold">₹{stats.eggDonorCommission.toLocaleString()}</span> / approved egg donor
              </span>
              <span className="text-teal-200/90 flex items-center gap-1">
                <HeartHandshake className="w-3 h-3" /> Paid directly by Mediyaz ART Clinic
              </span>
            </div>
          </div>

        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Egg Donors Sent</p>
            <p className="text-3xl font-black text-slate-900">{stats.totalEggDonors}</p>
            <p className="text-[11px] text-slate-500 pt-0.5">Candidates sent to our clinic</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-600">Approved Donors</p>
            <p className="text-3xl font-black text-teal-600">{stats.approvedDonors}</p>
            <p className="text-[11px] text-slate-500 pt-0.5">Cleared clinical &amp; ART screening</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Payments Received</p>
            <p className="text-3xl font-black text-emerald-600">₹{stats.paidPayout.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500 pt-0.5">Transferred by clinic to your bank</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Pending Clinic Payout</p>
            <p className="text-3xl font-black text-amber-600">₹{stats.pendingPayout.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500 pt-0.5">Under processing by clinic accounts</p>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 text-xs font-bold gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("donors")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "donors"
                ? "border-b-2 border-teal-600 text-teal-700 font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" /> Referred Egg Donors ({stats.totalEggDonors})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payouts")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "payouts"
                ? "border-b-2 border-teal-600 text-teal-700 font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Clinic Payments &amp; Payouts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className={`pb-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "bank"
                ? "border-b-2 border-teal-600 text-teal-700 font-extrabold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" /> Payout Bank &amp; UPI Details
          </button>
        </div>

        {/* TAB 1: REFERRED EGG DONORS */}
        {activeTab === "donors" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            
            {/* Table Controls */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by ID, name, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 text-xs rounded-xl bg-slate-50/50 border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="all">All Registrations</option>
                  <option value="APPROVED">Approved Profiles</option>
                  <option value="SUBMITTED">Under Screening</option>
                  <option value="PAID">Clinic Paid</option>
                  <option value="PENDING">Payment Pending</option>
                </select>
              </div>
            </div>

            {/* Table Content */}
            {filteredDonors.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-500 space-y-2">
                <Users className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-700">No egg donor referrals found.</p>
                <p>Share your Refer Name or direct referral link with prospective donors to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Registration ID</th>
                      <th className="p-3.5">Candidate Name</th>
                      <th className="p-3.5">Location &amp; Blood</th>
                      <th className="p-3.5">Date Referred</th>
                      <th className="p-3.5">Clinical Status</th>
                      <th className="p-3.5">Clinic Reward</th>
                      <th className="p-3.5">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDonors.map((donor: any) => (
                      <tr key={donor.registrationId} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-teal-800">
                          {donor.registrationId}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {donor.maskedName}
                        </td>
                        <td className="p-3.5 text-slate-600">
                          {donor.city} • <span className="font-semibold">{donor.bloodGroup}</span>
                        </td>
                        <td className="p-3.5 text-slate-500">
                          {donor.createdAt ? new Date(donor.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              donor.registrationStatus === "APPROVED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : donor.registrationStatus === "UNDER_REVIEW"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : donor.registrationStatus === "DRAFT"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {donor.registrationStatus}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          ₹{donor.payoutAmount?.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          {donor.payoutStatus === "PAID" ? (
                            <div>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3" /> Paid by Clinic
                              </span>
                              {donor.paymentReference && (
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  Ref: {donor.paymentReference}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1 w-fit">
                              <Clock className="w-3 h-3" /> PENDING
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CLINIC PAYMENTS & FINANCIALS */}
        {activeTab === "payouts" && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Clinic Payment Summary</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    All referral payouts are calculated and paid directly by Mediyaz ART Fertility Clinic.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                  Fixed Reward: ₹{stats.eggDonorCommission.toLocaleString()} per Approved Egg Donor
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Value Generated</p>
                  <p className="text-2xl font-black text-slate-900">₹{stats.totalEarnings.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">Across {stats.totalEggDonors} referred egg donor applications</p>
                </div>

                <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Total Received (Paid)</p>
                  <p className="text-2xl font-black text-emerald-700">₹{stats.paidPayout.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-600">Directly transferred to your bank/UPI</p>
                </div>

                <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Balance Pending</p>
                  <p className="text-2xl font-black text-amber-700">₹{stats.pendingPayout.toLocaleString()}</p>
                  <p className="text-[10px] text-amber-600">Scheduled for payment upon screening</p>
                </div>
              </div>
            </div>

            {/* Payout records list */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h4 className="text-sm font-black text-slate-900">Payment Breakdown by Referral</h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Registration ID</th>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Clinic Status</th>
                      <th className="p-3.5">Payment Date / Ref</th>
                      <th className="p-3.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donors.map((d: any) => (
                      <tr key={d.registrationId} className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-mono font-bold text-teal-800">{d.registrationId}</td>
                        <td className="p-3.5 font-semibold text-slate-800">{d.maskedName}</td>
                        <td className="p-3.5 font-bold text-slate-900">₹{d.payoutAmount?.toLocaleString()}</td>
                        <td className="p-3.5">
                          {d.payoutStatus === "PAID" ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              PAID
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              PENDING
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-600">
                          {d.paidAt ? (
                            <div>
                              <span>{new Date(d.paidAt).toLocaleDateString()}</span>
                              {d.paymentReference && (
                                <p className="text-[10px] text-slate-400 font-mono">{d.paymentReference}</p>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400">Awaiting clearance</span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-500">{d.paymentNotes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PAYOUT BANK & UPI DETAILS */}
        {activeTab === "bank" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
            
            <div>
              <h3 className="text-lg font-black text-slate-900">Payout Bank &amp; UPI Settings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our clinic accounts team will disburse all your referral payments directly to this account.
              </p>
            </div>

            <form onSubmit={handleSaveBankDetails} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Account Holder Name</label>
                <Input
                  type="text"
                  placeholder="Full name as per bank records"
                  value={bankForm.accountHolderName}
                  onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })}
                  className="rounded-xl h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bank Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. HDFC Bank, SBI"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className="rounded-xl h-10"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Account Number</label>
                  <Input
                    type="text"
                    placeholder="Account Number"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    className="rounded-xl h-10 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">IFSC Code</label>
                  <Input
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    value={bankForm.ifscCode}
                    onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase() })}
                    className="rounded-xl h-10 font-mono uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">UPI ID (Instant Payout)</label>
                  <Input
                    type="text"
                    placeholder="e.g. yourname@okaxis"
                    value={bankForm.upiId}
                    onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                    className="rounded-xl h-10 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={savingBank}
                  className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold h-11 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {savingBank ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Payout Details...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Update Payout Details
                    </>
                  )}
                </Button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}

export default function ReferPartnerDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
      }
    >
      <ReferPartnerDashboardContent />
    </Suspense>
  );
}
