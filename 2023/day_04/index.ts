import { readFileSync } from "fs";
import { chain, find, times } from "lodash";

const input = readFileSync("input.txt", "utf-8");

type ScratchCard = {
  have: number[];
  winning: number[];
  id: number;
  count: number;
  numMatchingNumbers?: number[];
};

export function part1(data) {
  const res = chain(data)
    .split("\n")
    .map(parseToScratchCard)
    .map(matchWinningNumbers)
    .map((x) => x.length)
    .map((x) => (x > 0 ? Math.pow(2, x - 1) : 0))
    .sum()
    .value();

  return res;
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  const res = chain(data)
    .split("\n")
    .map(parseToScratchCard)
    .map((x) => ({
      ...x,
      numMatchingNumbers: matchWinningNumbers(x).length,
    }))
    .each((x, idx, cards) => {
      if (x.numMatchingNumbers > 0) {
        times(x.numMatchingNumbers, (num) => {
          const card = find(cards, (card) => card.id === x.id + num + 1);
          if (!card) return;
          card.count += x.count;
        });
      }
    })
    .sumBy((x) => x.count)
    .value();

  return res;
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

// ex: Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
function parseToScratchCard(data: string): ScratchCard {
  const card = data.split(/:\s+/);

  const have = card[1]
    .split(/\s+[|]\s+/)[0]
    .split(/\s+/)
    .map((x) => parseInt(x));

  const winning = card[1]
    .split(/\s+[|]\s+/)[1]
    .split(/\s+/)
    .map((x) => parseInt(x));

  return { have, winning, id: parseInt(card[0].split(/\s+/)[1]), count: 1 };
}

function matchWinningNumbers(data: ScratchCard) {
  const { have, winning } = data;

  const res = winning.filter((x) => have.includes(x));

  return res;
}
