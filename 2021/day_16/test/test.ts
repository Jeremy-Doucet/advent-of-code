import { expect } from "chai";
import { Decoder } from "../index";

describe("Packets", () => {
  describe("D2FE28", () => {
    const str = "D2FE28";
    shouldReturnTheCorrectData(str, "110100101111111000101", 6, 4);
    it("returns the correct value", () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(2021);
    });
  });

  describe("38006F45291200", () => {
    const str = "38006F45291200";
    shouldReturnTheCorrectData(str, "0011100000000000011011110100010100101001000100100", 1, 6);

    it('has a subpacket length of 27', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.lengthOfSubPackets).to.equal(27);
    })

    it('has 2 sub-packets', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.subpackets.length).to.equal(2);
    })

    it('has a subpacket with a value of 10', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.subpackets[0].type).to.equal(4);
      expect(decoder.packet.subpackets[0].getValue()).to.equal(10);
    })

    it('has a subpacket with a value of 20', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.subpackets[1].type).to.equal(4);
      expect(decoder.packet.subpackets[1].getValue()).to.equal(20);
    })
  });

  describe('C200B40A82', () => {
    const str = 'C200B40A82';
    it('sums 1 and 2 for a value of 3', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(3);
    })
  })
  describe('04005AC33890', () => {
    const str = '04005AC33890';
    it('finds the product of 6 and 9 for a value of 54', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(54);
    })
  })
  describe('880086C3E88112', () => {
    const str = "880086C3E88112"
    it("finds the minimum of 7, 8, and 9", () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(7);
    })
  })
  describe('CE00C43D881120', () => {
    const str = "CE00C43D881120"
    it("finds the maximum of 7, 8, and 9", () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(9);
    })
  })
  describe('D8005AC2A8F0', () => {
    const str = "D8005AC2A8F0"
    it('returns 1 because 5 is less than 15', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(1);
    })
  })

  describe('F600BC2D8F', () => {
    const str = "F600BC2D8F"
    it('returns 0 because 5 is not greater than 15', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(0);
    })
  })

  describe('9C005AC2F8F0', () => {
    const str = "9C005AC2F8F0"
    it('returns 0 because 5 is not equal to 15', () => {
      const decoder = new Decoder(str);
      expect(decoder.packet.getValue()).to.equal(0);
    })
  })

  describe('9C0141080250320F1802104A08', () => {
    const str = "9C0141080250320F1802104A08"
    it('returns 1 because 1 + 3 = 2 * 2', () => {
      const decoder = new Decoder(str)
      expect(decoder.packet.getValue()).to.equal(1);
    })
  })
});

function shouldReturnTheCorrectData(hexString: string, validString, version, type) {
  it("returns the correct byte string", () => {
    const decoder = new Decoder(hexString);
    expect(decoder.packet.validByteString).to.equal(validString);
  });
  it("returns the correct version", () => {
    const decoder = new Decoder(hexString);
    expect(decoder.packet.version).to.equal(version);
  });
  it("returns the correct type", () => {
    const decoder = new Decoder(hexString);
    expect(decoder.packet.type).to.equal(type);
  });
}