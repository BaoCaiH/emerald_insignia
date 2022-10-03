import { settings, SCALE_MODES } from "pixi.js";
import Game from "./elements/Game";
import dataLyn from "./characters/Lyn/onMap.json";
import dataHector from "./characters/Hector/onMap.json";

// Pixel rendering settings
settings.SCALE_MODE = SCALE_MODES.NEAREST;
const container = document.getElementById("pixi-content") as HTMLElement;
const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

// Create new game
const game = new Game({
  gameContainer: container,
  gameCanvas: canvas,
});

const boardConfigs = [{ mapPath: "img/Map/00.png", mapOffset: { y: -8 } }];
const characterConfigs = [
  {
    name: "Lyn",
    initialPositions: {
      x: game.screen.width / 2,
      y: game.screen.height / 2,
    },
    spriteData: dataLyn,
    anchorOverwrite: { x: 0.5 },
    animationSpeed: 0.05,
    moveSpeed: 1,
  },
  {
    name: "Hector",
    initialPositions: {
      x: game.screen.width / 2 + 16,
      y: game.screen.height / 2 + 32,
    },
    spriteData: dataHector,
    anchorOverwrite: { x: 0.5 },
    animationSpeed: 0.05,
    moveSpeed: 1,
  },
];

game.setup({ boardConfigs: boardConfigs, characterConfigs: characterConfigs });

game.start();
