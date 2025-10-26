use anchor_lang::prelude::*;

declare_id!("BFish11111111111111111111111111111111111111");

#[program]
pub mod bigfishalert {
    use super::*;

    /// Initialize a new Fisher account for a user
    pub fn initialize_fisher(ctx: Context<InitializeFisher>) -> Result<()> {
        let fisher = &mut ctx.accounts.fisher_account;
        fisher.wallet = ctx.accounts.user.key();
        fisher.total_catches = 0;
        fisher.big_fish_spotted = 0;
        fisher.reputation = 0;
        fisher.rank = FisherRank::Minnow;
        fisher.bump = ctx.bumps.fisher_account;

        msg!("Fisher initialized for wallet: {}", fisher.wallet);
        Ok(())
    }

    /// Record a token scan (catch)
    pub fn record_catch(
        ctx: Context<RecordCatch>,
        token_address: String,
        big_fish_score: u8,
    ) -> Result<()> {
        let fisher = &mut ctx.accounts.fisher_account;

        // Increment total catches
        fisher.total_catches = fisher.total_catches.checked_add(1)
            .ok_or(ErrorCode::Overflow)?;

        // Award points based on fish size found
        let points = if big_fish_score > 70 {
            fisher.big_fish_spotted = fisher.big_fish_spotted.checked_add(1)
                .ok_or(ErrorCode::Overflow)?;
            50 // Found a big fish!
        } else {
            10 // Regular catch
        };

        fisher.reputation = fisher.reputation.checked_add(points)
            .ok_or(ErrorCode::Overflow)?;

        // Update rank based on reputation
        fisher.rank = FisherRank::from_reputation(fisher.reputation);

        msg!(
            "Catch recorded! Token: {}, Score: {}, New Reputation: {}",
            token_address,
            big_fish_score,
            fisher.reputation
        );

        Ok(())
    }

    /// Get fisher statistics
    pub fn get_fisher_stats(ctx: Context<GetFisherStats>) -> Result<FisherStats> {
        let fisher = &ctx.accounts.fisher_account;

        Ok(FisherStats {
            wallet: fisher.wallet,
            total_catches: fisher.total_catches,
            big_fish_spotted: fisher.big_fish_spotted,
            reputation: fisher.reputation,
            rank: fisher.rank.clone(),
        })
    }
}

#[derive(Accounts)]
pub struct InitializeFisher<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + FisherAccount::INIT_SPACE,
        seeds = [b"fisher", user.key().as_ref()],
        bump
    )]
    pub fisher_account: Account<'info, FisherAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordCatch<'info> {
    #[account(
        mut,
        seeds = [b"fisher", user.key().as_ref()],
        bump = fisher_account.bump
    )]
    pub fisher_account: Account<'info, FisherAccount>,

    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetFisherStats<'info> {
    #[account(
        seeds = [b"fisher", fisher_account.wallet.as_ref()],
        bump = fisher_account.bump
    )]
    pub fisher_account: Account<'info, FisherAccount>,
}

#[account]
#[derive(InitSpace)]
pub struct FisherAccount {
    pub wallet: Pubkey,           // 32 bytes
    pub total_catches: u64,        // 8 bytes
    pub big_fish_spotted: u64,     // 8 bytes
    pub reputation: u64,           // 8 bytes
    pub rank: FisherRank,          // 1 byte
    pub bump: u8,                  // 1 byte
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum FisherRank {
    Minnow,   // 0-100 reputation
    Fisher,   // 101-500 reputation
    Captain,  // 501-1000 reputation
    Admiral,  // 1001+ reputation
}

impl FisherRank {
    pub fn from_reputation(reputation: u64) -> Self {
        match reputation {
            0..=100 => FisherRank::Minnow,
            101..=500 => FisherRank::Fisher,
            501..=1000 => FisherRank::Captain,
            _ => FisherRank::Admiral,
        }
    }

    pub fn to_string(&self) -> &'static str {
        match self {
            FisherRank::Minnow => "Minnow",
            FisherRank::Fisher => "Fisher",
            FisherRank::Captain => "Captain",
            FisherRank::Admiral => "Admiral",
        }
    }
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct FisherStats {
    pub wallet: Pubkey,
    pub total_catches: u64,
    pub big_fish_spotted: u64,
    pub reputation: u64,
    pub rank: FisherRank,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Arithmetic overflow occurred")]
    Overflow,
}
