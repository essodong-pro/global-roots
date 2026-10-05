import type { Metadata } from "next";
import CulturalMap from "@/components/CulturalMap";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
    title: "Cultural Map | GlobalRoots",
    description:
        "Explore cultural highlights by region and country with the GlobalRoots interactive cultural map.",
};

export default function MapPage() {
    return (
        <>
            <Header />
            <CulturalMap />
            <Footer />
        </>
    );
}
