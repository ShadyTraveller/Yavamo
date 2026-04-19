create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  postal_code text,
  service_type text not null,
  timeline text,
  message text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text
);

alter table public.leads enable row level security;

create policy "service-role-can-insert-leads"
  on public.leads
  as permissive
  for insert
  to service_role
  with check (true);
