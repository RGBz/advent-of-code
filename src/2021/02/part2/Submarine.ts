import { SubmarineCommand } from "./SubmarineCommand.ts";

export class Submarine {
  #horizontal = 0;
  #depth = 0;
  #aim = 0;

  executeCommands(...commands: SubmarineCommand[]): void {
    for (const command of commands) {
      switch (command.type) {
        case "forward":
          this.#horizontal += command.amount;
          this.#depth += this.#aim * command.amount;
          break;
        case "down":
          this.#aim += command.amount;
          break;
        case "up":
          this.#aim -= command.amount;
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

  get aim(): number {
    return this.#aim;
  }

  get horizontalTimesDepth(): number {
    return this.#horizontal * this.#depth;
  }
}
