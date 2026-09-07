# Wend Session Boundary Contract v1

Wend v0.1.0 is the sovereign browser-session handoff boundary.

```text
OHMIC
  | refresh credential
  v
Bunya
  | trusted server-side handoff
  v
Wend
  | authority-bearing credential stays server-side
  v
Academy Browser
  | opaque HttpOnly cookie only
```

## Account Cloud rules
- Account Cloud never stores the OHMIC/Bunya refresh credential.
- Account Cloud never stores a Wend handoff capability or browser cookie value.
- A Wend restart may invalidate active browser sessions; Account Cloud family/learner persistence must survive independently.
- Display-safe session views may record identity references and expiry metadata only.
- `metadata.roles`, `role`, or `roles` delivered by any Wend metadata channel are ignored by Account Cloud and must not be copied into authorization permissions.
- A forged browser session-view object must not unlock a protected action.
- Protected actions must be re-authorized server-side through Klik/policy authority.

Production cookie target: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, `__Host-` prefix. Explicit loopback commissioning may temporarily allow HTTP with Secure disabled; that exception must never be used for production family data.
