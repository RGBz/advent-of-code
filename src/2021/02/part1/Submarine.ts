import { SubmarineCommand } from "./SubmarineCommand.ts";

export class Submarine {
  #horizontal = 0;
  #depth = 0;

  executeCommands(...commands: SubmarineCommand[]): void {
    for (const command of commands) {
      switch (command.type) {
        case "forward":
          this.#horizontal += command.amount;
          break;
        case "down":
          this.#depth += command.amount;
          break;
        case "up":
          this.#depth -= command.amount;
          break;
      }
    }
  }

  get horizontal(): number {
    return this.#horizontal;
  }

  get depth(): number {
    return this.#depth;
  }

  get horizontalTimesDepth(): number {
    return this.#horizontal * this.#depth;
  }
}
