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

1. **Install winget** if `winget` doesn't work in PowerShell: get "App
   Installer" from the Microsoft Store.
2. **Get this repo.** Download Git first if needed (`winget install Git.Git`),
   then:
   ```
   git clone https://github.com/ChimCatz/cz-portfolio-site.git
   cd cz-portfolio-site
   git checkout redesign
   ```
3. **Run the setup script** from the repo root:
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

## Before wiping the work PC

- **VS Code Settings Sync:** Accounts icon → check which account "Settings
  Sync" is using. If it's the work account (`thinklogicmediagroup-dmt`), turn
  it off and back on with ChimCatz *before* leaving, so the synced copy is
  yours.
- Copy `resources/` (two reference PDFs, not in git) by USB or Google Drive.
- Sign out of the work GitHub account in VS Code and in Windows Credential
  Manager.
