# GlobalRoots

GlobalRoots is a cultural discovery app for students, travelers, and anyone curious about the traditions and everyday customs of communities around the world. It brings country profiles, a cultural map, community stories, and a short quiz into one accessible place.

## The problem

Cultural information is often scattered across long reference pages and travel sites. GlobalRoots makes it easier to find concise, approachable information about countries, etiquette, celebrations, food, and local traditions.

## Features

- Search and browse country profiles with cultural facts and traditions.
- Explore cultural highlights on an interactive map.
- Read community stories and recipes; signed-in users can create, edit, and delete their own stories.
- Take a culture quiz and explore questions by country.
- Create an account, sign in, access a protected dashboard, and sign out.

## Team

- Essodong N'GNAMA
- Osigwe Uchechukwu Caleb
- Kevin Samuel Pacheco García

## Product demo summary

GlobalRoots helps students, travelers, and culture enthusiasts learn about traditions without searching through scattered, text-heavy sources. Country profiles present cultural facts, etiquette, celebrations, and other highlights in a concise, approachable format, while the map and quiz make exploration more interactive.

In a typical visit, a user browses or searches for a country, opens its profile, and then explores regional highlights on the map or tests their knowledge in the quiz. A user can create an account to visit the protected dashboard and contribute a story or recipe; community members can then read and manage their own submissions. This flow combines discovery with first-hand cultural contributions.

## Grader access

- **Authentication:** Supabase Auth. The project does not use Auth.js v5 or Clerk.
- **Registration:** Public email/password sign-up is enabled. Email confirmation is disabled for the course demo, so the grader can create an account with their own email and password and enter the dashboard immediately. A shared demo password is not required.
- **Test the main flows:** Sign up, confirm that the dashboard opens, visit **Stories**, create a story, edit it, delete it, and sign out. Then try opening `/dashboard` while signed out; the app should redirect to login.
- Email confirmation is currently disabled to avoid relying on Supabase's limited default email sender. For a public production launch, configure custom SMTP before enabling email confirmation.

## Local setup

Requirements: Node.js 20 or newer and a Supabase project.

1. Create `.env.local` in the project root with your Supabase project values:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

2. In the Supabase SQL Editor, run [`supabase/migration.sql`](supabase/migration.sql). This creates the application tables, row-level security policies, profile creation, and initial country data. Run [`supabase/additional-countries.sql`](supabase/additional-countries.sql) only if you want the extra country seed data.
3. In Supabase **Authentication → Sign In / Providers**, keep the Email provider and sign-ups enabled. For the course demo, leave **Confirm email** disabled. In **Authentication → URL Configuration**, set the local site URL to `http://localhost:3000` and allow `http://localhost:3000/auth/confirm` as a redirect URL.
4. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000), create an account at `/signup`, and use `/login` for later sign-ins.
6. Country create, update, and delete API operations require an admin profile. To promote a trusted account, run this query in Supabase SQL Editor, replacing the email:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (
     select id from auth.users where email = 'YOUR_EMAIL'
   );
   ```

Never commit `.env.local`, `.env`, or a Supabase service-role key. Only the public anon/publishable key belongs in the browser environment.

## Deployment

Import the repository into Vercel and configure these environment variables for the deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` — the production app URL, for example `https://global-roots-fawn.vercel.app`

In Supabase **Authentication → URL Configuration**, set the production site URL and add `https://YOUR-APP.vercel.app/auth/confirm` to the redirect URL allow-list. Deploy the latest branch and verify the live URL before submitting.

- **GitHub repository:** [essodong-pro/global-roots](https://github.com/essodong-pro/global-roots)
- **Rendered application:** [global-roots-fawn.vercel.app](https://global-roots-fawn.vercel.app/)

## API routes

| Method   | Route                        | Description                                             |
| -------- | ---------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/countries`             | List country profiles.                                  |
| `POST`   | `/api/countries`             | Create a country (admin only).                          |
| `GET`    | `/api/countries/:id`         | Read one country profile.                               |
| `PATCH`  | `/api/countries/:id`         | Update a country (admin only).                          |
| `DELETE` | `/api/countries/:id`         | Delete a country (admin only).                          |
| `GET`    | `/api/quiz?countryId=:id`    | Load quiz questions, optionally filtered by country.    |
| `GET`    | `/api/stories?countryId=:id` | List community stories, optionally filtered by country. |
| `POST`   | `/api/stories`               | Create a story (signed-in user required).               |
| `PATCH`  | `/api/stories/:id`           | Update a story owned by the signed-in user.             |
| `DELETE` | `/api/stories/:id`           | Delete a story owned by the signed-in user.             |

Story ownership is checked by the API and enforced with Supabase Row Level Security. The browser does not receive a service-role key.

## Known issues and future improvements

- Email confirmation is disabled for the course demo. Before a public launch, configure a custom SMTP provider and verify sign-up and password recovery emails.
- Country administration is available through protected API routes; a dedicated admin interface could make those operations easier.
- Saved-country management using the `saved_countries` table could be added.
- The map uses curated cultural highlights and could be expanded with more countries and additional accessibility features.
- Run and record a Lighthouse mobile audit on the final production deployment.
