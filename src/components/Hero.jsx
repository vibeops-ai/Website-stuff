import { hero, whatWeDo } from '../content.js'

const CLAIMS = [
  { text: 'Dizziness reported', ok: true, why: 'Matches "reports intermittent dizziness"' },
  { text: 'Chest pain reported', ok: false, why: 'Source says "No chest pain"' },
  { text: 'Breathing normal', ok: true, why: 'Matches "No shortness of breath"' },
]

// The one animated moment on the page: a summary checked claim by claim against its source.
function VerificationDemo() {
  return (
    <div className="relative rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,26,43,0.35)]">
      <p className="text-xs font-semibold text-slate-500">Source note</p>
      <p className="mt-1.5 rounded-lg bg-mist px-3 py-2.5 font-mono text-[13px] leading-relaxed text-slate-700">
        Patient reports intermittent dizziness. <mark className="demo-mark rounded-sm bg-transparent px-0.5 text-inherit">No chest pain.</mark> No shortness of breath.
      </p>

      <p className="mt-4 text-xs font-semibold text-slate-500">AI summary, checked by GoodHart</p>
      <ul className="mt-1.5 space-y-2">
        {CLAIMS.map((c, i) => (
          <li
            key={c.text}
            className={`demo-claim flex items-start gap-3 rounded-lg border px-3 py-2 ${c.ok ? 'border-line' : 'demo-bad border-line'}`}
            style={{ animationDelay: `${0.5 + i * 0.7}s` }}
          >
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${c.ok ? 'bg-pine' : 'bg-rust'}`}>
              {c.ok ? '✓' : '!'}
            </span>
            <span>
              <span className="block text-sm font-medium">{c.text}</span>
              <span className="block text-xs text-slate-500">{c.why}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="demo-verdict mt-4 flex items-center justify-between rounded-lg bg-ink px-4 py-3 text-white" style={{ animationDelay: '2.8s' }}>
        <span className="text-sm">1 of 3 claims contradicts the source</span>
        <span className="rounded bg-rust px-2 py-0.5 text-xs font-semibold">Held for review</span>
      </div>
    </div>
  )
}

export function Hero({ onCta }) {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center gap-12 px-6 pb-10 pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.015em] md:text-[4.1rem]">
            {hero.title.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onCta} className="rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-rust focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust">
              {hero.primaryCta}
            </button>
            <a href="#example" className="rounded-lg border border-ink/20 px-6 py-3.5 text-sm font-semibold transition hover:border-ink">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <VerificationDemo />
      </div>

      <div className="rounded-2xl bg-bone px-6 py-6 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl md:text-[1.7rem]">{whatWeDo.title}</h2>
          <p className="text-sm text-slate-500">{whatWeDo.tags.join(', ')}</p>
        </div>
        <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.items.map((item) => (
            <li key={item.title} className="border-t-2 border-rust/70 pt-3">
              <h3 className="font-serif text-lg leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
