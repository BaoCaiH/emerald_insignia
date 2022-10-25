import { ISpritesheetData } from "pixi.js";
import Board from "../overworld/Board";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  name: string;
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalSprite: ObjectSprite;
  protected internalIsFocus: boolean;
  protected internalBoard?: Board;
  constructor(config: {
    name?: string;
    board?: Board;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    initialAnimation?: string;
    animationSpeed?: number;
  }) {
    this.name = config.name || "unknown";
    this.internalDirection = config.initialAnimation || "idle";
    this.allowedDirections = ["idle", "focus", "left", "right", "up", "down"];
    this.internalIsFocus = false;
    this.internalSprite = new ObjectSprite(config);
  }

  get animation() {
    return this.internalSprite.animation;
  }

  get board() {
    return this.internalBoard;
  }

  addToBoard(board: Board, position?: { x: number; y: number }) {
    this.internalBoard = board;
    if (position) {
      this.position = position;
    }
    this.board?.addObstacle(this.x, this.y);
  }

  removeFromBoard() {
    this.internalBoard = undefined;
  }

  update(state?: {}) {
    if (state) {
    }
  }

  playAnimation() {
    this.animation.play();
  }
  stopAnimation() {
    this.animation.gotoAndStop(0);
  }
  restartAnimation() {
    this.animation.gotoAndPlay(0);
  }

  changeAnimation(animation: string) {
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

  get position() {
    return this.internalSprite.position;
  }

  set position(destination: { x: number; y: number }) {
    this.internalSprite.position = destination;
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
