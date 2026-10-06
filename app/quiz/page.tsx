import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "@/components/Quiz";

// Browser tab title and description for this page.
export const metadata: Metadata = {
  title: "Quiz | GlobalRoots",
  description:
    "Test your knowledge of world customs, greetings, and traditions.",
};

// Quiz page (/quiz). Optional ?countryId=3 limits the quiz to one country.
// PLACEHOLDER (Issue 8): Style this page with Tailwind.
// PLACEHOLDER (Issue 7): Make the layout responsive for mobile, tablet, and desktop.
export default async function QuizPage({ searchParams }: PageProps<"/quiz">) {
  // Read the optional country filter from the URL.
  const { countryId } = await searchParams;

  return (
    <main className="flex-1 p-6">
      <h1>Cultural Quiz</h1>
      <p>Test your knowledge of world customs, greetings, and traditions.</p>

      {/* When filtered to one country, offer a link back to the full quiz */}
      {countryId && (
        <p>
          Showing questions for one country.{" "}
          <Link href="/quiz">Take the full quiz</Link>
        </p>
      )}

      {/* key resets the quiz when the country filter changes */}
      <Quiz
        key={String(countryId ?? "all")}
        countryId={typeof countryId === "string" ? countryId : undefined}
      />
    </main>
  );
}
