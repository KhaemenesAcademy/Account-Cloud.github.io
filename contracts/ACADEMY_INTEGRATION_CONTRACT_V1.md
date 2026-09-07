# Academy Integration Contract v1

The current Academy Family Registry remains the local fallback/import source until protected persistence is commissioned.

## Canonical mapping
```text
Academy local familyId      -> protected familyId (preserve when safe/unambiguous)
Academy local adultId       -> protected adultId + separate authenticated account link
Academy learnerId           -> protected learnerId (stable; preserve)
Academy local accountId     -> migration evidence / protected account-link mapping only
Academy provisional KA/KS ID-> server-confirmed or explicitly migrated institutional ID
Academy stage/grade         -> canonical stage/grade vocabulary
Academy permissions         -> one Adult <-> one Learner access relationship
```

Canonical stages: `preschool`, `kindergarten`, `elementary`, `middle`, `high`, `higher`.
Canonical grades: `pre-k`, `k`, `01` through `12`, or `null` for Higher Learning where appropriate.

## Browser state labels during transition
- `LOCAL PROFILE`
- `SERVER-CONNECTED ACCOUNT`
- `SIGNED IN`
- `OFFLINE / LOCAL FALLBACK`

The UI must never present a local-only browser record as globally durable.

## Academy session rule
The Academy browser consumes a display-safe session projection derived behind Wend. It must not interpret `metadata.roles` as authorization. Protected actions go back to the server for authorization.
