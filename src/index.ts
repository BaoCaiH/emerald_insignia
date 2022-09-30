import { Application, Sprite, settings, SCALE_MODES } from "pixi.js";
import board from "./elements/Board";

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

const mainCharacter: Sprite = Sprite.from("img/Characters/Lyn/idle/00.png");
mainCharacter.anchor.set(0.5);
mainCharacter.x = app.screen.width / 2;
mainCharacter.y = app.screen.height / 2;

app.stage.addChild(board);
app.stage.addChild(mainCharacter);
