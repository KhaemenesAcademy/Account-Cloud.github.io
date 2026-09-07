# STOS Adapter Contract v2

Account Cloud must bind to the **existing** protected STOS storage family after read-only API verification. This repository does not invent another generic persistence engine.

Required adapter capabilities:
```text
get(namespace, resourceType, resourceId)
create(namespace, resourceType, resourceId, record)
compareAndSwap(namespace, resourceType, resourceId, expectedVersion, nextRecord)
appendAudit(event)
transaction(operations)
health()
recoveryEvidence()
```

Required guarantees:
- durable server-side persistence independent of browser storage;
- atomic compare-and-swap or equivalent transaction;
- namespace isolation for `khaemenes-account-cloud`;
- protected at-rest storage appropriate to the commissioned substrate;
- bounded record size;
- restart persistence for family/learner records;
- recovery/rollback evidence;
- auditable mutations with secret redaction;
- fail-closed behavior on corruption/version ambiguity;
- no dependency on GitHub at runtime.

This contract does **not** authorize modifications to NextJS, existing protected services, or the STOS storage layer before the adapter API is verified.
