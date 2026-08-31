import * as React from "react"
import { format } from "date-fns"
import { ImagePlusIcon, PlusIcon, RepeatIcon, BellIcon, FlagIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export type NewTask = {
  title: string
  due?: Date
  hasTime: boolean
  recurring: boolean
  reminder: boolean
  priority: boolean
  tagId?: string
  photo?: File
}

type DuePreset = "today" | "tomorrow" | "date" | null

const TIME_SLOTS = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? "00" : "30"
  return `${String(hour).padStart(2, "0")}:${minute}`
})

function AddTaskSheet({
  open,
  onOpenChange,
  tags,
  onCreateTag,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  tags: { id: string; label: string }[]
  onCreateTag: (label: string) => string
  onSave: (task: NewTask) => void
}) {
  const [title, setTitle] = React.useState("")
  const [duePreset, setDuePreset] = React.useState<DuePreset>(null)
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined)
  const [dueTime, setDueTime] = React.useState<string | undefined>(undefined)
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [timePickerOpen, setTimePickerOpen] = React.useState(false)
  const [recurring, setRecurring] = React.useState(false)
  const [reminder, setReminder] = React.useState(false)
  const [priority, setPriority] = React.useState(false)
  const [tagId, setTagId] = React.useState<string | undefined>(undefined)
  const [addingTag, setAddingTag] = React.useState(false)
  const [newTagLabel, setNewTagLabel] = React.useState("")
  const [photo, setPhoto] = React.useState<File | undefined>(undefined)
  const [photoPreview, setPhotoPreview] = React.useState<string | undefined>(undefined)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const titleInputRef = React.useRef<HTMLInputElement>(null)

  const dirty =
    title.trim().length > 0 ||
    duePreset !== null ||
    recurring ||
    reminder ||
    priority ||
    tagId !== undefined ||
    photo !== undefined

  function reset() {
    setTitle("")
    setDuePreset(null)
    setDueDate(undefined)
    setDueTime(undefined)
    setRecurring(false)
    setReminder(false)
    setPriority(false)
    setTagId(undefined)
    setAddingTag(false)
    setNewTagLabel("")
    setPhoto(undefined)
    setPhotoPreview(undefined)
  }

  function requestClose() {
    if (dirty) {
      if (!window.confirm("작성 중인 내용이 사라져요. 닫을까요?")) return
    }
    onOpenChange(false)
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      requestClose()
      return
    }
    onOpenChange(next)
  }

  React.useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => titleInputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
    reset()
  }, [open])

  function handleSave() {
    if (!title.trim()) return
    onSave({
      title: title.trim(),
      due: dueDate,
      hasTime: !!dueTime,
      recurring,
      reminder,
      priority,
      tagId,
      photo,
    })
    onOpenChange(false)
  }

  function handleCreateTag() {
    const label = newTagLabel.trim()
    if (!label) return
    const id = onCreateTag(label)
    setTagId(id)
    setNewTagLabel("")
    setAddingTag(false)
  }

  function handlePhotoPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const dueLabel =
    duePreset === "today"
      ? "오늘"
      : duePreset === "tomorrow"
        ? "내일"
        : duePreset === "date" && dueDate
          ? format(dueDate, "M월 d일")
          : "날짜 선택"

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="mx-auto max-w-md rounded-t-(--r-2xl) rounded-b-none border-t-0 shadow-(--shadow-xl)"
      >
        <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-sand-300" />

        <SheetHeader className="pb-0">
          <SheetTitle>새 할 일</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 overflow-y-auto px-4 pb-2">
          <Input
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 입력…"
            className="h-11 text-base"
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">기한</span>
            <div className="flex flex-wrap gap-2">
              <Tag
                selected={duePreset === "today"}
                onClick={() => setDuePreset(duePreset === "today" ? null : "today")}
              >
                오늘
              </Tag>
              <Tag
                selected={duePreset === "tomorrow"}
                onClick={() => setDuePreset(duePreset === "tomorrow" ? null : "tomorrow")}
              >
                내일
              </Tag>
              <Popover
                open={datePickerOpen}
                onOpenChange={setDatePickerOpen}
              >
                <PopoverTrigger
                  render={
                    <Tag selected={duePreset === "date"}>
                      {duePreset === "date" && dueDate ? dueLabel : "날짜 선택"}
                    </Tag>
                  }
                />
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date)
                      setDuePreset(date ? "date" : null)
                      setDatePickerOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
                <PopoverTrigger
                  render={<Tag selected={!!dueTime}>{dueTime ?? "시간"}</Tag>}
                />
                <PopoverContent className="max-h-64 w-40 overflow-y-auto p-1">
                  <div className="flex flex-col">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setDueTime(slot)
                          setTimePickerOpen(false)
                        }}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-left text-sm hover:bg-blush-100 hover:text-blush-700",
                          dueTime === slot && "bg-blush-100 text-blush-700"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">옵션</span>
            <div className="flex flex-wrap gap-2">
              <Tag selected={recurring} onClick={() => setRecurring((v) => !v)}>
                <RepeatIcon />
                반복
              </Tag>
              <Tag selected={reminder} onClick={() => setReminder((v) => !v)}>
                <BellIcon />
                알림
              </Tag>
              <Tag selected={priority} onClick={() => setPriority((v) => !v)}>
                <FlagIcon className={cn(priority && "fill-current")} />
                우선 순위
              </Tag>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">태그</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag
                  key={t.id}
                  selected={tagId === t.id}
                  onClick={() => setTagId(tagId === t.id ? undefined : t.id)}
                >
                  {t.label}
                </Tag>
              ))}
              {addingTag ? (
                <div className="flex h-8 items-center gap-1">
                  <input
                    autoFocus
                    value={newTagLabel}
                    onChange={(e) => setNewTagLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleCreateTag()
                      }
                      if (e.key === "Escape") {
                        setAddingTag(false)
                        setNewTagLabel("")
                      }
                    }}
                    placeholder="태그 이름"
                    className="h-8 w-24 rounded-full border border-sand-200 bg-sand-0 px-3 text-[0.8rem] outline-none focus-visible:shadow-(--ring-focus)"
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => {
                      setAddingTag(false)
                      setNewTagLabel("")
                    }}
                  >
                    <XIcon />
                  </Button>
                </div>
              ) : (
                <Tag onClick={() => setAddingTag(true)}>
                  <PlusIcon />
                  태그
                </Tag>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              사진 첨부 (선택)
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="neu-raised relative flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-muted-foreground transition-shadow duration-140 focus-visible:shadow-(--ring-focus)"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlusIcon className="size-5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoPick}
            />
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            className="h-11 flex-1 rounded-full"
            onClick={requestClose}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="default"
            className="h-11 flex-1 rounded-full"
            disabled={!title.trim()}
            onClick={handleSave}
          >
            저장
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { AddTaskSheet }
