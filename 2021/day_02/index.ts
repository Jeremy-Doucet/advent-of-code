import input from './input.json';
import { each } from 'lodash';


const part1 = (input: string[]) => {
  const directionObj = { x: 0, y: 0 };
  each(input, (command, idx) => {
    const [direction, amount] = command.split(' ');
    switch (direction) {
      case 'up':
        console.log(`Moving up ${amount}, new value is ${directionObj.y - parseInt(amount, 10)}`);
        directionObj.y -= parseInt(amount, 10);
        break;
      case 'down':
        console.log(`Moving down ${amount}, new value is ${directionObj.y + parseInt(amount, 10)}`);
        directionObj.y += parseInt(amount, 10);
        break;
      case 'forward':
        console.log(`Moving forward ${amount}, new value is ${directionObj.x + parseInt(amount, 10)}`);
        directionObj.x += parseInt(amount, 10);
        break;
      default:
        throw new Error(`Unknown direction ${direction}`);
    }
  });

  return directionObj.x * directionObj.y;
}

console.log(`Part 1: ${part1(input)}`)

const part2 = (input: string[]) => {
  const directionObj = { x: 0, y: 0, aim: 0 };
  each(input, (command, idx) => {
    const [direction, amount] = command.split(' ');
    switch (direction) {
      case 'up':
        directionObj.aim -= parseInt(amount, 10);
        break;
      case 'down':
        directionObj.aim += parseInt(amount, 10);
        break;
      case 'forward':
        directionObj.x += parseInt(amount, 10);
        directionObj.y += directionObj.aim * parseInt(amount, 10);
        break;
      default:
        throw new Error(`Unknown direction ${direction}`);
    }
  });

  return directionObj.x * directionObj.y;
}

console.log(`Part 2: ${part2(input)}`)