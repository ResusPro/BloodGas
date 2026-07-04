RESUSPRO BLOODGAS v1.0.1 — CLOUDPRNT D1
========================================

This is a complete replacement package for BloodGas v1.0.0 CloudPRNT.
It removes all use of Workers KV, so the KV daily write limit cannot stop
printing again.

THE LIVE PRINTER URL DOES NOT CHANGE
------------------------------------
https://resuspro-bloodgas-print.dr-nick.workers.dev

The Star printer configuration therefore remains exactly as it is.

WHY THIS VERSION IS DIFFERENT
-----------------------------
- Print jobs and printer state are stored in Cloudflare D1, not Workers KV.
- D1 free allowance is much larger than KV for this workload.
- Routine healthy printer polling is deliberately throttled to at most one
  stored heartbeat every 15 seconds.
- A rapid printer poll therefore does not create a database write every time.
- Job state changes are still written immediately.
- Each print job remains individually stored and tracked.
- A job is only reported as printed after the printer confirms it, with the
  documented lost-DELETE inference fallback after a completed download.
- Paper-out / cover-open recovery re-offers the same job token rather than
  accidentally taking a new job.
- Old completed jobs are removed when a new job is queued; no constant cleanup
  task or scheduled Worker is required.

CLOUDFLARE SETUP — DO THIS FIRST
--------------------------------
1. Sign in to the Cloudflare dashboard.

2. Create a D1 database:
   Storage & Databases
   > D1 SQL database
   > Create database

   Database name:
   resuspro-bloodgas

3. Open:
   Workers & Pages
   > resuspro-bloodgas-print
   > Settings
   > Bindings
   > Add binding
   > D1 database

4. Set:
   Variable name: DB
   D1 database:  resuspro-bloodgas

5. Save the binding.

6. Open the Worker code editor and replace the entire existing Worker with:
   cloudflare-worker.js

7. Deploy the Worker.

The Worker creates the jobs and printers tables automatically on its first
request. You do not need to paste or run schema.sql. That file is included only
for reference and manual recovery.

The old JOBS KV binding is no longer used. It can be removed after the D1
version is working, but leaving the unused binding temporarily will not affect
this Worker.

VERIFY THE WORKER BEFORE CHANGING THE WEBSITE
---------------------------------------------
Open this address in a browser:

https://resuspro-bloodgas-print.dr-nick.workers.dev/api/health

Expected result:
{"ok":true,"service":"ResusPro BloodGas CloudPRNT","version":"1.0.1","storage":"Cloudflare D1"}

If it instead reports that the D1 binding DB is missing, return to the Worker
Bindings page and check that the variable name is exactly DB in capital letters.

WEBSITE / GITHUB PAGES
----------------------
Replace these complete files:
- index.html
- service-worker.js
- manifest.json

Keep the existing files already in the BloodGas site:
- logo.png
- rotem-dev.html
- pwa-icon-192.png
- pwa-icon-512.png

After GitHub Pages has deployed:
1. Close every open BloodGas browser tab or installed-PWA window.
2. Reopen BloodGas.
3. Confirm the banner says v1.0.1.
4. Open the settings cog and press Test print.

WHAT IS RETAINED
----------------
- One-tap CloudPRNT from the home screen.
- Green Idle, amber Printing/queued and red Offline/error states.
- Patient/scenario ID and Resus Bay/location prominent on the receipt.
- ResusPro logo at the top of image receipts.
- Plain monochrome dashed-line receipt layout.
- Local print, PDF, copy, preview, test print, status and history under settings.
- Same CloudPRNT endpoint and unchanged physical printer configuration.

FILES
-----
cloudflare-worker.js  Complete replacement Cloudflare Worker using D1
index.html           Complete replacement BloodGas app
service-worker.js     Versioned PWA cache v1.0.1-d1
manifest.json         PWA manifest
schema.sql            Reference copy of the automatically-created D1 schema
README.txt            This deployment guide

TESTING COMPLETED BEFORE PACKAGING
----------------------------------
- JavaScript syntax checks passed.
- D1 SQL schema validated against SQLite.
- Simulated full cycle passed:
  queue > printer poll > job download > DELETE confirmation > completed > Idle
- Simulated PNG receipt download passed.
- Simulated lost-DELETE inference passed.
- Fifty immediate idle polls produced no additional heartbeat writes after the
  initial stored heartbeat.
