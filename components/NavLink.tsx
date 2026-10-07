"use client";

// Use Next's client-side links for app navigation.
import Link from "next/link";

// Read the active URL so navigation can reflect the current section.
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/map", label: "Cultural Map" },
];

// Mark the current top-level destination for visual and assistive-technology users.
export default function NavLinks() {

    // The pathname changes automatically as the user navigates between routes.
    const pathname = usePathname();

    // Render each configured destination with its current-page state.
    return (
        
        <ul className="flex flex-wrap gap-1">
            {links.map(({ href, label }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-white ${
                                isActive
                                    ? "bg-white/15 text-white"
                                    : "text-green-50 hover:text-white"
                            }`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}