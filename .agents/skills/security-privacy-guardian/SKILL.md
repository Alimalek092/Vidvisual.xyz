---
name: security-privacy-guardian
description: Use whenever work touches login, sessions, user data, uploads, API keys, payments, webhooks, AI prompts and outputs, third-party scripts, or before any production launch. Performs a security and privacy review based on the OWASP Top 10 and OWASP guidance for LLM apps.
---

# Security and Privacy Guardian

## Goal
No leaked secrets, no broken permissions, no surprise bills, no careless handling of user data.

## References
OWASP Top 10, OWASP ASVS, the OWASP Cheat Sheet Series, and the OWASP Top 10 for LLM Applications. Check the current versions of these before citing specifics.

## Checklist
- Secrets: none in the repo, client bundle, logs, or screenshots. Keys live in environment variables. .env files are git-ignored. If a secret was ever committed, tell me to rotate it. Never print a secret.
- Authentication: use the proven provider. Session cookies are httpOnly, secure, and sameSite. Protect cookie-based actions from CSRF.
- Authorization: check ownership on every request (watch for IDOR, where a user changes an id in a URL to see another user's data).
- Input and output: validate on the server. Escape output to prevent XSS. Use parameterized queries or the ORM to prevent SQL injection. If the server fetches user-provided URLs, block internal addresses (SSRF).
- Headers: add a Content Security Policy and standard security headers. Review every third-party script.
- Uploads: check type and size, store privately, never execute uploaded files.
- Abuse: rate limit signup, login, generation, and export. Cap spend per user and per day so nobody can run up my AI bill (denial of wallet).
- Webhooks: verify signatures, ignore replays.
- Dependencies: run npm audit, enable Dependabot or Renovate, remove unused packages.
- Logging: useful but free of personal data and secrets. Error pages do not leak stack traces.

## AI-specific risks
Treat user text as data, never as trusted instructions. Never put secrets or other users' data in prompts. Moderate inputs and outputs. Defend against prompt injection from uploaded files and URLs. Block requests for real people's likeness or other people's brands and characters according to our policy.

## Privacy
Privacy policy and terms pages exist and match what the app really does. Data export and delete-account paths. Collect the minimum. Consent for non-essential cookies and analytics where required. Be aware of India's Digital Personal Data Protection Act 2023 and of GDPR if there are EU users. Flag these for a lawyer to confirm. Do not present legal conclusions as facts.

## Output
A findings table sorted by severity (Critical, High, Medium, Low): Issue / Where / Risk / Fix. Fix Critical and High items first, then re-test. If you find a leaked secret, stop and tell me right away.

## Limits
Only test code and systems that belong to this project. Never attack third-party services.