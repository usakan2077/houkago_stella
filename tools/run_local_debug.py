"""Serve the game on a dedicated loopback origin for debug play."""
import argparse
import functools
import http.server
from pathlib import Path
import webbrowser


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8885)
    parser.add_argument('--no-browser', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
    with http.server.ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
        url = f'http://127.0.0.1:{server.server_port}/index.html'
        print('Stella local debug: ' + url, flush=True)
        print('Stop: Ctrl+C. This origin has separate saves from the published game.', flush=True)
        if not args.no_browser:
            webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()
