/** Formats a Payload date field value (ISO string) as `YYYY.MM.DD`. */
export const formatPostDate = (isoDate: string): string => isoDate.slice(0, 10).replaceAll('-', '.')
