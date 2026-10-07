import Link from "next/link";
import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="bg-green-800 px-4 py-14 text-white sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">
            Discover the world through culture
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Every culture has a story worth exploring.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-green-50 sm:text-lg">
            Learn about the traditions, histories, celebrations, and everyday
            customs that make communities unique.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/countries"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-green-900 transition hover:bg-green-50"
            >
              Explore countries
            </Link>
            <Link
              href="/map"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-green-100 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Open cultural map
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-700">
              Start exploring
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Featured countries
            </h2>
          </div>
          <Link
            href="/countries"
            className="w-fit font-semibold text-green-800 underline decoration-green-300 underline-offset-4 hover:text-green-950"
          >
            View all countries
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countries.slice(0, 3).map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="api-checks-heading"
        className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="api-checks-heading"
            className="text-sm font-semibold text-slate-600"
          >
            API smoke checks
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                className="text-green-800 underline underline-offset-2 hover:text-green-950"
                href="/api/countries"
              >
                GET /api/countries
              </Link>
            </li>
            <li>
              <Link
                className="text-green-800 underline underline-offset-2 hover:text-green-950"
                href="/api/countries/1"
              >
                GET /api/countries/1
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
