/* =====================================================
   Blockly Music Programming System
===================================================== */

let workspace;

let selectedGenre = "techno";

/* =====================================================
   GENRE INFORMATION DATA
===================================================== */

const genreData = {
  techno: {
    description:
      "High energy electronic music with strong kicks, basslines and repetitive rhythms.",

    bpm: "140–170",

    blocks: "BPM, Synth, Hard Kick Pattern, Bassline, Hi-hat, Build-up Effect",
  },

  house: {
    description:
      "Dance music style based on groove, four-on-the-floor rhythm and chord patterns.",

    bpm: "120–130",

    blocks: "BPM, Synth, Four-on-the-floor Kick, Clap Groove, Chords, Bass",
  },

  ambient: {
    description:
      "Atmospheric music focused on sound textures, pads and slow evolving melodies.",

    bpm: "60–100",

    blocks: "BPM, Synth, Pad Layer, Texture, Slow Melody, Reverb",
  },

  experimental: {
    description:
      "Creative sound exploration using randomness, unusual rhythms and effects.",

    bpm: "Flexible",

    blocks: "BPM, Synth, Random Rhythm, Random Notes, Effects, Noise Texture",
  },
};

/* =====================================================
   STARTER PROGRAMS
===================================================== */

const starterPrograms = {
  techno: [
    {
      type: "set_bpm",

      fields: {
        BPM: 150,
      },
    },

    {
      type: "use_synth",

      fields: {
        SYNTH: "tb303",
      },
    },

    {
      type: "hard_kick_pattern",
    },

    {
      type: "industrial_hihat",
    },

    {
      type: "techno_bassline",
    },

    {
      type: "techno_build_up",
    },
  ],

  house: [
    {
      type: "set_bpm",

      fields: {
        BPM: 125,
      },
    },

    {
      type: "use_synth",

      fields: {
        SYNTH: "prophet",
      },
    },

    {
      type: "four_floor_kick",
    },

    {
      type: "house_clap_groove",
    },

    {
      type: "house_chord_progression",
    },

    {
      type: "groove_bass",
    },
  ],

  ambient: [
    {
      type: "set_bpm",

      fields: {
        BPM: 80,
      },
    },

    {
      type: "use_synth",

      fields: {
        SYNTH: "hollow",
      },
    },

    {
      type: "pad_layer",
    },

    {
      type: "ambient_texture",
    },

    {
      type: "slow_melody",
    },

    {
      type: "reverb_space",
    },
  ],

  experimental: [
    {
      type: "set_bpm",

      fields: {
        BPM: 100,
      },
    },

    {
      type: "use_synth",

      fields: {
        SYNTH: "mod_fm",
      },
    },

    {
      type: "random_rhythm",
    },

    {
      type: "random_notes",
    },

    {
      type: "effect_chain",
    },

    {
      type: "noise_texture",
    },
  ],
};

/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initializeBlockly();

  setupGenreButtons();

  setupStarterButton();

  updateGenreInformation("techno");
});

/* =====================================================
   GENRE BUTTON EVENTS
===================================================== */

function setupGenreButtons() {
  const buttons = document.querySelectorAll(".genre-card");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const genre = this.id.replace("Button", "");

      selectedGenre = genre;

      updateGenreInformation(genre);

      changeTheme(genre);

      switchBlocklyToolbox(genre);

      setActiveGenreButton(this);

      updateStarterButton(genre);
    });
  });
}

function setActiveGenreButton(active) {
  document.querySelectorAll(".genre-card").forEach((button) => {
    button.classList.remove("active");
  });

  active.classList.add("active");
}

/* =====================================================
   UPDATE GENRE INFORMATION CARD
===================================================== */

function updateGenreInformation(genre) {
  const data = genreData[genre];

  document.getElementById("descriptionText").textContent = data.description;

  document.getElementById("selectedGenre").textContent =
    genre.charAt(0).toUpperCase() + genre.slice(1);

  document.getElementById("recommendedBpm").textContent = data.bpm;

  document.getElementById("supportedBlocks").textContent = data.blocks;
}

function updateStarterButton(genre) {
  const button = document.getElementById("starterButton");

  if (!button) {
    return;
  }

  const name = genre.charAt(0).toUpperCase() + genre.slice(1);

  button.textContent = "Load " + name + " Starter";
}

/* =====================================================
   THEME SWITCHING
===================================================== */

function changeTheme(genre) {
  document.body.classList.remove(
    "techno-theme",

    "house-theme",

    "ambient-theme",

    "experimental-theme",
  );

  document.body.classList.add(genre + "-theme");
}

/* =====================================================
   STARTER BUTTON
===================================================== */

function setupStarterButton() {
  const button = document.getElementById("starterButton");

  if (!button) return;

  button.addEventListener("click", function () {
    if (workspace) {
      loadStarterProgram(selectedGenre);
    }
  });
}

/* =====================================================
   INITIALIZE BLOCKLY
===================================================== */

function initializeBlockly() {
  // First create all custom blocks
  defineMusicBlocks();

  // Then create Blockly workspace once
  workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("technoToolbox"),

    theme: Blockly.Themes.Dark,

    scrollbars: true,

    trashcan: true,

    zoom: {
      controls: true,
      wheel: false,
      startScale: 1,
      maxScale: 2,
      minScale: 0.5,
    },
  });
}

/* =====================================================
   BLOCK DEFINITIONS
===================================================== */

function defineMusicBlocks() {
  /* ==========================
       SHARED BLOCKS
    ========================== */

  Blockly.Blocks["set_bpm"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Set BPM")

        .appendField(new Blockly.FieldNumber(120, 60, 180, 1), "BPM");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#4CAF50");
    },
  };

  Blockly.Blocks["use_synth"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Use Synth")

        .appendField(
          new Blockly.FieldDropdown([
            ["Beep", "beep"],
            ["TB-303 Bass", "tb303"],
            ["Prophet", "prophet"],
            ["Hollow", "hollow"],
            ["FM Synth", "mod_fm"],
            ["Piano", "piano"],
            ["Blade", "blade"],
          ]),
          "SYNTH",
        );

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#673AB7");
    },
  };

  Blockly.Blocks["play_note"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Play Note")

        .appendField(
          new Blockly.FieldDropdown([
            ["C4", "c4"],
            ["D4", "d4"],
            ["E4", "e4"],
            ["F4", "f4"],
            ["G4", "g4"],
            ["A4", "a4"],
            ["C5", "c5"],
          ]),
          "NOTE",
        );

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#2196F3");
    },
  };

  Blockly.Blocks["repeat_music"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Repeat Music");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#009688");
    },
  };

  Blockly.Blocks["reverb_effect"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Add Reverb Effect");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#9C27B0");
    },
  };

  Blockly.Blocks["play_sample"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Play Sample")
        .appendField(
          new Blockly.FieldDropdown([
            ["Techno Kick", "bd_tek"],
            ["House Kick", "bd_haus"],
            ["Heavy Kick", "bd_boom"],
            ["Clap", "perc_snap"],
            ["Hi Hat", "drum_cymbal_closed"],
            ["Ambient Texture", "ambi_soft_buzz"],
          ]),
          "SAMPLE",
        );

      this.setPreviousStatement(true);
      this.setNextStatement(true);

      this.setColour("#9C27B0");
    },
  };

  /* ==========================
       TECHNO BLOCKS
    ========================== */

  Blockly.Blocks["hard_kick_pattern"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Hard Kick Pattern");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#ff3b3b");
    },
  };

  Blockly.Blocks["techno_bassline"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Techno Bassline");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#ff3b3b");
    },
  };

  Blockly.Blocks["industrial_hihat"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Industrial Hi-hat");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#ff3b3b");
    },
  };

  Blockly.Blocks["techno_build_up"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Techno Build-up Effect");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#ff3b3b");
    },
  };

  /* ==========================
       HOUSE BLOCKS
    ========================== */

  Blockly.Blocks["four_floor_kick"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Four-on-the-floor Kick");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f97316");
    },
  };

  Blockly.Blocks["house_clap_groove"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("House Clap Groove");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f97316");
    },
  };

  Blockly.Blocks["house_chord_progression"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("House Chord Progression");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f97316");
    },
  };

  Blockly.Blocks["groove_bass"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Groove Bass");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f97316");
    },
  };

  /* ==========================
       AMBIENT BLOCKS
    ========================== */

  Blockly.Blocks["pad_layer"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Pad Layer");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#67e8f9");
    },
  };

  Blockly.Blocks["ambient_texture"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Atmospheric Texture");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#67e8f9");
    },
  };

  Blockly.Blocks["slow_melody"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Slow Melody");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#67e8f9");
    },
  };

  Blockly.Blocks["reverb_space"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Reverb Space");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#67e8f9");
    },
  };

  /* ==========================
       EXPERIMENTAL BLOCKS
    ========================== */

  Blockly.Blocks["random_rhythm"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Random Rhythm");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f472b6");
    },
  };

  Blockly.Blocks["random_notes"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Random Notes");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f472b6");
    },
  };

  Blockly.Blocks["effect_chain"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Experimental Effect Chain");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f472b6");
    },
  };

  Blockly.Blocks["noise_texture"] = {
    init: function () {
      this.appendDummyInput()

        .appendField("Noise Texture");

      this.setPreviousStatement(true);

      this.setNextStatement(true);

      this.setColour("#f472b6");
    },
  };
}

/* =====================================================
   SWITCH BLOCKLY TOOLBOX
===================================================== */

function switchBlocklyToolbox(genre) {
  const toolbox = document.getElementById(genre + "Toolbox");

  if (!toolbox || !workspace) {
    console.log("Toolbox missing:", genre);
    return;
  }

  // Change toolbox
  workspace.updateToolbox(toolbox);

  console.log("Loaded toolbox:", genre);
}

/* =====================================================
   LOAD STARTER PROGRAM
===================================================== */

function loadStarterProgram(genre) {
  workspace.clear();

  let blocks = starterPrograms[genre];

  let previousBlock = null;

  blocks.forEach((blockData) => {
    let block = workspace.newBlock(blockData.type);

    if (blockData.fields) {
      Object.keys(blockData.fields).forEach((field) => {
        block.setFieldValue(blockData.fields[field], field);
      });
    }

    block.initSvg();
    block.render();

    // connect blocks vertically
    if (previousBlock) {
      previousBlock.nextConnection.connect(block.previousConnection);
    }

    previousBlock = block;
  });
}

/* =====================================================
   GENERATE CODE BUTTON
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generateButton");

  if (generateButton) {
    generateButton.addEventListener("click", function (event) {
      event.preventDefault();

      let code = generateWorkspaceCode();

      document.getElementById("output").textContent = code;

      sendCodeToHelper(code);
    });
  }
});

function sendCodeToHelper(code) {
  fetch("http://127.0.0.1:5000/receive-code", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      code: code,
    }),
  })
    .then((response) => {
      console.log("Response received");
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
/* =====================================================
   GENERATE WORKSPACE CODE
===================================================== */
function generateWorkspaceCode() {
  let code = "";

  let blocks = workspace.getTopBlocks(true);

  blocks.forEach((block) => {
    let currentBlock = block;

    while (currentBlock) {
      code += generateCodeForBlock(currentBlock);

      currentBlock = currentBlock.getNextBlock();
    }
  });

  return code;
}

/* =====================================================
   SONIC PI CODE GENERATOR
===================================================== */

function generateCodeForBlock(block) {
  let blockType = block.type;

  /* ==========================
       BASIC BLOCKS
    ========================== */

  if (blockType === "set_bpm") {
    let bpm = block.getFieldValue("BPM");

    return `use_bpm ${bpm}\n\n`;
  }

  if (blockType === "use_synth") {
    let synth = block.getFieldValue("SYNTH");

    return `use_synth :${synth}\n\n`;
  }

  if (blockType === "play_note") {
    let note = block.getFieldValue("NOTE");

    return `play :${note}\n\n`;
  }

  if (blockType === "play_sample") {
    let sample = block.getFieldValue("SAMPLE");

    return `sample :${sample}\n\n`;
  }
  if (blockType === "repeat_music") {
    return `

live_loop :music do

  # repeated music

end


`;
  }

  if (blockType === "reverb_effect") {
    return `

with_fx :reverb do

end


`;
  }

  /* ==========================
       TECHNO GENERATORS
    ========================== */

  if (blockType === "hard_kick_pattern") {
    return `

live_loop :hard_kick do

  sample :bd_haus

  sleep 0.5

end


`;
  }

  if (blockType === "techno_bassline") {
    return `

live_loop :techno_bass do

  use_synth :tb303

  play :e2

  sleep 0.5

end


`;
  }

  if (blockType === "industrial_hihat") {
    return `

live_loop :industrial_hat do

  sample :drum_cymbal_closed

  sleep 0.25

end


`;
  }

  if (blockType === "techno_build_up") {
    return `

with_fx :reverb do

  play_pattern_timed [

  :c4,:e4,:g4,:c5

  ],

  [0.25]

end


`;
  }

  /* ==========================
       HOUSE GENERATORS
    ========================== */

  if (blockType === "four_floor_kick") {
    return `

live_loop :house_kick do

  sample :bd_haus

  sleep 1

end


`;
  }

  if (blockType === "house_clap_groove") {
    return `

live_loop :house_clap do

  sample :perc_snap

  sleep 1

end


`;
  }

  if (blockType === "house_chord_progression") {
    return `

live_loop :house_chords do

  play_chord [

  :c4,:e4,:g4

  ]

  sleep 2

end


`;
  }

  if (blockType === "groove_bass") {
    return `

live_loop :house_bass do

  use_synth :bass_foundation

  play :c2

  sleep 0.5

end


`;
  }

  /* ==========================
       AMBIENT GENERATORS
    ========================== */

  if (blockType === "pad_layer") {
    return `

live_loop :ambient_pad do

  use_synth :hollow

  play :c4

  sleep 4

end


`;
  }

  if (blockType === "ambient_texture") {
    return `

live_loop :texture do

  sample :ambi_soft_buzz

  sleep 8

end


`;
  }

  if (blockType === "slow_melody") {
    return `

live_loop :slow_melody do

  play_pattern_timed [

  :c4,:e4,:g4

  ],

  [2,2,4]

end


`;
  }

  if (blockType === "reverb_space") {
    return `

with_fx :reverb,

room: 1 do

end


`;
  }

  /* ==========================
       EXPERIMENTAL GENERATORS
    ========================== */

  if (blockType === "random_rhythm") {
    return `

live_loop :random_rhythm do

  sample :bd_haus

  sleep [0.25,0.5,1].choose

end


`;
  }

  if (blockType === "random_notes") {
    return `

live_loop :random_notes do

  play scale(:c4,:minor).choose

  sleep 0.5

end


`;
  }

  if (blockType === "effect_chain") {
    return `

with_fx :echo do

  with_fx :reverb do

  end

end


`;
  }

  if (blockType === "noise_texture") {
    return `

live_loop :noise do

  sample :vinyl_hiss

  sleep 8

end


`;
  }

  return "";
}

/* =====================================================
   COPY CODE BUTTON
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.getElementById("copyButton");

  if (copyButton) {
    copyButton.addEventListener("click", function () {
      let code = document.getElementById("output").textContent;

      navigator.clipboard.writeText(code);
    });
  }
});
