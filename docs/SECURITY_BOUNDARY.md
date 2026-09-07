# Security Boundary

## GitHub repository
Trust level: public/static/untrusted. Allowed: source, contracts, schemas, synthetic fixtures, non-secret examples, browser-safe test harnesses. Forbidden: real family/student data, private educational records, passwords/hashes, tokens/codes, session cookies, refresh credentials, encryption keys, private service credentials, backend trust secrets.

## Protected STOS runtime
Owns canonical family/learner persistence, trusted authorization/validation, audit, migration, recovery receipts, and the native storage adapter. Credential authority and Wend remain separate authorities.

## Browser
The browser may hold public UI preferences and local fallback evidence, but never becomes identity/authorization authority. Account Cloud browser code does not use localStorage/sessionStorage for credentials or canonical records.

## Course firewall
Account Cloud may mirror course progress/mastery for continuity/reporting. Browser sync cannot modify `masteryPercent`; only a trusted course authority may update the mirror.
