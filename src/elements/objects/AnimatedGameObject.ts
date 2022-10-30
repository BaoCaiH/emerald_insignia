import { AnimatedSprite, ISpritesheetData } from "pixi.js";
import Board from "../overworld/Board";
import GameObject from "./GameObject";

class AnimatedGameObject extends GameObject {
  protected internalDirection: string;
  protected allowedDirections: string[];
  protected internalAnimation: AnimatedSprite;
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
    const {
      name,
      spriteData,
      initialAnimation,
      anchorOverwrite,
      animationSpeed,
    } = config;
    super({
      name: name,
      spriteData: spriteData,
      anchorOverwrite: anchorOverwrite,
      initialSprite: initialAnimation,
    });
    this.allowedDirections = ["idle", "focus", "left", "right", "up", "down"];
    this.internalDirection = initialAnimation || this.allowedDirections[0];
    this.internalIsFocus = false;
    // Setup Sprite
    this.internalAnimation = this.internalSprite as AnimatedSprite;
    this.internalAnimation.animationSpeed = animationSpeed || 1;
    this.internalAnimation.play();
  }

  // Setups
  override setupSprite(config: { initialSprite?: string }) {
    if (config.initialSprite) {
      return new AnimatedSprite(this.textures[config.initialSprite]);
    } else {
      return new AnimatedSprite(Object.values(this.textures)[0]);
    }
  }

  // Start
  start() {
    this.animation.play();
  }

  // Update
  override update(state?: {}) {
    if (state) {
    }
  }

  // getters
  get animation() {
    return this.internalAnimation;
  }

  get board() {
    return this.internalBoard;
  }

  get focus() {
    return this.internalIsFocus;
  }

  get direction() {
    return this.internalDirection;
  }

  // setters

  set focus(flag: boolean) {
    this.internalIsFocus = flag;
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
    this.internalAnimation.textures = this.textures[animation];
  }

  protected set direction(direction: string) {
    if (this.allowedDirections.includes(direction)) {
      this.internalDirection = direction;
    }
  }
}

export default AnimatedGameObject;
