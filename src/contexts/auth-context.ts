import * as React from "react"

import type { CurrentUser, LoginInput, SignUpInput } from "@/lib/auth-api"

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

type AuthContextValue = {
  status: AuthStatus
  user: CurrentUser | null
  login: (input: LoginInput) => Promise<void>
  signup: (input: SignUpInput) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export { AuthContext, type AuthStatus, type AuthContextValue }
