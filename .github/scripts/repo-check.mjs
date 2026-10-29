#!/usr/bin/env node
// Looks for things that must never be published from this repo: secret
// files, keys and passwords, stray documents, paths from someone's computer,
// and any term on the private blocked list.
//
//   node .github/scripts/repo-check.mjs            every tracked file
//   node .github/scripts/repo-check.mjs --staged   only what is about to be committed
//
// It runs in three places: before every commit (.githooks/pre-commit), on
// every push and pull request (.github/workflows/checks.yml), and again right
// before the site is published (.github/workflows/deploy.yml). A finding
// stops the commit or the deploy.
//
// The blocked terms are names that must not appear anywhere in the repo.
// They are kept out of the repo itself, in private/blocked-terms.txt (one per
// line, # for comments), so that part only runs on a computer that has the
// file. No dependencies: plain Node.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';

const staged = process.argv.includes('--staged');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const root = git('rev-parse', '--show-toplevel').trim();
process.chdir(root);

const files = (staged ? git('diff', '--cached', '--name-only', '-z', '--diff-filter=ACMR') : git('ls-files', '-z'))
  .split('\0')
  .filter((file) => file && existsSync(file) && statSync(file).isFile());

// ---------- Rules ----------

// Files that should never be in the repo, whatever is in them
const BLOCKED_NAMES = [
  [/(^|\/)\.env(\.(?!example$)[^/]*)?$/i, 'an environment file (.env)'],
  [/\.(pem|key|pfx|p12|ppk|kdbx|jks|keystore)$/i, 'a key or password store'],
  [/(^|\/)id_(rsa|dsa|ecdsa|ed25519)[^/]*$/i, 'an SSH key'],
  [/(^|\/)credentials[^/]*\.json$/i, 'a credentials file'],
  [/(^|\/)(\.DS_Store|Thumbs\.db|desktop\.ini)$/i, 'an operating system file'],
  [/\.(sqlite3?|db|mdb|accdb|bak|dump)$/i, 'a database or backup file'],
];

// Documents and archives belong to a content entry (or are the resume, a
// source logo pack, or source data waiting in temp/). Anywhere else, one was
// probably dropped by mistake.
const DOCUMENT = /\.(pdf|docx?|xlsx?|xlsm|pptx?|zip|rar|7z|tgz|gz)$/i;
const DOCUMENT_HOMES = ['rebrand/src/content/', 'rebrand/public/resume/', 'source-files/', 'temp/'];

const MAX_BYTES = 25 * 1024 * 1024;

// Text that looks like a secret. Each is [pattern, what it is].
const SECRETS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'a private key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'an AWS access key'],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}\b/, 'a GitHub token'],
  [/\bgithub_pat_[A-Za-z0-9_]{40,}\b/, 'a GitHub token'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'a Google API key'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}/, 'a Slack token'],
  [/\b[sr]k_live_[0-9a-zA-Z]{20,}\b/, 'a Stripe key'],
  [/\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{32,}\b/, 'an AI service API key'],
  [/\bsb_secret_[A-Za-z0-9_-]{20,}/, 'a Supabase secret key'],
  [/\beyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/, 'a signed token (JWT)'],
  [/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@'"<>]+:[^\s/@'"<>]+@[\w.-]+/i, 'an address with a user name and password in it'],
  [
    /\b(?:password|passwd|pwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret)\b["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i,
    'a password or key written into the file',
  ],
  [/\b[A-Za-z]:\\Users\\[^\\\s"'<>%$]+\\/, "a path from someone's computer"],
  [/(?:^|[\s"'(])\/(?:Users|home)\/[a-z][\w.-]+\//, "a path from someone's computer"],
];

// Not worth reading: other people's minified code and generated lock files
const SKIP_CONTENT = [/^rebrand\/package-lock\.json$/, /^rebrand\/public\/vendor\//, /\.min\.(js|css)$/];

// ---------- Run ----------

const termsFile = 'private/blocked-terms.txt';
const terms = existsSync(termsFile)
  ? readFileSync(termsFile, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
  : [];

const findings = [];
const report = (file, line, what) => findings.push({ file, line, what });
/** Never print the secret itself: a few characters are enough to find it */
const mask = (text) => (text.length <= 8 ? text : `${text.slice(0, 4)}…${text.slice(-2)}`);

for (const file of files) {
  const lower = file.toLowerCase();

  for (const [pattern, what] of BLOCKED_NAMES) if (pattern.test(file)) report(file, 0, `is ${what}`);

  if (DOCUMENT.test(file) && !DOCUMENT_HOMES.some((home) => file.startsWith(home))) {
    report(file, 0, 'is a document or archive outside the content folders');
  }

  const size = statSync(file).size;
  if (size > MAX_BYTES) report(file, 0, `is ${(size / 1024 / 1024).toFixed(0)} MB (limit ${MAX_BYTES / 1024 / 1024} MB)`);

  for (const term of terms) if (lower.includes(term.toLowerCase())) report(file, 0, `has a blocked term in its name: "${term}"`);

  if (SKIP_CONTENT.some((pattern) => pattern.test(file)) || size > 5 * 1024 * 1024) continue;
  const bytes = readFileSync(file);
  if (bytes.subarray(0, 8000).includes(0)) continue; // binary
  const lines = bytes.toString('utf8').split(/\r?\n/);

  lines.forEach((text, i) => {
    if (text.length > 20000) return; // a data blob on one line, not something a person typed
    for (const [pattern, what] of SECRETS) {
      const match = text.match(pattern);
      if (match) report(file, i + 1, `looks like ${what}: ${mask(match[0].trim())}`);
    }
    const lowerText = text.toLowerCase();
    for (const term of terms) if (lowerText.includes(term.toLowerCase())) report(file, i + 1, `has a blocked term: "${term}"`);
  });
}

const scope = staged ? 'staged file(s)' : 'tracked file(s)';
if (!findings.length) {
  const termNote = terms.length ? `${terms.length} blocked term(s)` : `no ${termsFile}, so blocked terms were not checked`;
  console.log(`repo-check: ${files.length} ${scope} clean (${termNote}).`);
  process.exit(0);
}

console.error(`repo-check: ${findings.length} problem(s) in ${files.length} ${scope}:\n`);
for (const { file, line, what } of findings) console.error(`  ${file}${line ? `:${line}` : ''}  ${what}`);
console.error('\nFix or remove these before committing. If one is a false alarm, adjust the rule in .github/scripts/repo-check.mjs.');
process.exit(1);
