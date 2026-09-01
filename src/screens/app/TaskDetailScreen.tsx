import { useNavigate, useParams } from "react-router-dom"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/** `/app/lists/:listId/tasks/:taskId` — item detail, rendered full-page on a direct/deep link. */
function TaskDetailScreen() {
  const { listId, taskId } = useParams<{ listId: string; taskId: string }>()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">할 일 상세</h2>
        <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/app/lists/${listId}`)}>
          <XIcon />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">task {taskId} — 준비 중이에요.</p>
    </div>
  )
}

/** Same screen, layered as a modal over `/app/lists/:listId` (background-location route). */
function TaskDetailOverlay() {
  const navigate = useNavigate()
  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/20 sm:items-center"
      onClick={() => navigate(-1)}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <TaskDetailScreen />
      </div>
    </div>
  )
}

export { TaskDetailScreen, TaskDetailOverlay }
