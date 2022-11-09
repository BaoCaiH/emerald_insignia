import { Application, ISpritesheetData } from "pixi.js";
import DirectionInput from "../../inputs/DirectionInput";
import Board from "./Board";
import Character from "../objects/Character";
import ABInput from "../../inputs/ABInput";
import Cursor from "../objects/Cursor";

class Game {
  gameContainer: HTMLElement;
  application: Application;
  inputs: {
    directional: DirectionInput;
    abControl: ABInput;
  };
  boards: Record<string, Board>;
  characters: Record<string, Character>;
  cursor: Cursor;
  currentBoard?: string;
  gameMode: string;
  constructor(config: {
    gameContainer: HTMLElement;
    gameCanvas: HTMLCanvasElement;
    gameMode?: string;
    startingView?: { x: number; y: number };
  }) {
    // Setup barebone
    const { gameContainer, gameCanvas, gameMode, startingView } = config;
    this.gameContainer = gameContainer;
    this.application = new Application({
      view: gameCanvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      width: this.gameContainer?.clientWidth,
      height: this.gameContainer?.clientHeight,
    });
    // Setup viewport
    const centerStage = { x: this.screen.width / 2, y: this.screen.height / 2 };
    this.stage.pivot.copyFrom(startingView ? startingView : centerStage);
    this.stage.position = centerStage;
    // Setup interactions
    this.inputs = this.loadInputs();
    this.boards = {};
    this.characters = {};
    this.cursor = new Cursor(this.stage.pivot);
    // TODO: If single, game hold the spotlight, shines on whichever object is selected
    // If multi, Player Character hold the spotlight and can change from self to cursor
    this.gameMode = gameMode || "single";
  }

  loadInputs() {
    return {
      directional: new DirectionInput(),
      abControl: new ABInput(this),
    };
  }

  addBoard(boardConfig: {
    name: string;
    spriteData: ISpritesheetData;
    xOffset?: number;
    yOffset?: number;
    characters?: Character[];
    startPoint?: { x: number; y: number };
  }) {
    this.boards[boardConfig.name] = new Board(boardConfig);
  }

  loadBoards(
    boardConfigs: {
      name: string;
      spriteData: ISpritesheetData;
      xOffset?: number;
      yOffset?: number;
      characters?: Character[];
      startPoint?: { x: number; y: number };
    }[]
  ) {
    boardConfigs.forEach((boardConfig) => {
      this.addBoard(boardConfig);
    });
  }

  addCharacter(characterConfig: {
    name: string;
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    animationSpeed?: number;
    moveSpeed?: number;
  }) {
    const newCharacter = new Character(characterConfig);
    const largestExistingId = Object.keys(this.characters)
      .filter((id) => {
        id.startsWith(newCharacter.name);
      })
      .sort((a, b) => {
        return a > b ? -1 : a < b ? 1 : 0;
      })[0];
    this.stage.addChild(newCharacter.animation);
    if (largestExistingId) {
      const newId = (parseInt(largestExistingId.split("_")[1]) + 1)
        .toString()
        .padStart(4, "0");
      this.characters[`${newCharacter.name}_${newId}`] = newCharacter;
      return;
    }
    this.characters[`${newCharacter.name}_0000`] = newCharacter;
  }

  loadCharacters(
    characterConfigs: {
      name: string;
      spriteData: ISpritesheetData;
      anchorOverwrite?: Record<string, number>;
      currentAnimation?: string;
      animationSpeed?: number;
      moveSpeed?: number;
    }[]
  ) {
    characterConfigs.forEach((characterConfig) => {
      this.addCharacter(characterConfig);
    });
  }

  /**
   *
   * @param name Name of the board
   *
   * Change to a board by its name.
   *
   * Clear canvas, add the board and cursor to the stage, zoom to the starting position.
   */
  changeBoard(name: string) {
    this.currentBoard = name;
    this.stage.removeChildren();
    this.stage.addChild(this.board.sprite, this.cursor.animation);
    this.cursor.position = this.board.startPoint;
    this.pivot.copyFrom(this.cursor.position);
  }

  putObject(objectId: string, position?: { x: number; y: number }) {
    const targetObjecct = this.characters[objectId];
    targetObjecct.addToBoard(this.board, position);
    this.stage.addChild(targetObjecct.animation);
  }

  objectAt(x: number, y: number) {
    const objectFilter = Object.values(this.characters).filter((character) => {
      return character.x === x && character.y === y;
    });
    if (objectFilter.length > 0) {
      return objectFilter[0];
    }
    return null;
  }

  /**
   * Start game loop
   *
   * Update board (canvas), cursor, and camera
   */
  start() {
    let previousState = Object.values(this.characters)
      .map(
        (character) =>
          `${character.name}${character.direction}${character.focus}`
      )
      .reduce((prev, curr) => `${prev}_${curr}`, "");
    this.application.ticker.add(() => {
      const inputDirection = this.inputs.directional.direction;

      // Update character loop
      Object.values(this.characters).forEach((character) => {
        character.update({ arrow: inputDirection });
      });

      // Check new state
      const currentState = Object.values(this.characters)
        .map(
          (character) =>
            `${character.name}${character.direction}${character.focus}`
        )
        .reduce((prev, curr) => `${prev}_${curr}`, "");

      //  if any changed, synchronise animations
      if (currentState !== previousState) {
        Object.values(this.characters).forEach((character) => {
          character.restartAnimation();
        });
      }
      previousState = currentState;
      this.cursor.update({ arrow: inputDirection });
      this.pivot.copyFrom(this.cursor.position);
    });
  }

  get screen() {
    return this.application.screen;
  }

  get stage() {
    return this.application.stage;
  }

  get pivot() {
    return this.stage.pivot;
  }

  get board() {
    if (this.currentBoard) {
      return this.boards[this.currentBoard];
    }
    throw new Error("Please add at leat 1 board before using");
  }
}

export default Game;
