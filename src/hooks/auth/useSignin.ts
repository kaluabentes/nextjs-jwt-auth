import axios from "@/lib/axios"
import { useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"

export interface SigninBody {
  email: string
  password: string
}

const useSignin = () => {
  const [isSigninLoading, setIsSigninLoading] = useState(false)
  const toast = useToast()
  const { t } = useTranslation()
  const router = useRouter()

  const signin = async (body: SigninBody) => {
    try {
      setIsSigninLoading(true)
      const result = await axios.post("/auth/signin", body)
      toast({
        description: "Login feito com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      const header = `Bearer ${result.data.token}`
      axios.defaults.headers.common["Authorization"] = header
      router.push("/auth/profile")
    } catch (error: any) {
      toast({
        description: t(error.response.data.error),
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsSigninLoading(false)
    }
  }

  return { isSigninLoading, signin }
}

export default useSignin
