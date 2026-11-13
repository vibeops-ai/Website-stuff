import { useState } from 'react'
import { LABEL } from '../content.js'

// Section opening used on every section of ghartlabs.com: grey mono label, serif heading, grey lede.
export function SectionHead({ label, title, lede, accent = false }) {
  return (
    <header className="max-w-[720px]">
      <p className={`t-label ${accent ? '!text-clay' : ''}`}>{label}</p>
      <h2 className="t-h2 mt-[26px]">{title}</h2>
      {lede && <p className="t-lede mt-[26px]">{lede}</p>}
    </header>
  )
}

// Panel heading: serif title, second half in grey (the main site's headline pattern).
export function Title({ text, accent }) {
  return (
    <h3 className="t-h3">
      <span className="!text-rust">{text}</span> {accent && <span className="text-muted">{accent}</span>}
    </h3>
  )
}

// Renders content arrays like ['plain ', { strong: 'bold' }, ' plain'].
export function Rich({ parts }) {
  return parts.map((part, i) => (typeof part === 'string' ? part : <strong key={i} className="font-semibold text-body">{part.strong}</strong>))
}

export function Label({ id }) {
  return LABEL[id] ?? id
}

const BADGE = {
  Critical: 'border-rust bg-rust text-white',
  High: 'border-rust/40 bg-rust/10 text-rust',
  Medium: 'border-sand bg-sand/20 text-[#7a4a22]',
  Low: 'border-line bg-mist text-faint',
}

export function SeverityBadge({ level }) {
  return <span className={`inline-block rounded-sm border px-2 py-[3px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${BADGE[level]}`}>{level}</span>
}

// Horizontal bars. Hovering a bar highlights it and explains it underneath.
export function BarChart({ chart }) {
  const [active, setActive] = useState(null)
  const unit = chart.unit ?? ''
  const shown = active === null ? null : chart.bars[active]
  return (
    <div>
      <p className="t-tag">{chart.title}</p>
      <ul className="mt-4 space-y-2" onMouseLeave={() => setActive(null)}>
        {chart.bars.map((bar, i) => {
          const dim = active !== null && active !== i
          return (
            <li key={bar.label} onMouseEnter={() => setActive(i)} className="grid cursor-default grid-cols-[170px_1fr_44px] items-center gap-3 text-[14px]">
              <span className={`text-right transition ${dim ? 'text-faint/60' : 'text-body'}`}>{bar.label}</span>
              <span className="relative h-[18px] bg-rule/60">
                <span className={`absolute inset-y-0 left-0 transition-all duration-200 ${bar.color} ${dim ? 'opacity-25' : ''}`} style={{ width: `${(bar.value / chart.max) * 100}%` }} />
              </span>
              <span className={`font-mono text-[13px] tabular-nums ${active === i ? 'font-semibold text-ink' : 'text-faint'}`}>{bar.value}{unit}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 min-h-[44px] text-[14px] leading-[1.5] text-muted">
        {shown ? <><strong className="text-ink">{shown.label}.</strong> {shown.detail}</> : chart.note}
      </p>
    </div>
  )
}

// One example finding: input and output always visible, the explanation on hover.
export function MiniCase({ item }) {
  return (
    <div className="group border border-line bg-paper p-6 transition hover:border-ink/40">
      <div className="flex items-center justify-between gap-2">
        <p className="t-tag !text-ink"><Label id={item.id} /></p>
        <SeverityBadge level={item.severity} />
      </div>
      <h4 className="t-h4 mt-3">{item.title}</h4>
      <div className="relative mt-3 min-h-[96px]">
        <div className="space-y-2 text-[13px] leading-[1.5] transition group-hover:opacity-0">
          <p className="bg-mist px-3 py-2 font-mono text-muted">{item.input}</p>
          <p className="border-l-2 border-rust bg-rust/5 px-3 py-2 font-mono text-ink">{item.output}</p>
        </div>
        <p className="t-small absolute inset-0 opacity-0 transition group-hover:opacity-100">{item.note}</p>
      </div>
    </div>
  )
}