import Link from 'next/link';
import { signUp } from '@/app/auth/actions';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-orange-700">Join GlobalRoots</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Create your account
        </h1>
        <p className="mt-2 text-slate-600">
          Save cultural profiles and share stories with the community.
        </p>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <form action={signUp} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-800">
            Name
            <input
              name="displayName"
              required
              autoComplete="name"
              className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3"
            />
          </label>
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
              minLength={8}
              required
              autoComplete="new-password"
              className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3"
            />
          </label>
          <button className="min-h-11 w-full rounded-lg bg-green-800 px-4 font-semibold text-white hover:bg-green-900">
            Sign up
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          Already registered?{' '}
          <Link
            className="font-semibold text-green-800 underline"
            href="/login"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
