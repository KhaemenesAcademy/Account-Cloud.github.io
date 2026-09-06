# Sync Contract v1

Each mutable canonical record has:

```text
recordVersion
updatedAt
stable resource ID
```

Each mutation has:

```text
resourceType
resourceId
baseVersion
clientMutationId
sourceDeviceId
validated patch/body
```

The protected authority performs:

```text
if baseVersion != current recordVersion:
    return 409 version_conflict
    perform no mutation
else:
    atomically write next record
    increment recordVersion
    append audit event
```

`sourceDeviceId` is an audit/sync label. It is not authentication.

A client receiving a conflict must fetch the current canonical state and reconcile before retrying. Blind last-write-wins overwrite is forbidden.
