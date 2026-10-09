"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/map", label: "Cultural Map" },
    { href: "/stories", label: "Stories" },
    { href: "/quiz", label: "Quiz" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <ul className="flex flex-wrap gap-1">
            {links.map(({ href, label }) => {
                const isActive =
                    pathname === href ||
                    (href !== "/" && pathname.startsWith(`${href}/`));

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
