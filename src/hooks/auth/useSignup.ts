import axios from "@/lib/axios"
import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export interface SignupBody {
  name: string
  storeName: string
  email: string
  password: string
  repeatPassword: string
}

const useSignup = () => {
  const [isSignupLoading, setIsSignupLoading] = useState(false)
  const toast = useToast()
  const { t } = useTranslation()

  const signup = async (body: SignupBody) => {
    try {
      setIsSignupLoading(true)
      const result = await axios.post("/auth/signup", body)
      toast({
        description: "Usuário criado com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      return result.data.token
    } catch (error: any) {
      toast({
        description: t(error.response.data.error),
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsSignupLoading(false)
    }
  }

  return { isSignupLoading, signup }
}

export default useSignup
