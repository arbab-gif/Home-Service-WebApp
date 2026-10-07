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
| `space.html#<id>` | Space detail: Items and Sub-spaces tabs (e.g. `space.html#kitchen`) |
| `documents.html` | Documents: Item / Property tabs, folders, search, upload, edit, delete |
| `activity.html` | Activity: day-grouped timeline, filter by person, date and type |
| `access.html` | Property access: people, roles, access length, invites, share access |
| `notifications.html` | Notifications: full list (the bell opens an overview on every page) |
| `checklists.html` | Checklists: Active / Completed / Templates, create from template or blank, edit, complete, delete |

Shared styles and sample data (spaces, documents, checklists, activity, access, notifications) live in `assets/base.css` and `assets/hrk.js`. Edits made while clicking through are kept for the browser tab only.

Room and cover photos are from [Unsplash](https://unsplash.com) and are placeholders.
