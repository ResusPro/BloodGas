ResusPro BloodGas v1.0.3 — logo fix

WHY THE LOGO WAS MISSING
The previous Test CloudPRNT action sent only plain text. In addition, jobs containing both PNG and text were advertised in both formats, allowing the printer to choose text/plain. Text-only jobs cannot contain the ResusPro logo.

WHAT THIS VERSION CHANGES
1. Test CloudPRNT now builds and sends a PNG receipt containing logo.png.
2. Any job with a PNG is advertised to the printer as image/png only, so it cannot silently choose the text fallback.
3. The duplicate printed word RESUSPRO is removed when the actual logo is present.
4. The existing D1 storage and /cloudprnt/... path fix are retained.

DEPLOYMENT
A. CLOUDFLARE WORKER
- Replace the entire Worker code with cloudflare-worker.js.
- Keep the D1 binding named DB.
- Deploy.

B. GITHUB PAGES / PWA
- Replace index.html and service-worker.js.
- manifest.json is included but functionally unchanged.
- Keep the existing logo.png in the same folder as index.html.
- After GitHub Pages updates, fully close and reopen the installed PWA once.

TEST
- Open Settings and select Test CloudPRNT.
- The printed test receipt should now have the ResusPro logo at the top.
