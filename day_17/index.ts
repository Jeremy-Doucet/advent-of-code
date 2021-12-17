import { readFileSync } from "fs";
import { maxBy } from "lodash";

const INPUT_FILE = "./input.txt";

const part1 = () => {
  let highestYReached = 0;
  const [[x1, x2], [y1, y2]] = getInput();
  const bounds = { x1, x2, y1, y2 };

  for (let i = 1; i <= x2; i++) {
    for (let j = y2 + 1000; j >= y2; j--) {
      const results = fireProbe({ x: 0, y: 0 }, { x: i, y: j }, bounds, []);
      if (!results) continue;
      const highestPos = maxBy(results, (x) => x.y) || { y: 0 };
      if (highestPos.y > highestYReached) highestYReached = highestPos.y;
    }
  }

  console.log(`Part 1: Highest Y reached: ${highestYReached}`);
};

const part2 = () => {
  const allVelocities = new Set()
  const [[x1, x2], [y1, y2]] = getInput();
  const bounds = { x1, x2, y1, y2 };

  for (let i = 1; i <= x2; i++) {
    for (let j = y1 + 1000; j >= y1; j--) {
      const results = fireProbe({ x: 0, y: 0 }, { x: i, y: j }, bounds, []);
      if (!results) continue;
      allVelocities.add(`${i},${j}`);
    }
  }

  console.log(`Part 2: ${allVelocities.size}`);
};

const fireProbe = (pos: Position, vel: Position, bounds: Bounds, results: Position[]): Position[] | false => {
  //  If the probe is in bounds
  if (
    pos.x >= bounds.x1 &&
    pos.x <= bounds.x2 &&
    pos.y >= bounds.y1 &&
    pos.y <= bounds.y2
  )
    return results.concat([pos]);

  //  If the probe is out of bounds
  if (pos.x > bounds.x2 || pos.y < bounds.y1) return false;

  return fireProbe(
    { x: pos.x + vel.x, y: pos.y + vel.y },
    { x: goToZero(vel.x), y: vel.y - 1 },
    bounds,
    results.concat([pos])
  );
};

const goToZero = (n) => {
  if (n < 0) return n + 1;
  if (n > 0) return n - 1;
  return 0;
};

const getInput = () =>
  readFileSync(INPUT_FILE, "utf8")
    .replace(/target area: /, "")
    .split(", ")
    .map((x) => x.replace(/[xy]=/, ""))
    .map((x) => x.split("..").map((y) => parseInt(y)));

part1();
part2();

type Position = { x: number; y: number };
type Bounds = { x1: number; x2: number; y1: number; y2: number };