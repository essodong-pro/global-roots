import { NextResponse } from "next/server";
import { getCountries } from "@/lib/mock-data-service";

// GET /api/countries: returns every country.
export async function GET() {
  return NextResponse.json(getCountries());
}
