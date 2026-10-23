import LandingPageExperience from "@/components/ScrollExperience/LandingPageExperience";

export const metadata = {
  title: "Setthi — The AI Companion for Plain English Financial Clarity",
  description:
    "Transform chaotic bank statements into calm, grounded answers. Calculate safe to spend limits, forecast upcoming bills, and chat with your money in plain English.",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ progress?: string }>;
}) {
  const resolved = await searchParams;
  const initialProgress =
    resolved?.progress && !isNaN(parseFloat(resolved.progress))
      ? Math.min(1, Math.max(0, parseFloat(resolved.progress)))
      : undefined;

  return <LandingPageExperience initialProgress={initialProgress} />;
}
