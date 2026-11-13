import { LABEL, controls, critical, drift, findings, reproducibility, scope, severity } from '../content.js'
import { BarChart, Label, MiniCase, Rich, SeverityBadge, Title } from './ui.jsx'

function Intro({ data, aside }) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
      <div className="max-w-[720px]">
        <Title text={data.title} accent={data.titleAccent} />
        <p className="t-body mt-4">{data.lede}</p>
      </div>
      {aside}
    </header>
  )
}

const box = 'border border-line bg-paper'
// Table cells copy ghartlabs.com/demo: mono header strip, 12px by 14px cells, hairline row rules.
const th = 'border-b border-line bg-mist px-3.5 py-2.5 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-faint'
const td = 'px-3.5 py-3 align-top'

function Table({ head, children, wide = true }) {
  return (
    <div className={`${box} overflow-x-auto`}>
      <table className={`w-full text-[14px] leading-[1.5] text-muted ${wide ? 'min-w-[680px]' : ''}`}>
        <thead><tr>{head.map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-rule [&>tr:last-child]:border-0 [&>tr:hover]:bg-mist/70">{children}</tbody>
      </table>
    </div>
  )
}

function Callout({ children }) {
  return <div className="mt-6 border border-line bg-mist px-[30px] py-[22px]">{children}</div>
}

export function SeverityPanel() {
  return (
    <>
      <Intro data={severity} />
      <Table head={['Case', 'Finding', 'Severity', 'Observed', 'Repeat behaviour']}>
        {findings.map((f) => (
          <tr key={f.id}>
            <td className={`${td} whitespace-nowrap font-mono text-[13px] font-semibold text-ink`}><Label id={f.id} /></td>
            <td className={`${td} text-body`}>{f.finding}</td>
            <td className={td}><SeverityBadge level={f.severity} /></td>
            <td className={`${td} whitespace-nowrap font-mono text-[13px] text-ink`}>{f.observed}</td>
            <td className={td}>{f.repeat}</td>
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
      <div className="grid gap-6 lg:grid-cols-2">
        {critical.cases.map((c) => (
          <article key={c.id} className={box}>
            <div className="flex items-center justify-between gap-3 border-b border-line px-[30px] py-[22px]">
              <p className="t-tag !text-ink"><Label id={c.id} /></p>
              <SeverityBadge level="Critical" />
            </div>
            <div className="px-[30px] py-6">
              <h4 className="t-h4">{c.title}</h4>
              <p className="t-meta mt-2">{c.observed}</p>
              <div className="mt-5 grid gap-3 text-[13px] leading-[1.5] sm:grid-cols-2">
                <div className="bg-mist px-3.5 py-3">
                  <p className="t-tag">Source</p>
                  <p className="mt-1.5 font-mono text-muted">{c.source}</p>
                </div>
                <div className="border-l-2 border-rust bg-rust/5 px-3.5 py-3">
                  <p className="t-tag !text-rust">AI output</p>
                  <p className="mt-1.5 font-mono text-ink">{c.output}</p>
                </div>
              </div>
              <dl className="t-small mt-5 space-y-2.5">
                <div><dt className="inline font-semibold text-ink">What the verifier checks. </dt><dd className="inline">{c.checks}</dd></div>
                <div><dt className="inline font-semibold text-ink">Why it matters. </dt><dd className="inline">{c.matters}</dd></div>
                <div><dt className="inline font-semibold text-ink">Where to look. </dt><dd className="inline">{c.look}</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
      <Callout>
        <p className="t-tag">{critical.pattern.title}</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          {critical.pattern.items.map((p) => (
            <div key={p.quote} className="border-l-2 border-rust pl-4">
              <p className="t-h4 italic">{p.quote}</p>
              <p className="mt-1.5 text-[14px] text-muted">{p.note}</p>
            </div>
          ))}
        </div>
      </Callout>
    </>
  )
}

export function ReproducibilityPanel() {
  const r = reproducibility
  return (
    <>
      <Intro data={r} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className={`${box} px-[30px] py-6`}><BarChart chart={r.chart} /></div>
          <div className={`${box} grid grid-cols-2 gap-6 px-[30px] py-6`}>
            {r.repeat.groups.map((g) => (
              <div key={g.tag}>
                <p className="font-serif text-[30px] leading-none text-ink">{g.count}</p>
                <p className="t-tag mt-2 !text-rust">{g.tag}</p>
                <p className="mt-2 text-[14px] leading-[1.5] text-muted">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {r.cases.map((c) => <MiniCase key={c.id} item={c} />)}
        </div>
      </div>
      <Callout>
        <p className="t-small"><strong className="text-ink">{r.repeat.why.lead}</strong> {r.repeat.why.body}</p>
      </Callout>
    </>
  )
}

export function ScopePanel() {
  const s = scope
  return (
    <>
      <Intro data={s} aside={<p className="t-meta">Hover a case to see what to check.</p>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.cases.map((c) => <MiniCase key={c.id} item={c} />)}
      </div>
      <Callout>
        <p className="t-tag">{s.limits.eyebrow}</p>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {[s.limits.tested, s.limits.notEstablished].map((b) => (
            <div key={b.title}>
              <h4 className="t-h4">{b.title}</h4>
              <p className="t-small mt-2">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="t-small mt-5 border-t border-line pt-4"><strong className="text-ink">{s.closer.strong}</strong>{s.closer.body}</p>
      </Callout>
    </>
  )
}

export function DriftPanel() {
  const d = drift
  return (
    <>
      <Intro data={d} aside={<span className="t-tag rounded-sm border border-rust/40 bg-rust/10 px-2.5 py-1 !text-rust">{d.badge}</span>} />
      <Table head={['Case', 'Runs', 'Distinct answers', 'Runs off reference', 'What changed between runs']}>
        {d.rows.map((row) => (
          <tr key={row.id}>
            <td className={`${td} whitespace-nowrap font-mono text-[13px] font-semibold text-ink`}>{row.id}</td>
            <td className={`${td} whitespace-nowrap font-mono text-[13px]`}>{row.runs}</td>
            <td className={`${td} whitespace-nowrap font-mono text-[13px]`}>{row.distinct}</td>
            <td className={`${td} whitespace-nowrap font-mono text-[13px] text-rust`}>{row.deviating}</td>
            <td className={`${td} text-body`}>{row.changed}</td>
          </tr>
        ))}
      </Table>
      <p className="t-body mt-6 max-w-[860px]"><Rich parts={d.totals} /></p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className={`${box} px-[30px] py-6`}>
          <p className="t-tag">{d.establish.title}</p>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2">
            {d.establish.points.map((p) => (
              <li key={p.lead} className="text-[14px] leading-[1.5] text-muted">
                <strong className="block text-ink">{p.lead}</strong>{p.body}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-mist px-[30px] py-6">
          <p className="t-tag">{d.vendors.eyebrow}</p>
          <p className="t-h4 mt-3 italic">{d.vendors.quote}</p>
          <p className="mt-3 text-[14px] leading-[1.5] text-muted">{d.vendors.body}</p>
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
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Table wide={false} head={['Case', 'Behaviour', 'Control', 'Evidence to record']}>
          {c.table.map((row) => (
            <tr key={row.id}>
              <td className={`${td} whitespace-nowrap font-mono text-[13px] font-semibold text-ink`}>{row.label ?? LABEL[row.id]}</td>
              <td className={`${td} text-body`}>{row.behaviour}</td>
              <td className={td}>{row.control}</td>
              <td className={td}>{row.evidence}</td>
            </tr>
          ))}
        </Table>
        <ol className={`${box} space-y-4 px-[30px] py-6`}>
          <p className="t-tag">How an assessment runs</p>
          {c.steps.map((s) => (
            <li key={s.tag} className="flex gap-4 text-[14px] leading-[1.5] text-muted">
              <span className="font-mono text-[12px] font-semibold text-clay">{s.n}</span>
              <span><strong className="text-ink">{s.lead}</strong> {s.body}</span>
            </li>
          ))}
          <li className="border-t border-rule pt-3 text-[13px] leading-[1.5] text-faint">{c.releaseNote}</li>
        </ol>
      </div>
      <Callout>
        <p className="t-tag">{c.outcome.eyebrow}</p>
        <p className="t-h4 mt-3">{c.outcome.title}</p>
        <p className="mt-2 font-serif text-[18px] italic text-muted">{c.outcome.tagline}</p>
      </Callout>
    </>
  )
}