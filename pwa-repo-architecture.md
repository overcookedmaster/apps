# PWA Multi-App Repo Architecture

## Overview

A single GitHub repo hosts multiple PWA apps under one subdomain, deployed via Cloudflare Pages. No build step — plain HTML files only.

## Repo Structure

```
/
├── app-one/
│   └── index.html
├── app-two/
│   └── index.html
└── index.html  ← optional root launchpad
```

## Deployment

- **Host**: Cloudflare Pages
- **Source**: GitHub (auto-deploys on every push to main)
- **Build command**: none
- **Build output directory**: none (or `/`)

## URL Pattern

Each app is accessed at:

```
tabs.yourdomain.com/app-folder-name
```

## Per-App Rules

- Each app lives in its own folder
- The entry file must be named `index.html`
- Apps are self-contained single HTML files (no dependencies to install)
- React and other libraries loaded from CDN inside the HTML file

## Data Persistence

- Each app uses `localStorage` scoped to the subdomain
- Use distinct `localStorage` keys per app to avoid collisions
  - e.g. `tab-tracker-v1`, `another-app-v1`

## PWA / iOS Home Screen

Each `index.html` should include these meta tags for proper iOS install behaviour:

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="App Name">
<meta name="theme-color" content="#000000">
```

Install flow: open URL in Safari → Share → Add to Home Screen.