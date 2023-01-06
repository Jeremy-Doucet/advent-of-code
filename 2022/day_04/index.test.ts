import { readFileSync } from "fs"
import { part1, part2 } from "."

describe('Day 04', () => {
  describe('Part 1', () => {
    test('It returns the expected value', () => {
      const input = readFileSync("input.test.txt", "utf-8").toString()
      expect(part1(input)).toBe(2)
    })
  })

  describe('Part 2', () => {
    test('It returns the expected value', () => {
      const input = readFileSync("input.test.txt", "utf-8").toString()
      expect(part2(input)).toBe(4)
    })
  })
})