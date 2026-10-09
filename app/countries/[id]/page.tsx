import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryProfile } from "@/lib/mock-data-service";

type CountryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { id } = await params;
  const countryId = Number(id);

  if (!Number.isInteger(countryId)) {
    notFound();
  }

  const profile = getCountryProfile(countryId);

  if (!profile) {
    notFound();
  }

  const { country, culturalInformation, stories, quizQuestions } = profile;
  const culturalSections: { heading: string; items: string[] }[] =
    culturalInformation
      ? [
          { heading: "Traditions", items: culturalInformation.traditions },
          { heading: "Etiquette", items: culturalInformation.etiquette },
          { heading: "Celebrations", items: culturalInformation.celebrations },
          { heading: "Cuisine", items: culturalInformation.cuisine },
        ]
      : [];

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/countries"
        className="inline-flex min-h-11 items-center font-medium text-green-800 underline decoration-green-300 underline-offset-4 hover:text-green-950"
      >
        ← All countries
      </Link>

      <section className="mt-6 rounded-2xl bg-green-800 p-5 text-white sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-200">
          {country.region}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {country.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-green-50 sm:text-lg">
          {country.description}
        </p>
        <dl className="mt-6 grid gap-4 border-t border-green-700 pt-5 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-green-100">Capital</dt>
            <dd className="mt-1">{country.capital}</dd>
          </div>
          <div>
            <dt className="font-semibold text-green-100">Language</dt>
            <dd className="mt-1">{country.language}</dd>
          </div>
          <div>
            <dt className="font-semibold text-green-100">Currency</dt>
            <dd className="mt-1">{country.currency}</dd>
          </div>
        </dl>
      </section>

      {/* Show detailed culture when the country has a matching data record. */}
      {culturalInformation && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-slate-900">History</h2>
            <p className="mt-3 leading-7 text-slate-700">
              {culturalInformation.history}
            </p>
          </article>

          {culturalSections.map(({ heading, items }) => (
            <article
              key={heading}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <h2 className="text-xl font-bold text-slate-900">{heading}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}

      {stories.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Stories &amp; Recipes
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {story.title}
                  </h3>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                    {story.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  By {story.author} · {story.date}
                </p>
                <p className="mt-3 leading-7 text-slate-700">{story.content}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {quizQuestions.length > 0 && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold text-slate-900">
            Test your knowledge
          </h2>
          <Link
            href={`/quiz?countryId=${country.id}`}
            className="mt-3 inline-flex min-h-11 items-center font-medium text-green-800 underline decoration-green-300 underline-offset-4 hover:text-green-950"
          >
            Take the {country.name} quiz →
          </Link>
        </section>
      )}
    </main>
  );
}
