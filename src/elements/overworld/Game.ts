import { Application, ISpritesheetData } from "pixi.js";
import CharacterSelectionInput from "../../inputs/CharacterSelectionInput";
import DirectionInput from "../../inputs/DirectionInput";
import Board from "./Board";
import Character from "../objects/Character";
import Spotlight from "../objects/Spotlight";
import ABInput from "../../inputs/ABInput";

class Game {
  gameContainer: HTMLElement;
  application: Application;
  inputs: {
    directional: DirectionInput;
    characterSelection: CharacterSelectionInput;
  };
  boards: Record<string, Board>;
  currentBoard?: string;
  gameMode: string;
  spotlight: Spotlight;
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
    // TODO: If single, game hold the spotlight, shines on whichever object is selected
    // If multi, Player Character hold the spotlight and can change from self to cursor
    this.gameMode = gameMode || "single";
    this.spotlight = new Spotlight(this.screen.width, this.screen.height);
    this.inputs.characterSelection.spotlight = this.spotlight;
  }

  loadInputs() {
    return {
      directional: new DirectionInput(),
      characterSelection: new CharacterSelectionInput(),
      abControl: new ABInput(this),
    };
  }

  addBoard(boardConfig: {
    name: string;
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
    initialPositions: { x: number; y: number };
    spriteData: ISpritesheetData;
    anchorOverwrite?: Record<string, number>;
    currentAnimation?: string;
    animationSpeed?: number;
    moveSpeed?: number;
  }) {
    const newChar = this.board.addCharacter(characterConfig);
    this.stage.addChild(newChar.animation);
  }

  loadCharacters(
    characterConfigs: {
      name: string;
      initialPositions: { x: number; y: number };
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

  changeBoard(name: string) {
    this.currentBoard = name;
    this.stage.removeChildren();
    this.stage.addChild(this.board.sprite, this.board.cursor.animation);
    this.inputs.characterSelection.characterList =
      this.board.players.characters;
  }

  start() {
    this.application.ticker.add(() => {
      // console.log(this.board);

      this.board.update({
        arrow: this.inputs.directional.direction,
      });
      this.pivot.copyFrom(this.board.cursor.position);
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
