import { IPointData, ISpritesheetData } from "pixi.js";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalSprite: ObjectSprite;
  constructor(config: {
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, IPointData>;
    currentAnimation?: string;
    animationSpeed?: number;
  }) {
    this.internalDirection = config.currentAnimation || "idle";
    this.allowedDirections = ["idle", "left", "right", "up", "down"];
    this.internalSprite = new ObjectSprite(config);
  }

  get animation() {
    return this.internalSprite.animation;
  }

  update() {}

  protected changeAnimation(animation: string) {
    return this.internalSprite.changeAnimation(animation);
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

  get direction() {
    return this.internalDirection;
  }

  protected set direction(direction: string) {
    if (this.allowedDirections.includes(direction)) {
      this.internalDirection = direction;
    }
  }

  //   Moving
  move(destination: { x?: number; y?: number }) {
    const newX = destination.x || this.x;
    const newY = destination.y || this.y;
    if (newX > this.x && this.direction !== "right") {
      this._changeDirection("right");
    } else if (newX < this.x && this.direction !== "left") {
      this._changeDirection("left");
    }
    this.internalSprite.move(newX, newY);
  }

  _changeDirection(direction: string) {
    this.internalDirection = direction;
    this.changeAnimation(direction);
  }
}

export default GameObject;
