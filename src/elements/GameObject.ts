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

  update(config?: object) {
    if (config) {
    }
  }

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
}

export default GameObject;
