# Release Notes · v0.2.0

STOS pre-intake hardening release.

Key changes from v0.1.0:
- reconciled Account Cloud with Wend v0.1.0 session boundary;
- explicitly rejects `metadata.roles` as authorization input;
- replaced arbitrary generic patch semantics with operation-specific mutation policy;
- protected immutable identity, permission, and mastery fields;
- aligned stage/grade and institutional-ID formats with current Academy;
- changed family access to singular Adult ↔ Learner relationships;
- added account-link, institutional-ID, audit, migration, recovery schemas;
- added ADMIN Data Bridge contract;
- hardened HTTP transport (HTTPS, redirect error, no-referrer, origin containment; explicit loopback exception only);
- removed dynamic record rendering through `innerHTML`;
- added security and STOS intake tests/checklists;
- restored `.nojekyll` as a real manifest-covered file;
- no production Node/Python KAS and no NextJS modification.
