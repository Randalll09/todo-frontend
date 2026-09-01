import * as React from "react"
import { LogOutIcon } from "lucide-react"

import { useAuth } from "@/contexts/useAuth"
import { LoginScreen } from "@/screens/LoginScreen"
import { SignUpScreen } from "@/screens/SignUpScreen"
import { AddTaskSheet, type NewTask } from "@/screens/AddTaskSheet"
import { Button } from "@/components/ui/button"

type Task = NewTask & { id: string; done: boolean }

function App() {
  const { status, user, login, signup, logout } = useAuth()
  const [authScreen, setAuthScreen] = React.useState<"login" | "signup">("login")

  function handleLogout() {
    setAuthScreen("login")
    return logout()
  }
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [tags, setTags] = React.useState([
    { id: "work", label: "업무" },
    { id: "personal", label: "개인" },
  ])
  const [tasks, setTasks] = React.useState<Task[]>([])

  if (status === "loading") {
    return (
      <div
        className="flex min-h-dvh items-center justify-center p-5"
        style={{ backgroundImage: "var(--grad-halo)" }}
      />
    )
  }

  if (status === "unauthenticated") {
    if (authScreen === "signup") {
      return (
        <SignUpScreen
          onSignUp={(input) => signup(input)}
          onBackToLogin={() => setAuthScreen("login")}
        />
      )
    }
    return (
      <LoginScreen
        onLogin={(username, password) => login({ username, password })}
        onForgotPassword={() => {}}
        onSignUp={() => setAuthScreen("signup")}
      />
    )
  }

  return (
    <div className="min-h-dvh bg-background p-5">
      <div className="mx-auto flex max-w-md flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">할 일</h1>
          <div className="flex items-center gap-2">
            {user && (
              <span className="text-sm text-muted-foreground">{user.name}</span>
            )}
            <Button variant="ghost" size="icon-sm" onClick={() => handleLogout()}>
              <LogOutIcon />
            </Button>
          </div>
        </div>
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
