import type { Metadata } from "next";
import { connection } from "next/server";
import StoryCard from "@/components/StoryCard";
import StoryForm from "@/components/StoryForm";
import { getCountries, getStories } from "@/lib/mock-data-service";

// Browser tab title and description for this page.
export const metadata: Metadata = {
  title: "Stories & Recipes | GlobalRoots",
  description:
    "Read and share personal cultural stories and traditional recipes.",
};

// Stories page (/stories): submission form plus the list of stories.
// PLACEHOLDER (Issue 8): Style this page with Tailwind (form card, story grid).
// PLACEHOLDER (Issue 7): Make the layout responsive (e.g. form beside list on desktop).
export default async function StoriesPage() {
  // Render on every request so newly submitted stories show up.
  await connection();

  // Load the data, newest stories first.
  const countries = getCountries();
  const stories = [...getStories()].reverse();

  // Lookup table: country id -> country name.
  const countryNames = new Map(
    countries.map((country) => [country.id, country.name]),
  );

  return (
    <main className="flex-1 p-6">
      <h1>Stories &amp; Recipes</h1>
      <p>
        Personal stories and traditional recipes shared by the GlobalRoots
        community.
      </p>

      {/* Submission form */}
      <section aria-labelledby="share-heading">
        <h2 id="share-heading">Share yours</h2>
        <StoryForm countries={countries} />
      </section>

      {/* Story list, or an empty message if there are none */}
      <section aria-labelledby="list-heading">
        <h2 id="list-heading">Community submissions</h2>
        {stories.length > 0 ? (
          stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              countryName={countryNames.get(story.countryId)}
            />
          ))
        ) : (
          <p>No stories yet. Be the first to share one!</p>
        )}
      </section>
    </main>
  );
}
