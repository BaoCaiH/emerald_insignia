import { ISpritesheetData, Sprite } from "pixi.js";
import {
  zipCoordToString,
  nextPosition,
  toGridCoordString,
} from "../../utils/coordinates";
import CharacterGroup from "../groups/CharacterGroup";
import Character from "../objects/Character";
import Cursor from "../objects/Cursor";

class Board {
  protected internalName: string;
  protected map: Sprite;
  protected characters: CharacterGroup;
  protected collisions: { [x: string]: boolean };
  cursor: Cursor;
  constructor(config: {
    name: string;
    xOffset?: number;
    yOffset?: number;
    characters?: Character[];
    startPoint?: { x: number; y: number };
  }) {
    const { name, xOffset, yOffset, characters, startPoint } = config;
    this.internalName = name;
    this.map = Sprite.from(`img/Map/${this.internalName}.png`);
    this.map.anchor.set(0);
    this.map.x = xOffset || 0;
    this.map.y = yOffset || 0;
    this.characters = new CharacterGroup("players", characters);
    this.collisions = {};
    this.loadObstacles();
    this.cursor = new Cursor({
      x: startPoint?.x || 0,
      y: startPoint?.y || 0,
      board: this,
    });
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

  get players() {
    return this.characters;
  }

  get spotlight() {
    return { x: this.cursor.x, y: this.cursor.y };
  }

  addCharacter(characterConfig: {
    name: string;
    initialPositions: { x: number; y: number };
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    animationSpeed?: number;
    moveSpeed?: number;
  }) {
    const {
      name,
      initialPositions,
      spriteData,
      anchorOverwrite,
      currentAnimation,
      animationSpeed,
      moveSpeed,
    } = characterConfig;
    const newChar = new Character({
      name: name,
      x: initialPositions.x,
      y: initialPositions.y,
      board: this,
      spriteData: spriteData,
      anchorOverwrite: anchorOverwrite,
      currentAnimation: currentAnimation,
      animationSpeed: animationSpeed,
      moveSpeed: moveSpeed,
    });
    this.characters.addCharacter(newChar);
    return newChar;
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

  getObjectAt(x: number, y: number) {
    const objectFilter = this.players.characters.filter((character) => {
      return character.x === x && character.y === y;
    });
    if (objectFilter.length > 0) {
      return objectFilter[0];
    }
    return null;
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

  update(state: { arrow: string }) {
    this.players.update(state);
    this.cursor.update(state);
  }
}

export default Board;
