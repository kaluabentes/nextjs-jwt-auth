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
} from "@chakra-ui/react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

import AuthLayout from "@/components/layouts/AuthLayout"
import useForgotPassword from "@/hooks/auth/useForgotPassword"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { recover, isForgotPasswordLoading, isForgotSuccessful } =
    useForgotPassword()
  const router = useRouter()

  const forgotValidationSchema = Yup.object({
    email: Yup.string().email().required(t("requiredMessage")),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotValidationSchema,
    onSubmit: recover,
  })

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
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
        <Text color="gray.600" marginBottom={9}>
          {t("forgotPasswordText")}
        </Text>
        {isForgotSuccessful ? (
          <Text>
            <Trans
              i18nKey="forgotPasswordEmailSent"
              values={{
                email: formik.values.email,
              }}
              components={[<strong />]}
            />
          </Text>
        ) : (
          <>
            <FormControl
              isInvalid={Boolean(formik.errors.email)}
              marginBottom={4}
            >
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
            <Button
              isLoading={isForgotPasswordLoading}
              colorScheme="brand"
              width="full"
              type="submit"
            >
              {t("continue")}
            </Button>
          </>
        )}
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
