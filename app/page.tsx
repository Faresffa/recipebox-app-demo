import { RecipeCard } from '@/components/recipe-card'
import { DemoModeToggle } from '@/components/demo-mode-toggle'
import { SiteHeader } from '@/components/site-header'
import { getDemoMode } from '@/lib/demo-mode'
import { recipes } from '@/lib/recipes'
import { getCurrentUser } from '@/lib/user'

export default async function HomePage() {
  const user = await getCurrentUser()
  const isPro = user?.isPro ?? false
  const mode = await getDemoMode()

  return (
    <div className="min-h-screen bg-neutral-50">
      <DemoModeToggle mode={mode} />
      <SiteHeader user={user} />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 text-balance">RecipeBox</h1>
          <p className="mt-3 text-neutral-600 text-pretty">
            Free recipes for everyone. Pro recipes for members.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} locked={recipe.pro && !isPro} />
          ))}
        </div>
      </main>
    </div>
  )
}
