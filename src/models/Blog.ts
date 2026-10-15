import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  author?: any;
  readTime?: string;
  coverImage?: string;
  image?: string;
  tags: string[];
  status?: "DRAFT" | "PUBLISHED";
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.Mixed,
      default: () => ({
        name: "Mediyaz Clinical Editorial Board",
        role: "ART Clinical & Embryology Specialists",
        avatar: "/img/logo.webp",
      }),
    },
    readTime: { type: String, default: "5 min read" },
    coverImage: { type: String, default: "/img/home.jpg" },
    image: { type: String },
    tags: [{ type: String }],
    status: { type: String, default: "PUBLISHED" },
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models?.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
