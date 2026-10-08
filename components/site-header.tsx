import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'
import type { CurrentUser } from '@/lib/user'

export function SiteHeader({ user }: { user: CurrentUser | null }) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-neutral-900">
          RecipeBox
        </Link>

        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="max-w-40 truncate text-sm text-neutral-600" title={user.email}>
                {user.email}
              </span>
              {user.isPro && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  Pro
                </span>
              )}
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              Log in
            </Link>
          )}

          {!user?.isPro && (
            <form action="/api/checkout" method="post">
              <button
                type="submit"
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                {'Go Pro – $5'}
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
