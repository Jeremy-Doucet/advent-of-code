import { readFileSync } from "fs";
import { chain, find, min } from "lodash";

const input = readFileSync("input.txt", "utf-8");

enum ObjType {
  SEED = "SEED",
  SOIL = "SOIL",
  FERTILIZER = "FERTILIZER",
  WATER = "WATER",
  LIGHT = "LIGHT",
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY",
  LOCATION = "LOCATION",
}

type Range = {
  sourceMin: number;
  sourceMax: number;
  desinationMin: number;
  destinationMax: number;
  // Offset is positive. Add offset to source to get destination.
  offset: number;
};

type RecordMap = {
  source: ObjType;
  destination: ObjType;
  ranges: Range[];
};

type ResultObj = {
  seedToSoil: RecordMap;
  soilToFertilizer: RecordMap;
  fetilizerToWater: RecordMap;
  waterToLight: RecordMap;
  lightToTemperature: RecordMap;
  temperatureToHumidity: RecordMap;
  humidityToLocation: RecordMap;
};

export function part1(data) {
  const { seeds, result } = parseResultObj(data);

  const locations = seeds.map((seed) =>
    findLocation(seed, ObjType.SEED, result)
  );

  return min(locations);
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data) {
  // NOTE: Brute force obviously won't work for millions and millions of seeds. Will rework to use ranged later today.
  // const { seeds, result } = parseResultObj(data, true);
  // const locations = seeds.map((seed) =>
  //   findLocation(seed, ObjType.SEED, result)
  // );
  // return min(locations);
}
console.log(`Part 2: ${part2(input)}`);

// Private functions

function findLocation(
  id: number,
  objectType: ObjType,
  resultObj: ResultObj
): number {
  // console.log(`id: ${id}, objectType: ${objectType}`);

  if (objectType === ObjType.LOCATION) return id;

  const recordMap = find(resultObj, (x) => x.source === objectType);

  if (!recordMap) throw new Error(`No record map found for ${objectType}`);

  const range = find(
    recordMap.ranges,
    (x) => id >= x.sourceMin && id < x.sourceMax
  );

  // console.log(`range: ${JSON.stringify(range)}`);

  if (!range) {
    return findLocation(id, recordMap.destination, resultObj);
  }

  return findLocation(id + range.offset, recordMap.destination, resultObj);
}

function parseResultObj(
  data: string,
  seedRange = false
): { seeds: number[]; result: ResultObj } {
  const [
    seedList,
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  ] = data.split("\n\n");

  const seeds = seedList
    .split(": ")[1]
    .split(/\s+/)
    .map((x) => parseInt(x));

  return {
    // If seedRange is true, then chunk the seeds array into groups of 2 (starting, range), and create an array with the full range of seeds in each group.
    seeds: seedRange
      ? chain(seeds)
          .chunk(2)
          .map(([start, range]) =>
            Array.from(Array(range), (_, i) => i + start)
          )
          .flatten()
          .value()
      : seeds,
    result: {
      seedToSoil: {
        source: ObjType.SEED,
        destination: ObjType.SOIL,
        ranges: parseRanges(seedToSoilMap),
      },
      soilToFertilizer: {
        source: ObjType.SOIL,
        destination: ObjType.FERTILIZER,
        ranges: parseRanges(soilToFertilizerMap),
      },
      fetilizerToWater: {
        source: ObjType.FERTILIZER,
        destination: ObjType.WATER,
        ranges: parseRanges(fertilizerToWaterMap),
      },
      waterToLight: {
        source: ObjType.WATER,
        destination: ObjType.LIGHT,
        ranges: parseRanges(waterToLightMap),
      },
      lightToTemperature: {
        source: ObjType.LIGHT,
        destination: ObjType.TEMPERATURE,
        ranges: parseRanges(lightToTemperatureMap),
      },
      temperatureToHumidity: {
        source: ObjType.TEMPERATURE,
        destination: ObjType.HUMIDITY,
        ranges: parseRanges(temperatureToHumidityMap),
      },
      humidityToLocation: {
        source: ObjType.HUMIDITY,
        destination: ObjType.LOCATION,
        ranges: parseRanges(humidityToLocationMap),
      },
    },
  };
}

function parseRanges(data: string): Range[] {
  const [_name, ...rows] = data.split("\n");

  return rows.map((row) => {
    const [destination, source, range] = row
      .split(/\s+/)
      .map((x) => parseInt(x));

    return {
      sourceMin: source,
      sourceMax: source + range,
      desinationMin: destination,
      destinationMax: destination + range,
      offset: destination - source,
    };
  });
}
