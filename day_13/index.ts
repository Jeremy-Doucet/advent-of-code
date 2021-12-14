import { chain, each, maxBy } from "lodash";
import input from "./input.json";

const part1 = () => {
  const grid = new Grid(input);

  grid.fold(grid.folds[0]);
  // grid.print();

  console.log(`Part 1: ${grid.countPoints()}`);
};

const part2 = () => {
  const grid = new Grid(input)

  grid.folds.forEach(fold => grid.fold(fold))
  grid.print();

  console.log(`Part 2: see above`)
};

class Grid {
  map: string[][];
  folds: string[];

  constructor(data) {
    this.map = this.initGrid(data.points);
    this.folds = this.initFolds(data.folds);
  }

  private initGrid(data: string[]) {
    const parsed = data.map((line) => line.split(","));
    const height = parseInt(
      maxBy(parsed, (point: string[]) => parseInt(point[1]))?.[1] || "1"
    );
    const width = parseInt(
      maxBy(parsed, (point: string[]) => parseInt(point[0]))?.[0] || "1"
    );

    const result = Array.from({ length: height + 1 }, () =>
      Array.from({ length: width + 1 }, () => ".")
    );
    each(parsed, (point: string[]) => (result[point[1]][point[0]] = "#"));

    return result;
  }

  private initFolds(data: string[]) {
    return chain(data)
      .map((s) => s.replace(/fold along /, ""))
      .value();
  }

  countPoints() {
    return chain(this.map)
      .map((row) => row.filter((point) => point === "#").length)
      .sum();
  }

  fold(instructions) {
    const [direction, axis] = instructions.split("=");
    if (direction === "x") return this.foldLeft(axis);
    if (direction === "y") return this.foldUp(axis);
  }

  foldLeft(x) {
    this.map = this.map
      .map((row) => ({
        start: row.slice(0, x),
        end: row.slice(x).slice(1).reverse(),
      }))
      .map((row, i) =>
        row.start.map((point, j) =>
          point === "#" || row.end[j] === "#" ? "#" : "."
        )
      );
  }

  foldUp(y) {
    const start = this.map.slice(0, y);
    const end = this.map.slice(y).slice(1).reverse();
    this.map = start.map((row, i) =>
      row.map((point, j) => (point === "#" || end[i][j] === "#" ? "#" : "."))
    );
  }

  print() {
    console.log(this.map.map((row) => row.join(" ")).join("\n"));
  }
}

part1();
part2();
