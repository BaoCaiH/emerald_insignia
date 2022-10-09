import Board from "../overworld/Board";
import Character from "./Character";
import cursorData from "../../characters/cursor.json";

class Cursor extends Character {
  constructor(config: { x: number; y: number; board: Board }) {
    const { x, y, board } = config;
    super({
      name: "cursor",
      x: x,
      y: y,
      board: board,
      spriteData: cursorData,
      currentAnimation: "normal",
      animationSpeed: 0.05,
      moveSpeed: 3,
    });
    this.focus = true;
    this.animation.play();
  }

  protected override changeAnimation(_animation: string) {}

  protected override setDestination() {
    this.tweenRemaining = 16;
  }

  protected override attemptMoveSuccess() {
    return true;
  }
}

export default Cursor;
