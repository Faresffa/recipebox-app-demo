import Link from 'next/link'
import { CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react'
import { getDemoMode } from '@/lib/demo-mode'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const mode = await getDemoMode()

  if (mode === 'naive') {
    // VULNERABLE ON PURPOSE: reaching this URL is treated as proof of payment.
    // session_id is never checked, so /success?session_id=fake also works.
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await createAdminClient().from('profiles').update({ is_pro: true }).eq('id', user.id)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-neutral-900">Thank you for your payment!</h1>
        {mode === 'naive' ? (
          <p className="mt-2 text-neutral-600">Welcome to RecipeBox Pro.</p>
        ) : (
          <p className="mt-2 text-neutral-600">
            Your Pro access turns on as soon as Stripe confirms the payment.
          </p>
        )}

        <div
          className={`mt-6 flex items-start gap-2 rounded-xl p-3 text-left text-xs ${
            mode === 'naive' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'
          }`}
        >
          {mode === 'naive' ? (
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <p>
            {mode === 'naive'
              ? 'Naive mode: this page granted Pro just because you visited it.'
              : 'Secure mode: this page grants nothing. Only the signed Stripe webhook can.'}{' '}
            <span className="font-mono break-all">session_id = {session_id ?? '(none)'}</span>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
