import { clone, forEach, max, min, times, transform, values } from "lodash";
import input from "./input.json";

const part1 = () => {
  const machine = new PolymerizationMachine(input);
  times(10, () => machine.run());

  const counts = machine.getCountsForEachLetter()
  const maxCount = max(values(counts)) || 0;
  const minCount = min(values(counts)) || 0;
  console.log(`Part 1: ${maxCount - minCount}  `)
};

const part2 = () => {
  const machine = new PolymerizationMachine(input);
  times(40, () => machine.run());

  const counts = machine.getCountsForEachLetter()
  const maxCount = max(values(counts)) || 0;
  const minCount = min(values(counts)) || 0;
  console.log(`Part 2: ${maxCount - minCount}  `)
};

class PolymerizationMachine {
  current: { [key: string]: number } = {};
  fresh: { [key: string]: number } = {};
  mapping: { [key: string]: string[] } = {};

  constructor(data) {
    forEach(data.instructions, (instruction) => {
      const [input, output] = instruction.split(" -> ");
      this.mapping[input] = [
        `${input.split("")[0]}${output}`,
        `${output}${input.split("")[1]}`,
      ];
      this.current[input] = 0;
      this.fresh[input] = 0;
    });
    const strArray = data.starting.split("");
    forEach(strArray, (char: string, idx: number) => {
      if (idx >= strArray.length - 1) return;
      this.current[`${char}${strArray[idx + 1]}`]++;
    });
  }

  getCountsForEachLetter(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    forEach(this.current, (count, pair) => {
      const [a, b] = pair.split("");
      if (counts[a] === undefined) counts[a] = 0;
      if (counts[b] === undefined) counts[b] = 0;

      if (a === b) counts[a] += count * 2;
      else {
        counts[a] += count;
        counts[b] += count;
      }
    });
    return transform(
      counts,
      (result, counts, letter) =>
        (result[letter] = Math.ceil(counts/ 2)),
      {}
    );
  }

  run() {
    const results = clone(this.fresh);
    forEach(this.current, (count, pair) => {
      forEach(this.mapping[pair], (newPairs) => {
        results[newPairs] += count;
      });
    });
    this.current = results;
  }
}

part1();
part2();
