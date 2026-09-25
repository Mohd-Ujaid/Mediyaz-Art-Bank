import { z } from "zod";

export const donorRequestSchema = z.object({
  donorCode: z.string().optional(),
  gameteType: z.enum(["egg", "sperm", "both"], {
    error: "Please select the gamete type requested.",
  }),
  requestorType: z.enum(["commissioning_couple", "commissioning_individual", "fertility_clinic"], {
    error: "Please select who is submitting the requisition.",
  }),
  primaryContactName: z
    .string()
    .min(2, "Primary contact legal name must be at least 2 characters")
    .max(100, "Name is too long"),
  partnerName: z.string().max(100).optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit mobile number")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "Please provide your city"),
  state: z.string().min(2, "Please provide your state"),
  country: z.string().default("India"),
  preferredBloodGroup: z.string().optional().or(z.literal("")),
  treatingClinicName: z
    .string()
    .min(3, "Please provide the name of your treating fertility clinic or hospital"),
  treatingDoctorName: z.string().optional().or(z.literal("")),
  clinicCity: z.string().min(2, "Please provide your clinic's city"),
  clinicArtRegNumber: z.string().optional().or(z.literal("")),
  gameteQuantity: z.string().optional().or(z.literal("")),
  tentativeCycleDate: z.string().optional().or(z.literal("")),
  specialRequirements: z.string().max(1000).optional().or(z.literal("")),
  statutoryConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the statutory ART Act 2021 non-disclosure and compliance declaration to proceed.",
  }),
});

export type DonorRequestFormValues = z.infer<typeof donorRequestSchema>;
