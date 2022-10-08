import { Application, ISpritesheetData } from "pixi.js";
import CharacterSelectionInput from "../../inputs/CharacterSelectionInput";
import DirectionInput from "../../inputs/DirectionInput";
import Board from "./Board";
import CharacterGroup from "../groups/CharacterGroup";
import Character from "../objects/Character";
import Spotlight from "../objects/Spotlight";

class Game {
  gameContainer: HTMLElement;
  application: Application;
  inputs: {
    input: DirectionInput;
    characterSelection: CharacterSelectionInput;
  };
  boards: Board[];
  characterGroup: CharacterGroup;
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
    this.boards = [] as Board[];
    this.characterGroup = new CharacterGroup("players", [] as Character[]);
    // TODO: If single, game hold the spotlight, shines on whichever object is selected
    // If multi, Player Character hold the spotlight and can change from self to cursor
    this.gameMode = gameMode || "single";
    this.spotlight = new Spotlight(this.screen.width, this.screen.height);
  }

  setup(config: {
    boardConfigs: { mapPath: string; mapOffset?: { x?: number; y?: number } }[];
    characterConfigs: {
      name: string;
      initialPositions: { x: number; y: number };
      spriteData: ISpritesheetData;
      anchorOverwrite?: Record<string, number>;
      currentAnimation?: string;
      animationSpeed?: number;
      moveSpeed?: number;
    }[];
  }) {
    const { boardConfigs, characterConfigs } = config;
    this.loadBoards(boardConfigs);
    this.characterGroup.addCharacters(
      this.loadCharacters(characterConfigs, this.boards[0])
    );

    // Hand the character selection input the character list and spotlight to set
    this.inputs.characterSelection.characterList =
      this.characterGroup.characters;
    this.inputs.characterSelection.spotlight = this.spotlight;

    this.application.stage.addChild(
      this.boards[0],
      ...this.characterGroup.characters.map((character) => character.animation)
    );
  }

  loadInputs() {
    return {
      input: new DirectionInput(),
      characterSelection: new CharacterSelectionInput(),
    };
  }

  loadBoards(
    boardConfigs: { mapPath: string; mapOffset?: { x?: number; y?: number } }[]
  ) {
    this.boards = [
      ...this.boards,
      ...boardConfigs.map((boardConfig) => {
        const { mapPath, mapOffset } = boardConfig;
        return new Board({
          mapPath: mapPath,
          xOffset: mapOffset?.x || 0,
          yOffset: mapOffset?.y || 0,
        });
      }),
    ];
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
    }[],
    board: Board
  ) {
    return characterConfigs.map((characterConfig) => {
      const {
        name,
        initialPositions,
        spriteData,
        anchorOverwrite,
        currentAnimation,
        animationSpeed,
        moveSpeed,
      } = characterConfig;
      return new Character({
        name: name,
        x: initialPositions.x,
        y: initialPositions.y,
        board: board,
        spriteData: spriteData,
        anchorOverwrite: anchorOverwrite,
        currentAnimation: currentAnimation,
        animationSpeed: animationSpeed,
        moveSpeed: moveSpeed,
      });
    });
  }

  start() {
    this.application.ticker.add(() => {
      this.characterGroup.update({
        arrow: this.inputs.input.direction,
      });
      if (this.spotlight.gameObject) {
        // Move the screen pivot (camera) to the spotlight
        this.application.stage.pivot.copyFrom(
          this.spotlight.gameObject.animation.position
        );
      }
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
}

export default Game;
