'use client';

// Render the shared, responsive site header and localized date.
// Subscribe to the client clock without introducing an effect-driven state update.
import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

// Reuse the shared navigation links in the global header.
import NavLinks from '@/components/NavLink';
import { createClient } from '@/lib/supabase/browser';
import { signOut } from '@/app/auth/actions';

const SITE_NAME = 'GlobalRoots';

// Format the client's current date according to its locale.
const getCurrentDate = () =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(new Date());

// This header does not need external notifications; the date is refreshed on render.
const subscribeToDate = () => () => {};

// Provide deterministic text during server rendering to avoid a locale mismatch.
const getServerDate = () => 'Today';

// Render the shared site identity and primary navigation.
export default function Header({
  initialSignedIn,
}: {
  initialSignedIn: boolean;
}) {
  // Switch from the server snapshot to the browser's localized date after hydration.
  const currentDate = useSyncExternalStore(
    subscribeToDate,
    getCurrentDate,
    getServerDate
  );
  const [signedIn, setSignedIn] = useState(initialSignedIn);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });
    return () => subscription.unsubscribe();
  }, []);

  // Keep site identity and primary navigation together in the global shell.
  return (
    <header className="bg-green-900 text-white shadow-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:py-5">
        <div className="flex min-w-0 flex-col gap-1">
          <Link
            href="/"
            id="header-title"
            className="w-fit text-xl font-bold tracking-tight sm:text-2xl"
          >
            {SITE_NAME}
          </Link>
          <time
            dateTime={
              currentDate === 'Today'
                ? undefined
                : new Date().toISOString().slice(0, 10)
            }
            className="text-xs text-green-100 sm:text-sm"
          >
            {currentDate}
          </time>
        </div>
        <nav aria-label="Main navigation" className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <NavLinks />
            <div className="flex items-center gap-3 border-l border-green-700 pl-4 text-sm font-semibold">
              {signedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-green-50 hover:text-white"
                  >
                    Account
                  </Link>
                  <form action={signOut}>
                    <button className="text-green-50 underline underline-offset-4 hover:text-white">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-green-50 hover:text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-white px-3 py-2 text-green-900 hover:bg-green-50"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
