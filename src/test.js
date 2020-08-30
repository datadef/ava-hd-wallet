const AvaHDWallet = require('./index.js')

AvaHDWallet.setPath("m/44'/9000'/0");
const wallet = AvaHDWallet.fromMnemonic("mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp")

AvaHDWallet.setPath("m/0/1");

console.log(wallet)
console.log(AvaHDWallet.fromExtendedPublicKey(wallet.publicExtendedKey))
console.log(AvaHDWallet.fromExtendedPrivateKey(wallet.privateExtendedKey))