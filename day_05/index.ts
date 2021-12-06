import input from "./input.json";
import { chain } from "lodash";

const part1 = () => {
  const map = new Map();

  chain(input)
    .map((str) => new Line(str))
    .filter((line) => line.isHorizontal() || line.isVertical())
    .each((line) => map.pushLine(line))
    .value();

  console.log(`Part 1: ${map.getDangerZones()}`);
};

const part2 = () => {
  const map = new Map();

  chain(input)
    .map((str) => new Line(str))
    .each((line) => map.pushLine(line))
    .value();

  console.log(`Part 2: ${map.getDangerZones()}`);
};

class Map {
  counts: number[][] = [];

  pushLine(line: Line) {
    for (let [x, y] of line.range()) {
      this.counts[y] ||= []
      this.counts[y][x] ||= 0
      this.counts[y][x]++;
    }
  }

  getDangerZones() {
    return chain(this.counts)
      .flatten()
      .compact()
      .filter((count) => count >= 2)
      .value()
      .length;
  }
}
class Line {
  start: Point;
  end: Point;
  constructor(str) {
    const [x1, y1, x2, y2] = getPoints(str);
    this.start = new Point(x1, y1);
    this.end = new Point(x2, y2);
  }

  isHorizontal() {
    return this.start.y === this.end.y;
  }

  isVertical() {
    return this.start.x === this.end.x;
  }

  *range() {
    const slopeX = Math.sign(this.end.x - this.start.x);
    const slopeY = Math.sign(this.end.y - this.start.y);
    const numStepsX = Math.abs(this.end.x - this.start.x) + 1;
    const numStepsY = Math.abs(this.end.y - this.start.y) + 1;

    let steps = Math.max(numStepsX, numStepsY);
    let x = this.start.x;
    let y = this.start.y;
    while (steps--) {
      yield [x, y];
      x += slopeX;
      y += slopeY;
    }
  }
}

class Point {
  constructor(public x: number, public y: number) {}
}

const getPoints = (str) => {
  return chain(str)
    .split(" -> ")
    .flatten()
    .split(",")
    .flatten()
    .map(Number)
    .value();
};

part1();
part2();
