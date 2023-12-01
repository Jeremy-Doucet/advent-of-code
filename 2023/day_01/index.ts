import { readFileSync } from "fs";
import { chain } from "lodash";

const input = readFileSync("input.txt", "utf-8");
const words = "one|two|three|four|five|six|seven|eight|nine";
const numberDict = words.split("|").reduce((acc, word, index) => {
  acc[word] = `${index + 1}`;
  return acc;
}, {} as Record<string, string>);

export function part1(data) {
  const total = chain(data)
    .split("\n")
    .map((line) => {
      const firstValue = line.match(/\d/);
      const lastValue = line.match(/.*(\d)/);

      if (!firstValue || !lastValue) {
        return "";
      }

      return `${firstValue[0]}${lastValue[1]}`;
    })
    .filter((line) => !!line)
    .map((line) => parseInt(line))
    .sum()
    .value();

  return total;
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  const total = chain(data)
    .split("\n")
    .map((line) => {
      const firstValue = line.match(new RegExp(`\\d|${words}`));
      const lastValue = line.match(new RegExp(`.*(\\d|${words})`));

      if (!firstValue || !lastValue) {
        return "";
      }

      return `${toNumber(firstValue[0])}${toNumber(lastValue[1])}`;
    })
    .map((line) => parseInt(line))
    .sum()
    .value();

  return total;
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

function toNumber(str: string) {
  const val = parseInt(str);

  if (!Number.isNaN(val)) return val;

  return parseInt(numberDict[str]);
}
