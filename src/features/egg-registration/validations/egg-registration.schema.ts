import { z } from "zod";

// ============================================================
// EGG / OOCYTE DONOR REGISTRATION SCHEMA
// Specifically tailored for female oocyte donors under ART Act 2021:
// - Female only
// - Age 23 - 35
// - Ever married with at least one living child (minimum 3 years of age)
// - Husband / Spouse consent & occupation details
// - Oocyte donation allowed only ONCE in lifetime
// ============================================================

export const eggPersonalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  fatherName: z.string().optional().or(z.literal("")),
  motherName: z.string().optional().or(z.literal("")),
  gender: z.literal("Female"),
  husbandName: z.string().optional().or(z.literal("")),
  husbandOccupation: z.string().optional().or(z.literal("")),
  husbandEducation: z.string().optional().or(z.literal("")),
  spouseName: z.string().optional().or(z.literal("")),
  spouseOccupation: z.string().optional().or(z.literal("")),
  spouseEducation: z.string().optional().or(z.literal("")),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.number().min(23, "Egg donors must be at least 23 years old under ART Act 2021").max(35, "Egg donors cannot exceed 35 years of age under ART Act 2021").optional(),
  maritalStatus: z.enum(["Married", "Divorced", "Widowed", "Separated"], {
    message: "Under ART Act 2021, an oocyte donor must be an ever-married woman (Married, Divorced, Widowed, or Separated)"
  }),
  bloodGroup: z.string().min(1, "Blood group is required"),
  education: z.string().min(1, "Education qualification is required"),
  occupation: z.string().min(1, "Occupation is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  eyeColor: z.string().min(1, "Eye color is required"),
  hairColor: z.string().min(1, "Hair color is required"),
  complexion: z.string().min(1, "Skin colour / complexion is required"),
  aadhaarNumber: z.string().min(12, "Aadhaar must be 12 digits").max(12, "Aadhaar must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN format").optional().or(z.literal("")),
  religion: z.string().min(1, "Religion is required"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  hobby: z.string().optional().or(z.literal("")),
});

export const eggContactInfoSchema = z.object({
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  alternateMobile: z.string().optional().default(""),
  emailAddress: z.string().min(1, "Email address is required").email("Invalid email address"),
  currentAddress: z.string().min(3, "Current address is required"),
  permanentAddress: z.string().optional().default(""),
  country: z.string().default("India"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(6, "Valid 6-digit pincode is required"),
});

export const eggMedicalInfoSchema = z.object({
  medicalHistory: z.string().optional().or(z.literal("")),
  familyMedicalHistory: z.string().optional().or(z.literal("")),
  previousSurgeries: z.string().optional().or(z.literal("")),
  allergies: z.string().optional().or(z.literal("")),
  currentMedications: z.string().optional().or(z.literal("")),
  diabetes: z.string().default("No"),
  hypertension: z.string().default("No"),
  smokingStatus: z.string().default("Never"),
  alcoholConsumption: z.string().default("Never"),
  drugUse: z.string().default("Never"),
  geneticDisorders: z.string().optional().or(z.literal("")),
  childAbnormalityHistory: z.string().optional().or(z.literal("")),
  psychologicalHistory: z.string().optional().or(z.literal("")),
  infectiousDiseases: z.string().optional().or(z.literal("")),
  fertilityHistory: z.string().optional().or(z.literal("")),
});

export const eggDonorInfoSchema = z.object({
  menstrualCycleDetails: z.string().optional().or(z.literal("")),
  pregnancyHistory: z.string().optional().or(z.literal("")),
  previousEggDonation: z.enum(["Yes", "No"]).or(z.literal("")).default(""),
  ivfHistory: z.string().optional().or(z.literal("")),
  ovarianReserve: z.string().optional().or(z.literal("")),
  hormonalTestDetails: z.string().optional().or(z.literal("")),
  numberOfDeliveries: z.string().min(1, "Number of deliveries is required under ART Act 2021 (must have at least one living child)"),
  numberOfAbortions: z.string().optional().or(z.literal("")),
  obstetricHistory: z.string().optional().or(z.literal("")),
  otherPointsOfNote: z.string().optional().or(z.literal("")),
  contraceptiveHistory: z.string().optional().or(z.literal("")),
  bloodTransfusionHistory: z.string().optional().or(z.literal("")),
  substanceAbuseHistory: z.string().optional().or(z.literal("")),
});

export const fileRefSchema = z.object({
  fileId: z.string(),
  url: z.string().url("Invalid file URL"),
  name: z.string(),
  size: z.number().nonnegative(),
  type: z.string(),
});

export const eggLabReportsSchema = z.object({
  viralMarkers: z.array(fileRefSchema).optional().default([]),
  bloodReport: fileRefSchema.nullable().optional(),
  otherReports: z.array(fileRefSchema).optional().default([]),
});

export const eggDocumentsSchema = z.object({
  passportPhoto: fileRefSchema.nullable().optional(),
  aadhaarFront: fileRefSchema.nullable().optional(),
  aadhaarBack: fileRefSchema.nullable().optional(),
  signature: fileRefSchema.nullable().optional(),
  otherDocument: fileRefSchema.nullable().optional(),
});

export const eggEmergencyContactSchema = z.object({
  contactPersonName: z.string().optional().or(z.literal("")),
  relationship: z.string().optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

export const eggConsentSchema = z.object({
  confirmTruth: z.literal(true, { message: "You must confirm that all information is truthful" }),
  agreeVoluntary: z.literal(true, { message: "You must confirm that donation is purely voluntary" }),
  consentScreening: z.boolean().optional().default(true),
  allowStorage: z.literal(true, { message: "You must consent to oocyte retrieval and clinical utilization under ART Act 2021" }),
  confirmOnceInLifetime: z.literal(true, { message: "Under ART Act 2021, an oocyte donor can donate only ONCE in her lifetime" }),
  husbandConsentConfirmed: z.boolean().default(false),
  digitalSignature: z.string().optional().or(z.literal("")),
  signatureDate: z.string().optional().or(z.literal("")),
});

export const eggReferralSchema = z.object({
  sourceReferralType: z.string().default("Website"),
  referrerName: z.string().optional().or(z.literal("")),
  patientOrDonorId: z.string().optional().or(z.literal("")),
  mobileNumber: z.string().optional().or(z.literal("")),
  relationship: z.string().optional().or(z.literal("")),
  clinicName: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
  employeeId: z.string().optional().or(z.literal("")),
  otherSourceDetails: z.string().optional().or(z.literal("")),
});

export type EggPersonalInfo = z.infer<typeof eggPersonalInfoSchema>;
export type EggContactInfo = z.infer<typeof eggContactInfoSchema>;
export type EggMedicalInfo = z.infer<typeof eggMedicalInfoSchema>;
export type EggDonorInfo = z.infer<typeof eggDonorInfoSchema>;
export type EggLabReports = z.infer<typeof eggLabReportsSchema>;
export type EggDocuments = z.infer<typeof eggDocumentsSchema>;
export type EggEmergencyContact = z.infer<typeof eggEmergencyContactSchema>;
export type EggConsent = z.infer<typeof eggConsentSchema>;
export type EggReferral = z.infer<typeof eggReferralSchema>;
export type EggFileRef = z.infer<typeof fileRefSchema>;
