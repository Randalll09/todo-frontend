import * as React from "react"
import { useSearchParams } from "react-router-dom"

import { AppTopBar } from "@/routes/AppShell"
import { AddTaskSheet, type NewTask } from "@/screens/AddTaskSheet"
import { Button } from "@/components/ui/button"

type Task = NewTask & { id: string; done: boolean }

/**
 * `/app/today` — default route after login. A virtual "all lists, due today"
 * filter; the canonical per-list view lives at `/app/lists/:listId` (ROUTES.md).
 */
function TodayScreen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const composeOpen = searchParams.get("compose") === "task"

  const [tags, setTags] = React.useState([
    { id: "work", label: "업무" },
    { id: "personal", label: "개인" },
  ])
  const [tasks, setTasks] = React.useState<Task[]>([])

  function setComposeOpen(open: boolean) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (open) next.set("compose", "task")
        else next.delete("compose")
        return next
      },
      { replace: !open }
    )
  }

  return (
    <div className="flex flex-col gap-3 pb-6">
      <AppTopBar title="오늘" />
      <div className="flex flex-col gap-3 px-5">
        {tasks.length === 0 && (
          <p className="text-sm text-muted-foreground">아직 할 일이 없어요.</p>
        )}
        {tasks.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-sand-200 bg-card px-4 py-3 text-sm shadow-(--shadow-sm)"
          >
            {t.title}
          </div>
        ))}
        <Button onClick={() => setComposeOpen(true)} className="mt-2 self-start">
          + 할 일 추가
        </Button>
      </div>

      <AddTaskSheet
        open={composeOpen}
        onOpenChange={setComposeOpen}
        tags={tags}
        onCreateTag={(label) => {
          const id = crypto.randomUUID()
          setTags((prev) => [...prev, { id, label }])
          return id
        }}
        onSave={(task) => {
          setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID(), done: false }])
        }}
      />
    </div>
  )
}

export { TodayScreen }
