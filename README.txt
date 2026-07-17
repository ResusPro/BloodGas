BloodGas v1.0.12 — on-screen i-STAT and EPOC result views

WHAT THIS VERSION CHANGES
- Adds Picker / i-STAT / EPOC view buttons below case details.
- Supports swipe left/right between the normal parameter picker, an i-STAT-style screen, and an EPOC-style screen.
- i-STAT and EPOC screens are on-screen simulation outputs only; CloudPRNT remains available from the fixed banner and output menu.
- The device screens use the currently selected parameters, values, units, reference ranges, sample type, temperature and FiO2.
- Patient/scenario ID and location remain optional and are only shown in the metadata line when provided.
- The printer-safe 1-bit PNG output, Cloudflare D1 printing, update recovery and v1.0.11 temperature/FiO2 calculations are retained.

DEPLOYMENT
Replace these GitHub files:
- index.html
- service-worker.js
- update.html

rotem-dev.html is included with version references updated but no functional change is required for the main BloodGas device-view feature.

No Cloudflare Worker change is required.
