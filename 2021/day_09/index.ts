import { chain, every } from "lodash";
import input from "./input.json";

const part1 = () => {
  const data = numMap();

  const result = chain(data)
    .flatMap((row, y) =>
      row.filter((cell, x) => cellLowerThanNeighbors(data, cell, x, y))
    )
    .map((x) => x + 1)
    .sum();

  console.log(`Part 1: ${result}`);
};

const part2 = () => {
  const data = numMap();

  const reuslt = chain(findBasins(data))
    .sortBy((x) => x.length)
    .takeRight(3)
    .reduce((acc, x) => acc * x.length, 1)
    .value()

  console.log(`Part 2: ${reuslt}`);
};

const cellLowerThanNeighbors = (data, cell, x, y) => {
  const neighbors = [
    get(data, y, x - 1),
    get(data, y, x + 1),
    get(data, y - 1, x),
    get(data, y + 1, x),
  ];

  return every(neighbors, (n) => n > cell);
};

const findBasins = (data: number[][]): number[][] => {
  const nodes = data.map((row) =>
    row.map((cell) => ({ val: cell, visited: false }))
  );
  const basins: any = [];

  const find = (y, x, basin) => {
    if (x === -1 || y === -1) return;
    if (x === nodes[0].length) return;
    if (y === nodes.length) return;

    if (nodes[y][x].visited) return;
    nodes[y][x].visited = true;

    if (get(data, y, x) !== 9) {
      basin.push([y, x]);
      find(y - 1, x, basin);
      find(y + 1, x, basin);
      find(y, x - 1, basin);
      find(y, x + 1, basin);
    }
  };

  nodes.forEach((row, y) => {
    row.forEach((cell, x) => {
      const basin = [];
      if (cell.val !== 9) {
        find(y, x, basin);
        if (basin.length > 0) basins.push(basin);
      }
    });
  });

  return basins;
};

const get = (arr, row, cell) => {
  if (arr[row] === undefined) {
    return 9;
  }
  if (arr[row][cell] === undefined) {
    return 9;
  }
  return arr[row][cell];
};

const numMap = () =>
  chain(input)
    .map((x) => x.split(""))
    .map((x) => x.map((y) => parseInt(y)))
    .value();

part1();
part2();
