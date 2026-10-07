"use client";

import Link from "next/link";
import { useState } from "react";
import { countries } from "@/data/countries";

const mapPositions: Record<number, { x: number; y: number }> = {
    1: { x: 52, y: 55 },
    2: { x: 49, y: 52 },
    3: { x: 83, y: 47 },
    4: { x: 34, y: 70 },
    5: { x: 51, y: 38 },
    6: { x: 68, y: 55 },
};

const regionHighlights: Record<string, string> = {
    "West Africa":
        "Explore a vibrant mix of languages, music, textiles, and community celebrations across the Gulf of Guinea.",
    "East Asia":
        "Discover seasonal festivals, regional cuisines, and living traditions alongside contemporary culture.",
    "South America":
        "Explore cultural traditions shaped by Indigenous, African, and European heritage, with strong regional diversity.",
    Europe:
        "Find distinct local identities, historic arts, and food traditions that vary from one region to another.",
    "South Asia":
        "Explore a remarkable range of languages, faiths, cuisines, and celebrations across the region.",
};

const culturalHighlights: Record<
    number,
    { label: string; detail: string }[]
> = {
    1: [
        { label: "Celebrations", detail: "Epe Ekpe harvest celebration" },
        { label: "Food", detail: "Akoumé and regional sauces" },
        { label: "Arts", detail: "Ewe weaving and music traditions" },
    ],
    2: [
        { label: "Celebrations", detail: "Homowo among Ga communities" },
        { label: "Craft", detail: "Kente weaving traditions" },
        { label: "Food", detail: "Waakye and regional rice dishes" },
    ],
    3: [
        { label: "Festivals", detail: "Seasonal matsuri across Japan" },
        { label: "Food", detail: "Washoku and regional specialties" },
        { label: "Arts", detail: "Traditional crafts and performing arts" },
    ],
    4: [
        { label: "Music", detail: "Samba and many regional sounds" },
        { label: "Celebrations", detail: "Carnival traditions vary by city" },
        { label: "Food", detail: "Regional dishes such as moqueca" },
    ],
    5: [
        { label: "Food", detail: "Distinct regional cuisines" },
        { label: "Arts", detail: "Architecture, design, and visual arts" },
        { label: "Heritage", detail: "Local traditions across regions" },
    ],
    6: [
        { label: "Celebrations", detail: "Diwali celebrated by many communities" },
        { label: "Food", detail: "Richly varied regional cuisines" },
        { label: "Arts", detail: "Classical and folk performance traditions" },
    ],
};

const regions = Array.from(new Set(countries.map((country) => country.region)));

export default function CulturalMap() {
    const [selectedCountryId, setSelectedCountryId] = useState(2);
    const selectedCountry =
        countries.find((country) => country.id === selectedCountryId) ??
        countries[0];

    function selectRegion(region: string) {
        const firstCountryInRegion = countries.find(
            (country) => country.region === region,
        );

        if (firstCountryInRegion) {
            setSelectedCountryId(firstCountryInRegion.id);
        }
    }

    return (
        <main className="flex-1 bg-slate-50 text-slate-900">
            <section className="bg-green-900 px-5 py-12 text-white sm:px-8 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                        A world of living traditions
                    </p>
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Explore culture, one place at a time.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-green-100 sm:text-lg">
                        Choose a region or select a country on the map to discover
                        cultural highlights from around the world.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Browse by region
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Select a region to see its featured country.
                        </p>
                    </div>
                    <p className="text-sm text-slate-500">
                        {countries.length} countries to explore
                    </p>
                </div>

                <div
                    aria-label="Filter countries by region"
                    role="group"
                    className="mb-7 flex gap-2 overflow-x-auto pb-2"
                >
                    {regions.map((region) => {
                        const isSelected = selectedCountry.region === region;

                        return (
                            <button
                                key={region}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => selectRegion(region)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${
                                    isSelected
                                        ? "border-green-800 bg-green-800 text-white"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-green-700 hover:text-green-800"
                                }`}
                            >
                                {region}
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.85fr)]">
                    <section
                        aria-labelledby="map-heading"
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="map-heading"
                                    className="font-bold text-slate-900"
                                >
                                    Cultural map
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Select a marker to explore a country.
                                </p>
                            </div>
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                                {selectedCountry.region}
                            </span>
                        </div>

                        <div
                            className="relative aspect-[2/1] min-h-64 overflow-hidden border-y border-emerald-100 bg-[#e9f3ef] sm:min-h-80"
                            role="group"
                            aria-label="Countries on the world map"
                        >
                            <svg
                                className="absolute inset-0 h-full w-full"
                                viewBox="0 0 1000 500"
                                role="img"
                                aria-label="Illustrated world map"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <defs>
                                    <pattern
                                        id="map-grid"
                                        width="100"
                                        height="70"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 100 0 L 0 0 0 70"
                                            fill="none"
                                            stroke="#cbded5"
                                            strokeWidth="1"
                                            strokeDasharray="3 8"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="1000" height="500" fill="url(#map-grid)" />
                                <g
                                    fill="#b5d3c3"
                                    stroke="#8db9a0"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                >
                                    <path d="M105 92 151 62 209 70 232 91 279 93 302 121 286 145 300 164 281 184 270 218 247 232 237 267 211 276 199 310 177 304 167 279 146 270 140 236 116 215 121 187 102 168 112 140 94 120Z" />
                                    <path d="M246 286 271 293 289 326 283 360 300 385 291 425 272 457 259 428 249 400 237 375 241 344 225 323Z" />
                                    <path d="M424 110 458 92 487 102 496 124 480 144 458 145 445 132Z" />
                                    <path d="M455 158 489 145 521 160 533 190 522 223 511 257 493 289 481 320 459 311 451 282 438 261 444 230 429 203 438 180Z" />
                                    <path d="M509 105 548 87 594 92 619 111 649 101 682 112 711 100 757 112 792 139 823 157 851 184 842 208 815 208 797 226 770 214 751 231 728 220 713 240 686 227 667 207 639 206 615 188 584 196 563 176 536 174 520 148Z" />
                                    <path d="M752 247 778 236 806 249 818 273 804 294 781 299 762 284Z" />
                                    <path d="M862 299 886 309 895 326 879 338 860 330Z" />
                                    <path d="M385 133 399 127 407 139 397 151 386 146Z" />
                                    <path d="M328 188 338 182 345 195 337 207Z" />
                                </g>
                                <path
                                    d="M0 250H1000"
                                    stroke="#fff"
                                    strokeWidth="2"
                                    strokeDasharray="5 9"
                                    opacity=".65"
                                />
                            </svg>

                            {countries.map((country) => {
                                const position = mapPositions[country.id];
                                if (!position) return null;

                                const isSelected = country.id === selectedCountry.id;

                                return (
                                    <button
                                        key={country.id}
                                        type="button"
                                        aria-label={`Explore ${country.name}, ${country.region}`}
                                        aria-pressed={isSelected}
                                        onClick={() =>
                                            setSelectedCountryId(country.id)
                                        }
                                        style={{
                                            left: `${position.x}%`,
                                            top: `${position.y}%`,
                                        }}
                                        className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900"
                                    >
                                        <span
                                            className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md transition ${
                                                isSelected
                                                    ? "scale-125 bg-orange-500 ring-4 ring-orange-200"
                                                    : "bg-green-800 group-hover:scale-125 group-hover:bg-orange-500"
                                            }`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        </span>
                                        <span
                                            className={`whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold shadow-sm sm:text-xs ${
                                                isSelected
                                                    ? "bg-green-900 text-white"
                                                    : "bg-white/95 text-slate-700 group-hover:bg-green-900 group-hover:text-white"
                                            }`}
                                        >
                                            {country.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 text-xs text-slate-600 sm:px-6">
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                                Selected country
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-green-800" />
                                Explore a country
                            </span>
                        </div>
                    </section>

                    <aside
                        aria-live="polite"
                        aria-labelledby="country-heading"
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-700">
                            {selectedCountry.region}
                        </p>
                        <h2
                            id="country-heading"
                            className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
                        >
                            {selectedCountry.name}
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            {regionHighlights[selectedCountry.region]}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                                Capital: {selectedCountry.capital}
                            </span>
                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                                Language: {selectedCountry.language}
                            </span>
                        </div>

                        <div className="mt-7 border-t border-slate-100 pt-6">
                            <h3 className="text-base font-bold text-slate-900">
                                Cultural highlights
                            </h3>
                            <ul className="mt-4 space-y-4">
                                {culturalHighlights[selectedCountry.id]?.map(
                                    (highlight) => (
                                        <li
                                            key={highlight.label}
                                            className="flex gap-3"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {highlight.label}
                                                </p>
                                                <p className="mt-0.5 text-sm leading-5 text-slate-600">
                                                    {highlight.detail}
                                                </p>
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>

                        <Link
                            href={`/countries/${selectedCountry.id}`}
                            className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-green-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        >
                            Explore {selectedCountry.name} culture
                            <span aria-hidden="true" className="ml-2">
                                →
                            </span>
                        </Link>
                    </aside>
                </div>

                <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4 text-sm leading-6 text-slate-700">
                    Cultural practices vary within every country and community.
                    These highlights are starting points for further discovery.
                </div>
            </section>
        </main>
    );
}
