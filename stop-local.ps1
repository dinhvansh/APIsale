$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
docker compose --env-file .env.local-dev -f compose.local.yaml stop
