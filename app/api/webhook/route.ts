import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  // The signature is computed over the raw body, so read it as text — not JSON.
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    // Forged or tampered request: reject it.
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid' || !session.client_reference_id) {
    return NextResponse.json({ received: true })
  }

  const supabase = createAdminClient()

  // Idempotency: record the event ID first. A retry of the same event hits the
  // primary key, so we answer 200 (Stripe stops retrying) and do nothing.
  const { error: insertError } = await supabase.from('processed_events').insert({ id: event.id })
  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json({ received: true, duplicate: true })
    }
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ is_pro: true })
    .eq('id', session.client_reference_id)

  if (updateError) {
    // Forget the event so Stripe's retry can process it again.
    await supabase.from('processed_events').delete().eq('id', event.id)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
