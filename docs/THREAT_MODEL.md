# Threat Model v0.2

Primary threats addressed by this source contract:
- browser-local identity mistaken for cross-device authority;
- stale device overwrite;
- forged/modified session-view fields;
- Wend `metadata.roles` treated as authorization;
- generic JSON patch changing immutable identity/permission/mastery fields;
- session/refresh/recovery secrets leaking into browser storage or GitHub;
- one family accessing another family's learners;
- duplicate learner or institutional-ID creation during migration;
- Account Cloud accidentally becoming a second credential/session/mastery authority;
- ADMIN receiving credential secrets;
- GitHub remaining a runtime dependency after sovereign cutover.

The protected runtime must still perform independent abuse, CSRF/origin, rate-limit, recovery, authorization, storage-corruption, backup/restore, and incident-response testing before production.
