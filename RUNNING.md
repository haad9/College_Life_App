College Life App — Very Simple Run Guide

Quickest (one command)
- From the project root `/Users/haadimran/Downloads/college_app`, run:
```zsh
./launch
```
This starts the app and opens a native window (if supported). If a packaged binary exists (`./dist/launcher`) it will be used automatically.

Headless (no GUI)
```zsh
NO_GUI=1 ./launch
```

Force running from source (development)
```zsh
USE_SOURCE=1 ./launch --port 8000
```
This runs `app.py` (uses `.venv` if present).

Quick dev (migrations + dev server)
```zsh
./run_local.sh
```

Check server health
```zsh
curl -I http://127.0.0.1:8000/
```
Expect `HTTP/1.1 200 OK` when ready.

Admin UI
- Visit: `http://127.0.0.1:8000/admin/`
- Test account: `admin` / `AdminPass123!`

Notes
- Default port is `8000` — override with `--port <port>`.
- If you prefer running the packaged executable directly:
```zsh
./dist/launcher
```
- File location: `RUNNING.md` at project root.
