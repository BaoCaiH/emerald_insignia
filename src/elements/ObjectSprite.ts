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
  animationSpeed: number;
  animations: Record<string, AnimatedSprite>;
  private _currentAnimation: string;
  x: any;
  y: any;
  constructor(config: {
    anchorOverwrite?: Record<string, IPointData>;
    currentAnimation?: string;
    spriteData: ISpritesheetData;
    animationSpeed?: number;
    x: number;
    y: number;
  }) {
    // Init
    this.x = config.x;
    this.y = config.y;
    this.spriteData = config.spriteData;
    this.spritesheet = new Spritesheet(
      BaseTexture.from(this.spriteData.meta.image),
      this.spriteData
    );
    this.anchorOverwrite = config.anchorOverwrite;
    this.animationSpeed = config.animationSpeed || 1;
    this._currentAnimation = config.currentAnimation || "idle";
    // Setup animations
    this.spritesheet.parse();
    this.animations = this.loadAnimations();
  }

  loadAnimations() {
    return Object.entries(this.spritesheet.animations).reduce(
      (acc: Record<string, AnimatedSprite>, [key, animation]) => {
        const newAnimation = new AnimatedSprite(animation);
        newAnimation.animationSpeed = this.animationSpeed;
        acc[key] = newAnimation;
        return acc;
      },
      {}
    );
  }

  currentAnimation() {
    this.animations[this._currentAnimation].x = this.x;
    this.animations[this._currentAnimation].y = this.y;
    return this.animations[this._currentAnimation];
  }
}

export default ObjectSprite;
