import { NextResponse, type NextRequest } from 'next/server'
import { DEMO_MODE_COOKIE } from '@/lib/demo-mode'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const response = NextResponse.redirect(new URL('/', request.url), 303)

  // "Reset Pro" lets us replay the demo with the same account.
  if (form.get('action') === 'reset') {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await createAdminClient().from('profiles').update({ is_pro: false }).eq('id', user.id)
    }
    return response
  }

  const mode = form.get('mode') === 'secure' ? 'secure' : 'naive'
  response.cookies.set(DEMO_MODE_COOKIE, mode, { path: '/', sameSite: 'lax' })
  return response
}
