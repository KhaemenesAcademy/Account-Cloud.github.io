# Khaemenes Academy Account Cloud

**Version:** 0.2.0  
**Release class:** STOS pre-intake / source + contracts + synthetic testbed  
**Production authority:** protected STOS runtime, never GitHub Pages

Khaemenes Account Cloud is the Academy-specific continuity authority for **family, adult, learner, institutional-ID, access, migration, audit, and cross-device state**. It is deliberately *not* a password vault, a browser token store, a course mastery engine, or a second session authority.

The design keeps the recognizable Khaemenes Mini Cloud arrangement:

```text
Cloud Storage | Directory | Interface
```

but its sovereign role is now explicit:

```text
Academy Browser
      |
      | opaque HttpOnly cookie only
      v
Wend session boundary
      |
      | server-side identity context
      v
Bunya / Account Authority
      |
      +--> Klik authorization re-check
      +--> Avouch validation
      |
      v
Khaemenes Account Cloud
      |
      v
existing STOS protected storage fabric
      |
      v
canonical Family + Adult + Learner continuity
```

## Hard authority boundaries

- **OHMIC / credential authority** owns credential verification and upstream credential/session authority.
- **Bunya** owns the trusted service handoff/policy seam.
- **Wend** converts trusted server-side authority into a browser-safe opaque session cookie. Account Cloud never stores Wend/OHMIC authority-bearing credentials.
- **Klik** authorizes protected actions. Browser fields, including session display context, never authorize an action by themselves.
- **Avouch** validates bounded requests/records.
- **Account Cloud** owns canonical Academy account-continuity records and version/conflict authority.
- **Course engines** remain the authority for mastery, grades derived from assessment evidence, course completion, and mastery gates.
- **ADMIN** is a private control/reporting surface through a bounded Data Bridge; ADMIN is not the password database.

## Wend invariant

`metadata.roles` from Wend is **never an authorization source**. It is not accepted by the Account Cloud session-view schema and must not be mapped to permissions. Every protected mutation is re-authorized server-side.

## Public-repository boundary

This repository may contain only source code, public contracts, schemas, synthetic fixtures, and non-secret examples. It must never contain real family/student records, passwords, password hashes, session cookies, refresh credentials, reset/recovery tokens, private keys, API keys, SMTP secrets, private educational records, or private trust configuration.

## STOS target

The existing STOS storage implementation must be inspected read-only before adapter commissioning. v0.2.0 requires a native adapter capable of durable storage, compare-and-swap/transactions, namespace isolation, audit append, recovery evidence, and fail-closed behavior.

See:

- `contracts/ACCOUNT_CLOUD_PROTOCOL_V2.md`
- `contracts/WEND_SESSION_BOUNDARY_V1.md`
- `contracts/MUTATION_POLICY_V1.md`
- `contracts/STOS_ADAPTER_CONTRACT_V2.md`
- `contracts/ACADEMY_INTEGRATION_CONTRACT_V1.md`
- `docs/STOS_INTAKE_CHECKLIST.md`
- `docs/CROSS_DEVICE_ACCEPTANCE_GATE.md`
