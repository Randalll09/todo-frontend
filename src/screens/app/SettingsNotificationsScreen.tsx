import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScreenPlaceholder } from "@/screens/app/ScreenPlaceholder"

/** `/app/settings/notifications` */
function SettingsNotificationsScreen() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-5">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/app/settings")}>
          <ChevronLeftIcon />
        </Button>
      </div>
      <ScreenPlaceholder title="알림" />
    </div>
  )
}

export { SettingsNotificationsScreen }
