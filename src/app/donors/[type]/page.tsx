import FindDonorPage from "../page";

export default async function DonorTypeFilterPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const resolved = await params;
  const initialType =
    resolved.type === "sperm" ? "sperm" : resolved.type === "egg" ? "egg" : "all";

  return <FindDonorPage initialGameteType={initialType} />;
}
