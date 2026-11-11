# Downloads every image listed in images\manifest.csv from the current site into images\.
# Run from the site folder:  powershell -ExecutionPolicy Bypass -File download-images.ps1
Set-Location $PSScriptRoot
$rows = Import-Csv images\manifest.csv
foreach ($r in $rows) {
  if ((Test-Path $r.local) -and ((Get-Item $r.local).Length -gt 0)) { continue }
  New-Item -ItemType Directory -Force -Path (Split-Path $r.local) | Out-Null
  try { Invoke-WebRequest -Uri $r.url -OutFile $r.local -UseBasicParsing; Write-Host "ok   $($r.local)" }
  catch { Write-Host "FAIL $($r.url)"; Remove-Item $r.local -ErrorAction SilentlyContinue }
}
$have = (Get-ChildItem images -Recurse -File | Where-Object Name -ne 'manifest.csv').Count
Write-Host "Done. $have of $($rows.Count) images present."
