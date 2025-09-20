MongoDB setup for portfolio-hub

This document shows how to create a MongoDB database (using MongoDB Atlas) and initialize it with a minimal seed using the Prisma client included in this project.

1) Create a MongoDB Atlas cluster
- Sign in at https://cloud.mongodb.com and create a new project.
- Create a free shared cluster (or a paid tier if you prefer).
- In "Database Access" create a new database user with a password and give it appropriate roles (readWrite on your database).
- In "Network Access" whitelist your IP for local testing (or 0.0.0.0/0 for quick testing; not recommended for production).

2) Get the connection string
- In Atlas, click "Connect" → "Connect your application" and copy the connection string (SRV). Replace the <password> placeholder and database name.
- Example:
  mongodb+srv://myuser:my%40password@cluster0.abcd123.mongodb.net/portfolio_db?retryWrites=true&w=majority

3) Add to local env
- Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

- Edit `.env` and paste your `DATABASE_URL`.

4) Install dependencies & generate Prisma client

```bash
npm install
npm run db:generate
```

5) Seed the database (provided script)
- Run the provided seed script which uses Prisma client:

```bash
npm run db:seed
```

Files added
- `scripts/seed.js` — seed script using Prisma
- `.env.example` — example env file

Notes
- The Prisma schema is configured for MongoDB. Prisma's migration story for MongoDB is different from SQL databases; use `prisma db push` or Atlas UI to manage schema changes if needed.
