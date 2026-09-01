import { Navigate } from "react-router-dom"

import { useAuth } from "@/contexts/useAuth"

function RootRedirect() {
  const { status } = useAuth()

  if (status === "loading") {
    return (
      <div
        className="flex min-h-dvh items-center justify-center p-5"
        style={{ backgroundImage: "var(--grad-halo)" }}
      />
    )
  }

  return <Navigate to={status === "authenticated" ? "/app/today" : "/login"} replace />
}

export { RootRedirect }
