const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

/** NestJS 의 기본 에러 응답은 message 에 문자열 또는 문자열 배열을 담는다. */
type ErrorBody = { message?: string | string[] }

function extractMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback
  const message = (body as ErrorBody).message
  if (Array.isArray(message)) return message.join(", ")
  return message ?? fallback
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (res.status === HTTP_NO_CONTENT) return undefined as T

  const body = await res.json().catch(() => undefined)

  if (!res.ok) {
    throw new ApiError(extractMessage(body, res.statusText), res.status)
  }

  return body as T
}

const HTTP_NO_CONTENT = 204

export { apiFetch, ApiError }
