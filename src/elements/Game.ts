import { Application, ISpritesheetData } from "pixi.js";
import Board from "./Board";
import Character from "./objects/Character";
import CharacterGroup from "./groups/CharacterGroup";
import DirectionInput from "../inputs/DirectionInput";
import CharacterSelectionInput from "../inputs/CharacterSelectionInput";

class Game {
  gameContainer: HTMLElement;
  application: Application;
  inputs: { input: DirectionInput; charSelection: CharacterSelectionInput };
  boards: Board[];
  characterGroup: CharacterGroup;
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
    this.characterGroup = new CharacterGroup("players", [] as Character[]);
    document.addEventListener("animationChanged", (event) => {
      console.log(event);
    });
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
    this.characterGroup.addCharacters(this.loadCharacters(characterConfigs));
    console.log(this.characterGroup);

    this.inputs.charSelection.characterList = this.characterGroup.characters;
    this.application.stage.addChild(
      this.boards[0],
      ...this.characterGroup.characters.map((character) => character.animation)
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
        spriteData: spriteData,
        anchorOverwrite: anchorOverwrite,
        currentAnimation: currentAnimation,
        animationSpeed: animationSpeed,
        moveSpeed: moveSpeed,
      });
    });
  }

  start() {
    this.application.ticker.add((delta) => {
      this.characterGroup.update({
        arrow: this.inputs.input.direction,
        deltaTime: delta / 4,
      });
    });
  }

  get screen() {
    return this.application.screen;
  }
}

export default Game;
