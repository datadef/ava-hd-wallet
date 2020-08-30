const AvaHDWallet = require('./index.js')


const wallet = AvaHDWallet.fromMnemonic("mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp")

console.log(wallet)

console.log(AvaHDWallet.fromExtendedPrivateKey('xprvA3NKFPg6VHEwfLt7Q2pmB7CknT5QbBt6q6Z69pUBC2rJzUu56zrQv3ASW8zCPfHMDWNkZpP3mvRzKYyp6AH6srnujeiXTttCDrurXKM6RkC'))