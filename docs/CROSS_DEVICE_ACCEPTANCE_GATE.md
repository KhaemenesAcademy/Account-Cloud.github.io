# Cross-Device Acceptance Gate

No real family/student data enters protected Account Cloud until every synthetic item below passes.

## Runtime
- [ ] protected Account Cloud health PASS
- [ ] storage adapter health PASS
- [ ] canonical family/learner persists server-side across service restart
- [ ] compare-and-swap conflict behavior PASS
- [ ] audit append PASS
- [ ] storage recovery evidence PASS
- [ ] no GitHub runtime dependency

## Session / Wend
- [ ] browser receives opaque HttpOnly cookie only
- [ ] no OHMIC/Bunya refresh credential reaches browser
- [ ] `metadata.roles` cannot authorize or unlock an action
- [ ] logout destroys browser session
- [ ] Wend restart invalidates session without deleting family/learner data

## Mac
- [ ] clean sign-in restores synthetic adult/family/learner
- [ ] no authority token in localStorage/sessionStorage
- [ ] permitted write increments server `recordVersion`
- [ ] immutable-field attack is rejected

## Tablet
- [ ] clean sign-in restores exact same familyId/learnerId/institutionalId
- [ ] stale write receives 409
- [ ] refresh receives canonical version
- [ ] valid post-refresh write succeeds

## Isolation / academic firewall
- [ ] cross-family read denied
- [ ] cross-learner management denied without explicit access
- [ ] browser cannot modify family-access permissions through generic sync
- [ ] browser cannot modify mastery/course-authority fields

## Final seal
- [ ] Mac -> server -> tablet propagation PASS
- [ ] tablet -> server -> Mac propagation PASS
- [ ] no duplicate family/learner/institutional-ID created
- [ ] password reset/unlock leaves no recovery secret in browser storage
- [ ] no real account data used
