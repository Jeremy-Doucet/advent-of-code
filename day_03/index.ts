import input from './input.json';
import {chain, each, filter} from 'lodash'

const mostCommonDigits = (input: string[]): string => {
  return chain(input)
    .map((byte: string) => 
      byte.split('').map((digit) => ({
        0: digit === '0' ? 1 : 0,
        1: digit === '1' ? 1 : 0,
      }))
    )
    .reduce((acc, byte) => {
      each(byte, (obj, idx) => {
        acc[idx] ||= { 0: 0, 1: 0 };
        acc[idx][0] += obj[0];
        acc[idx][1] += obj[1];
      })
      return acc
    }, [])
    .map((position) => {
      return (position[1] >= position[0]) ? '1' : '0'
    })
    .join('')
    .value()
}

// returns the inverse of a binary string
const inverse = (input: string) => input.split('').map((digit) => digit === '0' ? '1' : '0').join('')

const part1 = () => {
  const mostCommon = mostCommonDigits(input);
  const gamma = parseInt(mostCommon, 2);
  const epsilon = parseInt(inverse(mostCommon), 2);

  console.log(`Part 1 Gamma: ${gamma}`);
  console.log(`Part 1 Epsilon: ${epsilon}`);
  console.log(`Part 1 Result: ${gamma * epsilon}`);
}

part1()

const compareMask = (input: string[], position, cb) => {
  const mask = cb(input);

  const result = filter(input, (byte) => {
    return byte[position] === mask[position];
  })

  if (result.length === 1) return result
  return compareMask(result, position + 1, cb)
}

const part2 = () => {
  const oxygen = compareMask(input, 0, (results) => mostCommonDigits(results));
  const co2 = compareMask(input, 0, (results) => inverse(mostCommonDigits(results)));

  console.log(`Part 2 Oxygen: ${oxygen}`);
  console.log(`Part 2 CO2: ${co2}`);
  console.log(`Part 2 Result: ${parseInt(oxygen, 2) * parseInt(co2, 2)}`);
}

part2()