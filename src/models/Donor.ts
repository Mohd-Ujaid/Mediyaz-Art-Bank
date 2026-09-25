import mongoose, { Schema, Document } from "mongoose";

export interface IDonor extends Document {
  user: mongoose.Types.ObjectId;
  donorId: string;
  personalInformation: any;
  physicalAttributes: any;
  medicalInformation: any;
  donationInformation: any;
  donationStatus: string;
  approvalStatus: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonorSchema = new Schema<IDonor>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    donorId: { type: String, required: true, unique: true },
    personalInformation: { type: Schema.Types.Mixed },
    physicalAttributes: { type: Schema.Types.Mixed },
    medicalInformation: { type: Schema.Types.Mixed },
    donationInformation: { type: Schema.Types.Mixed },
    donationStatus: { type: String, default: "PENDING" },
    approvalStatus: { type: String, default: "PENDING" },
    createdBy: { type: String, default: "Self Registration" },
  },
  { timestamps: true, strict: false }
);

export const Donor = mongoose.models?.Donor || mongoose.model<IDonor>("Donor", DonorSchema);
