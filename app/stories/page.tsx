import type { Metadata } from 'next';
import { connection } from 'next/server';
import StoryCard from '@/components/StoryCard';
import StoryForm from '@/components/StoryForm';
import { getCountries, getStories } from '@/lib/mock-data-service';
import { createClient } from '@/lib/supabase/server';

// Browser tab title and description for this page.
export const metadata: Metadata = {
  title: 'Stories & Recipes | GlobalRoots',
  description:
    'Read and share personal cultural stories and traditional recipes.',
};

// Stories page (/stories): submission form plus the list of stories.
export default async function StoriesPage() {
  // Render on every request so newly submitted stories show up.
  await connection();

  // Load the data, newest stories first.
  const countries = getCountries();
  const supabase = await createClient();
  const [
    { data: storyRows },
    {
      data: { user },
    },
  ] = await Promise.all([
    supabase
      .from('stories')
      .select('id,user_id,country_id,title,author,type,content,created_at')
      .order('created_at', { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const stories =
    storyRows?.map((row) => ({
      id: row.id,
      userId: row.user_id,
      countryId: row.country_id,
      title: row.title,
      author: row.author,
      type: row.type,
      content: row.content,
      date: row.created_at.slice(0, 10),
    })) ?? getStories();

  // Lookup table: country id -> country name.
  const countryNames = new Map(
    countries.map((country) => [country.id, country.name])
  );

  return (
    <main className="flex-1 bg-slate-50">
      <section className="bg-green-800 px-4 py-12 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 font-medium text-orange-200">Community voices</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Stories &amp; Recipes
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-green-50">
            Read personal stories and traditional recipes shared by the
            GlobalRoots community.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:py-14">
        <section aria-labelledby="share-heading" className="self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2
              id="share-heading"
              className="text-2xl font-bold text-slate-900"
            >
              Share yours
            </h2>
            <p className="mb-6 mt-2 text-sm leading-6 text-slate-600">
              Add a memory, tradition, or recipe to the community collection.
            </p>
            {user ? (
              <StoryForm countries={countries} />
            ) : (
              <div className="rounded-xl bg-green-50 p-4 text-sm text-green-950">
                <p>Log in to submit a community story or recipe.</p>
                <a
                  href="/login?next=%2Fstories"
                  className="mt-2 inline-block font-semibold underline"
                >
                  Log in
                </a>
                <span> · </span>
                <a href="/signup" className="font-semibold underline">
                  Create an account
                </a>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="list-heading">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-orange-700">
                From the community
              </p>
              <h2
                id="list-heading"
                className="text-2xl font-bold text-slate-900"
              >
                Community submissions
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              {stories.length}{' '}
              {stories.length === 1 ? 'submission' : 'submissions'}
            </p>
          </div>
          {stories.length > 0 ? (
            <div className="grid gap-4">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  countryName={countryNames.get(story.countryId)}
                  canEdit={Boolean(user && story.userId === user.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-semibold text-slate-800">No stories yet</p>
              <p className="mt-1 text-sm text-slate-600">
                Be the first to share a story or recipe.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
