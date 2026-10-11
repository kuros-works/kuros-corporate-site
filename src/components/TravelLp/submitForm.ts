import { getClientSideURL } from '@/utilities/getURL'

// Saves one submission of a form-builder form (same request as the site's
// FormBlock). Shared by the Travel LP forms. The server only checks that the
// form exists, so required fields must be validated before calling this.

export type SubmitFormResult = { ok: true } | { message: string; ok: false }

export const submitForm = async ({
  formID,
  values,
}: {
  formID: number | string
  values: Record<string, string>
}): Promise<SubmitFormResult> => {
  try {
    const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
      body: JSON.stringify({
        form: formID,
        submissionData: Object.entries(values).map(([field, value]) => ({ field, value })),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (res.ok) return { ok: true }

    const body = await res.json().catch(() => null)

    return { message: body?.errors?.[0]?.message || 'Something went wrong.', ok: false }
  } catch {
    return { message: 'Something went wrong.', ok: false }
  }
}
