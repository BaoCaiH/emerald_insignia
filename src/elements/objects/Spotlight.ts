import GameObject from "./GameObject";

/**
 * Spotlight is a holder class that Game keeps to know where to focus its viewport
 */
class Spotlight {
  gameObject?: GameObject;
  readonly screenWidth: number;
  readonly screenHeight: number;
  constructor(
    screenWidth: number,
    screenHeight: number,
    gameObject?: GameObject
  ) {
    this.gameObject = gameObject;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  setSpotlight(gameObject: GameObject) {
    this.gameObject = gameObject;
  }

  get position() {
    if (this.gameObject) {
      return { x: this.gameObject?.x, y: this.gameObject?.y };
    } else return { x: this.screenWidth / 2, y: this.screenHeight / 2 };
  }
}

export default Spotlight;
