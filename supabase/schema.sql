-- Run this once in Supabase: SQL Editor > New query > paste > Run

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'free' check (plan in ('free','pro','unlimited','team')),
  razorpay_subscription_id text,
  created_at timestamptz not null default now()
);

create table if not exists summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_id text not null,
  video_url text not null,
  title text not null,
  format text not null check (format in ('whiteboard','infographic')),
  data jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists summaries_user_created on summaries (user_id, created_at desc);

alter table profiles enable row level security;
alter table summaries enable row level security;
create policy "own profile" on profiles for select using (auth.uid() = id);
create policy "own summaries" on summaries for select using (auth.uid() = user_id);

create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id, email) values (new.id, new.email) on conflict do nothing;
  return new;
end; $$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure handle_new_user();
