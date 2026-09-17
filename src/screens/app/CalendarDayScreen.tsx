import { useParams } from "react-router-dom"

import { ScreenPlaceholder } from "@/screens/app/ScreenPlaceholder"

/** `/app/calendar/:date` — optional day drill-in from the calendar view. */
function CalendarDayScreen() {
  const { date } = useParams<{ date: string }>()
  return (
    <ScreenPlaceholder title={date ?? "날짜"}>
      <p className="text-sm text-muted-foreground">{date} 의 할 일이 이곳에 표시돼요.</p>
    </ScreenPlaceholder>
  )
}

export { CalendarDayScreen }
