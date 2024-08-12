# Next Experiment

**Visit**: https://josh-next-experiment.vercel.app/

## Overview

An experiment application built with Next.js 14, featuring user authentication and database integration for storing and accessing data.

## Setup

1. Clone the repository:

```
git clone https://github.com/ijoshwang/next-experiment.git
cd next-experiment
```

2. Install dependencies:

```
pnpm install
pnpm dev
```

3. Configure Database:
   Change `.env.example` to `.env.local` in the root of your project and add your own configration:

```bash
# Neon database connection string
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"

# A random value used by Auth.js
AUTH_SECRET="abcdvZhF0kVRhTlDXv83yeZAPQzZL8DvP/Wm/ut/SC7M="
```

```bash
  openssl rand -base64 32
```

4. Run dev

```
pnpm dev
```

5. Visit the Application

```
http://localhost:3000
```

## Tech Stacks

- UI Components built using **Shadcn UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Database on **Neon**
- Written in **TypeScript**
- Authentication using **NextAuth.js**
- State management using **Jotai**

### Why Neon?

Neon is a serverless Postgres platform designed to help you build reliable and scalable applications faster. It separates compute and storage to provide modern developer features such as:

- **Convenience**: Neon offers a straightforward database management experience, allowing developers to focus on building applications without worrying about underlying infrastructure.
- **Branching Features**: Instantly branch your data and schema to access isolated DB copies for development, CI/CD, and schema migrations, using copy-on-write storage.

### Why Jotai?

- **Simplicity**: Jotai offers a minimalist API, reducing boilerplate and making it easy to create and use shared state.
- **Atomic approach**: It uses an atomic model, allowing for fine-grained updates and efficient re-renders.
- **TypeScript friendly**: Jotai provides excellent TypeScript support out of the box, enhancing type safety and developer experience."

## Tradeoffs

Given the time constraints, there are a few areas that require improvement and optimization:

- Component Optimization: Certain business logic currently within components should be moved to a separate layer for better organization.
- Additional Considerations: There might be other details that were not noticed and need refinement.
