import {
  Box,
  Container,
  Flex,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <Flex
    justifyContent="center"
    paddingTop={{ base: 0, sm: 10 }}
    paddingBottom={{ base: 0, sm: 10 }}
  >
    <Box
      height={{ base: "100vh", sm: "initial" }}
      width="100%"
      maxWidth="500px"
      backgroundColor={useColorModeValue("white", "gray.800")}
      padding={{ base: 5, sm: 10 }}
      boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      {children}
    </Box>
  </Flex>
)

export default AuthLayout
