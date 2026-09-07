# Display-Safe Session View Contract v2

The browser may receive only a projection of authenticated context. It never receives the Wend cookie value or any upstream authority-bearing credential.

Allowed shape:
```text
authenticated
sessionBoundary = wend-v0.1
authorizationAuthority = false
actorType
adultId? / learnerId?
familyIds[]
learnerIds[]
institutionalId?
placement?
displayPermissions[]
expiresAt?
```

`displayPermissions[]` may help the UI decide what controls to show, but every protected action is re-authorized server-side.

Forbidden session-view fields include `role`, `roles`, `metadata`, password/passcode fields, tokens, cookie/session-secret values, refresh credentials, recovery codes, hashes, peppers, and private keys.
