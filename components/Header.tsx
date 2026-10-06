import Link from "next/link";
import NavLinks from "@/components/NavLink";

// Site header: logo text plus the main navigation. Shown on every page.
// PLACEHOLDER (Issue 8): Use the design system colors instead of gray-800.
// PLACEHOLDER (Issue 7): Add a mobile menu (e.g. a hamburger button) for small screens.
export default function Header() {
    return (
        <header className="bg-gray-800 p-4 text-white shadow-md">
            {/* Site name, links back home */}
            <div className="mx-auto flex max-w-4xl flex-col gap-1">
                <Link href="/" className="text-2xl font-bold">
                    GlobalRoots
                </Link>
            </div>

            {/* Main navigation links */}
            <nav aria-label="Main" className="mx-auto mt-4 flex max-w-4xl items-center justify-between">
                <NavLinks />
            </nav>
        </header>
    );
}
