import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createRotator } from './rotator.js'

describe('createRotator', () => {
  let changes
  let rotator

  beforeEach(() => {
    vi.useFakeTimers()
    changes = []
    rotator = createRotator({ count: 3, intervalMs: 5000, onChange: (i) => changes.push(i) })
  })

  afterEach(() => {
    rotator.stop()
    vi.useRealTimers()
  })

  it('starts on the first tab and moves on after each interval', () => {
    expect(rotator.current()).toBe(0)
    vi.advanceTimersByTime(4999)
    expect(changes).toEqual([])
    vi.advanceTimersByTime(1)
    expect(changes).toEqual([1])
  })

  it('wraps back to the first tab after the last one', () => {
    vi.advanceTimersByTime(15000)
    expect(changes).toEqual([1, 2, 0])
  })

  it('does not move while paused', () => {
    rotator.pause()
    vi.advanceTimersByTime(20000)
    expect(changes).toEqual([])
  })

  it('gives a full interval after resuming', () => {
    vi.advanceTimersByTime(4000)
    rotator.pause()
    rotator.resume()
    vi.advanceTimersByTime(4999)
    expect(changes).toEqual([])
    vi.advanceTimersByTime(1)
    expect(changes).toEqual([1])
  })

  it('jumps to a selected tab and restarts the interval from there', () => {
    vi.advanceTimersByTime(4000)
    rotator.select(2)
    expect(changes).toEqual([2])
    vi.advanceTimersByTime(4999)
    expect(changes).toEqual([2])
    vi.advanceTimersByTime(1)
    expect(changes).toEqual([2, 0])
  })

  it('stays on a selected tab while paused', () => {
    rotator.pause()
    rotator.select(1)
    vi.advanceTimersByTime(20000)
    expect(changes).toEqual([1])
    expect(rotator.current()).toBe(1)
  })

  it('stops for good when stopped', () => {
    rotator.stop()
    rotator.resume()
    vi.advanceTimersByTime(20000)
    expect(changes).toEqual([])
  })
})
