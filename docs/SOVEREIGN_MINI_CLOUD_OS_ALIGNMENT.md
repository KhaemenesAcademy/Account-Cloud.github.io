# Sovereign Mini Cloud OS Alignment

**Account Cloud version:** 0.1.1  
**Reference source SHA-256:** `f1575a7cf8dc0ddf213bee32e6e94050567a6c35d542625f9739d07e18c20bb8`

Account Cloud v0.1.1 was refreshed against the newest `Sovereign Mini Cloud OS · Code Capsule` build.

## Adopted from the newer Mini Cloud build

- the `🟣` source/seam marker convention for quick forensic discovery;
- Code Capsule lineage and manifest-style provenance;
- explicit separation between the visible Mini Cloud tree and a private browser-local vault;
- clear disclosure of what browser-local storage can and cannot secure;
- version-preserving, modular source organization.

## Deliberately not promoted to Account Authority

The newer Mini Cloud build persists its ordinary tree in browser `localStorage`. Its Private/Black Hole Vault encrypts records with Web Crypto and stores encrypted envelopes in IndexedDB. Both remain **browser-local**.

Therefore neither mechanism is the canonical Khaemenes Academy family/student database and neither is proof of Mac ↔ tablet continuity.

## Account Cloud authority boundary

```text
GitHub Account Cloud source / synthetic UI
              |
              v
        protected transport
              |
              v
        STOS Account Cloud adapter
              |
              v
 existing STOS internal-cloud / storage-fabric
              |
              v
 canonical family + learner continuity
```

The browser-local vault may later be useful for operator-owned encrypted recovery artifacts or offline backup witnesses, but it must never silently become the source of truth for Academy identity, credentials, mastery, or cross-device account state.
