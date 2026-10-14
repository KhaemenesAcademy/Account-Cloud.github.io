# Student Portfolio / Parent–Teacher Review · Integration Gate

Date: 2026-10-14. **Status: local-only; live Account Cloud integration blocked pending protected-runtime acceptance.**

## Implemented in High School
- Learner-scoped local portfolio entries, previous local snapshot and write-back verification.
- Deliberate JSON export/import, manual backup guidance.
- A read-only viewer of explicitly supplied export files; no network fetches, localStorage writes or course-grade modifications.
- No private learner documents or student identities added to either GitHub repository.

## Account Cloud synthetic test coverage
The existing `tests/cross-device-test.html` now additionally checks accepted audit entries, version progression, restored synthetic snapshot, and immutable permission mutation rejection. Open that test in a browser over HTTP(S) to execute; repository code inspection alone is not a passing test result.

## Critical distinction
`SyntheticCanonicalStore` models version conflicts, validation, and audit. It **does not** provide authenticated cross-family authorization or canonical persistent server storage. Passing synthetic checks cannot authorize real learner records.

## Required before any real integration
- Protected runtime health, canonical storage persistence across restart, audit and recovery evidence.
- Authenticated Wend HttpOnly session and server-side role/ownership checks, rejecting cross-family and cross-learner requests.
- Synthetic Mac/tablet full round trip, stale write conflicts, 409 recovery, session revocation, and no user data in GitHub.
- Explicit guardian/teacher permissions verified by the protected authority; do not trust browser roles or displayPermissions.
- Strict course-grade firewall: normal browser/portfolio writes must not change mastery percentages or assessments.
- Versioned, bounded portfolio schema and server-side validation, idempotency, consent and export/revocation policy.

## Current safe workflow
Students select their Academy learner and save work locally, export the JSON to dependable storage, and deliberately share a copy with an authorized adult. The reviewer renders the selected file locally, with no automatic sync or implied role authentication.
