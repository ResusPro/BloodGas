ResusPro BloodGas v1.0.9 — fixed banner, optional case details and UI refinement

CHANGES
1. The top ResusPro banner now uses position: fixed rather than position: sticky. It therefore remains visible while the document scrolls in both the browser and installed PWA.
2. A dynamically sized spacer prevents page content from sitting underneath the fixed banner.
3. The Parameters header remains sticky immediately below the fixed banner.
4. Parameter headings are vertically centred more consistently.
5. The high/low heading arrows are side-by-side (↑↓), cannot wrap vertically, and both header/result arrows are heavier.
6. Patient / scenario ID and Resus bay / location are optional. Old automatic defaults (SIM-001 and Resus Bay 1) are removed once. Blank fields are completely omitted from the receipt rather than printing placeholder text.
7. Output history also omits blank optional case details.
8. The monochrome thermal ResusPro logo/header is larger while retaining the printer-safe 1-bit PNG system.
9. Automatic update checking remains enabled on launch, every five minutes, when returning to the foreground, on window focus and when connectivity returns.

DEPLOYMENT
GITHUB / PWA ONLY
- Replace index.html
- Replace service-worker.js
- Replace update.html

No Cloudflare Worker change is required. cloudflare-worker.js is included only as the unchanged working reference.

ROTEM / TEG PAGE
The current rotem-dev.html was not available in the source package used to build this release. It must be updated from the current working rot009 file rather than recreated, so that its trace-profile and all/none functionality are not lost.
