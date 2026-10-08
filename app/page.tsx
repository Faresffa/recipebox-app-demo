import { RecipeCard } from '@/components/recipe-card'
import { recipes } from '@/lib/recipes'
import { isPro } from '@/lib/user'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold text-neutral-900">RecipeBox</span>
          <button
            type="button"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            {'Go Pro – $5'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
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
