import type { EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const allowedTypes: EmailOtpType[] = [
  'signup',
  'email',
  'recovery',
  'email_change',
];

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type') as EmailOtpType | null;

  if (!code && (!tokenHash || !type || !allowedTypes.includes(type))) {
    return NextResponse.redirect(
      new URL('/login?error=confirmation_link_invalid', request.url)
    );
  }

  const supabase = await createClient();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({ token_hash: tokenHash!, type: type! });

  if (error) {
    return NextResponse.redirect(
      new URL('/login?error=confirmation_link_invalid', request.url)
    );
  }

  return NextResponse.redirect(
    new URL('/dashboard?message=email_confirmed', request.url)
  );
}
