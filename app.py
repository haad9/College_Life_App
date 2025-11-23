#!/usr/bin/env python3
"""Unified launcher for the project.

Usage examples:
  # Dev mode: spawn Django dev server and open native window
  python3 app.py --mode dev

  # Waitress mode: run WSGI server (recommended for packaging) and open native window
  python3 app.py --mode waitress

  # Headless (no native window)
  python3 app.py --mode waitress --no-gui

Options:
  --mode {dev,waitress}  Which server to run (default: waitress)
  --port PORT            Port to serve on (default: 8000)
  --no-gui               Do not open a native window; just start server

This script is safe to run locally. If a server is already listening on the
requested port it will detect that and try to reuse it.
"""

import argparse
import subprocess
import sys
import time
import os
import socket
from threading import Thread


def is_port_open(port, host="127.0.0.1"):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.settimeout(0.5)
            s.connect((host, port))
            return True
        except Exception:
            return False


def wait_for_server(port, timeout=30, host="127.0.0.1"):
    start = time.time()
    while time.time() - start < timeout:
        if is_port_open(port, host=host):
            return True
        time.sleep(0.2)
    return False


def run_dev_server(port):
    """Start Django dev server as subprocess."""
    PY = sys.executable
    MANAGE = os.path.join(os.path.dirname(__file__), "college_app", "manage.py")
    env = os.environ.copy()
    proc = subprocess.Popen([PY, MANAGE, "runserver", f"127.0.0.1:{port}"], cwd=os.path.dirname(__file__), env=env)
    return proc


def run_waitress(port):
    """Run the Django WSGI app with waitress in current process (threaded)."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "college_app.settings")
    # Ensure the Django project package directory is on sys.path so
    # `import college_app.settings` can be resolved. The project layout
    # places the Django package under ./college_app/college_app, so add
    # ./college_app to sys.path when this script runs from the repo root.
    root = os.path.dirname(__file__)
    project_package_path = os.path.join(root, "college_app")
    if project_package_path not in sys.path:
        sys.path.insert(0, project_package_path)
    try:
        from django.core.wsgi import get_wsgi_application
    except Exception as e:
        print("Could not import Django WSGI application:", e)
        return None

    application = get_wsgi_application()

    def _serve():
        try:
            from waitress import serve
        except Exception as e:
            print("Please install waitress: pip install waitress")
            raise
        serve(application, host="127.0.0.1", port=port)

    t = Thread(target=_serve, daemon=True)
    t.start()
    return t


def open_native_window(url):
    try:
        import webview
    except Exception:
        webview = None
    if webview is None:
        # fallback to opening the default browser
        import webbrowser
        webbrowser.open(url)
        return

    webview.create_window("College Life App", url)
    webview.start()


def main():
    parser = argparse.ArgumentParser(description="Launch the local app with optional native window")
    parser.add_argument("--mode", choices=["dev", "waitress"], default="waitress")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-gui", action="store_true")
    args = parser.parse_args()

    port = args.port
    url = f"http://127.0.0.1:{port}/"

    # If port already open, reuse it
    if is_port_open(port):
        print(f"Port {port} already in use; assuming server is running. Open {url} to use it.")
    else:
        if args.mode == "dev":
            print(f"Starting Django dev server on {port}...")
            proc = run_dev_server(port)
            # wait for server readiness
            ok = wait_for_server(port, timeout=30)
            if not ok:
                print("Dev server did not become ready in time. Check logs.")
                sys.exit(1)
            # keep subprocess object so we can optionally wait/terminate
            background_proc = proc
        else:
            print(f"Starting waitress WSGI server on {port}...")
            thread = run_waitress(port)
            ok = wait_for_server(port, timeout=30)
            if not ok:
                print("WSGI server did not become ready in time. Check logs.")
                sys.exit(1)

    print(f"Server ready at {url}")

    if not args.no_gui:
        open_native_window(url)
    else:
        print("NO GUI mode; server running. Open the URL in your browser to use the app.")
        try:
            # Keep the process alive so the server thread/process continues running.
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("Shutting down (received KeyboardInterrupt)")


if __name__ == "__main__":
    main()
