# Northline GTA

Deploy-ready static marketing website for home services and tech services in Toronto and the Greater Toronto Area.

## What is included

- Multi-page static site with a premium marketplace-inspired look
- Homepage plus dedicated organic pages for home services, tech services, and Toronto local SEO
- Two PPC landing pages with above-the-fold quote forms
- SEO basics: page metadata, canonical URLs, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`, and web manifest
- Lead capture that works with:
  - `api/lead.js` for Vercel
  - `netlify/functions/lead.js` for Netlify
  - `supabase/leads.sql` for the Supabase table
- Automatic UTM capture in forms

## Project structure

```text
/
|-- index.html
|-- services/
|-- landing/
|-- areas/
|-- assets/
|-- api/
|-- netlify/functions/
|-- supabase/leads.sql
|-- robots.txt
|-- sitemap.xml
|-- vercel.json
|-- netlify.toml
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Add these environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LEADS_TABLE` = `leads` (optional if you keep the default table name)
4. Run the SQL in `supabase/leads.sql` inside your Supabase SQL editor.
5. Update the production domain references if you change the placeholder domain `https://www.northlinegta.ca`.

## Deploy to Netlify

1. Push this folder to GitHub.
2. Import the repository into Netlify.
3. Netlify will publish the repo root and use `netlify/functions` automatically because `netlify.toml` is included.
4. Add the same environment variables listed above.
5. Run the SQL in `supabase/leads.sql`.

## Local editing notes

- The site does not require a build step.
- Open `index.html` in a browser for quick design review.
- For full form testing, deploy to Vercel or Netlify with Supabase configured.
- If no lead endpoint is available, the form falls back to opening the user's email app.

## Before launch

- Replace the placeholder phone number and email in the HTML files.
- Replace the placeholder domain in all canonical and social tags.
- Add real testimonials, trust badges, and service-area pages as needed.
- Connect analytics and ad pixels if you want campaign attribution beyond UTMs.
"# Yavamo" 
