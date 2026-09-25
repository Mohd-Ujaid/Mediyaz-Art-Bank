"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { User, UserRole } from "@/models/User";
import { Donor } from "@/models/Donor";
import { registrationSchema } from "@/features/registration/registration.schema";
import bcrypt from "bcryptjs";
import { triggerWorkflowNotifications } from "@/features/notifications/notification.service";

export async function submitRegistrationAction(formData: FormData) {
  try {
    await connectToDatabase();

    const data = Object.fromEntries(formData.entries());
    
    // 1. Validation
    const validatedData = registrationSchema.safeParse(data);

    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Validation failed", 
        fieldErrors: validatedData.error.flatten().fieldErrors 
      };
    }

    const { name, email, phone, password, role } = validatedData.data;

    // 2. Duplicate Checks
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return { success: false, error: "Email address is already registered." };
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return { success: false, error: "Phone number is already registered." };
    }

    // 3. Password Hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Register User
    const userRole = role === "DONOR" ? UserRole.DONOR : UserRole.RECIPIENT;
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: userRole,
      status: "ACTIVE",
      emailVerified: false,
    });

    // 5. Create Donor Profile if selected role is DONOR
    if (userRole === UserRole.DONOR) {
      const donorCount = await Donor.countDocuments();
      const donorId = `DON-${new Date().getFullYear()}-${String(donorCount + 1001).padStart(4, "0")}`;
      await Donor.create({
        user: newUser._id,
        donorId,
        personalInformation: {
          dateOfBirth: new Date("1998-01-01"),
          gender: "Male",
          bloodGroup: "O+",
          nationality: "American",
          address: "Please update profile address",
          maritalStatus: "Single",
        },
        physicalAttributes: {
          height: 175,
          weight: 70,
          eyeColor: "Brown",
          hairColor: "Black",
          skinTone: "Medium",
        },
        medicalInformation: {
          eligibility: true,
          hemoglobin: 14.5,
          bloodPressure: "120/80",
          allergies: "None",
          diseases: "None",
          medications: "None",
          medicalNotes: "Self-declared healthy donor.",
        },
        donationInformation: {
          totalDonations: 0,
          certificates: [],
        },
        donationStatus: "PENDING",
        approvalStatus: "PENDING",
        createdBy: "Self Registration",
      });
    }

    // 6. Trigger WhatsApp notification
    try {
      await triggerWorkflowNotifications("registration_completed", name, phone);
    } catch (notifErr) {
      console.error("Failed to send WhatsApp notification:", notifErr);
    }

    return { 
      success: true, 
      message: "Account registered successfully!"
    };

  } catch (error: any) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: "An unexpected error occurred during registration." 
    };
  }
}
