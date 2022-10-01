import { Sprite, settings, SCALE_MODES } from "pixi.js";

// Pixel rendering settings
settings.SCALE_MODE = SCALE_MODES.NEAREST;

const board: Sprite = Sprite.from("img/Map/00.png");
board.anchor.set(0);
board.x = 0;
board.y = -8;

export default board;
