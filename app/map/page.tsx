import type { Metadata } from "next";
import CulturalMap from "@/components/CulturalMap";

// Browser tab title and description for this page.
export const metadata: Metadata = {
    title: "Cultural Map | GlobalRoots",
    description:
        "Explore cultural highlights by region and country with the GlobalRoots interactive cultural map.",
};

// Cultural map page (/map): the map itself lives in the CulturalMap component.
export default function MapPage() {
    return <CulturalMap />;
}
