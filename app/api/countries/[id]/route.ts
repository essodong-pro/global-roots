import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const countryId = Number((await params).id);
  if (!Number.isInteger(countryId))
    return NextResponse.json({ error: 'Invalid country id' }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('countries')
    .select('id,name,region,capital,language,currency,description')
    .eq('id', countryId)
    .maybeSingle();
  if (error)
    return NextResponse.json(
      { error: 'Could not load country' },
      { status: 500 }
    );
  if (!data)
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  return NextResponse.json(data);
}

async function isAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  return data?.role === 'admin';
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const supabase = await createClient();
  if (!(await isAdmin(supabase)))
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  const { id } = await params;
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== 'object' || body === null)
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  const fields = body as Record<string, unknown>;
  const updates = Object.fromEntries(
    ['name', 'region', 'capital', 'language', 'currency', 'description']
      .filter(
        (key) => typeof fields[key] === 'string' && String(fields[key]).trim()
      )
      .map((key) => [key, String(fields[key]).trim()])
  );
  if (Object.keys(updates).length === 0)
    return NextResponse.json(
      { error: 'Provide at least one valid field.' },
      { status: 400 }
    );
  const { data, error } = await supabase
    .from('countries')
    .update(updates)
    .eq('id', Number(id))
    .select()
    .maybeSingle();
  if (error)
    return NextResponse.json(
      { error: 'Could not update country' },
      { status: 400 }
    );
  if (!data)
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const supabase = await createClient();
  if (!(await isAdmin(supabase)))
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  const { id } = await params;
  const { data, error } = await supabase
    .from('countries')
    .delete()
    .eq('id', Number(id))
    .select('id')
    .maybeSingle();
  if (error)
    return NextResponse.json(
      { error: 'Could not delete country' },
      { status: 400 }
    );
  if (!data)
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
