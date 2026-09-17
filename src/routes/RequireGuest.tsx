import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "@/contexts/useAuth"

/** Guards `/login` and `/signup` — bounces an already-authenticated session into `/app`. */
function RequireGuest() {
  const { status } = useAuth()

  if (status === "authenticated") {
    return <Navigate to="/app/today" replace />
  }

  return <Outlet />
}

export { RequireGuest }
