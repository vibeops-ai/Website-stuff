import { useCallback, useState } from 'react'
import { footer, hero } from './content.js'
import { BookingModal } from './components/BookingModal.jsx'
import { Example } from './components/Example.jsx'
import { Explorer } from './components/Explorer.jsx'
import { Hero } from './components/Hero.jsx'
import { Logo } from './components/Logo.jsx'

export default function App() {
  const [booking, setBooking] = useState(false)
  const openBooking = () => setBooking(true)
  const closeBooking = useCallback(() => setBooking(false), [])

  return (
    <>
      <nav className="border-b border-line">
        <div className="wrap flex h-[76px] items-center justify-between">
          <a href="https://ghartlabs.com" aria-label="GoodHart Labs home"><Logo /></a>
          <button onClick={openBooking} className="text-[17px] text-body transition hover:text-clay">{hero.primaryCta}</button>
        </div>
      </nav>

      <main>
        <Hero onCta={openBooking} />
        <Example />
        <Explorer />
        <section className="section">
          <div className="wrap">
            <p className="t-label">{hero.closingLabel}</p>
            <h2 className="t-h2 mt-[26px] max-w-[720px]">
              The independent, expert-led evaluation of your clinical AI
            </h2>
            <button onClick={openBooking} className="btn btn-primary mt-10">{hero.primaryCta} <span aria-hidden>→</span></button>
          </div>
        </section>
      </main>

      <footer className="border-t border-line" style={{ padding: '40px 0 90px' }}>
        <div className="wrap">
          {/* footer-top: logo left, links right */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '26px' }}>
            <a href="https://ghartlabs.com" aria-label="GoodHart Labs home"><Logo /></a>
            <nav style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
              {footer.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ color: 'var(--color-body)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-clay)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-body)'}
                >{item.label}</a>
              ))}
            </nav>
          </div>
          {/* fnote */}
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-faint)', maxWidth: '60ch', fontSize: '12px', lineHeight: '1.7', margin: 0 }}>
            {footer.tagline}
          </p>
        </div>
      </footer>

      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}