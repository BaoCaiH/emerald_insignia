import { IPointData, ISpritesheetData } from "pixi.js";
import ObjectSprite from "./ObjectSprite";

class GameObject {
  x: number;
  y: number;
  sprite: ObjectSprite;
  constructor(config: {
    x: number;
    y: number;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, IPointData>;
    currentAnimation?: string;
    animationSpeed?: number;
  }) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new ObjectSprite(config);
  }
}

export default GameObject;
