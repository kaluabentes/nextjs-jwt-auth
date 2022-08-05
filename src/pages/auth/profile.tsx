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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"

import AuthLayout from "@/components/layouts/AuthLayout"
import Link from "@/components/shared/Link"

const Profile = () => {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Heading size="2xl" marginBottom={10} fontWeight="semibold">
        {t("profile")}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>{t("name")}</Th>
              <Td>Kaluã Bentes</Td>
            </Tr>
            <Tr>
              <Th>{t("email")}</Th>
              <Td>centimetres (cm)</Td>
            </Tr>
            <Tr>
              <Th>{t("role")}</Th>
              <Td>Admin</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </AuthLayout>
  )
}

export default Profile
