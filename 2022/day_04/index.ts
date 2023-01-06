import { readFileSync } from "fs";
import { chain } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  return chain(data)
    .split("\n")
    .map((line) => line.split(','))
    .map((pairs) => pairs.map(pair => pair.split('-').map(Number)))
    .filter((pairs) => {
      const [min1, max1] = pairs[0];
      const [min2, max2] = pairs[1];
      return (min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)
    })
    .value()
    .length
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  return chain(data)
    .split("\n")
    .map((line) => line.split(','))
    .map((pairs) => pairs.map(pair => pair.split('-').map(Number)))
    .filter((pair) => {
      // check for any overlap between the 2 pairs
      const [min1, max1] = pair[0];
      const [min2, max2] = pair[1];
      return (min1 >= min2 && min1 <= max2) || (max1 >= min2 && max1 <= max2) || (min2 >= min1 && min2 <= max1) || (max2 >= min1 && max2 <= max1)
    })
    .value()
    .length
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

