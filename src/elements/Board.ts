import { Sprite, Texture } from "pixi.js";

class Board extends Sprite {
  constructor(config: { mapPath: string; xOffset?: number; yOffset?: number }) {
    super();
    this.texture = Texture.from(config.mapPath);
    this.anchor.set(0);
    this.x = config.xOffset || 0;
    this.y = config.yOffset || 0;
  }
}

export default Board;
