'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

function getAuthCallbackUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return new URL('/auth/confirm', siteUrl).toString();
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const displayName = String(formData.get('displayName') ?? '').trim();
  if (!email || password.length < 8 || !displayName) {
    redirect(
      '/signup?error=Check+your+details+and+use+an+8-character+password'
    );
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
      emailRedirectTo: getAuthCallbackUrl(),
    },
  });
  if (error) redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  if (data.session) redirect('/dashboard');
  redirect('/login?message=Check+your+email+to+confirm+your+account');
}

export async function resendConfirmation(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  if (!email) {
    redirect('/login?error=Enter+your+email+address+first');
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: { emailRedirectTo: getAuthCallbackUrl() },
  });
  if (error) {
    redirect(
      '/login?error=We+could+not+send+a+confirmation+email.+Try+again+shortly'
    );
  }

  redirect(
    '/login?message=If+your+account+needs+confirmation%2C+a+new+email+has+been+sent'
  );
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/dashboard');
  const destination =
    next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  // The root layout owns the shared header's initial auth state. Refresh it
  // after the server action updates the session cookie so the nav is current.
  revalidatePath('/', 'layout');
  redirect(destination);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login?message=You+have+signed+out');
}
