import type { ReactNode } from "react"

import { AppTopBar } from "@/routes/AppShell"

/** Stand-in body for a route that has a screen design pending but no built UI yet. */
function ScreenPlaceholder({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 pb-6">
      <AppTopBar title={title} />
      <div className="px-5">
        {children ?? (
          <p className="text-sm text-muted-foreground">준비 중이에요.</p>
        )}
      </div>
    </div>
  )
}

export { ScreenPlaceholder }
