import input from "./input.json";
import { chain, find, findKey, intersection } from "lodash";

const part1 = () => {
  const result = chain(input)
    .map((x) => x.split("|")[1])
    .map((x) => x.split(" "))
    .flatten()
    .filter((x) => [2, 3, 4, 7].includes(x.length))
    .value().length;

  console.log(`Part 1: ${result}`);
};

const part2 = () => {
  const result = chain(input)
    .map((x) => x.split(" | "))
    .map((x) => ({
      input: x[0]
        .split(/\s+/)
        .flat()
        .map((y) => y.split("").sort().join("")),
      output: x[1]
        .split(/\s+/)
        .flat()
        .map((y) => y.split("").sort().join("")),
    }))
    .map((x) => decodeMessage(x))
    .sum()
    .value();

  console.log(`Part 2: ${JSON.stringify(result, null, 2)}`);
};

const decodeMessage = ({
  input,
  output,
}: {
  input: string[];
  output: string[];
}) => {
  const definitions = buildDefinitions(input);
  return chain(output)
    .map((x) => findKey(definitions, (y) => y === x) || "")
    .join("")
    .parseInt()
    .value();
};

const buildDefinitions = (input: string[]): Definitions => {
  const definitions = {};
  definitions["1"] = find(input, (x) => x.length === 2);
  definitions["7"] = find(input, (x) => x.length === 3);
  definitions["4"] = find(input, (x) => x.length === 4);
  definitions["8"] = find(input, (x) => x.length === 7);

  definitions["5"] = chain(input)
    .filter((x) => x.length === 5)
    .filter(
      (x) => intersection(x.split(""), definitions["1"].split("")).length === 1
    )
    .filter(
      (x) => intersection(x.split(""), definitions["4"].split("")).length === 3
    )
    .head()
    .value();

  definitions["3"] = chain(input)
    .filter((x) => x.length === 5)
    .filter(
      (x) => intersection(x.split(""), definitions["1"].split("")).length === 2
    )
    .head()
    .value();

  definitions["2"] = chain(input)
    .filter((x) => x.length === 5)
    .filter((x) => x !== definitions["3"] && x !== definitions["5"])
    .head()
    .value();

  definitions["6"] = chain(input)
    .filter((x) => x.length === 6)
    .filter(
      (x) => intersection(x.split(""), definitions["1"].split("")).length === 1
    )
    .head()
    .value();

  definitions["9"] = chain(input)
    .filter((x) => x.length === 6)
    .filter(
      (x) => intersection(x.split(""), definitions["3"].split("")).length === 5
    )
    .head()
    .value();

  definitions["0"] = chain(input)
    .filter((x) => x.length === 6)
    .filter((x) => x !== definitions["6"] && x !== definitions["9"])
    .head()
    .value();

  return definitions;
};

type Definitions = {
  [key: string]: string;
};

part1();
part2();
