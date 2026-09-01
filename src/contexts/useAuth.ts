import * as React from "react"

import { AuthContext, type AuthContextValue } from "@/contexts/auth-context"

function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}

export { useAuth }
