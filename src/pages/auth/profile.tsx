import { useEffect } from "react"
import { Trans, useTranslation } from "react-i18next"
import {
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Badge,
  Td,
  TableContainer,
} from "@chakra-ui/react"

import AuthLayout from "@/components/layouts/AuthLayout"
import Link from "@/components/shared/Link"
import useProfile from "@/hooks/auth/useProfile"

const Profile = () => {
  const { t } = useTranslation()
  const { fetchProfile, profile, isLoadingProfile } = useProfile()

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <AuthLayout>
      <Heading size="2xl" marginBottom={10} fontWeight="semibold">
        {t("profile")}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td fontWeight="600">{t("name")}</Td>
              <Td>{profile.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="600">{t("email")}</Td>
              <Td>{profile.email}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="600">{t("role")}</Td>
              <Td>
                <Badge>{t(profile.role)}</Badge>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </AuthLayout>
  )
}

export default Profile
