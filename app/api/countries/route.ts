import { NextResponse } from "next/server";
import { getCountries } from "@/lib/countries";

// GET /api/countries
// PLACEHOLDER (Issue 6): keep this endpoint; replace getCountries() with real service later.
export async function GET() {
  return NextResponse.json(getCountries());
}
