# Khaemenes Academy Account Cloud

**Version:** 0.1.0  
**Design lineage:** customized Mini AGI Cloud  
**Current role:** GitHub source / contract / UI / synthetic testbed  
**Production authority:** protected STOS runtime, not GitHub Pages

Khaemenes Account Cloud adapts the existing Mini AGI Cloud model into the protected family and learner continuity system for Khaemenes Academy.

The recognizable Mini AGI layout remains:

```text
Cloud Storage | Directory | Interface
```

Its responsibilities are upgraded to:

```text
Cloud Storage
  Families
  Adults
  Learners
  Institutional IDs
  Sessions
  Account Audit
  Recovery / Migration

Directory
  stable IDs
  family-to-adult links
  family-to-learner links
  learner-to-course continuity
  version / conflict state

Interface
  display-safe administration
  synthetic cross-device tests
  migration and recovery controls
  future STOS protected adapter
```

## Security boundary

This repository must never contain:

- real family records;
- real student records;
- passwords;
- password hashes;
- session tokens;
- refresh tokens;
- recovery tokens;
- private keys;
- API keys;
- production secrets;
- private educational records.

GitHub is the build/source/test location only.

The eventual protected path is:

```text
Khaemenes Academy browser
        |
        v
Nexus inbound application fabric
        |
        v
Buddy -> Klik -> Avouch
peer     policy    validation
        |
        v
Khaemenes Account Cloud authority
        |
        v
existing STOS internal cloud / storage fabric
        |
        v
canonical family + learner continuity
```

The current STOS export already contains generic storage primitives including
`internal-cloud.js`, `internal-cloud-schema.js`, `storage-fabric.js`,
`storage-fabric-schema.js`, and instance wrappers. Therefore this repository
does not invent another generic persistence engine.

## Cross-device rule

A same-browser localStorage or IndexedDB result is not cross-device certification.

Production acceptance requires a synthetic account to prove the same canonical
family and learner identity on both Mac and tablet before any real family/student
data is introduced.

See:

- `contracts/ACCOUNT_CLOUD_PROTOCOL_V1.md`
- `contracts/STOS_ADAPTER_CONTRACT_V1.md`
- `docs/SECURITY_BOUNDARY.md`
- `docs/CROSS_DEVICE_ACCEPTANCE_GATE.md`
