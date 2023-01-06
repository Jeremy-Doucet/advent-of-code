import { readFileSync } from "fs"
import { part1, part2 } from "."

describe('Day 06', () => {
  describe('Part 1', () => {
    test('It returns the expected value', () => {
      const input = readFileSync("input.test.txt", "utf-8").toString()
      expect(part1(input)).toBe(7)
    })

    test('It returns the expected value', () => {
      expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
    })

    test('It returns the expected value', () => {
      expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
    })

    test('It returns the expected value', () => {
      expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
    })

    test('It returns the expected value', () => {
      expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
    })
  })

  describe('Part 2', () => {
    test('It returns the expected value', () => {
      const input = readFileSync("input.test.txt", "utf-8").toString()
      expect(part2(input)).toBe(19)
    })

    test('It returns the expected value', () => {
      expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
    })

    test('It returns the expected value', () => {
      expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
    })

    test('It returns the expected value', () => {
      expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29)
    })

    test('It returns the expected value', () => {
      expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26)
    })
  })
})