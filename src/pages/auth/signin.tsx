import { Trans, useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"

import AuthLayout from "@/components/layouts/AuthLayout"
import Link from "@/components/shared/Link"

const Signup = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Heading size="2xl" marginBottom={10} fontWeight="semibold">
        {t("signin")}
      </Heading>
      <FormControl marginBottom={4}>
        <FormLabel>{t("email")}</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl marginBottom={6}>
        <FormLabel>{t("password")}</FormLabel>
        <Input type="password" />
      </FormControl>
      <Flex justifyContent="flex-end" marginBottom={6}>
        <Text fontSize="sm">
          <Link path="/auth/forgot-password">{t("forgotPassword")}</Link>
        </Text>
      </Flex>
      <Button colorScheme="brand" width="full" marginBottom={9}>
        {t("signin")}
      </Button>
      <Text color="gray.600" fontSize="sm" textAlign="center">
        <Trans
          i18nKey="newUserText"
          values={{
            signup: t("signup"),
          }}
          components={[<Link path="/auth/signup" />]}
        />
      </Text>
    </AuthLayout>
  )
}

export default Signup
