# STOS Adapter Contract v1

The current STOS export already contains generic storage primitives including:

- `internal-cloud.js`
- `internal-cloud-schema.js`
- `storage-fabric.js`
- `storage-fabric-schema.js`
- corresponding instance wrappers

Their exact runtime API is intentionally not assumed here.

When this repository is imported into STOS, the Account Cloud adapter should bind the Academy-specific record model to the existing protected storage fabric.

## Required adapter capabilities

```text
get(resourceType, resourceId)
create(resourceType, resourceId, record)
compareAndSwap(resourceType, resourceId, expectedVersion, nextRecord)
appendAudit(event)
transaction(operations)
health()
```

## Required guarantees

- durable server-side persistence;
- atomic compare-and-swap or equivalent transaction;
- protected at-rest storage;
- namespace separation;
- bounded record size;
- recovery/rollback evidence;
- auditable mutations;
- fail-closed behavior on corruption or version ambiguity.

## Logical namespace

```text
khaemenes-account-cloud/
  families/
  adults/
  family-access/
  learners/
  learner-progress/
  course-state/
  sessions/
  audit/
  migration/
```

This logical namespace is a contract only. It is not permission to mutate the live STOS tree before adapter commissioning.
