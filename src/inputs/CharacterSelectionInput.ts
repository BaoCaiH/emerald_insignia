import Input from "./Input";

class CharacterSelectionInput extends Input {
  private inSelectionMode: boolean;
  protected override map: Record<string, number>;
  private internalSelected: number | undefined;
  constructor() {
    super();
    this.map = {
      Digit1: 0,
      Digit2: 1,
      Digit3: 2,
      Digit4: 3,
      Digit5: 4,
      Digit6: 5,
      Digit7: 6,
      Digit8: 7,
      Digit9: 8,
    };
    this.inSelectionMode = false;
    this.internalSelected = undefined;

    document.addEventListener("keydown", (key) => {
      const keyPressed = key.code;
      if (keyPressed && keyPressed === "KeyC") {
        this.inSelectionMode = true;
      }
    });
    document.addEventListener("keyup", (key) => {
      const keyReleased = key.code;
      const mappedOutput = this.map[key.code];
      if (keyReleased && this.inSelectionMode) {
        if (keyReleased === "KeyC") {
          this.inSelectionMode = false;
        } else if (mappedOutput) {
          this.internalSelected = mappedOutput;
        }
      }
    });
  }

  get selected() {
    return this.internalSelected;
  }
}

export default CharacterSelectionInput;
