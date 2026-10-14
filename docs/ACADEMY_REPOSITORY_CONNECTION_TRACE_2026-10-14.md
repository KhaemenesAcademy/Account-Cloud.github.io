# Account Cloud → Academy Repository Connection Trace
Date: 2026-10-14 · Source-level inspection only; not a live runtime or server authorization verification.

## Trace
1. **Account Cloud:** `assets/account-cloud-client.js` defines protected HTTP transport, synthetic canonical store, mutation validation, and sanitized session projections. `assets/account-cloud-ui.js` exercises synthetic and client workflows. The public static GitHub site is **not** canonical student storage.
2. **Academy front door:** `vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-registry.js` persists family and learner records locally. `assets/khaemenes-family-school-bridge.js` selects destinations and hands off stage/grade context. These are local browser flows and not proof of protected Account Cloud sync.
3. **High School:** `courses/shared/course-entry-contract.js` reads the active learner and Academy Family Registry local keys, but contains no protected Account Cloud API transport; student portfolios remain local JSON/export by design.
4. **Middle School:** `assets/khaemenes-middle-naib-bridge.js` exists. No dedicated Account Cloud integration was identified in the repository tree.
5. **Elementary:** No dedicated Account Cloud adapter identified in the inspected repository tree.
6. **Preschool:** `assets/khaemenes-profile-bridge.js` declares itself local-first and not transmitting data.
7. **Higher Learning:** `assets/khaemenes-higher-learning-profile-adapter.js` reads Academy family/profile context locally; no protected Account Cloud API transport identified.
   
## Missing end-to-end edges
- Protected **Wend authenticated session → Account Cloud** authorization and server persistence: requires host-side inspection and synthetic cross-device evidence.
- **Academy family/learner identity → protected account link**: defined by mapping contracts, not verified commissioned.
- **School record mirrors → Account Cloud**: course mastery remains authoritative in the course; protected read-only mirrors need acceptance tests and privacy filtering.
- **Parent/teacher visibility → per learner access**: must be decided by server authority, never by browser role metadata.
- **Mac/tablet offline edits → versioned reconciliation**: requires version checks, explicit conflict outcomes and recovery with no lost submissions.

## Immediate recommendations
1. Keep Academy Family Registry the explicit local fallback; mark it as **LOCAL PROFILE**, not server-connected.
2. Provide a capability-status adapter which reports `local`, `unavailable`, or `verified-server` only after checking the protected authenticated session; never infer connected status from a script or profile key alone.
3. Make the school connectors read-only to the protected identity and mastery projections until the authorization tests pass.
4. Run the synthetic cross-device acceptance matrix from `docs/CROSS_DEVICE_ACCEPTANCE_GATE.md` and test mismatched learners and families.
5. Preserve STOS and private authority boundaries. Never push real learner data, tokens, endpoints with credentials, or secrets to public GitHub pages.

## Verification boundary
This trace establishes file and contract relationships only. It does not certify any actual Mac↔server↔tablet operation, active authorization, or public-site deployment.
