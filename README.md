# Portfolio Website

A modern, responsive portfolio website with interactive elements and animations.

## Features

- Responsive design for all devices
- Interactive UI elements with animations
- Custom cursor and scrolling effects
- Dynamic content loading
- Contact form functionality

## Running the Website

There are multiple ways to run this website:

### Option 1: Using the run.py script (Recommended)

```bash
# Change to the website directory
cd website

# Run with Flask (default)
python run.py

# OR run with simple HTTP server
python run.py --mode simple
```

### Option 2: Using Flask directly

```bash
# Change to the website directory
cd website

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
```

### Option 3: Using Python's built-in HTTP server

```bash
# Change to the website directory
cd website

# Start the server
python -m http.server
```

After starting the server, visit http://localhost:8000 in your web browser.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Python (for server)
- Flask (for enhanced server capabilities)

## Project Structure

```
website/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   └── ...
├── index.html
├── app.py            # Flask application
├── run.py            # Run script with multiple server options
├── requirements.txt  # Python dependencies
└── README.md         # This file
```

## Contact Form

The contact form is set up with a Flask backend that can be extended to:
- Send emails
- Store messages in a database
- Integrate with third-party services

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for stock images (if used)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 