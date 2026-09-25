import { getLegalSections } from "@/lib/legalDocs";
import LegalDocViewer from "@/components/LegalDocViewer";

export const dynamic = "force-static";

export default function HomePage() {
  const sections = getLegalSections();

  return <LegalDocViewer sections={sections} />;
}
