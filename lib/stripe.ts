import Stripe from 'stripe'

let client: Stripe | null = null

// Created on first use so the build doesn't need STRIPE_SECRET_KEY.
export function getStripe() {
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY!)
  return client
}
