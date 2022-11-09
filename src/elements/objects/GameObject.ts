import {
  ISpritesheetData,
  Sprite,
  Spritesheet,
  BaseTexture,
  Texture,
  Resource,
} from "pixi.js";
import Board from "../overworld/Board";

class GameObject {
  name: string;
  protected internalSprite: Sprite;
  protected textures: Record<string, Texture<Resource>[]>;
  protected internalBoard?: Board;
  constructor(config: {
    name?: string;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    initialSprite?: string;
  }) {
    const { name, anchorOverwrite } = config;
    this.name = name || "unknown";
    const spritesheet = this.loadSpritesheet(config);
    spritesheet.parse();
    this.textures = spritesheet.animations;
    this.internalSprite = this.setupSprite(config);
    this.internalSprite.anchor.set(anchorOverwrite?.x, anchorOverwrite?.y);
  }

  // Setups
  loadSpritesheet(config: {
    spriteData: any; // ISpritesheetData but Interface missing image
  }) {
    return new Spritesheet(
      BaseTexture.from(config.spriteData.meta.image),
      config.spriteData
    );
  }

  setupSprite(config: { initialSprite?: string }) {
    if (config.initialSprite) {
      return new Sprite(this.textures[config.initialSprite][0]);
    } else {
      return new Sprite(Object.values(this.textures)[0][0]);
    }
  }

  update(state?: {}) {
    if (state) {
    }
  }

  addToBoard(board: Board, position?: { x: number; y: number }) {
    this.internalBoard = board;
    if (position) {
      this.position = position;
    }
    this.board?.addObstacle(this.x, this.y);
  }

  removeFromBoard() {
    this.internalBoard = undefined;
  }

  get x() {
    return this.internalSprite.x;
  }
  set x(xDest: number) {
    this.internalSprite.x = xDest;
  }
  get y() {
    return this.internalSprite.y;
  }
  set y(yDest: number) {
    this.internalSprite.y = yDest;
  }

  get board() {
    return this.internalBoard;
  }

  get position() {
    return this.internalSprite.position;
  }

  set position(destination: { x: number; y: number }) {
    this.internalSprite.position = destination;
  }
}

export default GameObject;
