'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup'

function friendlyError(code: string | undefined, mode: Mode) {
  switch (code) {
    case 'email_not_confirmed':
      return 'Please confirm your email before logging in.'
    case 'weak_password':
      return 'Password is too weak. Use at least 6 characters.'
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'invalid_credentials':
    case 'user_already_exists':
    case 'email_exists':
      return mode === 'login' ? 'Invalid email or password.' : 'Could not create account with these details.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

export function AuthForm() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(friendlyError(error.code, mode))
        setLoading(false)
        return
      }
      router.push('/')
      router.refresh()
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)

    if (error) {
      setError(friendlyError(error.code, mode))
      return
    }

    if (data.session) {
      router.push('/')
      router.refresh()
    } else {
      setMessage('Check your email to confirm your account, then log in.')
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setMessage(null)
  }

  const isLogin = mode === 'login'

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 grid grid-cols-2 rounded-full bg-neutral-100 p-1" role="tablist">
        {(['login', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => switchMode(m)}
            className={`rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === m ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {m === 'login' ? 'Log in' : 'Sign up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-900">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-neutral-900">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="text-sm text-emerald-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? 'Please wait…' : isLogin ? 'Log in' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
