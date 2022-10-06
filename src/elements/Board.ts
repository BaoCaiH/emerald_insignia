import { Sprite, Texture } from "pixi.js";
import { maps } from "./maps";
import {
  toGridCoordString,
  zipCoordToString,
  nextPosition,
} from "../utils/coordinates";

// console.log(fs.readFileSync);

class Board extends Sprite {
  collisions: { [x: string]: boolean };
  constructor(config: { mapPath: string; xOffset?: number; yOffset?: number }) {
    super();
    this.texture = Texture.from(config.mapPath);
    this.anchor.set(0);
    this.x = config.xOffset || 0;
    this.y = config.yOffset || 0;
    this.collisions = this.loadCollision(config.mapPath);
    console.log(this.collisions);
  }

  loadCollision(mapPath: string) {
    const collisionPath = `${mapPath.split(".")[0].split("/").at(-1)}`;
    return maps[collisionPath]["floorCollision"]
      .map(([x, y]) => {
        return { [toGridCoordString(x, y)]: true };
      })
      .reduce((prev, curr) => {
        const [key, value] = Object.entries(curr)[0];
        prev[key] = value;
        return prev;
      }, {});
  }

  isOccupied(x: number, y: number) {
    return this.collisions[zipCoordToString(x, y)] || false;
  }

  addObstacle(x: number, y: number) {
    this.collisions[zipCoordToString(x, y)] = true;
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
