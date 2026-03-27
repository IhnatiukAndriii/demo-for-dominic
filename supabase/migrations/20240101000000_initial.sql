-- ============================================================
-- Prüffuchs – Initial Database Migration
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('brand', 'influencer', 'admin');
create type campaign_status as enum ('draft', 'active', 'completed');
create type application_status as enum ('pending', 'approved', 'rejected');

-- ============================================================
-- PROFILES TABLE
-- ============================================================

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role not null default 'influencer',
  full_name     text,
  company_name  text,
  website       text,
  bio           text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'influencer')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- CAMPAIGNS TABLE
-- ============================================================

create table public.campaigns (
  id           uuid primary key default uuid_generate_v4(),
  brand_id     uuid not null references public.profiles(id) on delete cascade,
  title        text not null,
  description  text,
  budget       numeric(12, 2),
  requirements text,
  category     text,
  deadline     date,
  status       campaign_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.set_updated_at();

-- Index for faster brand-specific queries
create index campaigns_brand_id_idx on public.campaigns(brand_id);
create index campaigns_status_idx on public.campaigns(status);

-- ============================================================
-- APPLICATIONS TABLE
-- ============================================================

create table public.applications (
  id             uuid primary key default uuid_generate_v4(),
  campaign_id    uuid not null references public.campaigns(id) on delete cascade,
  influencer_id  uuid not null references public.profiles(id) on delete cascade,
  status         application_status not null default 'pending',
  message        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  -- Each influencer can only apply once per campaign
  unique (campaign_id, influencer_id)
);

create trigger applications_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

create index applications_campaign_id_idx on public.applications(campaign_id);
create index applications_influencer_id_idx on public.applications(influencer_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.applications enable row level security;

-- ---- PROFILES policies ----

-- Everyone can read their own profile
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update any profile
create policy "Admins can update any profile"
  on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Brands can see influencer profiles (needed for reviewing applications)
create policy "Brands can view influencer profiles"
  on public.profiles
  for select
  using (
    role = 'influencer'
    or auth.uid() = id
  );

-- ---- CAMPAIGNS policies ----

-- Brands can CRUD their own campaigns
create policy "Brands can view their own campaigns"
  on public.campaigns
  for select
  using (brand_id = auth.uid());

create policy "Brands can create campaigns"
  on public.campaigns
  for insert
  with check (
    brand_id = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'brand'
    )
  );

create policy "Brands can update their own campaigns"
  on public.campaigns
  for update
  using (brand_id = auth.uid());

create policy "Brands can delete their own campaigns"
  on public.campaigns
  for delete
  using (brand_id = auth.uid());

-- Influencers can only see active campaigns
create policy "Influencers can view active campaigns"
  on public.campaigns
  for select
  using (
    status = 'active'
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'influencer'
    )
  );

-- Admins can view and manage all campaigns
create policy "Admins can view all campaigns"
  on public.campaigns
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all campaigns"
  on public.campaigns
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete all campaigns"
  on public.campaigns
  for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- APPLICATIONS policies ----

-- Influencers can view and create their own applications
create policy "Influencers can view their own applications"
  on public.applications
  for select
  using (influencer_id = auth.uid());

create policy "Influencers can create applications"
  on public.applications
  for insert
  with check (
    influencer_id = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'influencer'
    )
  );

-- Brands can view applications for their campaigns
create policy "Brands can view applications for their campaigns"
  on public.applications
  for select
  using (
    exists (
      select 1 from public.campaigns
      where id = campaign_id and brand_id = auth.uid()
    )
  );

-- Brands can update application status for their campaigns
create policy "Brands can update application status"
  on public.applications
  for update
  using (
    exists (
      select 1 from public.campaigns
      where id = campaign_id and brand_id = auth.uid()
    )
  );

-- Admins can view and manage all applications
create policy "Admins can view all applications"
  on public.applications
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all applications"
  on public.applications
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- SAMPLE DATA (optional – remove for production)
-- ============================================================

-- To add an admin user:
-- 1. Sign up via the application
-- 2. In the Supabase dashboard, run:
--    UPDATE public.profiles SET role = 'admin' WHERE id = '<user-uuid>';
