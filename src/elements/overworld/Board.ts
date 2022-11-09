import { ISpritesheetData } from "pixi.js";
import {
  zipCoordToString,
  nextPosition,
  toGridCoordString,
} from "../../utils/coordinates";
import GameObject from "../objects/GameObject";

class Board extends GameObject {
  protected internalName: string;
  // protected map: Sprite;
  protected collisions: { [x: string]: boolean };
  startPoint: { x: number; y: number };
  constructor(config: {
    name: string;
    spriteData: ISpritesheetData;
    xOffset?: number;
    yOffset?: number;
    startPoint?: { x: number; y: number };
  }) {
    const { name, spriteData, xOffset, yOffset, startPoint } = config;
    super({
      name: name,
      spriteData: spriteData,
    });
    this.internalName = name;
    this.x = xOffset || 0;
    this.y = yOffset || 0;
    this.collisions = {};
    this.loadObstacles();
    this.startPoint = startPoint || { x: 0, y: 0 };
  }

  get sprite() {
    return this.internalSprite;
  }

  async loadObstacles() {
    const data = (await import(
      `../../maps/${this.name}/collisions.json`
    )) as Record<string, [number, number][]>;
    data["ground"].forEach(([x, y]) => {
      this.addObstacle(x, y, true);
    });
  }

  isOccupied(x: number, y: number) {
    return this.collisions[zipCoordToString(x, y)] || false;
  }

  addObstacle(x: number, y: number, translate = false) {
    if (translate) {
      this.collisions[toGridCoordString(x, y)] = true;
    } else {
      this.collisions[zipCoordToString(x, y)] = true;
    }
  }

  removeObstacle(x: number, y: number) {
    delete this.collisions[zipCoordToString(x, y)];
  }

  moveObstacle(xPast: number, yPast: number, direction: string) {
    const { x, y } = nextPosition(xPast, yPast, direction);
    this.removeObstacle(xPast, yPast);
    this.addObstacle(x, y);
  }
}

export default Board;
