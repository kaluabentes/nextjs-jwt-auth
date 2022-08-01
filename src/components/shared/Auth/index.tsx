import { Box, Container, Flex } from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"

interface AuthProps {
  children: ReactNode
}

const Auth = ({ children }: AuthProps) => (
  <Flex
    justifyContent="center"
    paddingTop={{ base: 0, sm: 10 }}
    paddingBottom={{ base: 0, sm: 10 }}
  >
    <Box
      height={{ base: "100vh", sm: "initial" }}
      width={{ base: "100vw", sm: "initial" }}
      maxWidth="500px"
      backgroundColor="white"
      padding={{ base: 5, sm: 10 }}
    >
      {children}
    </Box>
  </Flex>
)

export default Auth
