const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read MONGODB_URI from .env
function getMongoUri() {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('MONGODB_URI=')) {
        return trimmed.replace('MONGODB_URI=', '').trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return process.env.MONGODB_URI;
}

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
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
      name: { type: String, default: "Mediyaz Clinical Editorial Board" },
      role: { type: String, default: "ART Clinical & Embryology Specialists" },
      avatar: { type: String, default: "/img/logo.webp" },
    },
    readTime: { type: String, default: "5 min read" },
    coverImage: { type: String, default: "/img/home.jpg" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const posts = [
  {
    title: "Understanding the Assisted Reproductive Technology (Regulation) Act, 2021 in India",
    slug: "understanding-art-regulation-act-2021-india",
    category: "Legal & Regulatory",
    readTime: "6 min read",
    publishedAt: new Date("2026-08-28T09:00:00.000Z"),
    coverImage: "/img/blogs/art-regulation.jpg",
    tags: ["ART Act 2021", "Statutory Compliance", "Donor Anonymity", "Legal Framework"],
    author: {
      name: "Adv. Kavita Ramanathan & Dr. S. Nair",
      role: "Regulatory Compliance & ART Legal Counsel",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "A comprehensive guide for intended parents and clinics on statutory anonymity (Sections 27 & 28), legal parentage (Section 31), and the strict prohibition of commercial gamete trade.",
    content: `
## Introduction: The New Statutory Era in Indian ART

The Assisted Reproductive Technology (Regulation) Act, 2021 (Act No. 42 of 2021), enacted by the Parliament of India and brought into statutory force alongside the ART Rules 2022, represents a transformative milestone in the governance of fertility care across India. Prior to this landmark legislation, assisted reproduction operated primarily under ethical advisories published by the Indian Council of Medical Research (ICMR).

Under the 2021 Act, gamete banking is formally separated from ART clinical practices to prevent conflicts of interest and ensure independent quality assurance. Mediyaz ART Bank operates under these strict mandates to maintain statutory transparency, medical rigor, and ethical safeguarding.

---

## 1. Absolute Prohibition of Commercial Gamete Trade

Section 27 of the ART Act explicitly codifies that gamete donation in India must be strictly altruistic. The sale, purchase, brokering, or commercial commodification of human oocytes or sperm is a cognizable criminal offense punishable under Chapter VII with severe statutory penalties.

- **Altruistic Principle:** Donors may only receive legitimate medical reimbursements, reasonable travel allowances, and statutory insurance coverage.
- **Independent Banking:** Level 2 ART clinics are strictly barred from sourcing gametes directly or operating in-house independent gamete registries without licensed ART Bank affiliation.

---

## 2. Statutory Anonymity Mandates (Sections 27 & 28)

Under Section 27(2) and Section 28, the identity of the gamete donor shall remain confidential and protected from disclosure to the intending parents, the child, and the public at large.

1. **Non-Identifying Phenotypic Records:** Intending couples have the legal right to review non-identifying donor records—including physical parameters (height, eye color, skin tone), educational aptitude, general ethnic background, and comprehensive multigenerational genetic health profiles.
2. **Biometric Confidentiality:** Aadhaar numbers, residential addresses, real names, contact numbers, and biometric records are securely tokenized and registered only in the National ART and Surrogacy Registry portal.
3. **Judicial Exceptions:** Sourcing records may only be subpoenaed under explicit court orders issued by a Court of competent jurisdiction in situations involving severe hereditary life-threatening disorders.

---

## 3. Conclusive Legal Parentage (Section 31)

Section 31 of the Act establishes unequivocal legal certainty regarding parentage. The child born through assisted reproductive technology utilizing donor gametes is deemed to be the legitimate child of the intending couple or commissioning individual for all statutory, inheritance, and legal purposes:

> *"The donor shall relinquish all parental rights, duties, and claims of any nature over the child born through the use of the donated gametes. The child shall possess all statutory rights of inheritance and legitimacy solely through the commissioning parents."*

---

## Conclusion & Clinical Takeaway

Compliance with the ART Act 2021 is not simply an administrative checkbox; it is the cornerstone of clinical safety and social integrity. By utilizing a certified and licensed ART Bank such as Mediyaz, intending parents and clinical specialists ensure seamless compliance, absolute legal protection, and flawless cryo-chain custody.
    `.trim(),
  },
  {
    title: "Beta-Thalassemia & Hemoglobinopathy Screening in Indian ART Banking",
    slug: "beta-thalassemia-hemoglobinopathy-screening-art-banking",
    category: "Genetic Health",
    readTime: "5 min read",
    publishedAt: new Date("2026-08-25T10:30:00.000Z"),
    coverImage: "/img/blogs/genetic-screening.jpg",
    tags: ["Genetics", "Beta Thalassemia", "HPLC Screening", "Embryology"],
    author: {
      name: "Dr. Arvind Chawla, MD (Pathology)",
      role: "Head of Diagnostic & Genetic Screening, Mediyaz",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "Why High Performance Liquid Chromatography (Hb HPLC) and high-resolution karyotyping are indispensable safety standards for donor gametes in the Indian subcontinent.",
    content: `
## The Epidemiological Context in India

Hemoglobinopathies—predominantly Beta-Thalassemia Major and Sickle Cell Syndromes—represent one of the most prevalent monogenic genetic health burdens across the Indian subcontinent. In India, the carrier frequency for Beta-Thalassemia traits ranges between 3% and 17% depending on geographic region and endogamous demographic clusters.

When an oocyte donor or sperm donor carries a silent beta-thalassemia minor trait (heterozygous beta-globin gene mutation) and matches with an intended parent who is also an unidentified carrier, there is a 25% statutory risk in every pregnancy of giving birth to a child with Beta-Thalassemia Major—a lifelong transfusion-dependent condition.

---

## The Mediyaz Multi-Tiered Screening Protocol

To ensure absolute genetic security, Mediyaz ART Bank adheres to a zero-compromise diagnostic screening workflow:

### 1. Complete Blood Count (CBC) with Red Cell Indices
- Assessment of Mean Corpuscular Volume (MCV < 80 fL)
- Mean Corpuscular Hemoglobin (MCH < 27 pg)
- Mentzer Index calculation ($MCV / RBC < 13$) to differentiate iron deficiency from thalassemia minor.

### 2. Automated Cation-Exchange HPLC (Hemoglobin Variants)
High Performance Liquid Chromatography (HPLC) remains the gold standard:
- Quantitative estimation of **HbA2 fraction** (> 3.5% confirms Beta-Thalassemia trait).
- Detection of aberrant peaks including HbE, HbS (Sickle), and HbD-Punjab.
- Any donor displaying an elevated HbA2 fraction or abnormal variant peak is permanently deferred from gamete donation.

### 3. G6PD Quantitative Assay
Glucose-6-Phosphate Dehydrogenase deficiency is screened quantitatively to avert acute hemolytic episodes in prospective offspring exposed to oxidative pharmacological agents.

### 4. High-Resolution Peripheral Blood Karyotyping (G-Banding)
Prior to clinical induction, every donor undergoes 550-band cytogenetic karyotyping to rule out balanced reciprocal translocations, Robertsonian translocations, inversions, and numerical chromosomal aneuploidies.

---

## Clinical Implications for Intended Parents

Intended parents can cross-match their own carrier screening panels against the non-identifying genetic profile provided by Mediyaz ART Bank. By eliminating shared autosomal recessive mutations, clinics achieve optimal pre-conception safety and peaceful reassurance.
    `.trim(),
  },
  {
    title: "The 180-Day Cryo-Quarantine Protocol for Donor Semen: Clinical Rationale",
    slug: "180-day-cryo-quarantine-protocol-donor-semen",
    category: "Clinical Quality",
    readTime: "5 min read",
    publishedAt: new Date("2026-08-18T14:15:00.000Z"),
    coverImage: "/img/blogs/cryo-quarantine.jpg",
    tags: ["Cryopreservation", "Serology Quarantine", "Infectious Disease", "Quality Assurance"],
    author: {
      name: "Dr. Meenakshi Sundaram, Ph.D.",
      role: "Chief Embryologist & Cryobiologist",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "Understanding why mandatory 6-month cryogenic quarantine and post-quarantine repeat infectious serology are required by national guidelines before donor release.",
    content: `
## Why Fresh Donor Semen is Prohibited

Under the National Guidelines for ART and the ART (Regulation) Act, 2021, the use of fresh (non-quarantined) donor semen is strictly prohibited in Indian clinical practice. Every sperm specimen released by an authorized ART bank must undergo mandatory cryogenic quarantine in liquid nitrogen vapour ($ -196^\\circ\\text{C} $) for a minimum duration of **180 days (6 months)**.

---

## The "Window Period" Clinical Threat

Infectious pathogens—most notably **Human Immunodeficiency Virus (HIV-1 and HIV-2)**, **Hepatitis B Virus (HBV)**, and **Hepatitis C Virus (HCV)**—feature diagnostic serological "window periods".

During the window period, an infected individual may shed viral RNA in seminal plasma while testing seronegative for surface antigens (HBsAg) or host antibodies (Anti-HIV 1/2, Anti-HCV).

| Pathogen | Standard Serology Window | Nucleic Acid Testing (NAT) Window |
|---|---|---|
| HIV-1 / HIV-2 | Up to 12 weeks | 10 to 14 days |
| Hepatitis B (HBV) | 6 to 16 weeks | 20 to 30 days |
| Hepatitis C (HCV) | 8 to 24 weeks | 7 to 10 days |
| Syphilis (Treponema) | 3 to 6 weeks | N/A |

By cryopreserving the semen sample for 180 days and repeating the complete infectious serology panel on the donor at Day 180+, clinical teams conclusively verify that the donor was not in an incubation window at the time of ejaculation.

---

## The Step-by-Step Quarantine Workflow at Mediyaz

1. **Initial Day-0 Clearance:** The donor completes a comprehensive baseline panel (HIV-1/2 Ag/Ab, HBsAg, Anti-HCV, VDRL, Chlamydia trachomatis, and Neisseria gonorrhoeae PCR).
2. **Cryopreservation & Vapor Phase Storage:** Semen is processed with specialized zwitterion-buffered cryoprotectants and frozen into color-coded, tamper-evident straws stored in dedicated quarantine liquid nitrogen tanks.
3. **180-Day Hold:** The straws remain digitally locked in Mediyaz's CryoTrack ERP system. No aliquot can be requisitioned.
4. **Day-180 Serological Re-Evaluation:** The donor returns to the accredited clinical collection facility for repeat blood sampling.
5. **Certified Release:** Only when all repeat tests confirm non-reactive status is the batch digitally transferred to the "Active Sourcing Registry" for clinical release.
    `.trim(),
  },
  {
    title: "The Clinical Journey of an Oocyte Donor Under Indian Regulations",
    slug: "clinical-journey-oocyte-donor-indian-regulations",
    category: "Donor Care & Insurance",
    readTime: "6 min read",
    publishedAt: new Date("2026-07-30T11:00:00.000Z"),
    coverImage: "/img/blogs/egg-donor-care.jpg",
    tags: ["Egg Donation", "Controlled Stimulation", "Oocyte Retrieval", "Donor Safety"],
    author: {
      name: "Dr. Priyamvada Joshi, MS, DNB (OBGYN)",
      role: "Senior Consultant in Reproductive Medicine",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "A step-by-step walkthrough covering statutory eligibility (ever-married, age 23–35 with living child), the single lifetime donation limit, and daycare transvaginal retrieval.",
    content: `
## Statutory Eligibility Mandates

Under Section 27(1)(b) of the ART Act 2021, an oocyte (egg) donor in India must satisfy precise legal criteria before any medical stimulation may begin:

- **Marital & Reproductive Status:** The donor must be an **ever-married woman** who has at least **one living child** of her own, with the youngest child having attained at least three (3) years of age.
- **Age Bounds:** Strictly between **23 and 35 years** of age on the date of clinical recruitment.
- **Single Lifetime Limit:** An oocyte donor may donate oocytes **only once in her entire lifetime**, and no more than seven (7) oocytes may be retrieved or utilized for an intending couple without statutory oversight.

---

## The 4-Phase Clinical Workflow

### Phase 1: Pre-Screening & Statutory Verification
The candidate submits official government identity (Aadhaar, marriage verification, and child birth certificates). Detailed clinical history is compiled, followed by baseline ultrasound assessment for Antral Follicle Count (AFC) and serum Anti-Müllerian Hormone (AMH).

### Phase 2: Controlled Ovarian Stimulation (COS)
Under the care of certified reproductive endocrinologists, the donor undergoes personalized antagonist protocols:
- Daily recombinant FSH (rFSH) or human menopausal gonadotropins (hMG) over 9 to 12 days.
- Serial transvaginal folliculometry every 48 hours accompanied by serum Estradiol ($E_2$) and Progesterone tracking.
- GnRH antagonist administration to prevent premature LH surges.

### Phase 3: Ovulation Trigger & Ovarian Hyperstimulation Syndrome (OHSS) Prevention
To ensure zero risk of OHSS, Mediyaz protocol mandates GnRH agonist triggers (such as Triptorelin 0.2mg or Leuprolide) instead of high-dose hCG. This guarantees rapid luteolysis and protects donor well-being.

### Phase 4: Daycare Transvaginal Ultrasound-Guided Retrieval
Conducted under short conscious sedation (IV Propofol) by experienced fertility surgeons:
- 15-to-20-minute procedure with zero abdominal incisions.
- 2-to-4-hour post-procedure observation in recovery suites.
- Prophylactic oral antibiotics, NSAIDs, and immediate clinical discharge with home care supervision.
    `.trim(),
  },
  {
    title: "Mandatory 12-Month Health Insurance for Egg Donors under ART Rules 2022",
    slug: "mandatory-12-month-health-insurance-egg-donors-art-rules-2022",
    category: "Donor Care & Insurance",
    readTime: "5 min read",
    publishedAt: new Date("2026-07-13T08:45:00.000Z"),
    coverImage: "/img/blogs/health-insurance.jpg",
    tags: ["Health Insurance", "ART Rules 2022", "IRDAI", "Donor Protection"],
    author: {
      name: "Mediyaz Statutory Compliance Wing",
      role: "Institutional Oversight & Insurance Desk",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "How statutory health insurance underwritten by IRDAI-registered insurers protects altruistic donors against medical contingencies and complication risks.",
    content: `
## The Legislative Mandate: Rule 13 of ART Rules 2022

One of the most compassionate and legally binding protections introduced under the Assisted Reproductive Technology (Regulation) Rules, 2022 is **Rule 13**, governing mandatory insurance coverage for oocyte donors.

Before any controlled ovarian stimulation or medical procedure can be initiated, the intending couple or ART clinic sourcing the donor must purchase and execute an insurance policy in favor of the oocyte donor through an IRDAI-recognized insurance company.

---

## Key Terms of the Statutory Insurance Policy

1. **Policy Duration:** A minimum statutory coverage period of **twelve (12) consecutive months**, commencing from the date of the first clinical injection.
2. **Sum Insured:** Under Rule 13, the policy must provide substantial coverage sufficient to cover any medical emergency, hospitalization, medication, or clinical contingency.
3. **Comprehensive OHSS & Surgical Complication Coverage:** The policy explicitly covers all potential clinical sequelae, including severe Ovarian Hyperstimulation Syndrome (OHSS), ovarian torsion, pelvic inflammatory disease, or anesthesia-related adverse outcomes.
4. **Beneficiary Rights:** The policy is legally issued in the sole name of the oocyte donor, ensuring that her family or dependents are shielded from any medical financial liability.

---

## Mediyaz's Direct Compliance Mechanism

At Mediyaz ART Bank, no clinical stimulation schedule is ever approved without an official Certificate of Insurance uploaded and verified by our clinical desk. 

Intending parents are provided with full statutory documentation confirming that their selected donor file is completely insured and legally sanctioned under Indian jurisprudence.
    `.trim(),
  },
  {
    title: "How Registered ART Clinics Requisition Donor Gametes Under Section 21",
    slug: "how-registered-art-clinics-requisition-donor-gametes-section-21",
    category: "Intending Parents",
    readTime: "5 min read",
    publishedAt: new Date("2026-07-05T12:20:00.000Z"),
    coverImage: "/img/blogs/clinic-logistics.jpg",
    tags: ["Clinic Partnerships", "Gamete Sourcing", "Cold Chain Logistics", "Doctor Requisition"],
    author: {
      name: "Dr. Sandeep Vardhan, MD",
      role: "Director of Clinical Liaison & Cold-Chain Operations",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "Explaining the clinical requisition process: written doctor requisitions, non-identifying profile reviews, and tamper-sealed cryogenic cold-chain logistics.",
    content: `
## Institutional Protocol for Gamete Allocation

Under Section 21 of the ART Act 2021, an ART Bank is legally authorized to supply cryopreserved semen and oocytes exclusively to **Registered Level 1 and Level 2 ART Clinics**. Individuals or couples cannot purchase or transport donor gametes on their own.

This institutional protocol ensures that gametes remain within professional medical custody from cryo-preservation to micro-manipulation (ICSI/IVF).

---

## The 4-Step Requisition Protocol

### Step 1: Formal Clinical Requisition
The treating fertility specialist at an affiliated hospital or clinic submits a formal requisition specifying the clinical requirements (blood group matching, phenotypic criteria, and intended treatment timeline).

### Step 2: Phenotypic Review & Patient Selection
Intended parents and their consultant review non-identifying donor catalogs on Mediyaz's secure portal:
- Height, weight, complexion, hair color, eye color.
- Educational background, profession, hobbies, and blood group.
- Complete three-generation genetic and medical pedigree.

### Step 3: Statutory Clearance & Verification
Mediyaz verifies that the clinic holds an active National ART Registry registration number and that mandatory statutory donor consent forms (Form 13 & Form 14) are filed.

### Step 4: Cryogenic Dry-Shipper Cold-Chain Transport
Gametes are dispatched in certified **Liquid Nitrogen Dry Shippers** maintained at $ -196^\\circ\\text{C} $:
- Continuous data-logging temperature monitors.
- Tamper-evident, serialized physical security seals.
- Hand-delivered by trained medical couriers directly to the clinic's embryology laboratory.
    `.trim(),
  },
  {
    title: "Donor Anonymity vs. Non-Identifying Medical Profiles: What Indian Law Mandates",
    slug: "donor-anonymity-vs-non-identifying-medical-profiles",
    category: "Legal & Regulatory",
    readTime: "6 min read",
    publishedAt: new Date("2026-06-19T15:00:00.000Z"),
    coverImage: "/img/blogs/donor-anonymity.jpg",
    tags: ["Donor Anonymity", "Phenotypic Matching", "Privacy", "Statutory Profiles"],
    author: {
      name: "Adv. Kavita Ramanathan",
      role: "Senior Legal Advisor, Reproductive Law",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "Navigating confidentiality under the ART Act: safeguarding donor identity while providing intended parents with full clinical, physical, and genetic summaries.",
    content: `
## Balancing Transparency with Privacy

A frequent question raised by intended couples entering assisted reproductive treatment is: *“What information can I legally know about my donor, and where does donor anonymity begin?”*

The Assisted Reproductive Technology (Regulation) Act, 2021 strikes a deliberate and judicious statutory balance:
1. **Absolute Identity Protection:** Safeguarding donors and recipient families from future social, legal, or emotional conflicts.
2. **Comprehensive Clinical Transparency:** Equipping fertility physicians and parents with thorough medical, genetic, and phenotypic data necessary for healthy family building.

---

## What Information IS Disclosed

Under Indian clinical regulations, intended parents receive a detailed **Non-Identifying Donor Profile**:

- **Physical Phenotype:** Height, weight, body build, eye color, hair texture/color, and skin complexion.
- **Biomedical Parameters:** Blood group, Rh factor, hemoglobin status, and normal karyotype confirmation.
- **Educational & Professional Profile:** Level of schooling, university degrees, academic aptitude, and professional field.
- **Multigenerational Pedigree:** Family health history across parents and grandparents to exclude inherited cardio-metabolic, neuro-psychiatric, or neoplastic predispositions.
- **Infectious Disease Clearance:** Complete laboratory certification for HIV, Hepatitis B/C, VDRL, and cytomegalovirus (CMV).

---

## What Information is NEVER Disclosed

To preserve statutory anonymity under Sections 27 & 28:
- Real name, Aadhaar number, PAN card, or voter ID details.
- Residential address, phone numbers, or email addresses.
- Photographs, social media accounts, or employer information.

By keeping these domains strictly separated, Mediyaz ART Bank protects the autonomy, dignity, and lifelong emotional security of both the donor and the resulting child.
    `.trim(),
  },
  {
    title: "Nutritional and Lifestyle Preparation for Oocyte Donors",
    slug: "nutritional-lifestyle-preparation-oocyte-donors",
    category: "Donor Care & Insurance",
    readTime: "4 min read",
    publishedAt: new Date("2026-06-02T13:10:00.000Z"),
    coverImage: "/img/blogs/donor-nutrition.jpg",
    tags: ["Oocyte Care", "Donor Nutrition", "Hydration Protocols", "Holistic Health"],
    author: {
      name: "Dr. Ananya Sen, Clinical Nutritionist",
      role: "Advisor in Reproductive Nutrition & Donor Well-being",
      avatar: "/img/logo.webp",
    },
    excerpt:
      "Clinical recommendations on hydration, electrolyte balance, nutrition, and rest during the 10 to 12 days of controlled ovarian stimulation.",
    content: `
## Enhancing Well-Being During Ovarian Stimulation

When an eligible, altruistic oocyte donor undergoes controlled ovarian stimulation (COS), her physical comfort and physiological health are paramount. Adequate nutritional support during the 10-to-12-day stimulation period supports optimal follicular development while significantly diminishing feelings of fatigue, abdominal fullness, or mild bloating.

---

## Core Nutritional Guidelines

### 1. High-Electrolyte Hydration
Follicular fluid synthesis requires substantial hydration. Plain tap water in excessive amounts can dilute serum sodium; hence, clinical teams recommend:
- Coconut water (naturally rich in potassium and magnesium).
- Oral Rehydration Solutions (ORS) or electrolyte-infused water.
- Fresh lemon water with a pinch of rock salt.
- Target daily fluid intake: 2.5 to 3.5 liters.

### 2. High-Protein Dietary Baseline
Adequate protein helps maintain intravascular oncotic pressure, minimizing third-space fluid shifts into the peritoneal cavity:
- Boiled eggs or egg-white preparations.
- Lean poultry, fish, or fresh cottage cheese (paneer).
- Sprouted lentils, chickpeas, and edamame for vegetarian donors.

### 3. Micronutrient Supplementation
Every donor is supported with a clinical micronutrient regimen:
- Folic acid (5 mg daily) and Methylcobalamin ($B_{12}$).
- Vitamin D3 (60,000 IU weekly if deficient) and Zinc.
- Coenzyme Q10 (CoQ10) to support mitochondrial bioenergetics within developing oocytes.

---

## Lifestyle Precautions During Final Stimulation Days

As multiple ovarian follicles mature, the ovaries enlarge temporarily:
- **Avoid high-impact workouts, heavy lifting, or vigorous twisting:** This minimizes the mechanical risk of ovarian torsion.
- **Gentle walking and restful sleep (7–9 hours nightly):** Crucial for hormonal balance.
- **Report any atypical symptoms promptly:** The Mediyaz donor care coordinator remains available 24/7 for direct clinical assistance.
    `.trim(),
  },
];

async function seed() {
  const uri = getMongoUri();
  if (!uri) {
    console.error("No MONGODB_URI found in environment or .env file.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected successfully to MongoDB.");

  let upsertedCount = 0;
  for (const post of posts) {
    const res = await Blog.findOneAndUpdate(
      { slug: post.slug },
      { $set: post },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`[OK] Seeded blog: "${res.title}" (${res.slug})`);
    upsertedCount++;
  }

  console.log(`\nSuccessfully seeded ${upsertedCount} clinical blog posts into MongoDB!`);
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("Error seeding blogs:", err);
  process.exit(1);
});
