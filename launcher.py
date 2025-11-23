import subprocess
import sys
import time
import os
import shutil

# Lazy imports for optional packages (requests, webview) done inside functions

ROOT = os.path.dirname(__file__)
MANAGE = os.path.join(ROOT, 'college_app', 'manage.py')
PY = sys.executable
SERVER_URL = 'http://127.0.0.1:8000/'

def find_runserver_pids():
    """Return list of PIDs for an existing `manage.py runserver` process (may be empty)."""
    # Use pgrep -f to match the full command line
    pgrep = shutil.which('pgrep')
    if not pgrep:
        return []
    try:
        res = subprocess.run([pgrep, '-f', 'manage.py runserver'], capture_output=True, text=True)
        if res.returncode != 0 or not res.stdout.strip():
            return []
        # pgrep prints one pid per line
        pids = [int(x) for x in res.stdout.split() if x.strip().isdigit()]
        return pids
    except Exception:
        return []


def start_server():
    """Start Django dev server as subprocess and return the Popen object."""
    proc = subprocess.Popen([PY, MANAGE, 'runserver', '127.0.0.1:8000'], cwd=ROOT)
    return proc


def wait_for_server(timeout=30):
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(SERVER_URL, timeout=1)
            if r.status_code in (200, 404):
                return True
        except Exception:
            pass
        time.sleep(0.5)
    return False


if __name__ == '__main__':
    proc = None
    started_by_launcher = False
    try:
        existing = find_runserver_pids()
        if existing:
            print(f'Found existing runserver process(es): {existing}. Reusing.')
        else:
            proc = start_server()
            started_by_launcher = True
            print('Started new runserver (pid=%s)' % (proc.pid,))

        # Lazy import requests and webview so launcher can be inspected without them installed
        try:
            import requests  # type: ignore
        except Exception:
            requests = None

        try:
            import webview  # type: ignore
        except Exception:
            webview = None

        # Wait for server readiness (if requests is available)
        if requests is not None:
            ok = wait_for_server(30)
        else:
            ok = True

        if not ok:
            print('Server did not become ready in time. Check logs.')
        else:
            print('Server ready')
            if webview is not None and os.environ.get('NO_GUI', '') != '1':
                try:
                    print('Opening native window')
                    webview.create_window('College Life App', SERVER_URL)
                    webview.start()
                except Exception:
                    print('Failed to open webview window; please open %s in your browser' % SERVER_URL)
            else:
                print('GUI disabled or pywebview not installed — open %s in your browser' % SERVER_URL)
    finally:
        if started_by_launcher and proc:
            try:
                proc.terminate()
            except Exception:
                pass
