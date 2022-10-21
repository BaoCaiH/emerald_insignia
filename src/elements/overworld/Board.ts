import { Sprite } from "pixi.js";
import {
  zipCoordToString,
  nextPosition,
  toGridCoordString,
} from "../../utils/coordinates";

class Board {
  protected internalName: string;
  protected map: Sprite;
  protected collisions: { [x: string]: boolean };
  startPoint: { x: number; y: number };
  constructor(config: {
    name: string;
    xOffset?: number;
    yOffset?: number;
    startPoint?: { x: number; y: number };
  }) {
    const { name, xOffset, yOffset, startPoint } = config;
    this.internalName = name;
    this.map = Sprite.from(`img/Map/${this.internalName}.png`);
    this.map.anchor.set(0);
    this.map.x = xOffset || 0;
    this.map.y = yOffset || 0;
    this.collisions = {};
    this.loadObstacles();
    this.startPoint = startPoint || { x: 0, y: 0 };
  }

  get name() {
    return this.internalName;
  }

  get x() {
    return this.map.x;
  }
  get y() {
    return this.map.y;
  }

  set x(coordinate: number) {
    this.map.x = coordinate;
  }
  set y(coordinate: number) {
    this.map.y = coordinate;
  }

  get sprite() {
    return this.map;
  }

  async loadObstacles() {
    const data = (await import(`../maps/${this.name}.json`)) as Record<
      string,
      [number, number][]
    >;
    data["floor"].forEach(([x, y]) => {
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
