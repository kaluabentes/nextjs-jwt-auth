import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react"
import NextLink from "next/link"

import AuthLayout from "@/components/auth/AuthLayout"
import Link from "@/components/shared/Link"

const Signup = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Heading size="2xl" marginBottom={10} fontWeight="semibold">
        {t("signup")}
      </Heading>
      <FormControl marginBottom={4}>
        <FormLabel>{t("yourName")}</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl marginBottom={4}>
        <FormLabel>{t("storeName")}</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl marginBottom={4}>
        <FormLabel>{t("email")}</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl marginBottom={4}>
        <FormLabel>{t("password")}</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl marginBottom={9}>
        <FormLabel>{t("repeatPassword")}</FormLabel>
        <Input type="email" />
      </FormControl>
      <Text color="gray.600" marginBottom={9} fontSize="xs">
        <Trans
          i18nKey="signupPolicyText"
          values={{
            termsAndConditions: t("termsAndConditions"),
            privacyPolicy: t("privacyPolicy"),
          }}
          components={[
            <ChakraLink color="brand.500" href="#" />,
            <ChakraLink color="brand.500" href="#" />,
          ]}
        />
      </Text>
      <Button colorScheme="brand" width="full" marginBottom={9}>
        {t("continue")}
      </Button>
      <Text color="gray.600" fontSize="sm" textAlign="center">
        <Trans
          i18nKey="existingUserText"
          values={{
            signin: t("signin"),
          }}
          components={[<Link path="/auth/signin" />]}
        />
      </Text>
    </AuthLayout>
  )
}

export default Signup
