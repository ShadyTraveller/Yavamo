# Yavamo

Booking site app for home renovations, seasonal and tech services in Toronto and the Greater Toronto Area.

## What is included

- Drop down options with a marketplace-inspired look
- Lightweight booking flow with service, property type, date, arrival window, and cancellation-by-email acknowledgement
- SEO basics

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add these environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LEADS_TABLE` = `leads` (optional if you keep the default table name)
4. Run the SQL in `supabase/leads.sql` inside your Supabase SQL editor.
5. Update the production domain references if you change the placeholder domain `https://www.yavamo.ca`.
6. If you already created the `leads` table from an older version of this project, run the updated SQL again so the booking columns are added with `alter table ... add column if not exists`.


## Local editing notes

## Before launch

- Replace the placeholder domain in canonical and social tags if your final domain changes.
- Add real testimonials, trust badges, and service-area pages as needed.
- Connect analytics and ad pixels if you want campaign attribution beyond UTMs.
