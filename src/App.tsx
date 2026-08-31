import * as React from "react"

import { LoginScreen } from "@/screens/LoginScreen"
import { AddTaskSheet, type NewTask } from "@/screens/AddTaskSheet"
import { Button } from "@/components/ui/button"

type Task = NewTask & { id: string; done: boolean }

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [tags, setTags] = React.useState([
    { id: "work", label: "업무" },
    { id: "personal", label: "개인" },
  ])
  const [tasks, setTasks] = React.useState<Task[]>([])

  if (!loggedIn) {
    return (
      <LoginScreen
        onLogin={async (_email, password) => {
          if (!password) throw new Error("invalid")
          await new Promise((r) => setTimeout(r, 400))
          setLoggedIn(true)
        }}
        onForgotPassword={() => {}}
        onSignUp={() => {}}
      />
    )
  }

  return (
    <div className="min-h-dvh bg-background p-5">
      <div className="mx-auto flex max-w-md flex-col gap-3">
        <h1 className="font-heading text-xl font-bold">할 일</h1>
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
        <Button onClick={() => setSheetOpen(true)} className="mt-2 self-start">
          + 할 일 추가
        </Button>
      </div>

      <AddTaskSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
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

export default App
