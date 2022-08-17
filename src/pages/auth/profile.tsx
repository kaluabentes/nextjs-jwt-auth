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
  Flex,
  Box,
  Text,
} from "@chakra-ui/react"

import AuthLayout from "@/components/layouts/AuthLayout"
import DataItem from "@/components/shared/DataItem"
import DataItemLoader from "@/components/shared/DataItem/DataItemLoader"
import useAuth from "@/hooks/auth/useAuth"

const Profile = () => {
  const { t } = useTranslation()
  const { profile, isLoadingProfile } = useAuth()

  return (
    <AuthLayout>
      <Heading size="2xl" marginBottom={10} fontWeight="semibold">
        {t("profile")}
      </Heading>
      {isLoadingProfile ? (
        <>
          <DataItemLoader />
          <DataItemLoader />
          <DataItemLoader />
        </>
      ) : (
        <>
          <DataItem label={t("name")} value={profile.name} />
          <DataItem label={t("email")} value={profile.email} />
          <DataItem
            label={t("role")}
            value={<Badge>{t(profile.role)}</Badge>}
          />
        </>
      )}
    </AuthLayout>
  )
}

export default Profile
