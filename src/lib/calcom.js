const NAMESPACE = 'review'
let loaded = false

// Cal.com's own loader snippet: it queues calls until embed.js has downloaded.
function loadCal() {
  if (loaded) return
  ;(function (C, A, L) {
    const p = (a, ar) => a.q.push(ar)
    const d = C.document
    C.Cal = C.Cal || function () {
      const cal = C.Cal
      const ar = arguments
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        d.head.appendChild(d.createElement('script')).src = A
        cal.loaded = true
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments) }
        const namespace = ar[1]
        api.q = api.q || []
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api
          p(cal.ns[namespace], ar)
          p(cal, ['initNamespace', namespace])
        } else p(cal, ar)
        return
      }
      p(cal, ar)
    }
  })(window, 'https://app.cal.com/embed/embed.js', 'init')
  window.Cal('init', NAMESPACE, { origin: 'https://app.cal.com' })
  loaded = true
}

// Shows the Cal.com booking calendar inside `element`, with name and email filled in.
export function showCalendar({ element, calLink, name, email, onBooked }) {
  loadCal()
  const cal = window.Cal.ns[NAMESPACE]
  cal('inline', { elementOrSelector: element, calLink, config: { layout: 'month_view', name, email } })
  cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
  // Cal.com has used both event names; listening to both is harmless.
  cal('on', { action: 'bookingSuccessfulV2', callback: onBooked })
  cal('on', { action: 'bookingSuccessful', callback: onBooked })
}
