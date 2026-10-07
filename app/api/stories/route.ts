import { NextResponse } from "next/server";
import { addStory, getStories } from "@/lib/mock-data-service";
import { validateStory } from "@/lib/story-validation";

// GET /api/stories: returns every story and recipe.
export async function GET() {
  return NextResponse.json(getStories());
}

// POST /api/stories: validates and saves a new story or recipe.
export async function POST(request: Request) {
  // Read the JSON body; anything that isn't a JSON object is rejected.
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;

  // Run the same checks the form runs in the browser.
  const { story, errors } = validateStory({
    countryId: String(fields.countryId ?? ""),
    title: String(fields.title ?? ""),
    author: String(fields.author ?? ""),
    type: String(fields.type ?? ""),
    content: String(fields.content ?? ""),
  });

  // 400 with an error message per field.
  if (!story) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // 201 with the saved story.
  return NextResponse.json(addStory(story), { status: 201 });
}
