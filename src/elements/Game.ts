import { Application, ISpritesheetData } from "pixi.js";
import Board from "./Board";
import Character from "./Character";
import DirectionInput from "../inputs/DirectionInput";
import CharacterSelectionInput from "../inputs/CharacterSelectionInput";

class Game {
  gameContainer: HTMLElement;
  application: Application;
  inputs: { input: DirectionInput; charSelection: CharacterSelectionInput };
  boards: Board[];
  characters: Character[];
  constructor(config: {
    gameContainer: HTMLElement;
    gameCanvas: HTMLCanvasElement;
  }) {
    // Setup barebone
    const { gameContainer, gameCanvas } = config;
    this.gameContainer = gameContainer;
    this.application = new Application({
      view: gameCanvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      width: this.gameContainer?.clientWidth,
      height: this.gameContainer?.clientHeight,
    });
    this.inputs = this.loadInputs();
    this.boards = [] as Board[];
    this.characters = [] as Character[];
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
    this.loadCharacters(characterConfigs);
    console.log(this.characters);

    this.inputs.charSelection.characterList = this.characters;
    this.application.stage.addChild(
      this.boards[0],
      ...this.characters.map((character) => character.animation)
    );
  }

  loadInputs() {
    return {
      input: new DirectionInput(),
      charSelection: new CharacterSelectionInput(),
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
    }[]
  ) {
    this.characters = [
      ...this.characters,
      ...characterConfigs.map((characterConfig) => {
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
          spriteData: spriteData,
          anchorOverwrite: anchorOverwrite,
          currentAnimation: currentAnimation,
          animationSpeed: animationSpeed,
          moveSpeed: moveSpeed,
        });
      }),
    ];
  }

  start() {
    this.application.ticker.add(() => {
      this.characters.forEach((character) => {
        character.update({ arrow: this.inputs.input.direction });
      });
    });
  }

  get screen() {
    return this.application.screen;
  }
}

export default Game;
