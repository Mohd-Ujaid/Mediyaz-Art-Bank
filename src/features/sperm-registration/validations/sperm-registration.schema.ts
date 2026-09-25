import { z } from "zod";

// ============================================================
// SPERM DONOR REGISTRATION SCHEMA
// Specifically tailored for male semen donors under ART Act 2021
// ============================================================

export const spermPersonalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  fatherName: z.string().optional().or(z.literal("")),
  motherName: z.string().optional().or(z.literal("")),
  gender: z.literal("Male"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.number().min(21, "Sperm donors must be at least 21 years old").max(55, "Sperm donors cannot exceed 55 years of age").optional(),
  maritalStatus: z.string().min(1, "Marital status is required"),
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
  religion: z.string().optional().or(z.literal("")),
  monthlyIncome: z.string().optional().or(z.literal("")),
  hobby: z.string().optional().or(z.literal("")),
});

export const spermContactInfoSchema = z.object({
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

export const spermMedicalInfoSchema = z.object({
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
  psychologicalHistory: z.string().optional().or(z.literal("")),
  infectiousDiseases: z.string().optional().or(z.literal("")),
  fertilityHistory: z.string().optional().or(z.literal("")),
});

export const spermDonorInfoSchema = z.object({
  semenAnalysis: z.string().optional().or(z.literal("")),
  previousDonationHistory: z.enum(["Yes", "No"]).default("No"),
  numberOfDonations: z.string().optional().or(z.literal("")),
  lastDonationDate: z.string().optional().or(z.literal("")),
  abstinencePeriod: z.string().optional().or(z.literal("")),
});

export const spermInvestigationsSchema = z.object({
  hb: z.string().optional().or(z.literal("")),
  totalRbc: z.string().optional().or(z.literal("")),
  totalWbc: z.string().optional().or(z.literal("")),
  differentialWbc: z.string().optional().or(z.literal("")),
  plateletCount: z.string().optional().or(z.literal("")),
  peripheralSmear: z.string().optional().or(z.literal("")),
  randomBloodSugar: z.string().optional().or(z.literal("")),
  bloodUreaSerumCreatinine: z.string().optional().or(z.literal("")),
  sgpt: z.string().optional().or(z.literal("")),
  routineUrine: z.string().optional().or(z.literal("")),
  hbsagStatus: z.string().optional().or(z.literal("")),
  hepatitisCStatus: z.string().optional().or(z.literal("")),
  hivStatus: z.string().optional().or(z.literal("")),
  hemoglobinA2: z.string().optional().or(z.literal("")),
  otherSpecificTest: z.string().optional().or(z.literal("")),
  vdrl: z.string().optional().or(z.literal("")),
});

export const spermPhysicalExaminationSchema = z.object({
  pulse: z.string().optional().or(z.literal("")),
  bloodPressure: z.string().optional().or(z.literal("")),
  temperature: z.string().optional().or(z.literal("")),
  respiratorySystem: z.string().optional().or(z.literal("")),
  cardiovascularSystem: z.string().optional().or(z.literal("")),
  perAbdominal: z.string().optional().or(z.literal("")),
});

export const fileRefSchema = z.object({
  fileId: z.string(),
  url: z.string().url("Invalid file URL"),
  name: z.string(),
  size: z.number().nonnegative(),
  type: z.string(),
});

export const spermLabReportsSchema = z.object({
  viralMarkers: z.array(fileRefSchema).optional().default([]),
  bloodReport: fileRefSchema.nullable().optional(),
  otherReports: z.array(fileRefSchema).optional().default([]),
});

export const spermDocumentsSchema = z.object({
  passportPhoto: fileRefSchema.nullable().optional(),
  aadhaarFront: fileRefSchema.nullable().optional(),
  aadhaarBack: fileRefSchema.nullable().optional(),
  signature: fileRefSchema.nullable().optional(),
  otherDocument: fileRefSchema.nullable().optional(),
});

export const spermEmergencyContactSchema = z.object({
  contactPersonName: z.string().optional().or(z.literal("")),
  relationship: z.string().optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

export const spermBankDetailsSchema = z.object({
  accountHolderName: z.string().optional().or(z.literal("")),
  bankName: z.string().optional().or(z.literal("")),
  branch: z.string().optional().or(z.literal("")),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format").optional().or(z.literal("")),
  accountNumber: z.string().optional().or(z.literal("")),
  upiId: z.string().optional().or(z.literal("")),
});

export const spermConsentSchema = z.object({
  confirmTruth: z.literal(true, { message: "You must confirm that all information is truthful" }),
  agreeVoluntary: z.literal(true, { message: "You must confirm that donation is purely voluntary" }),
  consentScreening: z.literal(true, { message: "You must consent to comprehensive viral and medical screening" }),
  allowStorage: z.literal(true, { message: "You must consent to cryogenic storage and statutory quarantine under ART Act 2021" }),
  digitalSignature: z.string().optional().or(z.literal("")),
  signatureDate: z.string().optional().or(z.literal("")),
});

export const spermReferralSchema = z.object({
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

export type SpermPersonalInfo = z.infer<typeof spermPersonalInfoSchema>;
export type SpermContactInfo = z.infer<typeof spermContactInfoSchema>;
export type SpermMedicalInfo = z.infer<typeof spermMedicalInfoSchema>;
export type SpermDonorInfo = z.infer<typeof spermDonorInfoSchema>;
export type SpermInvestigations = z.infer<typeof spermInvestigationsSchema>;
export type SpermPhysicalExamination = z.infer<typeof spermPhysicalExaminationSchema>;
export type SpermLabReports = z.infer<typeof spermLabReportsSchema>;
export type SpermDocuments = z.infer<typeof spermDocumentsSchema>;
export type SpermEmergencyContact = z.infer<typeof spermEmergencyContactSchema>;
export type SpermBankDetails = z.infer<typeof spermBankDetailsSchema>;
export type SpermConsent = z.infer<typeof spermConsentSchema>;
export type SpermReferral = z.infer<typeof spermReferralSchema>;
export type SpermFileRef = z.infer<typeof fileRefSchema>;
