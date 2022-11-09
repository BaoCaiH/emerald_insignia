import Input from "./Input";

class ModeInput extends Input {
  protected internalMode: string = "roam";
  constructor() {
    super();
    document.addEventListener("keyup", (key) => {
      const keyReleased = key.code;

      if (keyReleased === "KeyR") {
        this.internalMode = this.internalMode === "roam" ? "battle" : "roam";
        console.log(`Move mode changed to ${this.mode}`);
      }
    });
  }

  get mode() {
    return this.internalMode;
  }
}

export default ModeInput;
