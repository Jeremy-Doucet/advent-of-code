import input from "./input.json";
import { each, sum } from "lodash";

const countLarger = (input: number[]) => {
  let count = 0;
  each(input, (value, index) => {
    if (index > 0 && value > input[index - 1]) {
      count++;
    }
  });
  return count;
};

console.log(`Part 1: ${countLarger(input)}`);

const getSumsOfMovingWindows = (input: number[]) => {
  const result = [sum(input.slice(0, 3))];
  const window = input.slice(0, 3);
  each(input, (value, index) => {
    if (index > 2) {
      window.shift();
      window.push(value);
      result.push(sum(window));
    }
  });

  return result;
};

console.log(`Part 2: ${countLarger(getSumsOfMovingWindows(input))}`);
