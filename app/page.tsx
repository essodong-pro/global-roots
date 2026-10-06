import Link from "next/link";

// Home page: explains what GlobalRoots is and links to each section.
// PLACEHOLDER (Issue 8): Style this page with Tailwind (hero section, feature cards).
// PLACEHOLDER (Issue 7): Make the layout responsive for mobile, tablet, and desktop.
export default function Home() {
  return (
    <main className="flex-1 p-6">
      {/* Intro: purpose and audience */}
      <h1>GlobalRoots</h1>
      <p>
        Discover, learn about, and compare cultural traditions, languages,
        customs, and cuisines from around the world. Built for students,
        travelers, and cultural enthusiasts.
      </p>

      {/* Links to the main sections */}
      <h2>Start exploring</h2>
      <ul>
        <li>
          <Link href="/countries">Country Profiles</Link>: search nations and
          read about their history, etiquette, and celebrations.
        </li>
        <li>
          <Link href="/map">Cultural Map</Link>: pick a region or country to
          see its cultural highlights.
        </li>
        <li>
          <Link href="/stories">Stories &amp; Recipes</Link>: read and share
          personal stories and traditional recipes.
        </li>
        <li>
          <Link href="/quiz">Quiz</Link>: test your knowledge of world customs
          and traditions.
        </li>
      </ul>
    </main>
  );
}
