# Setup Guide

## Requirements

Install:

- Python 3.x
- Sonic Pi Desktop
- Visual Studio Code

## Install Python packages

Open terminal:

pip install flask flask-cors python-osc

## Start Sonic Pi

1. Open Sonic Pi
2. Run the OSC receiver:

```ruby
live_loop :receiver do

  use_real_time

  code = sync "/osc*/sonic-code"

  puts code[0]

  in_thread do
    eval(code[0])
  end

end

Start Local Helper

Navigate:

cd local-helper

Run:

python helper.py

Expected:

Local Helper Started

Start Website

Open index.html using Live Server.

Usage
Select genre
Add blocks
Press Generate Code
Sonic Pi plays automatically
```
