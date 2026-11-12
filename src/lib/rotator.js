// Moves through `count` tabs, one every `intervalMs`, calling onChange with the new index.
// Selecting a tab or resuming always gives the reader a full interval before the next move.
export function createRotator({ count, intervalMs, onChange }) {
  let index = 0
  let paused = false
  let stopped = false
  let timer = null

  function restart() {
    clearTimeout(timer)
    if (paused || stopped) return
    timer = setTimeout(() => {
      index = (index + 1) % count
      onChange(index)
      restart()
    }, intervalMs)
  }

  restart()

  return {
    current: () => index,
    select(next) {
      index = next
      onChange(index)
      restart()
    },
    pause() {
      paused = true
      clearTimeout(timer)
    },
    resume() {
      paused = false
      restart()
    },
    stop() {
      stopped = true
      clearTimeout(timer)
    },
  }
}
