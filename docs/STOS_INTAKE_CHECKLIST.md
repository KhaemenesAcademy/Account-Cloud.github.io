# STOS Intake Checklist

## Before import
- [ ] ZIP SHA recorded
- [ ] `SHA256SUMS.txt` verifies every file except itself
- [ ] `.nojekyll` present and manifest-covered
- [ ] all JSON parses
- [ ] JavaScript syntax checks pass
- [ ] no real data/secrets
- [ ] no `node_modules`, package manager files, Docker/Podman files, or external runtime dependencies
- [ ] NextJS untouched

## Repository intake
- [ ] create/import repository exactly once
- [ ] verify imported tree against sealed release
- [ ] left-column organizational placement is treated as a view of the same STOS workspace, not a second filesystem
- [ ] do not delete/recreate an apparently empty organizational folder based only on `children: []`
- [ ] preserve Viaduct generations and existing directory semantics

## Commissioning
- [ ] adapter API verified before mutation
- [ ] storage namespace `khaemenes-account-cloud` established
- [ ] synthetic records only
- [ ] Wend boundary verified
- [ ] server authorization re-check verified
- [ ] cross-device gate sealed before real family migration
