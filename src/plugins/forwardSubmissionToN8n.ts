import type { CollectionAfterChangeHook } from 'payload'

/**
 * Forwards each new form submission to an external n8n webhook.
 *
 * Runs after the submission row is already persisted, so a webhook failure is
 * logged and swallowed — it must never turn into a 500 for the visitor. The
 * submission is always retrievable in the admin panel regardless.
 *
 * Config via env:
 *   N8N_WEBHOOK_URL     - required; if unset the hook is a no-op
 *   N8N_WEBHOOK_SECRET  - optional; sent as the `X-Webhook-Secret` header for
 *                         the n8n Webhook node's Header Auth check
 */
export const forwardSubmissionToN8n: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const url = process.env.N8N_WEBHOOK_URL
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
        formId: typeof doc.form === 'object' ? doc.form?.id : doc.form,
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
