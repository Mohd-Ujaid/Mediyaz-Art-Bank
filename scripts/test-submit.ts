import dotenv from "dotenv";
dotenv.config();

import { submitRegistration } from "../src/features/donor-registration/services/donor-registration.service";
import mongoose from "mongoose";

async function run() {
  try {
    const id = "MED-SD-2026-42208337"; // Using the ID from earlier logs
    const session = null; // simulate walk-in donor
    const bodyData = {
      consent: {
        confirmTruth: true, agreeVoluntary: true,
        consentScreening: true, allowStorage: true,
        digitalSignature: "", signatureDate: ""
      }
    };
    
    console.log("Submitting registration...");
    const result = await submitRegistration(id, bodyData, session);
    console.log("Success:", !!result);
  } catch (error) {
    console.error("Submission Failed:", error);
  } finally {
    process.exit(0);
  }
}

run();
