import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const { id } = await params;
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== 'object' || body === null)
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  const fields = body as Record<string, unknown>;
  const title = String(fields.title ?? '').trim();
  const content = String(fields.content ?? '').trim();
  if (
    title.length < 3 ||
    title.length > 100 ||
    content.length < 20 ||
    content.length > 5000
  ) {
    return NextResponse.json(
      { error: 'Title or content is outside the allowed length.' },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from('stories')
    .update({ title, content })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id')
    .maybeSingle();
  if (error)
    return NextResponse.json(
      { error: 'Could not update story' },
      { status: 500 }
    );
  if (!data)
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const { id } = await params;
  const { data, error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id')
    .maybeSingle();
  if (error)
    return NextResponse.json(
      { error: 'Could not delete story' },
      { status: 500 }
    );
  if (!data)
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
