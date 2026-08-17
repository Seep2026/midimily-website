#!/usr/bin/env bash
set -euo pipefail

BRANCH="main"
FORCE_RESET="0"
SKIP_NGINX_RELOAD="0"
SKIP_APPOINTMENT_RESTART="0"
SKIP_TESTS="0"
CHECK_ONLY="0"
APPOINTMENT_SERVICE="${APPOINTMENT_SERVICE:-midimily-appointment.service}"
APPOINTMENT_ENV_FILE="${APPOINTMENT_ENV_FILE:-/etc/midimily/appointment.env}"
APPOINTMENT_HEALTH_URL="${APPOINTMENT_HEALTH_URL:-http://127.0.0.1:8787/health}"

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
    --skip-appointment-restart)
      SKIP_APPOINTMENT_RESTART="1"
      shift
      ;;
    --skip-tests)
      SKIP_TESTS="1"
      shift
      ;;
    --check)
      CHECK_ONLY="1"
      shift
      ;;
    -h|--help)
      cat <<'USAGE'
Usage: ./scripts/deploy-vps.sh [options]

Options:
  --branch <name>                Deploy target branch (default: main)
  --force                        Discard local changes before deploy (git reset --hard + git clean -fd)
  --skip-nginx-reload            Skip nginx validation and reload
  --skip-appointment-restart     Skip appointment service preflight, restart, and health check
  --skip-tests                   Skip lint and appointment tests
  --check                        Validate deployment prerequisites without changing files or services

Environment overrides:
  APPOINTMENT_SERVICE            systemd unit (default: midimily-appointment.service)
  APPOINTMENT_ENV_FILE           Server-only env file (default: /etc/midimily/appointment.env)
  APPOINTMENT_HEALTH_URL         Health endpoint (default: http://127.0.0.1:8787/health)
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

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required."
  exit 1
fi

if [[ "$SKIP_APPOINTMENT_RESTART" == "0" ]]; then
  if ! command -v systemctl >/dev/null 2>&1; then
    echo "Error: systemctl is required to manage $APPOINTMENT_SERVICE."
    echo "       Use --skip-appointment-restart only when intentionally deploying the static site alone."
    exit 1
  fi

  if ! command -v curl >/dev/null 2>&1; then
    echo "Error: curl is required for the appointment service health check."
    exit 1
  fi

  if [[ ! -f "$APPOINTMENT_ENV_FILE" ]]; then
    echo "Error: appointment environment file not found: $APPOINTMENT_ENV_FILE"
    echo "       Create it before deployment or use --skip-appointment-restart for a static-only deploy."
    exit 1
  fi

  if ! systemctl cat "$APPOINTMENT_SERVICE" >/dev/null 2>&1; then
    echo "Error: systemd unit not found: $APPOINTMENT_SERVICE"
    echo "       Complete the one-time appointment service setup before deployment."
    exit 1
  fi

  REQUIRED_APPOINTMENT_KEYS=(
    EMAIL_MODE
    APPOINTMENT_TO
    APPOINTMENT_FROM
    TENCENTCLOUD_SECRET_ID
    TENCENTCLOUD_SECRET_KEY
    TENCENT_SES_REGION
    TENCENT_SES_TEMPLATE_ID
  )

  for key in "${REQUIRED_APPOINTMENT_KEYS[@]}"; do
    if ! grep -Eq "^[[:space:]]*${key}=[^[:space:]].*" "$APPOINTMENT_ENV_FILE"; then
      echo "Error: $key is missing or empty in $APPOINTMENT_ENV_FILE."
      exit 1
    fi
  done

  if ! grep -Eq "^[[:space:]]*EMAIL_MODE=[\"']?tencent-ses[\"']?[[:space:]]*$" "$APPOINTMENT_ENV_FILE"; then
    echo "Error: EMAIL_MODE must be tencent-ses in $APPOINTMENT_ENV_FILE."
    exit 1
  fi
fi

if [[ ! -f package-lock.json ]]; then
  echo "Error: package-lock.json is required for reproducible npm ci builds."
  exit 1
fi

if [[ -f .env.production ]]; then
  echo "==> Load .env.production"
  set -a
  source .env.production
  set +a
elif [[ -f .env.local ]]; then
  echo "==> Load .env.local"
  set -a
  source .env.local
  set +a
fi

if [[ -z "${VITE_AI_NAVIGATOR_BASE_URL:-}" || -z "${VITE_AI_NAVIGATOR_API_KEY:-}" ]]; then
  echo "Error: VITE_AI_NAVIGATOR_BASE_URL and VITE_AI_NAVIGATOR_API_KEY are required for the AI guide."
  echo "       Put them in .env.production on the VPS or export them before running this script."
  exit 1
fi

if [[ "$CHECK_ONLY" == "1" ]]; then
  echo "✅ Deployment preflight passed. No files or services were changed."
  exit 0
fi

echo "==> Fetch latest code"
git fetch origin "$BRANCH"

echo "==> Reset generated deck artifacts"
git restore --worktree -- public/solutions
git clean -fd -- public/solutions

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

echo "==> Install dependencies with npm ci"
npm ci

if [[ "$SKIP_TESTS" == "0" ]]; then
  echo "==> Run code checks"
  npm run lint

  echo "==> Run appointment tests"
  npm run appointments:test
fi

if [[ "$SKIP_APPOINTMENT_RESTART" == "0" ]]; then
  echo "==> Verify Tencent SES template"
  node --env-file="$APPOINTMENT_ENV_FILE" server/tencent-ses-check.mjs
fi

echo "==> Build decks"
npm run deck:build:all

echo "==> Build website"
npm run build

if [[ "$SKIP_APPOINTMENT_RESTART" == "0" ]]; then
  echo "==> Restart appointment service"
  systemctl restart "$APPOINTMENT_SERVICE"

  APPOINTMENT_HEALTHY="0"
  for attempt in {1..10}; do
    if curl --fail --silent --show-error "$APPOINTMENT_HEALTH_URL" >/dev/null; then
      APPOINTMENT_HEALTHY="1"
      break
    fi
    sleep 1
  done

  if [[ "$APPOINTMENT_HEALTHY" != "1" ]]; then
    echo "Error: appointment service health check failed: $APPOINTMENT_HEALTH_URL"
    systemctl --no-pager --full status "$APPOINTMENT_SERVICE" || true
    exit 1
  fi

  echo "==> Appointment service is healthy"
fi

if [[ "$SKIP_NGINX_RELOAD" == "0" ]]; then
  if command -v systemctl >/dev/null 2>&1 && systemctl is-active --quiet nginx; then
    if command -v nginx >/dev/null 2>&1; then
      echo "==> Validate nginx configuration"
      nginx -t
    fi
    echo "==> Reload nginx"
    systemctl reload nginx
  else
    echo "==> nginx not active via systemctl, skip reload"
  fi
fi

echo "✅ Deploy finished."
echo "   Built files: $PROJECT_DIR/dist"
if [[ "$SKIP_APPOINTMENT_RESTART" == "0" ]]; then
  echo "   Appointment service: $APPOINTMENT_SERVICE"
  echo "   Health check: $APPOINTMENT_HEALTH_URL"
fi
