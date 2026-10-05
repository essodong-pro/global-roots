import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryProfile } from "@/lib/mock-data-service";

type CountryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CountryDetailPage({
  params,
}: CountryPageProps) {
  const { id } = await params;
  const countryId = Number(id);

  if (Number.isNaN(countryId)) {
    notFound();
  }

  const profile = getCountryProfile(countryId);

  if (!profile) {
    notFound();
  }

  const { country, culturalInformation, stories, quizQuestions } = profile;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/countries"
          className="mb-8 inline-block text-sm font-medium text-green-700 hover:text-green-800"
        >
          ← Back to Countries
        </Link>

        <section className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-600">
              {country.region}
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              {country.name}
            </h1>

            <div className="mt-4 grid gap-4 text-gray-700 sm:grid-cols-3">
              <div>
                <p className="font-semibold">Capital</p>
                <p>{country.capital}</p>
              </div>

              <div>
                <p className="font-semibold">Language</p>
                <p>{country.language}</p>
              </div>

              <div>
                <p className="font-semibold">Currency</p>
                <p>{country.currency}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                About
              </h2>
              <p className="leading-7 text-gray-700">
                {country.description}
              </p>
            </section>

            {culturalInformation && (
              <>
                <section>
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    History
                  </h2>
                  <p className="leading-7 text-gray-700">
                    {culturalInformation.history}
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    Traditions
                  </h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-700">
                    {culturalInformation.traditions.map(
                      (tradition) => (
                        <li key={tradition}>
                          {tradition}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    Etiquette
                  </h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-700">
                    {culturalInformation.etiquette.map(
                      (item) => (
                        <li key={item}>{item}</li>
                      ),
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    Celebrations
                  </h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-700">
                    {culturalInformation.celebrations.map(
                      (celebration) => (
                        <li key={celebration}>
                          {celebration}
                        </li>
                      ),
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    Cuisine
                  </h2>
                  <ul className="list-disc space-y-2 pl-6 text-gray-700">
                    {culturalInformation.cuisine.map(
                      (dish) => (
                        <li key={dish}>{dish}</li>
                      ),
                    )}
                  </ul>
                </section>
              </>
            )}

            {stories.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Stories & Recipes
                </h2>

                <div className="space-y-4">
                  {stories.map((story) => (
                    <article
                      key={story.id}
                      className="rounded-lg border border-gray-200 p-5"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {story.title}
                        </h3>

                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                          {story.type}
                        </span>
                      </div>

                      <p className="mb-2 text-sm text-gray-500">
                        By {story.author}
                      </p>

                      <p className="leading-7 text-gray-700">
                        {story.content}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {quizQuestions.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Quiz Questions
                </h2>

                <div className="space-y-4">
                  {quizQuestions.map((question) => (
                    <article
                      key={question.id}
                      className="rounded-lg border border-gray-200 p-5"
                    >
                      <h3 className="mb-3 font-semibold text-gray-900">
                        {question.question}
                      </h3>

                      <ul className="list-disc space-y-1 pl-6 text-gray-700">
                        {question.options.map(
                          (option) => (
                            <li key={option}>
                              {option}
                            </li>
                          ),
                        )}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}