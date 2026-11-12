import { useCallback, useState } from 'react'
import { footer, hero } from './content.js'
import { BookingModal } from './components/BookingModal.jsx'
import { Example, Logo } from './components/Example.jsx'
import { Explorer } from './components/Explorer.jsx'
import { Hero } from './components/Hero.jsx'

export default function App() {
  const [booking, setBooking] = useState(false)
  const openBooking = () => setBooking(true)
  const closeBooking = useCallback(() => setBooking(false), [])

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <button onClick={openBooking} className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-semibold transition hover:border-ink">
          {hero.primaryCta}
        </button>
      </nav>
      <main>
        <Hero onCta={openBooking} />
        <Example />
        <Explorer />
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] md:text-5xl">{hero.title.join(' ')}</h2>
          <button onClick={openBooking} className="mt-8 rounded-lg bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-rust">
            {hero.primaryCta}
          </button>
        </section>
      </main>
      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2">
          <div>
            <Logo dark />
            <p className="mt-3 text-sm text-white/70">{footer.line}</p>
            <p className="mt-1 font-serif text-lg italic text-clay">{footer.tagline}</p>
          </div>
          <div className="text-sm text-white/70 md:text-right">
            <a href={`mailto:${footer.email}`} className="hover:text-white">{footer.email}</a>
            <p className="mt-1">{footer.site}</p>
            <p className="mt-1">© {new Date().getFullYear()} {footer.name}</p>
          </div>
          <p className="text-[11px] leading-relaxed text-white/40 md:col-span-2">{footer.disclaimer}</p>
        </div>
      </footer>
      <BookingModal open={booking} onClose={closeBooking} />
    </>
  )
}
