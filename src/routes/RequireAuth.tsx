import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/contexts/useAuth"

/** Guards `/app/*` — redirects to `/login` when there is no authenticated session. */
function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === "loading") {
    return (
      <div
        className="flex min-h-dvh items-center justify-center p-5"
        style={{ backgroundImage: "var(--grad-halo)" }}
      />
    )
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export { RequireAuth }
