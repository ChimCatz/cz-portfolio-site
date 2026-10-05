# Rebuilds CZ's dev setup on a new Windows PC.
#
# Run from the repo root in PowerShell:
#   powershell -ExecutionPolicy Bypass -File setup\install.ps1
#
# Safe to re-run: installed apps/extensions are skipped or updated, and any
# existing VS Code / Claude Code settings are backed up before being replaced.
# Skip parts with: -SkipApps -SkipExtensions -SkipPython -SkipSettings

param(
    [switch]$SkipApps,
    [switch]$SkipExtensions,
    [switch]$SkipPython,
    [switch]$SkipSettings
)

$ErrorActionPreference = 'Continue'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'

function Step($text) { Write-Host "`n=== $text ===" -ForegroundColor Magenta }

function Read-List($file) {
    Get-Content (Join-Path $here $file) |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ -and -not $_.StartsWith('#') }
}

function Refresh-Path {
    $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
                [Environment]::GetEnvironmentVariable('Path', 'User')
}

function Backup-And-Copy($source, $target) {
    $dir = Split-Path -Parent $target
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    if (Test-Path $target) {
        Copy-Item $target "$target.bak-$stamp"
        Write-Host "  backed up existing $(Split-Path -Leaf $target) -> .bak-$stamp"
    }
    Copy-Item (Join-Path $here $source) $target -Force
    Write-Host "  wrote $target"
}

# 1. Apps (winget) -----------------------------------------------------------
if (-not $SkipApps) {
    Step 'Installing apps with winget'
    $apps = @(
        'Git.Git',
        'GitHub.cli',
        'Microsoft.VisualStudioCode',
        'OpenJS.NodeJS.LTS',          # Node 24 LTS (site uses Astro 5, which supports it)
        'Python.Python.3.14',
        'Notepad++.Notepad++',
        'Google.Chrome',
        'Anysphere.Cursor',
        'AutoHotkey.AutoHotkey',
        'Oracle.MySQL',               # MySQL Installer (pick Server 8 inside it)
        'Oracle.MySQLWorkbench'
    )
    foreach ($id in $apps) {
        Write-Host "- $id"
        winget install --id $id -e --accept-source-agreements --accept-package-agreements --disable-interactivity
    }
    Refresh-Path

    if (Get-Command npm -ErrorAction SilentlyContinue) {
        Write-Host '- pnpm (npm global)'
        npm install -g pnpm@9
    } else {
        Write-Warning 'npm not found yet. Open a new terminal and run: npm install -g pnpm@9'
    }
}

# 2. VS Code extensions -----------------------------------------------------
if (-not $SkipExtensions) {
    Step 'Installing VS Code extensions'
    Refresh-Path
    $code = Get-Command code -ErrorAction SilentlyContinue
    if (-not $code) {
        $guess = Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code\bin\code.cmd'
        if (Test-Path $guess) { $code = $guess }
    }
    if ($code) {
        foreach ($ext in Read-List 'vscode-extensions.txt') {
            & $code --install-extension $ext --force
        }
    } else {
        Write-Warning 'VS Code CLI (code) not found. Install VS Code, reopen PowerShell, re-run with -SkipApps.'
    }
}

# 3. Python packages --------------------------------------------------------
if (-not $SkipPython) {
    Step 'Installing Python packages'
    Refresh-Path
    if (Get-Command python -ErrorAction SilentlyContinue) {
        python -m pip install --upgrade pip
        python -m pip install -r (Join-Path $here 'python-packages.txt')
    } else {
        Write-Warning 'python not found. Open a new terminal and re-run with -SkipApps.'
    }
}

# 4. Settings ---------------------------------------------------------------
if (-not $SkipSettings) {
    Step 'Copying VS Code and Claude Code settings'
    Backup-And-Copy 'vscode-settings.json' (Join-Path $env:APPDATA 'Code\User\settings.json')
    Backup-And-Copy 'vscode-keybindings.json' (Join-Path $env:APPDATA 'Code\User\keybindings.json')
    Backup-And-Copy 'claude-settings.json' (Join-Path $env:USERPROFILE '.claude\settings.json')

    Refresh-Path
    if ((Get-Command git -ErrorAction SilentlyContinue) -and -not (git config --global user.email)) {
        git config --global user.name 'ChimCatz'
        git config --global user.email 'cz.catz122999@gmail.com'
        Write-Host '  set git identity to ChimCatz <cz.catz122999@gmail.com>'
    }
}

Step 'Done'
Write-Host 'Next: follow the "After the script" steps in SETUP.md (sign-ins, Settings Sync, the site).'
