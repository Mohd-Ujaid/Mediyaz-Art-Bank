import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Donor | Verified Donors Catalog | Mediyaz ART Bank India",
  description:
    "Explore verified, non-identifying donor sperm and vitrified donor egg catalog under the Assisted Reproductive Technology (Regulation) Act, 2021. Complete with Thalassemia HPLC screening, 550-band cytogenetic karyotyping, and 180-day cryo-quarantine.",
};

export default function DonorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
