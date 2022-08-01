import { Box } from "@chakra-ui/react"
import { ReactElement, ReactNode } from "react"

interface AuthProps {
  children: ReactNode
}

const Auth = ({ children }: AuthProps) => <Box padding={5}>{children}</Box>

export default Auth
