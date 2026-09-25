"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Loader2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
];

export default function ReferPartnerPage() {
  const router = useRouter();

  // Mode: "signin" | "signup"
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Sign In state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign Up state
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");

  const [customReferName, setCustomReferName] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [registeredPartner, setRegisteredPartner] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Handle Partner Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginIdentifier.trim()) {
      toast.error("Please enter your Refer Name (e.g. PRIYASHARMA) or 10-digit mobile number.");
      return;
    }

    setLoginLoading(true);
    try {
      const res = await fetch("/api/agents/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginIdentifier.trim(),
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Sign in successful!");
        try {
          localStorage.setItem("mediyaz_partner_code", data.agent.agentCode);
          localStorage.setItem("mediyaz_refer_id", data.agent.agentCode);
        } catch {}
        router.push(`/refer-partner/dashboard?code=${data.agent.agentCode}`);
      } else {
        toast.error(data.error || "Sign in failed. Please verify credentials.");
      }
    } catch {
      toast.error("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Partner Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/[^0-9]/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit mobile phone number.");
      return;
    }
    if (!password.trim() || password.length < 4) {
      toast.error("Please set a password / security PIN (minimum 4 characters).");
      return;
    }
    if (!city.trim()) {
      toast.error("Please enter your city.");
      return;
    }
    if (!state.trim()) {
      toast.error("Please select your state.");
      return;
    }

    setSignupLoading(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          referName: customReferName.trim(),
          mobileNumber: mobileNumber.trim(),
          email: email.trim(),
          password: password.trim(),
          agencyName: agencyName.trim(),
          city: city.trim(),
          state: state.trim(),
          bankDetails: {
            accountHolderName: accountHolderName.trim() || fullName.trim(),
            bankName: bankName.trim(),
            accountNumber: accountNumber.trim(),
            ifscCode: ifscCode.trim().toUpperCase(),
            upiId: upiId.trim(),
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRegisteredPartner(data.agent);
        try {
          localStorage.setItem("mediyaz_partner_code", data.agent.agentCode);
          localStorage.setItem("mediyaz_refer_id", data.agent.agentCode);
        } catch {}
        toast.success(data.message || "Referral Partner registration successful!");
      } else {
        toast.error(data.error || "Failed to register partner.");
      }
    } catch {
      toast.error("Network connection error. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://mediyaz.org";

  // If partner just registered, show their new Refer Name with a direct link to their Dashboard
  if (registeredPartner) {
    const referId = registeredPartner.referName || registeredPartner.agentCode;
    const eggLink = `${baseUrl}/register/egg?ref=${referId}`;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/30 to-white py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white rounded-3xl border border-teal-100 p-8 shadow-xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/60 mb-2">
                Official Mediyaz Refer Partner Program
              </span>
              <h1 className="text-2xl font-black text-slate-900">
                Partner Registration Successful!
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Welcome {registeredPartner.fullName}. Your unique Refer Name has been generated and activated.
              </p>
            </div>

            {/* Refer Name Display */}
            <div className="p-6 bg-gradient-to-br from-teal-500/10 via-slate-50 to-white border-2 border-teal-500/30 rounded-2xl space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Your Unique Refer Name
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-black tracking-widest text-teal-800 font-mono">
                  {referId}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(referId, "code")}
                  className="p-2 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 transition-colors shadow-xs cursor-pointer"
                  title="Copy Refer Name"
                >
                  {copiedLink === "code" ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Prospective egg donor candidates select <span className="font-semibold text-slate-700">&quot;Refer&quot;</span> and enter Refer Name <span className="font-mono font-bold text-teal-700">{referId}</span> during registration.
              </p>
            </div>

            {/* 1-Click Egg Donor Referral Link */}
            <div className="space-y-2 text-left">
              <p className="text-xs font-bold text-slate-700">1-Click Auto-Fill Egg Donor Referral Link</p>
              
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-rose-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Egg Donor Link (Auto-fills Refer Name)
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(eggLink, "egg")}
                    className="text-[11px] font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLink === "egg" ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                  </button>
                </div>
                <p className="text-[11px] font-mono text-slate-500 truncate">{eggLink}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Link href={`/refer-partner/dashboard?code=${referId}`} className="w-full">
                <Button className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-11 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-600/20">
                  Open Partner Dashboard &rarr;
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full rounded-xl text-xs h-10 border-slate-200 text-slate-600 cursor-pointer">
                  Back to Home
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-white py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 shadow-xs">
            Egg Donor Referral Partner Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Partner with Mediyaz ART Clinic
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Refer qualified Egg Donor candidates to our clinical fertility bank. Track your referrals, screening milestones, and receive guaranteed payouts directly from our clinic accounts.
          </p>
        </div>

        {/* Auth Mode Toggle: Sign In vs Register */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setAuthMode("signin")}
              className={`flex-1 py-4 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                authMode === "signin"
                  ? "bg-white text-teal-700 border-b-2 border-teal-600 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Lock className="w-4 h-4" /> Sign In to Partner Portal
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className={`flex-1 py-4 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                authMode === "signup"
                  ? "bg-white text-teal-700 border-b-2 border-teal-600 font-black shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" /> Register as New Partner
            </button>
          </div>

          {/* SIGN IN FORM */}
          {authMode === "signin" && (
            <div className="p-6 sm:p-10 max-w-md mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-black text-slate-900">Welcome Back</h2>
                <p className="text-xs text-slate-500">
                  Access your referred egg donors, screening status, and clinic payout history.
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Refer Name or Mobile Number *</label>
                  <Input
                    type="text"
                    placeholder="e.g. PRIYASHARMA or 9876543210"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="h-11 rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700">Password / PIN *</label>
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter your partner password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-11 rounded-xl text-xs"
                  />
                  <p className="text-[11px] text-slate-400">
                    If created by clinic admin without a password, enter your desired password to set it.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-11 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-600/20 mt-2"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying Account...
                    </>
                  ) : (
                    <>
                      Sign In to Dashboard &rarr;
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  New to the program?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className="font-bold text-teal-600 hover:underline cursor-pointer"
                  >
                    Register as Refer Partner
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* SIGN UP FORM */}
          {authMode === "signup" && (
            <form onSubmit={handleSignUp} className="p-6 sm:p-10 space-y-6">
              
              {/* Personal & Organization Details */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Partner Information
                  </h3>
                  <p className="text-xs text-slate-400">Provide your basic contact information to generate your Refer ID.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Mobile Number (10 Digits) *</label>
                    <Input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <Input
                      type="email"
                      placeholder="rajesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Create Password / PIN *</label>
                    <Input
                      type="password"
                      placeholder="Minimum 4 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Agency / Clinic Name (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g. LifeCare Fertility"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Choose Unique Refer Name (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g. PRIYASHARMA (Auto-created if left blank)"
                      value={customReferName}
                      onChange={(e) => setCustomReferName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toUpperCase())}
                      className="rounded-xl h-10 text-xs font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">City *</label>
                    <Input
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payout Bank & UPI Details */}
              <div className="space-y-4 pt-2">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    Payout Bank &amp; UPI Details (Where Clinic Sends Payments)
                  </h3>
                  <p className="text-xs text-slate-400">
                    All referral rewards (₹5,000 / approved egg donor) will be deposited directly to this account by Mediyaz ART Clinic.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Account Holder Name</label>
                    <Input
                      type="text"
                      placeholder="Name as per bank records"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Bank Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. HDFC Bank, SBI, ICICI"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="rounded-xl h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Account Number</label>
                    <Input
                      type="text"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="rounded-xl h-10 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">IFSC Code</label>
                    <Input
                      type="text"
                      placeholder="e.g. HDFC0001234"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      className="rounded-xl h-10 text-xs font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">UPI ID (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g. mobile@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="rounded-xl h-10 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100">
                <Button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-11 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-teal-600/20"
                >
                  {signupLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Registering Partner...
                    </>
                  ) : (
                    <>
                      Complete Registration &amp; Get Refer Name &rarr;
                    </>
                  )}
                </Button>
              </div>

            </form>
          )}

        </div>

        {/* Footer Support Info */}
        <div className="text-center text-xs text-slate-400 space-y-1">
          <p>Mediyaz ART Fertility Bank • Indian ART (Regulation) Act 2021 Clinical Compliance</p>
          <p>For referral queries or account support, contact our clinic partner desk at <span className="font-semibold text-slate-600">partners@mediyaz.org</span></p>
        </div>

      </div>
    </div>
  );
}
