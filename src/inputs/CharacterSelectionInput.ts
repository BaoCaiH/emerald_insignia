import Characters from "../elements/Character";
import Input from "./Input";

class CharacterSelectionInput extends Input {
  characters: Characters[] | undefined;
  characterIndex: number;
  constructor() {
    super();
    this.characterIndex = -1;

    document.addEventListener("keyup", (key) => {
      const keyReleased = key.code;

      if (keyReleased === "KeyC" && this.characters) {
        this.characterIndex =
          (this.characterIndex + 1) % this.characters.length;
        console.log(this.characterIndex);
        this.setFocus();
      }
    });
  }

  setFocus() {
    this.characters?.forEach((character) => {
      if (this.characters?.indexOf(character) === this.characterIndex) {
        console.log(character.internalName);

        character.focus = true;
      } else {
        character.focus = false;
      }
    });
  }
  set characterList(characters: Characters[]) {
    this.characters = characters;
  }
}

export default CharacterSelectionInput;
