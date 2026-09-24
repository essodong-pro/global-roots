import Link from "next/link";
import { notFound } from "next/navigation";
import { getCountryById } from "@/lib/countries";

// PLACEHOLDER (Issue 1): Directory cards should link here: /countries/[id]
// PLACEHOLDER (Issue 8 / 7): Replace plain layout with polished / responsive Tailwind UI

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

  // PLACEHOLDER (Issue 6): Could fetch(`/api/countries/${id}`) instead once the service is final.
  const country = getCountryById(countryId);

  if (!country) {
    notFound();
  }

  return (
    <main style={{ padding: "1.5rem", maxWidth: "40rem" }}>
      <p>
        <Link href="/">← Home</Link>
      </p>

      <h1>{country.name}</h1>
      <p>{country.summary}</p>

      <section>
        <h2>Historical insights</h2>
        <p>{country.history}</p>
      </section>

      <section>
        <h2>Daily etiquette</h2>
        <p>{country.etiquette}</p>
      </section>

      <section>
        <h2>Cultural celebrations</h2>
        <p>{country.celebrations}</p>
      </section>
    </main>
  );
}
