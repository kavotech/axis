-- Axis Agro — enquiry storage.
-- Tables are written only by the website's server routes using the service-role key.
-- RLS is enabled with no policies, so anon/authenticated clients have no access.

create table if not exists public.quote_enquiries (
  id bigint generated always as identity primary key,
  reference text not null unique,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'in_review', 'quoted', 'closed', 'spam')),
  company text not null,
  buyer_name text not null,
  buyer_email text not null,
  country text not null,
  products text[] not null default '{}',
  payload jsonb not null,
  files jsonb not null default '[]'::jsonb,
  recaptcha_score real,
  needs_review boolean not null default false,
  team_notified boolean,
  buyer_acknowledged boolean,
  ip_hash text not null
);

create index if not exists quote_enquiries_created_idx on public.quote_enquiries (created_at desc);
create index if not exists quote_enquiries_ip_idx on public.quote_enquiries (ip_hash, created_at desc);

create table if not exists public.contact_enquiries (
  id bigint generated always as identity primary key,
  reference text not null unique,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'replied', 'closed', 'spam')),
  name text not null,
  email text not null,
  company text,
  topic text not null,
  payload jsonb not null,
  recaptcha_score real,
  needs_review boolean not null default false,
  team_notified boolean,
  buyer_acknowledged boolean,
  ip_hash text not null
);

create index if not exists contact_enquiries_created_idx on public.contact_enquiries (created_at desc);
create index if not exists contact_enquiries_ip_idx on public.contact_enquiries (ip_hash, created_at desc);

alter table public.quote_enquiries enable row level security;
alter table public.contact_enquiries enable row level security;
revoke all on public.quote_enquiries from anon, authenticated;
revoke all on public.contact_enquiries from anon, authenticated;

-- Private bucket for buyer uploads (4MB per request enforced by the app; 5MB per object here).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'quote-uploads',
  'quote-uploads',
  false,
  5242880,
  array[
    'application/pdf',
    'image/png',
    'image/jpeg',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
on conflict (id) do nothing;
