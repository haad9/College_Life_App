College App — Local Run Instructions

Quick overview
- Project root: `/Users/haadimran/Downloads/college_app`
- Recommended minimal command: `./launch` (prefers packaged `dist/launcher`, falls back to `app.py`).

Quick start (recommended)
- From the project root run the single command:
```zsh
./launch
```
- Headless (no native GUI):
```zsh
NO_GUI=1 ./launch
```

Force run from source (use while developing)
- This runs `app.py` (uses `.venv` if present):
```zsh
USE_SOURCE=1 ./launch --port 8000
```

Direct packaged binary
- If you prefer to run the packaged executable directly:
```zsh
./dist/launcher         # GUI/native window (if supported on your machine)
NO_GUI=1 ./dist/launcher # headless
```

Run from source (manual)
- Activate venv (if present) and run `app.py` (waitress WSGI):
```zsh
source .venv/bin/activate
python3 app.py --mode waitress --port 8000
```
- Headless:
```zsh
source .venv/bin/activate
python3 app.py --mode waitress --no-gui --port 8000
```

Quick dev (dev server + migrations + open browser)
- Convenience script (development):
```zsh
./run_local.sh
```

Admin credentials (test account)
- Admin UI: `http://127.0.0.1:8000/admin/`
- Username: `admin`
- Password: `AdminPass123!`

How to check the server is up
```zsh
curl -I http://127.0.0.1:8000/
```
Expected response: `HTTP/1.1 200 OK`.

Stopping the server
- If you started a background process yourself and captured a PID file (examples used `/tmp/launcher.pid` or `/tmp/app8001.pid`), stop it with:
```zsh
kill <pid>
```
- Or find the process and kill it:
```zsh
pgrep -f runserver
pgrep -f waitress
kill <pid>
```

Notes
- The `./launch` script prefers `./dist/launcher` when present. Use `USE_SOURCE=1` to force running `app.py` from source.
- Native GUI windows require `pywebview` (already included in the packaged binary). If running from source, ensure `.venv` has `pywebview` installed to get a native window.
- Default port is `8000`. Override with `--port <port>`.

Where to look next
- Launcher script: `./launch`
- Unified launcher: `app.py`
- Packaged binary: `./dist/launcher`
- Dev convenience script: `./run_local.sh`

If you want, I can:
- Create a macOS `.app` bundle or zip `dist/launcher` for easy double-click distribution.
- Add this content to the repository's `README.md` (done) or a separate `RUNNING.md` with extra details.
