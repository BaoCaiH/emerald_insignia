import { ISpritesheetData, IPointData } from "pixi.js";
import GameObject from "./GameObject";

class Characters extends GameObject {
  tweenRemaining: number;
  tweeningInstruction: Record<string, [string, number]>;
  constructor(config: {
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, IPointData> | undefined;
    currentAnimation?: string | undefined;
    animationSpeed?: number | undefined;
  }) {
    super(config);
    this.tweenRemaining = 48;
    this.tweeningInstruction = {
      left: ["x", -1],
      right: ["x", 1],
      up: ["y", -1],
      down: ["y", 1],
    };
  }

  override update() {
    this.tweening();
  }

  private tweening() {
    if (this.tweenRemaining > 0 && this.direction !== "idle") {
      const [axis, instruction] = this.tweeningInstruction[this.direction];
      if (axis === "x") {
        this.internalSprite.changeX(instruction);
      } else if (axis === "y") {
        this.internalSprite.changeY(instruction);
      }
      this.tweenRemaining += instruction;
    }
  }
}

export default Characters;
