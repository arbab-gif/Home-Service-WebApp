# Home Record Keeper — Web App Prototype

Clickable HTML prototype of the Home Record Keeper web app (sample property: Vail Residence).

## Run locally

```bash
npm start
```

Then open http://localhost:5173. No dependencies — `server.js` is a small static server.

## Screens

| File | Screen |
| --- | --- |
| `home-dashboard.html` | Overview: property card, spaces, recent documents, checklists, recent activity, property access |
| `property-edit.html` | Edit property, with a live preview of the Overview card |
| `spaces.html` | All spaces, grouped by floor |
| `space.html#<id>` | Space detail: subspaces and items (e.g. `space.html#kitchen`) |

Shared styles and sample data for the Spaces screens live in `assets/base.css` and `assets/hrk.js`. Edits made while clicking through are kept for the browser tab only.

Room and cover photos are from [Unsplash](https://unsplash.com) and are placeholders.
