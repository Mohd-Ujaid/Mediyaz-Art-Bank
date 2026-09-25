import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactReply {
  _id?: string;
  sender: string;
  senderName: string;
  message: string;
  createdAt: Date;
}

export interface IContactMessage extends Document {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  userType?: "parent" | "egg-donor" | "sperm-donor" | "clinic" | "other" | string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "REPLIED" | "COMPLETED" | "ARCHIVED";
  adminNotes?: string;
  replies?: IContactReply[];
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactReplySchema = new Schema<IContactReply>(
  {
    sender: { type: String, default: "Admin" },
    senderName: { type: String, default: "Mediyaz Administrator" },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    userType: {
      type: String,
      enum: ["parent", "egg-donor", "sperm-donor", "clinic", "other"],
      default: "other",
    },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "RESPONDED", "REPLIED", "COMPLETED", "ARCHIVED"],
      default: "NEW",
    },
    adminNotes: { type: String, default: "" },
    replies: [ContactReplySchema],
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

// Scalable indexes for queries & administration
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ email: 1 });
ContactMessageSchema.index({ status: 1 });
ContactMessageSchema.index({ userType: 1 });

export const ContactMessage: Model<IContactMessage> =
  mongoose.models?.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
