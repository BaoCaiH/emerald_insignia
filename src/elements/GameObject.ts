import { ISpritesheetData } from "pixi.js";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalSprite: ObjectSprite;
  isFocus: boolean;
  constructor(config: {
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    animationSpeed?: number;
    isFocused?: boolean;
  }) {
    this.internalDirection = config.currentAnimation || "idle";
    this.allowedDirections = ["idle", "left", "right", "up", "down"];
    this.isFocus = config.isFocused || false;
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
