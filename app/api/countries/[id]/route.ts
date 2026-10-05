import { NextResponse } from "next/server";
import { getCountryById } from "@/lib/countries";

// GET /api/countries/:id
// PLACEHOLDER (Issue 6): keep this endpoint; replace getCountryById() with real service later.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const countryId = Number(id);

  if (Number.isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country id" }, { status: 400 });
  }

  const country = getCountryById(countryId);

  if (!country) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  return NextResponse.json(country);
}
