import { NextResponse } from "next/server";
import { getCountryById } from "@/lib/mock-data-service";

// GET /api/countries/:id: returns one country.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Read the id from the URL and turn it into a number.
  const { id } = await params;
  const countryId = Number(id);

  // 400 if the id is not a number.
  if (Number.isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country id" }, { status: 400 });
  }

  const country = getCountryById(countryId);

  // 404 if no country has that id.
  if (!country) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  return NextResponse.json(country);
}
