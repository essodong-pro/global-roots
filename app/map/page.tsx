// Supply map-page metadata and mount the interactive cultural map.
import type { Metadata } from "next";
import CulturalMap from "@/components/CulturalMap";

export const metadata: Metadata = {
    title: "Cultural Map | GlobalRoots",
    description:
        "Explore cultural highlights by region and country with the GlobalRoots interactive cultural map.",
};

export default function MapPage() {
    return <CulturalMap />;
}
