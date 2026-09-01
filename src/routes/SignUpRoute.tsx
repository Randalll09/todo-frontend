import { useNavigate } from "react-router-dom"

import { useAuth } from "@/contexts/useAuth"
import { SignUpScreen } from "@/screens/SignUpScreen"

function SignUpRoute() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  return (
    <SignUpScreen
      onSignUp={(input) => signup(input)}
      onBackToLogin={() => navigate("/login")}
    />
  )
}

export { SignUpRoute }
