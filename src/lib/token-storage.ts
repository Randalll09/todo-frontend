const ACCESS_TOKEN_KEY = "todo.accessToken"
const REFRESH_TOKEN_KEY = "todo.refreshToken"

type Tokens = {
  accessToken: string
  refreshToken: string
}

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

function setTokens(tokens: Tokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export { getAccessToken, getRefreshToken, setTokens, clearTokens, type Tokens }
