import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"

import Auth from "@/components/shared/Auth"

const Signup = () => {
  const { t } = useTranslation()

  return (
    <Auth>
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
      <Text color="gray.600" marginBottom={9} fontSize="sm">
        <Trans
          i18nKey="signupPolicyText"
          values={{
            termsAndConditions: t("termsAndConditions"),
            privacyPolicy: t("privacyPolicy"),
          }}
          components={[
            <Link color="brand.500" href="#" />,
            <Link color="brand.500" href="#" />,
          ]}
        />
      </Text>
      <Button colorScheme="brand" width="full">
        {t("continue")}
      </Button>
    </Auth>
  )
}

export default Signup
