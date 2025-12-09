# Nibble

Nibble is a Solana-native AI trading agent built around xAI models and RLVR-style training signals.  
The name “Nibble” is also the mascot of the agent: a small, curious bot that constantly nibbles through order books and data streams looking for good trades.

The system treats the model as a portfolio “brain” with access to a small, explicitly defined tool surface on Solana. It ingests on-chain and market data, keeps a compact view of positions and risk, proposes structured portfolio actions, and expresses them through guard-railed, auditable transactions. The focus here is on how data, reasoning, and execution are wired together rather than on any specific trading playbook.

---

## Architecture & RLVR

Conceptually Nibble runs as three layers:

- **Data & State**  
  Solana RPC/WebSocket feeds and selected off-chain sources are normalized into stable state objects: market snapshots, portfolio and risk state, and simple environment context (events, regimes). This defines exactly what the model “sees” at each decision step and keeps the interface to the reasoning layer stable.

- **xAI Reasoning**  
  The xAI API acts as the decision engine. Given the current state and trading mandate, the model returns structured intents (rebalance, rotate, hedge, adjust liquidity, etc.) instead of raw orders. Constraints and allowed venues are encoded in the prompt and tool contracts, so behavior is easy to inspect, replay, and compare across different policies or configurations.

- **Tools & Execution**  
  A narrow set of tools encapsulates all on-chain actions: querying positions/orderbooks, performing swaps, managing orders, and handling liquidity. Tools validate inputs, enforce risk limits, and build signed Solana transactions. Every decision, tool call, and transaction is logged so complete trajectories can be reconstructed.

Because everything is logged as trajectories with deterministic verifiers, Nibble fits naturally into a **Reinforcement Learning from Verifiable Rewards (RLVR)** loop: PnL vs. baselines, drawdowns, constraint adherence, and execution quality can all be recomputed from raw traces and used as clean reward signals when experimenting with prompts, policies, or scheduling.

---

## Nibble Token

Nibble is wired around a dedicated Solana token mint that acts as the focal asset for the agent:

- **Nibble token mint:** `PLACEHOLDER`

Inside the system, NIBBLE shows up as a normal SPL position in the portfolio and a common routing asset in swaps, so the agent naturally trades around it as part of normal allocation and rebalancing.

There’s also a simple hook in the policy layer: once the bot is up on realized PnL past a configurable threshold, a slice of those profits can be skimmed and automatically used to buy NIBBLE on Solana or to top up NIBBLE-denominated liquidity. In plain terms: when Nibble trades well, it quietly stacks more of its own mascot token on-chain.

---

## Workflow Sketch

The intended loop looks roughly like this:

- State assembly runs on a fixed cadence or on event triggers and produces a compact decision context from markets, portfolio, and risk.  
- The context is sent to xAI along with the current mandate and tool definitions; the model returns intents and can call read-only tools to refine its view.  
- Approved intents are translated into concrete tool invocations; tools apply checks and submit transactions on Solana, then feed back realized outcomes.  
- All of this is written into a trajectory log that can be replayed, scored, and compared under different prompts, policies, or configurations, with NIBBLE sitting in the middle of the portfolio loop where it makes sense.
