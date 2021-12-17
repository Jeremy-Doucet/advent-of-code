import { max, min, range, reduce } from "lodash";
import input from "./input.json";

const minNum = min(input) || 0;
const maxNum = max(input) || 0;
const data = range(minNum, maxNum + 1);

const part1 = () => {
  const cb = (diff) => diff;
  console.log(`Part 1: ${getLeastNumberOfSteps(cb)}`);
};

const part2 = () => {
  const cb = (diff) => ((diff + 1) * diff) / 2;
  console.log(`Part 2: ${getLeastNumberOfSteps(cb)}`);
};

const reduceData = (cb) => data.reduce(cb, Infinity);

const getTotalSteps = (currentPosition, cb) =>
  input.reduce((totalSteps, position) => {
    const diff = Math.abs(position - currentPosition);
    return (totalSteps += cb(diff));
  }, 0);

const getLeastNumberOfSteps = (diffCb) =>
  reduceData((prev, currentPosition) => {
    const steps = getTotalSteps(currentPosition, diffCb);
    return steps < prev ? (prev = steps) : prev;
  });

part1();
part2();
