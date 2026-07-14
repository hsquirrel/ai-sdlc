# package-release.ps1 — build a deployable zip of the ai-sdlc library for GitHub Copilot.
#
# Layout inside the zip (extract at the target repo's root):
#   .github/skills/<skill>/...        active skills (Agent Skills open standard; Copilot reads these)
#   .github/copilot-instructions.md   copied from the repo (the single source of agent guidance)
#   references/                        shared files the skill bodies cite by relative path
#   templates/                         repo-level templates (run-log etc.)
#   tools/atl/                         standalone atl.mjs bundle + .env + .env.local.example (never the real .env.local)
#   .ai-sdlc/runs/                     run-log landing directory (stub README)
#   RELEASE.md                         manifest: version, contents, extraction notes
#
# Self-sufficient from a fresh clone: verifies Node >= 20, installs dependencies (npm ci),
# runs the unit suite, and builds the atl bundle before packaging.
#
# Usage: .\scripts\package-release.ps1 [-IncludeDeferred] [-SkipAtlBuild] [-SkipTests] [-Version <label>]
#   -SkipAtlBuild  reuse an existing tools/atl/dist/atl.mjs (skips install, tests, and bundling)
#   -SkipTests     build the bundle but skip the unit suite
param(
    [switch]$IncludeDeferred,
    [switch]$SkipAtlBuild,
    [switch]$SkipTests,
    [string]$Version
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot

function Invoke-Step {
    param([string]$Name, [scriptblock]$Body)
    Write-Host ">> $Name"
    & $Body
    if ($LASTEXITCODE -ne 0) { throw "$Name failed (exit $LASTEXITCODE)" }
}

# ---- prerequisites --------------------------------------------------------
if (-not $SkipAtlBuild) {
    $node = Get-Command node -ErrorAction SilentlyContinue
    if (-not $node) { throw 'Node.js is required (>= 20). Install it and re-run.' }
    $nodeMajor = [int]((node --version).TrimStart('v').Split('.')[0])
    if ($nodeMajor -lt 20) { throw "Node.js >= 20 required, found $(node --version)." }
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm is required. Install Node.js >= 20 and re-run.' }
}

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

    # agent instructions — the repo's checked-in copilot-instructions.md is the single source
    Copy-Item (Join-Path $repo '.github\copilot-instructions.md') (Join-Path $staging '.github\copilot-instructions.md')

    # atl bundle — never ship the real .env.local
    $atlSrc = Join-Path $repo 'tools\atl'
    $atlBundle = Join-Path $atlSrc 'dist\atl.mjs'
    if (-not $SkipAtlBuild) {
        Push-Location $atlSrc
        try {
            # cmd /c: PS 5.1 + ErrorActionPreference Stop treats redirected native stderr
            # (which jest/esbuild write normal progress to) as a terminating error.
            if (-not (Test-Path (Join-Path $atlSrc 'node_modules'))) {
                Invoke-Step 'npm ci (tools/atl)' { cmd /c 'npm ci --no-audit --no-fund 2>&1' | Out-Null }
            }
            if (-not $SkipTests) {
                Invoke-Step 'unit tests (tools/atl)' { cmd /c 'npm test 2>&1' | Select-String -Pattern 'Tests:|FAIL' | ForEach-Object { Write-Host "   $_" } }
            }
            Invoke-Step 'bundle atl.mjs' { cmd /c 'npm run bundle 2>&1' | Out-Null }
        }
        finally { Pop-Location }
    }
    if (-not (Test-Path $atlBundle)) { throw "Missing $atlBundle" }
    $atlDest = New-Item -ItemType Directory -Force (Join-Path $staging 'tools\atl')
    Copy-Item $atlBundle (Join-Path $atlDest 'atl.mjs')
    Copy-Item (Join-Path $atlSrc 'README.md') (Join-Path $atlDest 'README.md')
    Copy-Item (Join-Path $atlSrc '.env') (Join-Path $atlDest '.env')
    Set-Content -Path (Join-Path $atlDest '.env.local.example') -Encoding utf8 -Value @'
# Copy to .env.local and fill in. Never commit .env.local.
# Your Atlassian account email, plus an unscoped API token from
# https://id.atlassian.com/manage-profile/security/api-tokens (expires <= 365 days)
ATL_EMAIL=
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

- ``.github/copilot-instructions.md`` — the library's agent instructions
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
    # Directory.GetFiles returns paths prefixed with the base string exactly as passed,
    # so the Substring below is safe even when $env:TEMP uses 8.3 short names or a
    # per-session Temp\N path whose canonical form differs from the string we built.
    # (Get-ChildItem FullName vs the $staging string diverged on such machines and
    # sliced mid-name, producing a bogus single-character root folder in the zip.)
    $stagingFull = [System.IO.Path]::GetFullPath($staging).TrimEnd('\')
    $archive = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
    try {
        foreach ($file in [System.IO.Directory]::GetFiles($stagingFull, '*', [System.IO.SearchOption]::AllDirectories)) {
            $rel = $file.Substring($stagingFull.Length + 1) -replace '\\', '/'
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file, $rel)
        }
    }
    finally { $archive.Dispose() }

    # sanity: every entry must sit under an expected root — fail loudly on layout bugs
    $expectedRoots = @('.github/', '.ai-sdlc/', 'references/', 'templates/', 'tools/', 'RELEASE.md')
    $check = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    try {
        $bad = @($check.Entries.FullName | Where-Object {
                $entry = $_
                -not ($expectedRoots | Where-Object { $entry -eq $_ -or $entry.StartsWith($_) })
            })
        if ($bad.Count -gt 0) {
            throw "Zip layout check failed - entries outside expected roots: $(($bad | Select-Object -First 5) -join ', ')"
        }
    }
    finally { $check.Dispose() }

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
