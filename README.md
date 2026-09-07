# Khaemenes Academy Account Cloud

**Version:** 0.1.1  
**Design lineage:** Mini AGI Cloud → Sovereign Mini Cloud OS · Code Capsule → Khaemenes Account Cloud  
**Current role:** GitHub source / contract / UI / synthetic testbed  
**Production authority:** protected STOS runtime, not GitHub Pages and not browser-local storage

Khaemenes Account Cloud adapts the Mini AGI / Sovereign Mini Cloud model into the protected family and learner continuity system for Khaemenes Academy.

The recognizable three-part Mini AGI layout remains:

```text
Cloud Storage | Directory | Interface
```

Its Academy responsibilities are:

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

## v0.1.1 alignment with the newest Sovereign Mini Cloud build

This package now preserves the latest `Sovereign Mini Cloud OS · Code Capsule` source as a reference witness under `reference/`. Its SHA-256 is:

`f1575a7cf8dc0ddf213bee32e6e94050567a6c35d542625f9739d07e18c20bb8`

Account Cloud adopts its useful source-marker, Code Capsule/provenance, modularization, and explicit local-vault boundary conventions. It does **not** promote the browser-local Mini Cloud filesystem or encrypted IndexedDB vault into the Academy account authority.

See:

- `capsule-manifest.json`
- `docs/SOVEREIGN_MINI_CLOUD_OS_ALIGNMENT.md`
- `contracts/LOCAL_VAULT_BOUNDARY_V1.md`
- `reference/sovereign-mini-cloud-os-code-capsule.html`

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

The current STOS export already contains generic storage primitives including `internal-cloud.js`, `internal-cloud-schema.js`, `storage-fabric.js`, `storage-fabric-schema.js`, and instance wrappers. Therefore this repository does not invent another generic persistence engine.

## Browser-local storage rule

The new Mini Cloud reference build has two useful local mechanisms:

1. normal Mini Cloud tree persistence in browser `localStorage`;
2. an encrypted Private/Black Hole Vault using Web Crypto + IndexedDB.

Neither mechanism is cross-device certification. The Private Vault may be useful later for deliberately local encrypted recovery artifacts, but it is not the canonical student/family database.

## Cross-device rule

A same-browser localStorage or IndexedDB result is not cross-device certification.

Production acceptance requires a synthetic account to prove the same canonical family and learner identity on both Mac and tablet before any real family/student data is introduced.

See:

- `contracts/ACCOUNT_CLOUD_PROTOCOL_V1.md`
- `contracts/STOS_ADAPTER_CONTRACT_V1.md`
- `docs/SECURITY_BOUNDARY.md`
- `docs/CROSS_DEVICE_ACCEPTANCE_GATE.md`
