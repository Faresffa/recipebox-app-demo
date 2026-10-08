import type { DemoMode } from '@/lib/demo-mode'

export function DemoModeToggle({ mode }: { mode: DemoMode }) {
  return (
    <form
      action="/api/demo-mode"
      method="post"
      className="flex items-center justify-center gap-2 bg-neutral-900 px-4 py-2 text-xs text-white"
    >
      <span className="text-neutral-400">Demo mode:</span>
      {(['naive', 'secure'] as const).map((m) => (
        <button
          key={m}
          type="submit"
          name="mode"
          value={m}
          aria-pressed={mode === m}
          className={`rounded-full px-3 py-1 font-semibold ${
            mode === m
              ? m === 'naive'
                ? 'bg-red-500 text-white'
                : 'bg-emerald-500 text-white'
              : 'text-neutral-300 hover:bg-neutral-800'
          }`}
        >
          {m === 'naive' ? 'Naive (trusts /success)' : 'Secure (webhook only)'}
        </button>
      ))}
      <span className="mx-1 text-neutral-600">|</span>
      <button
        type="submit"
        name="action"
        value="reset"
        className="rounded-full px-3 py-1 text-neutral-300 hover:bg-neutral-800"
      >
        Reset Pro
      </button>
    </form>
  )
}
