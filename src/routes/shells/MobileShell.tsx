import { NavLink, Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/routes/nav-items"

/** Mobile shell: content area + a fixed bottom-nav bar, per ROUTES.md. */
function MobileShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-sand-200 bg-card/95 backdrop-blur-sm">
        <ul className="mx-auto flex max-w-md items-center justify-between px-2 py-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 text-[0.7rem] font-medium transition-colors",
                    isActive ? "text-blush-600" : "text-muted-foreground"
                  )
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export { MobileShell }
