"use client";

// Let visitors search and browse country profiles in a responsive grid.
import { useMemo, useState } from "react";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

export default function CountriesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCountries = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) {
            return countries;
        }

        return countries.filter(
            (country) =>
                country.name.toLowerCase().includes(search) ||
                country.region.toLowerCase().includes(search) ||
                country.capital.toLowerCase().includes(search)
        );
    }, [searchTerm]);

    return (
        <main className="flex-1 bg-slate-50">
            <section className="bg-green-800 px-4 py-12 text-white sm:px-6 sm:py-16">
                <div className="mx-auto max-w-6xl">
                    <p className="mb-2 font-medium text-orange-300">
                        Discover the world
                    </p>

                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Country Profiles
                    </h1>

                    <p className="max-w-2xl text-lg text-green-50">
                        Explore countries and discover their languages, traditions,
                        customs, celebrations, and cultural heritage.
                    </p>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
                <div className="mb-8">
                    <label
                        htmlFor="country-search"
                        className="mb-2 block font-semibold text-gray-800"
                    >
                        Search countries
                    </label>

                    <input
                        id="country-search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search by country, region, or capital..."
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200"
                    />
                </div>

                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Explore Countries
                    </h2>

                    <p className="text-sm text-gray-600">
                        {filteredCountries.length}{" "}
                        {filteredCountries.length === 1 ? "country" : "countries"}
                    </p>
                </div>

                {filteredCountries.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCountries.map((country) => (
                            <CountryCard key={country.id} country={country} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">
                            No countries found
                        </h3>

                        <p className="text-gray-600">
                            Try searching for another country, region, or capital.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}