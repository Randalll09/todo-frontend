import { apiFetch, ApiError } from "@/lib/api-client"
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  type Tokens,
} from "@/lib/token-storage"

type SignUpInput = {
  username: string
  name: string
  email: string
  password: string
}

type LoginInput = {
  username: string
  password: string
}

type CurrentUser = {
  id: string
  username: string
  name: string
  email: string
}

async function signup(input: SignUpInput): Promise<Tokens> {
  const tokens = await apiFetch<Tokens>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  })
  setTokens(tokens)
  return tokens
}

async function login(input: LoginInput): Promise<Tokens> {
  const tokens = await apiFetch<Tokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  })
  setTokens(tokens)
  return tokens
}

async function logout(): Promise<void> {
  const accessToken = getAccessToken()
  try {
    if (accessToken) {
      await apiFetch<void>("/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    }
  } finally {
    clearTokens()
  }
}

async function refreshTokens(): Promise<Tokens> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new ApiError("no refresh token", 401)
  try {
    const tokens = await apiFetch<Tokens>("/auth/refresh", {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
    setTokens(tokens)
    return tokens
  } catch (err) {
    clearTokens()
    throw err
  }
}

/**
 * access token 을 붙여 요청하고, 401 을 받으면 refresh token 으로 한 번만 재발급을 시도한다.
 * 재발급도 실패하면 로그인 세션이 끝난 것이므로 그대로 예외를 던진다.
 */
async function authFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const accessToken = getAccessToken()
  try {
    return await apiFetch<T>(path, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken ?? ""}` },
    })
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 401) throw err

    const tokens = await refreshTokens()
    return apiFetch<T>(path, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${tokens.accessToken}` },
    })
  }
}

function getMe(): Promise<CurrentUser> {
  return authFetch<CurrentUser>("/users/me")
}

export {
  signup,
  login,
  logout,
  authFetch,
  getMe,
  type SignUpInput,
  type LoginInput,
  type CurrentUser,
}
