"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import type {
  EggPersonalInfo,
  EggContactInfo,
  EggDonorInfo,
  EggMedicalInfo,
  EggDocuments,
  EggConsent,
} from "../validations/egg-registration.schema";

interface EggRegistrationReviewProps {
  registrationId?: string | null;
  personalInfo: EggPersonalInfo;
  contactInfo: EggContactInfo;
  donorInfo: EggDonorInfo;
  medicalInfo: EggMedicalInfo;
  documents: EggDocuments;
  consent: EggConsent;
  errors: Record<string, string>;
  updateConsent: (data: Partial<EggConsent>) => void;
  onEditStep: (step: number) => void;
}

const formatAddress = (addr = "", city = "", state = "", country = "India", pin = "") => {
  const parts = [addr, city, state, country, pin].filter((p) => Boolean(p?.trim()));
  return parts.length > 0 ? parts.join(", ") : "—";
};

export function EggRegistrationReview({
  registrationId,
  personalInfo,
  contactInfo,
  donorInfo,
  medicalInfo,
  documents,
  consent,
  errors,
  updateConsent,
  onEditStep,
}: EggRegistrationReviewProps) {
  const fullAddress = formatAddress(
    contactInfo.currentAddress,
    contactInfo.city,
    contactInfo.state,
    contactInfo.country,
    contactInfo.pincode
  );

  const permAddress = formatAddress(
    contactInfo.permanentAddress || contactInfo.currentAddress,
    contactInfo.city,
    contactInfo.state,
    contactInfo.country,
    contactInfo.pincode
  );

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const displayDate = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const fileNumber = registrationId
    ? `MAB/ED/${registrationId.split("-").pop()?.slice(-3) || "001"}`
    : "MAB/ED/001";
  const donorId = registrationId || "MAB/OD/___";

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── DOCUMENT 1: REGISTRATION FORM FOR OOCYTE DONOR ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        id="doc-reg"
        className="max-w-5xl mx-auto bg-white border border-slate-400 shadow-sm p-6 sm:p-10 font-serif text-black leading-relaxed"
      >
        <div className="text-center pb-3 mb-4 border-b border-black">
          {/* <span className="text-[11px] font-sans font-bold tracking-widest text-[#285b63] uppercase block mb-1">
            MEDIYAZ ART BANK • FORM ART-ED-01
          </span> */}
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black underline underline-offset-4">
            REGISTRATION FORM FOR OOCYTE DONOR
          </h2>
          <p className="text-base text-slate-700 mt-1 font-normal">
            अंडाणु दाता पंजीकरण प्रपत्र 
          </p>
        </div>

        {/* Official Header Box */}
        {/* <div className="border border-black text-xs font-sans mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black">
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-black font-bold">
              Registration Date: {displayDate}
            </div>
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-black font-bold">
              File Number: {fileNumber}
            </div>
            <div className="p-2 font-bold">
              DONOR ID: {donorId}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-black font-bold">
              ART Clinic: MEDIYAZ ART CLINIC & IVF DESK
            </div>
            <div className="p-2 font-bold">
              Doctor: Dr. In-Charge (ART Specialist)
            </div>
          </div>
        </div> */}

        {/* Preamble Declarations: English & Hindi */}
        <div className="space-y-3 text-xs sm:text-sm text-justify leading-relaxed">
          <p>
            I, {personalInfo.fullName} W/O{" "}
            {personalInfo.husbandName || personalInfo.spouseName}
            , House No.{" "}
            {fullAddress} and Aadhar No{" "}
            {personalInfo.aadhaarNumber} date of birth{" "}
            {personalInfo.dateOfBirth} and Mobile no{" "}
            {contactInfo.mobileNumber}, is willing to donate my
            oocyte to needy couple/woman and agree to abide by following terms.
          </p>

          <p className="text-slate-800">
            मैं, {personalInfo.fullName} पत्नी{" "}
            {personalInfo.husbandName || personalInfo.spouseName}
            , मकान नं0:{" "}
            {fullAddress} और आधार नंबर{" "}
            {personalInfo.aadhaarNumber} जन्म तिथि{" "}
            {personalInfo.dateOfBirth} और मोबाइल नंबर{" "}
            {contactInfo.mobileNumber}, जरूरतमंद जोड़े/महिला को
            अपना अंडाणु दान करने को तैयार हूं और निम्नलिखित शर्तों का पालन करने के लिए सहमत हैं।
          </p>
        </div>

        {/* Points 1 to 8: Both English & Hindi */}
        <div className="mt-4 space-y-3 text-xs sm:text-sm">
          {[
            {
              en: `My date of birth ${personalInfo.dateOfBirth || "—"}, age as on today is more than twenty-three years and less than thirty-five years.`,
              hi: `मेरी जन्म तिथि ${personalInfo.dateOfBirth || "—"} है और आज की मेरी आयु तेईस वर्ष से अधिक और पैंतीस वर्ष से कम है ।`,
            },
            {
              en: "I agree that I am registering for donating my oocyte for non-commercial purpose and for the purposes of assisted reproductive technology services arising due to infertility, disease and/or social and medical concerns.",
              hi: "मैं सहमत हूं कि मैं गैर-वाणिज्यिक उद्देश्य के लिए और बांझपन, बीमारी और/या सामाजिक और चिकित्सा चिंताओं के कारण उत्पन्न होने वाली सहायक प्रजनन प्रौद्योगिकी सेवाओं के उद्देश्यों के लिए अपना ओसाइट दान करने के लिए पंजीकरण कर रही हूं।",
            },
            {
              en: "I agree that I am willing to undergo pathology tests which are required to be done under the provisions of the Assisted Reproductive Technology (Regulation) Act, 2021 and Rules made thereunder.",
              hi: "मैं सहमत हूं कि मैं पैथोलॉजी टेस्ट कराने की इच्छुक हूं, जो कि सहायक प्रजनन प्रौद्योगिकी (विनियमन) अधिनियम, 2021 और उसके तहत बनाए गए नियमों के प्रावधानों के तहत किया जाना आवश्यक है।",
            },
            {
              en: "I confirm that at this stage and to the best of my knowledge I am not suffering from any known infectious diseases or genetic disorders.",
              hi: "मैं पुष्टि करती हूं कि इस स्तर पर और जहां तक मेरी जानकारी है, मैं किसी ज्ञात संक्रामक रोग या आनुवंशिक विकार से पीड़ित नहीं हूं।",
            },
            {
              en: "I agree that I will donate my oocyte to the needy couple/woman and go to the ART Clinic whenever informed by ART Bank namely (MEDIYAZ ART BANK) in the event my oocyte is collected/retrieved and preserved, same may be used for the purposes specified in the Assisted Reproductive Technology (Regulation) Act, 2021.",
              hi: "मैं सहमत हूं कि मैं अपना ऊसाइट/ अंडाणु जरूरतमंद दंपति/महिला को दान कर दूंगी और जब भी एआरटी बैंक अर्थात् (मेडियाज़ एआरटी बैंक) द्वारा सूचित किया जाएगा तो मैं एआरटी क्लिनिक जाऊंगी और यदि मेरे ऊसाइट का नमूना एकत्र और संरक्षित किया जाता है, तो उसका उपयोग सहायक प्रजनन प्रौद्योगिकी (विनियमन) अधिनियम, २०२१ में निर्दिष्ट उद्देश्य के लिए किया जा सकता है।",
            },
            {
              en: "I agree and affirm that I will not try to know the identity of recipient and disclose the same to any person in the event the identity of recipient is come within my knowledge as per law.",
              hi: "मैं सहमत हूं और पुष्टि करती हूं कि मैं प्राप्तकर्ता की पहचान जानने की कोशिश नहीं करूंगी और कानून के अनुसार प्राप्तकर्ता की पहचान मेरी जानकारी में आने की स्थिति में किसी भी व्यक्ति को इसका खुलासा नहीं करूंगी।",
            },
            {
              en: "I undertake and confirm that I am registering myself for donating my oocyte with ART Bank namely (MEDIYAZ ART BANK) for the first time and have not registered with any other ART Bank before. I further undertake and confirm that I have never donated my oocyte to any couple/woman in past and will never donate my oocyte to any couple/woman more than one in my life.",
              hi: "मैं वचन देती हूं और पुष्टि करती हूं कि मैं पहली बार एआरटी बैंक अर्थात् (मेडियाज़ एआरटी बैंक) के साथ अपना ओसाइट/अंडाणु दान करने के लिए खुद को पंजीकृत कर रही हूं और पहले किसी अन्य एआरटी बैंक के साथ पंजीकृत नहीं हूं। मैं आगे वचन देती हूं और पुष्टि करती हूं कि मैंने अतीत में कभी भी किसी जोड़े/महिला को अपना अंडाणु दान नहीं किया है और अपने जीवन में एक के अलावे कभी भी किसी भी जोड़े/महिला को अपना अंडाणु दान नहीं करूंगी।",
            },
            {
              en: "I confirm and verify that the above-mentioned facts are true and correct to the best of my knowledge.",
              hi: "मैं पुष्टि करती हूं और सत्यापित करती हूं कि उपर्युक्त तथ्य मेरी सर्वोत्तम जानकारी के अनुसार सत्य और सही हैं।",
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1 text-justify">
              <div className="flex items-start gap-2">
                <div className="w-5 pt-0.5">{idx + 1}.</div>
                <div>
                  <p className="text-black"> {item.en}</p>
                  <p className="text-slate-800">{item.hi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Block */}
        <div className="flex justify-between items-end mt-10 pt-6 text-xs">
          <div className="text-center">
            <div className="min-h-[44px] flex items-end justify-center mb-1">
              {documents?.signature?.url ? (
                <img
                  src={documents.signature.url}
                  alt="Donor Signature"
                  className="max-h-11 max-w-[140px] object-contain"
                />
              ) : (
                <span className="text-slate-400 italic text-[11px]">Digital Signature on File</span>
              )}
            </div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-bold">
              Oocyte donor Signature
              <br />
              <span className="font-normal text-[10px] text-slate-600">
                (Self-Attested copy of AADHAR Enclosed)
              </span>
            </div>
          </div>

          {/* <div className="text-center font-bold">
            <div className="min-h-[44px] flex items-end justify-center mb-1">
              <img
                src="/images/signature.png"
                alt="Director Signature"
                className="max-h-11 max-w-[140px] object-contain"
              />
            </div>
            <div className="border-t border-black w-48 mx-auto pt-1">
              Mr. IMTIYAZ SHAIKH
            </div>
            <div className="text-[10px] font-normal text-slate-700">Director / Proprietor</div>
            <div className="text-[10px] font-normal text-slate-600">For MEDIYAZ ART BANK</div>
          </div> */}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── DOCUMENT 2: CONTRACT BETWEEN ART BANK AND OOCYTE DONOR ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        id="doc-contract"
        className="max-w-5xl mx-auto bg-white border border-slate-400 shadow-sm p-6 sm:p-10 font-serif text-black leading-relaxed"
      >
        <div className="text-center pb-3 mb-4 border-b border-black">
          {/* <span className="text-[11px] font-sans font-bold tracking-widest text-teal-800 uppercase block mb-1">
            MEDIYAZ ART BANK • STATUTORY CONTRACT (SECTIONS 22 & 27 OF ART ACT 2021)
          </span> */}
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black underline underline-offset-4">
            Contract between the ART bank and the Oocyte Donor
          </h2>
          <p className="text-base text-slate-700 mt-1 font-normal">
            एआरटी बैंक और अंडाणु दाता के बीच अनुबंध
          </p>
        </div>

        <p className="text-xs sm:text-sm text-justify mb-3">
          The ART bank and the Donor agree to come into this contract today on the{" "}
          {displayDate} as per the following conditions.
        </p>

        {/* First Part & Second Part: Both English & Hindi */}
        <div className="space-y-3 text-xs sm:text-sm text-justify mb-4">
          <div className="space-y-2">
            <p>
              <strong className="font-bold">First Part</strong> being <strong className="font-bold">(MEDIYAZ ART BANK)</strong> having its office at{" "}
              <strong className="font-bold">366/4, Govindpuri Kalka ji new Delhi 110019</strong>, and the registered office at{" "}
              <strong className="font-bold">366/4, Govindpuri Kalka ji new Delhi 110019</strong>, herein referred to as the{" "}
              <strong className="font-bold">ART Bank</strong> (which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include legal representatives, administrators, etc., of the said ART Bank);
            </p>
            <p className="text-slate-800 ">
              पहला भाग <strong className="font-bold">(मेडियाज़ एआरटी बैंक)</strong>, जिसका कार्यालय{" "}
              <strong className="font-bold">366/4, गोविंदपुरी कालका जी नई दिल्ली 110019</strong> में है, और पंजीकृत कार्यालय{" "}
              <strong className="font-bold">366/4, गोविंदपुरी कालका जी नई दिल्ली 110019</strong> में है, जिसे यहां{" "}
              <strong className="font-bold">एआरटी बैंक</strong> कहा गया है (जो अभिव्यक्ति है जब तक कि यह संदर्भ या उसके अर्थ के प्रतिकूल न हो, इसका मतलब यह माना जाएगा और इसमें उक्त एआरटी बैंक के कानूनी प्रतिनिधि, प्रशासक आदि शामिल होंगे);
            </p>
          </div>

          <div className="text-center font-bold text-xs uppercase my-2">And / तथा</div>

          <div className="space-y-2">
            <p>
              <strong className="font-bold">Second Part</strong> I{" "}
              {personalInfo.fullName} W/O{" "}
              {personalInfo.husbandName || personalInfo.spouseName}
              {Boolean(personalInfo.husbandEducation || personalInfo.spouseEducation) && (
                <> (Education: {personalInfo.husbandEducation || personalInfo.spouseEducation})</>
              )}, Residential Address (as per Aadhaar card):{" "}
              {permAddress}, Current Address:{" "}
              {fullAddress} and Aadhar No{" "}
              {personalInfo.aadhaarNumber} date of birth{" "}
              {personalInfo.dateOfBirth} and Mobile no{" "}
              {contactInfo.mobileNumber}, herein referred to as the Donor (which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include legal representatives, administrators, etc., of the said Clinic.
            </p>
            <p className="text-slate-800 ">
              दूसरा भाग है मैं {personalInfo.fullName} पत्नी{" "}
              {personalInfo.husbandName || personalInfo.spouseName}
              {Boolean(personalInfo.husbandEducation || personalInfo.spouseEducation) && (
                <> (शिक्षा: {personalInfo.husbandEducation || personalInfo.spouseEducation})</>
              )}, आवासीय पता (आधार कार्ड के अनुसार):{" "}
              {permAddress}, वर्तमान पता:{" "}
              {fullAddress} और आधार नं{" "}
              {personalInfo.aadhaarNumber} जन्म तिथि{" "}
              {personalInfo.dateOfBirth} और मोबाइल नं{" "}
              {contactInfo.mobileNumber}, को यहां दाता के रूप में संदर्भित किया गया है (यह अभिव्यक्ति, जब तक कि संदर्भ या उसके अर्थ के प्रतिकूल न हो, उक्त क्लिनिक के कानूनी प्रतिनिधियों, प्रशासकों आदि को शामिल माना जाएगा।
            </p>
          </div>
        </div>

        {/* Whereas Section: English & Hindi */}
        <div className="my-3">
          <div className="text-center font-bold text-xs uppercase mb-2">Whereas / जबकि</div>
          <div className="space-y-2 ">
            {[
              {
                en: "The first part is ART bank that is established, amongst other purposes, to collect, screen and supply oocyte donor to ART clinics for use in ART procedures.",
                hi: "पहला भाग एआरटी बैंक है जो अन्य उद्देश्यों के साथ-साथ एआरटी प्रक्रियाओं में उपयोग के लिए एआरटी क्लीनिकों में ओओसाइट डोनर को इकट्ठा करने, स्क्रीन करने और आपूर्ति करने के लिए स्थापित किया गया है।",
              },
              {
                en: "The second part is an individual who has willingly agreed to donate her oocytes to the ART clinic against a consideration for the same.",
                hi: "दूसरा भाग एक व्यक्ति का है जो स्वेच्छा से एआरटी क्लिनिक को अपने अंडाणु दान करने के लिए सहमत हो गया है।",
              },
              {
                en: "That the ART Bank and the Donor have, therefore, come to form this contract to facilitate the process with the laid down terms and conditions.",
                hi: "इसलिए, एआरटी बैंक और दाता ने निर्धारित नियमों और शर्तों के साथ प्रक्रिया को सुविधाजनक बनाने के लिए यह अनुबंध तैयार किया है।",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-justify">
              <div className="flex items-start gap-2">
                <div className="w-5 pt-0.5">{idx + 1}.</div>
                <div>
                  <p className="text-black"> {item.en}</p>
                  <p className="text-slate-800">{item.hi}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* NOW THIS INDENTURE WITNESSETH THAT: All 11 Points in English & Hindi */}
        <div className="mt-4">
          <div className="text-center font-bold text-xs uppercase mb-3">
            NOW THIS INDENTURE WITNESSETH THAT:
          </div>
          <div className="space-y-2">
            {[
              {
                en: "The ART Bank agrees to screen and select oocyte donors and to supply them to ART clinics desiring of oocyte donors as per the rules laid down in the ART (Regulation) Act.2021.",
                hi: "एआरटी बैंक अण्डाणु दाताओं की जांच और चयन करने तथा एआरटी (विनियमन) अधिनियम 2021 में निर्धारित नियमों के अनुसार अण्डाणु दाताओं की इच्छा रखने वाले एआरटी क्लीनिकों को उनकी आपूर्ति करने के लिए सहमत है।",
              },
              {
                en: "The Donor agrees to disclose the true facts of herself and not to suppress any personal details to the Bank, including family history, genetic background, criminal background, religion, etc. The ART Bank agrees to keep all information about the Donor confidential. No information shall be disclosed by the ART Bank except by an order of a court or to the Indian Council of Medical Research. If any information is suppressed by the Donor and that suppression causes any damage in the ART procedure or to the patient, then the ART Bank will not be responsible for it but only the Donor will be responsible and punishable under the provisions of law.",
                hi: "दाता अपने बारे में सही तथ्यों का खुलासा करने और पारिवारिक इतिहास, आनुवंशिक पृष्ठभूमि, आपराधिक पृष्ठभूमि, धर्म आदि सहित बैंक के किसी भी व्यक्तिगत विवरण को न छिपाने के लिए सहमत है। एआरटी बैंक दाता के बारे में सभी जानकारी को गोपनीय रखने के लिए सहमत है। कोई भी जानकारी अदालत के आदेश या भारतीय चिकित्सा अनुसंधान परिषद को छोड़कर घोषित नहीं की जाएगी। यदि कोई दाता द्वारा जानकारी छिपाई जाती है और उस दमन से एआरटी प्रक्रिया में या रोगी को कोई क्षति होती है, तो एआरटी बैंक इसके लिए जिम्मेदार नहीं होगा, बल्कि केवल दाता ही जिम्मेदार होगा और कानून के प्रावधानों के तहत दंडनीय होगा।",
              },
              {
                en: "The Donor agrees to relinquish all parental rights over the child, which may be conceived from his gamete.",
                hi: "दाता बच्चे पर सभी माता-पिता के अधिकारों को त्यागने के लिए सहमत है, जो उसके युग्मक से उत्पन्न हो सकता है|",
              },
              {
                en: "The Donor, agrees to take consent of her husband before donating her oocytes and also produce the same before the ART bank at the time of signing this agreement.",
                hi: "दाता, अपने अंडाणु दान करने से पहले अपने पति की सहमति लेने के लिए सहमत है और इस समझौते पर हस्ताक्षर करने के समय इसे एआरटी बैंक के समक्ष भी प्रस्तुत करेगी।",
              },
              {
                en: "The ART Bank agrees to inform the Donor about all the tests that would be necessary for the safety and protection of the ART procedure. The Donor agrees to undergo all the tests required by the ART Bank and ART Clinic. The ART Bank also agrees to inform the Donor about the results of the above tests.",
                hi: "एआरटी बैंक दाता को उन सभी परीक्षणों के बारे में सूचित करने के लिए सहमत है जो एआरटी प्रक्रिया की सुरक्षा और सुरक्षा के लिए आवश्यक होंगे। दाता एआरटी बैंक और एआरटी क्लिनिक द्वारा आवश्यक सभी परीक्षणों से गुजरने के लिए सहमत है। एआरटी बैंक उपरोक्त परीक्षणों के परिणामों के बारे में दाता को सूचित करने के लिए भी सहमत है।",
              },
              {
                en: "The Donor agrees to be assigned to ART clinic as directed by the ART Bank for the purposes of undergoing oocyte donation.",
                hi: "दाता अंडाणु दान के प्रयोजनों के लिए एआरटी बैंक के निर्देशानुसार एआरटी क्लिनिक को सौंपे जाने के लिए सहमत है।",
              },
              {
                en: "The Donor agrees to undergo ovarian stimulation by taking regular medication as directed by the ART clinic and come regularly for follow up as directed.",
                hi: "दाता एआरटी क्लिनिक के निर्देशानुसार नियमित दवा लेकर डिम्बग्रंथि उत्तेजना से गुजरने और निर्देशानुसारअनुवर्ती कार्रवाई के लिए नियमित रूप से आने के लिए सहमत है।",
              },
              {
                en: "The donor has been adequately informed by the ART Bank about the procedure and its potential complications.",
                hi: "एआरटी बैंक द्वारा दाता को प्रक्रिया और इसकी संभावित जटिलताओं के बारे में पर्याप्त जानकारी दी गई है।",
              },
              {
                en: "The Donor agrees not to discontinue treatment midway except on medical Advice of the ART clinic.",
                hi: "दाता एआरटी क्लिनिक की चिकित्सा सलाह के अलावा बीच में इलाज बंद नहीं करने पर सहमत है।",
              },
              {
                en: "The ART Bank and the Donor agree to abide by all the relevant provisions relating to sourcing, storage, handling and record keeping for gametes, embryos duties of patients, donors, respectively, of the ART (Regulation) Act. 2021.",
                hi: "बैंक और दाता एआरटी (विनियमन) अधिनियम 2021 के क्रमशः युग्मक, भ्रूण और रोगियों, दाताओं के कर्तव्यों के लिए सोर्सिंग, भंडारण, हैंडलिंग और रिकॉर्ड रखने से संबंधित सभी प्रासंगिक प्रावधानों का पालन करने के लिए सहमत हैं।",
              },
              {
                en: "This agreement is signed by both the parties after a clear understanding of all the issues involved, and in full senses and under no pressure from any person.",
                hi: "सभी की स्पष्ट समझ के बाद इस समझौते पर दोनों पक्षों द्वारा हस्ताक्षर किए जाते हैं जो मुद्दे शामिल हैं, और पूरे होश-हवास में और किसी भी व्यक्ति के दबाव में नहीं।",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-justify">
              <div className="flex items-start gap-2">
                <div className="w-5 pt-0.5">{idx + 1}.</div>
                <div>
                  <p className="text-black"> {item.en}</p>
                  <p className="text-slate-800">{item.hi}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Contract Signature Block */}
        <div className="flex justify-between items-end mt-10 pt-6 text-xs">
          <div className="text-center font-bold">
            <div className="min-h-[44px] flex items-end justify-center mb-1">
              <img
                src="/images/signature.png"
                alt="Director Signature"
                className="max-h-11 max-w-[140px] object-contain"
              />
            </div>
            <div className="border-t border-black w-48 mx-auto pt-1">
              For MEDIYAZ ART BANK
            </div>
            <div className="text-[10px] font-normal text-slate-700">Proprietor</div>
            <div className="text-[10px] font-normal text-slate-600">First Part</div>
          </div>

          <div className="text-center">
            <div className="min-h-[44px] flex items-end justify-center mb-1">
              {documents?.signature?.url ? (
                <img
                  src={documents.signature.url}
                  alt="Donor Signature"
                  className="max-h-11 max-w-[140px] object-contain"
                />
              ) : (
                <span className="text-slate-400 italic text-[11px]">Digital Signature on File</span>
              )}
            </div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-bold">
              Signature of Donor
              <br />
              <span className="font-normal text-[10px] text-slate-600">Second Part</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── DOCUMENT 3: INFORMATION FORM FOR OOCYTE DONOR ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        id="doc-info"
        className="max-w-5xl mx-auto bg-white border border-slate-400 shadow-sm p-6 sm:p-10 font-serif text-black leading-relaxed"
      >
        <div className="text-center pb-3 mb-4">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black underline underline-offset-4">
            INFORMATION FORM FOR OOCYTE DONOR
          </h2>
          {/* <p className="text-xs text-slate-700 mt-1 font-normal font-sans">
            Statutory Clinical & Phenotypic Record under Assisted Reproductive Technology Rules, 2022
          </p> */}
        </div>

        {/* Section: BASIC INFORMATION */}
        <div className="space-y-2 mb-4 font-sans text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            BASIC INFORMATION:
          </div>
          <div className="border border-black overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <tbody>
                <tr className="border-b border-black font-bold bg-slate-50">
                  <td className="p-1.5 border-r border-black w-[28%]"> Personal Information</td>
                  <td className="p-1.5 border-r border-black w-[22%] "> Value</td>
                  <td className="p-1.5 border-r border-black w-[38%] ">HISTORY</td>
                  <td className="p-1.5 w-[12%] ">STATUS</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black w-[28%]">Donor Name</td>
                  <td className="p-1.5 border-r border-black w-[22%]">{personalInfo.fullName || "—"}</td>
                  <td className="p-1.5 border-r border-black">9. Obstetric history</td>
                  <td className="p-1.5">{donorInfo.obstetricHistory || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">1. Identification number (Donor)</td>
                  <td className="p-1.5 border-r border-black font-mono">
                    {personalInfo.aadhaarNumber || "—"}
                  </td>
                  <td className="p-1.5 border-r border-black pl-3">a. Number of deliveries</td>
                  <td className="p-1.5 font-bold">{donorInfo.numberOfDeliveries || "01"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">2. Age / Date of birth</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.dateOfBirth || "—"}</td>
                  <td className="p-1.5 border-r border-black pl-3">b. Number of abortions</td>
                  <td className="p-1.5">{donorInfo.numberOfAbortions || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">3. Marital status</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.maritalStatus || "—"}</td>
                  <td className="p-1.5 border-r border-black pl-3">c. other points of note</td>
                  <td className="p-1.5">{donorInfo.otherPointsOfNote || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">4. Education of donor</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.education || "—"}</td>
                  <td className="p-1.5 border-r border-black">10. Menstrual history</td>
                  <td className="p-1.5">{donorInfo.menstrualCycleDetails || "Regular"}</td>
                </tr>
                <tr className="border-b border-black ">
                  <td className="p-1.5 border-r border-black">5. Education spouse</td>
                  <td className="p-1.5 border-r border-black ">
                    {personalInfo.husbandEducation || personalInfo.spouseEducation || "N/A"}
                  </td>
                  <td className="p-1.5 border-r border-black">11. History of use of contraceptives</td>
                  <td className="p-1.5">{donorInfo.contraceptiveHistory || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">6. Occupation of donor</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.occupation || "—"}</td>
                  <td className="p-1.5 border-r border-black">12. Medical history</td>
                  <td className="p-1.5">{medicalInfo.medicalHistory || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">7. Occupation of spouse</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.husbandOccupation || personalInfo.spouseOccupation || " "}</td>
                  <td className="p-1.5 border-r border-black">13. Family history from the medical point of view</td>
                  <td className="p-1.5">{medicalInfo.familyMedicalHistory || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">6. Monthly income</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.monthlyIncome || " "}</td>
                  <td className="p-1.5 border-r border-black">14. History of any abnormality in a child of the donor</td>
                  <td className="p-1.5">{medicalInfo.childAbnormalityHistory || medicalInfo.geneticDisorders || "No"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">7. Religion</td>
                  <td className="p-1.5 border-r border-black">{personalInfo.religion || " "}</td>
                  <td className="p-1.5 border-r border-black">15. History of blood transfusion</td>
                  <td className="p-1.5">{donorInfo.bloodTransfusionHistory || "No"}</td>
                </tr>
                <tr className="">
                  <td className="p-1.5 border-r border-black">8. Nationality</td>
                  <td className="p-1.5 border-r border-black">{contactInfo.country || "Indian"}</td>
                  <td className="p-1.5 border-r border-black">16. History of substance abuse</td>
                  <td className="p-1.5">{donorInfo.substanceAbuseHistory || "No"}</td>
                </tr>
                {/* <tr className="border-b border-black bg-slate-50">
                  <td className="p-1.5 border-r border-black font-semibold">Residential Address (as per Aadhaar card)</td>
                  <td colSpan={3} className="p-1.5 font-medium">{permAddress}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-1.5 border-r border-black font-semibold">Current Address</td>
                  <td colSpan={3} className="p-1.5 font-medium">{fullAddress}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: FEATURES */}
        <div className="space-y-2 mb-4 font-sans text-xs">
          <div className="font-bold uppercase tracking-wider text-black">
            FEATURES:
          </div>
          <div className="border border-black overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <tbody>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black w-1/4">17. Height</td>
                  <td className="p-1.5 border-r border-black w-1/4 font-semibold">{personalInfo.height || "—"}</td>
                  <td className="p-1.5 border-r border-black w-1/4">20. Colour of hair</td>
                  <td className="p-1.5 w-1/4 font-semibold">{personalInfo.hairColor || "—"}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-1.5 border-r border-black">18. Weight</td>
                  <td className="p-1.5 border-r border-black font-semibold">{personalInfo.weight || "—"}</td>
                  <td className="p-1.5 border-r border-black">21. Colour of eyes</td>
                  <td className="p-1.5 font-semibold">{personalInfo.eyeColor || "—"}</td>
                </tr>
                <tr>
                  <td className="p-1.5 border-r border-black">19. Colour of skin</td>
                  <td className="p-1.5 border-r border-black font-semibold">{personalInfo.complexion || "—"}</td>
                  <td className="p-1.5 border-r border-black"></td>
                  <td className="p-1.5"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        

        {/* Footnotes */}
        <div className="font-sans text-slate-700 space-y-0.5 pt-2">
          <div className="font-bold">Footnotes:</div>
          <div>(1) To be carried out within 15 days prior to oocyte donation</div>
          <div>(2) Any additional test carried out on the basis of the history and examination of donor</div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── DOCUMENT 4: AFFIDAVIT OF OOCYTE DONOR ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        id="doc-affidavit"
        className="max-w-5xl mx-auto bg-white border border-slate-400 shadow-sm p-6 sm:p-10 font-serif text-black leading-relaxed"
      >
        <div className="text-center pb-3 mb-4 border-b border-black">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black underline underline-offset-4">
            AFFIDAVIT OF OOCYTE DONOR
          </h2>
          <p className="text-xs text-slate-700 mt-1 font-normal font-sans">
            Under Section 27(4) of Assisted Reproductive Technology (Regulation) Act, 2021
          </p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-justify leading-relaxed">
          <p>
            I, {personalInfo.fullName}, W/O{" "}
            {personalInfo.husbandName || personalInfo.spouseName}
            {Boolean(personalInfo.husbandEducation || personalInfo.spouseEducation) && (
              <> (Education: {personalInfo.husbandEducation || personalInfo.spouseEducation})</>
            )}, Residential Address (as per Aadhaar card):{" "}
            {permAddress}, Current Address:{" "}
            {fullAddress}, Aadhaar No.{" "}
            {personalInfo.aadhaarNumber}, date of birth{" "}
            {personalInfo.dateOfBirth} and Mobile No.{" "}
            {contactInfo.mobileNumber}, solemnly affirm and depose as under:
          </p>

          <ol className="list-decimal pl-5 space-y-2.5 mt-3">
            <li className="pl-1">
              That I am married to {personalInfo.husbandName || personalInfo.spouseName || "  "}{" "}
              and have {donorInfo.numberOfDeliveries || "1"} child.
            </li>
            <li className="pl-1">
              That this affidavit of undertaking is sworn in compliance of Section 27(4) of Assisted Reproductive Technology (Regulation) 2021.
            </li>
            <li className="pl-1">
              I understand and accept that the drugs that are used to stimulate the ovaries to raise oocytes have temporary side effects like nausea, headaches and abdominal bloating. Only in a small proportion of cases, a condition called ovarian hyper stimulation occurs where there is an exaggerated ovarian response. Such cases can be identified ahead of time but only to a limited extent. Further, at times the ovarian response is poor or absent in spite of using a high dose of drugs. Under these circumstances, the treatment cycle will be cancelled.
            </li>
            <li className="pl-1">
              I understand that there will be no direct or indirect contact between me and the recipient/Intended Parent(s) and my personal identity will not be disclosed to the recipient or to the child born through the use of my gamete apart from being directed by a court of law.
            </li>
            <li className="pl-1">
              I have agreed to donate my oocytes/eggs at my own free will and after understanding the legal, medical procedures and their associated risks and obligations involved.
            </li>
            <li className="pl-1">
              I have not been allured by any person from the ART clinic to make egg donation.
            </li>
            <li className="pl-1">
              I undertake that since commencement of Assisted Reproductive Technology (Regulation) 2021 I have not donated my oocytes/eggs and this is the first time in my life I am donating my oocytes/eggs.
            </li>
            <li className="pl-1">
              That the contents of this affidavit have been read over and explained to me and I have fully understood the same and nothing material has been concealed by me.
            </li>
          </ol>

          {/* Verification Section */}
          <div className="mt-10 pt-4">
            {/* <div className="font-bold text-xs uppercase tracking-wider mb-1">VERIFICATION:</div> */}
            <p className="">
              Verified at {contactInfo.city || "New Delhi"} on the{" "}
              {`${day} ${month} ${year}`} that the contents of the affidavit are true and correct to the best of my knowledge and nothing has been concealed therefrom.
            </p>
          </div>
        </div>

        {/* Affidavit Signature Block */}
        <div className="flex justify-between items-end mt-8 pt-6 text-sm">
          <div className="text-left font-sans">
            <div><strong className="font-bold">Date:</strong> {day} {month} {year}</div>
            <div><strong className="font-bold">Place:</strong> {contactInfo.city || "New Delhi"}</div>
          </div>

          <div className="text-center">
            <div className="min-h-[44px] flex items-end justify-center mb-1">
              {documents?.signature?.url ? (
                <img
                  src={documents.signature.url}
                  alt="Deponent Signature"
                  className="max-h-11 max-w-[140px] object-contain"
                />
              ) : (
                <span className="text-slate-400 italic text-[11px]">Signature on File</span>
              )}
            </div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-bold">
              DEPONENT (Donor)
              <br />
              <span className="font-normal text-[10px] text-slate-600">
                शपथकर्ता (हस्ताक्षर)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── STATUTORY CONSENT CHECKBOXES (FINAL AUTHORIZATION) ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {/* ──── STATUTORY CONSENT CHECKBOXES (FINAL AUTHORIZATION) ──── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div id="statutory-consent-section" className="max-w-5xl mx-auto space-y-4 p-6 rounded-xl border border-rose-300 bg-rose-50/50 shadow-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-rose-900">
              Mandatory Legal Declarations under Assisted Reproductive Technology (Regulation) Act, 2021
            </h4>
            
            <p className="text-xs text-rose-800/80 mt-1">
              Please mark each declaration below to confirm your understanding and execute formal electronic submission.
            </p>
            
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Declaration 1 */}
          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-100/40 transition-colors cursor-pointer group">
            <input
              type="checkbox"
              checked={consent.confirmTruth}
              onChange={(e) => updateConsent({ confirmTruth: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63] shrink-0"
            />
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-slate-900 group-hover:text-black">
                I solemnly declare that all personal, obstetric, marital, and health details provided by me in this registration form are completely true and accurate. <span className="text-rose-600 font-bold">*</span>
              </span>
              <span className="block text-[11px] text-slate-600 font-normal leading-relaxed">
                मैं सत्यनिष्ठा से घोषणा करती हूँ कि इस पंजीकरण फॉर्म में मेरे द्वारा प्रदान किए गए सभी व्यक्तिगत, प्रसूति, वैवाहिक और स्वास्थ्य संबंधी विवरण पूरी तरह सत्य और सटीक हैं।
              </span>
            </div>
          </label>
          {errors.confirmTruth && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.confirmTruth}</p>}

          {/* Declaration 2 */}
          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-100/40 transition-colors cursor-pointer group">
            <input
              type="checkbox"
              checked={consent.agreeVoluntary}
              onChange={(e) => updateConsent({ agreeVoluntary: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63] shrink-0"
            />
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-slate-900 group-hover:text-black">
                I confirm that my oocyte donation is completely voluntary and altruistic without commercial coercion. <span className="text-rose-600 font-bold">*</span>
              </span>
              <span className="block text-[11px] text-slate-600 font-normal leading-relaxed">
                मैं पुष्टि करती हूँ कि मेरा डिंब (अंडाणु) दान बिना किसी व्यावसायिक दबाव या वित्तीय प्रलोभन के, पूरी तरह से स्वैच्छिक और परोपकारी है।
              </span>
            </div>
          </label>
          {errors.agreeVoluntary && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.agreeVoluntary}</p>}

          {/* Declaration 3 */}
          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-100/40 transition-colors cursor-pointer group">
            <input
              type="checkbox"
              checked={consent.confirmOnceInLifetime}
              onChange={(e) => updateConsent({ confirmOnceInLifetime: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63] shrink-0"
            />
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-slate-900 group-hover:text-black">
                Under Section 27(3) of ART Act 2021, I declare that I have NEVER previously donated oocytes to any ART clinic or bank, and this is my only lifetime donation. <span className="text-rose-600 font-bold">*</span>
              </span>
              <span className="block text-[11px] text-slate-600 font-normal leading-relaxed">
                एआरटी अधिनियम 2021 की धारा 27(3) के तहत, मैं घोषणा करती हूँ कि मैंने पूर्व में कभी भी किसी एआरटी क्लिनिक या बैंक में डिंब (अंडाणु) दान नहीं किया है, और यह मेरे जीवनकाल का एकमात्र दान है।
              </span>
            </div>
          </label>
          {errors.confirmOnceInLifetime && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.confirmOnceInLifetime}</p>}

          {/* Declaration 4 (Husband) */}
          {personalInfo.maritalStatus === "Married" && (
            <>
              <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-100/40 transition-colors cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent.husbandConsentConfirmed}
                  onChange={(e) => updateConsent({ husbandConsentConfirmed: e.target.checked })}
                  className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63] shrink-0"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-semibold text-slate-900 group-hover:text-black">
                    My husband ({personalInfo.husbandName || personalInfo.spouseName || "Spouse"}) is fully aware of and consents to my voluntary egg donation per ART Act 2021 requirements. <span className="text-rose-600 font-bold">*</span>
                  </span>
                  <span className="block text-[11px] text-slate-600 font-normal leading-relaxed">
                    मेरे पति ({personalInfo.husbandName || personalInfo.spouseName || "पति"}) एआरटी अधिनियम 2021 की आवश्यकताओं के अनुसार मेरे स्वैच्छिक डिंब दान से पूरी तरह अवगत हैं और इसके लिए अपनी सहमति देते हैं।
                  </span>
                </div>
              </label>
              {errors.husbandConsentConfirmed && (
                <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.husbandConsentConfirmed}</p>
              )}
            </>
          )}

          {/* Declaration 5 */}
          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-rose-100/40 transition-colors cursor-pointer group">
            <input
              type="checkbox"
              checked={consent.allowStorage}
              onChange={(e) => updateConsent({ allowStorage: e.target.checked as any })}
              className="mt-0.5 rounded text-[#285b63] focus:ring-[#285b63] shrink-0"
            />
            <div className="space-y-0.5 text-xs">
              <span className="font-semibold text-slate-900 group-hover:text-black">
                I understand that all medical expenses and mandatory insurance coverage are borne by the intending parents / ART bank under ART Act 2021. <span className="text-rose-600 font-bold">*</span>
              </span>
              <span className="block text-[11px] text-slate-600 font-normal leading-relaxed">
                मैं समझती हूँ कि एआरटी अधिनियम 2021 के तहत सभी चिकित्सा खर्च और अनिवार्य बीमा कवरेज इच्छुक माता-पिता / एआरटी बैंक द्वारा वहन किए जाते हैं।
              </span>
            </div>
          </label>
          {errors.allowStorage && <p className="text-[11px] text-rose-600 font-medium pl-6">{errors.allowStorage}</p>}
        </div>
      </div>
    </div>
  );
}
