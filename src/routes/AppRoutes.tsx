import type { Location } from "react-router-dom"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import { AppShell } from "@/routes/AppShell"
import { LoginRoute } from "@/routes/LoginRoute"
import { RequireAuth } from "@/routes/RequireAuth"
import { RequireGuest } from "@/routes/RequireGuest"
import { RootRedirect } from "@/routes/RootRedirect"
import { SignUpRoute } from "@/routes/SignUpRoute"
import { CalendarDayScreen } from "@/screens/app/CalendarDayScreen"
import { CalendarScreen } from "@/screens/app/CalendarScreen"
import { FriendDetailScreen } from "@/screens/app/FriendDetailScreen"
import { FriendsScreen } from "@/screens/app/FriendsScreen"
import { HistoryScreen } from "@/screens/app/HistoryScreen"
import { ListDetailScreen } from "@/screens/app/ListDetailScreen"
import { ListsScreen } from "@/screens/app/ListsScreen"
import { SettingsFriendsScreen } from "@/screens/app/SettingsFriendsScreen"
import { SettingsNotificationsScreen } from "@/screens/app/SettingsNotificationsScreen"
import { SettingsProfileScreen } from "@/screens/app/SettingsProfileScreen"
import { SettingsScreen } from "@/screens/app/SettingsScreen"
import { TaskDetailOverlay, TaskDetailScreen } from "@/screens/app/TaskDetailScreen"
import { TodayScreen } from "@/screens/app/TodayScreen"

type ModalLocationState = { backgroundLocation?: Location } | null

/**
 * Route tree per ROUTES.md. `/app/lists/:listId/tasks/:taskId` is registered
 * twice on purpose: once in the main tree (full page on a direct/deep link),
 * once in the modal tree (layered overlay when navigated to from the list,
 * via `state.backgroundLocation` — closing it returns to the exact list
 * scroll position instead of a fresh navigation).
 */
function AppRoutes() {
  const location = useLocation()
  const state = location.state as ModalLocationState

  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route path="/" element={<RootRedirect />} />

        <Route element={<RequireGuest />}>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/signup" element={<SignUpRoute />} />
        </Route>

        <Route path="/app" element={<RequireAuth />}>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="today" replace />} />
            <Route path="today" element={<TodayScreen />} />

            <Route path="calendar" element={<CalendarScreen />} />
            <Route path="calendar/:date" element={<CalendarDayScreen />} />

            <Route path="lists" element={<ListsScreen />} />
            <Route path="lists/:listId" element={<ListDetailScreen />} />
            <Route path="lists/:listId/tasks/:taskId" element={<TaskDetailScreen />} />

            <Route path="history" element={<HistoryScreen />} />

            <Route path="settings" element={<SettingsScreen />}>
              <Route path="profile" element={<SettingsProfileScreen />} />
              <Route path="notifications" element={<SettingsNotificationsScreen />} />
              <Route path="friends" element={<SettingsFriendsScreen />} />
            </Route>

            <Route path="friends" element={<FriendsScreen />} />
            <Route path="friends/:friendId" element={<FriendDetailScreen />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/app/lists/:listId/tasks/:taskId" element={<TaskDetailOverlay />} />
        </Routes>
      )}
    </>
  )
}

export { AppRoutes }
