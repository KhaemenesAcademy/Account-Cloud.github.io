# Migration Contract v1

Purpose: move browser-local Academy continuity into protected server authority without losing identity or academic history.

Rules:

1. Preserve an existing valid internal `learnerId` when unambiguous.
2. Server-reserve or server-confirm the institutional Student/Scholar ID.
3. Never create a family-wide password.
4. Link independently authenticated adult accounts.
5. Import only the minimum needed continuity fields.
6. Do not import browser auth tokens or plaintext passwords.
7. Record source-device and migration provenance.
8. Preserve academic evidence without increasing mastery.
9. Keep browser-local source data as non-authoritative recovery evidence until migration is accepted.
10. After cross-device acceptance, the protected server record is canonical.
11. Migration must be idempotent and must not duplicate adults, families, learners, or institutional IDs.
