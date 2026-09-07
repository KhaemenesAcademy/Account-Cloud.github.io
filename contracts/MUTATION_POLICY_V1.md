# Account Cloud Mutation Policy v1

Generic cross-device sync is intentionally narrow. It is not a generic JSON merge API.

## Browser-sync operations
| Operation | Resource | Mutable fields | Server capability |
|---|---|---|---|
| `family.label.update` | family | `familyLabel` | `family.manage` |
| `learner.profile.update` | learner | `displayName` | `learner.manage` |
| `learner.placement.update` | learner | `stage`, `grade` together | `education.manage` |
| `learner.continuity.update` | learner | `activePathway`, `continuityNote` | `learner.manage` or bounded education policy |

## Never generic-sync
- `learnerId`, `familyId`, `institutionalId`;
- `accountSubjectRef`, `authSubjectRef`;
- `adultIds`, `learnerIds` relationship arrays;
- family-access permissions/status;
- account status/lock state;
- `recordVersion`, `createdAt`, `updatedAt`;
- `masteryPercent`, assessment evidence, course completion authority;
- password/password hash/reset token/recovery secret/session secret/refresh credential.

Family access grant/revoke, account lock/unlock, password reset, invitations, institutional-ID confirmation/migration, and course-authority mirrors require dedicated protected operations with server-side authorization and validation.
