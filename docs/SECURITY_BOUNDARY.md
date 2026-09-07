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


## Sovereign Mini Cloud OS local-vault boundary

The preserved Sovereign Mini Cloud OS reference contains an encrypted browser-local Private/Black Hole Vault. Encryption at rest is useful, but locality remains locality: the vault is not a server, cross-device authority, or Academy credential database.

The Account Cloud UI may describe or inspect this boundary, but production family/learner continuity must resolve through the protected STOS storage authority.
