import sys
import os
import argparse
import subprocess

def run_simple_server():
    """Run the website using Python's built-in HTTP server"""
    print("Starting simple HTTP server on port 8000...")
    import http.server
    import socketserver
    
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", 8000), handler) as httpd:
        print("Server started at http://localhost:8000")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

def run_flask_app():
    """Run the website using Flask"""
    print("Starting Flask server on port 8000...")
    try:
        # First check if Flask is installed
        import flask
        # Then execute the Flask app
        from app import app
        app.run(host='0.0.0.0', port=8000, debug=True)
    except ImportError:
        print("Flask is not installed. Installing required packages...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("Packages installed successfully. Starting Flask server...")
            from app import app
            app.run(host='0.0.0.0', port=8000, debug=True)
        except Exception as e:
            print(f"Error installing packages: {e}")
            print("Falling back to simple HTTP server...")
            run_simple_server()

def main():
    parser = argparse.ArgumentParser(description="Run the portfolio website server")
    parser.add_argument('--mode', choices=['simple', 'flask'], default='flask',
                        help='Server mode: simple (Python HTTP server) or flask (Flask app)')
    
    args = parser.parse_args()
    
    # Ensure we're in the website directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    if args.mode == 'simple':
        run_simple_server()
    else:
        run_flask_app()

if __name__ == "__main__":
    main() 