# Contact form Worker

The Cloudflare Worker behind the form on Get in Touch. GitHub Pages can't run
server code, so the form posts here. Not part of the published site.

```
Browser (GitHub Pages)  ──►  this Worker  ──►  Resend  ──►  inbox
  form + Cap widget          checks,             sends one
                             rate limits         plain-text email
```

| Route | What it does |
|---|---|
| `POST /cap/challenge` | A [Cap](https://github.com/tiagozip/cap) proof-of-work challenge for the widget. |
| `POST /cap/redeem` | Checks the widget's solutions and returns a single-use token (valid 20 minutes). |
| `POST /send` | The form. Checks in order: origin, per-IP rate limit, honeypot, Cap token, field lengths and email format. Then sends through Resend. |

- Only `https://chimcatz.github.io` may call it (`ALLOWED_ORIGINS` in
  `wrangler.toml`; `npm run dev` adds `http://localhost:4321`).
- Answers are short JSON: `{ ok: true }` or `{ ok: false, error: "<code>" }`.
  The input is never echoed back.
- Messages are not stored. KV (`CAP_KV`) holds only Cap's replay keys and
  redeemed tokens, and every entry expires on its own.
- Email goes from `onboarding@resend.dev` to `TO_EMAIL`, with Reply-To set to
  the visitor's address. Without a verified domain, Resend only delivers to the
  address the Resend account was made with, which is `TO_EMAIL`.
- Rate limits: 5 sends and 20 Cap requests per IP per minute.
- `src/no-instrumentation.js` stands in for esbuild and javascript-obfuscator,
  which capjs-core loads only for an optional feature this Worker doesn't use.

## Secrets

Never in a file or a commit. Set them once with Wrangler:

```
# a random key for signing Cap challenges, piped straight in
node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))" | npx wrangler secret put CAP_SECRET

# the Resend API key (Sending access): paste it at the prompt
npx wrangler secret put RESEND_API_KEY
```

## Deploy

By hand, from this folder (log in once with `npx wrangler login`):

```
npm install
npx wrangler deploy
```

It goes live at `https://cz-contact.cz-catalan.workers.dev`, the address in
`CONTACT_API` in `rebrand/src/lib/site.ts`. Logs while testing:
`npx wrangler tail`.

## Test locally

1. Create `.dev.vars` here (git-ignored) with a test `CAP_SECRET=` and a
   `RESEND_API_KEY=` (a dummy one makes `/send` answer `send_failed`).
2. `npm run dev` (the Worker on port 8787).
3. In `rebrand/`: `PUBLIC_CONTACT_API=http://127.0.0.1:8787 npm run dev`, and
   open the site at `http://localhost:4321`.

## Updating Cap

`capjs-core` here and the widget files in `rebrand/public/vendor/cap/` (see the
`LICENSE.md` there for versions) are pinned. Read the
[Cap guide](https://trycap.dev/guide/) before upgrading either: the API changes
between releases.
