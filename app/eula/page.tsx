import { getLegalSections } from "@/lib/legalDocs";
import LegalDocViewer from "@/components/LegalDocViewer";

export const metadata = {
  title: "End User License Agreement (EULA) — Setthi",
  description: "End User License Agreement, Apple Schedule 2 minimum terms, and AI conduct guidelines for Setthi.",
};

export default function EulaPage() {
  const sections = getLegalSections();
  const eulaSection = sections.find((s) => s.id === "eula");
  const displaySections = eulaSection
    ? [eulaSection, ...sections.filter((s) => s.id !== "eula")]
    : sections;

  return <LegalDocViewer sections={displaySections} />;
}
