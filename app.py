from flask import Flask, render_template, send_from_directory, request, jsonify
import os
import random

def print_logo():
    """Print an ASCII art logo when the app starts."""
    logo = """
    ╔══════════════════════════════════════════╗
    ║     _    ____    ____                    ║
    ║    / \  |  _ \  |  _ \  _____   __      ║
    ║   / _ \ | |_) | | | | |/ _ \ \ / /      ║
    ║  / ___ \|  _ <  | |_| |  __/\ V /       ║
    ║ /_/   \_\_| \_\ |____/ \___| \_/        ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
    🚀 AR Dev Server Starting... Happy coding! 🎮
    """
    print(logo)

# Initialize Flask application
app = Flask(__name__, static_folder='.', template_folder='.')

@app.route('/')
def index():
    """Serve the home page (index.html)."""
    return send_from_directory('.', 'index.html')

@app.route('/favicon.ico')
def favicon():
    """Serve the favicon."""
    return send_from_directory('.', 'favicon.ico')

@app.route('/<path:path>')
def static_files(path):
    """Serve static files from the current directory."""
    return send_from_directory('.', path)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    """Handle contact form submissions via POST request."""
    data = request.get_json()  # Get the JSON data from the request
    name = data.get('name', 'Anonymous')  # Default to 'Anonymous' if no name is provided
    email = data.get('email', 'No email provided')
    message = data.get('message', 'No message provided')
    
    # Log the received message (this could be extended to save to a database or send an email)
    print(f"Message received from {name} ({email}): {message}")
    
    # Respond with a success message in JSON format
    return jsonify({
        'success': True,
        'message': 'Message received! Thank you for contacting me.'
    })

@app.route('/about')
def about():
    """Serve the 'About Me' page."""
    return render_template('about.html')

@app.route('/easteregg')
def easter_egg():
    """Return a random fun fact when visiting the secret endpoint."""
    facts = [
        "The first computer bug was an actual bug!",
        "The first computer mouse was made of wood.",
        "Python was named after Monty Python.",
        "The first programmer was a woman - Ada Lovelace."
    ]
    return jsonify({'fact': random.choice(facts)})

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors with a custom error message."""
    return render_template('404.html', message="Oops! The page you're looking for doesn't exist."), 404

if __name__ == '__main__':
    print_logo()
    
    # Set the port from the environment variable or default to 8000
    port = int(os.environ.get('PORT', 8000))
    
    # Run the Flask app in debug mode for development
    app.run(host='0.0.0.0', port=port, debug=True)
