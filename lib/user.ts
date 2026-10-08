import { createClient } from '@/lib/supabase/server'

export type CurrentUser = {
  email: string
  isPro: boolean
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user.id)
    .maybeSingle()

  return {
    email: user.email ?? '',
    isPro: profile?.is_pro ?? false,
  }
}
