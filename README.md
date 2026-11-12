# GoodHart Labs review page

React, Vite and Tailwind. One page: hero, example assessment, six rotating tabs, booking popup.

## Run it

```
npm install
cp .env.example .env   # fill in the three values
npm run dev            # local preview
npm test               # rotator and lead saving tests
npm run build          # production files in dist/
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages). On Vercel, add the three
`VITE_` values as environment variables.

## Where things live

- `src/content.js`: every word on the page. Edit wording here only.
- `src/lib/rotator.js`: tab timing (5 seconds, pause, resume).
- `src/lib/saveLead.js`: checks the form and saves the lead.
- `src/lib/leadsDatabase.js`: the Supabase connection.
- `src/components/`: layout.

## Supabase setup (run once in the SQL editor)

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  phone text not null check (char_length(phone) between 7 and 30),
  email text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text not null check (char_length(company) between 1 and 200),
  position text not null check (char_length(position) between 1 and 100)
);

alter table public.leads enable row level security;

-- Visitors may add a row and do nothing else. They cannot read, change or delete rows,
-- and they cannot set id or created_at.
revoke all on public.leads from anon, authenticated;
grant insert (name, phone, email, company, position) on public.leads to anon;
create policy "insert only" on public.leads for insert to anon with check (true);
```

Leads are read from the Supabase dashboard. Only the publishable key goes in `.env`; never put a secret
or service role key in a `VITE_` variable, because every `VITE_` value ships to the browser.

When exporting leads to a spreadsheet, treat cells starting with `=`, `+`, `-` or `@` as text
(Excel and Google Sheets can run them as formulas).

Known limit: there is no bot check, so a script could fill the table with junk. If that happens, add
Cloudflare Turnstile and move the insert into a Supabase Edge Function.

## Security headers

`vercel.json` sets a Content Security Policy and other headers. `npm run preview` serves the same
headers locally, so check the browser console there before deploying.

## Booking flow

1. Popup form: name, email, phone, company, position.
2. Next saves the lead to Supabase straight away.
3. The Cal.com calendar opens with name and email filled in.
4. When Cal.com reports a booking, the thank you screen shows.

If the save fails, the visitor still reaches the calendar so the booking is not lost (the error is logged).
