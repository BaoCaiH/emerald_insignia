import Board from "../overworld/Board";
import Character from "./Character";
import cursorData from "../../characters/cursor.json";

class Cursor extends Character {
  snapOn?: Character;
  constructor(config: { x: number; y: number; board: Board }) {
    const { x, y, board } = config;
    super({
      name: "cursor",
      x: x,
      y: y,
      board: board,
      spriteData: cursorData,
      anchorOverwrite: { x: 0.5 },
      currentAnimation: "normal",
      animationSpeed: 0.05,
      moveSpeed: 2,
    });
    this.focus = true;
    this.animation.play();
  }

  override update(state?: { arrow: string }) {
    if (this.snapOn) {
      this.x = this.snapOn.x;
      this.y = this.snapOn.y;
      return;
    }
    super.update(state);
  }

  selectCharacter(character: Character) {
    this.snapOn = character;
    this.snapOn.focus = true;
    this.stopAnimation();
  }

  releaseCharacter() {
    if (this.snapOn) {
      this.snapOn.focus = false;
      this.snapOn = undefined;
      this.restartAnimation();
    }
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
