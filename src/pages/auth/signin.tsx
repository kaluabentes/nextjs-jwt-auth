import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"

import AuthLayout from "@/components/layouts/AuthLayout"
import Link from "@/components/shared/Link"
import useSignin from "@/hooks/auth/useSignin"

const Signin = () => {
  const { t } = useTranslation()
  const { signin, isSigninLoading } = useSignin()

  const signinValidationSchema = Yup.object({
    email: Yup.string().email().required(t("requiredMessage")),
    password: Yup.string().required(t("requiredMessage")),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: signin,
  })

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Heading size="2xl" marginBottom={10} fontWeight="semibold">
          {t("signin")}
        </Heading>
        <FormControl isInvalid={Boolean(formik.errors.email)} marginBottom={4}>
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.password)}
          marginBottom={6}
        >
          <FormLabel htmlFor="password">{t("password")}</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent="flex-end" marginBottom={6}>
          <Text>
            <Link path="/auth/forgot-password">{t("forgotPassword")}</Link>
          </Text>
        </Flex>
        <Button
          isLoading={isSigninLoading}
          variant="brand"
          width="full"
          marginBottom={9}
          type="submit"
        >
          {t("signin")}
        </Button>
        <Text
          color={useColorModeValue("gray.600", "gray.500")}
          textAlign="center"
        >
          <Trans
            i18nKey="newUserText"
            values={{
              signup: t("signup"),
            }}
            components={[<Link path="/auth/signup" />]}
          />
        </Text>
      </form>
    </AuthLayout>
  )
}

export default Signin
