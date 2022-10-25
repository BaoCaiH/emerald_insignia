import Character from "../objects/Character";
import Group from "./Group";

class CharacterGroup extends Group {
  protected override holder: Character[];
  constructor(name: string, characters?: Character[]) {
    super(name);
    this.holder = characters || [];
  }

  get characters() {
    return this.holder;
  }

  addCharacter(character: Character) {
    this.holder.push(character);
  }

  addCharacters(characters: Character[]) {
    characters.forEach((character) => {
      this.addCharacter(character);
    });
  }

  update(state: { arrow: string }) {
    // Get current state to compare later
    const currentState = this.characters
      .map((character) => `${character.name}${character.direction}`)
      .reduce((prev, curr) => `${prev}_${curr}`, "");

    // Update character loop
    this.characters.forEach((character) => {
      character.update(state);
    });

    // Check new state
    const newState = this.characters
      .map((character) => `${character.name}${character.direction}`)
      .reduce((prev, curr) => `${prev}_${curr}`, "");
    //  if any changed, synchronise animations
    if (newState !== currentState) {
      this.characters.forEach((character) => {
        character.restartAnimation();
      });
    }
  }
}

export default CharacterGroup;
