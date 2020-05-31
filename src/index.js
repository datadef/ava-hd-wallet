const bip39 = require("bip39");
const createHash = require("create-hash");
const hdkey = require("hdkey");
const Base58 = require("./base58");

class AvaHDWallet {
  constructor() {
    this.wallet;
    this.entropy = 128;
    this.chain_id = 'X';
    this.path = 0;
  }

  /*
   * Hash pubkey twice. This obfuscates and shortens it.
   * @param public
   */
  obfuscatePubKey(pub) {
    if (pub.length == 65) {
      pub = Buffer.from(ec.keyFromPublic(pub).getPublic(true, "hex"), "hex"); //make compact, stick back into buffer
    }
    if (pub.length == 33) {
      let sha256 = Buffer.from(createHash('sha256').update(pub).digest());
      let ripesha = Buffer.from(createHash('rmd160').update(sha256).digest());
      return ripesha;
    }
  }

  /*
  * Takes a Buffer and adds a checksum, returning a Buffer with the 4-byte checksum appended.
  * @param public
  */
  appendChecksum(buff) {
    return Buffer.concat([buff, Buffer.from(createHash("sha256").update(buff).digest().slice(28))]);
  }

  /*
  * Takes a Buffer and returns a base-58 string with checksum as per the AVA standard.
  * @param bytes
  */
  serializeWChecksum(bytes) {
    return Base58.encode(Buffer.from(this.appendChecksum(bytes)));
  }

  /*
  * Takes a Buffer and returns a base-58 string with checksum as per the AVA standard.
  * @param path
  */
  getKeypair() {
    const result = {
      publicKey: this.getPublicKey(),
      privateKey: this.getPrivateKey()
    }
    return result
  }

  /*
  * Return public key
  */
  getPublicKey() {
    const obfuscate = this.obfuscatePubKey(this.wallet._publicKey)
    return this.chain_id + "-" + this.serializeWChecksum(obfuscate);
  }

  /*
  * Return private key
  */
  getPrivateKey() {
    return this.serializeWChecksum(this.wallet._privateKey);
  }

  /*
  * Generate mnemonic
  */
  generateMnemonic() {
    this.mnemonic = bip39.generateMnemonic(this.entropy);
    return this.mnemonic;
  }

  /*
  * Convert mnemonic to seed
  * @param mnemonic
  */
  fromMnemonic(mnemonic) {
    const m = bip39.mnemonicToSeedSync(mnemonic);
    this.wallet = hdkey.fromMasterSeed(m);
    this.wallet = this.wallet.derive(`m/44'/570'/${this.path}'`);
    return this.getKeypair()
  }

  /*
  * Set chain id. Default is "X"
  * @param chain_id
  */
  setChainId(chain_id) {
    this.chain_id = chain_id;
  }

  /*
  * Set BIP39 entropy value
  * @param entropy - default is 128 which is equal to 12 words mnemonic
  */
  setEntropy(entropy) {
    this.entropy = entropy;
  }

  /*
  * Set derive path
  * @param path
  */
  setPath(path) {
    this.path = path;
  }
}

module.exports = new AvaHDWallet();