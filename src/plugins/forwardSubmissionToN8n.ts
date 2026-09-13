import type { CollectionAfterChangeHook } from 'payload'

/**
 * Forwards each new form submission to a form-specific external webhook (n8n).
 *
 * Runs after the submission row is already persisted, so a webhook failure is
 * logged and swallowed — it must never turn into a 500 for the visitor. The
 * submission is always retrievable in the admin panel regardless.
 *
 * Each form is routed to its own webhook URL via the table below. A form
 * whose ID has no entry (or whose entry's URL env var is unset) is a no-op —
 * nothing is sent for it.
 *
 * Config via env:
 *   CONTACT_FORM_ID              - "forms" collection ID of the contact form
 *   N8N_WEBHOOK_URL_CONTACT_FORM - webhook URL for the contact form
 *   N8N_WEBHOOK_SECRET           - optional; sent as `X-Webhook-Secret` for
 *                                  every webhook below (n8n Header Auth check)
 */

// Add one entry per form as new notification destinations are needed.
const FORM_WEBHOOKS: { formID?: string; url?: string }[] = [
  { formID: process.env.CONTACT_FORM_ID, url: process.env.N8N_WEBHOOK_URL_CONTACT_FORM },
]

const getWebhookUrlForForm = (formID: string | number): string | undefined =>
  FORM_WEBHOOKS.find((entry) => entry.formID && entry.formID === String(formID))?.url

export const forwardSubmissionToN8n: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const formID = typeof doc.form === 'object' ? doc.form?.id : doc.form
  const url = formID != null ? getWebhookUrlForForm(formID) : undefined

  if (!url) return doc

  // submissionData: [{ field, value }] -> { field: value }
  const values = Object.fromEntries(
    (doc.submissionData ?? []).map((f: { field: string; value: unknown }) => [f.field, f.value]),
  )

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { 'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        submissionId: doc.id,
        formId: formID,
        createdAt: doc.createdAt,
        values,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      req.payload.logger.error(
        `n8n webhook failed for submission ${doc.id}: ${res.status} ${await res.text()}`,
      )
    }
  } catch (err) {
    // Never rethrow: the submission is saved; the webhook is best-effort.
    req.payload.logger.error({ err }, `n8n webhook request threw for submission ${doc.id}`)
  }

  return doc
}
