# Blockly for Music Programming with Sonic Pi

This project is a visual music programming website that uses **Blockly** to generate **Sonic Pi** code.

The main idea is to make music programming more beginner-friendly by allowing users to build music patterns with visual blocks instead of writing Sonic Pi code manually.

## Project Idea

The website works as a small visual DSL for Sonic Pi..

Users can choose a music genre, drag music blocks into the Blockly workspace, and generate executable Sonic Pi code from those blocks.

For the current prototype, the main supported genre is **Techno**.

## Current Features

* Genre selection interface
* Techno-inspired visual theme
* Blockly workspace for music blocks
* Custom Blockly blocks:

  * Set BPM
  * Kick Loop
  * Hi-hat Loop
  * Bass Loop
* Sonic Pi code generation
* Copy generated code button
* Basic responsive layout

## Supported Genre

### Techno

The Techno mode includes blocks for creating a simple techno-style Sonic Pi pattern.

**Recommended BPM range:**

```text
140–170
```

**Supported blocks:**

```text
BPM, Kick, Hi-hat, Bass
```

**Example generated Sonic Pi code:**

```ruby
use_bpm 150

live_loop :kick do
  sample :bd_haus
  sleep 1
end

live_loop :hihat do
  sample :drum_cymbal_closed
  sleep 0.5
end

live_loop :bass do
  use_synth :tb303
  play :e2
  sleep 1
end
```

## Technologies Used

* HTML
* CSS
* JavaScript
* Blockly
* Sonic Pi

## Project Structure

```text
project-folder/
│
├── index.html
├── style.css
├── script.js
│
└── images/
    └── techno-bg.webp
```

## How to Run the Project

1. Download or clone the project folder.
2. Open the folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The project will open in the browser.

The page should show the music platform interface with genre selection, Blockly workspace, and generated Sonic Pi code output.

## How to Use

1. Open the website.
2. Select a genre, for example **Techno**.
3. Drag music blocks into the Blockly workspace.
4. Click **Generate Code**.
5. Copy the generated Sonic Pi code.
6. Paste the code into Sonic Pi and run it.

## Current Limitations

* Only the Techno genre is currently implemented.
* House, Ambient, and Experimental modes are planned for future versions.
* The generated Sonic Pi code is currently copied manually into Sonic Pi.
* Direct execution in Sonic Pi is not implemented yet.

## Future Improvements

* Add more genre-specific Blockly toolboxes.
* Add House, Ambient, and Experimental modes.
* Add more customizable music blocks.
* Add effects such as reverb, distortion, filters, and build-up/drop blocks.
* Improve the generated Sonic Pi code structure.
* Explore direct Sonic Pi execution using OSC, CLI, or a local helper tool.
* Add save/load functionality for Blockly projects.
* Improve the visual design and user experience.

## Project Status

This is an early prototype version created for demonstrating the concept of a genre-based Blockly DSL for Sonic Pi music programming.

## Team Notes

Before starting work, pull the latest changes:

```bash
git pull
```

After making changes:

```bash
git add .
git commit -m "Describe the change"
git push
```

