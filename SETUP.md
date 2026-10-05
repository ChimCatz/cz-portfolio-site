# Setting up a new PC

Everything needed to rebuild CZ's development setup (apps, VS Code
extensions and settings, Python packages, Claude Code settings) and continue
work on this site. Captured from the work PC on 2026-10-05.

## What gets installed

**Apps (winget):** Git, GitHub CLI, VS Code, Node.js 24 LTS, Python 3.14,
Notepad++, Google Chrome, Cursor, AutoHotkey, MySQL Installer + MySQL
Workbench, and pnpm (via npm).

**VS Code extensions (28):** listed in [`setup/vscode-extensions.txt`](setup/vscode-extensions.txt).
Highlights: Claude Code, ChatGPT/Codex, Python + Pylance + Jupyter, Java
extension pack, SQLTools + SQLite, Rainbow CSV, Edit CSV, PDF and Office
viewers, PowerShell, Palenight theme.

**VS Code settings and shortcuts:** [`setup/vscode-settings.json`](setup/vscode-settings.json),
[`setup/vscode-keybindings.json`](setup/vscode-keybindings.json).

**Python packages (22):** [`setup/python-packages.txt`](setup/python-packages.txt)
(DuckDB, matplotlib, openpyxl/xlsxwriter/xlwings, python-docx,
PyMuPDF/pypdf/reportlab, RapidFuzz, Faker, spaCy, PySide6/Flet, ruff,
pyright, pytest, PyInstaller, and more).

**Claude Code settings:** [`setup/claude-settings.json`](setup/claude-settings.json).

**Deliberately left out:** work-licensed apps (Office 2019, Adobe
Illustrator/Photoshop 2022, Teams, Amolto call recorder, Microsoft 365
Copilot) and the company's `voipstudio-cdr-exporter` tool.

## Steps

### By hand (about 10 minutes): get Claude running first

1. **winget:** open PowerShell and type `winget`. If it's not found, install
   "App Installer" from the Microsoft Store.
2. **Git and VS Code:**
   ```
   winget install Git.Git Microsoft.VisualStudioCode
   ```
   Close and reopen PowerShell afterwards so the new commands are found.
3. **Get this repo** (a fresh PC has no copy yet, so this is `clone`, not
   `pull`):
   ```
   cd $HOME\Documents
   git clone https://github.com/ChimCatz/cz-portfolio-site.git
   cd cz-portfolio-site
   git checkout redesign
   code .
   ```
4. **Claude Code:** in VS Code, open Extensions (`Ctrl+Shift+X`), install
   "Claude Code" by Anthropic, and sign in with your personal account.

### Then let Claude do the rest

5. Ask Claude: **"Read SETUP.md and set up this PC."** Claude follows the
   "Notes for Claude" section below. Stay nearby: Windows will show admin
   prompts that only you can click.

### Or run it yourself instead of step 5

```
powershell -ExecutionPolicy Bypass -File setup\install.ps1
```
It takes a while. Accept any Windows admin prompts. If a part fails (for
example a tool isn't found right after installing), open a new PowerShell
and re-run with `-SkipApps`.

## After the script

- **Sign in to VS Code with your personal GitHub (ChimCatz)** via the
  Accounts icon (bottom-left). Then turn on **Backup and Sync Settings** with
  that same account so VS Code stays synced from now on.
- **Sign in to the AI extensions** with personal accounts: Claude Code,
  ChatGPT/Codex, and GitHub Copilot (Copilot has a free tier). On the work PC
  Copilot used the work account, so it starts fresh here.
- **Java:** the Java extension pack needs a JDK, which wasn't installed on the
  work PC either. Install one only if you need Java
  (`winget install EclipseAdoptium.Temurin.21.JDK`).
- **Python on PATH:** if `python` opens the Microsoft Store, turn off the
  "python.exe" App execution alias in Windows Settings.

## Continue the site

```
cd rebrand
npm install
npm run dev
```

See [`README.md`](README.md) for the folder layout and commands, and
[`AGENTS.md`](AGENTS.md) for project decisions.

## Notes for Claude

When asked to set up a new PC from this file:

- **Run the installer in parts, not as one long command.** Use
  `setup\install.ps1` with the skip flags so each part fits in one run:
  1. apps: `-SkipExtensions -SkipPython -SkipSettings`
  2. extensions: `-SkipApps -SkipPython -SkipSettings`
  3. Python packages: `-SkipApps -SkipExtensions -SkipSettings`
  4. settings: `-SkipApps -SkipExtensions -SkipPython`

  App installs can take over 10 minutes, so run part 1 in the background
  and wait for it to finish.
- **Admin prompts:** winget installs may pop up Windows admin (UAC)
  prompts. Tell the user before starting each app batch so they can click
  "Yes". A cancelled prompt shows as exit code 1602; retry that app after
  checking with the user.
- **New commands aren't found until PATH refreshes.** After installing apps,
  later steps may need a fresh shell. The script refreshes PATH itself, but
  if `code`, `npm` or `python` is still missing, re-run the next part in a
  new shell.
- **Settings files:** the script backs up any existing VS Code / Claude Code
  settings (`.bak-<timestamp>`) before replacing them. Mention this to the
  user.
- **Verify at the end:** `node -v` (expect 24.x), `python --version`
  (3.14.x), `code --list-extensions` (28 extensions), then in `rebrand/`:
  `npm install` and `npm run build`. Report anything that failed.
- **Sign-ins are the user's job:** VS Code Settings Sync, GitHub Copilot,
  ChatGPT/Codex. List them as remaining steps; don't try to automate them.
- **Don't touch git branches during setup.** Never merge `redesign` into
  `main` (see the go-live warning in `AGENTS.md`).

## Before wiping the work PC

- **VS Code Settings Sync:** Accounts icon → check which account "Settings
  Sync" is using. If it's the work account (`thinklogicmediagroup-dmt`), turn
  it off and back on with ChimCatz *before* leaving, so the synced copy is
  yours.
- Copy `resources/` (two reference PDFs, not in git) by USB or Google Drive.
- Sign out of the work GitHub account in VS Code and in Windows Credential
  Manager.
