"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The main sections of the site, in menu order.
const links = [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/map", label: "Cultural Map" },
    { href: "/stories", label: "Stories" },
    { href: "/quiz", label: "Quiz" },
];

// Navigation links; the current section is highlighted.
// PLACEHOLDER (Issue 7): The links sit in one row; make them wrap or collapse on small screens.
// PLACEHOLDER (Issue 8): Use the design system colors for the active link.
export default function NavLinks() {
    // Current URL path, used to find the active link.
    const pathname = usePathname();

    return (
        <ul className="flex gap-6">
            {links.map(({ href, label }) => {
                // Active if it's this page or a page inside it (e.g. /countries/3).
                const isActive =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(`${href}/`));

                return (
                    <li key={href}>
                        <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={isActive ? "font-semibold text-yellow-300 underline" : "text-white hover:text-gray-300"}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
