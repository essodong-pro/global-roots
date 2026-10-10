"use client";

// Render the shared, responsive site header and localized date.
// Subscribe to the client clock without introducing an effect-driven state update.
import { useSyncExternalStore } from "react";
import Link from "next/link";

// Reuse the shared navigation links in the global header.
import NavLinks from "@/components/NavLink";

const SITE_NAME = "GlobalRoots";

// Format the client's current date according to its locale.
const getCurrentDate = () =>
    new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(new Date());

// This header does not need external notifications; the date is refreshed on render.
const subscribeToDate = () => () => {};

// Provide deterministic text during server rendering to avoid a locale mismatch.
const getServerDate = () => "Today";

// Render the shared site identity and primary navigation.
export default function Header() {
    // Switch from the server snapshot to the browser's localized date after hydration.
    const currentDate = useSyncExternalStore(subscribeToDate, getCurrentDate, getServerDate);

    // Keep site identity and primary navigation together in the global shell.
    return (
        <header className="bg-green-900 text-white shadow-md">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-5">
                <div className="flex min-w-0 flex-col gap-1">
                    <Link
                        href="/"
                        id="header-title"
                        className="w-fit text-xl font-bold tracking-tight sm:text-2xl"
                    >
                        {SITE_NAME}
                    </Link>
                    <time
                        dateTime={
                            currentDate === "Today"
                                ? undefined
                                : new Date().toISOString().slice(0, 10)
                        }
                        className="text-xs text-green-100 sm:text-sm"
                    >
                        {currentDate}
                    </time>
                </div>
                <nav aria-label="Main navigation" className="min-w-0">
                    <NavLinks />
                </nav>
            </div>
        </header>
    );
}
