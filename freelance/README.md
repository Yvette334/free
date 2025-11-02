# Freelance Dashboard (React + TypeScript)

## What it is
A simple freelance dashboard demonstrating TypeScript models, Context + useReducer, and type-safe components.

## Run
1. `npm install`
2. `npm run dev`

## Features
- Clients, Projects, Payments models (fully typed)
- Context + useReducer with discriminated union actions
- Mark project paid (adds Payment record)
- Utilities: count paid/unpaid, find client, filter/search
- Local storage persistence

## Files
- `src/types.ts` — data models
- `src/context` — reducer & provider
- `src/components` — ClientCard, ProjectList, DashboardStats
