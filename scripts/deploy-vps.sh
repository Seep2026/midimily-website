#!/usr/bin/env bash
set -euo pipefail

BRANCH="main"
FORCE_RESET="0"
SKIP_NGINX_RELOAD="0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch)
      BRANCH="${2:-main}"
      shift 2
      ;;
    --force)
      FORCE_RESET="1"
      shift
      ;;
    --skip-nginx-reload)
      SKIP_NGINX_RELOAD="1"
      shift
      ;;
    -h|--help)
      cat <<'USAGE'
Usage: ./scripts/deploy-vps.sh [--branch main] [--force] [--skip-nginx-reload]

Options:
  --branch <name>         Deploy target branch (default: main)
  --force                 Discard local changes before deploy (git reset --hard + git clean -fd)
  --skip-nginx-reload     Skip nginx reload step
USAGE
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "==> Project: $PROJECT_DIR"
echo "==> Branch: $BRANCH"

if [[ ! -d .git ]]; then
  echo "Error: current directory is not a git repository."
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is required."
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: node is required."
  exit 1
fi

echo "==> Fetch latest code"
git fetch origin "$BRANCH"

if [[ "$FORCE_RESET" == "1" ]]; then
  echo "==> Force mode enabled: discarding local changes"
  git checkout "$BRANCH"
  git reset --hard "origin/$BRANCH"
  git clean -fd
else
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Error: local changes detected. Commit/stash them first, or re-run with --force."
    exit 1
  fi
  git checkout "$BRANCH"
  git pull --ff-only origin "$BRANCH"
fi

if command -v pnpm >/dev/null 2>&1; then
  echo "==> Using pnpm"
  pnpm install --frozen-lockfile
  pnpm deck:build:all
  pnpm build
elif command -v npm >/dev/null 2>&1; then
  echo "==> pnpm not found, fallback to npm"
  npm ci
  npm run deck:build:all
  npm run build
else
  echo "Error: neither pnpm nor npm is available."
  exit 1
fi

if [[ "$SKIP_NGINX_RELOAD" == "0" ]]; then
  if command -v systemctl >/dev/null 2>&1 && systemctl is-active --quiet nginx; then
    echo "==> Reload nginx"
    systemctl reload nginx
  else
    echo "==> nginx not active via systemctl, skip reload"
  fi
fi

echo "✅ Deploy finished."
echo "   Built files: $PROJECT_DIR/dist"
