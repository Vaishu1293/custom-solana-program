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

    it('Add two numbers', async () => {
        await program.methods
            .add(new anchor.BN(2), new anchor.BN(3))
            .accounts({
                calculator: calculator.publicKey
            })
            .rpc();

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)));
        // assert.strictEqual(account.user.toBase58(), provider.wallet.publicKey.toBase58(), "User public key mismatch");
    });

    it('Subtract two numbers', async () => {
        await program.methods
            .subtract(new anchor.BN(9), new anchor.BN(3))
            .accounts({
                calculator: calculator.publicKey
            })
            .rpc();

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(6)));
        // assert.strictEqual(account.user.toBase58(), provider.wallet.publicKey.toBase58(), "User public key mismatch");
    });

    it('Multiply two numbers', async () => {
        await program.methods
            .multiply(new anchor.BN(2), new anchor.BN(3))
            .accounts({
                calculator: calculator.publicKey
            })
            .rpc();

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(6)));
        // assert.strictEqual(account.user.toBase58(), provider.wallet.publicKey.toBase58(), "User public key mismatch");
    });

    it('Divide two numbers', async () => {
        await program.methods
            .divide(new anchor.BN(6), new anchor.BN(3))
            .accounts({
                calculator: calculator.publicKey
            })
            .rpc();

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(2)));
        assert.ok(account.remainder.eq(new anchor.BN(0)));
        // assert.strictEqual(account.user.toBase58(), provider.wallet.publicKey.toBase58(), "User public key mismatch");
    });

});
