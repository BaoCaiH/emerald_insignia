import Game from "../elements/overworld/Game";
import Input from "./Input";
import Character from "../elements/objects/Character";

class ABInput extends Input {
  game: Game;
  currentCharacter?: Character;
  constructor(game: Game) {
    super();
    this.map = {
      KeyZ: "A",
      KeyX: "B",
    };
    this.game = game;

    document.addEventListener("keyup", (key) => {
      const cmd = this.map[key.code];
      if (cmd === "A") {
        if (this.currentCharacter) {
          this.releaseCharacter();
          return;
        }
        const objectAtCursor = this.board.getObjectAt(
          this.cursor.x,
          this.cursor.y
        );
        if (objectAtCursor) {
          this.currentCharacter = objectAtCursor;
          this.currentCharacter.focus = true;
        }
      } else if (cmd === "B") {
        this.releaseCharacter();
      }
    });
  }

  get board() {
    return this.game.board;
  }

  get cursor() {
    return this.board.cursor;
  }

  get characters() {
    return this.board.players.characters;
  }

  releaseCharacter() {
    if (this.currentCharacter) {
      this.currentCharacter.focus = false;
      this.currentCharacter = undefined;
    }
  }
}

export default ABInput;
