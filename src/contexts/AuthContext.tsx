import * as React from "react"

import * as authApi from "@/lib/auth-api"
import { clearTokens, getAccessToken } from "@/lib/token-storage"
import { AuthContext, type AuthStatus } from "@/contexts/auth-context"

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = React.useState<AuthStatus>(() =>
    getAccessToken() ? "loading" : "unauthenticated"
  )
  const [user, setUser] = React.useState<authApi.CurrentUser | null>(null)

  React.useEffect(() => {
    if (!getAccessToken()) return
    authApi
      .getMe()
      .then((me) => {
        setUser(me)
        setStatus("authenticated")
      })
      .catch(() => {
        clearTokens()
        setStatus("unauthenticated")
      })
  }, [])

  const login = React.useCallback(async (input: authApi.LoginInput) => {
    await authApi.login(input)
    setUser(await authApi.getMe())
    setStatus("authenticated")
  }, [])

  const signup = React.useCallback(async (input: authApi.SignUpInput) => {
    await authApi.signup(input)
    setUser(await authApi.getMe())
    setStatus("authenticated")
  }, [])

  const logout = React.useCallback(async () => {
    await authApi.logout().catch(() => {})
    setUser(null)
    setStatus("unauthenticated")
  }, [])

  const value = React.useMemo(
    () => ({ status, user, login, signup, logout }),
    [status, user, login, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
