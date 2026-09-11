# Blockly for Music Programming with Sonic Pi

A visual music programming environment that allows users to create Sonic Pi music using Blockly blocks.

Instead of writing Sonic Pi code manually, users can build music patterns visually and automatically execute the generated music.

---

# Features

- Visual music programming using Blockly
- Genre-based music blocks
- Sonic Pi code generation
- Automatic Sonic Pi execution
- Local helper communication using OSC

---

# System Overview

The system contains three parts:

Blockly Editor
|
|
Local Helper (Python)
|
|
Sonic Pi
|
|
Music Output

The local helper connects the browser application with Sonic Pi and allows generated music programs to run automatically.

---

# Requirements

Before running the project, install:

- Python 3.x
- Sonic Pi Desktop
- Visual Studio Code

Python packages:

pip install flask flask-cors python-osc

---

# Quick Start

## 1. Start Sonic Pi

Open Sonic Pi and run the receiver program.

(See docs/SETUP.md)

---

## 2. Start Local Helper

Open terminal:

cd local-helper

Run:

python helper.py

---

## 3. Start Website

Open:

index.html

using Live Server.

---

## 4. Create Music

1. Select genre
2. Add blocks
3. Click Generate Code
4. Music plays automatically

---

# Project Structure

project/

├── index.html
├── script.js
├── style.css
│
├── images/
│
└── local-helper/
└── helper.py

---

# Documentation

More detailed information:

- Architecture → docs/ARCHITECTURE.md
- Setup Guide → docs/SETUP.md
- Development Notes → docs/DEVELOPMENT.md

---

# Future Improvements

- More genres
- More music blocks
- Better live loop management
- Save/load projects
