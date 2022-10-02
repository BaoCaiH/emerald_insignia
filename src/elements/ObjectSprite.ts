import {
  AnimatedSprite,
  BaseTexture,
  IPointData,
  ISpritesheetData,
  Spritesheet,
} from "pixi.js";

class ObjectSprite {
  spriteData: any;
  spritesheet: Spritesheet;
  anchorOverwrite?: Record<string, IPointData>;
  textures;
  private internalCurrentAnimation: string;
  private internalAnimation: AnimatedSprite;
  constructor(config: {
    anchorOverwrite?: Record<string, IPointData>;
    currentAnimation?: string;
    spriteData: ISpritesheetData;
    animationSpeed?: number;
    x: number;
    y: number;
  }) {
    // Init
    this.spriteData = config.spriteData;
    this.spritesheet = new Spritesheet(
      BaseTexture.from(this.spriteData.meta.image),
      this.spriteData
    );
    this.anchorOverwrite = config.anchorOverwrite;
    this.internalCurrentAnimation = config.currentAnimation || "idle";

    // Setup animations
    this.spritesheet.parse();
    this.textures = this.spritesheet.animations;
    this.internalAnimation = new AnimatedSprite(
      this.textures[this.internalCurrentAnimation]
    );
    this.position = [config.x, config.y];
    this.internalAnimation.animationSpeed = config.animationSpeed || 1;
    this.internalAnimation.play();
  }

  get animation() {
    return this.internalAnimation;
  }

  get x() {
    return this.internalAnimation.x;
  }

  set x(xDest: number) {
    this.internalAnimation.x = xDest;
  }

  get y() {
    return this.internalAnimation.y;
  }

  set y(yDest: number) {
    this.internalAnimation.y = yDest;
  }

  get position() {
    return [this.x, this.y];
  }

  set position([xDest, yDest]) {
    this.x = xDest;
    this.y = yDest;
  }

  changeAnimation(animation: string) {
    if (
      animation !== this.internalCurrentAnimation &&
      Object.keys(this.textures).includes(animation)
    ) {
      this.internalCurrentAnimation = animation;
      this._updateAnimation();
      return true;
    }
    return false;
  }

  _updateAnimation() {
    this.internalAnimation.stop();
    this.internalAnimation.textures =
      this.textures[this.internalCurrentAnimation];
    this.internalAnimation.play();
  }

  move(x: number, y: number) {
    this.internalAnimation.x = x;
    this.internalAnimation.y = y;
  }
}

export default ObjectSprite;
