interface BoardTile {
  value: number;
  marked: boolean;
}

export class BingoBoard {
  tiles: BoardTile[];
  width: number;
  height: number;

  constructor(tiles: BoardTile[], width: number, height: number) {
    this.tiles = tiles;
    this.width = width;
    this.height = height;
  }

  mark(value: number): void {
    for (const tile of this.tiles) {
      if (tile.value === value) {
        tile.marked = true;
      }
    }
  }

  get unmarkedSum(): number {
    return this.tiles.reduce(
      (sum, { value, marked }) => sum + (marked ? 0 : value),
      0,
    );
  }

  get isComplete(): boolean {
    for (let r = 0; r < this.height; r++) {
      if (this.isRowComplete(r)) {
        return true;
      }
    }
    for (let c = 0; c < this.width; c++) {
      if (this.isColumnComplete(c)) {
        return true;
      }
    }
    return false;
  }

  getTile(rowIndex: number, columnIndex: number): BoardTile {
    return this.tiles[rowIndex * this.width + columnIndex];
  }

  isRowComplete(rowIndex: number): boolean {
    for (let c = 0; c < this.width; c++) {
      if (!this.getTile(rowIndex, c).marked) {
        return false;
      }
    }
    return true;
  }

  isColumnComplete(columnIndex: number): boolean {
    for (let r = 0; r < this.height; r++) {
      if (!this.getTile(r, columnIndex).marked) {
        return false;
      }
    }
    return true;
  }
}
