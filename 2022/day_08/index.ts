import { readFileSync } from "fs";
import { every, max, some } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  const heightMap = data.split('\n').map(line => line.split('').map(char => parseInt(char, 10)));
  const width = heightMap[0].length;
  const height = heightMap.length;

  const edgeVisibleCount = (width - 1) * 2 + (height - 1) * 2;

  // edges are visible by default
  let insideVisibleCount = 0;
  for(let i = 1; i < height - 1; i++) {
    for(let j = 1; j < width - 1; j++) {
      if (isVisible(heightMap, i, j)) insideVisibleCount += 1
    }
  }

  return insideVisibleCount + edgeVisibleCount;
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  const heightMap = data.split('\n').map(line => line.split('').map(char => parseInt(char, 10)));
  const width = heightMap[0].length;
  const height = heightMap.length;

  let scores: number[] = [];
  for(let i = 1; i < height - 1; i++) {
    for(let j = 1; j < width - 1; j++) {
      scores.push(getScenicScore(heightMap, i, j))
    }
  }

  return max(scores);
}
console.log(`Part 2: ${part2(input)}`);

// Private functions
function isVisible(heightMap: number[][], row: number, col: number) {
  return some([
    // up
    every((heightMap.slice(0, row)), (val) => val[col] < heightMap[row][col]),
    // down
    every((heightMap.slice(row + 1)), (val) => val[col] < heightMap[row][col]),
    // left
    every((heightMap[row].slice(0, col)), (val) => val < heightMap[row][col]),
    // right
    every((heightMap[row].slice(col + 1)), (val) =>  val < heightMap[row][col])
  ])
}

function getScenicScore(heightMap: number[][], row: number, col: number) {
  // up
  let up = 0
  for(let i = row - 1; i >= 0; i--) {
    up += 1
    if (heightMap[i][col] >= heightMap[row][col]) {
      break;
    }
  }

  // down
  let down = 0
  for(let i = row + 1; i < heightMap.length; i++) {
    down += 1
    if (heightMap[i][col] >= heightMap[row][col]) {
      break;
    }
  }

  // left
  let left = 0
  for(let i = col - 1; i >= 0; i--) {
    left += 1
    if (heightMap[row][i] >= heightMap[row][col]) {
      break;
    }
  }

  // right
  let right = 0
  for(let i = col + 1; i < heightMap[row].length; i++) {
    right += 1
    if (heightMap[row][i] >= heightMap[row][col]) {
      break;
    }
  }

  return (left * right * up * down) || -1;
}