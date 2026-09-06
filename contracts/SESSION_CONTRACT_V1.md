# Session Contract v1

Production browser sessions require:

- Secure cookie;
- HttpOnly cookie;
- deliberate SameSite policy;
- server-side session authority;
- `credentials: "include"`;
- explicit origin policy;
- CSRF protection for state-changing browser requests as appropriate;
- rate limits on login/recovery.

Never store in `localStorage` or `sessionStorage`:

- passwords;
- password hashes;
- bearer tokens;
- refresh tokens;
- session tokens;
- recovery tokens;
- encryption keys.

A display-safe session view may include identifiers and expiry metadata but never the cookie value or server-side session secret.
