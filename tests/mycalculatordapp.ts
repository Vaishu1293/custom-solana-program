const assert = require('assert');
const anchor = require('@coral-xyz/anchor');
const { SystemProgram } = anchor.web3;

describe('mycalculatordapp', () => {
    const provider = anchor.AnchorProvider.env(); // Load environment configuration
    anchor.setProvider(provider);

    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Mycalculatordapp;

    it('Creates a calculator', async () => {
        await program.methods
            .create("Welcome to Solana")
            .accounts({
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([calculator])
            .rpc();

        const account = await program.account.calculator.fetch(calculator.publicKey);

        assert.strictEqual(account.greeting, "Welcome to Solana", "Greeting mismatch");
        // assert.strictEqual(account.user.toBase58(), provider.wallet.publicKey.toBase58(), "User public key mismatch");
    });
});
