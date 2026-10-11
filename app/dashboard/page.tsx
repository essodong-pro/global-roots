import { signOut } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:py-16">
      <p className="font-semibold text-orange-700">Your GlobalRoots account</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Welcome, {user.user_metadata.display_name ?? user.email}
      </h1>
      <p className="mt-3 text-slate-600">
        You can now submit stories and recipes to the community.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/countries"
          className="rounded-lg bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
        >
          Explore countries
        </Link>
        <Link
          href="/stories"
          className="rounded-lg border border-green-800 px-4 py-3 font-semibold text-green-900 hover:bg-green-50"
        >
          Read community stories
        </Link>
      </div>
      <form action={signOut} className="mt-8">
        <button className="font-semibold text-slate-700 underline">
          Log out
        </button>
      </form>
    </main>
  );
}
