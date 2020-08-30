const bip39 = require("bip39");
const HDKey = require("hdkey");
const Avalanche = require("avalanche");

class AvaHDWallet {
  constructor() {
    this.wallet;
    this.ava_wallet;
    this.entropy = 256;
    this.chain_id = "X";
    this.path = `m/44'/9000'/0'`;
  }

  /*
   * Takes a Buffer and returns a base-58 string with checksum as per the AVA standard.
   * @param path
   */
  getKeypair() {
    const result = {
      publicKey: this.getPublicKey(),
      privateKey: this.getPrivateKey(),
      publicExtendedKey: this.wallet.publicExtendedKey,
      privateExtendedKey: this.wallet.privateExtendedKey,
    };
    return result;
  }

  /*
   * Return public key
   */
  getPublicKey() {
    return this.ava_wallet.getAddressString();
  }

  /*
   * Return private key
   */
  getPrivateKey() {
    return this.ava_wallet.getPrivateKeyString();
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
    let hrp = Avalanche.utils.getPreferredHRP(1);
    let keychain = new Avalanche.avm.AVMKeyChain(hrp, this.chain_id);

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);

    let derivationPath = `${this.path}`;
    let key = hdkey.derive(derivationPath);
    this.wallet = hdkey.derive(derivationPath);

    let privateKeyHEX = key.privateKey.toString("hex");
    let privateKeyBuffer = Buffer.from(privateKeyHEX, "hex");
    this.ava_wallet = keychain.importKey(privateKeyBuffer);

    var result = {
      publicKey: this.ava_wallet.getAddressString(),
      privateKey: this.ava_wallet.getPrivateKeyString(),
      publicExtendedKey: this.wallet.publicExtendedKey,
      privateExtendedKey: this.wallet.privateExtendedKey,
    };

    return result;
  }

  /*
   * Generate public key by given extended public key and derive path
   * @param mnemonic
   */
  fromExtendedPublicKey(extended_key) {
    let hrp = Avalanche.utils.getPreferredHRP(1);
    let keychain = new Avalanche.avm.AVMKeyChain(hrp, this.chain_id);

    var hdkey = HDKey.fromExtendedKey(extended_key);
    let derivationPath = `${this.path}`;
    let key = hdkey.derive(derivationPath);

    let pubKeyHEX = key.publicKey.toString("hex");
    let pubKeyBuffer = Buffer.from(pubKeyHEX, "hex");
    this.ava_wallet = keychain.importKey(pubKeyBuffer);

    var result = {
      publicKey: this.ava_wallet.getAddressString(),
      privateKey: null,
    };

    return result;
  }

  /*
   * Generate public key and private key by given extended private key and derive path
   * @param mnemonic
   */
  fromExtendedPrivateKey(extended_key) {
    let hrp = Avalanche.utils.getPreferredHRP(1);
    let keychain = new Avalanche.avm.AVMKeyChain(hrp, this.chain_id);

    var hdkey = HDKey.fromExtendedKey(extended_key);
    let derivationPath = `${this.path}`;
    let key = hdkey.derive(derivationPath);

    let privKeyHEX = key.publicKey.toString("hex");
    let privKeyBuffer = Buffer.from(privKeyHEX, "hex");
    this.ava_wallet = keychain.importKey(privKeyBuffer);

    var result = {
      publicKey: this.ava_wallet.getAddressString(),
      privateKey: this.ava_wallet.getPrivateKeyString(),
    };

    return result;
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
