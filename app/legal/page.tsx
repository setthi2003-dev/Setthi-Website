import { getLegalSections } from "@/lib/legalDocs";
import LegalDocViewer from "@/components/LegalDocViewer";

export const metadata = {
  title: "Legal & Statutory Compliance Hub — Setthi",
  description: "Privacy Policy, Terms of Service, DPDP Statutory Consent Notice, and EULA for Setthi.",
};

export default function LegalPage() {
  const sections = getLegalSections();
  return <LegalDocViewer sections={sections} />;
}
