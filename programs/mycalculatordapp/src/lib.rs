use anchor_lang::prelude::*;

declare_id!("G5SJ2m36Yx7UKs3jmNeT2bA7JFbnXUFE4tDjnLRUWeQk");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
