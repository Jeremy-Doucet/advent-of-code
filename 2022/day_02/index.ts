import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8").toString()

const oppMap = (opp: string) => {
  if (opp === 'A') return 'ROCK';
  if (opp === 'B') return 'PAPER';
  if (opp === 'C') return 'SCISSORS';
  return 'ROCK';
}

const myMap = (you: string) => {
  if (you === 'X') return 'ROCK';
  if (you === 'Y') return 'PAPER';
  if (you === 'Z') return 'SCISSORS';
  return 'ROCK';
}

const resultMap = (result: string) => {
  if (result === 'X') return 'LOSE';
  if (result === 'Y') return 'DRAW';
  if (result === 'Z') return 'WIN';
  return 'DRAW';
}

export function part1(data) {
  return data.split('\n').reduce((acc, round) => {
    const [opp, you] = round.split(' ');
    return getRoundScore(oppMap(opp), myMap(you)) + acc;
  }, 0);
}
// 13484
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  return data.split('\n').reduce((acc, round) => {
    const [opp, result] = round.split(' ');
    const you = determineHand(oppMap(opp), resultMap(result));
    return getRoundScore(oppMap(opp), you) + acc;
  }, 0)
}
console.log(`Part 2: ${part2(input)}`);

// private functions

function getRoundScore(opp: string, you: string) {
  return scoreMyHand(you) + scoreRound(opp, you);
}

function scoreMyHand(you: string) {
  switch(you) {
    case 'ROCK':
      return 1;
    case 'PAPER':
      return 2;
    case 'SCISSORS':
      return 3;
    default:
      return 0;
  }
}

function scoreRound(opp: string, you: string) {
  if (opp === 'ROCK') {
    if (you === 'ROCK') return 3;
    if (you === 'PAPER') return 6;
    if (you === 'SCISSORS') return 0;
  } 

  if (opp === 'PAPER') {
    if (you === 'ROCK') return 0;
    if (you === 'PAPER') return 3;
    if (you === 'SCISSORS') return 6;
  }

  if (opp === 'SCISSORS') {
    if (you === 'ROCK') return 6;
    if (you === 'PAPER') return 0;
    if (you === 'SCISSORS') return 3;
  }

  return 0;
}

function determineHand(opp: string, result: string) {
  if (opp === 'ROCK') {
    if (result === 'LOSE') return 'SCISSORS';
    if (result === 'DRAW') return 'ROCK';
    if (result === 'WIN') return 'PAPER';
  } 

  if (opp === 'PAPER') {
    if (result === 'LOSE') return 'ROCK';
    if (result === 'DRAW') return 'PAPER';
    if (result === 'WIN') return 'SCISSORS';
  }

  if (opp === 'SCISSORS') {
    if (result === 'LOSE') return 'PAPER';
    if (result === 'DRAW') return 'SCISSORS';
    if (result === 'WIN') return 'ROCK';
  }

  return '';
}
