ResusPro BloodGas v1.0.4 — thermal logo + arrow flags

WHY THIS VERSION EXISTS
The previous PNG receipt printed the logo in its original colours. On a monochrome thermal printer, the red/blue elements could become faint or disappear, which clipped the visual identity (for example the word PRO and shield details). In addition, the out-of-range indicator still used H/L letters.

WHAT THIS VERSION CHANGES
1. The receipt PNG now converts logo.png into a high-contrast black-on-white thermal version before printing.
2. Out-of-range indicators now use arrows instead of letters:
   - ↓ below range
   - ↑ above range
3. A note is shown in the UI clarifying that sample type changes the blood-gas reference ranges and fill-normal values.
4. The existing D1 storage, working /cloudprnt/... path fix, and logo-PNG-only CloudPRNT behaviour are retained.

SAMPLE-TYPE LOGIC
- Already implemented: arterial / venous / capillary reference ranges for the core blood-gas parameters (pH, pCO2, pO2, HCO3, BE, SaO2, Lactate).
- Unchanged for now: electrolytes, renal indices, Hb/Hct, and POCT chemistry keep shared ranges unless manually edited.

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
- Use Test CloudPRNT and confirm the full ResusPro logo prints clearly in black.
- Enter a value below or above range and confirm the flag column shows ↓ or ↑ on screen and on the printed receipt.
