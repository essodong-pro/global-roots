import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/mock-data-service';
import { createClient } from '@/lib/supabase/server';
import type { Country } from '@/data/countries';

// GET /api/countries: returns every country.
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('countries')
    .select('id,name,region,capital,language,currency,description')
    .order('name');
  if (error)
    return NextResponse.json(
      { error: 'Could not load countries' },
      { status: 500 }
    );
  return NextResponse.json(data ?? getCountries());
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin')
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== 'object' || body === null)
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  const fields = body as Record<string, unknown>;
  const country: Country = {
    id: Number(fields.id),
    name: String(fields.name ?? '').trim(),
    region: String(fields.region ?? '').trim(),
    capital: String(fields.capital ?? '').trim(),
    language: String(fields.language ?? '').trim(),
    currency: String(fields.currency ?? '').trim(),
    description: String(fields.description ?? '').trim(),
  };
  if (
    !Number.isInteger(country.id) ||
    Object.values(country).some((value) => value === '')
  ) {
    return NextResponse.json(
      { error: 'All country fields are required.' },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from('countries')
    .insert(country)
    .select()
    .single();
  if (error || !data)
    return NextResponse.json(
      { error: 'Could not create country' },
      { status: 400 }
    );
  return NextResponse.json(data, { status: 201 });
}
