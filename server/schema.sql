create extension if not exists postgis;

create table if not exists farmers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  village text not null,
  consent_voice boolean not null default false,
  consent_photo boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists plots (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references farmers(id),
  acres numeric not null,
  soil_nitrogen text,
  ph numeric,
  groundwater text,
  geom geometry(Polygon, 4326),
  created_at timestamptz not null default now()
);

create table if not exists advisories (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references farmers(id),
  plot_id uuid references plots(id),
  crop_stage text not null,
  recommendation jsonb not null,
  sms text not null,
  created_at timestamptz not null default now()
);

create table if not exists rsk_tickets (
  id text primary key,
  farmer_id uuid references farmers(id),
  village text not null,
  priority text not null,
  confidence numeric not null,
  summary text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists plots_geom_gix on plots using gist (geom);
create index if not exists rsk_tickets_village_idx on rsk_tickets (village, status);
