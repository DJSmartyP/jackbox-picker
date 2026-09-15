# Party Picker

A GitHub Pages-ready, unofficial companion for browsing Jackbox Party Pack games and randomly choosing what to play.

## Included
- Party Packs 1–11, plus Pack 12 marked **Upcoming**
- **The Jackbox Survey Scramble** with all six current modes: Hilo, Bounce, Squares, Speed, Dares and Dash
- Search by game or pack
- Exact player-count compatibility filtering
- Interaction filters: Drawing, Quiz, Speaking, Typing
- Pack and standalone-title browser
- Local **Owned collection** and **Favourites** using `localStorage`
- "Find a Game" guided filter
- Configurable animated random wheel
- Add/remove individual games from the wheel
- Spin from selected packs, selected categories, player count, owned packs or favourites
- Mobile-first responsive layout
- Installable PWA manifest
- Original PNG interface assets; no Jackbox logos, screenshots or character art are bundled

## Deploy to GitHub Pages
1. Upload the contents of this folder to the root of a GitHub repository.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save. GitHub will publish the site.

No npm install, build process, database or API key is required.

## Data notes
Player counts and audience/extended-timer flags for Packs 1–11 and The Jackbox Survey Scramble are based on Jackbox Games' official support catalogue, checked September 2026. Survey Scramble is represented as six individually selectable modes so the random wheel can choose a mode directly. Pack 12 is announced but unreleased in this build, so its audience/timer fields are left unknown and the pack is visibly marked Upcoming.

The four interaction categories are editorial classifications for this companion and are intentionally multi-select. Some games (for example music/action titles) do not force-fit into Drawing, Quiz, Speaking or Typing.

## Updating the catalogue
Edit `data/catalogue.js`. Each game record contains:

```js
{
  id: 'unique-id',
  title: 'Game Name',
  pack: 7,
  min: 3,
  max: 8,
  audience: true,
  extended: true,
  tags: ['drawing', 'typing'],
  style: ['Drawing', 'Comedy'],
  desc: 'Short original summary.'
}
```

## Copyright / trademark note
This is an unofficial fan companion. Jackbox and game names are used only to identify the products being catalogued. All bundled visual assets in `/assets` are original and do not reproduce official logos, screenshots, box art or characters.


## Artwork

This build uses official pack promotional artwork from Jackbox Games product pages while keeping the companion UI, filters, wheel, and original support graphics custom to this fan-made project.
