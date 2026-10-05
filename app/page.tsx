import Link from "next/link";
import { getCountries } from "@/lib/countries";

// TEMPORARY home for Issue 2 testing.
// PLACEHOLDER (Issue 1): Replace this page (or move these links) with the searchable country directory.
// PLACEHOLDER (Issue 3): Map entry point can live in nav later.
// PLACEHOLDER (Issue 8 / 7): Style and make responsive later.

export default function Home() {
  const countries = getCountries();

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>GlobalRoots</h1>
      <p>Temporary sample links (Issue 2). Teammates: delete or replace this block.</p>

      <h2>Sample countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <Link href={`/countries/${country.id}`}>{country.name}</Link>
          </li>
        ))}
      </ul>

      <h2>API smoke checks</h2>
      <ul>
        <li>
          <Link href="/api/countries">GET /api/countries</Link>
        </li>
        <li>
          <Link href="/api/countries/1">GET /api/countries/1</Link>
        </li>
      </ul>
    </main>
  );
}
