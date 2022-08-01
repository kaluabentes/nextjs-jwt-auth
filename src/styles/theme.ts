import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      "50": "#E8EAFC",
      "100": "#C0C5F7",
      "200": "#97A0F2",
      "300": "#6E7AED",
      "400": "#4555E8",
      "500": "#1C30E3",
      "600": "#1726B5",
      "700": "#111D88",
      "800": "#0B135B",
      "900": "#060A2D",
    },
  },
})

export default theme
