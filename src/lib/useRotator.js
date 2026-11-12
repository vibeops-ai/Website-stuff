import { useEffect, useRef, useState } from 'react'
import { createRotator } from './rotator.js'

// React wrapper around createRotator.
// Rotation runs while the tabs are on screen. Clicking the shown tab holds it;
// clicking another tab shows that one and starts the timer again. `cycle` changes whenever a fresh interval
// starts, so the progress bar restarts in step with the timer.
export function useRotator(count, intervalMs) {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [held, setHeld] = useState(false)
  const [visible, setVisible] = useState(false)
  const rotator = useRef(null)
  const running = visible && !held

  useEffect(() => {
    const r = createRotator({
      count,
      intervalMs,
      onChange: (i) => {
        setIndex(i)
        setCycle((c) => c + 1)
      },
    })
    rotator.current = r
    return () => r.stop()
  }, [count, intervalMs])

  useEffect(() => {
    if (running) rotator.current.resume()
    else rotator.current.pause()
    setCycle((c) => c + 1)
  }, [running])

  return {
    index,
    cycle,
    running,
    hold(i) {
      setHeld(true)
      rotator.current.pause()
      rotator.current.select(i)
    },
    moveTo(i) {
      setHeld(false)
      rotator.current.select(i)
    },
    setVisible,
  }
}
