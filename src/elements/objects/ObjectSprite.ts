import {
  AnimatedSprite,
  BaseTexture,
  ISpritesheetData,
  Spritesheet,
} from "pixi.js";

class ObjectSprite {
  spriteData: any;
  spritesheet: Spritesheet;
  textures;
  private internalCurrentAnimation: string;
  private internalAnimation: AnimatedSprite;
  constructor(config: {
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    spriteData: ISpritesheetData;
    animationSpeed?: number;
  }) {
    // Init
    this.spriteData = config.spriteData;
    this.spritesheet = new Spritesheet(
      BaseTexture.from(this.spriteData.meta.image),
      this.spriteData
    );
    this.internalCurrentAnimation = config.currentAnimation || "idle";

    // Setup animations
    this.spritesheet.parse();
    this.textures = this.spritesheet.animations;
    this.internalAnimation = new AnimatedSprite(
      this.textures[this.internalCurrentAnimation]
    );
    this.internalAnimation.anchor.set(
      config.anchorOverwrite?.x,
      config.anchorOverwrite?.y
    );
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
    return { x: this.x, y: this.y };
  }

  set position(destination: { x: number; y: number }) {
    this.x = destination.x;
    this.y = destination.y;
  }

  changeAnimation(animation: string) {
    if (
      animation !== this.internalCurrentAnimation &&
      Object.keys(this.textures).includes(animation)
    ) {
      this.internalCurrentAnimation = animation;
      this.animation.stop();
      this.updateAnimation();
      this.animation.play();
    }
  }

  private updateAnimation() {
    this.internalAnimation.textures =
      this.textures[this.internalCurrentAnimation];
  }
}

export default ObjectSprite;
