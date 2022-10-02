import { Application, settings, SCALE_MODES } from "pixi.js";
import board from "./elements/Board";
import Character from "./elements/Character";
import mcData from "./characters/Lyn/on_map.json";
import DirectionInput from "./utils/DirectionInput";

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

// Load characters
const lyn = new Character({
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  spriteData: mcData,
  animationSpeed: 0.05,
  moveSpeed: 2,
});

app.stage.addChild(board);
app.stage.addChild(lyn.animation);

// Add a ticker callback to move the sprite back and forth
// let elapsed = 0.0;
app.ticker.add(() => {
  // elapsed += delta;
  lyn.update({ arrow: input.direction });
});
