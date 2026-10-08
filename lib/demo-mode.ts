import { cookies } from 'next/headers'

// "naive": the /success page grants Pro (vulnerable on purpose, for the demo).
// "secure": only the verified Stripe webhook grants Pro.
export type DemoMode = 'naive' | 'secure'

export const DEMO_MODE_COOKIE = 'demo_mode'

export async function getDemoMode(): Promise<DemoMode> {
  const cookieStore = await cookies()
  return cookieStore.get(DEMO_MODE_COOKIE)?.value === 'secure' ? 'secure' : 'naive'
}
