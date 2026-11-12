import { useEffect, useRef } from 'react'
import { useRotator } from '../lib/useRotator.js'
import { ControlsPanel, DriftPanel, FindingsPanel, ReproducibilityPanel, ScopePanel, SeverityPanel } from './panels.jsx'

const TABS = [
  { name: 'Severity', Panel: SeverityPanel },
  { name: 'Findings', Panel: FindingsPanel },
  { name: 'Reproducibility', Panel: ReproducibilityPanel },
  { name: 'Scope', Panel: ScopePanel },
  { name: 'Drift', Panel: DriftPanel },
  { name: 'Controls', Panel: ControlsPanel },
]

const INTERVAL_MS = 5000

export function Explorer() {
  const { index, cycle, running, hold, moveTo, setVisible } = useRotator(TABS.length, INTERVAL_MS)
  const tabsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(tabsRef.current)
    return () => observer.disconnect()
  }, [setVisible])

  const { Panel } = TABS[index]

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-8">
      <div>
        <div ref={tabsRef} role="tablist" aria-label="Assessment detail" className="flex gap-1 overflow-x-auto rounded-xl bg-mist p-1">
          {TABS.map((tab, i) => {
            const active = i === index
            return (
              <button
                key={tab.name}
                role="tab"
                aria-selected={active}
                onClick={() => (i === index ? hold(i) : moveTo(i))}
                className={`relative shrink-0 overflow-hidden sm:flex-1 rounded-lg px-4 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-rust ${
                  active ? 'bg-ink font-bold text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-ink'
                }`}
              >
                {active && running && (
                  <span key={cycle} aria-hidden className="absolute inset-y-0 left-0 bg-white/15" style={{ animation: `fill ${INTERVAL_MS}ms linear forwards` }}>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-clay" />
                  </span>
                )}
                <span className="relative">{tab.name}</span>
              </button>
            )
          })}
        </div>
        <div role="tabpanel" className="mt-3 h-[min(700px,84svh)] overflow-y-auto rounded-2xl border border-line bg-[#f7f8fa] p-5 md:p-7">
          <div key={index} className="panel-in">
            <Panel />
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          {running ? `Moves every ${INTERVAL_MS / 1000} seconds. Click the highlighted tab to stay on it.` : 'Staying on this tab. Click another tab to continue.'}
        </p>
      </div>
    </section>
  )
}
