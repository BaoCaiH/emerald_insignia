import { Application, settings, SCALE_MODES } from "pixi.js";
import board from "./elements/Board";
import Character from "./elements/Character";
import dataLyn from "./characters/Lyn/onMap.json";
import dataHector from "./characters/Hector/onMap.json";
import DirectionInput from "./inputs/DirectionInput";
import CharacterSelectionInput from "./inputs/CharacterSelectionInput";

// Pixel rendering settings
settings.SCALE_MODE = SCALE_MODES.NEAREST;

const gameContainer = document.getElementById("pixi-content");

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  width: gameContainer?.clientWidth,
  height: gameContainer?.clientHeight,
});

const input = new DirectionInput();
const charSelection = new CharacterSelectionInput();
charSelection.init();

// Load characters
const lyn = new Character({
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  spriteData: dataLyn,
  anchorOverwrite: { x: 0.5 },
  animationSpeed: 0.05,
  moveSpeed: 1,
});

const hector = new Character({
  x: app.screen.width / 2 + 16,
  y: app.screen.height / 2 + 32,
  spriteData: dataHector,
  anchorOverwrite: { x: 0.5 },
  animationSpeed: 0.05,
  moveSpeed: 1,
});

app.stage.addChild(board);
app.stage.addChild(lyn.animation);
app.stage.addChild(hector.animation);

// Add a ticker callback to move the sprite back and forth
// let elapsed = 0.0;
app.ticker.add(() => {
  // console.log(charSelection.selected);

  lyn.update({ arrow: input.direction });
  hector.update({ arrow: input.direction });
});
