import { readFileSync } from "fs";
import { chain, every } from "lodash";

const input = readFileSync("input.txt", "utf-8");

type Game = {
  id: number;
  sets: Pull[][];
};

type Pull = {
  count: number;
  color: string;
};

export function part1(data) {
  const res = chain(data)
    .split("\n")
    .map((x) => parseGame(x))
    .filter((x) => gameIsPossible(x))
    .map((x) => x.id)
    .sum()
    .value();

  return res;
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  const res = chain(data)
    .split("\n")
    .map((x) => parseGame(x))
    .map((x) => getMaxValues(x))
    .map((x) => x.red * x.green * x.blue)
    .sum()
    .value();

  return res;
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseGame(gameStr: string): Game {
  let [gameId, sets] = gameStr.split(": ");

  return {
    id: parseInt(gameId.split(" ")[1]),
    sets: sets.split("; ").map((y) =>
      y.split(", ").map((z) => ({
        count: parseInt(z.split(" ")[0]),
        color: z.split(" ")[1],
      }))
    ),
  };
}

function gameIsPossible(game: Game) {
  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;

  return every(game.sets, (set) => {
    const red = chain(set)
      .find((x) => x.color === "red")
      .get("count")
      .defaultTo(0)
      .value();
    const green = chain(set)
      .find((x) => x.color === "green")
      .get("count")
      .defaultTo(0)
      .value();
    const blue = chain(set)
      .find((x) => x.color === "blue")
      .get("count")
      .defaultTo(0)
      .value();

    return red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE;
  });
}

// Find the maximum value for each color in a game
function getMaxValues(game: Game) {
  const red = chain(game.sets)
    .map((x) =>
      chain(x)
        .find((y) => y.color === "red")
        .get("count")
        .value()
    )
    .max()
    .value();
  const green = chain(game.sets)
    .map((x) =>
      chain(x)
        .find((y) => y.color === "green")
        .get("count")
        .value()
    )
    .max()
    .value();
  const blue = chain(game.sets)
    .map((x) =>
      chain(x)
        .find((y) => y.color === "blue")
        .get("count")
        .value()
    )
    .max()
    .value();

  return { red, green, blue };
}
