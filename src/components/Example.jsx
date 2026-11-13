import { example } from '../content.js'
import { BarChart, Rich, SectionHead } from './ui.jsx'

export function Example() {
  return (
    <section id="example" className="section !pb-0">
      <div className="wrap">
        <SectionHead label={example.eyebrow} title={example.sectionTitle} lede={example.sectionSubtitle} />

        <article className="mt-16 border border-line bg-paper">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-[30px] py-[22px]">
            <p className="t-tag !text-ink">Example assessment</p>
            <p className="t-meta">{example.meta}</p>
          </div>

          <div className="grid gap-12 px-[30px] py-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h3 className="t-h3">
                {example.title} <span className="text-muted">{example.titleAccent}</span>
              </h3>
              <p className="t-body mt-6">{example.lede}</p>
              <p className="t-small mt-4"><Rich parts={example.body} /></p>
            </div>
            <div>
              <p className="t-tag">{example.question.eyebrow}</p>
              <h4 className="t-h4 mt-3">{example.question.title}</h4>
              <p className="t-small mt-3">{example.question.body}</p>
            </div>
          </div>

          <div className="grid border-t border-line sm:grid-cols-4">
            {example.stats.map((stat) => (
              <div key={stat.label} className="group border-b border-rule px-[30px] py-6 transition hover:bg-mist sm:border-b-0 sm:border-r sm:last:border-r-0">
                <p className={`font-serif text-[40px] leading-none tabular-nums tracking-[-0.02em] ${stat.accent ? 'text-rust' : 'text-ink'}`}>{stat.value}</p>
                <p className="t-tag mt-3 !text-ink">{stat.label}</p>
                <p className="mt-1 text-[13px] leading-[1.5] text-muted group-hover:hidden">{stat.note}</p>
                <p className="mt-1 hidden text-[13px] leading-[1.5] text-body group-hover:block">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-[30px] py-8">
            <BarChart chart={example.chart} />
          </div>
        </article>
      </div>
    </section>
  )
}