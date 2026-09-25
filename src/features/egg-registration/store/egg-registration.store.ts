import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EggPersonalInfo,
  EggContactInfo,
  EggMedicalInfo,
  EggDonorInfo,
  EggLabReports,
  EggDocuments,
  EggEmergencyContact,
  EggConsent,
  EggReferral,
  EggFileRef,
} from "../validations/egg-registration.schema";

const defaultPersonalInfo: EggPersonalInfo = {
  fullName: "",
  fatherName: "",
  motherName: "",
  gender: "Female",
  husbandName: "",
  husbandOccupation: "",
  husbandEducation: "",
  spouseName: "",
  spouseOccupation: "",
  spouseEducation: "",
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

const defaultContactInfo: EggContactInfo = {
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

const defaultMedicalInfo: EggMedicalInfo = {
  medicalHistory: "No",
  familyMedicalHistory: "No",
  childAbnormalityHistory: "No",
  previousSurgeries: "",
  allergies: "",
  currentMedications: "",
  diabetes: "No",
  hypertension: "No",
  smokingStatus: "Never",
  alcoholConsumption: "Never",
  drugUse: "Never",
  geneticDisorders: "No",
  psychologicalHistory: "",
  infectiousDiseases: "",
  fertilityHistory: "",
};

const defaultDonorInfo: EggDonorInfo = {
  menstrualCycleDetails: "Regular",
  pregnancyHistory: "",
  previousEggDonation: "No",
  ivfHistory: "",
  ovarianReserve: "",
  hormonalTestDetails: "",
  numberOfDeliveries: "1",
  numberOfAbortions: "No",
  obstetricHistory: "No",
  otherPointsOfNote: "No",
  contraceptiveHistory: "No",
  bloodTransfusionHistory: "No",
  substanceAbuseHistory: "No",
};

const defaultLabReports: EggLabReports = {
  viralMarkers: [],
  bloodReport: null,
  otherReports: [],
};

const defaultDocuments: EggDocuments = {
  passportPhoto: null,
  aadhaarFront: null,
  aadhaarBack: null,
  signature: null,
  otherDocument: null,
};

const defaultEmergencyContact: EggEmergencyContact = {
  contactPersonName: "",
  relationship: "",
  phoneNumber: "",
  address: "",
};

const defaultConsent: EggConsent = {
  confirmTruth: false as any,
  agreeVoluntary: false as any,
  consentScreening: false as any,
  allowStorage: false as any,
  confirmOnceInLifetime: false as any,
  husbandConsentConfirmed: false,
  digitalSignature: "",
  signatureDate: new Date().toISOString().split("T")[0],
};

const defaultReferral: EggReferral = {
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

export interface EggFormStore {
  registrationId: string | null;
  currentStep: number;
  agentCode: string;
  isSaving: boolean;
  isSubmitting: boolean;
  isLoading: boolean;

  personalInfo: EggPersonalInfo;
  contactInfo: EggContactInfo;
  medicalInfo: EggMedicalInfo;
  donorInfo: EggDonorInfo;
  labReports: EggLabReports;
  documents: EggDocuments;
  emergencyContact: EggEmergencyContact;
  consent: EggConsent;
  referral: EggReferral;

  setRegistrationId: (id: string | null) => void;
  setCurrentStep: (step: number) => void;
  setAgentCode: (code: string) => void;
  setIsSaving: (val: boolean) => void;
  setIsSubmitting: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;

  updatePersonalInfo: (data: Partial<EggPersonalInfo>) => void;
  updateContactInfo: (data: Partial<EggContactInfo>) => void;
  updateMedicalInfo: (data: Partial<EggMedicalInfo>) => void;
  updateDonorInfo: (data: Partial<EggDonorInfo>) => void;
  updateLabReports: (data: Partial<EggLabReports>) => void;
  updateDocuments: (data: Partial<EggDocuments>) => void;
  updateEmergencyContact: (data: Partial<EggEmergencyContact>) => void;
  updateConsent: (data: Partial<EggConsent>) => void;
  updateReferral: (data: Partial<EggReferral>) => void;

  loadFromServer: (data: any) => void;
  getAllFormData: () => any;
  resetForm: () => void;
}

export const useEggFormStore = create<EggFormStore>()(
  persist(
    (set, get) => ({
  registrationId: null,
  currentStep: 1,
  agentCode: "",
  isSaving: false,
  isSubmitting: false,
  isLoading: false,

  personalInfo: defaultPersonalInfo,
  contactInfo: defaultContactInfo,
  medicalInfo: defaultMedicalInfo,
  donorInfo: defaultDonorInfo,
  labReports: defaultLabReports,
  documents: defaultDocuments,
  emergencyContact: defaultEmergencyContact,
  consent: defaultConsent,
  referral: defaultReferral,

  setRegistrationId: (id) => set({ registrationId: id }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setAgentCode: (agentCode) => set({ agentCode }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsLoading: (isLoading) => set({ isLoading }),

  updatePersonalInfo: (data) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...data, gender: "Female" } })),
  updateContactInfo: (data) =>
    set((state) => ({ contactInfo: { ...state.contactInfo, ...data } })),
  updateMedicalInfo: (data) =>
    set((state) => ({ medicalInfo: { ...state.medicalInfo, ...data } })),
  updateDonorInfo: (data) =>
    set((state) => ({ donorInfo: { ...state.donorInfo, ...data } })),
  updateLabReports: (data) =>
    set((state) => ({ labReports: { ...state.labReports, ...data } })),
  updateDocuments: (data) =>
    set((state) => ({ documents: { ...state.documents, ...data } })),
  updateEmergencyContact: (data) =>
    set((state) => ({ emergencyContact: { ...state.emergencyContact, ...data } })),
  updateConsent: (data) =>
    set((state) => ({ consent: { ...state.consent, ...data } })),
  updateReferral: (data) =>
    set((state) => ({ referral: { ...state.referral, ...data } })),

  loadFromServer: (data: any, forceOverwrite = false) => {
    if (!data) return;
    set((state) => {
      // If same registration is already loaded locally, preserve non-empty local fields so refresh never deletes data typed by the user
      const isSameReg = !forceOverwrite && Boolean(state.registrationId && state.registrationId === data.registrationId);

      const mergeSection = <T extends Record<string, any>>(localSection: T | undefined, serverSection: Partial<T> | undefined, defaultSection: T): T => {
        const result = { ...defaultSection, ...(serverSection || {}) };
        if (isSameReg && localSection) {
          for (const key of Object.keys(localSection)) {
            const localVal = (localSection as any)[key];
            if (localVal !== undefined && localVal !== null && localVal !== "" && !(Array.isArray(localVal) && localVal.length === 0)) {
              (result as any)[key] = localVal;
            }
          }
        }
        return result;
      };

      return {
        registrationId: data.registrationId || state.registrationId || null,
        currentStep: state.currentStep || data.currentStep || 1,
        agentCode: data.agentCode || (data.referral?.sourceReferralType === "Refer" ? data.referral?.patientOrDonorId : "") || state.agentCode || "",
        personalInfo: mergeSection(state.personalInfo, data.personalInfo, defaultPersonalInfo),
        contactInfo: mergeSection(state.contactInfo, data.contactInfo, defaultContactInfo),
        medicalInfo: mergeSection(state.medicalInfo, data.medicalInfo, defaultMedicalInfo),
        donorInfo: mergeSection(state.donorInfo, data.donorInfo, defaultDonorInfo),
        labReports: mergeSection(state.labReports, data.labReports, defaultLabReports),
        documents: mergeSection(state.documents, data.documents, defaultDocuments),
        emergencyContact: mergeSection(state.emergencyContact, data.emergencyContact, defaultEmergencyContact),
        consent: mergeSection(state.consent, data.consent, defaultConsent),
        referral: mergeSection(state.referral, data.referral, defaultReferral),
      };
    });
  },

  getAllFormData: () => {
    const s = get();
    return {
      registrationId: s.registrationId,
      donorType: "egg",
      agentCode: s.agentCode,
      personalInfo: s.personalInfo,
      contactInfo: s.contactInfo,
      medicalInfo: s.medicalInfo,
      donorInfo: s.donorInfo,
      labReports: s.labReports,
      documents: s.documents,
      emergencyContact: s.emergencyContact,
      consent: s.consent,
      referral: s.referral,
    };
  },

  resetForm: () =>
    set({
      registrationId: null,
      currentStep: 1,
      agentCode: "",
      personalInfo: defaultPersonalInfo,
      contactInfo: defaultContactInfo,
      medicalInfo: defaultMedicalInfo,
      donorInfo: defaultDonorInfo,
      labReports: defaultLabReports,
      documents: defaultDocuments,
      emergencyContact: defaultEmergencyContact,
      consent: defaultConsent,
      referral: defaultReferral,
    }),
  }),
  {
    name: "mediyaz_egg_form_store",
      partialize: (state) => ({
        registrationId: state.registrationId,
        currentStep: state.currentStep,
        agentCode: state.agentCode,
        personalInfo: state.personalInfo,
        contactInfo: state.contactInfo,
        medicalInfo: state.medicalInfo,
        donorInfo: state.donorInfo,
        labReports: state.labReports,
        documents: state.documents,
        emergencyContact: state.emergencyContact,
        consent: state.consent,
        referral: state.referral,
      }),
    }
  )
);
