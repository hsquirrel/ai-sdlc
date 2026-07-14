# package-release.ps1 — build a deployable zip of the ai-sdlc library for GitHub Copilot.
#
# Layout inside the zip (extract at the target repo's root):
#   .github/skills/<skill>/...        active skills (Agent Skills open standard; Copilot reads these)
#   .github/copilot-instructions.md   generated from CLAUDE.md
#   references/                        shared files the skill bodies cite by relative path
#   templates/                         repo-level templates (run-log etc.)
#   tools/atl/                         standalone atl.mjs bundle + .env + .env.local.example (never the real .env.local)
#   .ai-sdlc/runs/                     run-log landing directory (stub README)
#   RELEASE.md                         manifest: version, contents, extraction notes
#
# Usage: .\scripts\package-release.ps1 [-IncludeDeferred] [-SkipAtlBuild] [-Version <label>]
param(
    [switch]$IncludeDeferred,
    [switch]$SkipAtlBuild,
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot

# ---- version label -------------------------------------------------------
$sha = (git -C $repo rev-parse --short HEAD).Trim()
$dirty = -not [string]::IsNullOrWhiteSpace((git -C $repo status --porcelain))
if (-not $Version) {
    $Version = '{0}-{1}{2}' -f (Get-Date -Format 'yyyyMMdd'), $sha, $(if ($dirty) { '-dirty' } else { '' })
}

# ---- collect skills ------------------------------------------------------
$allSkillDirs = Get-ChildItem (Join-Path $repo 'skills') -Directory | ForEach-Object {
    Get-ChildItem $_.FullName -Directory
}
$skills = @()
$deferredSkipped = @()
foreach ($dir in $allSkillDirs) {
    $skillMd = Join-Path $dir.FullName 'SKILL.md'
    if (-not (Test-Path $skillMd)) { throw "No SKILL.md in $($dir.FullName)" }
    $isDeferred = [bool](Select-String -Path $skillMd -Pattern 'Status:\s*deferred' -Quiet)
    if ($isDeferred -and -not $IncludeDeferred) { $deferredSkipped += $dir.Name; continue }
    $skills += $dir
}
$dupes = $skills | Group-Object Name | Where-Object Count -gt 1
if ($dupes) { throw "Skill name collision across roles: $($dupes.Name -join ', ')" }

# ---- staging -------------------------------------------------------------
$staging = Join-Path $env:TEMP ("ai-sdlc-release-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Force $staging | Out-Null
try {
    $skillsRoot = New-Item -ItemType Directory -Force (Join-Path $staging '.github\skills')
    foreach ($skill in $skills) {
        Copy-Item $skill.FullName (Join-Path $skillsRoot $skill.Name) -Recurse
    }

    Copy-Item (Join-Path $repo 'references') (Join-Path $staging 'references') -Recurse
    Copy-Item (Join-Path $repo 'templates') (Join-Path $staging 'templates') -Recurse

    # copilot-instructions.md from CLAUDE.md
    $claudeMd = Get-Content (Join-Path $repo 'CLAUDE.md') -Raw
    $banner = "<!-- Generated from CLAUDE.md by scripts/package-release.ps1 ($Version). Edit CLAUDE.md in the ai-sdlc repo, not this file. -->`n`n"
    Set-Content -Path (Join-Path $staging '.github\copilot-instructions.md') -Value ($banner + $claudeMd) -Encoding utf8 -NoNewline

    # atl bundle — never ship the real .env.local
    $atlSrc = Join-Path $repo 'tools\atl'
    $atlBundle = Join-Path $atlSrc 'dist\atl.mjs'
    if (-not $SkipAtlBuild) {
        if (-not (Test-Path (Join-Path $atlSrc 'node_modules'))) {
            throw "tools/atl has no node_modules - run 'npm install' there first, or pass -SkipAtlBuild to reuse an existing dist/atl.mjs"
        }
        Push-Location $atlSrc
        try { npm run bundle | Out-Null } finally { Pop-Location }
    }
    if (-not (Test-Path $atlBundle)) { throw "Missing $atlBundle" }
    $atlDest = New-Item -ItemType Directory -Force (Join-Path $staging 'tools\atl')
    Copy-Item $atlBundle (Join-Path $atlDest 'atl.mjs')
    Copy-Item (Join-Path $atlSrc 'README.md') (Join-Path $atlDest 'README.md')
    Copy-Item (Join-Path $atlSrc '.env') (Join-Path $atlDest '.env')
    Set-Content -Path (Join-Path $atlDest '.env.local.example') -Encoding utf8 -Value @'
# Copy to .env.local and fill in. Never commit .env.local.
# Unscoped API token from https://id.atlassian.com/manage-profile/security/api-tokens (expires <= 365 days)
ATL_TOKEN=
'@

    # run-log landing directory
    $runsDir = New-Item -ItemType Directory -Force (Join-Path $staging '.ai-sdlc\runs')
    Set-Content -Path (Join-Path $runsDir 'README.md') -Encoding utf8 -Value "Run logs land here - one per run that writes to Jira/Confluence/GitHub, from templates/run-log.md.`n"

    # safety: the real token must not be in the staging tree
    $localEnvs = Get-ChildItem $staging -Recurse -Filter '.env.local' -Force
    if ($localEnvs) { throw ".env.local leaked into staging: $($localEnvs.FullName -join ', ')" }

    # manifest
    $skillLines = ($skills | Sort-Object Name | ForEach-Object { "- .github/skills/$($_.Name)/" }) -join "`n"
    $deferredNote = if ($IncludeDeferred) { 'included' } else { "excluded: $($deferredSkipped -join ', ')" }
    Set-Content -Path (Join-Path $staging 'RELEASE.md') -Encoding utf8 -Value @"
# ai-sdlc Copilot release $Version

Built $(Get-Date -Format 'yyyy-MM-dd HH:mm') from commit $sha$(if ($dirty) { ' (working tree dirty)' }).

Extract this archive at the **root of the target repository**. Skill bodies cite ``references/`` and ``templates/`` by relative path, so keep the folder structure intact.

## Skills ($($skills.Count))

$skillLines

Deferred skills $deferredNote.

## Also included

- ``.github/copilot-instructions.md`` — generated from the library's CLAUDE.md
- ``references/`` and ``templates/`` — shared files the skills cite (``references/atlassian-access.md`` is the Atlassian adapter contract)
- ``tools/atl/atl.mjs`` — standalone Atlassian CLI (needs Node >= 20); copy ``.env.local.example`` to ``.env.local`` and add an API token
- ``.ai-sdlc/runs/`` — run-log landing directory
"@

    # ---- zip -------------------------------------------------------------
    # Not Compress-Archive: on PowerShell 5.1 it writes backslash entry names,
    # which extract as literal '.github\skills\...' filenames on Linux/macOS.
    $releases = New-Item -ItemType Directory -Force (Join-Path $repo 'releases')
    $zipPath = Join-Path $releases "ai-sdlc-copilot-$Version.zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
    try {
        Get-ChildItem $staging -Recurse -File -Force | ForEach-Object {
            $rel = $_.FullName.Substring($staging.Length + 1) -replace '\\', '/'
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $rel)
        }
    }
    finally { $archive.Dispose() }

    [pscustomobject]@{
        zip             = $zipPath
        version         = $Version
        skills          = $skills.Count
        deferredSkipped = $deferredSkipped.Count
        sizeKB          = [math]::Round((Get-Item $zipPath).Length / 1KB)
    } | ConvertTo-Json
}
finally {
    Remove-Item $staging -Recurse -Force -ErrorAction SilentlyContinue
}
