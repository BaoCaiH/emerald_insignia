import { ISpritesheetData } from "pixi.js";
import Board from "../overworld/Board";
import { nextPosition } from "../../utils/coordinates";
import AnimatedGameObject from "./AnimatedGameObject";

class Character extends AnimatedGameObject {
  protected tweenRemaining: number;
  tweeningInstruction: Record<string, [string, number]>;
  protected traversalSpeed: number;
  protected remainingTraversalDistance: number;
  protected tweeningSpeed: number;
  constructor(config: {
    name?: string;
    x?: number;
    y?: number;
    board?: Board;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number> | undefined;
    currentAnimation?: string | undefined;
    animationSpeed?: number | undefined;
    tweeningSpeed?: number | undefined;
    traversalSpeed?: number | undefined;
  }) {
    super(config);
    this.tweeningSpeed = config.tweeningSpeed || 1;
    this.traversalSpeed = config.traversalSpeed || 30;
    this.remainingTraversalDistance = this.traversalSpeed;
    this.tweenRemaining = 0;
    this.tweeningInstruction = {
      left: ["x", -1],
      right: ["x", 1],
      up: ["y", -1],
      down: ["y", 1],
    };
  }

  // getters
  get speed() {
    return this.traversalSpeed;
  }

  get remainingSpeed() {
    return this.remainingTraversalDistance;
  }

  replenishSpeed() {
    this.remainingTraversalDistance = this.speed;
  }

  override update(state?: { arrow: string }) {
    if (this.tweenRemaining !== 0) {
      this.tweening();
      return;
    }
    if (state?.arrow && this.focus) {
      // console.log(this.remainingSpeed);

      this.startTweening(state.arrow);
      return;
    }
    this.changeDirection("idle");
  }

  protected startTweening(arrow: string) {
    this.changeDirection(arrow);
    if (this.attemptMoveSuccess()) {
      this.setDestination();
    }
  }

  protected setDestination() {
    this.tweenRemaining = 16;
    this.remainingTraversalDistance -= 5;
    this.board?.moveObstacle(this.x, this.y, this.direction);
  }

  protected changeDirection(arrow: string) {
    if (this.direction !== arrow) {
      this.direction = arrow;
      this.changeAnimation(this.direction);
    }
  }

  protected tweening() {
    if (this.tweenRemaining > 0 && this.direction !== "idle") {
      const [axis, instruction] = this.tweeningInstruction[this.direction];
      const movement = Math.min(this.tweeningSpeed, this.tweenRemaining);
      if (axis === "x") {
        this.internalSprite.x += instruction * movement;
      } else if (axis === "y") {
        this.internalSprite.y += instruction * movement;
      }
      this.tweenRemaining -= movement;
    }
  }

  protected attemptMoveSuccess() {
    const { x, y } = nextPosition(this.x, this.y, this.direction);
    return !this.board?.isOccupied(x, y) && this.remainingSpeed > 0;
  }
}

export default Character;
