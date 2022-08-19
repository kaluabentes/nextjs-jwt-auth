import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import axios from "@/lib/axios"
import { useRouter } from "next/router"

export interface ChangePasswordBody {
  password: string
}

const useChangePassword = () => {
  const [isChangePassowordLoading, setIsChangePassowordLoading] =
    useState(false)
  const [isChangeSuccessful, setIsChangeSuccessful] = useState(false)
  const [isChangeError, setIsChangeError] = useState(false)
  const toast = useToast()
  const { t } = useTranslation()
  const router = useRouter()
  const { token } = router.query

  const changePassword = async (body: ChangePasswordBody) => {
    try {
      setIsChangePassowordLoading(true)
      const result = await axios.post("/auth/change-password", {
        token,
        password: body.password,
      })
      const { message } = result.data

      if (message === "ok") {
        setIsChangeError(false)
        setIsChangeSuccessful(true)
      }
    } catch (error: any) {
      setIsChangeError(true)
      toast({
        description: t(error.response.data.error),
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsChangePassowordLoading(false)
    }
  }

  return {
    changePassword,
    isChangePassowordLoading,
    isChangeSuccessful,
    isChangeError,
  }
}

export default useChangePassword
