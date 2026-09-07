# Authority Model v2

```text
Academy / ADMIN browser
        |
        | opaque HttpOnly cookie only
        v
Wend
session handoff boundary
        |
        v
Bunya / Account Authority
        |
        +--> Buddy (peer identity where applicable)
        +--> Klik  (authorization decision)
        +--> Avouch (validation)
        |
        v
Khaemenes Account Cloud
        |
        v
existing STOS internal cloud / storage fabric
```

## Account Cloud owns
- family registry and family identity;
- adult-to-family relationship records;
- learner identity and stable `learnerId`;
- one Adult ↔ one Learner access record per relationship;
- server-confirmed institutional-ID mapping;
- continuity/profile/placement records under policy;
- record version/conflict authority;
- safe account audit events;
- migration and recovery receipts.

## Account Cloud does not own
- password hashing or password verification;
- reset/recovery token custody;
- OHMIC/Bunya refresh credentials;
- Wend session credentials/cookie secrets;
- authorization from browser fields or `metadata.roles`;
- course mastery decisions;
- lesson grading policy;
- mentor authority;
- arbitrary STOS execution;
- general repository administration.

## Authorization invariant
A session view may display permission hints. Those hints are never sufficient to authorize a protected action. The server re-checks the requested capability against canonical records and current policy on every protected mutation.
