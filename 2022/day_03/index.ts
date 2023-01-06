import { readFileSync } from "fs";
import { chain } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  return chain(data)
    .split("\n")
    .map((line) => 
      chain(line)
        .split('')
        .chunk(line.length / 2)
        .map(line => line.join(''))
        .value()
    )
    .map((line) => 
      line[0]
        .split('')
        .find(char => line[1].indexOf(char) !== -1)
    )
    .map(getCharPriority)
    .sum()
    .value()
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  return chain(data)
    .split('\n')
    .chunk(3)
    .map((chunk) => 
      chunk[0]
        .split('')
        .find(char => chunk[1].indexOf(char) !== -1 && chunk[2].indexOf(char) !== -1)
    )
    .map(getCharPriority)
    .sum()
    .value()
}
console.log(`Part 2: ${part2(input)}`);

// Private functions
function getCharPriority(char) {
  const prio = (char?.charCodeAt(0) || 0) - 96
  return prio < 0 ? prio + 58 : prio
}