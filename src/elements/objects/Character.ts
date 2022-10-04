import { ISpritesheetData } from "pixi.js";
import GameObject from "./GameObject";

class Character extends GameObject {
  protected tweenRemaining: number;
  tweeningInstruction: Record<string, [string, number]>;
  protected moveSpeed: number;
  constructor(config: {
    name?: string;
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number> | undefined;
    currentAnimation?: string | undefined;
    animationSpeed?: number | undefined;
    moveSpeed?: number | undefined;
  }) {
    super(config);
    this.moveSpeed = config.moveSpeed || 1;
    this.tweenRemaining = 0;
    this.tweeningInstruction = {
      left: ["x", -this.moveSpeed],
      right: ["x", this.moveSpeed],
      up: ["y", -this.moveSpeed],
      down: ["y", this.moveSpeed],
    };
  }

  override update(config?: { arrow: string; deltaTime: number }) {
    this.tweening();

    if (this.tweenRemaining === 0) {
      if (config?.arrow && this.isFocus) {
        this.startTweening(config.arrow);
      } else {
        this.changeDirection("idle");
      }
    }
    super.update(config);
  }

  private startTweening(arrow: string) {
    if (this.direction !== arrow) {
      this.changeDirection(arrow);
    }
    this.tweenRemaining = 16;
  }

  private changeDirection(arrow: string) {
    if (this.direction !== arrow) {
      this.direction = arrow;
      this.changeAnimation(arrow);
    }
  }

  private tweening() {
    if (this.tweenRemaining > 0 && this.direction !== "idle") {
      const [axis, instruction] = this.tweeningInstruction[this.direction];
      if (axis === "x") {
        this.internalSprite.x += instruction;
      } else if (axis === "y") {
        this.internalSprite.y += instruction;
      }
      this.tweenRemaining -= this.moveSpeed;
    }
  }
}

export default Character;
