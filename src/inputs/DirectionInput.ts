import Input from "./Input";

class DirectionInput extends Input {
  private heldDirection: string[];
  constructor() {
    super();
    this.heldDirection = [];
    this.map = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
      KeyA: "left",
      KeyD: "right",
      KeyW: "up",
      KeyS: "down",
    };

    document.addEventListener("keydown", (key) => {
      const direction = this.map[key.code];
      if (direction && !this.heldDirection.includes(direction)) {
        this.heldDirection.unshift(direction);
      }
      //   console.log(this.heldDirection);
    });
    document.addEventListener("keyup", (key) => {
      const direction = this.map[key.code];
      const index = this.heldDirection.indexOf(direction);
      if (index > -1) {
        this.heldDirection.splice(index, 1);
      }
      //   console.log(this.heldDirection);
    });
  }

  get direction() {
    return this.heldDirection[0];
  }
}

export default DirectionInput;
