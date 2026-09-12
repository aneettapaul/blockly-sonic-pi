# Test Cases and Evaluation Results

## Overview

The system was evaluated to verify that the main components work correctly, including genre selection, Blockly interaction, code generation, local helper communication, and Sonic Pi execution.

---

# Functional Test Cases

| Test ID | Feature                    | Test Description                                                  | Expected Result                                              | Result |
| ------- | -------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| T01     | Genre Selection            | User selects a music genre (Techno, House, Ambient, Experimental) | The corresponding Blockly toolbox is loaded                  | Passed |
| T02     | Dynamic Toolbox            | User changes between different genres                             | Only relevant blocks for the selected genre are displayed    | Passed |
| T03     | Starter Programs           | User clicks the starter program button                            | A predefined Blockly music structure is loaded automatically | Passed |
| T04     | Blockly Editing            | User adds, removes, or modifies music blocks                      | The Blockly workspace updates correctly                      | Passed |
| T05     | Code Generation            | User clicks Generate Code                                         | Blockly blocks are translated into Sonic Pi code             | Passed |
| T06     | Code Copying               | User clicks Copy Code                                             | Generated Sonic Pi code is copied successfully               | Passed |
| T07     | Local Helper Communication | User clicks Run Music                                             | Generated code is transferred to the local helper            | Passed |
| T08     | OSC Communication          | Local helper sends generated code to Sonic Pi                     | Sonic Pi receives the OSC message                            | Passed |
| T09     | Music Execution            | Sonic Pi receives a generated program                             | The music program is executed successfully                   | Passed |

---

# Usability Evaluation

The system was evaluated from a user interaction perspective.

## Observations

- Genre-based toolboxes reduce the number of available blocks shown to users.
- Starter programs help beginners create an initial music structure.
- Users can focus on musical concepts instead of manually writing Sonic Pi syntax.
- Automatic execution reduces the need for copying and pasting generated code.

---

# Performance Discussion

The local helper introduces an additional communication step between the Blockly application and Sonic Pi.

The workflow is:

Blockly Application  
↓  
HTTP Request  
↓  
Python Flask Local Helper  
↓  
OSC Communication  
↓  
Sonic Pi

The additional communication overhead is acceptable because the system focuses on generating and executing music programs rather than requiring real-time low-level performance control.

---

# Limitations

The current evaluation focuses on the implemented prototype.

Current limitations:

- Only selected Sonic Pi operations are represented as Blockly blocks.
- The complete Sonic Pi feature set is not covered.
- Execution depends on the local helper and Sonic Pi running on the user's machine.
- More complex live performance features require further development.
