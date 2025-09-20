This document explains how to deploy the `portfolio-hub` Next.js application to Vercel.

Prerequisites
- A Vercel account (https://vercel.com)
- The repository pushed to GitHub (or Git provider connected to Vercel)

Quick steps
1. Go to Vercel and click "New Project" → Import Git Repository.
2. Select this repository (`portfolio-hub`).
3. Framework preset: Vercel should auto-detect Next.js. If not, choose "Next.js".
4. Build & Output settings (defaults are fine):
   - Build Command: `npm run build`
   - Output Directory: (leave empty) — Next.js on Vercel uses the default
5. Add Environment Variables (see below).
6. Deploy.

Required / Recommended Environment Variables
- If you use Prisma or a database:
  - `DATABASE_URL` — your database connection string (Postgres, MySQL, etc.)
  - `SHADOW_DATABASE_URL` — optional for migrations
- If you use any API keys (OpenAI, Google, etc.), add them as:
  - `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `AI_API_KEY`, etc.

Prisma notes
- The project includes Prisma. Ensure you run `npx prisma generate` before build or set a postinstall script to generate the client.
- Vercel runs `npm install` on build. To ensure Prisma client is generated, you can add to `package.json` scripts:

  "postinstall": "prisma generate"

Optional: Add a secret for Vercel Postgres if you use Vercel's database.

Troubleshooting
- Build fails with "prisma client not found": ensure `prisma generate` ran (use `postinstall`).
- Missing env var errors: double-check env var names in Vercel dashboard.
- If you're using Node features that require a specific Node version, set the `engines.node` field in `package.json` or set `NODE_VERSION` in Vercel settings.

Verification
- After deploy, visit the generated Vercel URL. Check server logs in the Vercel dashboard if the site fails to load.

Advanced
- If you need serverless functions for API routes, Next.js API routes are supported out-of-the-box on Vercel.
