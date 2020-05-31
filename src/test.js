const AvaHDWallet = require('./index.js')

AvaHDWallet.setPath("m/44/570/0"); // -> m/44'/570'/0
const wallet = AvaHDWallet.fromMnemonic("yard car primary pill service grid state slice marriage album lawn vapor")

wallet.publicKey  // -> X-JH34kY3m3ofieGSQ631HPZy223eK8BSVe
wallet.privateKey  // -> 247fonz8n3ZVAYmjRgdL54eY11uRy2kHU7ncyD7RyGj4oN22wm

console.log(wallet)

AvaHDWallet.setPath("m/0/1"); // -> m/44'/570'/19'
console.log(AvaHDWallet.fromExtendedPublicKey(wallet.publicExtendedKey))
console.log(AvaHDWallet.fromExtendedPrivateKey(wallet.privateExtendedKey))