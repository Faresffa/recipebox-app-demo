'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await createClient().auth.signOut()
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
    >
      Log out
    </button>
  )
}
