# Security Boundary

## GitHub repository

Trust level: public/static/untrusted.

Allowed:

- source code;
- public contracts;
- JSON Schemas;
- synthetic fixtures;
- non-secret example configuration;
- browser-safe test harnesses.

Forbidden:

- real family/student data;
- passwords or password hashes;
- session/recovery tokens;
- encryption keys;
- private GitHub/STOS credentials;
- real educational records.

## Protected STOS runtime

Owns:

- authentication;
- authorization;
- canonical family/learner records;
- durable persistence;
- sessions;
- audit;
- recovery;
- cross-device continuity.

The Mini AGI Account Cloud UI is a control/view surface. Displaying a record does not make the UI the authority.
