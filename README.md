# ava-hd-wallet

Hierarchical Deterministic Wallet for AVA

# Installation

Install it using npm:

    npm install --save ava-hd-wallet

# Usage

> Set mnemonic entropy (length) and generate mnemonic

    import AvaHDWallet from "ava-hd-wallet";

    // optional - set entropy (default is 256)
    AvaHDWallet.setEntropy(256); // -> 24 words mnemonic

    const mnemonic = AvaHDWallet.generateMnemonic();
    const wallet = AvaHDWallet.fromMnemonic(mnemonic)

    wallet.publicKey  // -> X-avax16d7a94xle7pvfztx7p4rct6dzr7dw8m2cwwtda
    wallet.privateKey  // -> PrivateKey-2kez3FVVHdubhSNYmgbHHeHY5Pn5p72v7ZLWLqUyEardJzeuGn

> Generate keypair using specific mnemonic

    import AvaHDWallet from "ava-hd-wallet";

    const wallet = AvaHDWallet.fromMnemonic("mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp")

    wallet.publicKey  // -> X-avax16d7a94xle7pvfztx7p4rct6dzr7dw8m2cwwtda
    wallet.privateKey  // -> PrivateKey-2kez3FVVHdubhSNYmgbHHeHY5Pn5p72v7ZLWLqUyEardJzeuGn

> Set derivation path (default is m/44'/570'/0)

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setPath("m/44'/9000'/0");
    const wallet = AvaHDWallet.fromMnemonic("mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp")

    wallet.publicKey  // -> X-avax1mtw0dc0d87fq4pnemarcfcs43ngys4ejs4z9tj
    wallet.privateKey  // -> PrivateKey-YnKXhuzyxtcd2Pw94xa37bFwi4T2PzxFrNcQe32sbf7FCvXja

> Set chain (default is "X")

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setChainId("19");

    const mnemonic = AvaHDWallet.generateMnemonic();
    const wallet = AvaHDWallet.fromMnemonic(mnemonic)

    wallet.publicKey // -> 19-avax1mtw0dc0d87fq4pnemarcfcs43ngys4ejs4z9tj
    wallet.privateKey // -> PrivateKey-YnKXhuzyxtcd2Pw94xa37bFwi4T2PzxFrNcQe32sbf7FCvXja

> Generate wallet by given xpub and xprv

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setPath("m/44'/9000'/0");
    const wallet = AvaHDWallet.fromMnemonic("mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp")

    AvaHDWallet.setPath("m/0/1");

    AvaHDWallet.fromExtendedPublicKey(wallet.publicExtendedKey) // -> { publicKey: 'X-avax16qm93a9ask30qldw94jz686s7z7dw5ecyrezna', privateKey: null }
    AvaHDWallet.fromExtendedPrivateKey(wallet.privateExtendedKey) // -> {publicKey: 'avax16qm93a9ask30qldw94jz686s7z7dw5ecyrezna', privateKey:'PrivateKey-jUEHoYnyvLMByd4EsuNbMVYfZCgpipthgKTo1TSv3xnsjx7w'}

Copyright © 2020 Mert Gönül (DataDef)
