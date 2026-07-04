RESUSPRO BLOODGAS v1.0.0 — CLOUDPRNT
====================================

This package contains complete replacement code files for the next BloodGas version.

WEBSITE / GITHUB PAGES
Replace:
- index.html
- service-worker.js
- manifest.json

Keep the existing files already in the BloodGas site:
- logo.png          (used on screen and rasterised onto CloudPRNT receipts)
- rotem-dev.html
- pwa-icon-192.png
- pwa-icon-512.png

CLOUDFLARE WORKER
Replace the Worker code with:
- cloudflare-worker.js

The Worker must retain this KV binding:
- Variable name: JOBS
- KV namespace: resuspro-bloodgas-jobs

The printer CloudPRNT URL stays unchanged:
https://resuspro-bloodgas-print.dr-nick.workers.dev

WHAT CHANGED
- One-tap CloudPRNT directly from the home page.
- Print button reports printer state:
  green = Idle
  amber = Printing / queued
  red = Offline / error
- Jobs are stored individually in KV rather than in one queue array.
- A job is only marked printed after CloudPRNT DELETE confirmation, with a safe inference fallback if that confirmation is lost after the printer has downloaded the job.
- Patient / scenario ID and Resus bay / location are prominent on each receipt.
- Existing logo.png is rasterised into the CloudPRNT PNG receipt.
- The receipt retains the simple monochrome dashed-line layout.
- Local print, PDF, copy, preview, test print, status and history are under the settings cog.
- Service worker cache is versioned and old caches are deleted on activation to reduce stale-version problems.

IMPORTANT
After uploading the website files, close and reopen the installed PWA/browser tab once so the new service worker takes control.
