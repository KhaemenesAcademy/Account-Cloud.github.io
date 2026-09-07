# STOS Pre-Intake Matrix

| Check | Expected |
|---|---|
| repository contains no real account data | PASS |
| `.nojekyll` manifest identity | PASS |
| all schemas parse | PASS |
| JS syntax | PASS |
| browser client canonical storage | NONE |
| browser credential/token storage | NONE |
| Wend credentials persisted by Account Cloud | NONE |
| `metadata.roles` authorization | PROHIBITED |
| generic mutation of identity/permissions/mastery | PROHIBITED |
| stale write | 409 / no mutation |
| course mastery | course-engine authority |
| NextJS mutation | NONE |
| external runtime dependency | NONE |
