---
name: pricing-and-packaging
description: Use when designing, reviewing, or testing Vid-Visual's free plan, paid tiers, credits, usage limits, upgrade prompts, regional pricing, or the pricing page. Proposes changes and experiments but never changes live pricing without approval.
---

# Pricing and Packaging

## Goal
Charge in a way that matches the value users get, keeps every plan profitable, and gives free users a real reason to upgrade.

## Lenses
- Patrick McKenzie: most small software is underpriced. Price on value, not on cost plus a little.
- Madhavan Ramanujam, Monetizing Innovation: design the product and the tiers around what customers will pay for, before building.
- Value-metric pricing in the style of ProfitWell and Price Intelligently: charge for the thing that grows when the customer gets more value (exports, minutes of video, credits).
- Wes Bush, product-led growth: the free plan is the main sales channel, so it must demonstrate the product.

## Hard rule
The current pricing model is mine. You may analyze, propose, and prepare experiments. You must not change plans, prices, limits, or payment settings in code or in any dashboard without my explicit approval in this chat.

## Principles
1. Price on a value metric, not on seats by default. Candidates for Vid-Visual: exports, video length, resolution, credits, brand removal.
2. AI generation has real cost per use. Every plan, including heavy free users, must have a known worst-case cost. Compute it.
3. Free plan: enough to reach the first great result, capped on the thing that costs money. Upgrade prompts appear at the moment the user wants more, never before the first success.
4. Three paid tiers at most (good, better, best). Make the middle one the obvious pick. Offer an annual discount.
5. India pricing: consider INR pricing with UPI and local payment methods, and global pricing in USD. Regional pricing is often reported to raise total revenue, so treat it as a hypothesis and test it.
6. Typical freemium-to-paid conversion is often quoted as roughly 2 to 5 percent, varying a lot by product. Treat benchmarks as rough. Measure our own.

## Process
1. Unit economics table: cost per generation, per export, per GB stored, per user per month (ask me for actual provider costs, or find them in the provider docs and cite).
2. Plan matrix: limits and features per tier, with worst-case cost and gross margin per tier.
3. Upgrade triggers: list the moments and the exact message for each.
4. Experiments: hypothesis, change, metric, sample needed, duration, success rule. Roll out behind a feature flag.
5. Pricing page review with the conversion-copywriter skill.

## Output rules
- Tables first, prose second. Show assumptions.
- Never invent competitor prices. Look them up and cite, or write "unverified".
- Tax and invoicing questions (GST and others) need a chartered accountant. Flag them, do not decide them.