import { LABEL, controls, critical, drift, findings, reproducibility, scope, severity } from '../content.js'
import { BarChart, Eyebrow, Label, MiniCase, Rich, SeverityBadge, Title } from './ui.jsx'

function Intro({ data, aside }) {
  return (
    <header className="mb-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
      <div className="max-w-3xl">
        <Title text={data.title} accent={data.titleAccent} />
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.lede}</p>
      </div>
      {aside}
    </header>
  )
}

const box = 'rounded-xl border border-line bg-white'
const th = 'px-3 py-2 text-left text-[11px] font-semibold text-slate-500'
const td = 'px-3 py-1.5 align-top'

function Table({ head, children, wide = true }) {
  return (
    <div className={`${box} overflow-x-auto`}>
      <table className={`w-full text-xs ${wide ? 'min-w-[620px]' : ''}`}>
        <thead className="bg-mist"><tr>{head.map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody className="[&>tr]:border-t [&>tr]:border-line [&>tr:hover]:bg-mist/60">{children}</tbody>
      </table>
    </div>
  )
}

export function SeverityPanel() {
  return (
    <>
      <Intro data={severity} />
      <Table head={['Case', 'Finding', 'Severity', 'Observed', 'Repeat behaviour']}>
        {findings.map((f) => (
          <tr key={f.id}>
            <td className={`${td} whitespace-nowrap font-semibold text-rust`}><Label id={f.id} /></td>
            <td className={td}>{f.finding}</td>
            <td className={td}><SeverityBadge level={f.severity} /></td>
            <td className={`${td} whitespace-nowrap font-semibold tabular-nums`}>{f.observed}</td>
            <td className={`${td} text-slate-600`}>{f.repeat}</td>
          </tr>
        ))}
      </Table>
    </>
  )
}

export function FindingsPanel() {
  return (
    <>
      <Intro data={critical} />
      <div className="grid gap-4 lg:grid-cols-2">
        {critical.cases.map((c) => (
          <article key={c.id} className={`${box} p-4`}>
            <p className="text-xs font-semibold text-rust"><Label id={c.id} /></p>
            <p className="text-[11px] text-slate-500">{c.observed}</p>
            <h3 className="mt-1 font-serif text-xl leading-snug">{c.title}</h3>
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
              <p className="rounded bg-mist px-3 py-2 text-slate-600"><span className="mb-0.5 block font-semibold text-slate-500">Source</span>{c.source}</p>
              <p className="rounded border-l-2 border-rust bg-rust/5 px-3 py-2 font-medium"><span className="mb-0.5 block font-semibold text-rust">AI output</span>{c.output}</p>
            </div>
            <dl className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-600">
              <div><dt className="inline font-semibold text-ink">What the verifier checks. </dt><dd className="inline">{c.checks}</dd></div>
              <div><dt className="inline font-semibold text-ink">Why it matters. </dt><dd className="inline">{c.matters}</dd></div>
              <div><dt className="inline font-semibold text-ink">Where to look. </dt><dd className="inline">{c.look}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-xl bg-ink px-5 py-4 text-white sm:grid-cols-3">
        {critical.pattern.items.map((p) => (
          <div key={p.quote} className="border-l-2 border-clay pl-3">
            <p className="font-serif text-[15px] italic leading-snug">{p.quote}</p>
            <p className="mt-1 text-xs text-white/60">{p.note}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export function ReproducibilityPanel() {
  const r = reproducibility
  return (
    <>
      <Intro data={r} />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.35fr]">
        <div className="space-y-4">
          <div className={`${box} p-4`}><BarChart chart={r.chart} /></div>
          <div className={`${box} grid grid-cols-2 gap-4 p-4`}>
            {r.repeat.groups.map((g) => (
              <div key={g.tag}>
                <p className="font-serif text-2xl">{g.count}</p>
                <p className="text-xs font-semibold text-rust">{g.tag}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {r.cases.map((c) => <MiniCase key={c.id} item={c} />)}
        </div>
      </div>
    </>
  )
}

export function ScopePanel() {
  const s = scope
  return (
    <>
      <Intro data={s} aside={<p className="text-xs text-slate-500">Hover a case to see what to check.</p>} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {s.cases.map((c) => <MiniCase key={c.id} item={c} />)}
      </div>
      <div className="mt-3 grid gap-x-6 gap-y-2 rounded-xl bg-ink px-5 py-3 text-white md:grid-cols-2">
        {[s.limits.tested, s.limits.notEstablished].map((b) => (
          <div key={b.title}>
            <h3 className="font-serif text-base">{b.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/70">{b.body}</p>
          </div>
        ))}
        <p className="border-t border-white/15 pt-2 text-xs text-white md:col-span-2"><strong>{s.closer.strong}</strong></p>
      </div>
    </>
  )
}

export function DriftPanel() {
  const d = drift
  return (
    <>
      <Intro data={d} aside={<span className="rounded bg-rust/10 px-2.5 py-1 text-xs font-semibold text-rust">{d.badge}</span>} />
      <Table head={['Case', 'Runs', 'Distinct answers', 'Runs off reference', 'What changed between runs']}>
        {d.rows.map((row) => (
          <tr key={row.id}>
            <td className={`${td} whitespace-nowrap font-mono text-slate-500`}>{row.id}</td>
            <td className={`${td} whitespace-nowrap font-semibold`}>{row.runs}</td>
            <td className={`${td} whitespace-nowrap font-semibold`}>{row.distinct}</td>
            <td className={`${td} whitespace-nowrap font-semibold`}>{row.deviating}</td>
            <td className={td}>{row.changed}</td>
          </tr>
        ))}
      </Table>
      <p className="mt-3 text-sm leading-relaxed text-slate-700"><Rich parts={d.totals} /></p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <ul className={`${box} grid gap-3 p-4 sm:grid-cols-2`}>
          {d.establish.points.map((p) => (
            <li key={p.lead} className="text-[11px] leading-relaxed text-slate-600">
              <strong className="block text-xs text-ink">{p.lead}</strong>{p.body}
            </li>
          ))}
        </ul>
        <div className="rounded-xl bg-ink p-5 text-white">
          <p className="font-serif text-lg italic leading-snug">{d.vendors.quote}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/60">{d.vendors.body}</p>
        </div>
      </div>
    </>
  )
}

export function ControlsPanel() {
  const c = controls
  return (
    <>
      <Intro data={c} />
      <div className="grid gap-4 lg:grid-cols-[1.75fr_1fr]">
        <Table wide={false} head={['Case', 'Behaviour', 'Control', 'Evidence to record']}>
          {c.table.map((row) => (
            <tr key={row.id}>
              <td className={`${td} whitespace-nowrap font-semibold text-rust`}>{row.label ?? LABEL[row.id]}</td>
              <td className={td}>{row.behaviour}</td>
              <td className={td}>{row.control}</td>
              <td className={`${td} text-slate-600`}>{row.evidence}</td>
            </tr>
          ))}
        </Table>
        <ol className={`${box} space-y-3 p-4`}>
          <Eyebrow>How an assessment runs</Eyebrow>
          {c.steps.map((s, i) => (
            <li key={s.tag} className="flex gap-3 text-xs leading-relaxed text-slate-600">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-white">{i + 1}</span>
              <span><strong className="text-ink">{s.lead}</strong> {s.body}</span>
            </li>
          ))}
          <li className="border-t border-line pt-2 text-[11px] leading-relaxed text-slate-500">{c.releaseNote}</li>
        </ol>
      </div>
      <div className="mt-4 grid items-end gap-4 rounded-xl bg-ink px-5 py-4 text-white md:grid-cols-[1.4fr_1fr]">
        <p className="font-serif text-xl leading-snug">{c.outcome.title}</p>
        <p className="font-serif text-lg italic text-clay md:text-right">{c.outcome.tagline}</p>
      </div>
    </>
  )
}
