import { readFileSync } from "fs";
import { clone, times } from "lodash";

const input = readFileSync("input.txt", "utf-8");

type coordinates = {
  x: number
  y: number
}

export function part1(data) {
  const head: coordinates = { x: 1, y: 1 }
  const tail: coordinates = { x: 1, y: 1 }
  let visited: Set<string> = new Set()
  visited.add('1,1')

  const instructions = data.split('\n').map((line) => {
    const [direction, distance] = line.split(' ')
    return { direction, distance: parseInt(distance) }
  })

  instructions.forEach(({ direction, distance }) => {
    console.log(`direction: ${direction}, distance: ${distance}`)
    times(distance, () => {
      switch (direction) {
        case 'R':
          head.x += 1
          break
        case 'L':
          head.x -= 1
          break
        case 'U':
          head.y += 1
          break
        case 'D':
          head.y -= 1
          break
      }
      if (tailNotTouchingHead(head, tail)) {
        const result = moveTail(head, tail);
        tail.x = result.x;
        tail.y = result.y;
        visited.add(`${tail.x},${tail.y}`)
      }
    })
  })

  return visited.size
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  console.log('...');
}
console.log(`Part 2: ${part2(input)}`);

// Private functions
function tailNotTouchingHead(head: coordinates, tail: coordinates) {
  // return false if the tail is not touching the head vertically, horizontally, or diagonally
  if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
    return true
  }

  return false
}

function moveTail(head: coordinates, tail: coordinates): coordinates {
  const result = clone(tail)

  if (head.x === tail.x) {
    // head is directly above or below the tail
    if (head.y > tail.y) {
      result.y += 1
    } else {
      result.y -= 1
    }
  }

  if (head.y === tail.y) {
    // head is directly left or right of the tail
    if (head.x > tail.x) {
      result.x += 1
    } else {
      result.x -= 1
    }
  }

  if (head.x !== tail.x && head.y !== tail.y) {
    // head is diagonally from the tail
    if (head.x > tail.x) {
      result.x += 1
    } else {
      result.x -= 1
    }

    if (head.y > tail.y) {
      result.y += 1
    } else {
      result.y -= 1
    }
  }

  return result
}