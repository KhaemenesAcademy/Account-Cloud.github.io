# Credential Recovery Boundary v1

Account Cloud records **recovery receipts and audit evidence**, not recovery secrets.

## Student recovery
A child/student password reset or account unlock normally flows through an authenticated adult who has the required learner permission. The old plaintext password is never retrievable.

## Adult recovery
Adult recovery uses a verified side channel, non-enumerating responses, cryptographically random single-use expiring reset material, attempt/request rate limits, and session invalidation after a successful credential reset as policy requires.

## Account Cloud may store
- receipt ID;
- subject identity reference;
- recovery class (`guardian-student-reset`, `adult-side-channel`, `account-unlock`);
- status (`requested`, `completed`, `expired`, `revoked`);
- timestamps;
- whether active sessions were invalidated;
- redacted audit/event IDs.

## Account Cloud must never store
- plaintext password or old password;
- password hash as a continuity record;
- reset/recovery token or code;
- email/phone verification OTP;
- Wend cookie/session secret;
- OHMIC/Bunya refresh credential.
