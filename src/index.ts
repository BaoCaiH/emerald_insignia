import { settings, SCALE_MODES } from "pixi.js";
import Game from "./elements/overworld/Game";
import dataLyn from "./characters/Lyn/onMap.json";
import dataHector from "./characters/Hector/onMap.json";
import { toGridCoord } from "./utils/coordinates";

// Pixel rendering settings
settings.SCALE_MODE = SCALE_MODES.NEAREST;
const container = document.getElementById("pixi-content") as HTMLElement;
const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

// Create new game
const game = new Game({
  gameContainer: container,
  gameCanvas: canvas,
  startingView: toGridCoord(15, 3),
});

const boardConfigs = [
  { mapPath: "img/Map/01.png", mapOffset: { x: -8, y: -8 } },
];
const characterConfigs = [
  {
    name: "Lyn",
    initialPositions: toGridCoord(14, 3),
    spriteData: dataLyn,
    anchorOverwrite: { x: 0.5 },
    animationSpeed: 0.05,
    moveSpeed: 1,
  },
  {
    name: "Hector",
    initialPositions: toGridCoord(15, 4),
    spriteData: dataHector,
    anchorOverwrite: { x: 0.5 },
    animationSpeed: 0.05,
    moveSpeed: 1,
  },
];

game.setup({ boardConfigs: boardConfigs, characterConfigs: characterConfigs });

game.start();
