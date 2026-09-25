"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VERIFIED_DONOR_CATALOG, DonorProfile } from "@/lib/donor-catalog";
import Image from "next/image";

export default function FindDonorPage() {
  // ================= STATE =================
  const [gameteType, setGameteType] = useState<"all" | "egg" | "sperm">("all");
  const [availability, setAvailability] = useState<string>("all");
  const [bloodType, setBloodType] = useState<string>("all");
  const [eyeColor, setEyeColor] = useState<string>("all");
  const [hairColor, setHairColor] = useState<string>("all");
  const [skinTone, setSkinTone] = useState<string>("all");
  const [ethnicity, setEthnicity] = useState<string>("all");
  const [education, setEducation] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mobile filters drawer open state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Comparison drawer state (max 3 donors)
  const [comparedDonorIds, setComparedDonorIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // Selected donor for full profile modal
  const [activeDonorProfile, setactiveDonorProfile] = useState<DonorProfile | null>(null);
  const [activeProfileTab, setactiveProfileTab] = useState<
    "phenotype" | "genetics" | "education" | "pedigree" | "compliance"
  >("phenotype");

  // ================= DYNAMIC DATA FETCHING =================
  const [catalogDonors, setCatalogDonors] = useState<DonorProfile[]>(VERIFIED_DONOR_CATALOG);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLiveDonors() {
      try {
        const res = await fetch("/api/donors");
        const data = await res.json();
        if (data.success && Array.isArray(data.donors) && data.donors.length > 0) {
          setCatalogDonors(data.donors);
        }
      } catch (err) {
        console.error("Failed to load live donors from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveDonors();
  }, []);

  // ================= FILTER & SEARCH LOGIC =================
  const filteredDonors = useMemo(() => {
    let list = [...catalogDonors];

    if (gameteType !== "all") {
      list = list.filter((d) => d.gameteType === gameteType);
    }

    if (availability !== "all") {
      list = list.filter((d) => d.availability === availability);
    }

    if (bloodType !== "all") {
      list = list.filter((d) => d.bloodType.toLowerCase() === bloodType.toLowerCase());
    }

    if (eyeColor !== "all") {
      list = list.filter((d) => d.eyeColor.toLowerCase().includes(eyeColor.toLowerCase()));
    }

    if (hairColor !== "all") {
      list = list.filter((d) => d.hairColor.toLowerCase().includes(hairColor.toLowerCase()));
    }

    if (skinTone !== "all") {
      list = list.filter((d) => d.skinTone.toLowerCase().includes(skinTone.toLowerCase()));
    }

    if (ethnicity !== "all") {
      list = list.filter((d) => d.ethnicity.toLowerCase().includes(ethnicity.toLowerCase()));
    }

    if (education !== "all") {
      list = list.filter((d) => d.educationLevel.toLowerCase().includes(education.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.donorCode.toLowerCase().includes(q) ||
          d.profession.toLowerCase().includes(q) ||
          d.degree.toLowerCase().includes(q) ||
          d.ethnicity.toLowerCase().includes(q) ||
          d.ancestryRegion.toLowerCase().includes(q) ||
          d.motherTongue.toLowerCase().includes(q) ||
          d.talents.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "height-desc":
        list.sort((a, b) => b.heightCm - a.heightCm);
        break;
      case "height-asc":
        list.sort((a, b) => a.heightCm - b.heightCm);
        break;
      case "age-asc":
        list.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        list.sort((a, b) => b.age - a.age);
        break;
      case "featured":
      default:
        break;
    }

    return list;
  }, [
    gameteType,
    availability,
    bloodType,
    eyeColor,
    hairColor,
    skinTone,
    ethnicity,
    education,
    searchQuery,
    sortBy,
  ]);

  // Comparison donors resolution
  const comparedDonors = useMemo(() => {
    return catalogDonors.filter((d) => comparedDonorIds.includes(d.id));
  }, [catalogDonors, comparedDonorIds]);

  const toggleCompare = (id: string) => {
    if (comparedDonorIds.includes(id)) {
      setComparedDonorIds(comparedDonorIds.filter((item) => item !== id));
    } else {
      if (comparedDonorIds.length >= 3) {
        alert("You can compare up to 3 donor profiles side-by-side.");
        return;
      }
      setComparedDonorIds([...comparedDonorIds, id]);
    }
  };

  const resetAllFilters = () => {
    setGameteType("all");
    setAvailability("all");
    setBloodType("all");
    setEyeColor("all");
    setHairColor("all");
    setSkinTone("all");
    setEthnicity("all");
    setEducation("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  const activeFiltersCount = [
    gameteType !== "all",
    availability !== "all",
    bloodType !== "all",
    eyeColor !== "all",
    hairColor !== "all",
    skinTone !== "all",
    ethnicity !== "all",
    education !== "all",
    Boolean(searchQuery.trim()),
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#333] pt-24 pb-20">
      {/* ================= HERO HEADER ================= */}
      <section className="bg-gradient-to-r from-[#173037] via-[#214b53] to-[#285b63] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2d636b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide text-[#95e0b9] backdrop-blur-xs mb-3 border border-white/15">
                <svg className="w-3.5 h-3.5 text-[#ff7468]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ART Act 2021 Verified 
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Find Your Donor Match
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                Explore medical-grade vitrified oocyte (egg) and cryo-quarantined semen (sperm) donor profiles. Every donor is rigorously screened with Thalassemia HPLC, 550-band chromosomal karyotype, infectious serology, and verified 3-generation medical pedigrees.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ff7468]/20 text-[#ff7468] flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs text-gray-300">Art Act 2021 Compliant</div>
                  <div className="text-xs font-bold text-white">100% Verified Donor Profile</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#95e0b9]/20 text-[#95e0b9] flex items-center justify-center font-bold text-sm">
                  🧬
                </div>
                <div>
                  <div className="text-xs text-gray-300">Viral Markers</div>
                  <div className="text-xs font-bold text-white">Negative</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN INTERFACE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TOP CONTROLS BAR */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-4 sm:p-5 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Gamete Type Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setGameteType("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  gameteType === "all"
                    ? "bg-[#285b63] text-white shadow-xs"
                    : "bg-[#edf3f1] text-[#285b63] hover:bg-gray-200"
                }`}
              >
                All Donors ({catalogDonors.length})
              </button>
              <button
                type="button"
                onClick={() => setGameteType("egg")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  gameteType === "egg"
                    ? "bg-[#ff7468] text-white shadow-xs"
                    : "bg-[#edf3f1] text-[#285b63] hover:bg-gray-200"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Egg Donors (Oocytes)
              </button>
              <button
                type="button"
                onClick={() => setGameteType("sperm")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  gameteType === "sperm"
                    ? "bg-[#285b63] text-white shadow-xs"
                    : "bg-[#edf3f1] text-[#285b63] hover:bg-gray-200"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                Sperm Donors (Semen)
              </button>
            </div>

            {/* Search Input & View Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1 sm:w-72">
                <input
                  type="text"
                  placeholder="Search code, profession, heritage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63] focus:ring-1 focus:ring-[#285b63]"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-2 px-3 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 bg-white focus:outline-hidden focus:border-[#285b63]"
                >
                  <option value="featured">Featured Order</option>
                  <option value="height-desc">Height: Tallest First</option>
                  <option value="height-asc">Height: Shortest First</option>
                  <option value="age-asc">Age: Youngest First</option>
                  <option value="age-desc">Age: Oldest First</option>
                </select>
              </div>

              {/* View Mode (Grid vs List) */}
              <div className="hidden sm:flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-2 text-xs font-bold transition ${
                    viewMode === "grid" ? "bg-[#285b63] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title="List View"
                  className={`p-2 text-xs font-bold transition ${
                    viewMode === "list" ? "bg-[#285b63] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden px-3 py-2 rounded-xl bg-[#edf3f1] text-[#285b63] text-xs font-bold flex items-center gap-1.5 hover:bg-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>
            </div>
          </div>

          {/* Active Filter Chips & Clear All */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Active Filters:</span>
              {gameteType !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  {gameteType === "egg" ? "Oocytes" : "Semen"} Donors
                  <button onClick={() => setGameteType("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {availability !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Status: {availability}
                  <button onClick={() => setAvailability("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {bloodType !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Blood: {bloodType}
                  <button onClick={() => setBloodType("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {eyeColor !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Eyes: {eyeColor}
                  <button onClick={() => setEyeColor("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {hairColor !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Hair: {hairColor}
                  <button onClick={() => setHairColor("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {skinTone !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Skin: {skinTone}
                  <button onClick={() => setSkinTone("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {ethnicity !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Heritage: {ethnicity}
                  <button onClick={() => setEthnicity("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {education !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Education: {education}
                  <button onClick={() => setEducation("all")} className="hover:text-red-500">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#285b63]/10 text-[#285b63]">
                  Search: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500">×</button>
                </span>
              )}
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#ff7468] hover:underline ml-2"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* ================= CONTENT GRID (SIDEBAR + RESULTS) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
          {/* ================= DESKTOP FILTER SIDEBAR ================= */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif text-lg font-bold text-[#285b63] flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff7468]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Refine Criteria
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-bold text-[#ff7468] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sidebar Filters Form */}
              <div className="mt-4 space-y-5">
                {/* Availability */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Availability Status
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="available">Available Immediately</option>
                    <option value="quarantine">Pending Quarantine Release</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Blood Group (ABO/Rh)
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Blood Type</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>

                {/* Eye Color */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Eye Color
                  </label>
                  <select
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Eye Color</option>
                    <option value="Dark Brown">Dark Brown</option>
                    <option value="Black">Black</option>
                    <option value="Hazel">Hazel / Light Brown</option>
                  </select>
                </div>

                {/* Hair Color */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Hair Color
                  </label>
                  <select
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Hair Color</option>
                    <option value="Black">Jet Black / Deep Black</option>
                    <option value="Dark Brown">Dark Brown</option>
                  </select>
                </div>

                {/* Skin Complexion */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Skin Complexion
                  </label>
                  <select
                    value={skinTone}
                    onChange={(e) => setSkinTone(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Complexion</option>
                    <option value="Fair">Fair / Very Fair</option>
                    <option value="Wheatish">Wheatish / Medium</option>
                    <option value="Dusky">Dusky / Warm Wheatish</option>
                  </select>
                </div>

                {/* Heritage & Region */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Indian Heritage / Region
                  </label>
                  <select
                    value={ethnicity}
                    onChange={(e) => setEthnicity(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Heritage</option>
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="East Indian">East / Northeast Indian</option>
                    <option value="West Indian">West Indian</option>
                  </select>
                </div>

                {/* Education Level */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Minimum Education
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:outline-hidden focus:border-[#285b63]"
                  >
                    <option value="all">Any Degree Level</option>
                    <option value="Bachelor's Degree">Bachelor&apos;s Degree or Higher</option>
                    <option value="Master's Degree">Master&apos;s Degree or Higher</option>
                    <option value="Doctorate">Doctorate / PhD</option>
                  </select>
                </div>
              </div>

              {/* Statutory Compliance Note */}
              <div className="mt-6 pt-4 border-t border-gray-100 bg-[#edf3f1]/50 rounded-xl p-3 text-[11px] text-[#285b63] leading-relaxed">
                <span className="font-bold">Indian ART Act 2021:</span> All donors are strictly non-identifying. Full statutory profiles and clinical records are issued directly to your treating fertility center.
              </div>
            </div>
          </aside>

          {/* ================= RESULTS SECTION ================= */}
          <main className="min-w-0">
            {/* Header info bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs sm:text-sm text-gray-600">
                Showing <strong className="text-[#285b63]">{filteredDonors.length}</strong> of {catalogDonors.length} verified clinical profiles
              </div>
              {comparedDonorIds.length > 0 && (
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff7468] text-white text-xs font-bold hover:bg-[#ff5d50] transition shadow-xs"
                >
                  <span>Compare Selected ({comparedDonorIds.length}/3)</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Zero State */}
            {filteredDonors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#edf3f1] text-[#285b63] flex items-center justify-center mx-auto text-2xl mb-4">
                  🔍
                </div>
                <h3 className="font-serif text-xl font-bold text-[#285b63] mb-2">
                  No matching donor profiles found
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  We could not find any donors matching your specific combination of criteria. Try loosening some filters or contacting our match desk for personalized clinical allocations.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="px-5 py-2.5 rounded-xl bg-[#285b63] text-white text-xs font-bold hover:bg-[#1f484f] transition"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    href="/contacts"
                    className="px-5 py-2.5 rounded-xl border border-[#285b63] text-[#285b63] text-xs font-bold hover:bg-[#edf3f1] transition"
                  >
                    Contact Match Desk
                  </Link>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* ================= GRID VIEW ================= */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredDonors.map((donor) => {
                  const isCompared = comparedDonorIds.includes(donor.id);
                  return (
                    <div
                      key={donor.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between"
                    >
                      {/* Top Header Card */}
                      <div>
                        <div className="p-5 pb-4 border-b border-gray-100 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Stylized Avatar with initials */}
                            <div
                              className="w-25 h-25 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-inner shrink-0"
                              style={{
                                background:
                                  donor.gameteType === "egg"
                                    ? "linear-gradient(135deg, #ff7468 0%, #e05b50 100%)"
                                    : "linear-gradient(135deg, #285b63 0%, #173037 100%)",
                              }}
                            >
                              {donor.gameteType === "egg"?<Image
  src="/img/woman.png"
  alt="Man"
  width={200}
  height={200}
  className="object-cover"
/>:<Image
  src="/img/man.png"
  alt="Man"
  width={200}
  height={200}
/>}



                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                {/* <span className="font-mono text-sm font-bold text-[#1d3840]">
                                  {donor.donorCode}
                                </span> */}
                                <span
                                  className={`text-[16px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    donor.gameteType === "egg"
                                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                                      : "bg-teal-50 text-[#285b63] border border-teal-200"
                                  }`}
                                >
                                  {donor.gameteType === "egg" ? "Oocyte Donor" : "Semen Donor"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    donor.availability === "available"
                                      ? "bg-emerald-500 animate-pulse"
                                      : "bg-amber-500"
                                  }`}
                                />
                                {donor.availability === "available"
                                  ? "Fresh Cycle"
                                  : "Not avalable"}
                              </div>
                            </div>
                          </div>

                          {/* Compare Checkbox */}
                          <button
                            type="button"
                            onClick={() => toggleCompare(donor.id)}
                            className={`p-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                              isCompared
                                ? "bg-[#ff7468] text-white border-[#ff7468]"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                            }`}
                            title="Compare side-by-side"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCompared ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                            </svg>
                            <span>{isCompared ? "Compared" : "Compare"}</span>
                          </button>
                        </div>

                        {/* Physical Phenotype Grid */}
                        <div className="p-5 py-4 bg-[#fbfdfc] border-b border-gray-100 grid grid-cols-4 gap-2 text-center">
                          <div className="bg-white p-2 rounded-xl border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-semibold">Height</div>
                            <div className="text-xs font-bold text-[#285b63] mt-0.5">{donor.heightFormatted}</div>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-semibold">Blood</div>
                            <div className="text-xs font-bold text-[#ff7468] mt-0.5">{donor.bloodType}</div>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-semibold">Eyes</div>
                            <div className="text-xs font-bold text-gray-700 mt-0.5">{donor.eyeColor}</div>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-semibold">Skin</div>
                            <div className="text-xs font-bold text-gray-700 mt-0.5">{donor.skinTone}</div>
                          </div>
                        </div>

                        {/* Key Background & Education */}

                        {/* <div className="p-5 space-y-3">
                          <div>
                            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                              Education &amp; Profession
                            </div>
                            <div className="text-xs font-bold text-gray-800 mt-0.5">
                              {donor.degree}
                            </div>
                            <div className="text-xs text-gray-600">
                              {donor.profession}
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                              Heritage &amp; Ancestry
                            </div>
                            <div className="text-xs text-gray-700 mt-0.5">
                              {donor.ethnicity} • {donor.ancestryRegion} (Mother Tongue: {donor.motherTongue})
                            </div>
                          </div>

                          
                          <div className="bg-[#edf3f1] rounded-xl p-2.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#285b63]">
                              <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>HPLC Thalassemia: {donor.geneticScreenings.thalassemia.status} ({donor.geneticScreenings.thalassemia.hba2Fraction})</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600">
                              <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Karyotype: {donor.geneticScreenings.karyotype.result} ({donor.geneticScreenings.karyotype.bands})</span>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="p-5 pt-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setactiveDonorProfile(donor);
                            setactiveProfileTab("phenotype");
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl border border-[#285b63] text-[#285b63] text-xs font-bold hover:bg-[#edf3f1] transition text-center"
                        >
                          View Full Profile
                        </button>
                        <Link
                          href={`/donor-request?donor=${donor.donorCode}&type=${donor.gameteType}`}
                          className="py-2.5 px-4 rounded-xl bg-[#ff7468] text-white text-xs font-bold hover:bg-[#ff5d50] transition text-center shadow-xs"
                        >
                          Requisition
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ================= LIST VIEW ================= */
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#edf3f1] text-[#285b63] uppercase tracking-wider font-semibold border-b border-gray-200">
                      <tr>
                        {/* <th className="py-3.5 px-4">Donor Code</th> */}
                        <th className="py-3.5 px-4">Type</th>
                        <th className="py-3.5 px-4">Blood</th>
                        <th className="py-3.5 px-4">Height / Age</th>
                        <th className="py-3.5 px-4">Eyes / Complexion</th>
                        <th className="py-3.5 px-4">Education / Profession</th>
                        <th className="py-3.5 px-4">Genetics</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredDonors.map((donor) => {
                        const isCompared = comparedDonorIds.includes(donor.id);
                        return (
                          <tr key={donor.id} className="hover:bg-gray-50/80 transition">
                            <td className="py-3.5 px-4">
                              {/* <div className="font-mono font-bold text-gray-900">{donor.donorCode}</div> */}
                              <div className="text-[10px] text-gray-400">{donor.availabilityLabel}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  donor.gameteType === "egg"
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : "bg-teal-50 text-[#285b63] border border-teal-200"
                                }`}
                              >
                                {donor.gameteType === "egg" ? "Oocyte" : "Semen"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-[#ff7468] text-sm">{donor.bloodType}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-gray-800">{donor.heightFormatted}</div>
                              <div className="text-[11px] text-gray-500">{donor.age} yrs</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div>{donor.eyeColor} eyes</div>
                              <div className="text-gray-500">{donor.skinTone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-gray-900 max-w-[180px] truncate">{donor.degree}</div>
                              <div className="text-gray-500 max-w-[180px] truncate">{donor.profession}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-emerald-700 font-medium">✓ Thalassemia Normal</div>
                              <div className="text-gray-500 text-[11px]">Karyotype {donor.geneticScreenings.karyotype.result}</div>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleCompare(donor.id)}
                                  className={`p-1.5 rounded-lg border text-xs font-medium ${
                                    isCompared ? "bg-[#ff7468] text-white border-[#ff7468]" : "bg-gray-50 text-gray-600 border-gray-200"
                                  }`}
                                  title="Compare"
                                >
                                  {isCompared ? "✓" : "+"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setactiveDonorProfile(donor);
                                    setactiveProfileTab("phenotype");
                                  }}
                                  className="px-3 py-1.5 rounded-lg border border-[#285b63] text-[#285b63] font-bold hover:bg-[#edf3f1]"
                                >
                                  Profile
                                </button>
                                <Link
                                  href={`/donor-request?donor=${donor.donorCode}&type=${donor.gameteType}`}
                                  className="px-3 py-1.5 rounded-lg bg-[#ff7468] text-white font-bold hover:bg-[#ff5d50]"
                                >
                                  Request
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= STICKY COMPARISON DRAWER (BOTTOM BAR) ================= */}
      {comparedDonorIds.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#1d3840] text-white py-3.5 px-4 sm:px-6 shadow-2xl border-t-2 border-[#ff7468] animate-in slide-in-from-bottom">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-xs font-bold uppercase tracking-wider text-[#95e0b9]">
                Compare Donors ({comparedDonorIds.length}/3):
              </div>
              <div className="flex items-center gap-2">
                {comparedDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs"
                  >
                    <span className="font-mono font-bold text-[#95e0b9]">{donor.donorCode}</span>
                    <span className="text-gray-300">({donor.bloodType}, {donor.heightFormatted})</span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(donor.id)}
                      className="text-gray-400 hover:text-white ml-1 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setComparedDonorIds([])}
                className="text-xs text-gray-300 hover:text-white underline"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowComparisonModal(true)}
                className="px-5 py-2 rounded-xl bg-[#ff7468] text-white text-xs font-bold hover:bg-[#ff5d50] transition shadow-md flex items-center gap-1.5"
              >
                <span>View Comparison Matrix</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= COMPARISON MATRIX MODAL ================= */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 bg-[#1d3840] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold">Side-by-Side Donor Comparison</h3>
                <p className="text-xs text-gray-300 mt-1">
                  Comparing {comparedDonors.length} verified clinical profiles across physical phenotype, genetics, and statutory parameters.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="text-gray-400 hover:text-white text-2xl p-2"
              >
                ✕
              </button>
            </div>

            {/* Matrix Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="p-3 bg-gray-50 text-gray-500 font-bold uppercase w-1/4">Parameter</th>
                    {comparedDonors.map((donor) => (
                      <th key={donor.id} className="p-3 bg-[#edf3f1] text-[#285b63] font-bold text-center">
                        <div className="font-mono text-sm">{donor.donorCode}</div>
                        <div className="text-[10px] font-normal text-gray-600 mt-0.5">
                          {donor.gameteType === "egg" ? "Oocyte Donor" : "Semen Donor"}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Availability */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Availability Status</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          {d.availabilityLabel}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Blood Group */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Blood Group (ABO/Rh)</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center font-bold text-sm text-[#ff7468]">
                        {d.bloodType} ({d.rhFactor})
                      </td>
                    ))}
                  </tr>

                  {/* Height & BMI */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Height &amp; BMI</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <div className="font-bold">{d.heightFormatted}</div>
                        <div className="text-gray-500 text-[11px]">BMI {d.bmi} ({d.weightKg} kg)</div>
                      </td>
                    ))}
                  </tr>

                  {/* Eye & Hair */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Eyes &amp; Hair</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <div>Eyes: <span className="font-medium">{d.eyeColor}</span></div>
                        <div className="text-gray-500">Hair: {d.hairColor} ({d.hairTexture})</div>
                      </td>
                    ))}
                  </tr>

                  {/* Complexion & Build */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Complexion &amp; Build</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <div>{d.skinTone} Complexion</div>
                        <div className="text-gray-500">{d.bodyBuild}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Heritage & Mother Tongue */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Heritage &amp; Mother Tongue</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <div className="font-medium">{d.ethnicity}</div>
                        <div className="text-gray-500">{d.ancestryRegion} • {d.motherTongue}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Education & Career */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Education &amp; Career</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <div className="font-bold text-[#285b63]">{d.degree}</div>
                        <div className="text-gray-600">{d.profession}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Thalassemia HPLC */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Thalassemia HPLC (HbA2)</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center font-medium text-emerald-700">
                        ✓ {d.geneticScreenings.thalassemia.status} ({d.geneticScreenings.thalassemia.hba2Fraction})
                      </td>
                    ))}
                  </tr>

                  {/* Chromosomal Karyotype */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Chromosomal Karyotype</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <span className="font-mono font-bold text-gray-800">{d.geneticScreenings.karyotype.result}</span>
                        <div className="text-gray-500 text-[10px]">{d.geneticScreenings.karyotype.bands}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Infectious Serology */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Infectious Serology</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center text-[11px] text-gray-600">
                        HIV, HBsAg, HCV, VDRL: <span className="text-emerald-700 font-bold">Non-Reactive</span>
                      </td>
                    ))}
                  </tr>

                  {/* Action Requisition */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Requisition</td>
                    {comparedDonors.map((d) => (
                      <td key={d.id} className="p-3 text-center">
                        <Link
                          href={`/donor-request?donor=${d.donorCode}&type=${d.gameteType}`}
                          className="inline-block w-full py-2 px-3 rounded-xl bg-[#ff7468] text-white text-xs font-bold hover:bg-[#ff5d50] transition shadow-xs"
                        >
                          Request Allocation
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2 rounded-xl bg-[#285b63] text-white text-xs font-bold hover:bg-[#1d444a] transition"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULL PROFILE MODAL (MYEGGBANK STYLE) ================= */}
      {activeDonorProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[99vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Top Modal Header */}
            <div className="bg-gradient-to-r from-[#173037] via-[#214b53] to-[#285b63] text-white p-4 sm:p-6 lg:p-8">

  <div className="w-full relative">

    {/* Header Content */}
    <div className="flex items-start gap-3 sm:gap-4 w-full pr-8 sm:pr-12 relative ">

      {/* Left Image */}
      <div
        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-inner shrink-0"
        style={{
          background:
            activeDonorProfile.gameteType === "egg"
              ? "linear-gradient(135deg, #ff7468 0%, #d85246 100%)"
              : "linear-gradient(135deg, #285b63 0%, #173037 100%)",
        }}
      >
        {activeDonorProfile.gameteType === "egg" ? (
          <Image
            src="/img/woman.png"
            alt="Woman"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-2xl"
          />
        ) : (
          <Image
            src="/img/man.png"
            alt="Man"
            width={200}
            height={200}
            className="object-cover w-full h-full rounded-2xl"
          />
        )}
      </div>

      {/* Right Details */}
      <div>

      
      <div>

        {/* Donor Type */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm sm:text-lg lg:text-xl font-bold px-2 sm:px-2.5 py-1 sm:py-0.5 rounded-full uppercase tracking-wider ${
              activeDonorProfile.gameteType === "egg"
                ? "bg-rose-500/20 text-rose-200 border border-rose-400/30"
                : "bg-teal-500/20 text-[#95e0b9] border border-teal-400/30"
            }`}
          >
            {activeDonorProfile.gameteType === "egg"
              ? "Oocyte (Egg) Donor"
              : "Semen (Sperm) Donor"}
          </span>
        </div>

        {/* Donor Information */}
        <div className="text-xs sm:text-sm lg:text-lg text-gray-200 mt-2 leading-relaxed">
          {activeDonorProfile.ethnicity}
          {" • "}
          {activeDonorProfile.degree}
          {" • "}
          {activeDonorProfile.heightFormatted}
          {" • "}
          Blood:{" "}
          <strong className="text-[#ff7468]">
            {activeDonorProfile.bloodType}
          </strong>
        </div>

      </div>

      {/* <div className="mt-5 sm:mt-6 flex items-center gap-2 border-b border-white/15 pb-1 overflow-x-auto scrollbar-hide"> */}
      <div className="max-sm:hidden mt-5 sm:mt-6 w-full relative">
  <div className="z-100 flex w-full items-center gap-2 border-b border-white/15 pb-1">

      <button
        type="button"
        onClick={() => setactiveProfileTab("phenotype")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "phenotype"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        1. Basic Information
      </button>

      <button
        type="button"
        onClick={() => setactiveProfileTab("genetics")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "genetics"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        2. Viral Markers
      </button>

      {/* <button
        type="button"
        onClick={() => setactiveProfileTab("education")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "education"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        3. Education details
      </button> */}

      <button
        type="button"
        onClick={() => setactiveProfileTab("pedigree")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "pedigree"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        3. Family Medical History
      </button>

      <button
        type="button"
        onClick={() => setactiveProfileTab("compliance")}
        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "compliance"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        4. ART Act Compliance
      </button>

      </div>

    </div>


      </div>
    </div>

    {/* Close Button */}
    <button
      type="button"
      onClick={() => setactiveDonorProfile(null)}
      className="absolute top-0 right-0 text-gray-300 hover:text-white text-xl sm:text-2xl p-1 shrink-0"
    >
      ✕
    </button>


    {/* Navigation Tabs */}
    <div className="mt-5 sm:hidden sm:mt-6 flex items-center flex-wrap gap-2 pb-1 overflow-hidden scrollbar-hide">

      <button
        type="button"
        onClick={() => setactiveProfileTab("phenotype")}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "phenotype"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        1. Basic Information
      </button>

      <button
        type="button"
        onClick={() => setactiveProfileTab("genetics")}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "genetics"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        2. Viral Markers
      </button>

      {/* <button
        type="button"
        onClick={() => setactiveProfileTab("education")}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "education"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        3. Education details
      </button> */}

      <button
        type="button"
        onClick={() => setactiveProfileTab("pedigree")}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "pedigree"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        3. Family Medical History
      </button>

      <button
        type="button"
        onClick={() => setactiveProfileTab("compliance")}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
          activeProfileTab === "compliance"
            ? "bg-white text-[#285b63] shadow-xs"
            : "text-gray-200 hover:bg-white/10"
        }`}
      >
        4. ART Act Compliance
      </button>

    </div>

  </div>
</div>


            {/* Tab Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
              {/* TAB 1: basic details*/}
              {activeProfileTab === "phenotype" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-3">
                      Physical Details
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Blood Group</div>
                        <div className="text-sm font-bold text-[#ff7468] mt-1">{activeDonorProfile.bloodType} ({activeDonorProfile.rhFactor})</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Skin Complexion</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.skinTone}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Height</div>
                        <div className="text-sm font-bold text-[#285b63] mt-1">{activeDonorProfile.heightFormatted}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Weight</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.weightKg} kg</div>
                      </div>
                      
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 font-semibold">Eye Color</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.eyeColor}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Hair Color</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.hairColor}</div>
                      </div>
                      {/* <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">Hair Texture</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.hairTexture}</div>
                      </div> */}
                      
                      {/* <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">Body Frame</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.bodyBuild}</div>
                      </div> */}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-3">
                      Education & Occupation Details
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Education</div>
                        <div className="text-sm font-bold text-[#ff7468] mt-1">{activeDonorProfile.degree} </div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[14px] text-gray-600 uppercase font-semibold">Occupation</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.profession}</div>
                      </div>
                      
                    </div>
                  </div>

                  {/* Proven Fertility & Reproductive Health */}
                  <div className="bg-[#edf3f1] p-5 rounded-2xl border border-[#285b63]/20">
                    <h5 className="font-serif text-sm font-bold text-[#285b63] mb-2">
                      Reproductive History &amp; Proven Fertility
                    </h5>
                    <p className="text-black text-lg leading-relaxed">
                      {activeDonorProfile.provenFertility}
                    </p>
                    <div className="mt-2 text-base font-semibold text-[#ff7468]">
                      Alive Children: {activeDonorProfile.livingChildren} (Verified as per Section 27(2) of Indian ART Act)
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Viral markers */}
              {activeProfileTab === "genetics" && (
                <div className="space-y-6">
                  {/* <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-2">
                      Clinical Genetic Clearance Panel
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      Tested via NABL-accredited molecular diagnostics laboratories adhering to ICMR and ART Act guidelines.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-2xl p-4 bg-[#fbfdfc]">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Beta-Thalassemia Screening (Hb HPLC)
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-gray-600">Result Status:</span>
                          <span className="font-bold text-emerald-700">✓ {activeDonorProfile.geneticScreenings.thalassemia.status}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                          <span>HbA2 Fraction:</span>
                          <span className="font-mono">{activeDonorProfile.geneticScreenings.thalassemia.hba2Fraction} (Normal &lt; 3.5%)</span>
                        </div>
                        <div className="mt-1 text-[11px] text-gray-400">
                          Method: {activeDonorProfile.geneticScreenings.thalassemia.method}
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-2xl p-4 bg-[#fbfdfc]">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Chromosomal Karyotyping
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-gray-600">Cytogenetic Result:</span>
                          <span className="font-mono font-bold text-[#285b63]">{activeDonorProfile.geneticScreenings.karyotype.result}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                          <span>Banding:</span>
                          <span>{activeDonorProfile.geneticScreenings.karyotype.bands}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-gray-400">
                          {activeDonorProfile.geneticScreenings.karyotype.resolution}
                        </div>
                      </div>
                    </div>
                  </div>

                 
                  <div className="border border-gray-200 rounded-2xl p-4 bg-white">
                    <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide mb-3">
                      Expanded Carrier Conditions
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500">Spinal Muscular Atrophy (SMA)</div>
                        <div className="text-xs font-bold text-emerald-700 mt-1">✓ {activeDonorProfile.geneticScreenings.sma}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500">Cystic Fibrosis (CFTR)</div>
                        <div className="text-xs font-bold text-emerald-700 mt-1">✓ {activeDonorProfile.geneticScreenings.cysticFibrosis}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <div className="text-xs text-gray-500">G6PD Enzyme Assay</div>
                        <div className="text-xs font-bold text-emerald-700 mt-1">✓ {activeDonorProfile.geneticScreenings.g6pd}</div>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-3">
                      The Medical examination of donor
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">HIV Type 1 & 2</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.geneticScreenings.infectiousSerology.hiv} </div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">Hepatitis B Virus (HBV)</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.geneticScreenings.infectiousSerology.hbsAg}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">Hepatitis C Virus (HCV)</div>
                        <div className="text-sm font-bold text-[#285b63] mt-1">{activeDonorProfile.geneticScreenings.infectiousSerology.hcv}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-3 rounded-2xl border border-gray-200">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">VDRL</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.geneticScreenings.infectiousSerology.vdrl}</div>
                      </div>
                      
                      
                    </div>
                  </div>

                 
                </div>

                  {/* Serology Panel */}
                  {/* <div className="border border-gray-200 rounded-2xl p-4 bg-[#edf3f1]/60">
                    <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide mb-3">
                      The Medical examination of donor
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div>HIV 1 &amp; 2: <strong className="text-emerald-700">{activeDonorProfile.geneticScreenings.infectiousSerology.hiv}</strong></div>
                      <div>HBsAg (Hepatitis B): <strong className="text-emerald-700">{activeDonorProfile.geneticScreenings.infectiousSerology.hbsAg}</strong></div>
                      <div>HCV (Hepatitis C): <strong className="text-emerald-700">{activeDonorProfile.geneticScreenings.infectiousSerology.hcv}</strong></div>
                      <div>VDRL / Syphilis: <strong className="text-emerald-700">{activeDonorProfile.geneticScreenings.infectiousSerology.vdrl}</strong></div> */}
                      {/* <div>Chlamydia PCR: <strong className="text-emerald-700">{activeDonorProfile.geneticScreenings.infectiousSerology.chlamydiaPcr}</strong></div>
                      <div>CMV Status: <strong className="text-gray-800">{activeDonorProfile.geneticScreenings.infectiousSerology.cmv}</strong></div> */}
                    {/* </div> */}
                  {/* </div> */}
                </div>
              )}

              {/* TAB 3: EDUCATION & PERSONAL STATEMENT */}
              {activeProfileTab === "education" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-3">
                      Academic Credentials &amp; Professional Career
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs text-gray-400 uppercase font-semibold">Educational Degree</div>
                        <div className="text-sm font-bold text-[#285b63] mt-1">{activeDonorProfile.degree}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Tier: {activeDonorProfile.educationLevel}</div>
                      </div>
                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs text-gray-400 uppercase font-semibold">Current Profession</div>
                        <div className="text-sm font-bold text-gray-800 mt-1">{activeDonorProfile.profession}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Verified Employment Record</div>
                      </div>
                    </div>
                  </div>

                  {/* Talents & Hobbies */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 p-4 rounded-2xl bg-white">
                      <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Aptitudes &amp; Talents
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDonorProfile.talents.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-full bg-[#edf3f1] text-[#285b63] text-xs font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border border-gray-200 p-4 rounded-2xl bg-white">
                      <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Hobbies &amp; Interests
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeDonorProfile.hobbies.map((h, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Personal Statement */}
                  <div className="bg-gradient-to-br from-[#edf3f1] to-white p-6 rounded-2xl border border-gray-200">
                    <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <span>Donor&apos;s Personal Statement</span>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed text-xs sm:text-sm">
                      &ldquo;{activeDonorProfile.donorStatement}&rdquo;
                    </blockquote>
                  </div>
                </div>
              )}

              {/* TAB 4: 3-GENERATION MEDICAL PEDIGREE */}
              {activeProfileTab === "pedigree" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-2">
                      3-Generation Family Health Pedigree
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      Investigated clinically to eliminate familial predispositions to hereditary metabolic, cardiac, oncological, or neurodegenerative conditions.
                    </p>

                    <div className="space-y-3">
                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Maternal Grandparents
                        </div>
                        <p className="text-gray-700 text-xs mt-1">
                          {activeDonorProfile.familyPedigree.maternalGrandparents}
                        </p>
                      </div>

                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Paternal Grandparents
                        </div>
                        <p className="text-gray-700 text-xs mt-1">
                          {activeDonorProfile.familyPedigree.paternalGrandparents}
                        </p>
                      </div>

                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Parents (Mother &amp; Father)
                        </div>
                        <p className="text-gray-700 text-xs mt-1">
                          {activeDonorProfile.familyPedigree.parents}
                        </p>
                      </div>

                      <div className="bg-[#fbfdfc] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs font-bold text-[#285b63] uppercase tracking-wide">
                          Siblings
                        </div>
                        <p className="text-gray-700 text-xs mt-1">
                          {activeDonorProfile.familyPedigree.siblings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: STATUTORY ART ACT 2021 COMPLIANCE */}
              {activeProfileTab === "compliance" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#285b63] mb-2">
                      Statutory ART Act 2021 Certification
                    </h4>
                    <p className="text-xs text-gray-500 mb-4">
                      Official regulatory verification parameters logged with the National ART Registry of India.
                    </p>

                    <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">National ART Registry Compliance :</span>
                        <span className="font-mono font-bold text-[#285b63]">{activeDonorProfile.statutoryCompliance.registryToken}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">Lifetime Donation Limit Under Section 27(2):</span>
                        <span className="font-bold text-emerald-700">✓ Verified Non-Repeat Donor</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">Mandatory 12-Month Rule 13 Insurance:</span>
                        <span className="font-bold text-emerald-700">✓ Active &amp; Fully Underwritten</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-700">Statutory Perpetual Anonymity Undertaking:</span>
                        <span className="font-bold text-emerald-700">✓ Executed under Sections 27 &amp; 28</span>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-2xl bg-[#edf3f1] text-[11px] text-[#285b63] leading-relaxed">
                      <strong>Legal Notice:</strong> Under Sections 27 and 28 of the Assisted Reproductive Technology (Regulation) Act, 2021, all gamete donor identities remain strictly confidential and protected by law. The child born through ART shall not have access to donor identifying information.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 text-center sm:text-left">
                Ready to coordinate with your fertility clinic for this donor profile?
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => toggleCompare(activeDonorProfile.id)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
                >
                  {comparedDonorIds.includes(activeDonorProfile.id) ? "Remove from Comparison" : "+ Add to Comparison"}
                </button>
                <Link
                  href={`/donor-request?donor=${activeDonorProfile.donorCode}&type=${activeDonorProfile.gameteType}`}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#ff7468] text-white text-xs font-bold hover:bg-[#ff5d50] transition shadow-xs text-center"
                >
                  Requisition This Donor
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="font-serif text-lg font-bold text-[#285b63]">Filter Donors</h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                {/* Availability */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Availability Status
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">All Statuses</option>
                    <option value="available">Available Immediately</option>
                    <option value="quarantine">Pending Quarantine</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">Any Blood Type</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>

                {/* Eye Color */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Eye Color
                  </label>
                  <select
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">Any Eye Color</option>
                    <option value="Dark Brown">Dark Brown</option>
                    <option value="Black">Black</option>
                    <option value="Hazel">Hazel / Light Brown</option>
                  </select>
                </div>

                {/* Skin Complexion */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Skin Complexion
                  </label>
                  <select
                    value={skinTone}
                    onChange={(e) => setSkinTone(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">Any Complexion</option>
                    <option value="Fair">Fair</option>
                    <option value="Wheatish">Wheatish</option>
                    <option value="Dusky">Dusky</option>
                  </select>
                </div>

                {/* Heritage */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Heritage
                  </label>
                  <select
                    value={ethnicity}
                    onChange={(e) => setEthnicity(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">Any Heritage</option>
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="East Indian">East / Northeast Indian</option>
                    <option value="West Indian">West Indian</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Education Level
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-gray-300"
                  >
                    <option value="all">Any Level</option>
                    <option value="Bachelor's Degree">Bachelor&apos;s or Higher</option>
                    <option value="Master's Degree">Master&apos;s or Higher</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#285b63] text-white text-xs font-bold"
              >
                Apply ({filteredDonors.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STATUTORY PROTOCOLS REFERENCE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-gray-200">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff7468]">
              Statutory Clinical Protocols
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#285b63] mt-1 mb-4">
              How Mediyaz Pre-Screens Every Donor
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              In accordance with Section 27 of the Assisted Reproductive Technology (Regulation) Act, 2021, all donors undergo mandatory 5-stage clinical evaluation before gametes can be vitrified or allocated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-[#edf3f1]">
              <div className="w-8 h-8 rounded-lg bg-[#285b63] text-white flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h4 className="font-serif font-bold text-sm text-[#285b63] mb-1">
                Aadhaar &amp; Marital Verification
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Biometric ID cross-checks against the National ART registry to guarantee single-lifetime donation limits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#edf3f1]">
              <div className="w-8 h-8 rounded-lg bg-[#285b63] text-white flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h4 className="font-serif font-bold text-sm text-[#285b63] mb-1">
                HPLC Thalassemia &amp; Karyotype
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hemoglobin variant HPLC testing and 550-band cytogenetic karyotyping to prevent hereditary disorders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#edf3f1]">
              <div className="w-8 h-8 rounded-lg bg-[#285b63] text-white flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h4 className="font-serif font-bold text-sm text-[#285b63] mb-1">
                180-Day Cryo-Quarantine
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Liquid nitrogen quarantine with repeat non-reactive viral serology for HIV, HBV, and HCV prior to clinical release.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#edf3f1]">
              <div className="w-8 h-8 rounded-lg bg-[#285b63] text-white flex items-center justify-center font-bold text-xs mb-3">
                04
              </div>
              <h4 className="font-serif font-bold text-sm text-[#285b63] mb-1">
                Mandatory Rule 13 Insurance
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                12-month health insurance underwritten for every oocyte donor in full compliance with ART Rules 2022.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
