# Blockly for Music Programming (Sonic Pi)

## Overview

Blockly for Music Programming is a visual music programming environment that allows users to create Sonic Pi music programs using Blockly-based blocks.

Instead of manually writing Sonic Pi code, users can build musical patterns visually by selecting genres, using genre-specific blocks, and generating Sonic Pi programs automatically.

The project combines a Blockly-based visual DSL, Sonic Pi code generation, and a local helper communication layer to provide a smoother music programming workflow.

---

# Features

## Visual Music Programming

Users can create music programs using visual Blockly blocks instead of writing Sonic Pi syntax manually.

## Genre-Based DSL

The system provides genre-specific programming environments:

- Techno
- House
- Ambient
- Experimental

Each genre provides relevant blocks and reduces unnecessary complexity.

## Starter Programs

Predefined starter programs allow users to quickly explore different music styles and understand how blocks can be combined.

## Sonic Pi Code Generation

Blockly structures are translated into executable Sonic Pi code automatically.

## Local Helper Communication

A Python Flask-based local helper connects the browser application with Sonic Pi.

The helper receives generated code and communicates with Sonic Pi using OSC.

## Automatic Music Execution

Generated programs can be transferred directly to Sonic Pi and executed without manually copying code.

---

# System Workflow

User

↓

Blockly Web Interface

↓

Blockly Code Generator

↓

Local Helper (Python Flask)

↓

OSC Communication

↓

Sonic Pi

↓

Audio Output

---

# Technologies Used

## Frontend

- HTML
- CSS
- JavaScript
- Blockly

## Backend Communication

- Python
- Flask
- Flask-CORS
- python-osc

## Music Environment

- Sonic Pi

---

# Project Structure

Blockly-Sonic-Pi/

│
├── index.html
├── script.js
├── style.css
│
├── images/
│
├── local-helper/
│ └── helper.py
│
├── README.md
└── SETUP.md

---

# Running the Project

For installation and execution instructions, see:

[SETUP.md](SETUP.md)

---

# Future Improvements

Possible improvements include:

- More genre-specific blocks
- Additional music samples and effects
- Improved live loop management
- Saving and loading Blockly projects
- Enhanced real-time music control

---

# Authors

Aneetta Paul  
Chandini Bhattula
