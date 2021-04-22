
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright
from pathlib import Path

# from signal import signal, SIGPIPE, SIG_DFL
# signal(SIGPIPE, SIG_DFL)
def start_server(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    try:
        print("Start server:", server_address)
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

def capture(file_path: Path):
    with sync_playwright() as playwright:
        print(f'{file_path=}')
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.goto(f'http://0.0.0.0:8000/{str(file_path)}')
        page.screenshot(path=f'images/{file_path.stem}.png')
        # ---------------------
        context.close()
        browser.close()


if __name__ == '__main__':
    file_path = Path('assets/ATZ17TB010-0918_11.0/ATZ17TB010-0918_11.0.html')
    print(file_path.stem)
    t1 = threading.Thread(target=start_server)
    t2 = threading.Thread(target=capture, args=(file_path,))
    t1.setDaemon(True)
    t1.start()
    t2.start()
    print('started')
    # t1.join()
