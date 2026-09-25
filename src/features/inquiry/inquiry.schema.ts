import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  emailAddress: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  age: z.string().optional(),
  donationInterest: z.enum(["sperm", "egg"]),
  height: z.string().optional(),
  weight: z.string().optional(),
  hairColor: z.string().optional(),
  eyeColor: z.string().optional(),
  skinTone: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().default("India"),
  preferredContactTime: z.string().min(2, "Preferred contact time is required"),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
