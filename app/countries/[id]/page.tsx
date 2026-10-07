// Render a responsive country profile and handle invalid or missing IDs.
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryById } from "@/lib/countries";

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const countryId = Number(id);

  if (Number.isNaN(countryId)) {
    notFound();
  }

  const country = getCountryById(countryId);

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <p>
        <Link
          href="/countries"
          className="inline-flex min-h-11 items-center font-medium text-green-800 underline decoration-green-300 underline-offset-4 hover:text-green-950"
        >
          ← All countries
        </Link>
      </p>
        <header className="mt-6 rounded-2xl bg-green-800 px-5 py-8 text-white sm:px-8 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-200">
            Country profile
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {country.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-green-50 sm:text-lg">
            {country.summary}
          </p>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-slate-900">
              Historical insights
            </h2>
            <p className="mt-3 leading-7 text-slate-700">{country.history}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-slate-900">Daily etiquette</h2>
            <p className="mt-3 leading-7 text-slate-700">{country.etiquette}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 sm:p-7">
            <h2 className="text-xl font-bold text-slate-900">
              Cultural celebrations
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              {country.celebrations}
            </p>
          </section>
        </div>
    </main>
  );
}
