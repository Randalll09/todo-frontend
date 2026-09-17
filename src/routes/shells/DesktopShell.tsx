import { NavLink, Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/routes/nav-items"

/** Desktop shell: fixed sidebar nav + main pane, per ROUTES.md. */
function DesktopShell() {
  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-sand-200 bg-card px-3 py-5">
        <h1 className="mb-4 px-2 font-heading text-lg font-bold">할 일</h1>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blush-100 text-blush-700"
                      : "text-muted-foreground hover:bg-sand-100"
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export { DesktopShell }
