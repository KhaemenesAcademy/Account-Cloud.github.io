# Khaemenes Account Cloud Protocol v2

## Purpose
Create one protected, durable, device-independent family and learner continuity authority for Khaemenes Academy without duplicating credential, session, authorization, validation, or mastery authorities.

## Core invariants
1. A Family ID is a relationship identity, never a family-wide credential.
2. Every adult authenticates independently.
3. Every learner has one stable internal `learnerId`.
4. Institutional Student/Scholar IDs become server-confirmed and globally unique; no silent ID churn.
5. Browser storage is never the identity authority.
6. Wend owns the browser session handoff boundary. Account Cloud never persists OHMIC/Bunya refresh credentials, Wend authority credentials, or cookie/session secrets.
7. `metadata.roles` from Wend is ignored for authorization and is not part of the browser session schema.
8. Every protected operation is authorized server-side through the policy authority (Klik or its commissioned equivalent) and validated through Avouch/bounded validation.
9. Every mutable canonical record carries monotonic `recordVersion`; every device mutation declares `baseVersion`.
10. Stale writes fail with conflict instead of last-write-wins.
11. Generic browser sync may change only fields explicitly listed in `MUTATION_POLICY_V1.md`.
12. Course engines retain mastery/progression authority. Account Cloud only mirrors academic continuity/evidence state.
13. Account Cloud never stores plaintext passwords, password hashes, recovery tokens/codes, or password-equivalent secrets in this repository or browser storage.
14. Recovery receipts contain metadata only; credential authority owns actual reset/recovery secrets.
15. GitHub contains source/contracts/docs/synthetic fixtures only.

## Protected logical namespaces
```text
khaemenes-account-cloud/
  families/
  adults/
  family-access/
  learners/
  account-links/
  institutional-ids/
  learner-progress/
  course-state/
  session-views/
  audit/
  migration/
  recovery/
```
`session-views/` contains display-safe references/metadata only, never an authority-bearing session secret.

## Target public-safe routes
Route names remain contracts until a commissioned STOS adapter confirms them.
```text
GET    /v1/account/health
GET    /v1/account/session
DELETE /v1/account/session
GET    /v1/account/families/:familyId
GET    /v1/account/learners/:learnerId
POST   /v1/account/sync
```
Credential submission, verified-contact recovery, family invitations, student password reset/unlock, and privileged authority mutations belong to isolated protected routes and are not mocked by this public source repository.
