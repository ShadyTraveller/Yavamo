create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  postal_code text,
  service_line text,
  service_type text not null,
  industry text,
  property_type text,
  service_frequency text,
  preferred_date date,
  preferred_time text,
  unit_size text,
  service_address text,
  booking_channel text,
  cancellation_policy_ack text,
  timeline text,
  message text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text
);

alter table public.leads add column if not exists postal_code text;
alter table public.leads add column if not exists service_line text;
alter table public.leads add column if not exists industry text;
alter table public.leads add column if not exists property_type text;
alter table public.leads add column if not exists service_frequency text;
alter table public.leads add column if not exists preferred_date date;
alter table public.leads add column if not exists preferred_time text;
alter table public.leads add column if not exists unit_size text;
alter table public.leads add column if not exists service_address text;
alter table public.leads add column if not exists booking_channel text;
alter table public.leads add column if not exists cancellation_policy_ack text;
alter table public.leads add column if not exists timeline text;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_medium text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists utm_term text;
alter table public.leads add column if not exists utm_content text;
alter table public.leads add column if not exists landing_page text;

alter table public.leads enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'leads'
      and policyname = 'service-role-can-insert-leads'
  ) then
    create policy "service-role-can-insert-leads"
      on public.leads
      as permissive
      for insert
      to service_role
      with check (true);
  end if;
end
$$;
