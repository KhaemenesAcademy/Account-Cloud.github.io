# Mini AGI / Sovereign Mini Cloud Customization Map

The design lineage now has two explicit source stages:

```text
Mini AGI Cloud
    ↓
Sovereign Mini Cloud OS · Code Capsule
    ↓
Khaemenes Academy Account Cloud
```

The original Mini AGI Cloud contained three concepts:

```text
Cloud Storage
Directory
Interface
```

Khaemenes Account Cloud preserves them deliberately.

## Cloud Storage -> Canonical account record model

- Families
- Adults
- Learners
- Institutional IDs
- Sessions
- Account Audit
- Recovery / Migration
- Learner continuity

The GitHub UI uses synthetic in-memory records. Production persistence belongs behind STOS.

## Directory -> Identity graph

- stable Family IDs
- stable Adult IDs
- stable learnerIds
- family/adult relationships
- family/learner relationships
- institutional ID mapping
- current recordVersion

## Interface -> Protected Admin control surface

- display-safe account inspection
- migration/recovery receipts
- version conflict visibility
- cross-device test controls
- runtime health/adapter observation

## Code Capsule -> Source/provenance convention

The newer Sovereign Mini Cloud OS contributes the `🟣` source seam convention and manifest-style modular provenance. Account Cloud v0.1.1 records that lineage in `capsule-manifest.json` while retaining its purpose-built modular assets.

## Private/Black Hole Vault -> local recovery primitive only

The newer Mini Cloud build's encrypted IndexedDB vault remains a browser-local primitive. Account Cloud does not use it as canonical family/student storage and does not count it as cross-device continuity.

Once Account Cloud is imported into STOS, its protected adapter should bind to the existing internal-cloud/storage-fabric layer instead of creating a second generic persistence engine.
