import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import axios from "@/lib/axios"

export interface RecoverBody {
  email: string
}

const useForgotPassword = () => {
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)
  const [isForgotSuccessful, setIsForgotSuccessful] = useState(false)
  const toast = useToast()
  const { t } = useTranslation()

  const recover = async (body: RecoverBody) => {
    try {
      setIsForgotPasswordLoading(true)
      const result = await axios.post("/auth/forgot-password", body)
      const { message } = result.data

      if (message === "ok") {
        setIsForgotSuccessful(true)
      }
    } catch (error: any) {
      toast({
        description: t(error.response.data.error),
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }

  return { recover, isForgotPasswordLoading, isForgotSuccessful }
}

export default useForgotPassword
