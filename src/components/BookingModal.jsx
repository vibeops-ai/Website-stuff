import { useCallback, useEffect, useRef, useState } from 'react'
import { POSITIONS } from '../content.js'
import { showCalendar } from '../lib/calcom.js'
import { leadsDatabase } from '../lib/leadsDatabase.js'
import { saveLead } from '../lib/saveLead.js'

const CAL_LINK = import.meta.env.VITE_CAL_LINK
const EMPTY = { name: '', phone: '', email: '', company: '', position: '' }
const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
  { name: 'company', label: 'Company name', type: 'text', autoComplete: 'organization' },
]

// Steps: form → calendar → done. The lead is saved the moment the visitor presses Next.
export function BookingModal({ open, onClose }) {
  const [step, setStep] = useState('form')
  const [lead, setLead] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const markBooked = useCallback(() => setStep('done'), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, step]) // eslint-disable-line react-hooks/exhaustive-deps

  function close() {
    onClose()
    if (step === 'done') {
      setStep('form')
      setLead(EMPTY)
    }
  }

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    const result = await saveLead(lead, leadsDatabase)
    setSaving(false)
    if (result.reason === 'invalid') return setErrors(result.errors)
    // A failed save should not cost us the booking, so the visitor still goes on to the calendar.
    if (!result.ok) console.error('Lead could not be saved to Supabase')
    setSaved(result.ok)
    setErrors({})
    setStep('calendar')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-line bg-paper p-6 shadow-2xl md:p-10"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="t-label !text-clay">Step {{ form: 1, calendar: 2, done: 3 }[step]} of 3</p>
            <h2 id="booking-title" className="t-h3 mt-2">{{ form: 'Tell us about you', calendar: 'Pick a time', done: 'Thank you for connecting' }[step]}</h2>
          </div>
          <button onClick={close} aria-label="Close" className="text-2xl leading-none text-faint hover:text-ink">×</button>
        </div>

        {step === 'form' && (
          <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <Field key={f.name} label={f.label} error={errors[f.name]}>
                <input
                  type={f.type}
                  autoComplete={f.autoComplete}
                  value={lead[f.name]}
                  onChange={(e) => setLead({ ...lead, [f.name]: e.target.value })}
                  aria-invalid={Boolean(errors[f.name])}
                  maxLength={f.name === 'phone' ? 30 : 200}
                  className={inputClass(errors[f.name])}
                  autoFocus={f.name === 'name'}
                />
              </Field>
            ))}
            <Field label="Position in the company" error={errors.position}>
              <select value={lead.position} onChange={(e) => setLead({ ...lead, position: e.target.value })} className={inputClass(errors.position)}>
                <option value="">Select</option>
                {POSITIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <div className="flex items-end sm:col-start-2 sm:justify-end">
              <button disabled={saving} className="w-full btn btn-primary disabled:opacity-60 sm:w-auto">
                {saving ? 'Saving…' : 'Next'}
              </button>
            </div>
          </form>
        )}

        {step === 'calendar' && <Calendar lead={lead} saved={saved} onBooked={markBooked} />}

        {step === 'done' && (
          <div className="space-y-4">
            <p className="t-small">
              Your call is booked and a confirmation is on its way to {lead.email}. We will use the call to understand your product, agree what to evaluate and scope the review.
            </p>
            <button onClick={close} className="btn btn-primary">Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

function Calendar({ lead, saved, onBooked }) {
  const container = useRef(null)

  useEffect(() => {
    if (!CAL_LINK) return
    showCalendar({ element: container.current, calLink: CAL_LINK, name: lead.name, email: lead.email, onBooked })
  }, [lead, onBooked])

  if (!CAL_LINK) {
    return (
      <p className="bg-mist p-4 t-small">
        Booking is not switched on yet.{' '}
        {saved ? `We have your details and will email ${lead.email} to set up a time.` : 'Please email hi@ghartlabs.com to book a call.'}
      </p>
    )
  }
  return <div ref={container} className="h-[640px] min-w-[300px] overflow-auto" />
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="t-tag mb-1.5 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rust">{error}</span>}
    </label>
  )
}

function inputClass(error) {
  return `w-full rounded-sm border bg-white px-3.5 py-3 text-[16px] text-ink outline-none transition focus:border-ink ${error ? 'border-rust' : 'border-line'}`
}