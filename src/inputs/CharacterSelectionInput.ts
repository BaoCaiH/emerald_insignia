import Character from "../elements/objects/Character";
import Input from "./Input";

class CharacterSelectionInput extends Input {
  characters: Character[] | undefined;
  characterIndex: number;
  constructor() {
    super();
    this.characterIndex = -1;

    document.addEventListener("keyup", (key) => {
      const keyReleased = key.code;

      if (keyReleased === "KeyC" && this.characters) {
        this.characterIndex =
          (this.characterIndex + 1) % this.characters.length;
        this.setFocus();
      }
    });
  }

  setFocus() {
    this.characters?.forEach((character) => {
      if (this.characters?.indexOf(character) === this.characterIndex) {
        character.focus = true;
      } else {
        character.focus = false;
      }
    });
  }
  set characterList(characters: Character[]) {
    this.characters = characters;
  }
}

export default CharacterSelectionInput;
