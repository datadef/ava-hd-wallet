const AvaHDWallet = require('./index.js')

// set chain (default is "X")
AvaHDWallet.setChainId("19");
const mnemonic = AvaHDWallet.generateMnemonic();
const wallet = AvaHDWallet.fromMnemonic(mnemonic)

console.log(wallet)