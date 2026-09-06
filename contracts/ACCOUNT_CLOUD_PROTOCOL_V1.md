# Khaemenes Account Cloud Protocol v1

## Purpose

Create one protected, durable, device-independent family and learner continuity authority for Khaemenes Academy.

## Core invariants

1. A Family ID is a relationship identity, never a shared family credential.
2. Every adult authenticates independently.
3. Every learner has one stable internal `learnerId`.
4. Institutional Student/Scholar IDs are server-reserved or server-confirmed.
5. Browser storage is not the identity authority.
6. Session credentials remain server-side and are represented to the browser by Secure + HttpOnly cookies.
7. Every mutable canonical record carries a monotonic `recordVersion`.
8. Every device write declares the `baseVersion` from which it was created.
9. A stale write fails with a version conflict rather than silently overwriting a newer record.
10. Parent/guardian recovery may reset a learner credential or unlock an account only when authorized. Old plaintext passwords are never retrievable.
11. Course engines retain mastery/progression authority.
12. Archaemenes may guide learning but cannot manufacture mastery.
13. GitHub contains source, contracts, documentation, and synthetic fixtures only.

## Logical resource families

- adult account
- family
- family access relationship
- learner
- learner progress
- course state
- display-safe session view
- sync envelope
- account audit event
- migration/recovery receipt

## Proposed protected application routes

These are target contracts, not evidence that the runtime routes are already commissioned.

```text
GET    /v1/account/session
DELETE /v1/account/session

GET    /v1/account/families/:familyId
GET    /v1/account/learners/:learnerId

POST   /v1/account/sync
```

Credential creation, login, invitation, recovery, unlock, and privileged Admin mutation routes are intentionally not mocked by this public repository.
