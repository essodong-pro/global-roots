import Link from "next/link";

// Shown when /countries/[id] has no matching country.
// PLACEHOLDER (Issue 8): Style this page with Tailwind.
export default function CountryNotFound() {
  return (
    <main className="flex-1 p-6">
      <h1>Country not found</h1>
      <p>We don&apos;t have a profile for that country yet.</p>
      <p>
        <Link href="/countries">Browse all countries</Link>
      </p>
    </main>
  );
}
