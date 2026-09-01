import { useNavigate } from "react-router-dom"

import { useAuth } from "@/contexts/useAuth"
import { LoginScreen } from "@/screens/LoginScreen"

function LoginRoute() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <LoginScreen
      onLogin={(username, password) => login({ username, password })}
      onForgotPassword={() => {}}
      onSignUp={() => navigate("/signup")}
    />
  )
}

export { LoginRoute }
