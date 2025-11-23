#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

# Activate venv if present
if [ -f ".venv/bin/activate" ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

# Apply migrations
python college_app/manage.py migrate --noinput

# Start server in background if not already running
pids=$(pgrep -f 'manage.py runserver' || true)
if [ -n "$pids" ]; then
  echo "runserver already running (pids: $pids)"
else
  nohup python college_app/manage.py runserver 127.0.0.1:8000 &>/tmp/django.log &
  echo $! > /tmp/django.pid
  echo "Started runserver pid $(cat /tmp/django.pid)"
fi

# Open in default browser
python -m webbrowser http://127.0.0.1:8000/
