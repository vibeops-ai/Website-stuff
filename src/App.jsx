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
              {hero.title[0]} {hero.title[1]} <span className="text-muted">{hero.title[2]}</span>
            </h2>
            <button onClick={openBooking} className="btn btn-primary mt-10">{hero.primaryCta} <span aria-hidden>→</span></button>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="wrap grid gap-8 py-14 md:grid-cols-2">
          <div>
            <Logo />
            <p className="t-small mt-4">{footer.line}</p>
            <p className="mt-1 font-serif text-[18px] italic text-muted">{footer.tagline}</p>
          </div>
          <div className="t-meta space-y-1.5 md:text-right">
            <p><a href={`mailto:${footer.email}`} className="text-body hover:text-clay">{footer.email}</a></p>
            <p><a href="https://ghartlabs.com" className="text-body hover:text-clay">{footer.site}</a></p>
            <p>© {new Date().getFullYear()} {footer.name}</p>
          </div>
          <p className="text-[12px] leading-[1.6] text-faint md:col-span-2">{footer.disclaimer}</p>
        </div>
      </footer>

      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}