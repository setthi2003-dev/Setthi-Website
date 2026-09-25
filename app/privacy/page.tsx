import { getLegalSections } from "@/lib/legalDocs";
import LegalDocViewer from "@/components/LegalDocViewer";

export const metadata = {
  title: "Privacy Policy — Setthi",
  description: "Privacy Policy and DPDP Act 2023 compliance disclosures for Setthi.",
};

export default function PrivacyPage() {
  const sections = getLegalSections();
  // Filter or prioritize privacy section
  const privacySection = sections.find((s) => s.id === "privacy");
  const displaySections = privacySection
    ? [privacySection, ...sections.filter((s) => s.id !== "privacy")]
    : sections;

  return <LegalDocViewer sections={displaySections} />;
}
