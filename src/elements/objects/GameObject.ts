import { ISpritesheetData } from "pixi.js";
import Board from "../overworld/Board";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  internalName: string;
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalSprite: ObjectSprite;
  protected internalIsFocus: boolean;
  protected internalBoard: Board;
  constructor(config: {
    name?: string;
    x: number;
    y: number;
    board: Board;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    initialAnimation?: string;
    animationSpeed?: number;
  }) {
    this.internalName = config.name || "unknown";
    this.internalDirection = config.initialAnimation || "idle";
    this.allowedDirections = ["idle", "focus", "left", "right", "up", "down"];
    this.internalIsFocus = false;
    this.internalSprite = new ObjectSprite(config);
    this.internalBoard = config.board;
    this.board.addObstacle(this.x, this.y);
  }

  get animation() {
    return this.internalSprite.animation;
  }

  get board() {
    return this.internalBoard;
  }

  update(state?: {}) {
    if (state) {
    }
  }

  playAnimation() {
    this.animation.play();
  }
  stopAnimation() {
    this.animation.stop();
  }
  restartAnimation() {
    this.animation.gotoAndPlay(0);
  }

  protected changeAnimation(animation: string) {
    this.internalSprite.changeAnimation(animation);
  }

  get focus() {
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
