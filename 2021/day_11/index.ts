import { chain, each, map, reduce } from "lodash";
import input from "./input.json";

const part1 = () => {
  const data = parseInput(input);
  const arr: Cell[][] = new Array(100).fill({ data: [], sum: 0 });

  const result = reduce(
    arr,
    (acc, _curr) => {
      const { data, sum } = checkForFlashes(acc.data);
      return { data, sum: acc.sum + sum };
    },
    { data: new Grid(data), sum: 0 }
  );

  console.log(`Part 1: ${result.sum}`);
};

const part2 = () => {
  const data = parseInput(input);
  const grid = new Grid(data);

  for (let i = 1; i < Infinity; i++) {
    grid.incrementAll();
    grid.checkForFlashes();
    if (grid.totalFlashes() === 100) {
      console.log(`Part 2: ${i}`);
      break;
    }
  }

};

const checkForFlashes = (data: Grid) => {
  data.incrementAll();
  data.checkForFlashes();
  const sum = data.totalFlashes();

  return { data, sum };
};

class Grid {
  data: Cell[][];

  constructor(_data: number[][]) {
    this.data = map(_data, (row) =>
      row.map((cell) => ({ flashed: false, val: cell }))
    );
  }

  checkForFlashes() {
    each(this.data, (row, y) => {
      each(row, (cell, x) => {
        if (cell.val > 9 && !cell.flashed) {
          cell.flashed = true;
          this.flashNeighbors(y, x);
        }
      });
    });
  }

  flashNeighbors(y: number, x: number) {
    const neighbors = [
      { y: y - 1, x: x - 1 },
      { y: y - 1, x: x },
      { y: y - 1, x: x + 1 },
      { y: y, x: x - 1 },
      { y: y, x: x + 1 },
      { y: y + 1, x: x - 1 },
      { y: y + 1, x: x },
      { y: y + 1, x: x + 1 },
    ]
      .filter(({ x, y }) => x >= 0 && y >= 0)
      .filter(({ x, y }) => x < this.data[0].length && y < this.data.length);

    each(neighbors, ({ y, x }) => {
      const cell = this.data[y][x];
      if (cell === undefined) return;
      cell.val += 1;

      if (cell.val > 9 && !cell.flashed) {
        cell.flashed = true;
        this.flashNeighbors(y, x);
      }
    });
  }

  incrementAll() {
    each(this.data, (row) => {
      each(row, (cell) => {
        cell.val += 1;
      });
    });
  }

  totalFlashes() {
    let sum = 0;
    each(this.data, (row) => {
      each(row, (cell) => {
        if (cell.flashed) {
          sum += 1;
          cell.flashed = false;
          cell.val = 0;
        }
      });
    });
    return sum;
  }
}

const parseInput = (input: string[]) => {
  return chain(input)
    .map((line: string) => line.split("").map((s) => parseInt(s)))
    .value();
};

type Cell = {
  val: number;
  flashed: boolean;
};

part1();
part2();
