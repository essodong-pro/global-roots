import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryProfile } from "@/lib/mock-data-service";

// The page receives the [id] part of the URL.
type CountryPageProps = {
  params: Promise<{ id: string }>;
};

// Country detail page (/countries/[id]): full cultural profile for one country.
// PLACEHOLDER (Issue 8): Check colors match the design system (#166534 / #D97706).
// PLACEHOLDER (Issue 7): Check spacing and the info grid on mobile.
export default async function CountryDetailPage({
  params,
}: CountryPageProps) {
  // Read the id from the URL and turn it into a number.
  const { id } = await params;
  const countryId = Number(id);

  // Show the not-found page for ids that aren't numbers.
  if (Number.isNaN(countryId)) {
    notFound();
  }

  // Load the country with its cultural info, stories, and quiz questions.
  const profile = getCountryProfile(countryId);

  // Show the not-found page if the country doesn't exist.
  if (!profile) {
    notFound();
  }

  const { country, culturalInformation, stories, quizQuestions } = profile;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/countries"
          className="mb-8 inline-block text-sm font-medium text-green-700 hover:text-green-800"
        >
          ← Back to Countries
        </Link>

        <section className="rounded-lg bg-white p-8 shadow-sm">
          {/* Country name, region, and quick facts */}
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
            {/* Short description */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                About
              </h2>
              <p className="leading-7 text-gray-700">
                {country.description}
              </p>
            </section>

            {/* History, traditions, etiquette, celebrations, and cuisine */}
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

            {/* Community stories and recipes for this country */}
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

            {/* Link to this country's quiz questions */}
            {quizQuestions.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Test your knowledge
                </h2>

                <Link
                  href={`/quiz?countryId=${country.id}`}
                  className="font-medium text-green-700 hover:text-green-800"
                >
                  Take the {country.name} quiz →
                </Link>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}