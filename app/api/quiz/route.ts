import { NextResponse, type NextRequest } from "next/server";
import { getQuizQuestions } from "@/lib/mock-data-service";

// GET /api/quiz: returns quiz questions.
// Optional ?countryId=3 returns only that country's questions.
export async function GET(request: NextRequest) {
  const countryIdParam = request.nextUrl.searchParams.get("countryId");

  // No filter: return every question.
  if (countryIdParam === null) {
    return NextResponse.json(getQuizQuestions());
  }

  const countryId = Number(countryIdParam);

  // 400 if the id is not a number.
  if (Number.isNaN(countryId)) {
    return NextResponse.json({ error: "Invalid country id" }, { status: 400 });
  }

  return NextResponse.json(getQuizQuestions(countryId));
}
