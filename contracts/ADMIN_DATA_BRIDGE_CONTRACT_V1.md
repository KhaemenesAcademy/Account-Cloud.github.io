# ADMIN Data Bridge Contract v1

ADMIN is the private control/reporting surface for Account Cloud. It is not the credential database.

Allowed ADMIN projections include:
- family/learner counts and health;
- display-safe family/learner records when policy permits;
- institutional-ID confirmation state;
- account lock/recovery status metadata;
- audit event summaries;
- migration receipts;
- cross-device acceptance status.

Never bridge to ADMIN:
- passwords or password hashes;
- reset/recovery tokens/codes;
- Wend cookie values or handoff capabilities;
- OHMIC/Bunya refresh credentials;
- private keys/peppers;
- private trust configuration.

ADMIN-initiated mutations are privileged operations and require stronger server-side authorization than ordinary family/learner actions.
