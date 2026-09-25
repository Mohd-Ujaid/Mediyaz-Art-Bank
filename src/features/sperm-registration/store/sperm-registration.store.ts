import { create } from "zustand";
import type {
  SpermPersonalInfo,
  SpermContactInfo,
  SpermMedicalInfo,
  SpermDonorInfo,
  SpermInvestigations,
  SpermPhysicalExamination,
  SpermLabReports,
  SpermDocuments,
  SpermEmergencyContact,
  SpermBankDetails,
  SpermConsent,
  SpermReferral,
  SpermFileRef,
} from "../validations/sperm-registration.schema";

const defaultPersonalInfo: SpermPersonalInfo = {
  fullName: "",
  fatherName: "",
  motherName: "",
  gender: "Male",
  dateOfBirth: "",
  age: undefined,
  maritalStatus: "Married",
  bloodGroup: "O+",
  education: "",
  occupation: "",
  height: "",
  weight: "",
  eyeColor: "",
  hairColor: "",
  complexion: "",
  aadhaarNumber: "",
  panNumber: "",
  religion: "",
  monthlyIncome: "",
  hobby: "",
};

const defaultContactInfo: SpermContactInfo = {
  mobileNumber: "",
  alternateMobile: "",
  emailAddress: "",
  currentAddress: "",
  permanentAddress: "",
  country: "India",
  state: "",
  district: "",
  city: "",
  pincode: "",
};

const defaultMedicalInfo: SpermMedicalInfo = {
  medicalHistory: "",
  familyMedicalHistory: "",
  previousSurgeries: "",
  allergies: "",
  currentMedications: "",
  diabetes: "No",
  hypertension: "No",
  smokingStatus: "Never",
  alcoholConsumption: "Never",
  drugUse: "Never",
  geneticDisorders: "",
  psychologicalHistory: "",
  infectiousDiseases: "",
  fertilityHistory: "",
};

const defaultDonorInfo: SpermDonorInfo = {
  semenAnalysis: "",
  previousDonationHistory: "No",
  numberOfDonations: "",
  lastDonationDate: "",
  abstinencePeriod: "",
};

const defaultInvestigations: SpermInvestigations = {
  hb: "",
  totalRbc: "",
  totalWbc: "",
  differentialWbc: "",
  plateletCount: "",
  peripheralSmear: "",
  randomBloodSugar: "",
  bloodUreaSerumCreatinine: "",
  sgpt: "",
  routineUrine: "",
  hbsagStatus: "",
  hepatitisCStatus: "",
  hivStatus: "",
  hemoglobinA2: "",
  otherSpecificTest: "",
  vdrl: "",
};

const defaultPhysicalExamination: SpermPhysicalExamination = {
  pulse: "",
  bloodPressure: "",
  temperature: "",
  respiratorySystem: "",
  cardiovascularSystem: "",
  perAbdominal: "",
};

const defaultLabReports: SpermLabReports = {
  viralMarkers: [],
  bloodReport: null,
  otherReports: [],
};

const defaultDocuments: SpermDocuments = {
  passportPhoto: null,
  aadhaarFront: null,
  aadhaarBack: null,
  signature: null,
  otherDocument: null,
};

const defaultEmergencyContact: SpermEmergencyContact = {
  contactPersonName: "",
  relationship: "",
  phoneNumber: "",
  address: "",
};

const defaultBankDetails: SpermBankDetails = {
  accountHolderName: "",
  bankName: "",
  branch: "",
  ifscCode: "",
  accountNumber: "",
  upiId: "",
};

const defaultConsent: SpermConsent = {
  confirmTruth: false as any,
  agreeVoluntary: false as any,
  consentScreening: false as any,
  allowStorage: false as any,
  digitalSignature: "",
  signatureDate: new Date().toISOString().split("T")[0],
};

const defaultReferral: SpermReferral = {
  sourceReferralType: "Online",
  referrerName: "",
  patientOrDonorId: "",
  mobileNumber: "",
  relationship: "",
  clinicName: "",
  department: "",
  employeeId: "",
  otherSourceDetails: "",
};

export interface SpermFormStore {
  registrationId: string | null;
  currentStep: number;
  isSaving: boolean;
  isSubmitting: boolean;
  isLoading: boolean;

  personalInfo: SpermPersonalInfo;
  contactInfo: SpermContactInfo;
  medicalInfo: SpermMedicalInfo;
  donorInfo: SpermDonorInfo;
  investigations: SpermInvestigations;
  physicalExamination: SpermPhysicalExamination;
  labReports: SpermLabReports;
  documents: SpermDocuments;
  emergencyContact: SpermEmergencyContact;
  bankDetails: SpermBankDetails;
  consent: SpermConsent;
  referral: SpermReferral;
  agentCode: string;

  setRegistrationId: (id: string | null) => void;
  setCurrentStep: (step: number) => void;
  setAgentCode: (code: string) => void;
  setIsSaving: (val: boolean) => void;
  setIsSubmitting: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;

  updatePersonalInfo: (data: Partial<SpermPersonalInfo>) => void;
  updateContactInfo: (data: Partial<SpermContactInfo>) => void;
  updateMedicalInfo: (data: Partial<SpermMedicalInfo>) => void;
  updateDonorInfo: (data: Partial<SpermDonorInfo>) => void;
  updateInvestigations: (data: Partial<SpermInvestigations>) => void;
  updatePhysicalExamination: (data: Partial<SpermPhysicalExamination>) => void;
  updateLabReports: (data: Partial<SpermLabReports>) => void;
  updateDocuments: (data: Partial<SpermDocuments>) => void;
  updateEmergencyContact: (data: Partial<SpermEmergencyContact>) => void;
  updateBankDetails: (data: Partial<SpermBankDetails>) => void;
  updateConsent: (data: Partial<SpermConsent>) => void;
  updateReferral: (data: Partial<SpermReferral>) => void;

  loadFromServer: (data: any) => void;
  getAllFormData: () => any;
  resetForm: () => void;
}

export const useSpermFormStore = create<SpermFormStore>((set, get) => ({
  registrationId: null,
  currentStep: 1,
  isSaving: false,
  isSubmitting: false,
  isLoading: false,

  personalInfo: defaultPersonalInfo,
  contactInfo: defaultContactInfo,
  medicalInfo: defaultMedicalInfo,
  donorInfo: defaultDonorInfo,
  investigations: defaultInvestigations,
  physicalExamination: defaultPhysicalExamination,
  labReports: defaultLabReports,
  documents: defaultDocuments,
  emergencyContact: defaultEmergencyContact,
  bankDetails: defaultBankDetails,
  consent: defaultConsent,
  referral: defaultReferral,
  agentCode: "",

  setRegistrationId: (id) => set({ registrationId: id }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setAgentCode: (agentCode) => set({ agentCode }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsLoading: (isLoading) => set({ isLoading }),

  updatePersonalInfo: (data) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...data, gender: "Male" } })),
  updateContactInfo: (data) =>
    set((state) => ({ contactInfo: { ...state.contactInfo, ...data } })),
  updateMedicalInfo: (data) =>
    set((state) => ({ medicalInfo: { ...state.medicalInfo, ...data } })),
  updateDonorInfo: (data) =>
    set((state) => ({ donorInfo: { ...state.donorInfo, ...data } })),
  updateInvestigations: (data) =>
    set((state) => ({ investigations: { ...state.investigations, ...data } })),
  updatePhysicalExamination: (data) =>
    set((state) => ({ physicalExamination: { ...state.physicalExamination, ...data } })),
  updateLabReports: (data) =>
    set((state) => ({ labReports: { ...state.labReports, ...data } })),
  updateDocuments: (data) =>
    set((state) => ({ documents: { ...state.documents, ...data } })),
  updateEmergencyContact: (data) =>
    set((state) => ({ emergencyContact: { ...state.emergencyContact, ...data } })),
  updateBankDetails: (data) =>
    set((state) => ({ bankDetails: { ...state.bankDetails, ...data } })),
  updateConsent: (data) =>
    set((state) => ({ consent: { ...state.consent, ...data } })),
  updateReferral: (data) =>
    set((state) => ({ referral: { ...state.referral, ...data } })),

  loadFromServer: (data) => {
    if (!data) return;
    set({
      registrationId: data.registrationId || null,
      currentStep: data.currentStep || 1,
      personalInfo: {
        ...defaultPersonalInfo,
        ...(data.personalInfo || {}),
        gender: "Male",
        bloodGroup: data.personalInfo?.bloodGroup || defaultPersonalInfo.bloodGroup,
        maritalStatus: data.personalInfo?.maritalStatus || defaultPersonalInfo.maritalStatus,
      },
      contactInfo: { ...defaultContactInfo, ...(data.contactInfo || {}) },
      medicalInfo: { ...defaultMedicalInfo, ...(data.medicalInfo || {}) },
      donorInfo: { ...defaultDonorInfo, ...(data.donorInfo || {}) },
      investigations: { ...defaultInvestigations, ...(data.investigations || {}) },
      physicalExamination: { ...defaultPhysicalExamination, ...(data.physicalExamination || {}) },
      labReports: { ...defaultLabReports, ...(data.labReports || {}) },
      documents: { ...defaultDocuments, ...(data.documents || {}) },
      emergencyContact: { ...defaultEmergencyContact, ...(data.emergencyContact || {}) },
      bankDetails: { ...defaultBankDetails, ...(data.bankDetails || {}) },
      consent: { ...defaultConsent, ...(data.consent || {}) },
      referral: {
        ...defaultReferral,
        ...(data.referral || {}),
        sourceReferralType: data.referral?.sourceReferralType || defaultReferral.sourceReferralType,
      },
      agentCode: data.agentCode || (data.referral?.sourceReferralType === "Refer" ? data.referral?.patientOrDonorId : "") || "",
    });
  },

  getAllFormData: () => {
    const s = get();
    return {
      registrationId: s.registrationId,
      donorType: "sperm",
      personalInfo: s.personalInfo,
      contactInfo: s.contactInfo,
      medicalInfo: s.medicalInfo,
      donorInfo: s.donorInfo,
      investigations: s.investigations,
      physicalExamination: s.physicalExamination,
      labReports: s.labReports,
      documents: s.documents,
      emergencyContact: s.emergencyContact,
      bankDetails: s.bankDetails,
      consent: s.consent,
      referral: s.referral,
      agentCode: s.agentCode,
    };
  },

  resetForm: () =>
    set({
      registrationId: null,
      currentStep: 1,
      personalInfo: defaultPersonalInfo,
      contactInfo: defaultContactInfo,
      medicalInfo: defaultMedicalInfo,
      donorInfo: defaultDonorInfo,
      investigations: defaultInvestigations,
      physicalExamination: defaultPhysicalExamination,
      labReports: defaultLabReports,
      documents: defaultDocuments,
      emergencyContact: defaultEmergencyContact,
      bankDetails: defaultBankDetails,
      consent: defaultConsent,
      referral: defaultReferral,
      agentCode: "",
    }),
}));
