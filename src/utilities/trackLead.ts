// Fires the "lead" conversion after a form submission is saved.
// Browser-only: call it from Client Components (e.g. RealEstateViewingForm).
//
// - dataLayer always gets the event, even without GA / Meta IDs, so it can be
//   checked in a demo via DevTools (`window.dataLayer`).
// - gtag / fbq are only called when their scripts were loaded by
//   src/app/(lp)/layout.tsx (NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID).
// - The submission ID is sent as lead_id / eventID so a lead can be matched
//   to its Form Submission (and deduplicated by Meta).

type DataLayerEvent = { event: string } & Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: (DataLayerEvent | IArguments | unknown[])[]
    fbq?: (command: 'init' | 'track', ...args: unknown[]) => void
    gtag?: (command: 'config' | 'event' | 'js', ...args: unknown[]) => void
  }
}

export const trackLead = (leadId: number | string): void => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'generate_lead', form: 'book_a_viewing', lead_id: leadId })

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { lead_id: leadId })
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {}, { eventID: String(leadId) })
  }

  console.info('[lead] generate_lead', leadId)
}
