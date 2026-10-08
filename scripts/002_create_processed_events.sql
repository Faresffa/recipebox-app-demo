-- Stripe event IDs we have already handled (webhook idempotency).
create table if not exists public.processed_events (
  id text primary key,
  processed_at timestamptz not null default now()
);

-- No policies: only the service role (our webhook) can read or write.
alter table public.processed_events enable row level security;
