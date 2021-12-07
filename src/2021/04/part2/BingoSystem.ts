import { BingoBoard } from "./BingoBoard.ts";

export class BingoSystem {
  boards: BingoBoard[];
  winCount: number;

  constructor(boards: BingoBoard[]) {
    this.boards = boards;
    this.winCount = 0;
  }

  static run(input: string): number {
    const [numbersStr, ...boardStrs] = input.split("\n\n");
    return new BingoSystem(boardStrs.map((boardStr) =>
      new BingoBoard(
        boardStr.split("\n").map(rowToNumbers).flat()
          .map(
            (value) => ({ value, marked: false }),
          ),
        5,
        5,
      )
    )).play(numbersStr.split(",").map(Number));
  }

  play(values: number[]): number {
    for (const value of values) {
      const winningBoard = this.mark(value);
      if (winningBoard && this.winCount === this.boards.length) {
        return winningBoard.unmarkedSum * value;
      }
    }
    return 0;
  }

  mark(value: number): BingoBoard | null {
    let winningBoard = null;
    for (const board of this.boards.filter((b) => !b.isComplete)) {
      board.mark(value);
      if (board.isComplete) {
        this.winCount += 1;
        winningBoard = board;
      }
    }
    return winningBoard;
  }
}

function rowToNumbers(row: string): number[] {
  const numbers = [];
  for (let i = 0; i < row.length; i += 3) {
    numbers.push(Number(row.substring(i, i + 2)));
  }
  return numbers;
}
