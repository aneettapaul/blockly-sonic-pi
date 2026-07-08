// script.js

let workspace;

// Run everything after the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    defineMusicBlocks();

    workspace = Blockly.inject("blocklyDiv", {
        toolbox: document.getElementById("toolbox"),
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
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");

    technoButton.addEventListener("click", function () {
        selectGenre("techno");
    });

    houseButton.addEventListener("click", function () {
        selectGenre("house");
    });

    generateButton.addEventListener("click", function () {
        generateSonicPiCode();
    });

    copyButton.addEventListener("click", function () {
        copyGeneratedCode();
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
    document.body.classList.remove("techno-theme", "house-theme");

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
    }

    else if (genre === "house") {
        document.body.classList.add("house-theme");

        document.getElementById("houseButton").classList.add("active");

        selectedGenre.textContent = "House";
        recommendedBpm.textContent = "120–130";
        supportedBlocks.textContent = "House mode planned for final version";
        descriptionText.textContent = "House music usually has a warmer dance feeling, steady rhythm, claps, chords and groovy basslines.";
    }
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
}


// ==============================
// Code Generation
// ==============================

function generateSonicPiCode() {
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

        return `live_loop :bass do
  use_synth :tb303
  play :${note}
  sleep 1
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