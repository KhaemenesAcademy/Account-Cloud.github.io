# Authority Model v1

```text
Public Academy / Admin UI
        |
        v
Nexus
inbound application transport
        |
        v
Buddy
peer identity where applicable
        |
        v
Klik
authorization policy
        |
        v
Avouch
bounded validation
        |
        v
Khaemenes Account Cloud authority
        |
        v
STOS internal cloud / storage fabric
```

## Account Cloud owns

- family registry;
- adult-to-family membership;
- learner identity;
- adult-to-learner permissions;
- protected account continuity;
- sync/version authority;
- account mutation audit;
- migration/recovery receipts.

## Account Cloud does not own

- course mastery decisions;
- lesson grading policy;
- Mentor authority;
- arbitrary STOS execution;
- general repository administration;
- general GitHub credentials.

## Example policy capabilities

```text
family.view
family.adult.invite
family.adult.revoke
learner.view
learner.manage
student.password.reset
student.account.unlock
```

All protected authorization decisions are server-side.
