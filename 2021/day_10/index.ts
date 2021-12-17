import { chain } from "lodash";
import input from "./input.json";

const part1 = () => {
  const result = chain(input)
    .map(removeComplete)
    .map(findIllegalClosing)
    .filter((x) => x)
    .map((x) => x[0])
    .map((x) => getIllegalValue(x))
    .sum()
    .value();

  console.log(`Part 1: ${result}`);
};

const part2 = () => {
  const vals = chain(input)
    .map(removeComplete)
    .filter((x) => !findIllegalClosing(x))
    .map((x) => findMatchingClosing(x.split(""), []))
    .map((x) => scoreClosingBraces(x, 0, 0))
    .sortBy(x => x)
    .value();

  const result = vals[Math.floor(vals.length / 2)];

  console.log(`Part 2: ${result}`);
};

const removeComplete = (str: string) => {
  const r = /(\{\}|\(\)|\<\>|\[\])/g;
  const result = str.replace(r, "");
  return result.match(r) ? removeComplete(result) : result;
};

const findIllegalClosing = (str: string) => {
  const r = /[\}\]\>\)]/g;
  return str.match(r);
};

const findMatchingClosing = (input: string[], output: string[]): string => {
  if (input.length === 0) {
    return output.join("");
  }
  output.push(getClosingBrace(input.pop()!));
  return findMatchingClosing(input, output);
};

const scoreClosingBraces = (str: string, score: number, idx) => {
  if (idx === str.length) return score;
  return scoreClosingBraces(
    str,
    score * 5 + getClosingBraceScore(str[idx]),
    idx + 1
  );
};

const getIllegalValue = (str: string) => {
  switch (str) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
  }

  return 0;
};

const getClosingBraceScore = (str: string) => {
  switch (str) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }

  return 0;
};

const getClosingBrace = (str: string) => {
  switch (str) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
  }

  return "";
};

part1();
part2();
