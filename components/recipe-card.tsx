import { Lock } from 'lucide-react'
import type { Recipe } from '@/lib/recipes'

export function RecipeCard({ recipe, locked }: { recipe: Recipe; locked: boolean }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <span
        className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-medium ${
          recipe.pro ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
        }`}
      >
        {recipe.pro ? (locked ? 'Pro only' : 'Pro') : 'Free'}
      </span>

      <div className={locked ? 'select-none blur-sm' : ''} aria-hidden={locked}>
        <div className="flex h-36 items-center justify-center bg-orange-50 text-6xl">
          <span role="img" aria-label={recipe.title}>
            {recipe.emoji}
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold text-neutral-900">{recipe.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-600">{recipe.description}</p>
        </div>
      </div>

      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-neutral-900">Unlock with Pro</p>
        </div>
      )}
    </article>
  )
}
