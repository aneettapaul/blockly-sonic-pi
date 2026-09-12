# Setup Guide

This document explains how to install and run Blockly for Music Programming with Sonic Pi.

---

# Requirements

Install the following:

- Python 3.x
- Sonic Pi
- Visual Studio Code
- A modern web browser

---

# Install Python Dependencies

Open a terminal inside the project folder.

Navigate to the local helper:

cd local-helper

Install required packages:

pip install flask flask-cors python-osc

---

# Start Sonic Pi

1. Open Sonic Pi.
2. Run the OSC receiver program.
3. Keep Sonic Pi running while using the Blockly application.

The receiver waits for generated programs from the local helper.

---

# Start Local Helper

Open a terminal:

cd local-helper

Run:

python helper.py

When successful, the terminal will show:

Local Helper Started

The helper listens for generated Sonic Pi programs from the frontend.

---

# Start the Blockly Application

Open the project folder.

Run:

index.html

using Live Server in Visual Studio Code.

---

# Using the Application

1. Select a music genre.
2. Use the available Blockly blocks.
3. Load a starter program or create a custom pattern.
4. Click:

Generate Code

to view the generated Sonic Pi program.

5. Click:

Run Music

to send the program to Sonic Pi.

---

# Troubleshooting

## No sound from Sonic Pi

Check:

- Sonic Pi is running.
- The OSC receiver is active.
- The local helper is running.

---

## Local Helper Connection Error

Check:

- Flask server is running.
- Python dependencies are installed.
- Browser permissions allow communication with localhost.

---

## Generated Code Does Not Execute

Check:

- The generated Sonic Pi code is valid.
- The OSC receiver is running.
- The local helper terminal shows successful message transmission.

---

# Communication Flow

Blockly Application

HTTP Request

↓

Flask Local Helper

↓

OSC Message

↓

Sonic Pi Receiver

↓

Music Execution
