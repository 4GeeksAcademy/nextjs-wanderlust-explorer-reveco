# design.md — Wanderlust Explorer

## Design References

Three real discovery UIs to use as visual/UX reference, chosen because each nails one piece of this build: cards, search, or filters.

1. **[Airbnb — search & listings](https://abdusabri.com/airbnb-search/)** ([design system breakdown](https://superdesign.dev/blog/airbnb-design-system))
   Take from it: the listing card pattern — rounded photo fills the card, heart save-toggle sits top-right on the image, no border/shadow so the photo carries the visual weight; price + rating sit below in plain text. The horizontal category strip (icon + label, active state = underline) is a clean model for the category filter.

2. **[GetYourGuide — search results redesign](https://inside.getyourguide.com/blog/2021/6/22/how-we-redesigned-our-search-experience)**
   Take from it: an "applied filters" chip row above the grid so users see what's active at a glance, a visible result count, and activity cards that surface the 2–3 attributes that actually help comparison (price, rating, duration-equivalent). Maps directly onto our category + destination filter bar.

3. **[Klook — activity search & filters](https://pageflows.com/web/products/klook/)**
   Take from it: filter bar as a compact horizontal row (price / location / category) rather than a sidebar, well suited to a card-grid explorer that needs to stay mobile-first.

These get written up verbatim (with links/screenshots) in the project README under `## Design References`.

## Visual direction

- **Palette**: warm neutral background (off-white / `slate-50`), one saturated accent for CTAs and the active-favorite heart (e.g. coral/terracotta, echoing Airbnb's search button), category badges in muted tints per category rather than one loud color per card.
- **Typography**: one sans-serif family, bold/tight for card titles and hero headline, regular weight for descriptions and metadata (Tailwind defaults are fine — no custom font pipeline needed for an MVP).
- **Cards over chrome**: image-led cards, minimal borders, rely on spacing and rounded corners (`rounded-xl`, `shadow-sm` on hover only) rather than heavy outlines — consistent with reference #1.
- **Density**: grid of cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), roomy gutters, filter bar and search bar stacked above the grid on mobile, inline on desktop.

## Page-by-page layout

- **Home (`/`)**: full-bleed hero (headline + subcopy + single CTA button → `/experiences`), no nav clutter competing with the CTA.
- **Explorer (`/experiences`)**: sticky-ish header block with `SearchBar` + `FilterBar` (category dropdown/pills, destination filter), result count, then the card grid; empty state message centered where the grid would be.
- **Detail (`/experiences/[id]`)**: large image, title, category badge, destination, price/rating, full description, favorite toggle repeated here; back-to-explorer link that preserves the previous query params if feasible.
- **Favorites (`/favorites`)**: same card grid component reused, filtered to favorited IDs; empty state ("no tienes favoritos todavía") distinct from the "no search results" empty state.
- **Profile (`/profile`)**: static avatar/name/bio block plus a small stats card showing favorites count (reads from the same shared state).

## Component inventory

- `Navbar` — persistent, links to all 5 routes, active-link style driven by `usePathname`
- `SearchBar` — controlled input, debouncing optional; writes to URL query param on change
- `FilterBar` — category + destination controls; each writes its own query param, independent of the others
- `ExperienceCard` — image, title, category badge, destination, price, rating, favorite heart toggle (visual state reflects whether `id` is in the favorites list)
- `useExperiences` (or `useFilters`) — custom hook: takes the raw dataset + current search/category/destination values, returns the filtered array; this is where the regex title match and category/destination equality checks live

## Responsive behavior

- Mobile: single-column card grid, search + filters stacked, filter controls collapse into a simple `<select>` or button group rather than a sidebar
- Desktop: multi-column grid, search + filters inline in one row
- Navbar collapses to a compact horizontal bar on mobile (no need for a hamburger/drawer at this scope — five links fit)

## Empty / edge states

- No results for current search+filter combination → centered "No se encontraron resultados" message inside the grid area, filters remain visible so the user can adjust them
- No favorites yet → distinct empty-state copy on `/favorites`, with a link back to `/experiences`
