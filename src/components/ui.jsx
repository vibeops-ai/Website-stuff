import { useState } from 'react'
import { LABEL } from '../content.js'

export function Eyebrow({ children, className = 'text-slate-500' }) {
  return <p className={`text-xs font-semibold ${className}`}>{children}</p>
}

export function Title({ text, accent, size = 'text-3xl md:text-[2.6rem]' }) {
  return (
    <h2 className={`font-serif leading-[1.05] tracking-[-0.01em] ${size}`}>
      {text} {accent && <span className="text-clay">{accent}</span>}
    </h2>
  )
}

// Renders content arrays like ['plain ', { strong: 'bold' }, ' plain'].
export function Rich({ parts }) {
  return parts.map((part, i) => (typeof part === 'string' ? part : <strong key={i} className="font-semibold">{part.strong}</strong>))
}

export function Label({ id }) {
  return LABEL[id] ?? id
}

const BADGE = {
  Critical: 'bg-rust text-white',
  High: 'bg-rust/10 text-rust',
  Medium: 'bg-amber-100 text-amber-900',
  Low: 'bg-slate-200/70 text-slate-600',
}

export function SeverityBadge({ level }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold ${BADGE[level]}`}>{level}</span>
}

// Horizontal bars. Hovering a bar highlights it and explains it underneath.
export function BarChart({ chart, dark = false }) {
  const [active, setActive] = useState(null)
  const unit = chart.unit ?? ''
  return (
    <div>
      <Eyebrow className={dark ? 'text-white/60' : 'text-slate-500'}>{chart.title}</Eyebrow>
      <ul className="mt-3 space-y-1.5" onMouseLeave={() => setActive(null)}>
        {chart.bars.map((bar, i) => {
          const dim = active !== null && active !== i
          return (
            <li key={bar.label} onMouseEnter={() => setActive(i)} className="grid cursor-default grid-cols-[10.5rem_1fr_2.75rem] items-center gap-3 text-xs">
              <span className={`text-right transition ${dim ? 'text-slate-400' : 'text-slate-700'}`}>{bar.label}</span>
              <span className="relative h-[18px] rounded-sm bg-slate-100">
                <span
                  className={`absolute inset-y-0 left-0 rounded-sm transition-all duration-200 ${bar.color} ${dim ? 'opacity-25' : ''}`}
                  style={{ width: `${(bar.value / chart.max) * 100}%` }}
                />
              </span>
              <span className={`tabular-nums transition ${active === i ? 'font-semibold text-ink' : 'text-slate-500'}`}>{bar.value}{unit}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 min-h-9 text-xs leading-relaxed text-slate-500">
        {active === null ? chart.note : <><strong className="text-ink">{bar(chart, active).label}.</strong> {bar(chart, active).detail}</>}
      </p>
    </div>
  )
}

const bar = (chart, i) => chart.bars[i]

// One example finding: input and output always visible, the explanation on hover.
export function MiniCase({ item }) {
  return (
    <div className="group rounded-xl border border-line bg-white p-3.5 transition hover:border-ink/30">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-rust"><Label id={item.id} /></p>
        <SeverityBadge level={item.severity} />
      </div>
      <h3 className="mt-1.5 font-serif text-lg leading-snug">{item.title}</h3>
      <div className="relative mt-2 min-h-[4.75rem]">
        <div className="space-y-1.5 text-xs transition group-hover:opacity-0">
          <p className="rounded bg-mist px-2.5 py-1.5 text-slate-600">{item.input}</p>
          <p className="rounded border-l-2 border-rust bg-rust/5 px-2.5 py-1.5 font-medium text-ink">{item.output}</p>
        </div>
        <p className="absolute inset-0 text-xs leading-relaxed text-slate-700 opacity-0 transition group-hover:opacity-100">{item.note}</p>
      </div>
    </div>
  )
}
