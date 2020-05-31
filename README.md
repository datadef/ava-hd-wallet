# ava-hd-wallet
Hierarchical Deterministic Wallet for AVA
# Installation
Install it using npm:

    npm install --save ava-hd-wallet

# Usage
> Set mnemonic entropy (length) and generate mnemonic

    // optional - set entropy (default is 128)
    AvaHDWallet.setEntropy(128); // -> 12 words mnemonic
    AvaHDWallet.setEntropy(256); // -> 24 words mnemonic
    
    const  mnemonic = AvaHDWallet.generateMnemonic();  // -> "nation profit giant truth meat carpet demand expect nest sudden endorse ahead"
	const  wallet = AvaHDWallet.fromMnemonic(mnemonic)

	wallet.publicKey  // -> X-J4VCFdFcwPmokjhPmVU3vDLafH2Gwef3b
	wallet.privateKey  // -> 2J5ocPonnWEhD4iCo4tjxK2s5Gx2FU8sxZnCu5YiiR89UycUnk
    
> Generate keypair using specific mnemonic
> 
    const wallet = AvaHDWallet.fromMnemonic("nation profit giant truth meat carpet demand expect nest sudden endorse ahead")
    
	 wallet.publicKey // -> X-9Hqpt8cHXVD8r3KShV1wf9UY3k8JnAMBo
     wallet.privateKey //  -> yVnydGMgDvRbYdtgvpt78eG255uVZindjKnGS67sKgDBxpKMW
> Set derivation path (default is m/44'/570'/0)
> 
    AvaHDWallet.setPath(19); // -> m/44'/570'/19'
	const  wallet = AvaHDWallet.fromMnemonic("nation profit giant truth meat carpet demand expect nest sudden endorse ahead")

	wallet.publicKey  // -> X-JH34kY3m3ofieGSQ631HPZy223eK8BSVe
	wallet.privateKey  // -> 247fonz8n3ZVAYmjRgdL54eY11uRy2kHU7ncyD7RyGj4oN22wm
> Set chain (default is "X")
> 
	AvaHDWallet.setChainId("19");

	const  mnemonic  =  AvaHDWallet.generateMnemonic();
	const  wallet  =  AvaHDWallet.fromMnemonic(mnemonic)

	wallet.publicKey  // -> 19-EAyCtuPuNDG8xDoVz7XFMGydWnVowQjrK
	wallet.privateKey  // -> 247fonz8n3ZVAYmjRgdL54eY11uRy2kHU7ncyD7RyGj4oN22wm

Copyright © 2020 Mert Gönül (DataDef)