import fs from "fs";
import path from "path";
import { marked } from "marked";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s/g, "-");
}

// Configure custom heading renderer to generate anchor IDs matching TOC links
const customRenderer = {
  heading(this: any, { tokens, depth, text }: { tokens?: any[]; depth: number; text?: string }): string {
    const raw = text || (tokens ? tokens.map((t: any) => t.raw || t.text || "").join("") : "");
    const plain = raw.replace(/<[^>]+>/g, "");
    const id = slugify(plain);
    const content = this.parser.parseInline(tokens);
    return `<h${depth} id="${id}">${content}</h${depth}>\n`;
  },
};

marked.use({
  gfm: true,
  breaks: true,
  renderer: customRenderer,
});

export interface LegalDocumentSection {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  html: string;
}

export function getFullLegalDocMarkdown(): string {
  const filePath = path.join(process.cwd(), "legal-documents.md");
  if (!fs.existsSync(filePath)) {
    return "";
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function getEulaMarkdown(): string {
  const filePath = path.join(process.cwd(), "eula.md");
  if (!fs.existsSync(filePath)) {
    return "";
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function getLegalSections(): LegalDocumentSection[] {
  const fullText = getFullLegalDocMarkdown();
  const eulaText = getEulaMarkdown();

  // Parts: [Header, Privacy Policy, Terms of Service, DPDP Consent Notice + Appendices]
  const parts = fullText.split(/\n(?=## Document )/);

  const headerPart = parts[0] || "";
  const privacyPart = parts[1] || "";
  const termsPart = parts[2] || "";
  const consentAndAppendices = parts[3] || "";

  const consentParts = consentAndAppendices.split(/\n(?=## Appendix )/);
  const consentPart = consentParts[0] || "";
  const appendicesPart = consentParts.length > 1 ? "## Appendices & Statutory Schedules\n\n" + consentParts.slice(1).join("\n\n") : "";

  const sections: LegalDocumentSection[] = [
    {
      id: "all",
      title: "Setthi Legal Compendium (All Documents)",
      shortTitle: "All Documents",
      description: "Full statutory compliance compendium including Privacy Policy, Terms, Consent, and EULA.",
      html: marked.parse(fullText + "\n\n---\n\n" + eulaText) as string,
    },
    {
      id: "privacy",
      title: "Document 1 — Privacy Policy",
      shortTitle: "Privacy Policy",
      description: "Statutory disclosure under DPDP Act 2023 & SPDI Rules 2011 detailing data collection, AI zero-retention, and sub-processors.",
      html: marked.parse(privacyPart || fullText) as string,
    },
    {
      id: "terms",
      title: "Document 2 — Terms of Service",
      shortTitle: "Terms of Service",
      description: "Governing terms, mandatory SEBI non-advisory exemption, AI hallucination clauses, and liability caps.",
      html: marked.parse(termsPart || fullText) as string,
    },
    {
      id: "consent",
      title: "Document 3 — DPDP Statutory Consent Notice",
      shortTitle: "Consent Notice",
      description: "Pre-registration notice and explicit declaration under Sections 5 & 6 of the DPDP Act 2023.",
      html: marked.parse(consentPart || fullText) as string,
    },
    {
      id: "eula",
      title: "End User License Agreement (EULA)",
      shortTitle: "EULA",
      description: "Apple App Store (Schedule 2) & Google Play compliant licensing agreement, AI safety rules, and export controls.",
      html: marked.parse(eulaText) as string,
    },
  ];

  if (appendicesPart) {
    sections.push({
      id: "appendices",
      title: "Appendices & Statutory Schedules",
      shortTitle: "Appendices",
      description: "Entity configuration matrix and legislative mapping under IT Act, SPDI Rules, and DPDP Act.",
      html: marked.parse(appendicesPart) as string,
    });
  }

  return sections;
}
