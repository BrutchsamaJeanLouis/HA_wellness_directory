# Health Assured | Wisdom & Wellbeing Directory

Single page app that shows wellbeing resources grouped by category, plus search/filter and a
detail popup. React + TypeScript + MUI, built with Vite. Tests are done with Vitest.

## Running it

Need Node 20+ (I was on Node 24).

```
npm install
npm run dev          # dev server, http://localhost:5173
npm run test         # run the tests once
npm run test:watch   # watch mode - what i used while doing TDD
npm run build        # tsc + production build
npm run lint
```

Port is pinned to 5173 (strictPort) on purpose - otherwise vite quietly jumps to 5174/5175 when
the ports busy and you end up refreshing a dead tab and getting a blank page (happened to me).

## What its doing

On load the resources get grouped by category in the order from the brief
(Podcasts, Articles, Newsletters, Recipes, Fitness, Meditation). Each card has:

- title
- thumbnail
- tags (max 3)
- read/watch time in mins

### Features

Brief says pick at least two of the optional ones, I did two:

1. **Filter by title/tags** - search box, case-insensitive, matches the title or any tag. Filters
   before grouping. Shows an empty state message when nothing matches.
2. **Detail view on click** - click (or keyboard) a card and a dialog opens with all the resource
   data incl. the full description and upload date.

Didnt do the sort one - see below.

## How I approached it

### TDD

Worked in a red -> green -> refactor loop, small commits. Wrote the failing test first each time.

- pure logic lives in small tested functions:
  - `groupByCategory` - groups into the canonical category order, drops empty categories, keeps
    input order.
  - `filterResources` - case insensitive match on title/tags, ignores surrounding whitespace.
- components are tested through accessible roles/text (React Testing Library) rather than poking
  at internals.

42 tests over 10 files, all green, tsc clean.

A few things I cared about:

- keeping the pure data stuff (utils) seperate from the presentation so its easy to test/reuse.
- `ResourceCategory` is a string union so the grouping order etc is checked at compile time.
- mobile-first, responsive layout + navbar (hamburger + drawer on small screens).
- accessibility - cards are keyboard operable (role=button, enter/space, aria-haspopup), sections
  are labelled regions, detail is a real modal.

### Why Vitest

Fast headless unit/component tests, jsdom. Plays nice with Vite, jest-ish api, TS out the box, and
it keeps a clean split from a Playwright E2E layer later (not added yet).

## What I'd do with more time

Kept things focused per the brief (approach > polish), stuff I'd pick up next:

- **Sort by category/date** - the third optional feature, a `sortResources` util + a sort control
  next to the filter.
- **Playwright E2E** - cover the actual journeys (filter -> open detail -> close) in a real browser.
- **Pagination w/ infinite scroll** - lazy load more resources as you scroll (IntersectionObserver
  sentinel triggering the next page) with a loading spinner, keeps the first render light on bigger
  datasets.
- **Data layer** - swap data.ts for a fetch hook with loading/error/empty states to mimic a real
  api, and test those.
- **Deps** - package.json pins a couple things (@mui/material, vite, typescript) ahead of their
  stable releases, would pin back to stable. Already bit me once - MUI's `Stack` typings rejected
  normal props so I used a flex Box instead.
- theming/dark mode + image placeholders.
