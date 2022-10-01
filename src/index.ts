import { Application, settings, SCALE_MODES } from "pixi.js";
import board from "./elements/Board";
import GameObject from "./elements/GameObject";
import mcData from "./characters/Lyn/on_map.json";

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

// Load characters
const lyn = new GameObject({
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  spriteData: mcData,
  animationSpeed: 0.05,
});
console.log(lyn);

app.stage.addChild(board);
app.stage.addChild(lyn.sprite.currentAnimation());
lyn.sprite.currentAnimation().play();
