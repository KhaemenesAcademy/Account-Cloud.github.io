# Academy Field Mapping

| Current Academy local field | Protected Account Cloud | Rule |
|---|---|---|
| `familyId` | `family.familyId` | preserve when unambiguous |
| `adultId` | `adult.adultId` | preserve identity; authenticate separately |
| `learnerId` | `learner.learnerId` | permanent; never silently replace |
| local learner `accountId` | migration/account-link evidence | not a credential |
| `institutionalId` | learner + institutional-ID record | provisional until server confirmed |
| `stage` | canonical enum | normalize to preschool/kindergarten/elementary/middle/high/higher |
| `grade` | canonical enum | grade/stage consistency enforced |
| local Adult ↔ Learner permissions | singular `family-access` records | one relationship per adult+learner |
| course state | read-only mirror | course engine remains authority |
