import * as React from "react"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { ImagePlusIcon } from "lucide-react"

import { AppTopBar } from "@/routes/AppShell"
import { AddTaskSheet, type NewTask } from "@/screens/AddTaskSheet"
import { Button } from "@/components/ui/button"

type Task = NewTask & { id: string; done: boolean }

// Placeholder data until a lists/tasks API exists.
const PLACEHOLDER_TAGS = [
  { id: "work", label: "업무" },
  { id: "personal", label: "개인" },
]

/**
 * `/app/lists/:listId` — the canonical single-list view (cover header + task
 * rows). Also what `/app/today` conceptually filters over, per ROUTES.md.
 */
function ListDetailScreen() {
  const { listId } = useParams<{ listId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const composeOpen = searchParams.get("compose") === "task"
  const editCoverOpen = searchParams.get("editCover") === "1"

  const [tasks, setTasks] = React.useState<Task[]>([])

  function setParam(key: string, value: string | null) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  }

  function openTaskDetail(taskId: string) {
    // Layer the item detail as a modal over this screen (shareable/back-safe).
    navigate(`/app/lists/${listId}/tasks/${taskId}`, {
      state: { backgroundLocation: location },
    })
  }

  return (
    <div className="flex flex-col gap-3 pb-6">
      <div className="flex items-center justify-between px-5 pt-5">
        <AppTopBar title={PLACEHOLDER_TAGS.find((t) => t.id === listId)?.label ?? listId ?? "목록"} />
        <Button variant="ghost" size="icon-sm" onClick={() => setParam("editCover", "1")}>
          <ImagePlusIcon />
        </Button>
      </div>

      <div className="flex flex-col gap-2 px-5">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground">아직 할 일이 없어요.</p>
        )}
        {tasks.map((t) => (
          <Link
            key={t.id}
            to={`/app/lists/${listId}/tasks/${t.id}`}
            onClick={(e) => {
              e.preventDefault()
              openTaskDetail(t.id)
            }}
            className="block rounded-2xl border border-sand-200 bg-card px-4 py-3 text-sm shadow-(--shadow-sm)"
          >
            {t.title}
          </Link>
        ))}
        <Button onClick={() => setParam("compose", "task")} className="mt-2 self-start">
          + 할 일 추가
        </Button>
      </div>

      <AddTaskSheet
        open={composeOpen}
        onOpenChange={(open) => setParam("compose", open ? "task" : null)}
        tags={PLACEHOLDER_TAGS}
        onCreateTag={() => listId ?? ""}
        onSave={(task) => {
          setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID(), done: false }])
        }}
      />

      {editCoverOpen && (
        // Placeholder for the header photo swap sheet (`?editCover=1`).
        <div
          className="fixed inset-0 z-30 flex items-end justify-center bg-black/20"
          onClick={() => setParam("editCover", null)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-card p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted-foreground">커버 사진 변경 — 준비 중이에요.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export { ListDetailScreen }
