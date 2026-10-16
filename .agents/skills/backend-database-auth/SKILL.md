---
name: backend-database-auth
description: Use for database schema design, migrations, authentication, authorization, user accounts, API design, input validation, rate limiting, file storage, background jobs, and data modeling in Vid-Visual.
---

# Backend, Database, and Auth

## First, always
Detect the current stack from the repo (database, ORM, auth provider, storage, queue). Work inside it. Do not switch providers or libraries without my approval. If I ask for a recommendation, give 2 options with tradeoffs and a pick.

## Data modeling
- Every table has id, created_at, updated_at, and an owner (user_id) where it holds user data.
- Add indexes for the queries the app actually runs. Use foreign keys.
- All schema changes are migrations kept in version control. Never edit production by hand.
- Decide and write down the retention and deletion policy for user content and for files.

## Authorization
- Check the user and ownership on the server for every read and write. Never trust the client, hidden fields, or URL ids.
- If the database supports row-level security (for example Postgres or Supabase), enable it, deny by default, and write one policy per operation.
- Use the existing auth provider's tested flows. Do not build password handling yourself.

## API and validation
- Validate all inputs at the boundary with a schema (Zod or the repo's library). Return consistent error shapes.
- Paginate every list endpoint.
- Make expensive create operations idempotent with an idempotency key.
- Rate limit by user and by IP on signup, login, generation, and export.

## Credits and usage
Use an append-only usage ledger (entries for grants, spends, refunds). Compute the balance from the ledger. Never store only a mutable counter.

## Background jobs
A jobs table with status (queued, running, succeeded, failed, canceled), attempts, last error, and timestamps. Retry with exponential backoff and a maximum. Failed jobs refund credits automatically.

## Files
Private storage buckets and short-lived signed URLs. Validate type and size on upload. Random file names. Clean up orphaned files on a schedule.

## Output
A Mermaid ER diagram, the migration, the policies, and tests for permissions and for the ledger math.