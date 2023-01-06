import { readFileSync } from "fs";
import { chain, times } from "lodash";

const input = readFileSync("input.txt", "utf-8");

export function part1(data) {
  const [diagram, instructions] = chain(data).split('\n\n').map(line => line.split('\n')).value()
  const numColumns = chain(diagram.pop()).trim().split('').last().parseInt().value()

  const boxes = getBoxes(diagram, numColumns)

  instructions.forEach((line) => {
    const [_, countStr, fromStr, toStr] = [...line.matchAll(/move (\d+) from (\d+) to (\d+)/g)].flat()
    const count = parseInt(countStr)
    const from = parseInt(fromStr)
    const to = parseInt(toStr)

    const moveBoxes = boxes[from - 1].splice(-count).reverse()
    boxes[to - 1].push(...moveBoxes)
  })

  return boxes.map((row) => row.pop()).join('');
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  const [diagram, instructions] = chain(data).split('\n\n').map(line => line.split('\n')).value()
  const numColumns = chain(diagram.pop()).trim().split('').last().parseInt().value()

  const boxes = getBoxes(diagram, numColumns)

  instructions.forEach((line) => {
    const [_, countStr, fromStr, toStr] = [...line.matchAll(/move (\d+) from (\d+) to (\d+)/g)].flat()
    const count = parseInt(countStr)
    const from = parseInt(fromStr)
    const to = parseInt(toStr)

    const moveBoxes = boxes[from - 1].splice(-count)
    boxes[to - 1].push(...moveBoxes)
  })

  return boxes.map((row) => row.pop()).join('');
}
console.log(`Part 2: ${part2(input)}`);

// Private functions
function getBoxes(diagram, numColumns) {
  const boxes: string[][] = []

  const d = chain(diagram).clone().reverse().value()
  times(numColumns, (i) => {
    d.forEach((line) => {
      const char = line[i * 4 + 1]
      if (char.trim()) {
        if (!boxes[i]) boxes[i] = []
        boxes[i].push(char)
      }
    })
  })

  return boxes
}
