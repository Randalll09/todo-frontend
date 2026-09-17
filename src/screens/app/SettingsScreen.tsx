import { Link, Outlet, useLocation } from "react-router-dom"
import { BellIcon, ChevronRightIcon, DatabaseIcon, UserIcon, UsersIcon } from "lucide-react"

import { AppTopBar } from "@/routes/AppShell"

const SETTINGS_LINKS = [
  { to: "/app/settings/profile", label: "프로필", icon: UserIcon },
  { to: "/app/settings/notifications", label: "알림", icon: BellIcon },
  { to: "/app/settings/friends", label: "친구", icon: UsersIcon },
]

/** `/app/settings` — profile, notifications, dark mode, friends, backup. */
function SettingsScreen() {
  const location = useLocation()
  // Nested settings routes (profile/notifications/friends) render in place of the menu.
  const isNested = location.pathname !== "/app/settings"

  if (isNested) return <Outlet />

  return (
    <div className="flex flex-col gap-3 pb-6">
      <AppTopBar title="설정" />
      <ul className="flex flex-col gap-2 px-5">
        {SETTINGS_LINKS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex items-center justify-between rounded-2xl border border-sand-200 bg-card px-4 py-3 text-sm font-medium shadow-(--shadow-sm)"
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2 rounded-2xl border border-sand-200 bg-card px-4 py-3 text-sm text-muted-foreground shadow-(--shadow-sm)">
          <DatabaseIcon className="size-4" />
          백업 — 준비 중이에요.
        </li>
      </ul>
    </div>
  )
}

export { SettingsScreen }
