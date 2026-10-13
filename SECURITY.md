# Security

## What this is

A static website. It has no login, no database, no API, and no server-side
code. The pages are plain files built by Astro and served by GitHub Pages.
The only way anything becomes public is by being committed to this repo, so
that is what the safeguards below protect.

## Safeguards

| Where | What happens |
|---|---|
| Before every commit | `.githooks/pre-commit` runs `repo-check` on the files about to be committed and stops the commit if it finds a problem. |
| Every push and pull request | [`checks.yml`](.github/workflows/checks.yml) runs the same check on the whole repo and confirms the site still builds. |
| Before every publish | [`deploy.yml`](.github/workflows/deploy.yml) runs the check again first. If it fails, nothing is published. |
| Every month | [Dependabot](.github/dependabot.yml) proposes dependency updates, and sooner for a security fix. |

[`repo-check`](.github/scripts/repo-check.mjs) looks for:

- secret files: `.env`, keys, certificates, password stores, credentials;
- text that looks like a key, token, or password, or an address with a
  password in it;
- documents and archives outside the content folders;
- file paths copied from someone's computer;
- any name on a private blocked list that is kept out of the repo.

Other measures:

- `.gitignore` keeps environment files, keys, and the local `private/` and
  `temp/` folders out of git.
- Workflows run with read-only permissions, except the one job that
  publishes to Pages.
- The site has three direct dependencies and loads no third-party scripts.
  Its JavaScript libraries are served from the site itself.
- Project pages use generic tool names and sample data. See the
  [Terms & Policies](https://chimcatz.github.io/cz-portfolio-site/terms/)
  page.

Turn the commit check on once per clone:

```
git config core.hooksPath .githooks
```

## Reporting a problem

If you find personal information, a credential, or anything else that should
not be public, on the site or in this repo, please email
**catalanchimzoe.business@gmail.com** instead of opening a public issue. I
will look into it and remove or fix it promptly.
