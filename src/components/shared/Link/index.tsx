import NextLink from "next/link"
import { Link as ChackraLink } from "@chakra-ui/react"

import { BaseProps } from "@/models/BaseProps"

interface LinkProps extends BaseProps {
  path: string
}

const Link = ({ children, path }: LinkProps) => (
  <NextLink href={path} passHref>
    <ChackraLink color="brand.500" fontWeight="semibold">
      {children}
    </ChackraLink>
  </NextLink>
)

export default Link
