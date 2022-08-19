import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const useForgotPassword = () => {
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)
  const toast = useToast()
  const { t } = useTranslation()

  const recover = () => {
    try {
      setIsForgotPasswordLoading(true)
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

  return { recover, isForgotPasswordLoading }
}

export default useForgotPassword
