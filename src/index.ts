import { Application, settings, SCALE_MODES } from "pixi.js";
import board from "./elements/Board";
import Character from "./elements/Character";
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
const lyn = new Character({
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  spriteData: mcData,
  animationSpeed: 0.05,
  currentAnimation: "left",
});
console.log(lyn);

app.stage.addChild(board);
app.stage.addChild(lyn.animation);
// lyn.sprite.currentAnimation().play();

// Add a ticker callback to move the sprite back and forth
// let elapsed = 0.0;
app.ticker.add(() => {
  // elapsed += delta;
  // console.log(elapsed);

  // lyn.sprite().update(delta);

  // // console.log(lyn.sprite.currentAnimation().autoUpdate);
  // const newX = 1 * (120.0 + Math.cos(elapsed / 50.0) * 100.0);
  // // const currentX = lyn.x
  // // if (newX > currentX) {
  // //   lyn.changeAnimation("right")
  // // }
  // lyn.move({ x: newX });
  lyn.update();
});
