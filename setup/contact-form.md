# Contact form: finish at home

A Full Name / Email / Message form on the Get in Touch page that sends to
the email address shown on that page. GitHub Pages can't run server code,
so the form posts to a small **Cloudflare Worker**. The Worker checks a
**Cap** proof-of-work token ([github.com/tiagozip/cap](https://github.com/tiagozip/cap)),
then sends the message through **Resend**. All three are free at this
size.

```
Browser (GitHub Pages)  ──►  Cloudflare Worker  ──►  Resend  ──►  your inbox
  form + Cap widget          checks Cap token,       sends the
                             honeypot, limits        email
```

## Already done

- Cloudflare account created.
- `workers.dev` subdomain chosen: **`cz-catalan.workers.dev`**. The Worker
  will live at something like `https://cz-contact.cz-catalan.workers.dev`.

## Your part (about 20 minutes)

### 1. Install what's needed

Wrangler (Cloudflare's command-line tool) needs **Node.js 22 or newer**.
Node 24 LTS is what [`README.md`](README.md) installs anyway.

In PowerShell, check what you have:

```
node -v
```

- **Prints `v22.x` or higher:** skip to step 2.
- **Prints something lower:** find how it was installed and replace it:
  ```
  winget list --id OpenJS.NodeJS
  winget uninstall --id <the Id it shows, e.g. OpenJS.NodeJS.20>
  winget install --id OpenJS.NodeJS.LTS
  ```
- **Not found:** `winget install --id OpenJS.NodeJS.LTS`

Then **close VS Code completely and open it again**, otherwise the
terminal still finds the old Node. Check `node -v` again.

Also needed: Git, VS Code and the Claude Code extension. On a new PC, follow
[`README.md`](README.md) first. Nothing else has to be installed by hand:
`npx` downloads Wrangler when it's first used.

### 2. Get the latest code

In the repo folder:

```
git checkout redesign
git pull
```

(If this PC has no copy of the repo yet, clone it as in
[`README.md`](README.md), step 3, then run the two commands above.)

### 3. Cloudflare: 2FA and log in Wrangler

1. **Turn on two-factor authentication:**
   [dash.cloudflare.com/profile/authentication](https://dash.cloudflare.com/profile/authentication)
   (person icon, top right > Profile > Authentication). Use an authenticator
   app and save the backup codes somewhere outside the repo.
2. **Log in Wrangler** from the VS Code terminal:
   ```
   npx wrangler login
   ```
   Answer `y` to install it, click **Allow** in the browser tab that opens,
   then confirm:
   ```
   npx wrangler whoami
   ```
   It should show your account. Don't click "Create application" in the
   dashboard: the Worker is deployed from code.

### 4. Resend: account and API key

1. Sign up at [resend.com](https://resend.com) **with the same email address
   that's shown on the Get in Touch page.** Without your own domain, Resend
   only delivers to the address the account was made with, which is exactly
   what a contact form needs.
2. Go to **API Keys > Create API key**, permission **Sending access**.
3. Keep the key somewhere safe for a few minutes (Resend shows it only
   once). **Don't paste it into any file or into the Claude chat.** You'll
   type it into a Wrangler prompt in your own terminal.

### 5. Hand over to Claude

Ask Claude: **"Read setup/contact-form.md and build the contact form."**
Stay nearby: there's one step where you paste the Resend key yourself.

## Notes for Claude

The plan the user agreed to on 2026-10-19. Check that the user's part is
done first (`node -v` is 22+, `npx wrangler whoami` works, they have the
Resend key ready) and help with any step that isn't.

### Worker (`worker/` at the repo root, not published)

- Own `package.json` with `capjs-core` and `wrangler` (dev). Look up
  current versions and pin exact ones; read the Cap guide first
  ([trycap.dev/guide](https://trycap.dev/guide/),
  [capjs-core](https://trycap.dev/guide/capjs-core.html)) because the API
  changes between releases.
- One Worker, three routes: Cap challenge, Cap redeem (the widget's API
  endpoint), and the form submit.
- Replay protection: `consumeNonce` and the redeemed token key stored in a
  **KV namespace** (`npx wrangler kv namespace create ...`). Tokens are
  single use. KV free tier is 1,000 writes a day: fine at this size.
- Submit checks, in order: CORS origin is `https://chimcatz.github.io` only
  (plus localhost while testing), per-IP rate limit (Workers rate limiting
  binding), honeypot field empty, Cap token valid, lengths (name ≤ 100,
  email ≤ 254 and a valid format, message ≤ 5,000), then send.
- Send through Resend's HTTP API: plain text only, from
  `onboarding@resend.dev`, to the address in `EMAIL` in
  `rebrand/src/lib/site.ts` (set as a var in `wrangler.toml`), Reply-To the
  visitor's validated email, subject like `Portfolio message from <name>`.
- Return short JSON (`ok` / an error code); never echo the input back.
- Messages are not stored anywhere.
- **Secrets never touch a file or the chat:**
  - `CAP_SECRET`: generate and pipe it straight in, e.g.
    `node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))" | npx wrangler secret put CAP_SECRET`
  - `RESEND_API_KEY`: the **user** runs `npx wrangler secret put RESEND_API_KEY`
    in their own terminal and pastes the key at the prompt.
- `worker/README.md`: what it does and how to deploy (`npx wrangler deploy`).
  Deploy by hand for now; no GitHub Action.
- Test with `npx wrangler dev` against `npm run dev` before deploying. The
  repo check must still pass (`node .github/scripts/repo-check.mjs`).

### Get in Touch page (`rebrand/src/pages/contact.astro`)

- Form at the top of the right column, under the intro: Full Name, Email,
  Message, the Cap widget, a pill "Send message" button. Labels on every
  field, `autocomplete` set, visible focus, errors announced
  (`aria-live`).
- States: sending (button disabled), sent (thank-you message replaces the
  form), error (message shown, typed text kept).
- **Self-host the Cap widget** in `rebrand/public/vendor/cap/` like the
  Vanta files, so the page loads nothing new from a CDN.
- **Follow "Performance and motion" in `AGENTS.md`** (added 2026-10-20).
  In particular: load the Cap widget and its proof-of-work only when the
  visitor starts the form (first focus or input), not with the page (rule
  5); the proof-of-work keeps the processor busy, so pause the background
  globe while it runs (`globe:pause` / `globe:resume` with the reason
  `contact-form`); no new `backdrop-filter` on the form panel (rule 2:
  use the solid `rgba(13, 10, 22, 0.72)` panel background); reserve the
  widget's height so nothing jumps when it appears (rule 6).
- Keep the email tile and the social links below the form as "Or reach me
  directly", so `mailto:` still works without JavaScript.
- Elements the script creates need `is:global` styles under a wrapper (see
  Lessons in `AGENTS.md`).
- Worker URL in one place (e.g. `site.ts`).

### Other files to update in the same change

- `rebrand/src/pages/terms.astro`: the privacy section says the site has
  "no forms". Rewrite it: form messages go through a Cloudflare Worker and
  Resend to the owner's inbox and aren't stored on the site; Cap runs a
  check in the browser (confirm whether the widget uses local storage and
  say so accurately). Add Cloudflare and Resend wherever third parties are
  listed. Change `UPDATED`.
- `AGENTS.md`: Get in Touch bullet (no longer "no form"), Terms bullet,
  repo layout table (`worker/`), and how the Worker is deployed.
- `README.md` (root) if it describes the folders.

### Before calling it done

- Send a real test message from the deployed Worker and confirm it arrives.
- In `rebrand/`, save a layout baseline before starting
  (`npm run build`, then `npm run check -- --save`), and after the change run
  `npm run check -- --compare`: only the Get in Touch page may move. The
  check also covers the three screen sizes, sideways scrolling and the
  footer height.
- Run `npm run check -- --perf --only=contact --phone --weak-gpu` before and
  after (add `/contact/` to `PERF_PAGES` in `scripts/check-site.cjs` first):
  the numbers must not drop.
- Check the form by hand at 1920x1080, 1366x768 and 360x800: keyboard only,
  the sending / sent / error states, and with JavaScript off (the email
  tile still works).
- Work on `redesign`. Never push to `main` without the user's say-so.
