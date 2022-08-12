import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"

import AuthLayout from "@/components/layouts/AuthLayout"
import Link from "@/components/shared/Link"
import useSignup from "@/hooks/auth/useSignup"
import axios from "@/lib/axios"
import { useRouter } from "next/router"

const Signup = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { signup, isSignupLoading } = useSignup()

  const signupValidationSchema = Yup.object({
    name: Yup.string().required(t("requiredMessage")),
    storeName: Yup.string().required(t("requiredMessage")),
    email: Yup.string().email().required(t("requiredMessage")),
    password: Yup.string().required(t("requiredMessage")),
    repeatPassword: Yup.string()
      .required(t("requiredMessage"))
      .test("match-password", t("passwordMatchMessage"), (value, context) => {
        return context.parent.password === value
      }),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      storeName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      const token = await signup(values)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      router.push("/auth/profile")
    },
  })

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Heading size="2xl" marginBottom={10} fontWeight="semibold">
          {t("signup")}
        </Heading>
        <FormControl isInvalid={Boolean(formik.errors.name)} marginBottom={4}>
          <FormLabel htmlFor="name">{t("yourName")}</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.storeName)}
          marginBottom={4}
        >
          <FormLabel htmlFor="storeName">{t("storeName")}</FormLabel>
          <Input
            type="text"
            id="storeName"
            name="storeName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.storeName}
          />
          <FormErrorMessage>{formik.errors.storeName}</FormErrorMessage>
        </FormControl>
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
          marginBottom={4}
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
        <FormControl
          isInvalid={Boolean(formik.errors.repeatPassword)}
          marginBottom={9}
        >
          <FormLabel htmlFor="repeatPassword">{t("repeatPassword")}</FormLabel>
          <Input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
          />
          <FormErrorMessage>{formik.errors.repeatPassword}</FormErrorMessage>
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
        <Button
          isLoading={isSignupLoading}
          colorScheme="brand"
          width="full"
          marginBottom={9}
          type="submit"
        >
          {t("signup")}
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
      </form>
    </AuthLayout>
  )
}

export default Signup
