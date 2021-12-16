import input from "./input.json";

const part1 = () => {
  console.log(`Part 1: ${findShortestPath(parsedInput(input))}`);
};

const part2 = () => {
  const data = parsedInput(input);
  const map = Array.from({ length: data.length * 5 }).map((_, y) =>
    Array.from({ length: data[0].length * 5 }).map(
      (_, x) =>
        1 +
        ((data[y % data.length][x % data[0].length] -
          1 +
          Math.trunc(x / data[0].length) +
          Math.trunc(y / data.length)) %
          9)
    )
  );

  console.log(`Part 2: ${findShortestPath(map)}`);
};

const parsedInput = (input: string[]) =>
  input.map((x) => x.split("").map((y) => parseInt(y)));

const findShortestPath = (map, startPos = [0, 0]) => {
  const neighbors = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue: { pos: number[]; cost: number }[] = [{ pos: startPos, cost: 0 }];
  const visited = new Set();
  while (queue.length) {
    const {
      pos: [x, y],
      cost,
    } = queue.shift()!;

    if (y === map.length - 1 && x === map[0].length - 1) return cost;

    neighbors
      .map(([dx, dy]) => [dx + x, dy + y])
      .filter(([x, y]) => map[y]?.[x])
      .filter((pos) => !visited.has(pos + ""))
      .forEach((pos) => {
        visited.add(pos + "");
        queue.push({ pos, cost: cost + map[pos[1]][pos[0]] });
      });
    queue.sort((a, b) => a.cost - b.cost);
  }
};

part1();
part2();
