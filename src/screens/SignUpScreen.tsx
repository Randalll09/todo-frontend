import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ApiError } from "@/lib/api-client"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_RE = /^[a-zA-Z0-9_]+$/

type FieldErrors = {
  username?: string
  name?: string
  email?: string
  password?: string
}

function SignUpScreen({
  onSignUp,
  onBackToLogin,
}: {
  onSignUp: (input: {
    username: string
    name: string
    email: string
    password: string
  }) => Promise<void>
  onBackToLogin?: () => void
}) {
  const [username, setUsername] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    const nextErrors: FieldErrors = {}
    if (!USERNAME_RE.test(username) || username.length > 32) {
      nextErrors.username = "영문, 숫자, _ 만 사용해 32자 이하로 입력해 주세요"
    }
    if (!name.trim() || name.length > 32) {
      nextErrors.name = "이름을 32자 이하로 입력해 주세요"
    }
    if (!EMAIL_RE.test(email)) {
      nextErrors.email = "이메일 형식을 다시 확인해 주세요"
    }
    if (password.length < 8 || password.length > 255) {
      nextErrors.password = "비밀번호는 8자 이상 입력해 주세요"
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSignUp({ username, name: name.trim(), email, password })
    } catch (err) {
      const message =
        err instanceof ApiError && err.status === 409
          ? err.message
          : "가입에 실패했어요. 잠시 후 다시 시도해 주세요"
      setErrors({ username: message })
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
              계정 만들기
            </h1>
            <p className="text-sm text-muted-foreground">
              시작할 준비가 되셨나요?
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Input
                type="text"
                placeholder="아이디"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }))
                }}
                aria-invalid={!!errors.username}
              />
              {errors.username && (
                <p className="px-1 text-xs text-(--danger)">{errors.username}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                type="text"
                placeholder="이름"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="px-1 text-xs text-(--danger)">{errors.name}</p>
              )}
            </div>

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
                autoComplete="new-password"
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
              가입하기
            </Button>
          </div>

          <p className="text-center text-xs text-(--text-faint)">
            이미 계정이 있나요?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-medium text-(--text-link) underline underline-offset-3 hover:text-(--text-link-hover)"
            >
              로그인
            </button>
          </p>
        </form>
      </Card>
    </div>
  )
}

export { SignUpScreen }
