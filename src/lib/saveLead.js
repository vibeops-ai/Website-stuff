export const LEAD_FIELDS = ['name', 'phone', 'email', 'company', 'position']

// Checks a lead and saves it through `database.insertLead(row)`, which returns { error }.
// Returns { ok: true }, { ok: false, reason: 'invalid', errors }, or { ok: false, reason: 'failed' }.
export async function saveLead(input, database) {
  const lead = Object.fromEntries(LEAD_FIELDS.map((field) => [field, String(input[field] ?? '').trim()]))

  const errors = {}
  for (const field of LEAD_FIELDS) {
    if (!lead[field]) errors[field] = 'Required'
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = 'Enter a valid email'
  if (lead.phone && lead.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number'

  if (Object.keys(errors).length) return { ok: false, reason: 'invalid', errors }

  try {
    const { error } = await database.insertLead(lead)
    return error ? { ok: false, reason: 'failed' } : { ok: true }
  } catch {
    return { ok: false, reason: 'failed' }
  }
}
