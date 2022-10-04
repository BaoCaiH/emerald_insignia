import Character from "../elements/objects/Character";
import GameObject from "../elements/objects/GameObject";
import Spotlight from "../elements/objects/Spotlight";
import Input from "./Input";

class CharacterSelectionInput extends Input {
  characters: Character[] | undefined;
  characterIndex: number;
  spotlight?: Spotlight;
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
        this.spotlight?.setSpotlight(character);
      } else {
        character.focus = false;
      }
    });
  }

  setSpotlight(gameObject: GameObject) {
    if (this.spotlight) {
      this.spotlight.gameObject = gameObject;
    }
  }

  set characterList(characters: Character[]) {
    this.characters = characters;
  }
}

export default CharacterSelectionInput;
