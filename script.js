// script.js

let workspace;

let currentSynth = "tb303";

// Run everything after the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    defineMusicBlocks();

    workspace = Blockly.inject("blocklyDiv", {
        toolbox: document.getElementById("technoToolbox").outerHTML,
        trashcan: true,
        scrollbars: true,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.9,
            maxScale: 1.5,
            minScale: 0.5,
            scaleSpeed: 1.1
        }
    });

    

    

    // Start with the normal music platform theme
    selectGenre("home");

    const technoButton = document.getElementById("technoButton");
    const houseButton = document.getElementById("houseButton");
    const ambientButton = document.getElementById("ambientButton");
    const experimentalButton =document.getElementById("experimentalButton");
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");

    technoButton.addEventListener("click", function () {
        selectGenre("techno");
    });

    houseButton.addEventListener("click", function () {
        selectGenre("house");
    });
    
    ambientButton.addEventListener("click", function () {
        selectGenre("ambient");
    });

    if (experimentalButton) {
        experimentalButton.addEventListener("click", function () {
            selectGenre("experimental");
        });
    }

    generateButton.addEventListener("click", function () {
        generateSonicPiCode();
    });

    copyButton.addEventListener("click", function () {
        copyGeneratedCode();
    });

    

    // Starter Program buttons
    document.getElementById("technoStarter").addEventListener("click", function () {
        loadStarterProgram("techno");
    });

    document.getElementById("houseStarter").addEventListener("click", function () {
        loadStarterProgram("house");
    });

    document.getElementById("ambientStarter").addEventListener("click", function () {
        loadStarterProgram("ambient");
    });

    document.getElementById("experimentalStarter").addEventListener("click", function () {
        loadStarterProgram("experimental");
    });

});

    



// ==============================
// Genre Selection
// ==============================

function selectGenre(genre) {
    const selectedGenre = document.getElementById("selectedGenre");
    const recommendedBpm = document.getElementById("recommendedBpm");
    const supportedBlocks = document.getElementById("supportedBlocks");
    const descriptionText = document.getElementById("descriptionText");

    // Remove old theme classes
    document.body.classList.remove(
        "techno-theme",
        "house-theme",
        "ambient-theme",
        "experimental-theme"
    );

    // Remove active style from all genre buttons
    const genreButtons = document.querySelectorAll(".genre-card");
    genreButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    if (genre === "home") {
        selectedGenre.textContent = "None";
        recommendedBpm.textContent = "Choose a genre";
        supportedBlocks.textContent = "Choose a genre first";
        descriptionText.textContent = "Start by selecting a music style. The page theme and available music idea will change based on the selected genre.";
    }

    else if (genre === "techno") {
        document.body.classList.add("techno-theme");

        document.getElementById("technoButton").classList.add("active");

        selectedGenre.textContent = "Techno";
        recommendedBpm.textContent = "140–170";
        supportedBlocks.textContent = "BPM, Kick, Hi-hat, Bass";
        descriptionText.textContent = "Techno uses repeated kick drums, hi-hats, bass loops and a dark club-style sound.";
        switchBlocklyToolbox("techno");
    }

    else if (genre === "house") {
        document.body.classList.add("house-theme");

        document.getElementById("houseButton").classList.add("active");
        

        selectedGenre.textContent = "House";
        recommendedBpm.textContent = "120–130";
        supportedBlocks.textContent = "BPM, Kick, Clap, Chord";
        descriptionText.textContent = "House music usually has a warmer dance feeling, steady rhythm, claps, chords and groovy basslines.";

        switchBlocklyToolbox("house");
    }

    else if (genre === "ambient") {
    document.body.classList.add("ambient-theme");
    document.getElementById("ambientButton").classList.add("active");

    selectedGenre.textContent = "Ambient";
    recommendedBpm.textContent = "60–90";
    supportedBlocks.textContent = "BPM, Synth, Pad, Notes";

    descriptionText.textContent =
        "Ambient music uses slower tempos, sustained synth sounds, soft notes and atmospheric textures.";

    switchBlocklyToolbox("ambient");
    
    }

    else if (genre === "experimental") {
    document.body.classList.add("experimental-theme");
    document.getElementById("experimentalButton").classList.add("active");

    selectedGenre.textContent = "Experimental";
    recommendedBpm.textContent = "80–140";
    supportedBlocks.textContent =
        "BPM, Synth, Notes, Random Rhythm, Effects";

    descriptionText.textContent =
        "Experimental music uses unpredictable notes, irregular rhythms, different synths and effects.";

    switchBlocklyToolbox("experimental");
    
    }
}

// ==============================
// Starter Programs
// ==============================
function loadStarterProgram(genre) {
    workspace.clear();

    selectGenre(genre);

    const starterBlocks = {
        techno: [
            ["set_bpm", { BPM: 150 }],
            ["use_synth", { SYNTH: "tb303" }],
            ["kick_loop", {}],
            ["hihat_loop", { SLEEP: 0.5 }],
            ["bass_loop", { NOTE: "e2" }]
        ],

        house: [
            ["set_bpm", { BPM: 125 }],
            ["use_synth", { SYNTH: "prophet" }],
            ["house_kick_loop", {}],
            ["clap_loop", {}],
            ["minor7_chord_loop", {}]
        ],

        ambient: [
            ["set_bpm", { BPM: 75 }],
            ["use_synth", { SYNTH: "prophet" }],
            ["ambient_pad_loop", {}],
            ["ambient_note_loop", { NOTE: "c4" }]
        ],

        experimental: [
            ["set_bpm", { BPM: 120 }],
            ["use_synth", { SYNTH: "fm" }],
            ["random_note", {}],
            ["experimental_rhythm", {}]
        ]
    };

    const blocks = starterBlocks[genre];

    let previousBlock = null;

    blocks.forEach(function (blockData, index) {
        const block = workspace.newBlock(blockData[0]);

        const fields = blockData[1];

        Object.keys(fields).forEach(function (fieldName) {
            block.setFieldValue(fields[fieldName], fieldName);
        });

        block.initSvg();
        block.render();

        block.moveBy(40, 40 + index * 90);

        if (previousBlock !== null) {
            previousBlock.nextConnection.connect(block.previousConnection);
        }

        previousBlock = block;
    });

    
}


// ==============================
// Blockly Block Definitions
// ==============================

function defineMusicBlocks() {

    Blockly.Blocks["set_bpm"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("set BPM")
                .appendField(new Blockly.FieldNumber(150, 60, 220, 1), "BPM");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip("Set the tempo of the Sonic Pi song.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["use_synth"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("use synth")
                .appendField(new Blockly.FieldDropdown([
                ["TB303", "tb303"],
                ["Prophet", "prophet"],
                ["FM", "fm"],
                ["Pulse", "pulse"],
                ["Saw", "saw"]
                ]), "SYNTH");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(210);
            this.setTooltip("Choose the synthesizer for Sonic Pi.");
            this.setHelpUrl("");
        }
    };


    Blockly.Blocks["kick_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("hard techno kick loop");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(15);
            this.setTooltip("Creates a repeated techno kick drum loop.");
            this.setHelpUrl("");
        }
    };


    Blockly.Blocks["hihat_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("hi-hat every")
                .appendField(new Blockly.FieldNumber(0.5, 0.25, 4, 0.25), "SLEEP")
                .appendField("beats");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(45);
            this.setTooltip("Creates a repeated closed hi-hat loop.");
            this.setHelpUrl("");
        }
    };


    Blockly.Blocks["bass_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("bass loop note")
                .appendField(new Blockly.FieldDropdown([
                    ["E2", "e2"],
                    ["F2", "f2"],
                    ["G2", "g2"],
                    ["A2", "a2"],
                    ["C3", "c3"]
                ]), "NOTE");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(260);
            this.setTooltip("Creates a simple acid-style bass loop.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["house_kick_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("house kick loop");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(30);
            this.setTooltip("Creates a steady four-on-the-floor house kick.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["clap_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("clap every 2 beats");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(60);
            this.setTooltip("Creates a regular house clap rhythm.");
            this.setHelpUrl("");
        }
    };


    Blockly.Blocks["minor7_chord_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("minor 7 chord loop");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Creates a repeating minor seventh chord.");
            this.setHelpUrl("");
    
        }
    };


    Blockly.Blocks["ambient_pad_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ambient pad loop");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(280);

            this.setTooltip("Creates a slow atmospheric ambient pad loop.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["ambient_note_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ambient note")
                .appendField(new Blockly.FieldDropdown([
                    ["C4", "c4"],
                    ["D4", "d4"],
                    ["E4", "e4"],
                    ["G4", "g4"],
                    ["A4", "a4"]
                ]), "NOTE");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(290);

            this.setTooltip("Creates a slow repeating ambient note.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["play_note"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("play note")
                .appendField(new Blockly.FieldDropdown([
                    ["C4", "c4"],
                    ["D4", "d4"],
                    ["E4", "e4"],
                    ["G4", "g4"],
                    ["A4", "a4"]
                ]), "NOTE");

            this.appendDummyInput()
                .appendField("sleep")
                .appendField(
                    new Blockly.FieldNumber(1, 0.25, 8, 0.25),
                    "SLEEP"
                )
                .appendField("beats");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(200);

            this.setTooltip(
                "Plays one note for a finite amount of time."
            );

            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["repeat_music"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("repeat")
                .appendField(
                    new Blockly.FieldNumber(4, 1, 16, 1),
                    "TIMES"
                )
                .appendField("times");

            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("do");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);

            this.setTooltip("Repeat the music blocks inside this block.");
            this.setHelpUrl("");
            }
    };

    Blockly.Blocks["reverb_effect"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("add reverb");

            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("effect");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(160);

            this.setTooltip("Adds a reverb effect to the music blocks inside.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["random_note"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("random experimental note");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(330);

            this.setTooltip("Plays a randomly selected note.");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["experimental_rhythm"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("experimental rhythm");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(350);

            this.setTooltip("Creates an irregular rhythmic pattern.");
            this.setHelpUrl("");
        }
    };
}

function switchBlocklyToolbox(genre) {

    if (genre === "techno") {
        const toolbox = document.getElementById("technoToolbox");
        workspace.updateToolbox(toolbox.outerHTML);
    }

    if (genre === "house") {
        const toolbox = document.getElementById("houseToolbox");
        workspace.updateToolbox(toolbox.outerHTML);
    }

    if (genre === "ambient") {
        const toolbox = document.getElementById("ambientToolbox");
        workspace.updateToolbox(toolbox.outerHTML);
    }

    if (genre === "experimental") {
        const toolbox = document.getElementById("experimentalToolbox");

        if (toolbox) {
            workspace.updateToolbox(toolbox.outerHTML);
        }
    }
}


// ==============================
// Code Generation
// ==============================

function generateSonicPiCode() {
    currentSynth = "tb303";
    let generatedCode = "";

    const topBlocks = workspace.getTopBlocks(true);

    topBlocks.forEach(function (block) {
        generatedCode += generateCodeFromBlockStack(block);
    });

    if (generatedCode.trim() === "") {
        generatedCode = "// Drag some music blocks into the workspace first.";
    }

    document.getElementById("output").textContent = generatedCode;
}


// This function follows connected blocks from top to bottom
function generateCodeFromBlockStack(block) {
    let code = "";
    let currentBlock = block;

    while (currentBlock !== null) {
        code += generateCodeForBlock(currentBlock);
        currentBlock = currentBlock.getNextBlock();
    }

    return code;
}


// This function creates Sonic Pi code for one block
function generateCodeForBlock(block) {
    const blockType = block.type;

    if (blockType === "set_bpm") {
        const bpm = block.getFieldValue("BPM");

        return `use_bpm ${bpm}\n\n`;
    }

    if (blockType === "use_synth") {
        currentSynth = block.getFieldValue("SYNTH");
        console.log("Selected synth:", currentSynth);
        return "";
    }

    if (blockType === "kick_loop") {
        return `live_loop :kick do
  sample :bd_haus
  sleep 1
end

`;
    }

    if (blockType === "hihat_loop") {
        const sleepValue = block.getFieldValue("SLEEP");

        return `live_loop :hihat do
  sample :drum_cymbal_closed
  sleep ${sleepValue}
end

`;
    }

    if (blockType === "bass_loop") {
        const note = block.getFieldValue("NOTE");

        console.log("Bass uses:", currentSynth);

        return `live_loop :bass do
  use_synth :${currentSynth}
  play :${note}
  sleep 1
end

`;
    }

    if (blockType === "house_kick_loop") {
        return `live_loop :house_kick do
      sample :bd_haus
      sleep 1
    end

    `;
    }


    if (blockType === "clap_loop") {
        return `live_loop :clap do
      sleep 1
      sample :perc_snap
      sleep 1
    end

    `;
    }


    if (blockType === "minor7_chord_loop") {
        return `live_loop :chords do
      use_synth :${currentSynth}
      play_chord chord(:e3, :minor7)
      sleep 2
    end

    `;
    }

    if (blockType === "ambient_pad_loop") {
        return `live_loop :ambient_pad do
      with_fx :reverb, room: 1, mix: 0.7 do
        use_synth :${currentSynth}
        play_chord chord(:e3, :minor7)

      end
      sleep 4
    end

    `;
    }

    if (blockType === "ambient_note_loop") {
        const note = block.getFieldValue("NOTE");

        return `live_loop :ambient_note do
      with_fx :reverb, room: 1, mix: 0.6 do
        use_synth :${currentSynth}
        play :${note}, release: 2
     
      end
      sleep 4
    end

    `;
    }

    if (blockType === "repeat_music") {
        const times = block.getFieldValue("TIMES");
        const insideBlock = block.getInputTargetBlock("DO");

        let insideCode = "";

        if (insideBlock !== null) {
            insideCode = generateCodeFromBlockStack(insideBlock);
        }

        return `${times}.times do
    ${insideCode}end

    `;
    }

    if (blockType === "reverb_effect") {
        const insideBlock = block.getInputTargetBlock("DO");

        let insideCode = "";

        if (insideBlock !== null) {
            insideCode = generateCodeFromBlockStack(insideBlock);
        }

        return `with_fx :reverb, room: 1, mix: 0.7 do
    ${insideCode}end

    `;
    }

    if (blockType === "play_note") {
        const note = block.getFieldValue("NOTE");
        const sleepValue = block.getFieldValue("SLEEP");

        return `play :${note}
    sleep ${sleepValue}

    `;
    }

    if (blockType === "random_note") {
        return `use_synth :${currentSynth}
    play choose([:c4, :d4, :e4, :g4, :a4])
    sleep 0.5

    `;
    }

    if (blockType === "experimental_rhythm") {
        return `live_loop :experimental_rhythm do
      sample :bd_haus
      sleep choose([0.25, 0.5, 0.75, 1])
      sample :drum_cymbal_closed
      sleep choose([0.25, 0.5, 1])
    end

    `;
    }

    return "";
}


// ==============================
// Copy Button
// ==============================

function copyGeneratedCode() {
    const outputBox = document.getElementById("output");
    const copyButton = document.getElementById("copyButton");

    const codeText = outputBox.textContent;

    navigator.clipboard.writeText(codeText).then(function () {
        copyButton.textContent = "Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1000);
    }).catch(function () {
        copyButton.textContent = "Copy failed";

        setTimeout(function () {
            copyButton.textContent = "Copy Code";
        }, 1000);
    });
}