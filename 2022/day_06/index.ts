import { readFileSync } from "fs";
import { chain, slice } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  return chain(data)
    .findIndex((_char, idx, arr) => {
      return [...new Set(slice(arr, idx - 3, idx + 1))].length === 4;
    }, 3)
    .value() + 1
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  return chain(data)
  .findIndex((_char, idx, arr) => {
    return [...new Set(slice(arr, idx - 13, idx + 1))].length === 14;
  }, 13)
  .value() + 1
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

