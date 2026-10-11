import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Story } from '@/data/stories';
import { validateStory } from '@/lib/story-validation';

// GET /api/stories: returns every story and recipe.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get('countryId');
  const supabase = await createClient();
  let query = supabase
    .from('stories')
    .select('id,country_id,title,author,type,content,created_at')
    .order('created_at', { ascending: false });
  if (countryId) query = query.eq('country_id', Number(countryId));
  const { data, error } = await query;
  if (error)
    return NextResponse.json(
      { error: 'Could not load stories' },
      { status: 500 }
    );
  const stories: Story[] = data.map((row) => ({
    id: row.id,
    countryId: row.country_id,
    title: row.title,
    author: row.author,
    type: row.type,
    content: row.content,
    date: row.created_at.slice(0, 10),
  }));
  return NextResponse.json(stories);
}

// POST /api/stories: validates and saves a new story or recipe.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json(
      { error: 'Please log in to share a story.' },
      { status: 401 }
    );
  // Read the JSON body; anything that isn't a JSON object is rejected.
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;

  // Run the same checks the form runs in the browser.
  const { story, errors } = validateStory({
    countryId: String(fields.countryId ?? ''),
    title: String(fields.title ?? ''),
    author: String(fields.author ?? ''),
    type: String(fields.type ?? ''),
    content: String(fields.content ?? ''),
  });

  // 400 with an error message per field.
  if (!story) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('stories')
    .insert({
      user_id: user.id,
      country_id: story.countryId,
      title: story.title,
      author: story.author,
      type: story.type,
      content: story.content,
    })
    .select('id,country_id,title,author,type,content,created_at')
    .single();
  if (error || !data)
    return NextResponse.json(
      { error: 'Could not save story' },
      { status: 500 }
    );
  return NextResponse.json(
    {
      id: data.id,
      countryId: data.country_id,
      title: data.title,
      author: data.author,
      type: data.type,
      content: data.content,
      date: data.created_at.slice(0, 10),
    } satisfies Story,
    { status: 201 }
  );
}
