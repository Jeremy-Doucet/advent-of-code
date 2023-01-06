import { readFileSync } from "fs";
import { chain } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  return Math.max(...sumElfCalories(data)) 
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  return chain(sumElfCalories(data))
    .orderBy((n) => n, 'desc')
    .take(3)
    .sum()
    .value();
}
console.log(`Part 2: ${part2(input)}`);

// Private functions
function sumElfCalories(data) {
  return data
    .split('\n\n')
    .map(str => str.split('\n'))
    .map(arrStr => arrStr.map(str => parseInt(str)))
    .map(arrInt => arrInt.reduce((acc, curr) => acc + curr, 0))
}