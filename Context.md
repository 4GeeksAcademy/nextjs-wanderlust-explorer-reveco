# Context.md — Wanderlust Explorer

## Project

Frontend MVP for **Wanderlust Labs**, a travel-tech startup building a platform to discover and save unique experiences worldwide (food tours in Bangkok, sailing routes in the Adriatic, etc.). Deliverable: the **experience explorer** — a multipage React + Next.js app where users browse, search, and filter experiences without full page reloads.

## Source

PM: Lea Moreau, spec delivered via Slack. Full brief lives in the repo README (bilingual, 4Geeks Academy assignment format).

## Tech stack (fixed by spec)

- Next.js (App Router), TypeScript, Tailwind CSS, ESLint
- Scaffolded via `npx create-next-app@latest nextjs-wanderlust-explorer --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- No external state-management libraries (no Redux, Zustand, etc.) — all state via native `useState`/props/custom hooks
- No `localStorage` — favorites persistence across reloads is explicitly out of scope

## Required pages

| Route | Purpose |
|---|---|
| `/` | Home — hero section, CTA button to `/experiences` |
| `/experiences` | Explorer — grid of all 100 cards, search bar, category + destination filters, state synced to URL query params |
| `/experiences/[id]` | Detail — full experience info looked up by ID from the local dataset |
| `/favorites` | Favorites — experiences the user has hearted, from shared state |
| `/profile` | Profile — static simulated user profile + count of saved favorites |

## Data

- 100 AI-generated experience objects, saved as `src/data/experiences.ts`
- `Experience` interface (TypeScript), minimum fields: `id`, `title`, `description`, `category` (`Adventure | Culture | Food | Wellness | Nature`), `destination` (city + country), `price`, `rating`, `imageUrl`
- Interface used consistently across the app — no ad hoc shapes per component

## Core behaviors

- **Search**: filters by title, case-insensitive regex match (e.g. `new RegExp(term, 'i').test(experience.title)`)
- **Filters**: category and destination filter independently and combine with search (AND logic)
- **URL as source of truth**: search term + active filters live in query params via `useSearchParams`/`usePathname` (e.g. `/experiences?search=vela&category=adventure&destination=Croatia`); on load, inputs prefill from the URL and results are pre-filtered
- **Favorites**: heart toggle per card, ID list held in a top-level `useState`, passed down as props; no persistence required
- **Empty state**: "No se encontraron resultados" when filters/search yield nothing

## Required components (minimum)

`ExperienceCard`, `SearchBar`, `FilterBar`, `Navbar` — plus at least one custom hook encapsulating filter logic (e.g. `useExperiences` / `useFilters`) and at least one `useEffect` (syncing filtered results to query param changes, or setting `document.title` on the detail page).

## Quality bar

- Responsive (mobile + desktop)
- Navbar present on every page, active-link styling via `usePathname`
- Client-side navigation only, no full reloads between routes
- Components split logically — no single file holding the whole app
- Consistent TypeScript types/interfaces throughout

## Design references requirement

Before building components, source 2–3 real discovery UIs (clean cards + search + filters) as visual references, and document them in the README under `## Design References`. See `design.md` for the shortlist and how each maps onto this build.

## Submission

1. Public GitHub repo named `nextjs-wanderlust-explorer`, all work committed and pushed to `main`
2. Repo URL shared with instructor
3. Optional: deployed URL (e.g. Vercel) in the repo description — bonus, not required

## Explicitly out of scope

- Favorites persistence across reloads / `localStorage`
- External state management libraries
- Backend/API — dataset is local and static
