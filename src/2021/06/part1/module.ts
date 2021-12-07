const FIRST_CYCLE_LENGTH = 9;
const STANDARD_CYCLE_LENGTH = 7;

class Lanternfish {
  daysTillSpawn: number;

  constructor(daysTillSpawn: number = FIRST_CYCLE_LENGTH) {
    this.daysTillSpawn = daysTillSpawn;
  }

  tick(): boolean {
    if (this.daysTillSpawn === 0) {
      this.daysTillSpawn = STANDARD_CYCLE_LENGTH;
      this.daysTillSpawn--;
      return true;
    }
    this.daysTillSpawn--;
    return false;
  }
}

export class LanternfishSystem {
  fish: Lanternfish[];

  static run(input: string, generations: number): number {
    const system = new LanternfishSystem(
      input.split(",").map((v) => new Lanternfish(Number(v))),
    );
    for (let i = 0; i < generations; i++) {
      system.tick();
    }
    return system.fish.length;
  }

  constructor(fish: Lanternfish[]) {
    this.fish = fish;
  }

  tick(): void {
    for (const f of this.fish) {
      if (f.tick()) {
        this.fish.push(new Lanternfish());
      }
    }
  }
}
