import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon } from "lucide-react"

import { useAuth } from "@/contexts/useAuth"
import { Button } from "@/components/ui/button"

/** `/app/settings/profile` */
function SettingsProfileScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 pb-6">
      <div className="flex items-center gap-2 px-5 pt-5">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/app/settings")}>
          <ChevronLeftIcon />
        </Button>
        <h2 className="font-heading text-xl font-bold">프로필</h2>
      </div>
      <div className="flex flex-col gap-1 px-5 text-sm">
        <p>{user?.name}</p>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  )
}

export { SettingsProfileScreen }
