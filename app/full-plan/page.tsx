import { Metadata } from "next";
import PitchDeckViewer from "@/components/PitchDeckViewer";
import { FULL_DECK_CONFIG } from "@/lib/pitchDeckData";

export const metadata: Metadata = {
  title: "Setthi — Full Pitch Deck (11 Slides)",
  description:
    "Your money. Finally, answers. The personal finance assistant that speaks plain English. Comprehensive 11-Slide Pitch Deck.",
};

export default function FullPlanPage() {
  return <PitchDeckViewer config={FULL_DECK_CONFIG} />;
}
