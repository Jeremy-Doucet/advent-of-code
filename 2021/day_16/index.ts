import { chain, findIndex, max, min, reduce, sum } from "lodash";
import input from "./input.json";

const part1 = () => {
  const decoder = new Decoder(input[0]);

  console.log(`Part 1: ${decoder.getSumOfVersionNumbers()}`);
};

const part2 = () => {
  const decoder = new Decoder(input[0]);

  console.log(`Part 2: ${decoder.packet.getValue()}`);
};

export class Decoder {
  byteString: string;
  packet: Packet;

  constructor(hexString: string) {
    this.byteString = this.toByteString(hexString);
    this.packet = new Packet(this.byteString);
  }

  getSumOfVersionNumbers() {
    return this.packet.getNestedVersionNumbers()
  }

  private hexToByteMap(s) {
    switch (s) {
      case "0":
        return "0000";
      case "1":
        return "0001";
      case "2":
        return "0010";
      case "3":
        return "0011";
      case "4":
        return "0100";
      case "5":
        return "0101";
      case "6":
        return "0110";
      case "7":
        return "0111";
      case "8":
        return "1000";
      case "9":
        return "1001";
      case "A":
        return "1010";
      case "B":
        return "1011";
      case "C":
        return "1100";
      case "D":
        return "1101";
      case "E":
        return "1110";
      case "F":
        return "1111";
    }
  }
  private toByteString(hexString: string) {
    return hexString
      .split("")
      .map((s) => this.hexToByteMap(s))
      .join("");
  }
}

export class Packet {
  byteString: string;
  validByteString: string;
  version: number;
  type: number;
  subpackets: Packet[];
  value: number;

  numberOfSubPackets?: number;
  lengthOfSubPackets?: number;

  constructor(str: string) {
    this.byteString = str;
    this.version = parseInt(str.substring(0, 3), 2);
    this.type = parseInt(str.substring(3, 6), 2);
    this.subpackets = this.findValidSubPackets();
    this.validByteString = this.getValidByteString() || '';
    this.value = this.getValue();
  }

  findValidSubPackets() {
    const results: Packet[] = [];
    if (this.type === 4) return results;
    else {
      if (this.byteString[6] === "0") {
        // the next 15 bits are a number that represents the total length in bits
        // of the sub-packets contained by this packet.
        this.lengthOfSubPackets = parseInt(this.byteString.substring(7, 22), 2);
        let subpacketStr = this.byteString.substring(
          22,
          22 + this.lengthOfSubPackets
        );
        while (subpacketStr.length > 0) {
          const subpacket = new Packet(subpacketStr);
          results.push(subpacket);
          subpacketStr = subpacketStr.substring(subpacket.validByteString?.length || 0);
        }
      } else {
        // the next 11 bits are a number that represents the number of sub-packets
        // immediately contained by this packet.
        this.numberOfSubPackets = parseInt(this.byteString.substring(7, 18), 2);
        let subpacketStr = this.byteString.substring(18);
        while (subpacketStr.length > 0 && results.length < this.numberOfSubPackets) {
          const subpacket = new Packet(subpacketStr);
          results.push(subpacket);
          subpacketStr = subpacketStr.substring(subpacket.validByteString?.length || 0);
        }
      }

      return results;
    }
  }

  getValue() {
    switch(this.type) {
      case 0:
        return sum(this.subpackets.map((p) => p.getValue()))
      case 1:
        return reduce(this.subpackets.map((p) => p.getValue()), (acc, v) => acc * v, 1);
      case 2:
        return min(this.subpackets.map((p) => p.getValue()));
      case 3:
        return max(this.subpackets.map((p) => p.getValue()));
      case 4:
        return this.handleLiteralNumber();
      case 5:
        return (this.subpackets[0].getValue() > this.subpackets[1].getValue()) ? 1 : 0
      case 6:
        return (this.subpackets[0].getValue() < this.subpackets[1].getValue()) ? 1 : 0
      case 7:
        return (this.subpackets[0]?.getValue() === this.subpackets[1]?.getValue()) ? 1 : 0
    }
  }

  header() {
    if (this.type === 4) return this.byteString.substring(0, 6);
    else return (this.numberOfSubPackets) ? this.byteString.substring(0, 18) : this.byteString.substring(0, 22);
  }

  getValidByteString() {
    if (this.type === 4) {
      const chunk = chain(this.byteString.substring(6))
        .split("")
        .chunk(5)
        .map((chunk) => chunk.join(""))
        .value();
      const idx = findIndex(chunk, (s) => s[0] === "0");
      return this.header() + chunk.slice(0, idx + 1).join("");
    } else {
      return this.header() + this.subpackets.map((p) => p.validByteString).join("");
    }
  }

  getNestedVersionNumbers() {
    return this.version + (sum(this.subpackets.map((p) => p.getNestedVersionNumbers())) || 0);
  }

  private handleLiteralNumber() {
    const chunks = chain(this.byteString.substring(6))
      .split("")
      .chunk(5)
      .map((chunk) => chunk.join(""))
      .value();

    const idx = findIndex(chunks, (s) => s[0] === "0");
    return chain(chunks.slice(0, idx + 1))
      .map((c) => c.substring(1))
      .join("")
      .parseInt(2)
      .value();
  }
}

part1();
part2();
