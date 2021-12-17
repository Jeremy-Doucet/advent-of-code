import input from "./input.json";
import { chain, sum, times } from "lodash";

const part1 = () => {
  const arr = getArr();
  times(80, () => breedFish(arr));

  console.log(`Part 1: ${sum(arr)}`);
};

const part2 = () => {
  const arr = getArr();
  times(256, () => breedFish(arr));

  console.log(`Part 2: ${sum(arr)}`);
};

const getArr = () => {
  const arr: number[] = new Array(9).fill(0);

  chain(input)
    .countBy((i) => i)
    .forEach((value, key) => {
      arr[key] = value;
    })
    .value();

  return arr;
};

const breedFish = (arr: number[]) => {
  const newFish = arr.shift() || 0;
  arr.push(newFish);
  arr[6] += newFish;
};

part1();
part2();
