import { ISpritesheetData } from "pixi.js";
import Board from "../overworld/Board";
import GameObject from "./GameObject";
import { nextPosition } from "../../utils/coordinates";

class Character extends GameObject {
  protected tweenRemaining: number;
  tweeningInstruction: Record<string, [string, number]>;
  protected moveSpeed: number;
  constructor(config: {
    name?: string;
    x: number;
    y: number;
    board: Board;
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
      left: ["x", -1],
      right: ["x", 1],
      up: ["y", -1],
      down: ["y", 1],
    };
  }

  override update(state?: { arrow: string }) {
    this.tweening();

    if (this.tweenRemaining === 0) {
      if (state?.arrow && this.isFocus) {
        this.startTweening(state.arrow);
      } else {
        this.changeDirection("idle");
      }
    }
  }

  protected startTweening(arrow: string) {
    if (this.direction !== arrow) {
      this.changeDirection(arrow);
    }
    if (this.attemptMoveSuccess(arrow)) {
      this.tweenRemaining = 16;
      this.board.moveObstacle(this.x, this.y, arrow);
    }
  }

  protected changeDirection(arrow: string) {
    if (this.direction !== arrow) {
      this.direction = arrow;
      this.changeAnimation(arrow);
    }
  }

  protected tweening() {
    if (this.tweenRemaining > 0 && this.direction !== "idle") {
      const [axis, instruction] = this.tweeningInstruction[this.direction];
      const movement = Math.min(this.moveSpeed, this.tweenRemaining);
      if (axis === "x") {
        this.internalSprite.x += instruction * movement;
      } else if (axis === "y") {
        this.internalSprite.y += instruction * movement;
      }
      this.tweenRemaining -= movement;
    }
  }

  protected attemptMoveSuccess(direction: string) {
    const { x, y } = nextPosition(this.x, this.y, direction);
    return !this.board.isOccupied(x, y);
  }
}

export default Character;
