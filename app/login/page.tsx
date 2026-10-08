import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export const metadata = { title: 'Log in – RecipeBox' }

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-12">
      <Link href="/" className="mb-8 text-2xl font-bold text-neutral-900">
        RecipeBox
      </Link>
      <AuthForm />
    </main>
  )
}
