import mongoose, { Schema, Document } from "mongoose";

export interface IDonorRequest extends Document {
  requisitionNumber: string;
  donorCode?: string;
  gameteType: "egg" | "sperm" | "both";
  requestorType: "commissioning_couple" | "commissioning_individual" | "fertility_clinic";
  primaryContactName: string;
  partnerName?: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  preferredBloodGroup?: string;
  treatingClinicName: string;
  treatingDoctorName?: string;
  clinicCity: string;
  clinicArtRegNumber?: string;
  gameteQuantity?: string;
  tentativeCycleDate?: string;
  specialRequirements?: string;
  statutoryConsent: boolean;
  status:
    | "Pending Clinical Review"
    | "Clinic Contacted"
    | "Allocation Approved"
    | "Cryo Dispatch Scheduled"
    | "Dispatched"
    | "Completed"
    | "Cancelled";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonorRequestSchema = new Schema<IDonorRequest>(
  {
    requisitionNumber: { type: String, required: true, unique: true, index: true },
    donorCode: { type: String, index: true },
    gameteType: { type: String, enum: ["egg", "sperm", "both"], required: true },
    requestorType: {
      type: String,
      enum: ["commissioning_couple", "commissioning_individual", "fertility_clinic"],
      required: true,
    },
    primaryContactName: { type: String, required: true },
    partnerName: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
    preferredBloodGroup: { type: String },
    treatingClinicName: { type: String, required: true },
    treatingDoctorName: { type: String },
    clinicCity: { type: String, required: true },
    clinicArtRegNumber: { type: String },
    gameteQuantity: { type: String },
    tentativeCycleDate: { type: String },
    specialRequirements: { type: String },
    statutoryConsent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: [
        "Pending Clinical Review",
        "Clinic Contacted",
        "Allocation Approved",
        "Cryo Dispatch Scheduled",
        "Dispatched",
        "Completed",
        "Cancelled",
      ],
      default: "Pending Clinical Review",
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const DonorRequest =
  mongoose.models?.DonorRequest ||
  mongoose.model<IDonorRequest>("DonorRequest", DonorRequestSchema);
