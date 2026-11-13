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

// Continues the example card directly, so the tabs show right under it (continuity).
export function Explorer() {
  const { index, cycle, running, hold, moveTo, setVisible } = useRotator(TABS.length, INTERVAL_MS)
  const tabsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 })
    observer.observe(tabsRef.current)
    return () => observer.disconnect()
  }, [setVisible])

  return (
    <section className="pb-[120px]">
      <div className="wrap">
        <div className="border-x border-b border-line bg-paper px-[30px]">
          <div ref={tabsRef} role="tablist" aria-label="Full report" className="-mx-[30px] flex border-b border-line px-[30px]">
            {TABS.map((tab, i) => {
              const active = i === index
              return (
                <button
                  key={tab.name}
                  role="tab"
                  aria-selected={active}
                  onClick={() => (i === index ? hold(i) : moveTo(i))}
                  className={`relative flex-1 py-[18px] text-[15px] transition focus-visible:outline-2 focus-visible:outline-clay ${
                    active ? 'font-semibold text-ink' : 'text-faint hover:text-ink'
                  }`}
                >
                  {tab.name}
                  {active && (
                    <span
                      key={cycle}
                      aria-hidden
                      className="absolute bottom-[-1px] left-0 h-[2px] bg-clay"
                      style={running ? { animation: `fill ${INTERVAL_MS}ms linear forwards` } : { width: '100%' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <p className="t-meta py-4">
            {running ? 'Scroll down for the full report. Click the highlighted tab to stay on it.' : 'Staying on this tab. Click another tab to continue.'}
          </p>
        </div>

        {/* Every panel sits in the same grid cell, so the area is as tall as the tallest panel
            and the page never jumps when the tabs change. */}
        <div role="tabpanel" className="mt-16 grid grid-cols-[minmax(0,1fr)]">
          {TABS.map(({ name, Panel }, i) => (
            <div key={name} className={`min-w-0 [grid-area:1/1] ${i === index ? 'panel-in' : 'invisible'}`} aria-hidden={i !== index}>
              <Panel />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}