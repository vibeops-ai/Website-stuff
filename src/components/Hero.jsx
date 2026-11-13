import { hero, whatWeDo } from '../content.js'
import { SectionHead } from './ui.jsx'

const CLAIMS = [
  { text: 'Dizziness reported', ok: true, why: 'Matches "reports intermittent dizziness"' },
  { text: 'Chest pain reported', ok: false, why: 'Source says "No chest pain"' },
  { text: 'Breathing normal', ok: true, why: 'Matches "No shortness of breath"' },
]

// The one animated moment on the page: a summary checked claim by claim against its source.
function VerificationDemo() {
  return (
    <div className="border border-line bg-paper">
      <div className="border-b border-line px-6 py-4">
        <p className="t-tag !text-ink">Source note</p>
      </div>
      <div className="px-6 py-5">
        <p className="bg-mist px-4 py-3 font-mono text-[13px] leading-[1.6] text-body">
          Patient reports intermittent dizziness. <mark className="demo-mark bg-transparent px-0.5 text-inherit">No chest pain.</mark> No shortness of breath.
        </p>
      </div>
      <div className="border-y border-line px-6 py-4">
        <p className="t-tag !text-ink">AI summary, checked by GoodHart</p>
      </div>
      <ul>
        {CLAIMS.map((c, i) => (
          <li
            key={c.text}
            className={`demo-claim flex items-center justify-between gap-4 border-b border-rule px-6 py-4 ${c.ok ? '' : 'demo-bad'}`}
            style={{ animationDelay: `${0.5 + i * 0.7}s` }}
          >
            <span>
              <span className="t-h4 block !text-[18px]">{c.text}</span>
              <span className="block text-[13px] text-muted">{c.why}</span>
            </span>
            <span className={`t-tag shrink-0 ${c.ok ? '!text-faint' : 'rounded-sm border border-rust/40 bg-rust/10 px-2.5 py-1 !text-rust'}`}>
              {c.ok ? 'supported' : 'held'}
            </span>
          </li>
        ))}
      </ul>
      <p className="demo-verdict px-6 py-4 text-[14px] text-body" style={{ animationDelay: '2.8s' }}>
        1 of 3 claims contradicts the source. <span className="text-muted">The note is held for review.</span>
      </p>
    </div>
  )
}

export function Hero({ onCta }) {
  return (
    <>
      <section className="wrap pb-[120px] pt-[140px]">
        <p className="t-label !text-clay">{hero.eyebrow}</p>
        <div className="mt-10 grid items-start gap-14 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h1 className="t-h1">
              {hero.title[0]} {hero.title[1]} <span className="text-muted">{hero.title[2]}</span>
            </h1>
            <p className="t-body mt-10 max-w-[600px]">{hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-3.5">
              <button onClick={onCta} className="btn btn-primary">{hero.primaryCta} <span aria-hidden>→</span></button>
              <a href={hero.demoUrl} className="btn btn-secondary">{hero.secondaryCta}</a>
            </div>
          </div>
          <VerificationDemo />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead label={whatWeDo.eyebrow} title={whatWeDo.title} lede={whatWeDo.lede} />
          <ol className="mt-16 grid border-l border-t border-line sm:grid-cols-2">
            {whatWeDo.items.map((item) => (
              <li key={item.n} className="border-b border-r border-line px-11 py-11">
                <p className="font-mono text-[12px] font-semibold text-clay">{item.n}</p>
                <h3 className="mt-5 font-serif text-[26px] leading-[1.15] tracking-[-0.015em] text-ink">{item.title}</h3>
                <p className="t-small mt-4">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}