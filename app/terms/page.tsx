import { getLegalSections } from "@/lib/legalDocs";
import LegalDocViewer from "@/components/LegalDocViewer";

export const metadata = {
  title: "Terms of Service — Setthi",
  description: "Terms of Service, SEBI non-advisory disclaimer, and liability terms for Setthi.",
};

export default function TermsPage() {
  const sections = getLegalSections();
  const termsSection = sections.find((s) => s.id === "terms");
  const displaySections = termsSection
    ? [termsSection, ...sections.filter((s) => s.id !== "terms")]
    : sections;

  return <LegalDocViewer sections={displaySections} />;
}
