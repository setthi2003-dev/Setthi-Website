import { Metadata } from "next";
import PitchDeckViewer from "@/components/PitchDeckViewer";
import { PLAN_DECK_CONFIG } from "@/lib/pitchDeckData";

export const metadata: Metadata = {
  title: "Setthi — Pitch Deck (9 Slides)",
  description:
    "Your money. Finally, answers. The personal finance assistant that speaks plain English. 9-Slide Updated Pitch Deck.",
};

export default function PlanPage() {
  return <PitchDeckViewer config={PLAN_DECK_CONFIG} />;
}
