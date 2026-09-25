import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category:
    | "Legal & Regulatory"
    | "Genetic Health"
    | "Intending Parents"
    | "Donor Care & Insurance"
    | "Clinical Quality";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Legal & Regulatory",
        "Genetic Health",
        "Intending Parents",
        "Donor Care & Insurance",
        "Clinical Quality",
      ],
      required: true,
      index: true,
    },
    author: {
      name: { type: String, required: true, default: "Mediyaz Clinical Editorial Board" },
      role: { type: String, required: true, default: "ART Clinical & Embryology Specialists" },
      avatar: { type: String, default: "/img/logo.webp" },
    },
    readTime: { type: String, required: true, default: "5 min read" },
    coverImage: { type: String, default: "/img/home.jpg" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models?.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
