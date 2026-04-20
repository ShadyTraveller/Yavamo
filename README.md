# Yavamo

<<<<<<< HEAD
Booking site app for home renovations, seasonal and tech services in Toronto and the Greater Toronto Area.
=======
Next.js website for Yavamo, built around the uploaded app files and expanded with SEO pages, PPC landing pages, and simple online booking.
>>>>>>> 4f48498 (Replace static site with Yavamo Next app and SEO routes)

## What this project now includes

<<<<<<< HEAD
- Drop down options with a marketplace-inspired look
- Lightweight booking flow with service, property type, date, arrival window, and cancellation-by-email acknowledgement
- SEO basics
=======
- Main Next.js app from the uploaded `Yavamoapp.zip`
- Interactive homepage with Home, Commercial, and Tech service navigation
- SEO service pages:
  - `/services/home-services`
  - `/services/commercial-services`
  - `/services/tech-services`
  - `/areas/toronto`
- PPC landing pages:
  - `/landing/home-services-gta`
  - `/landing/commercial-services-gta`
  - `/landing/tech-services-gta`
- Online booking page at `/book`
- Booking submission route at `/api/lead`
- Supabase lead storage schema in `supabase/leads.sql`

## Service catalog reflected from the uploaded app

- Home Services
  - Emergency
  - Renovation
  - Maintenance
  - Seasonal
- Commercial Services
  - Office
  - Retail
  - Industrial
  - Hospitality
- Tech Services
  - Smart Home
  - Security
  - Network
  - Solar
>>>>>>> 4f48498 (Replace static site with Yavamo Next app and SEO routes)

## Contact details

- Brand: `Yavamo`
- Phone: `416-659-7503`
- Email: `book@yavamo.ca`

## Local development

1. Install dependencies:
   - `pnpm install`
   - or `npm install`
2. Start the app:
   - `pnpm dev`
   - or `npm run dev`
3. Open `http://localhost:3000`

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LEADS_TABLE=leads`
4. Redeploy after adding variables.

<<<<<<< HEAD
=======
### Supabase

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Run `supabase/leads.sql`.
4. If you created the table earlier, run the updated SQL again so the newer columns are added.
>>>>>>> 4f48498 (Replace static site with Yavamo Next app and SEO routes)

## Notes

<<<<<<< HEAD
## Before launch

- Replace the placeholder domain in canonical and social tags if your final domain changes.
- Add real testimonials, trust badges, and service-area pages as needed.
- Connect analytics and ad pixels if you want campaign attribution beyond UTMs.
=======
- Booking is intentionally simple: call, email, or book online.
- Cancellations are handled by email after confirmation.
- The old static site files may still exist in the repo, but the new Next.js app is now the primary site implementation.
>>>>>>> 4f48498 (Replace static site with Yavamo Next app and SEO routes)
