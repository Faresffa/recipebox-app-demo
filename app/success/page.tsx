import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-neutral-900">Thank you for your payment!</h1>
        <p className="mt-2 text-neutral-600">Welcome to RecipeBox Pro.</p>
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
