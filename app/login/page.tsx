import Link from 'next/link';
import { resendConfirmation, signIn } from '@/app/auth/actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>;
}) {
  const { error, message, next } = await searchParams;
  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-orange-700">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Log in</h1>
        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-900"
          >
            {message}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <form action={signIn} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next ?? '/dashboard'} />
          <label className="block text-sm font-semibold text-slate-800">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3"
            />
          </label>
          <button className="min-h-11 w-full rounded-lg bg-green-800 px-4 font-semibold text-white hover:bg-green-900">
            Log in
          </button>
        </form>
        <details className="mt-5 rounded-lg border border-slate-200 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-green-900">
            Didn&apos;t receive the confirmation email?
          </summary>
          <p className="mt-2 text-sm text-slate-600">
            Enter the email address you used to sign up and we&apos;ll send a
            fresh link.
          </p>
          <form
            action={resendConfirmation}
            className="mt-3 flex flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="resend-email">
              Email address
            </label>
            <input
              id="resend-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3"
            />
            <button className="min-h-11 rounded-lg border border-green-800 px-4 font-semibold text-green-900 hover:bg-green-50">
              Resend email
            </button>
          </form>
        </details>
        <p className="mt-5 text-sm text-slate-600">
          New to GlobalRoots?{' '}
          <Link
            className="font-semibold text-green-800 underline"
            href="/signup"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
