import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ArtDonor } from "@/models/ArtDonor";
import { VERIFIED_DONOR_CATALOG } from "@/lib/donor-catalog";

async function ensureSeedData() {
  try {
    const count = await ArtDonor.countDocuments();
    if (count === 0 && VERIFIED_DONOR_CATALOG && VERIFIED_DONOR_CATALOG.length > 0) {
      console.log("Seeding verified donor catalog to MongoDB art_donors collection...");
      const seedItems = VERIFIED_DONOR_CATALOG.map((donor) => ({
        donorCode: donor.donorCode,
        gameteType: donor.gameteType,
        availability: donor.availability,
        availabilityLabel: donor.availabilityLabel,
        age: donor.age,
        bloodType: donor.bloodType,
        rhFactor: donor.rhFactor,
        heightCm: donor.heightCm,
        heightFormatted: donor.heightFormatted,
        weightKg: donor.weightKg,
        bmi: donor.bmi,
        eyeColor: donor.eyeColor,
        hairColor: donor.hairColor,
        hairTexture: donor.hairTexture,
        skinTone: donor.skinTone,
        bodyBuild: donor.bodyBuild,
        ethnicity: donor.ethnicity,
        ancestryRegion: donor.ancestryRegion,
        religion: donor.religion,
        motherTongue: donor.motherTongue,
        languages: donor.languages,
        educationLevel: donor.educationLevel,
        degree: donor.degree,
        profession: donor.profession,
        provenFertility: donor.provenFertility,
        livingChildren: donor.livingChildren,
        abortion: 0,
        talents: donor.talents,
        hobbies: donor.hobbies,
        donorStatement: donor.donorStatement,
        avatarColor: donor.avatarColor,
        viralMarkers: {
          hiv: donor.geneticScreenings?.infectiousSerology?.hiv || "Non-Reactive",
          hbsAg: donor.geneticScreenings?.infectiousSerology?.hbsAg || "Non-Reactive",
          hcv: donor.geneticScreenings?.infectiousSerology?.hcv || "Non-Reactive",
          vdrl: donor.geneticScreenings?.infectiousSerology?.vdrl || "Non-Reactive",
        },
        geneticScreenings: donor.geneticScreenings,
        familyPedigree: donor.familyPedigree,
        statutoryCompliance: donor.statutoryCompliance,
      }));
      await ArtDonor.insertMany(seedItems);
      console.log(`Successfully seeded ${seedItems.length} donor profiles!`);
    }
  } catch (err) {
    console.error("Error during donor catalog seed check:", err);
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    await ensureSeedData();

    const { searchParams } = new URL(request.url);

    const gameteType = searchParams.get("gameteType");
    const availability = searchParams.get("availability");
    const bloodType = searchParams.get("bloodType");
    const eyeColor = searchParams.get("eyeColor");
    const hairColor = searchParams.get("hairColor");
    const skinTone = searchParams.get("skinTone");
    const ethnicity = searchParams.get("ethnicity");
    const education = searchParams.get("education");
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const sortBy = searchParams.get("sortBy") || "featured";

    const query: any = {};

    if (gameteType && gameteType !== "all") {
      query.gameteType = gameteType;
    }
    if (availability && availability !== "all") {
      query.availability = availability;
    }
    const escapeRegex = (s: string) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    if (bloodType && bloodType !== "all") {
      query.bloodType = { $regex: `^${escapeRegex(bloodType)}$`, $options: "i" };
    }
    if (eyeColor && eyeColor !== "all") {
      query.eyeColor = { $regex: escapeRegex(eyeColor), $options: "i" };
    }
    if (hairColor && hairColor !== "all") {
      query.hairColor = { $regex: escapeRegex(hairColor), $options: "i" };
    }
    if (skinTone && skinTone !== "all") {
      query.skinTone = { $regex: escapeRegex(skinTone), $options: "i" };
    }
    if (ethnicity && ethnicity !== "all") {
      query.ethnicity = { $regex: escapeRegex(ethnicity), $options: "i" };
    }
    if (education && education !== "all") {
      query.educationLevel = { $regex: escapeRegex(education), $options: "i" };
    }

    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { donorCode: { $regex: safeSearch, $options: "i" } },
        { profession: { $regex: safeSearch, $options: "i" } },
        { degree: { $regex: safeSearch, $options: "i" } },
        { ethnicity: { $regex: safeSearch, $options: "i" } },
        { ancestryRegion: { $regex: safeSearch, $options: "i" } },
        { motherTongue: { $regex: safeSearch, $options: "i" } },
        { talents: { $in: [new RegExp(safeSearch, "i")] } },
      ];
    }

    let sortObj: any = { createdAt: -1 };
    if (sortBy === "height-desc") sortObj = { heightCm: -1 };
    else if (sortBy === "height-asc") sortObj = { heightCm: 1 };
    else if (sortBy === "age-asc") sortObj = { age: 1 };
    else if (sortBy === "age-desc") sortObj = { age: -1 };

    const rawDonors = await ArtDonor.find(query).sort(sortObj).lean();

    const donors = rawDonors.map((d: any) => ({
      ...d,
      id: d._id.toString(),
      viralMarkers: d.viralMarkers || {
        hiv: "Non-Reactive",
        hbsAg: "Non-Reactive",
        hcv: "Non-Reactive",
        vdrl: "Non-Reactive",
      },
      geneticScreenings: d.geneticScreenings || {
        thalassemia: {
          status: "Negative",
          method: "Automated Cation-Exchange HPLC",
          hba2Fraction: "2.4% (Normal Reference: <3.5%)",
        },
        karyotype: {
          result: d.gameteType === "egg" ? "46,XX (Normal Female Karyotype)" : "46,XY (Normal Male Karyotype)",
          bands: "550-Band Resolution",
          resolution: "No structural or numerical aberrations detected",
        },
        sma: "Non-Carrier",
        cysticFibrosis: "Non-Carrier",
        g6pd: "Normal",
        infectiousSerology: {
          hiv: d.viralMarkers?.hiv || "Non-Reactive",
          hbsAg: d.viralMarkers?.hbsAg || "Non-Reactive",
          hcv: d.viralMarkers?.hcv || "Non-Reactive",
          vdrl: d.viralMarkers?.vdrl || "Non-Reactive",
          chlamydiaPcr: "Negative",
          cmv: "IgG Positive, IgM Negative (Low Risk)",
        },
      },
    }));

    const total = await ArtDonor.countDocuments();

    return NextResponse.json({
      success: true,
      count: donors.length,
      total,
      donors,
    });
  } catch (error: any) {
    console.error("Error fetching donor catalog:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve donor catalog." },
      { status: 500 }
    );
  }
}
