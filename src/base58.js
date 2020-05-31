const BN = require("bn.js")

class Base58 {
    constructor() {
        this.b58alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        this.alphabetIdx0 = '1'
        this.b58 = [
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 0, 1, 2, 3, 4, 5, 6,
            7, 8, 255, 255, 255, 255, 255, 255,
            255, 9, 10, 11, 12, 13, 14, 15,
            16, 255, 17, 18, 19, 20, 21, 255,
            22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 255, 255, 255, 255, 255,
            255, 33, 34, 35, 36, 37, 38, 39,
            40, 41, 42, 43, 255, 44, 45, 46,
            47, 48, 49, 50, 51, 52, 53, 54,
            55, 56, 57, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255
        ]
        this.big58Radix = new BN(58);
        this.bigZero = new BN(0);
    }

    /**
 * Encodes a {@link https://github.com/feross/buffer|Buffer} as a base-58 string
 * 
 * @param buff A {@link https://github.com/feross/buffer|Buffer} to encode
 * 
 * @returns A base-58 string.
 */
    encode(buff) {
        let x = new BN(buff.toString("hex"), "hex", "be");
        let answer = "";// = Buffer.alloc(buff.length*136/100, 0);
        while (x.cmp(this.bigZero) > 0) {
            let mod = x.mod(this.big58Radix);
            x = x.div(this.big58Radix);
            answer += this.b58alphabet[mod.toNumber()];
        }

        for (let i = 0; i < buff.length; i++) {
            if (buff.readUInt8(i) != 0) {
                break;
            }
            answer += this.alphabetIdx0;
        }
        return answer.split("").reverse().join("");
    }

    /**
     * Dencodes a base-58 into a {@link https://github.com/feross/buffer|Buffer}
     * 
     * @param b A base-58 string to decode
     * 
     * @returns A {@link https://github.com/feross/buffer|Buffer} from the decoded string.
     */
    decode(b) {
        let answer = new BN(0);
        let j = new BN(1);

        for (let i = b.length - 1; i >= 0; i--) {
            let tmp = this.b58[b.charCodeAt(i)];
            if (tmp == 255) {
                throw new Error(`Error - Base58.decode: not a valid base58 string`);
            }
            let scratch = new BN(tmp);
            scratch.imul(j);
            answer.iadd(scratch);
            j.imul(this.big58Radix);
        }

        let anshex = answer.toString("hex");
        anshex = anshex.length % 2 ? "0" + anshex : anshex;

        let tmpval = Buffer.from(anshex, "hex");
        let numZeros;
        for (numZeros = 0; numZeros < b.length; numZeros++) {
            if (b[numZeros] != this.alphabetIdx0) {
                break;
            }
        }
        let xlen = numZeros + tmpval.length;
        let result = Buffer.alloc(xlen, 0);
        tmpval.copy(result, numZeros);

        return result;
    }

}

module.exports = new Base58