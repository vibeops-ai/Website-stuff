import { example } from '../content.js'
import { BarChart, Rich } from './ui.jsx'

export function Example() {
  return (
    <section id="example" className="flex min-h-svh items-center bg-ink">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 text-white">
          <h2 className="font-serif text-3xl md:text-[2.6rem]">{example.sectionTitle}</h2>
          <p className="text-sm text-white/60">{example.sectionSubtitle}</p>
        </header>

        <article className="grid gap-8 rounded-2xl bg-white p-6 md:p-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-xs font-semibold text-rust">{example.eyebrow}</p>
            <h3 className="mt-2 font-serif text-[1.9rem] leading-[1.08] md:text-[2.15rem]">
              {example.title}
              <span className="block text-clay">{example.titleAccent}</span>
            </h3>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-slate-500">{example.lede}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700"><Rich parts={example.body} /></p>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {example.stats.map((stat) => (
                <div key={stat.label} className="group bg-white p-3.5 transition hover:bg-mist">
                  <p className={`font-serif text-3xl tabular-nums ${stat.accent ? 'text-rust' : ''}`}>{stat.value}</p>
                  <p className="text-xs font-semibold">{stat.label}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-slate-500 group-hover:hidden">{stat.note}</p>
                  <p className="mt-0.5 hidden text-[11px] leading-snug text-slate-700 group-hover:block">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl bg-mist p-5">
            <div>
              <p className="text-xs font-semibold text-slate-500">{example.question.eyebrow}</p>
              <h4 className="mt-1.5 font-serif text-[1.35rem] leading-snug">{example.question.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{example.question.body}</p>
            </div>
            <BarChart chart={example.chart} />
          </div>
        </article>
      </div>
    </section>
  )
}

export function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-5 ${dark ? 'bg-white' : 'bg-ink'}`} />
      <span className="text-sm font-medium leading-none">
        GoodHart <span className="text-rust">Labs</span>
      </span>
    </div>
  )
}
