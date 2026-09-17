import { useParams } from "react-router-dom"

import { ScreenPlaceholder } from "@/screens/app/ScreenPlaceholder"

/**
 * `/app/friends/:friendId` — view-only friend list + tasks.
 *
 * Requires an accepted Friendship + active ListShare (see BACKEND_INSTRUCTIONS.md).
 * That authorization is enforced server-side, not here: the API is expected to
 * respond with 403/empty for a friendId the viewer isn't shared with, and this
 * screen renders whatever state that response implies. Never mount edit/delete
 * controls on this route, even conditionally — it's read-only at the route level.
 */
function FriendDetailScreen() {
  const { friendId } = useParams<{ friendId: string }>()
  return (
    <ScreenPlaceholder title="친구의 목록">
      <p className="text-sm text-muted-foreground">
        {friendId} 님의 목록 — 준비 중이에요. (읽기 전용)
      </p>
    </ScreenPlaceholder>
  )
}

export { FriendDetailScreen }
