import { useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react"
import { AiOutlineArrowLeft } from "react-icons/ai"

import AuthLayout from "@/components/layouts/AuthLayout"
import { useRouter } from "next/router"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <AuthLayout>
      <IconButton
        onClick={router.back}
        variant="ghost"
        aria-label="Voltar"
        color="gray.500"
        icon={<AiOutlineArrowLeft fontSize="30px" />}
        marginBottom={9}
      />
      <Heading size="2xl" marginBottom={6} fontWeight="semibold">
        {t("forgotPassword")}
      </Heading>
      <Text color="gray.600" fontSize="sm" marginBottom={9}>
        {t("forgotPasswordText")}
      </Text>
      <FormControl marginBottom={4}>
        <FormLabel>{t("email")}</FormLabel>
        <Input type="email" />
      </FormControl>
      <Button colorScheme="brand" width="full">
        {t("continue")}
      </Button>
    </AuthLayout>
  )
}

export default ForgotPassword
