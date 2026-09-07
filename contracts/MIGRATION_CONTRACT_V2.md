# Migration Contract v2

Purpose: move the existing browser-local Academy Family Registry into protected server authority without identity churn or academic loss.

Rules:
1. Preserve the existing valid internal `learnerId` when unambiguous.
2. Preserve the local `accountId` only as migration evidence/mapping; it does not become a password or session credential.
3. Create/confirm a protected account-subject link separately from the learner identity.
4. Server-confirm or server-migrate the provisional institutional Student/Scholar ID; record any change explicitly.
5. Never create a family-wide password.
6. Adults authenticate independently.
7. Import only minimum continuity fields and explicit Adult ↔ Learner access relationships.
8. Do not import browser auth tokens, plaintext passwords, password hashes, or session state.
9. Preserve academic evidence without increasing mastery or changing course-engine authority.
10. Migration is idempotent: no duplicate adults, families, learners, account links, or institutional IDs.
11. Keep existing browser-local data as non-authoritative recovery evidence until cross-device acceptance is sealed.
12. After acceptance, protected server records are canonical.
