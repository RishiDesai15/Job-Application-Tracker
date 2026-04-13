# 📋 Job Hunt — Application Tracker

A clean, dark-themed, interactive job application tracker that lives entirely in your browser. No backend, no sign-up — just open the file and start tracking.

---

## ✨ Features

- **Add / Edit / Delete** applications with a smooth modal UI
- **Color-coded status badges** — Interview, Rejected, Waiting, Intro Call, Offer, Withdrawn, Pending
- **Filter by status** with one-click pill buttons
- **Search** across company, position, notes, and contact info
- **Sort** by company, position, or applied date
- **Contact emails** render as clickable `mailto:` links
- **Live stat counters** in the header (total, interviews, rejected, offers)
- **Export to CSV** — download a snapshot at any time
- **Persistent storage** via `localStorage` — your data survives page refreshes
- Pre-loaded with sample data so you can explore right away

---

## 📁 File Structure

```
job-tracker/
├── index.html      # App shell + table + modals
├── styles.css      # Dark theme, badges, layout
├── app.js          # All logic: CRUD, filtering, sorting, CSV export
└── README.md       # This file
```
---

## 💾 Data & Privacy

All data is stored in your browser's `localStorage`. It **never leaves your device** — there's no server, no database, no analytics. To move your data to another browser or device, use the **CSV export** button and re-import manually.

Storage behavior notes:
- Sample rows are seeded only on first run.
- If saved data is missing later, the app does not silently reseed over your history.
- The app keeps an internal recovery snapshot of your latest saved jobs and attempts auto-restore if the primary storage payload is corrupted.
- If storage is corrupted or blocked, the app shows an error so you know data could not be loaded/saved.
- A reminder banner appears when CSV backup is overdue (7+ days without export).
- Export CSV periodically as your portable backup, especially before clearing browser data or switching profiles.

---

## 🎨 Status Colors Reference

| Status     | Color         |
|------------|---------------|
| Interview  | 🟢 Green      |
| Intro Call | 🔵 Blue       |
| Waiting    | 🟡 Yellow     |
| Rejected   | 🔴 Red        |
| Offer      | 🟣 Purple     |
| Withdrawn  | 🟠 Orange     |
| Pending    | ⚪ Grey       |

---

## 🛠 Customization Tips

- **Add more status options**: Edit the `<select id="fResponse">` in `index.html` and add corresponding badge/row classes in `styles.css`
- **Change the color theme**: All colors are CSS variables at the top of `styles.css` under `:root`
- **Remove sample data**: In `app.js`, clear out the `SAMPLE_DATA` array
- **Add more columns**: Add a `<th>` in `index.html`, a `td` in the `rowHTML()` function in `app.js`, and a matching field in the form

---
