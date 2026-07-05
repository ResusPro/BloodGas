ResusPro BloodGas v1.0.7 — printer-safe 1-bit PNG

WHY FULL RESULTS FAILED
The short test receipt printed, but a longer receipt with many results, units, ranges and arrows produced a CloudPRNT media decoding error. The browser had been creating a 24/32-bit PNG. Star documents that CloudPRNT printers can have a much lower maximum height for 24-bit PNG than for monochrome PNG because the uncompressed image must fit in printer memory.

WHAT v1.0.7 CHANGES
1. Generates a genuine 1-bit grayscale PNG rather than a browser-default colour PNG.
2. Keeps the full-width 576-dot layout and the working monochrome ResusPro logo.
3. Advertises the job as image/vnd.star.png with its mono_len height so the printer can check it against its supported monochrome image length.
4. Automatically reduces the receipt font when units and ranges make lines wider, so all enabled columns fit the 576-dot paper width.
5. Retains arrow flags, all optional columns, D1 storage and the reliable PWA update mechanism.
6. The Worker automatically adds two small metadata columns to the existing D1 jobs table; no SQL needs to be run manually.

DEPLOYMENT
Cloudflare Worker:
- Replace the complete Worker with cloudflare-worker.js and deploy.
- Keep the existing DB binding.

GitHub Pages / PWA:
- Replace index.html, service-worker.js and update.html.
- After publishing, the app should update itself rapidly. If needed, open update.html once.

TEST
1. Confirm the header reads v1.0.7.
2. Turn on all parameters/columns.
3. Enter several normal, high and low values.
4. Print. The receipt should retain the logo, ranges, units and arrow flags without a media decoding error.
