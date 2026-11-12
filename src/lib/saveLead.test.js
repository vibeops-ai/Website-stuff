import { describe, expect, it, vi } from 'vitest'
import { saveLead } from './saveLead.js'

const valid = {
  name: '  Ada Lovelace ',
  phone: '+1 (608) 555 0134',
  email: 'ada@clinic.ai',
  company: 'Clinic AI',
  position: 'Chief Executive Officer',
}

function fakeDatabase(result = { error: null }) {
  return { insertLead: vi.fn(async () => result) }
}

describe('saveLead', () => {
  it('saves a valid lead with trimmed fields', async () => {
    const database = fakeDatabase()
    const result = await saveLead(valid, database)
    expect(result).toEqual({ ok: true })
    expect(database.insertLead).toHaveBeenCalledWith({ ...valid, name: 'Ada Lovelace' })
  })

  it('rejects missing fields without touching the database', async () => {
    const database = fakeDatabase()
    const result = await saveLead({ ...valid, company: ' ', position: '' }, database)
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('invalid')
    expect(Object.keys(result.errors).sort()).toEqual(['company', 'position'])
    expect(database.insertLead).not.toHaveBeenCalled()
  })

  it('rejects an email without an at sign and a domain', async () => {
    const result = await saveLead({ ...valid, email: 'ada.clinic' }, fakeDatabase())
    expect(result.errors).toHaveProperty('email')
  })

  it('rejects a phone number with too few digits', async () => {
    const result = await saveLead({ ...valid, phone: '12-34' }, fakeDatabase())
    expect(result.errors).toHaveProperty('phone')
  })

  it('reports a failed save when the database returns an error', async () => {
    const result = await saveLead(valid, fakeDatabase({ error: { message: 'down' } }))
    expect(result).toEqual({ ok: false, reason: 'failed' })
  })

  it('reports a failed save when the database throws', async () => {
    const database = { insertLead: vi.fn(async () => { throw new Error('offline') }) }
    const result = await saveLead(valid, database)
    expect(result).toEqual({ ok: false, reason: 'failed' })
  })
})
