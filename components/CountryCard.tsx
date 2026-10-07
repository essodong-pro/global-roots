// Present one country summary with a touch-friendly profile link.
import Link from "next/link";
import type { Country } from "@/data/countries";

type CountryCardProps = {
    country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
    const profileId = country.profileId ?? country.id;

    return (
        <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {country.region}
                </span>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-800">
                {country.name}
            </h2>

            <p className="mb-5 flex-1 text-gray-600">{country.description}</p>

            <div className="mb-5 space-y-2 text-sm text-gray-700">
                <p>
                    <strong>Capital:</strong> {country.capital}
                </p>

                <p>
                    <strong>Language:</strong> {country.language}
                </p>

                <p>
                    <strong>Currency:</strong> {country.currency}
                </p>
            </div>

            <Link
                href={`/countries/${profileId}`}
                className="rounded-lg bg-green-700 px-4 py-2 text-center font-medium text-white transition hover:bg-green-800"
            >
                Explore Culture
            </Link>
        </article>
    );
}