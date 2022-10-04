import { ISpritesheetData } from "pixi.js";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  internalName: string;
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalSprite: ObjectSprite;
  protected internalIsFocus: boolean;
  constructor(config: {
    name?: string;
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    animationSpeed?: number;
  }) {
    this.internalName = config.name || "unknown";
    this.internalDirection = config.currentAnimation || "idle";
    this.allowedDirections = ["idle", "focus", "left", "right", "up", "down"];
    this.internalIsFocus = false;
    this.internalSprite = new ObjectSprite(config);
  }

  get animation() {
    return this.internalSprite.animation;
  }

  update(config?: { deltaTime: number }) {
    if (config?.deltaTime) {
      this.animation.update(config.deltaTime);
    }
  }

  playAnimation() {
    this.internalSprite.play();
  }
  stopAnimation() {
    this.internalSprite.stop();
  }
  restartAnimation() {
    this.internalSprite.restart();
  }

  protected changeAnimation(animation: string) {
    this.internalSprite.changeAnimation(animation);
  }

  get isFocus() {
    return this.internalIsFocus;
  }

  set focus(flag: boolean) {
    this.internalIsFocus = flag;
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
