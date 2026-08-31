import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = {
  email?: string
  password?: string
}

function LoginScreen({
  onLogin,
  onForgotPassword,
  onSignUp,
}: {
  onLogin: (email: string, password: string) => Promise<void>
  onForgotPassword?: () => void
  onSignUp?: () => void
}) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    const nextErrors: FieldErrors = {}
    if (!EMAIL_RE.test(email)) {
      nextErrors.email = "이메일 형식을 다시 확인해 주세요"
    }
    if (!password) {
      nextErrors.password = "비밀번호를 입력해 주세요"
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await onLogin(email, password)
    } catch {
      setErrors({ email: "이 정보를 다시 확인해 주세요" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-dvh items-center justify-center p-5"
      style={{ backgroundImage: "var(--grad-halo)" }}
    >
      <Card className="w-full max-w-sm rounded-[28px] p-1 shadow-(--shadow-lg)">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-5">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              very human
            </h1>
            <p className="text-sm text-muted-foreground">
              오늘 기분부터 적어볼까요?
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                placeholder="이메일"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                aria-invalid={!!errors.email}
                className={cn(errors.email && "focus-visible:shadow-(--ring-focus)")}
              />
              {errors.email && (
                <p className="px-1 text-xs text-(--danger)">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                type="password"
                placeholder="비밀번호"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                }}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="px-1 text-xs text-(--danger)">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="default"
              disabled={submitting}
              className="h-[46px] w-full rounded-full text-[0.95rem]"
            >
              {submitting && <Loader2Icon className="animate-spin" />}
              시작하기
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onForgotPassword}
              className="h-[46px] w-full rounded-full"
            >
              비밀번호를 잊었어요
            </Button>
          </div>

          <p className="text-center text-xs text-(--text-faint)">
            계정이 아직 없나요?{" "}
            <button
              type="button"
              onClick={onSignUp}
              className="font-medium text-(--text-link) underline underline-offset-3 hover:text-(--text-link-hover)"
            >
              가입하기
            </button>
          </p>
        </form>
      </Card>
    </div>
  )
}

export { LoginScreen }
