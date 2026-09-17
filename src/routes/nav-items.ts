import {
  CalendarDaysIcon,
  ListChecksIcon,
  SettingsIcon,
  SunIcon,
  TrophyIcon,
  type LucideIcon,
} from "lucide-react"

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { to: "/app/today", label: "오늘", icon: SunIcon },
  { to: "/app/calendar", label: "캘린더", icon: CalendarDaysIcon },
  { to: "/app/lists", label: "목록", icon: ListChecksIcon },
  { to: "/app/history", label: "기록", icon: TrophyIcon },
  { to: "/app/settings", label: "설정", icon: SettingsIcon },
]

export { NAV_ITEMS, type NavItem }
