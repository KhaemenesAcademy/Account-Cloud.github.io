# Cross-Device Acceptance Gate

No real family/student data should be introduced until the synthetic account passes this gate.

## Runtime

- [ ] protected Account Cloud service health PASS
- [ ] storage adapter health PASS
- [ ] one canonical family record persists server-side
- [ ] one canonical learner record persists server-side
- [ ] compare-and-swap/version conflict behavior PASS
- [ ] audit append behavior PASS
- [ ] restart persistence PASS

## Mac

- [ ] clean browser sign-in restores synthetic adult/family/learner
- [ ] no authority token in localStorage/sessionStorage
- [ ] write increments server `recordVersion`
- [ ] sign-out revokes session

## Tablet

- [ ] clean browser sign-in restores the same synthetic adult/family/learner
- [ ] exact same `learnerId`
- [ ] exact same institutional ID
- [ ] stale write receives 409 conflict
- [ ] refresh receives current canonical version
- [ ] new write after refresh succeeds

## Final synthetic seal

- [ ] Mac -> server -> tablet propagation PASS
- [ ] tablet -> server -> Mac propagation PASS
- [ ] no duplicate learner record created
- [ ] no duplicate institutional ID created
- [ ] no real account data used

Only after this synthetic seal should production family/student migration be considered.
