# ReviewIQ — Customer Feedback Analyzer

An academic-project starter implementation for collecting product reviews, importing CSV/Excel files, analyzing sentiment with an AI API, and viewing product feedback dashboards.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + Lucide + Recharts
- Supabase Auth/PostgreSQL (schema and RLS migration included)
- OpenAI API for structured review sentiment analysis
- PapaParse + SheetJS for CSV/XLSX preview
- Vercel deployment configuration

## Implementation status

Included in this delivery: public landing page, dashboard sample analytics, product/review/aggregation/analysis/comparison/report screens, CSV/XLSX preview, Supabase login and registration forms, public review form, AI sentiment endpoint with real OpenAI integration and clearly labelled fallback, AI assistant endpoint, SQL schema and starter RLS policies.

Not yet complete: full live Supabase CRUD wiring for every dashboard screen, authenticated tenant onboarding and route middleware, public anonymous review persistence with abuse controls, bulk-import persistence/background processing, true PDF report generation, complete Hausa translation coverage, and automated end-to-end tests. Dashboard cards currently display sample data and are labelled accordingly.

## Quick start
1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `OPENAI_API_KEY`.
4. In Supabase SQL Editor, run `supabase/migrations/001_initial_schema.sql`.
5. Run `npm install`.
6. Run `npm run dev` and open http://localhost:3000.

The landing page and dashboard can be explored without credentials using clearly labelled sample data. Real customer submissions and saved AI analyses require a configured Supabase project and valid product/business records. The public review endpoint is intentionally protected by database constraints and is not a fully provisioned production multi-tenant onboarding flow yet.

## AI analysis API
`POST /api/ai/analyze` with `{ "text": "The product is excellent but delivery was slow" }`. When `OPENAI_API_KEY` is configured, the server calls the configured OpenAI model and returns structured sentiment, confidence, summary, keywords and aspect-level analysis. Without a key, it returns a clearly labelled keyword-based demo fallback. To persist an analysis, include a valid `reviewId` UUID belonging to a review accessible under the current Supabase session.

## Assistant API
`POST /api/ai/assistant` with `{ "question": "Summarize customer feedback" }`. The current assistant route demonstrates the AI request flow against seeded context. Before using it for a real business, replace the demo context with authorized, tenant-scoped Supabase queries and enforce user authentication.

## Review collection
Public form: `/review/[productId]`. The form posts to `POST /api/reviews`. The route expects a UUID product ID and a database policy that permits the intended public submission flow. The included RLS intentionally does not grant anonymous writes by default. For production, implement a server-side submission function with CAPTCHA/rate limiting, product publication checks, and a narrowly scoped database function or server-only service-role operation. Never expose the Supabase service role key in the browser.

## Spreadsheet import
The import page parses CSV, XLSX and XLS in the browser and previews valid rows. It does not yet persist bulk imports. A production import worker should resolve product IDs, validate all rows, deduplicate by external ID/content hash, create an import job, and enqueue analysis.

## Demo data
The dashboard and core analytics screens use an in-code sample dataset (`lib/demo-data.ts`). It is explicitly labelled sample data and is not live database reporting.

## Deployment to Vercel
1. Push this folder to a private Git repository.
2. Import the repository in Vercel.
3. Add the variables from `.env.example` in Vercel Project Settings.
4. Deploy.
5. Configure Supabase Auth redirect URLs for your deployed domain.
6. Review RLS policies, public submission design, rate limits and storage policies before accepting real customer data.

## Academic project note
This repository provides a functional foundation and demonstrable flows, not a certified production SaaS. Complete the remaining integrations (authenticated workspace provisioning, tenant-scoped live dashboard queries, import persistence/queue, report PDF generation, complete Hausa translations, notifications, audit event triggers, and end-to-end tests) before presenting it as a fully production-ready system.

## Important security notes
- Keep `.env.local` out of source control.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` or `OPENAI_API_KEY` to client components.
- Use tenant-scoped queries and verify ownership on every server action.
- Do not enable unrestricted anonymous inserts on the reviews table.
- Apply abuse prevention to public review forms.
