# ava-hd-wallet

Hierarchical Deterministic Wallet for AVA

# Installation

Install it using npm:

    npm install --save ava-hd-wallet

# Usage

> Set mnemonic entropy (length) and generate mnemonic

    import AvaHDWallet from "ava-hd-wallet";

    // optional - set entropy (default is 128)
    AvaHDWallet.setEntropy(128); // -> 12 words mnemonic
    AvaHDWallet.setEntropy(256); // -> 24 words mnemonic

    const mnemonic = AvaHDWallet.generateMnemonic();  // -> "nation profit giant truth meat carpet demand expect nest sudden endorse ahead"
    const wallet = AvaHDWallet.fromMnemonic(mnemonic)

    wallet.publicKey  // -> X-J4VCFdFcwPmokjhPmVU3vDLafH2Gwef3b
    wallet.privateKey  // -> 2J5ocPonnWEhD4iCo4tjxK2s5Gx2FU8sxZnCu5YiiR89UycUnk

> Generate keypair using specific mnemonic

    import AvaHDWallet from "ava-hd-wallet";

    const wallet = AvaHDWallet.fromMnemonic("nation profit giant truth meat carpet demand expect nest sudden endorse ahead")

     wallet.publicKey // -> X-9Hqpt8cHXVD8r3KShV1wf9UY3k8JnAMBo
     wallet.privateKey //  -> yVnydGMgDvRbYdtgvpt78eG255uVZindjKnGS67sKgDBxpKMW

> Set derivation path (default is m/44'/570'/0)

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setPath("m/44/570/19"); // -> m/44'/570'/19
    const wallet = AvaHDWallet.fromMnemonic("nation profit giant truth meat carpet demand expect nest sudden endorse ahead")

    wallet.publicKey  // -> X-JH34kY3m3ofieGSQ631HPZy223eK8BSVe
    wallet.privateKey  // -> 247fonz8n3ZVAYmjRgdL54eY11uRy2kHU7ncyD7RyGj4oN22wm

> Set chain (default is "X")

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setChainId("19");

    const mnemonic = AvaHDWallet.generateMnemonic();
    const wallet = AvaHDWallet.fromMnemonic(mnemonic)

    wallet.publicKey // -> 19-EAyCtuPuNDG8xDoVz7XFMGydWnVowQjrK
    wallet.privateKey // -> 247fonz8n3ZVAYmjRgdL54eY11uRy2kHU7ncyD7RyGj4oN22wm

> Generate wallet by given xpub and xprv

    import AvaHDWallet from "ava-hd-wallet";

    AvaHDWallet.setPath("m/44/570/0"); // -> m/44'/570'/0
    const wallet = AvaHDWallet.fromMnemonic("yard car primary pill service grid state slice marriage album lawn vapor")

    AvaHDWallet.setPath("m/0/1");

    AvaHDWallet.fromExtendedPublicKey(wallet.publicExtendedKey) // -> { publicKey: 'X-C86AtvrxiVMBBRGxHox6TBL9PvMk7fkFm', privateKey: null }
    AvaHDWallet.fromExtendedPrivateKey(wallet.privateExtendedKey // -> {publicKey: 'X-C86AtvrxiVMBBRGxHox6TBL9PvMk7fkFm', privateKey:'YiDPs...'}

Copyright © 2020 Mert Gönül (DataDef)
