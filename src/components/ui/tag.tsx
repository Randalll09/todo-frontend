import * as React from "react"

import { cn } from "@/lib/utils"

function Tag({
  className,
  selected = false,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      data-slot="tag"
      data-selected={selected}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-sand-200 bg-sand-0 px-3 text-[0.8rem] font-medium text-muted-foreground transition-all duration-140 ease-(--ease-soft) outline-none select-none hover:bg-sand-100 focus-visible:shadow-(--ring-focus) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 data-[selected=true]:border-transparent data-[selected=true]:bg-blush-100 data-[selected=true]:text-blush-700 data-[selected=true]:hover:bg-blush-200",
        className
      )}
      {...props}
    />
  )
}

export { Tag }
