import { LogOutIcon } from "lucide-react"

import { useIsDesktop } from "@/hooks/use-is-desktop"
import { useAuth } from "@/contexts/useAuth"
import { Button } from "@/components/ui/button"
import { DesktopShell } from "@/routes/shells/DesktopShell"
import { MobileShell } from "@/routes/shells/MobileShell"

/**
 * Two structurally different shells sharing the same `/app/*` route tree
 * (mobile bottom-nav vs. desktop sidebar), picked by viewport per ROUTES.md.
 */
function AppShell() {
  const isDesktop = useIsDesktop()
  return isDesktop ? <DesktopShell /> : <MobileShell />
}

/** Shared top bar rendered inside individual screens (kept out of the shells so it can vary per-screen later). */
function AppTopBar({ title }: { title: string }) {
  const { user, logout } = useAuth()
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <h2 className="font-heading text-xl font-bold">{title}</h2>
      <div className="flex items-center gap-2">
        {user && <span className="text-sm text-muted-foreground">{user.name}</span>}
        <Button variant="ghost" size="icon-sm" onClick={() => logout()}>
          <LogOutIcon />
        </Button>
      </div>
    </div>
  )
}

export { AppShell, AppTopBar }
