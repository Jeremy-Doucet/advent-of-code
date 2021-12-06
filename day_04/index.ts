import input from "./input.json";
import { chain, every, find, forEach, some } from "lodash";

const part1 = () => {
  const boards = input.boards.map((board) => new Board(board));
  let winningBoard: Board | undefined;

  forEach(input.pulls, (pull) => {
    const numStr = pull.toString();
    
    forEach(boards, (board) => {
      board.mark(numStr);
      if (board.isWon()) {
        winningBoard = board;
        return false;
      }
    });

    if (winningBoard) {
      console.log(`Part 1: ${winningBoard.computeSum(pull)}`);
      return false;
    }
  });
};

const part2 = () => {
  const boards = input.boards.map((board) => new Board(board));

  forEach(input.pulls, (pull) => {
    const numStr = pull.toString();  
    const remainingBoards = boards.filter((board) => !board.isWon());

    forEach((remainingBoards), (board) => {
      board.mark(numStr);
    });

    if (remainingBoards.length === 1 && remainingBoards[0].isWon()) {
      console.log(`Part 2: ${remainingBoards[0].computeSum(pull)}`);
      return false;
    }
  });
}

class Board {
  private _board: Array<Array<Cell>>;
  bingo: boolean;

  constructor(board: Array<string>) {
    this.bingo = false;
    this._board = board.map((row) =>
      row.split(/\s+/).map((cell) => new Cell(cell))
    );
  }

  computeSum(lastPull: number) {
    console.log(`Winning Pull: ${lastPull}`);

    return chain(this._board)
      .flatten()
      .filter((cell) => !cell.marked)
      .sumBy((cell) => parseInt(cell.num))
      .multiply(lastPull)
      .value()
  }

  mark(num: string) {
    const row = find(this._board, (row) =>
      some(row, (cell) => cell.num === num)
    );
    if (!row) return;
    const cell = find(row, (cell) => cell.num === num);
    if (!cell) return;
    cell.mark();
  }

  isWon(): boolean {
    if (this.bingo) return true;
    if (this.hasACompleteRow() || this.hasACompleteColumn()) {
      this.bingo = true;
      return true;
    } else {
      return false;
    }
  }

  hasACompleteRow(): boolean {
    return some(this._board, (row) => row.every((cell) => cell.marked));
  }

  hasACompleteColumn(): boolean {
    for (let i = 0; i < this._board.length; i++) {
      const result = every(this._board, (row) => row[i].marked);
      if (result) return true;
    }
    return false;
  }
}

class Cell {
  public num: string;
  public marked: boolean;

  constructor(str) {
    this.marked = false;
    this.num = str;
  }

  mark() {
    this.marked = true;
  }
}

part1()
part2()
