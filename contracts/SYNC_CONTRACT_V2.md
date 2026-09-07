# Sync Contract v2

Each mutable canonical record has a stable resource ID, `recordVersion`, and `updatedAt`.

Each browser mutation includes:
```text
schemaVersion = 2.0
operation
resourceType
resourceId
baseVersion
clientMutationId
sourceDeviceId
changes
```

The protected authority performs:
```text
1. establish authenticated server-side identity from the Wend session;
2. ignore browser/Wend role metadata as authorization;
3. authorize operation with Klik/current policy;
4. validate operation-specific fields;
5. load canonical record;
6. if baseVersion != current recordVersion -> 409 and no mutation;
7. atomically write next record and increment recordVersion;
8. append redacted audit event;
9. return a display-safe record projection.
```

`sourceDeviceId` and `clientMutationId` are audit/idempotency labels, never authentication.
