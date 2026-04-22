import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_RESTRICTED_KEY;

if (!stripeApiKey) {
  throw new Error(
    "Missing Stripe API key. Set STRIPE_SECRET_KEY or STRIPE_RESTRICTED_KEY.",
  );
}

export const stripe = new Stripe(stripeApiKey, {
  typescript: true,
});
