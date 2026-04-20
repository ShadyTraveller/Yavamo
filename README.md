# Yavamo

Next.js booking site for Yavamo home, commercial, and tech services in Toronto and the GTA.

## Forms and Supabase

The booking forms submit to:

- `POST /api/lead`

That route inserts into Supabase using these server-side environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEADS_TABLE` default: `leads`

Use [.env.example](C:\Users\saeor\Documents\Codex\Yavamo\.env.example) as the template for local or hosted configuration.

## Supabase setup

1. Create or open your Supabase project.
2. Open `SQL Editor`.
3. Run [supabase/leads.sql](C:\Users\saeor\Documents\Codex\Yavamo\supabase\leads.sql).
4. In Supabase, copy:
   - Project URL
   - `service_role` key
5. In Vercel project settings, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LEADS_TABLE=leads`

## Verify form setup

Open:

- `https://yavamo.ca/api/lead`

Expected response:

- `configured: true`

If it shows `configured: false`, the Vercel environment variables are still missing.

Then submit a booking form and confirm the row appears in the Supabase `public.leads` table.

## Notes

- Booking is intentionally simple: call, email, or book online.
- Cancellations are handled by email after confirmation.
- PPC landing pages are non-indexed and should stay out of the sitemap.
