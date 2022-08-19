import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

import AuthLayout from "@/components/layouts/AuthLayout"
import useChangePassword from "@/hooks/auth/useChangePassword"
import Link from "@/components/shared/Link"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const {
    changePassword,
    isChangePassowordLoading,
    isChangeSuccessful,
    isChangeError,
  } = useChangePassword()
  const router = useRouter()

  const forgotValidationSchema = Yup.object({
    password: Yup.string().required(t("requiredMessage")),
  })

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: forgotValidationSchema,
    onSubmit: changePassword,
  })

  const renderChilds = () => {
    if (isChangeError) {
      return (
        <Text>
          <Trans
            i18nKey="changePasswordTokenError"
            values={{
              signin: t("makeLogin"),
            }}
            components={[<Link path="/auth/signin" />]}
          />
        </Text>
      )
    }

    if (isChangeSuccessful) {
      return (
        <Text>
          <Trans
            i18nKey="successfullyChangedPassword"
            values={{
              signin: t("makeLogin"),
            }}
            components={[<Link path="/auth/signin" />]}
          />
        </Text>
      )
    }

    return (
      <>
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
        <Button
          isLoading={isChangePassowordLoading}
          variant="brand"
          width="full"
          type="submit"
        >
          {t("continue")}
        </Button>
      </>
    )
  }

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <IconButton
          onClick={() => router.push("/auth/signin")}
          variant="ghost"
          aria-label="Voltar"
          color="gray.500"
          icon={<AiOutlineArrowLeft fontSize="30px" />}
          marginBottom={9}
        />
        <Heading size="2xl" marginBottom={6} fontWeight="semibold">
          {t("changePassword")}
        </Heading>
        <Text
          color={useColorModeValue("gray.600", "gray.500")}
          marginBottom={9}
        >
          {t("changePasswordText")}
        </Text>
        {renderChilds()}
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
